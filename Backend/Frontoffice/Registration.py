import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from django.db.models import  Q
from django.db import transaction
from PIL import Image
from io import BytesIO
import base64
import magic
from PyPDF2 import PdfReader, PdfWriter
from Masters.models import *
from OutPatient.models import *
from Workbench.models import Op_to_Ip_Convertion_Table
from datetime import datetime
from .task import schedule_status_update
from Masters.Login import authenticate_request
from django.utils import timezone

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Patient_Registration(request):
    
    @transaction.atomic
    def generate_or_update_visit_id(patient, register_type):
        # Get today's date
        today = datetime.now().date()
        
        # Find the maximum VisitId for the given patient and date
        existing_visit = Patient_Visit_Detials.objects.filter(
            PatientId=patient,
            created_at__date=today
        ).first()
        
        if existing_visit:
            # If a visit record exists for today, you might want to update or perform other actions.
            # For example, you might just return the existing record or update certain fields.
            # Here, we simply return the existing record's ID.
            return existing_visit.VisitId
        else:
            # If no visit record exists for today, create a new one
            max_visit_id = Patient_Visit_Detials.objects.filter(
                PatientId=patient
            ).aggregate(max_id=Max('VisitId'))['max_id']
            
            next_visit_id = 1 if max_visit_id is None else max_visit_id + 1
            
            patient_visit = Patient_Visit_Detials.objects.create(
                PatientId=patient,
                VisitId=next_visit_id,
                RegisterType=register_type
            )
            
            return patient_visit.VisitId
    
    
   
    @transaction.atomic
    def create_or_update_referral(is_referral, referral_source, referral_doctor_instance, register_type, register_id, newdata, created_by):
        if is_referral == 'Yes':
            try:
                
                if register_id:
                    filters = {
                        'OP': 'OP_Register_Id__pk',
                        'IP': 'IP_Register_Id__pk',
                        'Casuality': 'Casuality_Register_Id__pk',
                        'Diagnosis': 'Diagnosis_Register_Id__pk',
                        'Laboratory': 'Laboratory_Register_Id__pk'
                    }
                    filter_key = filters.get(register_type)
                    if not filter_key:
                        raise ValueError("Invalid register_type provided.")
                    if Patient_Referral_Detials.objects.filter({filter_key: register_id}).exists():
                        referral = Patient_Referral_Detials.objects.get({filter_key: register_id})
                        referral.ReferralSource = referral_source
                        referral.ReferredBy = referral_doctor_instance
                        referral.save()
                    else:
                        Patient_Referral_Detials.objects.create(
                            **{
                                'OP_Register_Id': newdata if register_type == 'OP' else None,
                                'IP_Register_Id': newdata if register_type == 'IP' else None,
                                'Casuality_Register_Id': newdata if register_type == 'Casuality' else None,
                                'Laboratory_Register_Id': newdata if register_type == 'Laboratory' else None,
                                'Diagnosis_Register_Id': newdata if register_type == 'Diagnosis' else None
                            },
                            ReferralRegisteredBy=register_type,
                            ReferralSource=referral_source,
                            ReferredBy=referral_doctor_instance,
                            created_by=created_by
                        )
                    
                else:
                    Patient_Referral_Detials.objects.create(
                        **{
                            'OP_Register_Id': newdata if register_type == 'OP' else None,
                            'IP_Register_Id': newdata if register_type == 'IP' else None,
                            'Casuality_Register_Id': newdata if register_type == 'Casuality' else None,
                            'Laboratory_Register_Id': newdata if register_type == 'Laboratory' else None,
                            'Diagnosis_Register_Id': newdata if register_type == 'Diagnosis' else None
                        },
                        ReferralRegisteredBy=register_type,
                        ReferralSource=referral_source,
                        ReferredBy=referral_doctor_instance,
                        created_by=created_by
                    )
            except ValueError as e:
                # Handle invalid register_type
                pass
       
    @transaction.atomic
    def validate_and_process_file(file):
    
        
        def get_file_type(file):
            if file.startswith('data:application/pdf;base64'):
                return 'application/pdf'
            elif file.startswith('data:image/jpeg;base64') or file.startswith('data:image/jpg;base64'):
                return 'image/jpeg'
            elif file.startswith('data:image/png;base64'):
                return 'image/png'
            else:
                return 'unknown'

        def compress_image(image, min_quality=10, step=5):
            output = BytesIO()
            quality = 95
            compressed_data = None
            while quality >= min_quality:
                output.seek(0)
                image.save(output, format='PNG', quality=quality)
                compressed_data = output.getvalue()
                quality -= step
            output.seek(0)
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        def compress_pdf(file):
            output = BytesIO()
            reader = PdfReader(file)
            writer = PdfWriter()
            for page_num in range(len(reader.pages)):
                writer.add_page(reader.pages[page_num])
            writer.write(output)
            compressed_data = output.getvalue()
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        if file:
            file_data = file.split(',')[1]
            file_content = base64.b64decode(file_data)
            file_size = len(file_content)
            
            max_size_mb = 5

            if file_size > max_size_mb * 1024 * 1024:
                print('maximum mb')
                return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'})

            file_type = get_file_type(file)
            
            if file_type == 'image/jpeg' or file_type == 'image/png':
                try:
                    image = Image.open(BytesIO(file_content))
                    if image.mode in ('RGBA', 'P'):
                        image = image.convert('RGB')
                    compressed_image_data, compressed_size = compress_image(image)
                    return compressed_image_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing image: {str(e)}'})

            elif file_type == 'application/pdf':
                try:
                    compressed_pdf_data, compressed_size = compress_pdf(BytesIO(file_content))

                    return compressed_pdf_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing PDF: {str(e)}'})

            else:
                return JsonResponse({'warn': 'Unsupported file format'})

        return None
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            
            Patient_profile_photo = data.get('PatientPhoto', None)
            Patient_profile_photo_prossed = validate_and_process_file(Patient_profile_photo) if Patient_profile_photo else None
            register_type = data.get('RegisterType', '')
            register_Id = data.get('RegisterId', None)
            optoip_id = data.get('optoip_id', None)
            patient_id = data.get('PatientId')
            phone_no = data.get('PhoneNo', '')
            title = data.get('Title', '')
            first_name = data.get('FirstName', '')
            middle_name = data.get('MiddleName', '')
            sur_name = data.get('SurName', '')
            gender = data.get('Gender', '')
            alias_name = data.get('AliasName', '')
            dob = data.get('DOB', '')
            age = data.get('Age', '')
            email = data.get('Email', '')
            blood_group = data.get('BloodGroup', '')
            occupation = data.get('Occupation', '')
            religion = data.get('Religion', '')
            nationality = data.get('Nationality', '')
            unique_id_type = data.get('UniqueIdType', '')
            unique_id_no = data.get('UniqueIdNo', '')
            Location_Id = data.get('Location', None)
            visit_purpose = data.get('VisitPurpose', '')
            specialization = data.get('Specialization', '')
            doctor_name = data.get('DoctorName', '')
            case_sheet_no = data.get('CaseSheetNo', '')
            complaint = data.get('Complaint', '')
            patient_type = data.get('PatientType', '')
            patient_category = data.get('PatientCategory', '')
            insurance_name = data.get('InsuranceName', '')
            insurance_type = data.get('InsuranceType', '')
            client_name = data.get('ClientName', '')
            client_type = data.get('ClientType', '')
            client_employee_id = data.get('ClientEmployeeId', '')
            client_employee_designation = data.get('ClientEmployeeDesignation', '')
            client_employee_relation = data.get('ClientEmployeeRelation', '')
            employee_id = data.get('EmployeeId', '')
            employee_relation = data.get('EmployeeRelation', '')
            doctor_id = data.get('DoctorId', '')
            doctor_relation = data.get('DoctorRelation', '')
            donation_type = data.get('DonationType', '')
            is_mlc = data.get('IsMLC', 'No')
            flagging = data.get('Flagging', '')
            is_referral = data.get('IsReferral', 'No')
            referral_source = data.get('ReferralSource', '')
            referred_by = data.get('ReferredBy', '')
            apptoreg = data.get('apptoreg','')
            
            door_no = data.get('DoorNo', '')
            street = data.get('Street', '')
            area = data.get('Area', '')
            city = data.get('City', '')
            state = data.get('State', '')
            country = data.get('Country', '')
            pincode = data.get('Pincode', '')

            IsConsciousness = data.get('IsConsciousness','')
            IsConsciousness=True if IsConsciousness=='Yes' else False
            
            
            IsCasualityPatient = data.get('IsCasualityPatient','')
            IsCasualityPatientID = data.get('IsCasualityPatientID','')
            AdmissionPurpose = data.get('AdmissionPurpose','')
            DrInchargeatTimeofAdmission = data.get('DrInchargeAtTimeOfAdmission','')
            NexttokinName = data.get('NextToKinName','')
            relation = data.get('Relation','')
            relativePhoneno = data.get('RelativePhoneNo','')
            personLiableforpayment = data.get('PersonLiableForBillPayment','')
            familyhead = data.get('FamilyHead','')
            familyheadName = data.get('FamilyHeadName','')
            ipKitGiven = data.get('IpKitGiven','')

            created_by = data.get('Created_by', '')
            
            TestNames = data.get('TestNames',[])
            RoomId = data.get('RoomId', '')
        

            specialization_instance = Speciality_Detials.objects.get(Speciality_Id=specialization) if specialization else None
            doctor_name_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_name) if doctor_name else None
            DrInchargeatTimeofAdmission_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=DrInchargeatTimeofAdmission) if DrInchargeatTimeofAdmission else None
            referral_doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=referred_by) if referred_by else None
            employee_instance = Employee_Personal_Form_Detials.objects.get(Employee_ID=employee_id) if employee_id else None
            doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id) if doctor_id else None
            religion_instance = Religion_Detials.objects.get(Religion_Id=religion) if religion else None
            location_instance = Location_Detials.objects.get(Location_Id=Location_Id) if Location_Id else None
            roomid_instance = Room_Master_Detials.objects.get(Room_Id=RoomId) if RoomId else None
            
            casuality_patient_instance=None
            if IsCasualityPatient =='Yes':
                casuality_patient_instance = Patient_Casuality_Registration_Detials.objects.get(pk= IsCasualityPatientID) if IsCasualityPatientID else None
            
            OP_regis_ins =None
            if optoip_id:
                OP_regis_ins = Patient_Appointment_Registration_Detials.objects.get(pk = optoip_id)
                
            with transaction.atomic():
                patient=None
                if patient_id :
                    patient = Patient_Detials.objects.get(PatientId=patient_id)
                    if not patient:
                        return JsonResponse({'warn': f"The Patient Id is not valid"})
                    
                    if Patient_Detials.objects.filter(PhoneNo=phone_no, FirstName=first_name).exclude(PatientId=patient_id).exists():
                        patient = Patient_Detials.objects.get(PhoneNo=phone_no, FirstName=first_name)

                        return JsonResponse({'warn': f"The Patient {patient.PatientId} is already registered with {phone_no} and {first_name}"})
                    elif Patient_Detials.objects.filter(CasesheetNo=case_sheet_no).exclude(PatientId = patient_id).exists():
                        patient_data = Patient_Detials.objects.get(CasesheetNo=case_sheet_no)
                        return JsonResponse({'warn':f"Casesheet No already exist with the {patient_data.PatientId}"})
                
                   
                    patient = Patient_Detials.objects.get(PatientId=patient_id)
                    patient.Patient_profile = Patient_profile_photo_prossed
                    patient.CasesheetNo = case_sheet_no
                    patient.PhoneNo = phone_no
                    patient.Title = title
                    patient.FirstName = first_name
                    patient.MiddleName = middle_name
                    patient.SurName = sur_name
                    patient.Gender = gender
                    patient.AliasName = alias_name
                    patient.DOB = dob
                    patient.Age = age
                    patient.Email = email
                    patient.BloodGroup = blood_group
                    patient.Occupation = occupation
                    patient.Religion = religion_instance
                    patient.Nationality = nationality
                    patient.UniqueIdType = unique_id_type
                    patient.UniqueIdNo = unique_id_no
                    patient.DoorNo = door_no
                    patient.Street = street
                    patient.Area = area
                    patient.City = city
                    patient.State = state
                    patient.Country = country
                    patient.Pincode = pincode
                    patient.updated_by = created_by
                    patient.save()

                else:
                    if phone_no and first_name:
                        if Patient_Detials.objects.filter(PhoneNo=phone_no, FirstName=first_name).exists():
                            patient = Patient_Detials.objects.get(PhoneNo=phone_no, FirstName=first_name)
                            return JsonResponse({'warn': f"The Patient {patient.PatientId} is already registered with {phone_no} and {first_name}"})
                        elif Patient_Detials.objects.filter(CasesheetNo=case_sheet_no).exists():
                            patient_data = Patient_Detials.objects.get(CasesheetNo=case_sheet_no)
                            return JsonResponse({'warn':f"Casesheet No already exist with the {patient_data.PatientId}"})
                        
                        patient = Patient_Detials.objects.create(
                            Patient_profile = Patient_profile_photo_prossed,
                            CasesheetNo = case_sheet_no,
                            PhoneNo=phone_no,
                            Title=title,
                            FirstName=first_name,
                            MiddleName=middle_name, 
                            SurName=sur_name, 
                            Gender=gender, 
                            AliasName=alias_name, 
                            DOB=dob, 
                            Age=age, 
                            Email=email, 
                            BloodGroup=blood_group, 
                            Occupation=occupation, 
                            Religion=religion_instance, 
                            Nationality=nationality, 
                            UniqueIdType=unique_id_type, 
                            UniqueIdNo=unique_id_no, 
                            DoorNo=door_no, 
                            Street=street, 
                            Area=area, 
                            City=city, 
                            State=state, 
                            Country=country, 
                            Pincode=pincode, 
                            created_by=created_by
                        )
                        
                
                # visit id
                patient_visit_id=None
                if patient:
                    patient_visit_id = generate_or_update_visit_id(patient,register_type)
                
                if not register_Id and not optoip_id:
                    registration_tables = {
                        'OP': {'model': Patient_Appointment_Registration_Detials, 'status_field': 'Status', 'statuses': ['completed','Shifted_to_IP']},
                        'IP': {'model': Patient_IP_Registration_Detials, 'status_field': 'Status', 'statuses': ['discharged']},
                        'Casuality': {'model': Patient_Casuality_Registration_Detials, 'status_field': 'Status', 'statuses': ['admitted', 'discharged']},
                        'Diagnosis': {'model': Patient_Diagnosis_Registration_Detials, 'status_field': 'Status', 'statuses': ['completed']},
                        'Laboratory': {'model': Patient_Laboratory_Registration_Detials, 'status_field': 'Status', 'statuses': ['completed']},
                    }

                    # Iterate through each registration type and its corresponding model and statuses
                    for reg_type, details in registration_tables.items():
                        model = details['model']
                        status_field = details['status_field']
                        statuses = details['statuses']

                        if patient:
                            # Check if the patient instance is already present in the current model/table
                            if model.objects.filter(PatientId=patient).exists():
                                # Check if the required statuses do not exist
                                if not model.objects.filter(PatientId=patient, **{status_field+'__in': statuses}).exists():
                                    return JsonResponse({'warn': f"The patient is already available in the {reg_type} "})
                         

                if register_Id :
                    if register_type == 'OP':
                        OP_appointment_details = Patient_Appointment_Registration_Detials.objects.get(pk = register_Id)
                        OP_appointment_details.VisitPurpose = visit_purpose
                        OP_appointment_details.Specialization = specialization_instance
                        OP_appointment_details.PrimaryDoctor = doctor_name_instance
                        OP_appointment_details.Complaint = complaint
                        OP_appointment_details.PatientType = patient_type
                        OP_appointment_details.PatientCategory = patient_category
                        OP_appointment_details.InsuranceName = insurance_name
                        OP_appointment_details.InsuranceType = insurance_type
                        OP_appointment_details.ClientName = client_name
                        OP_appointment_details.ClientType = client_type
                        OP_appointment_details.ClientEmployeeId = client_employee_id
                        OP_appointment_details.ClientEmployeeDesignation = client_employee_designation
                        OP_appointment_details.ClientEmployeeRelation = client_employee_relation
                        OP_appointment_details.EmployeeId = employee_instance
                        OP_appointment_details.EmployeeRelation = employee_relation
                        OP_appointment_details.DoctorId = doctor_instance
                        OP_appointment_details.DoctorRelation = doctor_relation
                        OP_appointment_details.DonationType = donation_type
                        OP_appointment_details.IsMLC = is_mlc
                        OP_appointment_details.Flagging = flagging
                        OP_appointment_details.IsReferral = is_referral
                        OP_appointment_details.updated_by = created_by
                        OP_appointment_details.save()
                        
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,OP_appointment_details,created_by)
                        
                        return JsonResponse({'success': 'Patient Appointment Register Updated successfully'})
                    elif register_type == 'IP':
                        ip_details = Patient_IP_Registration_Detials.objects.get(pk=register_Id)
                        ip_details.Specialization=specialization_instance  
                        ip_details.PrimaryDoctor=doctor_name_instance
                        ip_details.Complaint=complaint  
                        ip_details.PatientType=patient_type  
                        ip_details.PatientCategory=patient_category  
                        ip_details.InsuranceName=insurance_name  
                        ip_details.InsuranceType=insurance_type  
                        ip_details.ClientName=client_name  
                        ip_details.ClientType=client_type  
                        ip_details.ClientEmployeeId=client_employee_id  
                        ip_details.ClientEmployeeDesignation=client_employee_designation  
                        ip_details.ClientEmployeeRelation=client_employee_relation  
                        ip_details.EmployeeId=employee_instance  
                        ip_details.EmployeeRelation=employee_relation  
                        ip_details.DoctorId=doctor_instance  
                        ip_details.DoctorRelation=doctor_relation  
                        ip_details.DonationType=donation_type  
                        ip_details.IsMLC=is_mlc  
                        ip_details.Flagging=flagging  
                        ip_details.IsReferral=is_referral  
                        ip_details.updated_by = created_by
                        ip_details.save()
                        
                        ip_admission = Patient_Admission_Detials.objects.get(IP_Registration_Id__pk = ip_details.pk)
                        ip_admission.AdmissionPurpose = AdmissionPurpose 
                        ip_admission.DrInchargeAtTimeOfAdmission = DrInchargeatTimeofAdmission_instance 
                        ip_admission.NextToKinName = NexttokinName 
                        ip_admission.Relation = relation 
                        ip_admission.RelativePhoneNo = relativePhoneno 
                        ip_admission.PersonLiableForPayment = personLiableforpayment 
                        ip_admission.FamilyHead = familyhead 
                        ip_admission.FamilyHeadName = familyheadName 
                        ip_admission.IpKitGiven = ipKitGiven 
                        ip_admission.updated_by = created_by
                        ip_admission.save()
                        
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,ip_details,created_by)
                        
                        return JsonResponse({'success': 'Patient Admission Detials Updated successfully'})
                    
                    elif register_type == 'Casuality':
                        casuality_details = Patient_Casuality_Registration_Detials.objects.get(Registration_Id=register_Id)
                        casuality_details.PatientId= patient if phone_no and first_name else None
                        casuality_details.VisitId=patient_visit_id  
                        casuality_details.IsConsciousness=IsConsciousness  
                        casuality_details.Specialization=specialization_instance  
                        casuality_details.PrimaryDoctor=doctor_name_instance  
                        casuality_details.Complaint=complaint  
                        casuality_details.PatientType=patient_type  
                        casuality_details.PatientCategory=patient_category  
                        casuality_details.InsuranceName=insurance_name  
                        casuality_details.InsuranceType=insurance_type  
                        casuality_details.ClientName=client_name  
                        casuality_details.ClientType=client_type  
                        casuality_details.ClientEmployeeId=client_employee_id  
                        casuality_details.ClientEmployeeDesignation=client_employee_designation  
                        casuality_details.ClientEmployeeRelation=client_employee_relation  
                        casuality_details.EmployeeId=employee_instance  
                        casuality_details.EmployeeRelation=employee_relation  
                        casuality_details.DoctorId=doctor_instance  
                        casuality_details.DoctorRelation=doctor_relation  
                        casuality_details.DonationType=donation_type  
                        casuality_details.IsMLC=is_mlc  
                        casuality_details.Flagging=flagging  
                        casuality_details.IsReferral=is_referral 
                        casuality_details.updated_by =created_by
                        casuality_details.save()
                        
                        
                        
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,casuality_details,created_by)
                        
                        return JsonResponse({'success': 'Casuality Register Updated successfully'})
                    
                    elif register_type == 'Diagnosis':
                        diagnosis_details = Patient_Diagnosis_Registration_Detials.objects.get(PatientId=patient)
                        diagnosis_details.VisitId=patient_visit_id  
                        diagnosis_details.Specialization = specialization_instance
                        diagnosis_details.PrimaryDoctor = doctor_name_instance
                        diagnosis_details.Complaint=complaint  
                        diagnosis_details.PatientType=patient_type  
                        diagnosis_details.PatientCategory=patient_category  
                        diagnosis_details.InsuranceName=insurance_name  
                        diagnosis_details.InsuranceType=insurance_type  
                        diagnosis_details.ClientName=client_name  
                        diagnosis_details.ClientType=client_type  
                        diagnosis_details.ClientEmployeeId=client_employee_id  
                        diagnosis_details.ClientEmployeeDesignation=client_employee_designation  
                        diagnosis_details.ClientEmployeeRelation=client_employee_relation  
                        diagnosis_details.EmployeeId=employee_instance  
                        diagnosis_details.EmployeeRelation=employee_relation  
                        diagnosis_details.DoctorId=doctor_instance  
                        diagnosis_details.DoctorRelation=doctor_relation  
                        diagnosis_details.DonationType=donation_type  
                        diagnosis_details.IsMLC=is_mlc  
                        diagnosis_details.Flagging=flagging  
                        diagnosis_details.IsReferral=is_referral  
                        diagnosis_details.updated_by = created_by
                        diagnosis_details.save()
                        
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,diagnosis_details,created_by)
                        
                        return JsonResponse({'success': 'Diagnosis Register Updated successfully'})
                    
                    elif register_type == 'Laboratory':
                        laboratory_details = Patient_Laboratory_Registration_Detials.objects.get(PatientId=patient)
                        laboratory_details.VisitId=patient_visit_id 
                        laboratory_details.Specialization = specialization_instance
                        laboratory_details.PrimaryDoctor = doctor_name_instance 
                        laboratory_details.Complaint=complaint  
                        laboratory_details.PatientType=patient_type  
                        laboratory_details.PatientCategory=patient_category  
                        laboratory_details.InsuranceName=insurance_name  
                        laboratory_details.InsuranceType=insurance_type  
                        laboratory_details.ClientName=client_name  
                        laboratory_details.ClientType=client_type  
                        laboratory_details.ClientEmployeeId=client_employee_id  
                        laboratory_details.ClientEmployeeDesignation=client_employee_designation  
                        laboratory_details.ClientEmployeeRelation=client_employee_relation  
                        laboratory_details.EmployeeId=employee_instance  
                        laboratory_details.EmployeeRelation=employee_relation  
                        laboratory_details.DoctorId=doctor_instance  
                        laboratory_details.DoctorRelation=doctor_relation  
                        laboratory_details.DonationType=donation_type  
                        laboratory_details.IsMLC=is_mlc  
                        laboratory_details.Flagging=flagging  
                        laboratory_details.IsReferral=is_referral  
                        laboratory_details.updated_by = created_by
                        
                        laboratory_details.save()
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,laboratory_details,created_by)
                        
                        return JsonResponse({'success': 'Laboratory Register Updated successfully'})
                else:
                    if register_type == 'OP': 
                        appointment_instance = None
                        if apptoreg:
                            appointment_instance = Appointment_Request_List.objects.get(appointment_id = apptoreg)
                        if Patient_Appointment_Registration_Detials.objects.filter(PatientId = patient,Status = 'Pending').exists():
                            return JsonResponse({'warn': 'Patient Request is already in pending'})
                                                
                        else:
                            Patient_OP = Patient_Appointment_Registration_Detials.objects.create(
                            PatientId = patient,
                            VisitId = patient_visit_id,  
                            VisitPurpose = visit_purpose, 
                            Specialization = specialization_instance, 
                            PrimaryDoctor = doctor_name_instance, 
                            Complaint = complaint, 
                            PatientType = patient_type, 
                            PatientCategory = patient_category, 
                            InsuranceName = insurance_name, 
                            InsuranceType = insurance_type, 
                            ClientName = client_name, 
                            ClientType = client_type, 
                            ClientEmployeeId = client_employee_id, 
                            ClientEmployeeDesignation = client_employee_designation, 
                            ClientEmployeeRelation = client_employee_relation, 
                            EmployeeId = employee_instance, 
                            EmployeeRelation = employee_relation, 
                            DoctorId = doctor_instance, 
                            DoctorRelation = doctor_relation, 
                            DonationType = donation_type, 
                            IsMLC = is_mlc, 
                            Flagging = flagging, 
                            IsReferral = is_referral, 
                            created_by = created_by,
                            Location=location_instance,
                            ApptoRegId = appointment_instance,
                            )
                            if apptoreg:
                                appstatus= Appointment_Request_List.objects.get(pk=apptoreg)
                                
                                appstatus.status = 'REGISTERED'
                                appstatus.save()
                                
                            create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,Patient_OP,created_by)
                        return JsonResponse({'success': 'Patient Appointment registered successfully'})
                    
                    elif register_type == 'IP':
                        Patient_IP = Patient_IP_Registration_Detials.objects.create(
                            PatientId=patient,
                            VisitId=patient_visit_id,
                            Specialization=specialization_instance, 
                            PrimaryDoctor=doctor_name_instance, 
                            Complaint=complaint, 
                            PatientType=patient_type, 
                            PatientCategory=patient_category, 
                            InsuranceName=insurance_name, 
                            InsuranceType=insurance_type, 
                            ClientName=client_name, 
                            ClientType=client_type, 
                            ClientEmployeeId=client_employee_id, 
                            ClientEmployeeDesignation=client_employee_designation, 
                            ClientEmployeeRelation=client_employee_relation, 
                            EmployeeId=employee_instance, 
                            EmployeeRelation=employee_relation, 
                            DoctorId=doctor_instance, 
                            DoctorRelation=doctor_relation, 
                            DonationType=donation_type, 
                            IsMLC=is_mlc, 
                            Flagging=flagging, 
                            IsReferral=is_referral, 
                            created_by=created_by,
                            Location=location_instance
                        )
                        
                        Patient_Admission_Detials.objects.create(
                            IsConverted = True if optoip_id else False,
                            OP_Registration_Id = OP_regis_ins,
                            IsCasualityPatient = True if IsCasualityPatient =='Yes' else False  ,
                            IP_Registration_Id = Patient_IP,
                            Casuality_Registration_Id = casuality_patient_instance,
                            AdmissionPurpose = AdmissionPurpose,
                            DrInchargeAtTimeOfAdmission = DrInchargeatTimeofAdmission_instance,
                            NextToKinName = NexttokinName,
                            Relation = relation,
                            RelativePhoneNo = relativePhoneno,
                            PersonLiableForPayment = personLiableforpayment,
                            FamilyHead = familyhead,
                            FamilyHeadName = familyheadName,
                            IpKitGiven = ipKitGiven,
                        )
                        if OP_regis_ins and optoip_id:
                                                    
                            opip_ins = Op_to_Ip_Convertion_Table.objects.get(Registration_id = OP_regis_ins)
                            opip_ins.Status = 'Completed'
                            opip_ins.save()
                            
                        Patient_Admission_Room_Detials.objects.create(
                            RegisterType = register_type,
                            IP_Registration_Id = Patient_IP,
                            Casuality_Registration_Id = None,
                            RoomId = roomid_instance,
                            created_by=created_by
                        )
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,Patient_IP,created_by)
                        
                        return JsonResponse({'success': 'Patient Admitted successfully'})
                    elif register_type == 'Casuality':
                        print('---',patient)
                        Patient_Casuality = Patient_Casuality_Registration_Detials.objects.create(
                            PatientId= patient if phone_no and first_name else None,
                            VisitId=patient_visit_id,
                            IsConsciousness=IsConsciousness,
                            Specialization=specialization_instance, 
                            PrimaryDoctor=doctor_name_instance, 
                            Complaint=complaint, 
                            PatientType=patient_type, 
                            PatientCategory=patient_category, 
                            InsuranceName=insurance_name, 
                            InsuranceType=insurance_type, 
                            ClientName=client_name, 
                            ClientType=client_type, 
                            ClientEmployeeId=client_employee_id, 
                            ClientEmployeeDesignation=client_employee_designation, 
                            ClientEmployeeRelation=client_employee_relation, 
                            EmployeeId=employee_instance, 
                            EmployeeRelation=employee_relation, 
                            DoctorId=doctor_instance, 
                            DoctorRelation=doctor_relation, 
                            DonationType=donation_type, 
                            IsMLC=is_mlc, 
                            Flagging=flagging, 
                            IsReferral=is_referral, 
                            created_by=created_by,
                            Location=location_instance
                        )
                        
                        Patient_Admission_Room_Detials.objects.create(
                            RegisterType = register_type,
                            IP_Registration_Id = None,
                            Casuality_Registration_Id = Patient_Casuality,
                            RoomId = roomid_instance
                        )
                        
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,Patient_Casuality,created_by)
                        return JsonResponse({'success': 'Casuality Registered successfully'})
                    elif register_type == 'Diagnosis':
                        Patient_Diagnosis = Patient_Diagnosis_Registration_Detials.objects.create(
                            PatientId=patient,
                            VisitId=patient_visit_id,
                            Specialization = specialization_instance,
                            PrimaryDoctor = doctor_name_instance,
                            Complaint=complaint, 
                            PatientType=patient_type, 
                            PatientCategory=patient_category, 
                            InsuranceName=insurance_name, 
                            InsuranceType=insurance_type, 
                            ClientName=client_name, 
                            ClientType=client_type, 
                            ClientEmployeeId=client_employee_id, 
                            ClientEmployeeDesignation=client_employee_designation, 
                            ClientEmployeeRelation=client_employee_relation, 
                            EmployeeId=employee_instance, 
                            EmployeeRelation=employee_relation, 
                            DoctorId=doctor_instance, 
                            DoctorRelation=doctor_relation, 
                            DonationType=donation_type, 
                            IsMLC=is_mlc, 
                            Flagging=flagging, 
                            IsReferral=is_referral, 
                            created_by=created_by,
                            Location=location_instance
                        )
                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,Patient_Diagnosis,created_by)
                        return JsonResponse({'success': 'Diagnosis Registered successfully'})
                    elif register_type == 'Laboratory':
                        Patient_Laboratory = Patient_Laboratory_Registration_Detials.objects.create(
                            PatientId=patient,
                            VisitId=patient_visit_id, 
                            Specialization = specialization_instance,
                            PrimaryDoctor = doctor_name_instance,
                            Complaint=complaint, 
                            PatientType=patient_type, 
                            PatientCategory=patient_category, 
                            InsuranceName=insurance_name, 
                            InsuranceType=insurance_type, 
                            ClientName=client_name, 
                            ClientType=client_type, 
                            ClientEmployeeId=client_employee_id, 
                            ClientEmployeeDesignation=client_employee_designation, 
                            ClientEmployeeRelation=client_employee_relation, 
                            EmployeeId=employee_instance, 
                            EmployeeRelation=employee_relation, 
                            DoctorId=doctor_instance, 
                            DoctorRelation=doctor_relation, 
                            DonationType=donation_type, 
                            IsMLC=is_mlc, 
                            Flagging=flagging, 
                            IsReferral=is_referral, 
                            created_by=created_by,
                            Location=location_instance
                        )
                        if TestNames:
                            print("TestNames",TestNames)
                            for test in TestNames:
                                testcode = test.get('TestCode', '')
                                testtype = "Indivitual"
                                
                                # Get the testcode instance from LabTestName_Details model
                                try:
                                    testcode_ins = LabTestName_Details.objects.get(TestCode=testcode)
                                except LabTestName_Details.DoesNotExist:
                                    return JsonResponse({'error': f'Test code {testcode} does not exist'}, status=400)
                                
                                # Create a record in Lab_Request_Details
                                print("Patient_Laboratory",Patient_Laboratory)
                                Lab_Request_Details.objects.create(
                                    RegisterType="ExternalLab",
                                    Laboratory_Register_Id=Patient_Laboratory,  # Link to the Patient_Laboratory instance
                                    TestType=testtype,
                                    IndivitualCode=testcode_ins,  # Link the test code instance
                                    created_by=created_by,
                                    Status='Request'  # Default status
                                )

                        create_or_update_referral(is_referral,referral_source,referral_doctor_instance,register_type,register_Id,Patient_Laboratory,created_by)
                        return JsonResponse({'success': 'Laboratory Registered successfully'})
                    
                return JsonResponse({'success': 'Patient Detials updated successfully'})

           

        except Patient_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient with the given ID does not exist'})
        except Doctor_Personal_Form_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor or referred doctor does not exist'})
        except Exception as e:
            return JsonResponse({'error': str(e)})

    elif request.method == 'GET':
        try:
            patient_id = request.GET.get('PatientId')
            if patient_id:
                patient = Patient_Detials.objects.get(PatientId=patient_id)
                return JsonResponse({
                    'id': patient.PatientId,
                    'phoneNo': patient.PhoneNo,
                    'firstName': patient.FirstName,
                    'lastName': patient.SurName,
                })
            else:
                patients = list(Patient_Detials.objects.values())
                return JsonResponse(patients, safe=False)
        except Patient_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient with the given ID does not exist'})
        except Exception as e:
            return JsonResponse({'error': str(e)})
        
    else:
        return JsonResponse({'error': 'Invalid request method'},status=405)


@csrf_exempt
def get_Employee_by_PatientCategory(request):
    if request.method == 'GET':
        try:
            
            # Retrieve all employees, you might want to filter this based on specific criteria
            employee_query_set = Employee_Personal_Form_Detials.objects.all()
            
            # Check if any employee records exist
            if not employee_query_set.exists():
                return JsonResponse({'error': 'No employees found'})
            
            emp_datas = []
            for emp in employee_query_set:
                emp_dict = {
                    'id': emp.Employee_ID,
                    'Name': f'{emp.Tittle}.{emp.First_Name} {emp.Middle_Name} {emp.Last_Name}',
                    # 'ShortName': f'{emp.Tittle}.{emp.First_Name} {emp.Last_Name}',
                }
                emp_datas.append(emp_dict)
            
            # Return JSON response
            return JsonResponse(emp_datas, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt
def get_DoctorId_by_PatientCategory(request):
    if request.method == 'GET':
        try:
            

            # Retrieve all employees, you might want to filter this based on specific criteria
            Doctor_query_set = Doctor_Personal_Form_Detials.objects.all()
            
            # Check if any employee records exist
            if not Doctor_query_set.exists():
                return JsonResponse({'error': 'No Doctor found'})
            
            Doc_datas = []
            for Doc in Doctor_query_set:
                Doc_dict = {
                    'id': Doc.Doctor_ID,
                    'Name': f'{Doc.Tittle}.{Doc.First_Name} {Doc.Middle_Name} {Doc.Last_Name}',
                    'ShortName': f'{Doc.Tittle}.{Doc.ShortName} ',
                }
                Doc_datas.append(Doc_dict)
            
            # Return JSON response
            return JsonResponse(Doc_datas, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_file_image(filedata):
    mime = magic.Magic()
    contenttype = mime.from_buffer(filedata).split(',')[0]
    print('contenttype :',contenttype)
    contenttype1 = 'application/pdf'
    if contenttype == 'application/pdf':
        contenttype1 = 'application/pdf'
    elif contenttype == 'JPEG image data':
        contenttype1 = 'image/jpeg'
    elif contenttype == 'PNG image data':
        contenttype1 = 'image/png'
    
    
    return f"data:{contenttype1};base64,{base64.b64encode(filedata).decode('utf-8')}"

@csrf_exempt
@require_http_methods(["GET"])
def get_Patient_Details_by_patientId(request):
    try:
        PatientId = request.GET.get("PatientId", '')
        FirstName = request.GET.get("FirstName", '')
        PhoneNumber = request.GET.get("PhoneNumber", '')
        
        print(PatientId,'PatientId')
        print(FirstName,'FirstName')
        print(PhoneNumber,'PhoneNumber')
        
        
       
        if Patient_Detials.objects.exists():
            patient=None
            print('hiiiii')
            
            if PatientId:
                patient = Patient_Detials.objects.get(Q(PatientId=PatientId) & Q(DuplicateId=False))
            elif FirstName and PhoneNumber:
                print('hiiiii')
                if Patient_Detials.objects.filter(Q(FirstName=FirstName)  & Q(PhoneNo=PhoneNumber) & Q(DuplicateId=False)).exists():
                    
                    patient = Patient_Detials.objects.get(Q(FirstName=FirstName)  & Q(PhoneNo=PhoneNumber) & Q(DuplicateId=False))
                else:
                    return JsonResponse({'warn':'patient Does not exist'})
                    
            print('hiiiii')
            if patient:
                Patient_data={
                    'PatientProfile': get_file_image(patient.Patient_profile) if patient.Patient_profile else None,
                    'PatientId': patient.PatientId,
                    'CaseSheetNo': patient.CasesheetNo,
                    'PhoneNo': int(patient.PhoneNo),
                    'Title': patient.Title,
                    'FirstName': patient.FirstName,
                    'MiddleName': patient.MiddleName,
                    'SurName': patient.SurName,
                    'Gender': patient.Gender,
                    'AliasName': patient.AliasName,
                    'DOB': patient.DOB,
                    'Age': patient.Age,
                    'Email': patient.Email,
                    'BloodGroup': patient.BloodGroup,
                    'Occupation': patient.Occupation,
                    'Religion': patient.Religion.Religion_Id,
                    'Nationality': patient.Nationality,
                    'UniqueIdType': patient.UniqueIdType,
                    'UniqueIdNo': patient.UniqueIdNo,
                    'DoorNo': patient.DoorNo,
                    'Street': patient.Street,
                    'Area': patient.Area,
                    'City': patient.City,
                    'State': patient.State,
                    'Country': patient.Country,
                    'Pincode': patient.Pincode,
                }
                return JsonResponse(Patient_data)
            else:
                return JsonResponse({'warn':'patient Does not exist'})
        else:
                return JsonResponse({'warn':'patient Does not exist'})
            

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'})


@csrf_exempt
@require_http_methods(["GET"])
def Filter_Patient_by_Multiple_Criteria(request):
    try:
        first_name = request.GET.get("FirstName", None)
        phone_no = request.GET.get("PhoneNo", None)
        patient_id = request.GET.get("PatientId", None)
        
        print(first_name, 'FirstName')
        print(phone_no, 'PhoneNo')
        print(patient_id, 'PatientId')

        filter_conditions = Q()
        if first_name:
            filter_conditions &= Q(FirstName__icontains=first_name)
        if phone_no:
            filter_conditions &= Q(PhoneNo__icontains=phone_no)
        if patient_id:
            filter_conditions &= Q(PatientId__icontains=patient_id)

        patients = Patient_Detials.objects.filter(filter_conditions,DuplicateId=False)[:10]
        

        patient_data = [
            {
                'PatientId': patient.PatientId,
                'PhoneNo': int(patient.PhoneNo),
                'FirstName': patient.FirstName,
            } for patient in patients
        ]

       
        return JsonResponse(patient_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'},status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_patient_appointment_details(request):
    try:
        query = request.GET.get('query', '')
        status = request.GET.get('status', '')

        # Fetching all appointment details
        queryset = Patient_Appointment_Registration_Detials.objects.all()


        # Apply filters based on the query parameters
        if query:
            queryset = queryset.filter(
                Q(PatientId__FirstName__icontains=query)|
                Q(PatientId__MiddleName__icontains=query)|
                Q(PatientId__SurName__icontains=query)|
                Q(PatientId__PatientId__icontains=query)|
                Q(PatientId__PhoneNo__icontains=query)
                )
        if status:
            queryset = queryset.filter(Q(Status__icontains=status))

        # Fetch cancellation and reschedule details
        appointment_register_data = []
        for idx, register in enumerate(queryset, start=1):
            # Prepare the appointment data dictionary
            appointment_dict = {
                'id': idx,
                'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                'PatientId': register.PatientId.PatientId,
                'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                'PhoneNo': register.PatientId.PhoneNo,
                'AppointmentId': register.AppointmentId,
                'VisitId': register.VisitId,
                'Complaint': register.Complaint,
                'isMLC': register.IsMLC,
                'Flagging': register.Flagging,
                'isRefferal': register.IsReferral,
                'Status': register.Status,
                'DoctorId': register.PrimaryDoctor.Doctor_ID if register.PrimaryDoctor.Doctor_ID else None, 
                'RegistrationId': register.pk,
                'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.ShortName}",
                'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
                'UniqueIdType' : register.PatientId.UniqueIdType,
                'UniqueIdNo' : register.PatientId.UniqueIdNo,
            }

            # Add reason if status is "Cancelled"
            if register.Status == "Cancelled":
                cancel_details = Patient_Appointment_Registration_Cancel_Details.objects.filter(
                    Registration_Id=register.pk
                ).first()
                appointment_dict['Reason'] = cancel_details.Cancel_Reason if cancel_details else None

            # Fetch reschedule reason if available
            reschedule_details = Patient_Registration_Reshedule_Details.objects.filter(
                Registration_Id=register.pk
            ).first()
            if reschedule_details:
                appointment_dict['ChangingReason'] = reschedule_details.ChangingReason

            appointment_register_data.append(appointment_dict)

        return JsonResponse(appointment_register_data, safe=False)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def get_patient_unique_id(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):       
        if request.method == 'GET':
            try:
                patient_instance = Patient_Detials.objects.all()
                
                patient_details_data = []   
                for patient in patient_instance:
                    patient_dict ={
                        'PatientId' : patient.PatientId,
                        'PatientName': f"{patient.Title}.{patient.FirstName} {patient.MiddleName} {patient.SurName}",
                        'PhoneNo': patient.PhoneNo,
                        'UniqueIdType' : patient.UniqueIdType,
                        'UniqueIdNo' : patient.UniqueIdNo,
                    }
                patient_details_data.append(patient_dict)
                return JsonResponse(patient_details_data,safe=False)
            except Exception as e:
                return JsonResponse({"error" : str(e)})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def get_patient_ip_registration_details(request):
        try:
           
            query = request.GET.get('query', '')
            status = request.GET.get('status', '')

            queryset = Patient_IP_Registration_Detials.objects.all()

            # Apply filters based on the query parameters
            if query:
                queryset = queryset.filter(
                    Q(PatientId_FirstName_icontains=query)|
                    Q(PatientId_MiddleName_icontains=query)|
                    Q(PatientId_SurName_icontains=query)|
                    Q(PatientId_PatientId_icontains=query)|
                    Q(PatientId_PhoneNo_icontains=query))
           
            if status:
                queryset = queryset.filter(Q(Status__icontains=status))


            # Serialize the filtered queryset
            ip_register_data = []
            for idx, register in enumerate(queryset,start=1): 
                patient = register.PatientId
                appointment_dict = {
                    'id' : idx,
                    'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                    'RegistrationId':register.Registration_Id,
                    'PatientId': register.PatientId.PatientId,
                    'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                    'PhoneNo': register.PatientId.PhoneNo,
                    'Age': register.PatientId.Age,
                    'Gender': register.PatientId.Gender,
                    'Address': f"{patient.DoorNo}.{patient.Street}.{patient.Area}.{patient.City}.{patient.State}.{patient.Country}.{patient.Pincode}",
                    'BloodGroup': register.PatientId.BloodGroup,
                    'Complaint': register.Complaint,
                    'isMLC': register.IsMLC,
                    'Flagging': register.Flagging,
                    'isRefferal': register.IsReferral,
                    'Status': register.Status,
                    'userName': register.created_by,
                    # 'DoctorId': register.PrimaryDoctor.Doctor_ID,
                    'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.First_Name} {register.PrimaryDoctor.Last_Name}",
                    'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
                    'CurrDate': register.created_at.strftime('%d-%m-%y') if register.created_at else "",
                    'CurrTime': register.created_at.strftime('%I:%M %p') if register.created_at else "",
                    
                
                }
                ip_register_data.append(appointment_dict)

            return JsonResponse(ip_register_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})



@csrf_exempt
@require_http_methods(["GET"])
def get_patient_casuality_details(request):
        try:
           
            query = request.GET.get('query', '')
            status = request.GET.get('status', '')

            queryset = Patient_Casuality_Registration_Detials.objects.all()

            # Apply filters based on the query parameters
            if query:
                queryset = queryset.filter(
                    Q(PatientId__FirstName__icontains=query)|
                    Q(PatientId__MiddleName__icontains=query)|
                    Q(PatientId__SurName__icontains=query)|
                    Q(PatientId__PatientId__icontains=query)|
                    Q(PatientId__PhoneNo__icontains=query))
           
            if status:
                queryset = queryset.filter(Q(Status__icontains=status))


            # Serialize the filtered queryset
            casuality_register_data = []
            for idx, register in enumerate(queryset, start=1): 
                appointment_dict = {
                    'id' : idx,
                    'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId and register.PatientId.Patient_profile else None,
                    'RegistrationId':register.pk,
                    'PatientId': register.PatientId.PatientId if register.PatientId else None,
                    'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}" if register.PatientId else None,
                    'PhoneNo': register.PatientId.PhoneNo if register.PatientId else None,
                    'VisitId': register.VisitId,
                    'Complaint': register.Complaint,
                    'isMLC': register.IsMLC,
                    'Flagging': register.Flagging,
                    'isRefferal': register.IsReferral,
                    'Status': register.Status,
                    'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.First_Name} {register.PrimaryDoctor.Last_Name}" if register.PrimaryDoctor else None,
                    'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
                }
                casuality_register_data.append(appointment_dict)

            return JsonResponse(casuality_register_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})





@csrf_exempt
@require_http_methods(["GET"])
def get_patient_diagnosis_details(request):
        try:
           
            query = request.GET.get('query', '')
            status = request.GET.get('status', '')

            queryset = Patient_Diagnosis_Registration_Detials.objects.all()

            # Apply filters based on the query parameters
            if query:
                queryset = queryset.filter(
                    Q(PatientId__FirstName__icontains=query)|
                    Q(PatientId__MiddleName__icontains=query)|
                    Q(PatientId__SurName__icontains=query)|
                    Q(PatientId__PatientId__icontains=query)|
                    Q(PatientId__PhoneNo__icontains=query))
           
            if status:
                queryset = queryset.filter(Q(Status__icontains=status))


            # Serialize the filtered queryset
            diagnosis_register_data = []
            for idx, register in enumerate(queryset, start=1): 
                appointment_dict = {
                    'id' : idx,
                    'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                    'RegistrationId':register.pk,
                    'PatientId': register.PatientId.PatientId,
                    'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                    'VisitId': register.VisitId,
                    'PhoneNo': register.PatientId.PhoneNo,
                    'Complaint': register.Complaint,
                    'isMLC': register.IsMLC,
                    'Flagging': register.Flagging,
                    'isRefferal': register.IsReferral,
                    'Status': register.Status,
                }
                diagnosis_register_data.append(appointment_dict)

            return JsonResponse(diagnosis_register_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})
        


@csrf_exempt
@require_http_methods(["GET"])
def get_patient_laboratory_details(request):
        try:
           
            query = request.GET.get('query', '')
            status = request.GET.get('status', '')

            queryset = Patient_Laboratory_Registration_Detials.objects.all()

            # Apply filters based on the query parameters
            if query:
                queryset = queryset.filter(
                    Q(PatientId__FirstName__icontains=query)|
                    Q(PatientId__MiddleName__icontains=query)|
                    Q(PatientId__SurName__icontains=query)|
                    Q(PatientId__PatientId__icontains=query)|
                    Q(PatientId__PhoneNo__icontains=query))
           
            if status:
                queryset = queryset.filter(Q(Status__icontains=status))


            # Serialize the filtered queryset
            laboratory_register_data = []
            for idx, register in enumerate(queryset, start=1): 
                appointment_dict = {
                    'id' : idx,
                    'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                    'RegistrationId':register.pk,
                    'PatientId': register.PatientId.PatientId,
                    'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                    'PhoneNo': register.PatientId.PhoneNo,
                    'VisitId': register.VisitId,
                    'Complaint': register.Complaint,
                    'isMLC': register.IsMLC,
                    'Flagging': register.Flagging,
                    'isRefferal': register.IsReferral,
                    'Status': register.Status,
                }
                laboratory_register_data.append(appointment_dict)

            return JsonResponse(laboratory_register_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})
        
      
      
      
      

@csrf_exempt
@require_http_methods(["GET"])
def get_Registration_edit_details(request):
    try:
        RegistrationId = request.GET.get('RegistrationId', None)
        RegistrationType = request.GET.get('RegistrationType', None)
        
        if not RegistrationId:
            return JsonResponse({'error': 'RegistrationId is required'}, status=400)
        
        if not RegistrationType:
            return JsonResponse({'error': 'RegistrationType is required'}, status=400)
        
        try:
            model_class = {
                'OP': Patient_Appointment_Registration_Detials,
                'IP': Patient_IP_Registration_Detials,
                'Casuality': Patient_Casuality_Registration_Detials,
                'Diagnosis': Patient_Diagnosis_Registration_Detials,
                'Laboratory': Patient_Laboratory_Registration_Detials
            }.get(RegistrationType)
                
            if not model_class:
                raise ValueError("Invalid RegistrationType provided.")
            
            RegisterModel = model_class
           
            filters = {
                'OP': 'OP_Register_Id__pk',
                'IP': 'IP_Register_Id__pk',
                'Casuality': 'Casuality_Register_Id__pk',
                'Diagnosis': 'Diagnosis_Register_Id__pk',
                'Laboratory': 'Laboratory_Register_Id__pk'
            }
            filter_key = filters.get(RegistrationType)
            if not filter_key:
                raise ValueError("Invalid RegistrationType provided.")
            
            patient_instance = RegisterModel.objects.get(pk=RegistrationId)
            admission_instance=None
            admission_room_instance=None
            
            try:
                referral_instance = Patient_Referral_Detials.objects.get(**{filter_key: RegistrationId})
            except Patient_Referral_Detials.DoesNotExist:
                referral_instance = None
            
            route_details = {}
            
            if referral_instance and referral_instance.ReferredBy:
                doctor_profess_form_instance = Doctor_ProfessForm_Detials.objects.filter(
                    Doctor_ID=referral_instance.ReferredBy.Doctor_ID
                ).first()

                if doctor_profess_form_instance and doctor_profess_form_instance.RouteId:
                    route_instance = doctor_profess_form_instance.RouteId

                    route_details = {
                        'RouteNo': route_instance.Route_No,
                        'RouteName': route_instance.Route_Name,
                        'TehsilName': route_instance.Teshil_Name,
                        'VillageName': route_instance.Village_Name,
                    }
                
            if RegistrationType == 'IP':
                admission_instance = Patient_Admission_Detials.objects.get(IP_Registration_Id__pk = RegistrationId)
                admission_room_instance = Patient_Admission_Room_Detials.objects.get(IP_Registration_Id__pk = RegistrationId)
             
            IsConsciousness = "No"
            if RegistrationType == 'Casuality':
                admission_room_instance = Patient_Admission_Room_Detials.objects.get(Casuality_Registration_Id__pk = RegistrationId)
                IsConsciousness ='Yes' if patient_instance.IsConsciousness else 'No'
            
            Registration_dict = {
                'IsConsciousness':IsConsciousness,
                'PatientProfile': get_file_image(patient_instance.PatientId.Patient_profile) if patient_instance.PatientId.Patient_profile else None,
                'PatientId': patient_instance.PatientId.PatientId if patient_instance.PatientId else "",
                'PhoneNo': patient_instance.PatientId.PhoneNo if patient_instance.PatientId else "",
                'Title': patient_instance.PatientId.Title if patient_instance.PatientId else "",
                'FirstName': patient_instance.PatientId.FirstName if patient_instance.PatientId else "",
                'MiddleName': patient_instance.PatientId.MiddleName if patient_instance.PatientId else "",
                'SurName': patient_instance.PatientId.SurName if patient_instance.PatientId else "",
                'Gender': patient_instance.PatientId.Gender if patient_instance.PatientId else "",
                'AliasName': patient_instance.PatientId.AliasName if patient_instance.PatientId else "",
                'DOB': patient_instance.PatientId.DOB if patient_instance.PatientId else "",
                'Age': patient_instance.PatientId.Age if patient_instance.PatientId else "",
                'Email': patient_instance.PatientId.Email if patient_instance.PatientId else "",
                'BloodGroup': patient_instance.PatientId.BloodGroup if patient_instance.PatientId else "",
                'Occupation': patient_instance.PatientId.Occupation if patient_instance.PatientId else "",
                'Religion': patient_instance.PatientId.Religion.Religion_Id if patient_instance.PatientId else "",
                'ReligionName': patient_instance.PatientId.Religion.Religion_Name if patient_instance.PatientId else "",
                'Nationality': patient_instance.PatientId.Nationality if patient_instance.PatientId else "",
                'UniqueIdType': patient_instance.PatientId.UniqueIdType if patient_instance.PatientId else "",
                'UniqueIdNo': patient_instance.PatientId.UniqueIdNo if patient_instance.PatientId else "",
                'VisitPurpose': patient_instance.VisitPurpose if RegistrationType == 'OP' else '',
                'Specialization': patient_instance.Specialization.Speciality_Id if patient_instance.Specialization else '',
                'DoctorName': patient_instance.PrimaryDoctor.Doctor_ID if patient_instance.PrimaryDoctor else "",
                'CaseSheetNo': patient_instance.PatientId.CasesheetNo if patient_instance.PatientId else "",
                'Complaint': patient_instance.Complaint,
                'PatientType': patient_instance.PatientType,
                'PatientCategory': patient_instance.PatientCategory,
                'InsuranceName': patient_instance.InsuranceName,
                'InsuranceType': patient_instance.InsuranceType,
                'ClientName': patient_instance.ClientName,
                'ClientType': patient_instance.ClientType,
                'ClientEmployeeId': patient_instance.ClientEmployeeId,
                'ClientEmployeeDesignation': patient_instance.ClientEmployeeDesignation,
                'ClientEmployeeRelation': patient_instance.ClientEmployeeRelation,
                'EmployeeId': patient_instance.EmployeeId.Employee_ID if patient_instance.EmployeeId else "",
                'DoctorId': patient_instance.DoctorId.Doctor_ID if patient_instance.PatientCategory == 'Doctor'and patient_instance.DoctorId else "",
                'DoctorRelation': patient_instance.DoctorRelation,
                'DonationType': patient_instance.DonationType,
                'IsMLC': patient_instance.IsMLC,
                'IsCasualityPatient': admission_instance.IsCasualityPatient if admission_instance else '' ,
                'Casuality_Registration_Id': admission_instance.Casuality_Registration_Id if admission_instance else '' ,
                'AdmissionPurpose': admission_instance.AdmissionPurpose if admission_instance else '' ,
                'DrInchargeAtTimeOfAdmission': admission_instance.DrInchargeAtTimeOfAdmission.Doctor_ID if admission_instance and admission_instance.DrInchargeAtTimeOfAdmission else '' ,
                'NextToKinName': admission_instance.NextToKinName if admission_instance else '',
                'Relation': admission_instance.Relation if admission_instance else '',
                'RelativePhoneNo': admission_instance.RelativePhoneNo if admission_instance else '',
                'PersonLiableForBillPayment': admission_instance.PersonLiableForPayment if admission_instance else '',
                'FamilyHead': admission_instance.FamilyHead if admission_instance else '',
                'FamilyHeadName': admission_instance.FamilyHeadName if admission_instance else '',
                'IpKitGiven': admission_instance.IpKitGiven if admission_instance else '',
                'Flagging': patient_instance.Flagging,
                'IsReferal': patient_instance.IsReferral,
                'DoorNo': patient_instance.PatientId.DoorNo if patient_instance.PatientId else "",
                'Street': patient_instance.PatientId.Street if patient_instance.PatientId else "",
                'Area': patient_instance.PatientId.Area if patient_instance.PatientId else "",
                'City': patient_instance.PatientId.City if patient_instance.PatientId else "",
                'State': patient_instance.PatientId.State if patient_instance.PatientId else "",
                'Country': patient_instance.PatientId.Country if patient_instance.PatientId else "",
                'Pincode': patient_instance.PatientId.Pincode if patient_instance.PatientId else "",
                'Building': admission_room_instance.RoomId.Building_Name.pk if admission_room_instance else "" ,
                'Block': admission_room_instance.RoomId.Block_Name.pk  if admission_room_instance else "", 
                'Floor': admission_room_instance.RoomId.Floor_Name.pk  if admission_room_instance else "", 
                'WardType': admission_room_instance.RoomId.Ward_Name.pk  if admission_room_instance else "", 
                'RoomType': admission_room_instance.RoomId.Room_Name.pk  if admission_room_instance else "", 
                'BuildingName': admission_room_instance.RoomId.Building_Name.Building_Name if admission_room_instance else "" ,
                'BlockName': admission_room_instance.RoomId.Block_Name.Block_Name  if admission_room_instance else "", 
                'FloorName': admission_room_instance.RoomId.Floor_Name.Floor_Name  if admission_room_instance else "", 
                'WardTypeName': admission_room_instance.RoomId.Ward_Name.Ward_Name  if admission_room_instance else "", 
                'RoomTypeName': admission_room_instance.RoomId.Room_Name.Room_Name  if admission_room_instance else "", 
                'RoomNo': admission_room_instance.RoomId.Room_No  if admission_room_instance else "", 
                'BedNo': admission_room_instance.RoomId.Bed_No  if admission_room_instance else "", 
                'RoomId': admission_room_instance.RoomId.pk if admission_room_instance else ""  
            }
            if referral_instance:
                Registration_dict.update({
                    'ReferralSource': referral_instance.ReferralSource,
                    'ReferredBy': referral_instance.ReferredBy.Doctor_ID if referral_instance.ReferredBy else '',
                    'ReferralRegisteredBy': referral_instance.ReferralRegisteredBy,
                })
            Registration_dict.update(route_details)
                
            return JsonResponse(Registration_dict)
        except RegisterModel.DoesNotExist:
            return JsonResponse({'error': 'Record not found'}, status=404)
      
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

  





@csrf_exempt
@require_http_methods(["GET"])
def get_patient_visit_details(request):
    try:
        PatientId = request.GET.get('PatientId', '')
        FirstName = request.GET.get('FirstName', '')
        PhoneNo = request.GET.get('PhoneNo', '')
        DoctorId = request.GET.get('DoctorId','')
        
        print('DoctorIddddddd',DoctorId)

        # Fetch the patient record
        patient = Patient_Detials.objects.filter(Q(PhoneNo=PhoneNo, FirstName=FirstName) | Q(PatientId=PatientId)).first()
        
        if patient:
            
            # Fetch the latest appointment for the patient
            latest_appointment = Patient_Appointment_Registration_Detials.objects.filter(PatientId=patient,VisitPurpose='NewConsultation', PrimaryDoctor__pk = DoctorId).order_by('-created_at').first()
            print('---',latest_appointment.pk)

            if latest_appointment:
                if Patient_Appointment_Registration_Detials.objects.exclude(pk = latest_appointment.pk,Status= 'Cancelled' or 'Pending').exists():
                    print('--00')
                    # Calculate the time difference between now and the last visit
                    days_since_last_visit = (datetime.now() - latest_appointment.created_at).days
                    
                    if days_since_last_visit <= 5:
                        pat_ins = 'FollowUp - No Fee'
                    elif days_since_last_visit <= 60:
                        pat_ins = 'FollowUp - FollowUp Fee'
                    else:
                        pat_ins = 'NewConsultation'
                else:
                        pat_ins = 'NewConsultation'
            else:
                pat_ins = 'NewConsultation'
        else:
            pat_ins = 'NewConsultation'

        return JsonResponse({'VisitPurpose': pat_ins})

    except Exception as e:
        return JsonResponse({'error': str(e)})





@csrf_exempt
@require_http_methods(["GET"])
def get_ip_registration_before_handover_details(request):
        try:
           
            query = request.GET.get('query', '')
            status = request.GET.get('status', '')
            Booking_Status = 'Booked' if status == 'Pending' else ('Occupied' if status == 'Admitted' else 'Cancelled')

            queryset = Patient_IP_Registration_Detials.objects.all()

            # Apply filters based on the query parameters
            if query:
                queryset = queryset.filter(
                    Q(PatientId_FirstName_icontains=query)|
                    Q(PatientId_MiddleName_icontains=query)|
                    Q(PatientId_SurName_icontains=query)|
                    Q(PatientId_PatientId_icontains=query)|
                    Q(PatientId_PhoneNo_icontains=query)
                    ).filter(Booking_Status=Booking_Status)
           
            if status:
                queryset = queryset.filter(Q(Status__icontains=status)).filter(Booking_Status=Booking_Status)


            # Serialize the filtered queryset
            ip_register_data = []
            for idx, register in enumerate(queryset,start=1): 
                appointment_dict = {
                    'id' : idx,
                    'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                    'RegistrationId':register.Registration_Id,
                    'PatientId': register.PatientId.PatientId,
                    'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                    'PhoneNo': register.PatientId.PhoneNo,
                    'Age': register.PatientId.Age,
                    'Gender': register.PatientId.Gender,
                    'BloodGroup': register.PatientId.BloodGroup,
                    'Complaint': register.Complaint,
                    'isMLC': register.IsMLC,
                    'Flagging': register.Flagging,
                    'isRefferal': register.IsReferral,
                    'Status': register.Status,
                    'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.First_Name} {register.PrimaryDoctor.Last_Name}",
                    'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
                }
                if register.Booking_Status in ['Booked','Occupied']:
                    roomdetials=Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id=register).order_by('-created_by').first()
                    appointment_dict['BuildingName']=roomdetials.RoomId.Building_Name.Building_Name
                    appointment_dict['BlockName']=roomdetials.RoomId.Block_Name.Block_Name
                    appointment_dict['FloorName']=roomdetials.RoomId.Floor_Name.Floor_Name
                    appointment_dict['WardName']=roomdetials.RoomId.Ward_Name.Ward_Name
                    appointment_dict['RoomName']=roomdetials.RoomId.Room_Name.Room_Name
                    appointment_dict['RoomNo']=roomdetials.RoomId.Room_No
                    appointment_dict['BedNo']=roomdetials.RoomId.Bed_No
                    appointment_dict['RoomId']=roomdetials.RoomId.Room_Id
                ip_register_data.append(appointment_dict)

            return JsonResponse(ip_register_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})




@csrf_exempt
@require_http_methods(["GET"])
def get_ip_roomdetials_before_handover_details(request):
    try:
        RegistrationId = request.GET.get('RegistrationId', '')

        # Get the first room detail entry
        roomdetials = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId).earliest('created_at')
       
        ip_register_data = {
            'ip_register_data':[],
            'Roomsdata':[],
        }
        if roomdetials:
            data={
            'BuildingName': roomdetials.RoomId.Building_Name.Building_Name,
            'BlockName': roomdetials.RoomId.Block_Name.Block_Name,
            'FloorName': roomdetials.RoomId.Floor_Name.Floor_Name,
            'WardName': roomdetials.RoomId.Ward_Name.Ward_Name,
            'RoomName': roomdetials.RoomId.Room_Name.Room_Name,
            'RoomNo': roomdetials.RoomId.Room_No,
            'BedNo': roomdetials.RoomId.Bed_No,
            'RoomId': roomdetials.RoomId.pk,
            'DateTime': roomdetials.created_at.strftime('%d-%m-%y - %H-%M'),
            'id':1
            }
            ip_register_data['ip_register_data'].append(data)
            

        # Fetch all room details and add the remaining ones to the Roomsdata list
        roomdatass = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId).order_by('created_at')[1:]  # Skip the first entry
        index=0
        for roomdetials in roomdatass:
            data = {}
            data['BuildingName'] = roomdetials.RoomId.Building_Name.Building_Name
            data['BlockName'] = roomdetials.RoomId.Block_Name.Block_Name
            data['FloorName'] = roomdetials.RoomId.Floor_Name.Floor_Name
            data['WardName'] = roomdetials.RoomId.Ward_Name.Ward_Name
            data['RoomName'] = roomdetials.RoomId.Room_Name.Room_Name
            data['RoomNo'] = roomdetials.RoomId.Room_No
            data['BedNo'] = roomdetials.RoomId.Bed_No
            data['RoomId'] = roomdetials.RoomId.Room_Id
            data['DateTime'] = roomdetials.created_at.strftime('%d-%m-%y - %H-%M')
            data['id'] = index+1
            
            
            ip_register_data['Roomsdata'].append(data)
            index += 1

        return JsonResponse(ip_register_data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)})


@csrf_exempt
@require_http_methods(["POST"])
def post_ip_roomdetials_before_handover_details(request):
    try:
        data = json.loads(request.body)
        RegistrationId = data.get('RegistrationId', '')
        RoomId = data.get('RoomId', '')
        createdby = data.get('createdby', '')
        
        if RoomId:
            room_ins = Room_Master_Detials.objects.get(pk=RoomId)
        else:
            return JsonResponse({'error': 'RoomId is required'}, status=400)

        if RegistrationId:
            register_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
        else:
            return JsonResponse({'error': 'RegistrationId is required'}, status=400)
        
        if room_ins and register_ins:
            previous_room_detail = Patient_Admission_Room_Detials.objects.filter(
                    IP_Registration_Id=register_ins
                ).order_by('-created_at').first()
            if previous_room_detail:
                                
                previous_room_detail.RoomId.Booking_Status = 'Available'
                previous_room_detail.RoomId.save()
                
            # Create a new Patient_Admission_Room_Detials entry
            Patient_Admission_Room_Detials.objects.create(
                RegisterType='IP',
                IP_Registration_Id=register_ins,  # Corrected field name
                Casuality_Registration_Id=None,
                RoomId=room_ins,
                created_by=createdby
            )
            
            

        return JsonResponse({'success': 'Room changed successfully'}, safe=False)

    except Room_Master_Detials.DoesNotExist:
        return JsonResponse({'error': 'Room does not exist'}, status=404)

    except Patient_IP_Registration_Detials.DoesNotExist:
        return JsonResponse({'error': 'IP Registration does not exist'}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
@require_http_methods(["POST","GET","OPTIONS"])
def post_ip_handover_details(request):
    if request.method=="POST":
        try:
            data = json.loads(request.body)
            RegistrationId = data.get('RegistrationId', '')
            ReasonForAdmission = data.get('ReasonForAdmission', '')
            PatientConditionOnAdmission = data.get('PatientConditionOnAdmission', '')
            PatientFileGiven = data.get('PatientFileGiven', '')
            AadharGiven = data.get('AadharGiven', '')
            created_by = data.get('created_by', '')
            
            
            if RegistrationId:
                register_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            
            Handover_detials_Ip.objects.create(
                RegistrationId=register_ins, 
                ReasonForAdmission=ReasonForAdmission,
                PatientConditionOnAdmission=PatientConditionOnAdmission,
                PatientFileGiven= True if PatientFileGiven=='Yes' else False,
                AadharGiven=True if AadharGiven=='Yes' else False,
                created_by=created_by
            )
                
                

            return JsonResponse({'success': 'Detials added successfully'}, safe=False)

        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'IP Registration does not exist'}, status=404)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    elif request.method=='GET':
        try:
            RegistrationId=request.GET.get('RegistrationId')
            
            handoverdetial_ins = Handover_detials_Ip.objects.filter(RegistrationId__pk = RegistrationId).first()
            if handoverdetial_ins:
                data={
                    'ReasonForAdmission':handoverdetial_ins.ReasonForAdmission,
                    'PatientConditionOnAdmission':handoverdetial_ins.PatientConditionOnAdmission,
                    'PatientFileGiven': 'Yes' if handoverdetial_ins.ReasonForAdmission else 'No',
                    'AadharGiven': 'Yes' if handoverdetial_ins.AadharGiven else 'No',
                    'created_by':handoverdetial_ins.created_by,
                    'RegistrationId':handoverdetial_ins.RegistrationId.pk
                }
                return JsonResponse(data)
            else:
                return JsonResponse({})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)





@csrf_exempt
@require_http_methods(["POST"])
def post_ip_submit_handover_or_cancel_details(request):
    try:
        data = json.loads(request.body)
        RegistrationId = data.get('RegistrationId', '')
        Type = data.get('type', '')
        Reason = data.get('Reason', '')
        createdby = data.get('createdby', '')

        if not RegistrationId:
            return JsonResponse({'error': 'RegistrationId is required'}, status=400)

        try:
            ip_regis_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'IP Registration does not exist'}, status=404)

        if Type != 'cancel':
            # If not cancel, admit the patient
            ip_regis_ins.Status = 'Admitted'
            ip_regis_ins.Booking_Status = 'Occupied'
            ip_regis_ins.save()  # Save the changes

            # Get the latest room details
            ip_add_room_ins = Patient_Admission_Room_Detials.objects.filter(
                RegisterType="IP",
                IP_Registration_Id=ip_regis_ins
            ).order_by('-created_at').first()

            if ip_add_room_ins:
                ip_add_room_ins.Status = True
                ip_add_room_ins.IsStayed = True
                ip_add_room_ins.CurrentlyStayed = True
                ip_add_room_ins.Approved_by = createdby
                ip_add_room_ins.Admitted_Date = datetime.now()
                ip_add_room_ins.save()

                room_ins = Room_Master_Detials.objects.get(pk=ip_add_room_ins.RoomId.pk)
                room_ins.Booking_Status = 'Occupied'
                room_ins.save()

            return JsonResponse({'success': 'Patient admitted successfully'})

        else:
            # If cancel, cancel the admission if the status is pending
            if ip_regis_ins.Status == 'Pending':
                ip_regis_ins.Status = 'Cancelled'
                ip_regis_ins.Booking_Status = 'Cancelled'
                ip_regis_ins.Reason = Reason
                ip_regis_ins.save()  # Save the changes

                # Get the latest room details
                ip_add_room_ins = Patient_Admission_Room_Detials.objects.filter(
                    RegisterType="IP",
                    IP_Registration_Id=ip_regis_ins
                ).order_by('-created_at').first()

                if ip_add_room_ins:
                    ip_add_room_ins.Iscanceled = True
                    ip_add_room_ins.Approved_by = createdby
                    ip_add_room_ins.save()

                    room_ins = Room_Master_Detials.objects.get(pk=ip_add_room_ins.RoomId.pk)
                    room_ins.Booking_Status = 'Available'
                    room_ins.save()

                return JsonResponse({'success': 'Patient admission cancelled successfully'})
            else:
                return JsonResponse({'warn': 'Patient is already admitted, cannot cancel the admission'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# @csrf_exempt
# @require_http_methods(["POST", "GET", "OPTIONS"])
# def insert_op_ip_convertion(request):
#     if request.method == "POST":
#         try:
#             # Load the request body as JSON
#             data = json.loads(request.body)

#             # Ensure data is a dictionary
#             if isinstance(data, dict):
#                 patient_id_str = data.get('Patient_id')
#                 registration_id = data.get('Registration_id')
#                 reason = data.get('Reason')
#                 created_by = data.get('Created_by')

#                 # Retrieve the Patient_Detials instance
#                 try:
#                     patient_instance = Patient_Detials.objects.get(pk=patient_id_str)
#                 except Patient_Detials.DoesNotExist:
#                     return JsonResponse({'error': 'Patient ID not found'}, status=404)

#                 # Check if the patient has already been admitted
#                 alertdata = Op_to_Ip_Convertion_Table.objects.filter(Registration_id=registration_id)

#                 if alertdata.exists():
#                     return JsonResponse({'warn': 'Patient already admitted'})

#                 # Retrieve the Patient_Appointment_Registration_Detials instance
#                 try:
#                     registration_instance = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#                 except Patient_Appointment_Registration_Detials.DoesNotExist:
#                     return JsonResponse({'error': 'Registration ID not found'}, status=404)

#                 # Save the data in the Op_to_Ip_Convertion_Table if the patient is not already admitted
#                 convertion_data = Op_to_Ip_Convertion_Table(
#                     Patient_Id=patient_instance,  # Use the instance instead of the ID
#                     Registration_id=registration_instance,  # Use the instance instead of the ID
#                     Reason=reason,
#                     created_by=created_by,  # Assuming Created_by is just a string or user ID
#                     Status = 'Pending'
#                 )
#                 convertion_data.save()
                
#                 return JsonResponse({'success': 'Request Que added successfully'})
#             else:
#                 # If data is not a dictionary, it's an error in the request format
#                 return JsonResponse({'error': 'Invalid data format'}, status=400)
        
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON format'}, status=400)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
#     elif request.method == 'GET':
#         try:
#             status = request.GET.get('status')
            
#             requestdata = Op_to_Ip_Convertion_Table.objects.filter(Status=status)
#             Requestlist = []

#             for data in requestdata:
#                 patient_details = data.Registration_id.PatientId  # Assuming this is a ForeignKey to Patient_Detials
#                 request = {
#                     'id' : data.id,
#                     'PatientId': patient_details.pk,  # Use the primary key of the patient
#                     'RegistrationId': data.Registration_id.pk,  # Use the primary key of the registration
#                     'Reason': data.Reason,
#                     'Patient_Name': f'{patient_details.FirstName} {patient_details.MiddleName} {patient_details.SurName}',
#                     'Age': patient_details.Age,
#                     'Status' : data.Status
#                 }
#                 Requestlist.append(request)

#             return JsonResponse(Requestlist, safe=False)

#         except Exception as e:
#             print(f'An error occurred: {str(e)}')
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def insert_op_ip_convertion(request):
    if request.method == "POST":
        try:
            # Load the request body as JSON
            data = json.loads(request.body)

            # Ensure data is a dictionary
            if isinstance(data, dict):
                patient_id_str = data.get('Patient_id')
                registration_id = data.get('Registration_id')
                reason = data.get('Reason')
                IpNotes = data.get('IpNotes')
                created_by = data.get('Created_by')

                # Retrieve the Patient_Detials instance
                try:
                    patient_instance = Patient_Detials.objects.get(pk=patient_id_str)
                except Patient_Detials.DoesNotExist:
                    return JsonResponse({'error': 'Patient ID not found'}, status=404)

                # Check if the patient has already been admitted
                alertdata = Op_to_Ip_Convertion_Table.objects.filter(Registration_id=registration_id)

                if alertdata.exists():
                    return JsonResponse({'warn': 'Patient already admitted'})

                # Retrieve the Patient_Appointment_Registration_Detials instance
                try:
                    registration_instance = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
                except Patient_Appointment_Registration_Detials.DoesNotExist:
                    return JsonResponse({'error': 'Registration ID not found'}, status=404)

                # Save the data in the Op_to_Ip_Convertion_Table if the patient is not already admitted
                convertion_data = Op_to_Ip_Convertion_Table(
                    Patient_Id=patient_instance,  # Use the instance instead of the ID
                    Registration_id=registration_instance,  # Use the instance instead of the ID
                    Reason=reason,
                    IpNotes=IpNotes,
                    created_by=created_by,  # Assuming Created_by is just a string or user ID
                    Status = 'Pending'
                )
                convertion_data.save()
                
                return JsonResponse({'success': 'Request Que added successfully'})
            else:
                # If data is not a dictionary, it's an error in the request format
                return JsonResponse({'error': 'Invalid data format'}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            requestdata = Op_to_Ip_Convertion_Table.objects.filter(Status='Pending')
            Requestlist = []

            for data in requestdata:
                patient_details = data.Registration_id.PatientId  # Assuming this is a ForeignKey to Patient_Detials
                request = {
                    'id' : data.id,
                    'PatientId': patient_details.pk,  # Use the primary key of the patient
                    'Registration_id': data.Registration_id.pk,  # Use the primary key of the registration
                    'Reason': data.Reason,
                    'IpNotes': data.IpNotes,
                    'Patient_Name': f'{patient_details.FirstName} {patient_details.MiddleName} {patient_details.SurName}',
                    'Age': patient_details.Age,
                    'Status' : data.Status
                }
                Requestlist.append(request)

            return JsonResponse(Requestlist, safe=False)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
@require_http_methods(["GET"])
def get_ip_roomdetials_for_bedtransfer_details(request):
    try:
        RegistrationId = request.GET.get('RegistrationId', '')

        # Get the first room detail entry
        roomdetials = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId,Status=True,IsStayed=True,CurrentlyStayed=True).order_by('-created_at').first()
       
        ip_register_data = {
            'ip_register_data':[],
            'Roomsdata':[],
        }
        if roomdetials:
            data={
            'BuildingName': roomdetials.RoomId.Building_Name.Building_Name,
            'BlockName': roomdetials.RoomId.Block_Name.Block_Name,
            'FloorName': roomdetials.RoomId.Floor_Name.Floor_Name,
            'WardName': roomdetials.RoomId.Ward_Name.Ward_Name,
            'RoomName': roomdetials.RoomId.Room_Name.Room_Name,
            'RoomNo': roomdetials.RoomId.Room_No,
            'BedNo': roomdetials.RoomId.Bed_No,
            'RoomId': roomdetials.RoomId.pk,
            'DateTime': roomdetials.created_at.strftime('%d-%m-%y / %H-%M'),
            'pk':roomdetials.pk,
            'id':1,
            
            }
            ip_register_data['ip_register_data'].append(data)
            

        # Fetch all room details and add the remaining ones to the Roomsdata list
        roomdatass = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId,Status=True).exclude(CurrentlyStayed=True).order_by('-created_at')  # Skip the first entry
        index=0
        for roomdetials in roomdatass:
            ststusss=''
            if  roomdetials.IsStayed and not roomdetials.Iscanceled:
                ststusss='Transfered'
            elif not roomdetials.IsStayed and not roomdetials.Iscanceled:
                ststusss='Requested'
            elif not roomdetials.IsStayed and  roomdetials.Iscanceled :
                ststusss='Requested Cancelled'
            data = {}
            data['BuildingName'] = roomdetials.RoomId.Building_Name.Building_Name
            data['BlockName'] = roomdetials.RoomId.Block_Name.Block_Name
            data['FloorName'] = roomdetials.RoomId.Floor_Name.Floor_Name
            data['WardName'] = roomdetials.RoomId.Ward_Name.Ward_Name
            data['RoomName'] = roomdetials.RoomId.Room_Name.Room_Name
            data['RoomNo'] = roomdetials.RoomId.Room_No
            data['BedNo'] = roomdetials.RoomId.Bed_No
            data['RoomId'] = roomdetials.RoomId.Room_Id
            data['Admitted_Date'] = roomdetials.Admitted_Date.strftime('%d-%m-%y /  %I-%M %p') if roomdetials.Admitted_Date else ""
            data['Discharge_Date'] = roomdetials.Discharge_Date.strftime('%d-%m-%y / %I-%M %p') if roomdetials.Discharge_Date else ""
            data['Status'] = ststusss
            data['pk'] = roomdetials.pk
            data['DateTime'] = roomdetials.created_at.strftime('%d-%m-%y / %I-%M %p')
            data['id'] = index+1
            
            
            ip_register_data['Roomsdata'].append(data)
            index += 1

        return JsonResponse(ip_register_data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)})





@csrf_exempt
@require_http_methods(["POST"])
def post_ip_bed_transfer_details(request):
    try:
        data = json.loads(request.body)
        RegistrationId = data.get('RegistrationId', '')
        RoomId = data.get('RoomId', '')
        Reason = data.get('Reason', '')
        createdby = data.get('createdby', '')
        
        if RoomId:
            room_ins = Room_Master_Detials.objects.get(pk=RoomId)
        else:
            return JsonResponse({'error': 'RoomId is required'}, status=400)

        if RegistrationId:
            register_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
        else:
            return JsonResponse({'error': 'RegistrationId is required'}, status=400)
        
        if room_ins and register_ins:
           
            # Create a new Patient_Admission_Room_Detials entry
            Patient_Admission_Room_Detials.objects.create(
                RegisterType='IP',
                IP_Registration_Id=register_ins,  # Corrected field name
                Casuality_Registration_Id=None,
                RoomId=room_ins,
                Status=True,
                bedtransferReason=Reason,
                created_by=createdby
            )
            room_ins.Booking_Status='Requested'
            room_ins.save()
            
            

        return JsonResponse({'success': 'Bed Request send successfully successfully'}, safe=False)

    except Room_Master_Detials.DoesNotExist:
        return JsonResponse({'error': 'Room does not exist'}, status=404)

    except Patient_IP_Registration_Detials.DoesNotExist:
        return JsonResponse({'error': 'IP Registration does not exist'}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)





@csrf_exempt
@require_http_methods(["POST"])
def bed_transfer_approve_cancel_details(request):
    try:
        data = json.loads(request.body)
        RegistrationId = data.get('RegistrationId', '')
        RoomId = data.get('RoomId', '')
        Type = data.get('Type', '')
        Reason = data.get('Reason', '')
        PatientFileRecieved = data.get('PatientFileRecieved', False)
        MedicineTransfered = data.get('MedicineTransfered', False)
        AnyMedicalRecordError = data.get('AnyMedicalRecordError', False)
        ConfirmationFromRelatives = data.get('ConfirmationFromRelatives', False)
        RelativeName = data.get('RelativeName', '')
        createdby = data.get('createdby', '')
        print(data,'-----')
        if RoomId:
            room_ins = Room_Master_Detials.objects.get(pk=RoomId)
        else:
            return JsonResponse({'error': 'RoomId is required'}, status=400)

        if RegistrationId:
            register_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
        else:
            return JsonResponse({'error': 'RegistrationId is required'}, status=400)
        
        if room_ins and register_ins:
            disdate = datetime.now()
            if Type =='Approve':
                previous_room = Patient_Admission_Room_Detials.objects.get(
                    IP_Registration_Id__pk=RegistrationId, Status=True, IsStayed=True, CurrentlyStayed=True
                )
                
                previous_room.CurrentlyStayed=False
                previous_room.Discharge_Date = disdate
                previous_room.save()
                
                previous_room_master_ins =Room_Master_Detials.objects.get(pk =previous_room.RoomId.pk,Booking_Status='Occupied')
                if previous_room_master_ins:
                    previous_room_master_ins.Booking_Status='Maintenance'
                    previous_room_master_ins.save()
                    schedule_status_update(previous_room_master_ins.pk,30)
                    
                
                
                roomdatass = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId,Status=True,CurrentlyStayed=False,IsStayed=False).exclude(Iscanceled=True).order_by('-created_by').first()
                roomdatass.IsStayed=True
                roomdatass.CurrentlyStayed=True
                roomdatass.Admitted_Date=disdate
                roomdatass.PatientfileRecieved=PatientFileRecieved
                roomdatass.MedicineTransfered=MedicineTransfered
                roomdatass.AnyMedicalRecordError=AnyMedicalRecordError
                roomdatass.ConfirmationfromReletives=ConfirmationFromRelatives
                roomdatass.ReletiveName=RelativeName
                roomdatass.MedRecReason=Reason
                roomdatass.save()
                
                curr_previous_room_master_ins =Room_Master_Detials.objects.get(pk =roomdatass.RoomId.pk,Booking_Status='Requested')
                if curr_previous_room_master_ins:
                    curr_previous_room_master_ins.Booking_Status='Occupied'
                    curr_previous_room_master_ins.save()

                return JsonResponse({'success': 'Bed Request Approved successfully '}, safe=False)
            elif Type =='Cancel':
                roomdatass = Patient_Admission_Room_Detials.objects.filter(IP_Registration_Id__pk=RegistrationId,Status=True,CurrentlyStayed=False,IsStayed=False).exclude(Iscanceled=True).order_by('-created_by').first()
                roomdatass.IsStayed=False
                roomdatass.Iscanceled=True
                roomdatass.CancelReason=Reason
                roomdatass.Approved_by=createdby
                roomdatass.save()
                
                room_master_ins =Room_Master_Detials.objects.get(pk = roomdatass.RoomId.pk,Booking_Status='Requested')
                if room_master_ins:
                    room_master_ins.Booking_Status='Available'
                    room_master_ins.save()
                
                
                return JsonResponse({'success': 'Bed Request cancelled successfully '}, safe=False)
            else:
                return JsonResponse({'error':'type not exist'})
    except Room_Master_Detials.DoesNotExist:
        return JsonResponse({'error': 'Room does not exist'}, status=404)

    except Patient_IP_Registration_Detials.DoesNotExist:
        return JsonResponse({'error': 'IP Registration does not exist'}, status=404)

    except Exception as e:
        print('error', str(e))
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
@require_http_methods(["POST", "GET", 'OPTIONS'])
def service_procedure_request(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            RegistrationId = data.get('RegistrationId', '')
            MasterType = data.get('MasterType', '')
            Id = data.get('id', '')
            units = data.get('Units', '')
            createdby = data.get('createdby', '')

            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            # Fetch the related patient registration and room details
            register_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)

            room_inss = Patient_Admission_Room_Detials.objects.get(
                IP_Registration_Id__pk=register_ins.pk, Status=True, IsStayed=True, CurrentlyStayed=True
            )

            service_ins = None
            procedure_ins = None

            if MasterType == 'Service':
                service_ins = Service_Master_Details.objects.get(pk=Id)
            elif MasterType == 'Procedure':
                procedure_ins = Procedure_Master_Details.objects.get(pk=Id)
            else:
                return JsonResponse({'error': 'Invalid MasterType. Must be either "Service" or "Procedure".'}, status=400)

            # Create the service/procedure request
            Service_Procedure_request_Ip.objects.create(
                MasterType=MasterType,
                Service_ratecard=service_ins,
                Procedure_ratecard=procedure_ins,
                RegistrationId=register_ins,
                RoomId=room_inss.RoomId,
                Units=units,
                created_by=createdby
            )

            return JsonResponse({'success': f'{MasterType} Added Successfully'}, status=201)

        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'IP Registration does not exist'}, status=404)
        except Patient_Admission_Room_Detials.DoesNotExist:
            return JsonResponse({'error': 'Room details not found for this registration'}, status=404)
        except Service_Master_Details.DoesNotExist:
            return JsonResponse({'error': 'Service not found'}, status=404)
        except Procedure_Master_Details.DoesNotExist:
            return JsonResponse({'error': 'Procedure not found'}, status=404)
        except Exception as e:
            print('error', str(e))
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'GET':
        try:
            MasterType = request.GET.get('MasterType')
            RegistrationId = request.GET.get('RegistrationId')
            status = request.GET.get('status')

            # Querying Service_Procedure_request_Ip based on status if provided
            if status:
                service_ins = Service_Procedure_request_Ip.objects.filter(
                    RegistrationId__pk=RegistrationId, MasterType=MasterType, Status=status
                )
            else:
                service_ins = Service_Procedure_request_Ip.objects.filter(
                    RegistrationId__pk=RegistrationId, MasterType=MasterType
                )

            servicedata = []
            index = 1

            for inss in service_ins:
                data = {
                    'id': index,
                    'ServiceId': inss.Service_ratecard.pk if inss.Service_ratecard else inss.Procedure_ratecard.pk,
                    'ServiceType': inss.Service_ratecard.Service_Type if inss.Service_ratecard else inss.Procedure_ratecard.Type,
                    'ServiceName': inss.Service_ratecard.Service_Name if inss.Service_ratecard else inss.Procedure_ratecard.Procedure_Name,
                    "Units": f"{inss.Units} hrs" if inss.Service_ratecard and inss.Service_ratecard.Service_Type == 'Hourly' else inss.Units,
                    "DateTime": inss.created_at.strftime('%d-%m-%y / %I-%M %p'),
                    "Status": "Not Paid" if not inss.Status else "Paid"
                }
                servicedata.append(data)
                index += 1

            return JsonResponse(servicedata, safe=False)

        except Exception as e:
            print('error', str(e))
            return JsonResponse({'error': str(e)}, status=500)





@csrf_exempt
def get_ip_billing_datasss(request):
    if request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            # Retrieve all room details
            roomdatas = Patient_Admission_Room_Detials.objects.filter(
                IP_Registration_Id__pk=RegistrationId, Status=True, IsStayed=True
            ).exclude(Iscanceled=True, CurrentlyStayed=True)

            emp_datas = {
                'RoomDatas': [],
                'NurseCharge': [],
                'CumulativeDays': 0,
                'CumulativeHours': 0,
                'CumulativeTotalAmount': 0,
                'CumulativeDaysHours': '',  # To hold combined days and hours
            }

            cumulative_days = 0
            cumulative_hours = 0
            cumulative_total_amount = 0

            for room in roomdatas:
                # Calculate the difference between Admitted_Date and Discharge_Date
                admitted_date = room.Admitted_Date  # Assuming datetime object
                discharge_date = room.Discharge_Date if room.Discharge_Date else None

                if discharge_date:
                    difference = discharge_date - admitted_date
                    days = difference.days  # Total number of full days
                    hours, remainder = divmod(difference.seconds, 3600)  # Total hours

                    # Determine how many hours to charge for based on your logic
                    if hours > 12:
                        hours_to_charge = 24  # Treat anything above 12 hours as a full day
                    elif hours > 6:
                        hours_to_charge = 12
                    elif hours > 3:
                        hours_to_charge = 6
                    elif hours > 2:
                        hours_to_charge = 3
                    else:
                        hours_to_charge = hours  # If less than or equal to 2 hours, charge actual hours
                    
                    difff = f"{days} days, {hours} hours"
                else:
                    # Calculate difference between admitted_date and the current time (since patient is still admitted)
                    current_datetime = timezone.now()  # Use timezone-aware datetime for the current time
                    difference = current_datetime - admitted_date
                    days = difference.days  # Total number of full days
                    hours, remainder = divmod(difference.seconds, 3600)  # Total hours

                    # Determine how many hours to charge for based on your logic
                    if hours > 12:
                        hours_to_charge = 24  # Treat anything above 12 hours as a full day
                    elif hours > 6:
                        hours_to_charge = 12
                    elif hours > 3:
                        hours_to_charge = 6
                    elif hours > 2:
                        hours_to_charge = 3
                    else:
                        hours_to_charge = hours  # If less than or equal to 2 hours, charge actual hours
                    
                    difff = f"{days} days, {hours} hours"
                
                # Calculate the total amount
                room_charge_per_hour = room.RoomId.Room_Name.Current_Charge / 24  # Assuming the daily charge is divided into 24 hours
                total_amount = (days * room.RoomId.Room_Name.Current_Charge) + (hours_to_charge * room_charge_per_hour)

                # Add to cumulative totals
                cumulative_days += days
                cumulative_hours += hours
                cumulative_total_amount += total_amount

                roomdetials = {
                    'id': len(emp_datas['RoomDatas']) + 1,
                    "WardName": room.RoomId.Ward_Name.Ward_Name,
                    "RoomName": room.RoomId.Room_Name.Room_Name,
                    "Room_No": room.RoomId.Room_No,
                    "Bed_No": room.RoomId.Bed_No,
                    "Charge": int(room.RoomId.Room_Name.Current_Charge),
                    'Amount': round(total_amount, 2),
                    "GST": room.RoomId.Room_Name.GST_Charge if room.RoomId.Room_Name.GST_Charge != 'Nill' else "",
                    "Total_Current_Charge": int(room.RoomId.Room_Name.Current_Charge),
                    "Admitted_Date": admitted_date.strftime('%d-%m-%y / %I-%M %p'),
                    "Discharge_Date": discharge_date.strftime('%d-%m-%y / %I-%M %p') if discharge_date else None,
                    "Days": difff,
                    "Total_amount": round(total_amount, 2)  # Total charge rounded to 2 decimal places
                }
                emp_datas['RoomDatas'].append(roomdetials)

            # Add cumulative totals to the response data
            emp_datas['CumulativeDays'] = cumulative_days
            emp_datas['CumulativeHours'] = cumulative_hours
            emp_datas['CumulativeTotalAmount'] = round(cumulative_total_amount, 2)

            # Combine cumulative days and hours into a single string
            emp_datas['CumulativeDaysHours'] = f"{cumulative_days} days, {cumulative_hours} hours"

            # Return JSON response
            return JsonResponse(emp_datas, safe=False)

        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)})
    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
@require_http_methods(["GET"])
def get_patient_appointment_details_specifydoctor(request):
    try:
        Doctor = request.GET.get('Doctor')
        print("doctor-", Doctor)

        # Define a function to build the appointment data dictionary
        def build_appointment_dict(register, idx):
            return {
                'id': idx,
                'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                'PatientId': register.PatientId.PatientId,
                'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                'PhoneNo': register.PatientId.PhoneNo,
                'AppointmentId': register.AppointmentId,
                'VisitId': register.VisitId,
                'Complaint': register.Complaint,
                'isMLC': register.IsMLC,
                'Flagging': register.Flagging,
                'isRefferal': register.IsReferral,
                'Status': register.Status,
                'RegistrationId': register.pk,
                'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.First_Name} {register.PrimaryDoctor.Last_Name}",
                'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
            }

        if Doctor:
            queryset = Patient_Appointment_Registration_Detials.objects.filter(PrimaryDoctor_id=Doctor).exclude(Status='Cancelled')
        else:
            queryset = Patient_Appointment_Registration_Detials.objects.exclude(Status='Cancelled')

        appointment_register_data = [
            build_appointment_dict(register, idx)
            for idx, register in enumerate(queryset, start=1)
        ]

        return JsonResponse(appointment_register_data, safe=False)

    except Exception as e:
        print(f"Error: {str(e)}")  # Optional: log the error message
        return JsonResponse({'error': str(e)})





@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Register_Request_Cancel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get('RegistrationId', None)
            CancelReason = data.get('CancelReason', '')
            Createdby = data.get('created_by', '')
            Status = "Cancelled"

            if RegistrationId is None:
                return JsonResponse({'warn': 'Missing RegistrationId'})
            
            Register_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=RegistrationId).first()
            Register_instance.Status = Status
            Register_instance.save()
            # Create a new cancelation record
            Patient_Appointment_Registration_Cancel_Details.objects.create(
                Registration_Id=Register_instance,
                Cancel_Reason=CancelReason,
                Status = Status,
                created_by=Createdby,
                updated_by = Createdby,
            )
            
            return JsonResponse({'success': 'Cancellation request registered successfully'})

        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Registration_Reshedule_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get('RegistrationId', None)
            Createdby = data.get('created_by', '')
            DoctorName = data.get('DoctorName', None)
            Specialization = data.get('Specialization', None)
            Status = "Pending"
            PreviousDoctor = data.get('PreviousDoctor',None)
            changeReason = data.get('ChangingReason', '')

            if RegistrationId is None:
                return JsonResponse({'warn': 'Missing RegistrationId'})
            if DoctorName is None:
                return JsonResponse({'warn': 'Missing DoctorName'})
            if Specialization is None:
                return JsonResponse({'warn': 'Missing Specialization'})

            # Fetch the related instances properly
            Register_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=RegistrationId).first()
            if not Register_instance:
                return JsonResponse({'warn': 'Invalid RegistrationId'})

            Speciality_instance = Speciality_Detials.objects.filter(pk=Specialization).first()
            Doctor_instance = Doctor_Personal_Form_Detials.objects.filter(pk=DoctorName).first()
            Doctor_instances = Doctor_Personal_Form_Detials.objects.filter(pk=PreviousDoctor).first()
            
            if not Speciality_instance:
                return JsonResponse({'warn': 'Invalid Specialization'})
            if not Doctor_instance:
                return JsonResponse({'warn': 'Invalid DoctorName'})
            
            # Update the Register instance
            Register_instance.Specialization = Speciality_instance
            Register_instance.PrimaryDoctor = Doctor_instance
            Register_instance.Status = Status
            Register_instance.save()

            # Create the reschedule entry
            Patient_Registration_Reshedule_Details.objects.create(
                Registration_Id=Register_instance,
                ChangingReason=changeReason,
                specialization=Speciality_instance,
                doctor_name=Doctor_instance,
                AppointmentDoctor=Doctor_instances,
                Status=Status,
                created_by=Createdby,
                updated_by = Createdby,
            )

            return JsonResponse({'success': 'Reschedule request registered successfully'})

        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Invalid request method'},status=405)


@csrf_exempt
@require_http_methods(["GET"])
def get_patient_appointment_details_withoutcancelled(request):
    try:
        # Get query parameters
        query = request.GET.get('query', '')
        status = request.GET.get('status', '')

        # Start with all records
        queryset = Patient_Appointment_Registration_Detials.objects.all()

        # Apply filters based on the query parameters
        if query:
            queryset = queryset.filter(
                Q(PatientId__FirstName__icontains=query) |
                Q(PatientId__MiddleName__icontains=query) |
                Q(PatientId__SurName__icontains=query) |
                Q(PatientId__PatientId__icontains=query) |
                Q(PatientId__PhoneNo__icontains=query)
            )
        
        # Filter by status if specified
        if status:
            queryset = queryset.filter(Q(Status__icontains=status))
        else:
            # Exclude 'Cancelled' status if no status is specified
            queryset = queryset.exclude(Status='Cancelled')

        # Serialize the filtered queryset
        appointment_register_data = []
        for idx, register in enumerate(queryset, start=1):
            appointment_dict = {
                'id': idx,
                'PatientProfile': get_file_image(register.PatientId.Patient_profile) if register.PatientId.Patient_profile else None,
                'PatientId': register.PatientId.PatientId,
                'PatientName': f"{register.PatientId.Title}.{register.PatientId.FirstName} {register.PatientId.MiddleName} {register.PatientId.SurName}",
                'PhoneNo': register.PatientId.PhoneNo,
                'AppointmentId': register.AppointmentId,
                'VisitId': register.VisitId,
                'Complaint': register.Complaint,
                'isMLC': register.IsMLC,
                'Flagging': register.Flagging,
                'isRefferal': register.IsReferral,
                'Status': register.Status,
                'RegistrationId': register.pk,
                'DoctorName': f"{register.PrimaryDoctor.Tittle}.{register.PrimaryDoctor.First_Name} {register.PrimaryDoctor.Last_Name}",
                'Specilization': str(register.Specialization.Speciality_Name) if register.Specialization else '',
            }
            appointment_register_data.append(appointment_dict)

        return JsonResponse(appointment_register_data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)})
    
    
@csrf_exempt
def get_unique_id_no_validation(request):
    if request.method == 'GET':
        try:
            unique_id = request.GET.get('UniqueIdNo')

            # Validate if unique_id was provided
            if not unique_id:
                return JsonResponse({'error': 'UniqueIdNo is required'})

            # Check if the patient with the given UniqueIdNo exists
            patient = Patient_Detials.objects.filter(UniqueIdNo=unique_id).exists()

            if patient:
                return JsonResponse({'error': f"The {unique_id} is already exists for another patient"})
            else:
                return JsonResponse({'message': 'UniqueIdNo is available'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})