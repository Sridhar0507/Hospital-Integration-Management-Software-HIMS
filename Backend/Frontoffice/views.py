import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import (
    Patient_Detials,
    Patient_Visit_Detials,
    Patient_CaseSheet_Detials,
    Patient_Referral_Detials,
    Patient_Appointment_Registration_Detials
)
from Masters.models import (
    Speciality_Detials,
    Doctor_Personal_Form_Detials,
    Employee_Personal_Form_Detials
)
from django.db.models import Max
from datetime import datetime
from django.db import transaction

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
        
    if request.method == 'POST':
        try:
            print('hiiii')
            data = json.loads(request.body)
            
            # Extract and validate data
            
            Isedit = data.get('Isedit', False)
            register_type = data.get('RegisterType', '')
            register_Id = data.get('RegisterType', None)
            ip_admission = data.get('Admission_details','')
            patient_id = data.get('PatientId')
            visit_id = data.get('visit_id',0)
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
            
            visit_purpose = data.get('VisitPurpose', '')
            specialization = data.get('Specialization', '')
            doctor_name = data.get('DoctorName', '')
            case_sheet_no = data.get('CaseSheetNo', '')
            anc_number = data.get('ANCNumber', '')
            mcts_no = data.get('MCTSNo', '')
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
            is_mlc = data.get('IsMLC', False)
            flagging = data.get('Flagging', '')
            is_referral = data.get('IsReferral', False)
        
            referral_source = data.get('ReferralSource', '')
            referred_by = data.get('ReferredBy', '')
            
            door_no = data.get('DoorNo', '')
            street = data.get('Street', '')
            area = data.get('Area', '')
            city = data.get('City', '')
            state = data.get('State', '')
            country = data.get('Country', '')
            pincode = data.get('Pincode', '')

            DrInchargeatTimeofAdmission = data.get('DrInchargeAtTimeOfAdmission','')
            NexttokinName = data.get('NextToKinName','')
            relation = data.get('Relation','')
            relativePhoneno = data.get('RelativePhoneNo','')
            personLiableforpayment = data.get('PersonLiableForBillPayment','')
            familyhead = data.get('FamilyHead','')
            familyheadName = data.get('FamilyHeadName','')
            ipKitGiven = data.get('IpKitGiven','')

            created_by = data.get('Created_by', '')

            specialization_instance = Speciality_Detials.objects.get(Speciality_Id=specialization) if specialization else None
            doctor_name_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_name) if doctor_name else None
            referral_doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=referred_by) if referred_by else None
            employee_instance = Employee_Personal_Form_Detials.objects.get(Employee_ID=employee_id) if employee_id else None
            doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id) if doctor_id else None
            
            with transaction.atomic():
                if patient_id:
                    patient = Patient_Detials.objects.get(PatientId=patient_id)
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
                    patient.Religion = religion
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
                    patient.save()

                else:
                    patient = Patient_Detials.objects.create(
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
                        Religion=religion, 
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
                    
                
                
                # case sheet 
                if not visit_id:
                    case_sheet_exists = Patient_CaseSheet_Detials.objects.filter(
                        PatientId=patient,
                        DoctorId=doctor_name_instance
                    ).exists()

                    if case_sheet_exists:
                        return JsonResponse({'warn': 'Casesheet already exists for this patient and doctor.'})
                    
                    patient_casesheet= Patient_CaseSheet_Detials.objects.create(
                        PatientId = patient,
                        DoctorId = doctor_name_instance,
                        CaseSheet_no = case_sheet_no
                    )
                
                
                # visit id
                patient_visit_id = generate_or_update_visit_id(patient,register_type)
                
                
                # referral
                
                if is_referral == 'Yes' and referral_doctor_instance:
                    if visit_id and Isedit:
                        referral = Patient_Referral_Detials.objects.get(PatientId=patient_id,VisitId=visit_id)
                        referral.ReferralSource = referral_source
                        referral.ReferredBy = referral_doctor_instance
                        referral.save()
                    else:
                        Patient_Referral_Detials.objects.create(
                            PatientId = patient,
                            VisitId = patient_visit_id, 
                            ReferralRegisteredBy = register_type, 
                            ReferralSource = referral_source, 
                            ReferredBy = referral_doctor_instance, 
                            created_by = created_by
                        )
                
                
                if register_type == 'OP':
                    if register_Id :
                        appointment_details = Patient_Appointment_Registration_Detials.objects.get(pk = register_Id)
                        appointment_details.VisitPurpose = visit_purpose
                        appointment_details.Specialization = specialization_instance
                        appointment_details.PrimaryDoctor = doctor_name_instance
                        appointment_details.CaseSheetNo = case_sheet_no
                        appointment_details.ANCNumber = anc_number
                        appointment_details.MCTSNo = mcts_no
                        appointment_details.Complaint = complaint
                        appointment_details.PatientType = patient_type
                        appointment_details.PatientCategory = patient_category
                        appointment_details.InsuranceName = insurance_name
                        appointment_details.InsuranceType = insurance_type
                        appointment_details.ClientName = client_name
                        appointment_details.ClientType = client_type
                        appointment_details.ClientEmployeeId = client_employee_id
                        appointment_details.ClientEmployeeDesignation = client_employee_designation
                        appointment_details.ClientEmployeeRelation = client_employee_relation
                        appointment_details.EmployeeId = employee_instance
                        appointment_details.EmployeeRelation = employee_relation
                        appointment_details.DoctorId = doctor_instance
                        appointment_details.DoctorRelation = doctor_relation
                        appointment_details.DonationType = donation_type
                        appointment_details.IsMLC = is_mlc
                        appointment_details.Flagging = flagging
                        appointment_details.IsReferral = is_referral
                        appointment_details.save()
                    else:
                        if Patient_Appointment_Registration_Detials.objects.filter(PatientId = patient,Status = 'Pending').exists():
                            return JsonResponse({'warn': 'Patient Request is already in pending'})
                        else:
                            Patient_Appointment_Registration_Detials.objects.create(
                            PatientId = patient,
                            VisitId = patient_visit_id,  
                            VisitPurpose = visit_purpose, 
                            Specialization = specialization_instance, 
                            PrimaryDoctor = doctor_name_instance, 
                            CaseSheetNo = case_sheet_no, 
                            ANCNumber = anc_number, 
                            MCTSNo = mcts_no, 
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
                            created_by = created_by
                            )   
            
                    
                

            return JsonResponse({'success': 'Patient registered successfully'})

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
        return JsonResponse({'error': 'Invalid request method'}, status=405)

