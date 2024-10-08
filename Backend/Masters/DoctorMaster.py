

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction
from datetime import datetime, timedelta
# import magic
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from .models import *
from Frontoffice.models import *
import base64 
from winmagic import magic
import json

from Masters.models import * 
from datetime import datetime
print("----0",datetime.now())






@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Doctor_Detials_link(request):
    

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
                image.save(output, format='JPEG', quality=quality)
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
            data = request.POST
            # Extract and validate data
            DoctorID = data.get('DoctorID')
            # DoctorPersonalForm
            Title = data.get('Tittle', '')
            FirstName = data.get('FirstName', '')
            MiddleName = data.get('MiddleName')
            LastName = data.get('LastName')
            Gender = data.get('Gender')
            ShortName = data.get('ShortName')
            Dob = data.get('DOB')
            Age = data.get('Age')
            Duration = data.get('Duration')
            MaritalStatus = data.get('MaritalStatus')
            AnniversaryDate = data.get('AnniversaryDate')
            SpouseName = data.get('SpouseName')
            Nationality = data.get('Nationality')
            Email = data.get('Email')
            ContactNumber = data.get('ContactNumber')
            AlternateNumber = data.get('AlternateNumber')
            EmergencyNo1 = data.get('EmergencyNo1')
            EmergencyNo2 = data.get('EmergencyNo2')
            CurrentAddress = data.get('CurrentAddress')
            PermanentAddress = data.get('PermanentAddress')
            LanguagesSpoken = data.get('LanguagesSpoken')
            PreferredModeOfCommunication = data.get('PreferredModeOfCommunication')
            EmergencyAvailablity = data.get('EmergencyAvailablity')
            Status = data.get('Status', True)
            created_by = data.get('Created_by', '')
            
            # DoctorProfessForm
            Qualification = data.get('Qualification', '')
            DoctorType = data.get('DoctorType', '')
            VisitingDoctorType = data.get('VisitingDoctorType', '')
            # Department = data.get('Department', '').split(',')
            DepartmentId = data.get('DepartmentId',"")
            DepartmentId= DepartmentId.split(', ') if DepartmentId else None
            Designation = data.get('Designation', '')
            Specialization = data.get('Specialization', '')
            Category = data.get('Category', '')
            MCINumber = data.get('MCINumber', '')
            StateRegistrationNumber = data.get('StateRegistrationNumber', '')
            LicenseExpiryDate = data.get('LicenseExpiryDate', '')
            YearsofExperience = data.get('YearsofExperience', '')
            DateOfJoining = data.get('DateOfJoining')

            print("DepattttiDDD",DepartmentId)
            
            # DoctorInsuranceForm
            Insurance_DetailsFile = data.get('InsuranceDetailsFile', None)
            Insurance_RenewalDate = data.get('InsuranceRenewalDate', '')
            Malpractice_Insurance_ProviderName = data.get('MalpracticeInsuranceProviderName', '')
            Policy_Number = data.get('PolicyNumber', '')
            Coverage_Amount = data.get('CoverageAmount', '')
            Expiry_Date = data.get('ExpiryDate', '')

            processed_files = {}
            processed_files['Insurance_DetailsFile'] = validate_and_process_file(Insurance_DetailsFile) if Insurance_DetailsFile else None

            # DoctorRouteForm
            RouteId = data.get('RouteId')
            

            # DoctorDocumentsForm
            photo = data.get('photo', None)
            Signature = data.get('Signature', None)
            AgreementFile = data.get('AgreementFile', None)
            AdhaarCard = data.get('AdhaarCard', None)
            PanCard = data.get('PanCard', None)

            processed_files['photo'] = validate_and_process_file(photo) if photo else None
            processed_files['Signature'] = validate_and_process_file(Signature) if Signature else None
            processed_files['AgreementFile'] = validate_and_process_file(AgreementFile) if AgreementFile else None
            processed_files['AdhaarCard'] = validate_and_process_file(AdhaarCard) if AdhaarCard else None
            processed_files['PanCard'] = validate_and_process_file(PanCard) if PanCard else None

            if any(isinstance(value, JsonResponse) for value in processed_files.values()):
                for key, value in processed_files.items():
                    if isinstance(value, JsonResponse):
                        return value

            # DoctorBankForm
            AccountNumber = data.get('AccountNumber')
            BankName = data.get('BankName')
            BranchName = data.get('BranchName')
            IFSCCode = data.get('IFSCCode')
            PancardNumber = data.get('PancardNumber')

            # DoctorContractForm
            PreviousEmployeementHistory = data.get('PreviousEmployeementHistory')
            Comission = data.get('Comission')
            ContractStartDate = data.get('ContractStartDate')
            ContractEndDate = data.get('ContractEndDate')
            ContractRenewalTerms = data.get('ContractRenewalTerms')
            Remarks = data.get('Remarks')
            print('ShortName',ShortName)


            #DoctorScheduleForm
            Duration = data.get('Duration')
            schedule_data = data.get('Schedule')
            if schedule_data:
                try:
                    schedule_data = json.loads(schedule_data)  # Deserialize the JSON string
                    print("scheeeeeeeCheccckkkkkk",schedule_data)
                except json.JSONDecodeError:
                    return Response({'error': 'Invalid JSON format for Schedule'})

            # instance for the depats
            Department_instance =None
            if DepartmentId and DepartmentId not in ['null', 'undefined','']:
                print('Department',DepartmentId ,DepartmentId == 'null', DepartmentId == None)
                Department_instance = Department_Detials.objects.filter(Department_Id__in = DepartmentId)
           
            Designation_instance =None
            if Designation not in ['null', 'undefined']:
               Designation_instance = Designation_Detials.objects.get(Designation_Id =Designation)
           
            Category_instance =None
            if Category not in ['null', 'undefined']:
                Category_instance = Category_Detials.objects.get(Category_Id =Category)

           
            Speciality_instance =None
            if Specialization not in ['null', 'undefined']:
               Speciality_instance = Speciality_Detials.objects.get(Speciality_Id =Specialization)

           
           
            Route_instance = None

            if DoctorType and DoctorType =='Referral' and RouteId:
                Route_instance=Route_Master_Detials.objects.get(Route_Id= RouteId)
            if DoctorID:
                # Update existing doctor details
                with transaction.atomic():
                    Doctor_Personal_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=DoctorID)
                    Doctor_Personal_instance.DoctorType = DoctorType
                    Doctor_Personal_instance.Tittle = Title
                    Doctor_Personal_instance.First_Name = FirstName
                    Doctor_Personal_instance.Middle_Name = MiddleName
                    Doctor_Personal_instance.Last_Name = LastName
                    Doctor_Personal_instance.Gender = Gender
                    Doctor_Personal_instance.ShortName = ShortName
                    Doctor_Personal_instance.DOB = Dob
                    Doctor_Personal_instance.Age = Age
                    Doctor_Personal_instance.Duration = Duration 
                    Doctor_Personal_instance.Marital_Status = MaritalStatus
                    Doctor_Personal_instance.Anniversary_Date = AnniversaryDate
                    Doctor_Personal_instance.Spouse_Name = SpouseName
                    Doctor_Personal_instance.Nationality = Nationality
                    Doctor_Personal_instance.E_mail = Email
                    Doctor_Personal_instance.Contact_Number = ContactNumber
                    Doctor_Personal_instance.Alternate_Number = AlternateNumber
                    Doctor_Personal_instance.Emergency_No1 = EmergencyNo1
                    Doctor_Personal_instance.Emergency_No2 = EmergencyNo2
                    Doctor_Personal_instance.Current_Address = CurrentAddress
                    Doctor_Personal_instance.Permanent_Address = PermanentAddress
                    Doctor_Personal_instance.Languages_Spoken = LanguagesSpoken
                    Doctor_Personal_instance.Mode_of_Communication = PreferredModeOfCommunication
                    Doctor_Personal_instance.Emergency_Availablity = EmergencyAvailablity
                    Doctor_Personal_instance.save()

                    Doctor_Professional_instance = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=DoctorID)
                    Doctor_Professional_instance.Qualification = Qualification
                    Doctor_Professional_instance.RouteId = Route_instance
                    Doctor_Professional_instance.VisitingDoctorType = VisitingDoctorType
                    # Doctor_Professional_instance.Department = Department_instance
                    Doctor_Professional_instance.Designation = Designation_instance
                    Doctor_Professional_instance.Specialization = Speciality_instance
                    Doctor_Professional_instance.Category = Category_instance
                    Doctor_Professional_instance.MCI_Number = MCINumber
                    Doctor_Professional_instance.State_RegistrationNumber = StateRegistrationNumber
                    Doctor_Professional_instance.License_ExpiryDate = LicenseExpiryDate
                    Doctor_Professional_instance.Yearsof_Experience = YearsofExperience
                    Doctor_Professional_instance.Date_OfJoining = DateOfJoining
                    Doctor_Professional_instance.save()
                    
                    # Update the many-to-many field using set()
                    Doctor_Professional_instance.Department.set(Department_instance)

                    Doctor_Insurance_instance = Doctor_InsuranceForm_Detials.objects.get(Doctor_ID=DoctorID)
                    Doctor_Insurance_instance.Insurance_RenewalDate = Insurance_RenewalDate
                    Doctor_Insurance_instance.Malpractice_Insurance_ProviderName = Malpractice_Insurance_ProviderName
                    Doctor_Insurance_instance.Policy_Number = Policy_Number
                    Doctor_Insurance_instance.Coverage_Amount = Coverage_Amount
                    Doctor_Insurance_instance.Expiry_Date = Expiry_Date

                    if processed_files['Insurance_DetailsFile']:
                        Doctor_Insurance_instance.Insurance_DetailsFile = processed_files['Insurance_DetailsFile']
                    Doctor_Insurance_instance.save()

                   
                   
                    Doctor_Documents_instance = Doctor_DocumentsForm_Detials.objects.get(Doctor_ID=DoctorID)

                    if processed_files['photo']:
                        Doctor_Documents_instance.Photo = processed_files['photo']
                    if processed_files['Signature']:
                        Doctor_Documents_instance.Signature = processed_files['Signature']
                    if processed_files['AgreementFile']:
                        Doctor_Documents_instance.Agreement_File = processed_files['AgreementFile']
                    if processed_files['AdhaarCard']:
                        Doctor_Documents_instance.AdhaarCard = processed_files['AdhaarCard']
                    if processed_files['PanCard']:
                        Doctor_Documents_instance.PanCard = processed_files['PanCard']

                    Doctor_Documents_instance.save()

                    Doctor_Bank_instance = Doctor_BankForm_Detials.objects.get(Doctor_ID=DoctorID)
                    Doctor_Bank_instance.Account_Number = AccountNumber
                    Doctor_Bank_instance.Bank_Name = BankName
                    Doctor_Bank_instance.Branch_Name = BranchName
                    Doctor_Bank_instance.IFSC_Code = IFSCCode
                    Doctor_Bank_instance.Pancard_Number = PancardNumber
                    Doctor_Bank_instance.save()

                    Doctor_Contract_instance = Doctor_ContractForm_Detials.objects.get(Doctor_ID=DoctorID)
                    Doctor_Contract_instance.Previous_EmployeementHistory = PreviousEmployeementHistory
                    Doctor_Contract_instance.Comission = Comission
                    Doctor_Contract_instance.Contract_StartDate = ContractStartDate
                    Doctor_Contract_instance.Contract_EndDate = ContractEndDate
                    Doctor_Contract_instance.Contract_RenewalTerms = ContractRenewalTerms
                    Doctor_Contract_instance.Remarks = Remarks
                    Doctor_Contract_instance.save()

                    if DoctorType and DoctorType != 'Referral' and schedule_data and isinstance(schedule_data, list):
                        # Fetch the Doctor_Personal_Form_Detials instance
                        try:
                            doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=DoctorID)
                        except Doctor_Personal_Form_Detials.DoesNotExist:
                            return JsonResponse({'error': f'Doctor with ID {DoctorID} does not exist'}, status=400)

                        existing_schedule_ids = set()  # To keep track of which schedules have been updated
                        location_ids_from_frontend = set()  # Track location IDs from the frontend

                        for schedule_entry in schedule_data:
                            location_id = schedule_entry.get('locationId')
                            if location_id:
                                location_ids_from_frontend.add(location_id)  # Add the location ID to the set

                                try:
                                    location_instance = Location_Detials.objects.get(pk=location_id)
                                except Location_Detials.DoesNotExist:
                                    return JsonResponse({'error': f'Location Id {location_id} does not exist'}, status=400)

                            day = schedule_entry.get('days')

                            # Check if an existing schedule entry matches this day and location
                            schedule_instance = Doctor_Schedule_Details.objects.filter(
                                Doctor_ID=doctor_instance, Day=day, Location=location_instance
                            ).first()

                            if schedule_instance:
                                # Update existing schedule entry
                                existing_schedule_ids.add(schedule_instance.id)
                                schedule_instance.LocationName = schedule_entry.get('locationName')
                                schedule_instance.IsWorking = schedule_entry.get('working', False)
                                schedule_instance.Shift = schedule_entry.get('shift', False)
                                schedule_instance.Starting_Time = schedule_entry.get('starting_time')
                                schedule_instance.End_Time = schedule_entry.get('ending_time')
                                schedule_instance.Starting_Time_F = schedule_entry.get('starting_time_f')
                                schedule_instance.End_Time_F = schedule_entry.get('ending_time_f')
                                schedule_instance.Starting_Time_A = schedule_entry.get('starting_time_a')
                                schedule_instance.End_Time_A = schedule_entry.get('ending_time_a')
                                schedule_instance.Working_Hours_F = schedule_entry.get('working_hours_f')
                                schedule_instance.Working_Hours_A = schedule_entry.get('working_hours_a')
                                schedule_instance.Working_Hours_S = schedule_entry.get('working_hours_s')
                                schedule_instance.Total_Working_Hours = schedule_entry.get('total_working_hours')
                                schedule_instance.Total_Working_Hours_S = schedule_entry.get('total_working_hours_s')
                                schedule_instance.Status = 'Active'  # Set status as Active
                                schedule_instance.save()
                            else:
                                # Create new schedule entry if it does not exist
                                new_schedule = Doctor_Schedule_Details.objects.create(
                                    Doctor_ID=doctor_instance,
                                    Day=day,
                                    Location=location_instance,
                                    LocationName=schedule_entry.get('locationName'),
                                    IsWorking=schedule_entry.get('working', False),
                                    Shift=schedule_entry.get('shift', False),
                                    Starting_Time=schedule_entry.get('starting_time'),
                                    End_Time=schedule_entry.get('ending_time'),
                                    Starting_Time_F=schedule_entry.get('starting_time_f'),
                                    End_Time_F=schedule_entry.get('ending_time_f'),
                                    Starting_Time_A=schedule_entry.get('starting_time_a'),
                                    End_Time_A=schedule_entry.get('ending_time_a'),
                                    Working_Hours_F=schedule_entry.get('working_hours_f'),
                                    Working_Hours_A=schedule_entry.get('working_hours_a'),
                                    Working_Hours_S=schedule_entry.get('working_hours_s'),
                                    Total_Working_Hours=schedule_entry.get('total_working_hours'),
                                    Total_Working_Hours_S=schedule_entry.get('total_working_hours_s'),
                                    Status='Active'  # Set status as Active
                                )
                                existing_schedule_ids.add(new_schedule.id)

                        # Mark locations that were not sent from the frontend as Inactive
                        Doctor_Schedule_Details.objects.filter(
                            Doctor_ID=doctor_instance
                        ).exclude(
                            Location__in=location_ids_from_frontend
                        ).update(Status='Inactive')  # Update their status to Inactive

                    print("Schedule data updated successfully")
                    return JsonResponse({'success': 'Doctor details updated successfully'})

            else:
                with transaction.atomic():
                    Doctor_Personal_instance = Doctor_Personal_Form_Detials.objects.create(
                        DoctorType=DoctorType,
                        Tittle=Title,
                        First_Name=FirstName,
                        Middle_Name=MiddleName,
                        Last_Name=LastName,
                        Gender=Gender,
                        ShortName=ShortName,
                        DOB=Dob,
                        Age=Age,
                        Duration = Duration,
                        Marital_Status=MaritalStatus,
                        Anniversary_Date=AnniversaryDate,
                        Spouse_Name=SpouseName,
                        Nationality=Nationality,
                        E_mail=Email,
                        Contact_Number=ContactNumber,
                        Alternate_Number=AlternateNumber,
                        Emergency_No1=EmergencyNo1,
                        Emergency_No2=EmergencyNo2,
                        Current_Address=CurrentAddress,
                        Permanent_Address=PermanentAddress,
                        Languages_Spoken=LanguagesSpoken,
                        Mode_of_Communication=PreferredModeOfCommunication,
                        Emergency_Availablity=EmergencyAvailablity,
                        Status=Status,
                        created_by=created_by
                    )

                    Doctor_Professional_instance = Doctor_ProfessForm_Detials.objects.create(
                        Doctor_ID=Doctor_Personal_instance,
                        Qualification=Qualification,
                        RouteId=Route_instance,
                        VisitingDoctorType=VisitingDoctorType,
                        # Department=Department_instance,
                        Designation=Designation_instance,
                        Specialization=Speciality_instance,
                        Category=Category_instance,
                        MCI_Number=MCINumber,
                        State_RegistrationNumber=StateRegistrationNumber,
                        License_ExpiryDate=LicenseExpiryDate,
                        Yearsof_Experience=YearsofExperience,
                        Date_OfJoining=DateOfJoining,
                    )
                    # Use set() method for many-to-many relationships
                    if Department_instance:
                        Doctor_Professional_instance.Department.set(Department_instance)

                    Doctor_insuranceForm_instance = Doctor_InsuranceForm_Detials.objects.create(
                        Doctor_ID=Doctor_Personal_instance,
                        Insurance_DetailsFile=processed_files['Insurance_DetailsFile'],
                        Insurance_RenewalDate=Insurance_RenewalDate,
                        Malpractice_Insurance_ProviderName=Malpractice_Insurance_ProviderName,
                        Policy_Number=Policy_Number,
                        Coverage_Amount=Coverage_Amount,
                        Expiry_Date=Expiry_Date
                    )

            
                    Doctor_DocumentsForm_instance = Doctor_DocumentsForm_Detials.objects.create(
                        Doctor_ID=Doctor_Personal_instance,
                        Photo=processed_files['photo'],
                        Signature=processed_files['Signature'],
                        Agreement_File=processed_files['AgreementFile'],
                        AdhaarCard=processed_files['AdhaarCard'],
                        PanCard=processed_files['PanCard']
                    )

                    Doctor_BankForm_instance = Doctor_BankForm_Detials.objects.create(
                        Doctor_ID=Doctor_Personal_instance,
                        Account_Number=AccountNumber,
                        Bank_Name=BankName,
                        Branch_Name=BranchName,
                        IFSC_Code=IFSCCode,
                        Pancard_Number=PancardNumber
                    )

                    Doctor_ContractForm_instance = Doctor_ContractForm_Detials.objects.create(
                        Doctor_ID=Doctor_Personal_instance,
                        Previous_EmployeementHistory=PreviousEmployeementHistory,
                        Comission=Comission,
                        Contract_StartDate=ContractStartDate,
                        Contract_EndDate=ContractEndDate,
                        Contract_RenewalTerms=ContractRenewalTerms,
                        Remarks=Remarks
                    )

                    if DoctorType and DoctorType !='Referral' and schedule_data:
                        for schedule_entry in schedule_data:
                            day = schedule_entry.get('days')
                            locationId = schedule_entry.get('locationId')
                            locationname = schedule_entry.get('locationName')
                            isWorking = schedule_entry.get('working', False)
                            shift = schedule_entry.get('shift',False)
                            starting_time = schedule_entry.get('starting_time')
                            end_time = schedule_entry.get('ending_time')
                            starting_time_f = schedule_entry.get('starting_time_f')
                            ending_time_f = schedule_entry.get('ending_time_f')
                            starting_time_a = schedule_entry.get('starting_time_a')
                            ending_time_a = schedule_entry.get('ending_time_a')
                            working_hours_f = schedule_entry.get('working_hours_f')
                            working_hours_a = schedule_entry.get('working_hours_a')
                            working_hours_s = schedule_entry.get('working_hours_s')
                            total_working_hours = schedule_entry.get('total_working_hours')  
                            total_working_hours_s = schedule_entry.get('total_working_hours_s')  

                            print("schedule_entryyyyyyyyyyyyyyy",schedule_entry)
                            print('day :',day)
                            print('Locccccccc',locationId)
                            if not day:
                                return JsonResponse({'error': 'Day cannot be null or empty'})
                        
                            location_instance = Location_Detials.objects.get(Location_Id = locationId)
                        

                            Doctor_ScheduleForm_instance = Doctor_Schedule_Details.objects.create(
                                Doctor_ID = Doctor_Personal_instance,
                                Day = day,
                                Location = location_instance,
                                LocationName = locationname,
                                IsWorking = isWorking,                                
                                Shift = shift,
                                Starting_Time = starting_time,
                                End_Time = end_time,
                                Starting_Time_F = starting_time_f,
                                End_Time_F = ending_time_f,
                                Starting_Time_A = starting_time_a,
                                End_Time_A = ending_time_a,
                                Working_Hours_F = working_hours_f,
                                Working_Hours_A = working_hours_a,
                                Working_Hours_S = working_hours_s,
                                Total_Working_Hours_S = total_working_hours_s,
                                Total_Working_Hours = total_working_hours,
                        )
                        print('sfdbfdhrhrhe')
                        
                    return JsonResponse({'success': 'Doctor details added successfully'})
                
        
        except Doctor_Personal_Form_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor with the given ID does not exist'})
        except Exception as e:
            print(str(e))
            return JsonResponse({'error': str(e)})
    
    elif request.method == 'GET':
        try:
            doctor_id = request.GET.get('DoctorID')
            
            if doctor_id:
                # Fetch doctor details for the given DoctorID
                doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)
                doctor_professional = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=doctor_id)
                doctor_insurance = Doctor_InsuranceForm_Detials.objects.get(Doctor_ID=doctor_id)
                doctor_documents = Doctor_DocumentsForm_Detials.objects.get(Doctor_ID=doctor_id)
                doctor_bank = Doctor_BankForm_Detials.objects.get(Doctor_ID=doctor_id)
                doctor_contract = Doctor_ContractForm_Detials.objects.get(Doctor_ID=doctor_id)
                schedule_list = []
                locations_list = []
                indx=0
                if doctor_personal.DoctorType !='Referral':
                    doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID = doctor_id)
                    
                    for schedule in doctor_schedule:
                        if not schedule.Location.Location_Id in locations_list:
                            locations_list.append(schedule.Location.Location_Id)
                        schedule_list.append({
                        'id':indx+1,
                        'days': schedule.Day,
                        'locationId' : schedule.Location.Location_Id if schedule.Location else "",
                        'locationName' : schedule.LocationName,
                        'working': schedule.IsWorking,
                        'shift' : schedule.Shift,
                        'starting_time': schedule.Starting_Time if schedule.Starting_Time !="00:00:00" else "hi",
                        'ending_time': schedule.End_Time,
                        'starting_time_f': schedule.Starting_Time_F,
                        'ending_time_f': schedule.End_Time_F,
                        'starting_time_a': schedule.Starting_Time_A,
                        'ending_time_a': schedule.End_Time_A,
                        'working_hours_f': schedule.Working_Hours_F,
                        'working_hours_a': schedule.Working_Hours_A,
                        'working_hours_s': schedule.Working_Hours_S,
                        'total_working_hours': schedule.Total_Working_Hours,
                        'total_working_hours_s': schedule.Total_Working_Hours_S,
                        'Status' : schedule.Status,
                        })
                        indx +=1
                        print('Type Working Hours',schedule.End_Time)

                
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
                   
                    
                    return f'data:{contenttype1};base64,{base64.b64encode(filedata).decode('utf-8')}'
                
                # Extract department details
                # departments = list(doctor_professional.Department.all().values("Department_Id","Department_Name"))  # Assuming Department is a ManyToMany field
                if doctor_professional:
                    departmentId = ', '.join(str(department.Department_Id) for department in doctor_professional.Department.all())
                    departments = ', '.join(department.Department_Name for department in doctor_professional.Department.all())
                    print('Deptttt',departments)
                    print('DeptIDDDD',departmentId)
                else:
                    departments = ''
                # Construct response data
                response_data = {
                        'DoctorPersonalForm': {
                        'DoctorID': doctor_id,
                        'Tittle':doctor_personal.Tittle,
                        'FirstName': doctor_personal.First_Name,
                        'MiddleName': doctor_personal.Middle_Name,
                        'LastName': doctor_personal.Last_Name,
                        'Gender': doctor_personal.Gender,
                        'ShortName': doctor_personal.ShortName,
                        'DOB': doctor_personal.DOB,
                        'Age': doctor_personal.Age,
                        'Duration' : doctor_personal.Duration if doctor_personal.DoctorType !='Referral' else '',
                        'MaritalStatus': doctor_personal.Marital_Status,
                        'AnniversaryDate': doctor_personal.Anniversary_Date,
                        'SpouseName': doctor_personal.Spouse_Name,
                        'Nationality': doctor_personal.Nationality,
                        'Email': doctor_personal.E_mail,
                        'ContactNumber': doctor_personal.Contact_Number,
                        'AlternateNumber': doctor_personal.Alternate_Number,
                        'EmergencyNo1': doctor_personal.Emergency_No1,
                        'EmergencyNo2': doctor_personal.Emergency_No2,
                        'CurrentAddress': doctor_personal.Current_Address,
                        'PermanentAddress': doctor_personal.Permanent_Address,
                        'LanguagesSpoken': doctor_personal.Languages_Spoken,
                        'PreferredModeOfCommunication': doctor_personal.Mode_of_Communication,
                        'EmergencyAvailablity': doctor_personal.Emergency_Availablity,
                        
                    },
                    'DoctorProfessionalForm': {
                        'Qualification': doctor_professional.Qualification,
                        'DoctorRegisType': doctor_personal.DoctorType,
                        'VisitType': doctor_professional.VisitingDoctorType,
                        'Department': departments,
                        'Department_Id' : departmentId,
                        'Designation': doctor_professional.Designation.Designation_Id if doctor_professional.Designation else '',
                        'Specialization': doctor_professional.Specialization.Speciality_Id if doctor_professional.Specialization else '',
                        'Category': doctor_professional.Category.Category_Id if doctor_professional.Category else '',
                        'MCINumber': doctor_professional.MCI_Number,
                        'StateRegistrationNumber': doctor_professional.State_RegistrationNumber,
                        'LicenseExpiryDate': doctor_professional.License_ExpiryDate,
                        'YearsofExperience': doctor_professional.Yearsof_Experience,
                        'DateOfJoining': doctor_professional.Date_OfJoining,
                    },
                    'DoctorInsuranceForm': {
                        'InsuranceDetailsFile': get_file_image(doctor_insurance.Insurance_DetailsFile) if doctor_insurance.Insurance_DetailsFile else None,
                        'InsuranceRenewalDate': doctor_insurance.Insurance_RenewalDate,
                        'MalpracticeInsuranceProviderName': doctor_insurance.Malpractice_Insurance_ProviderName,
                        'PolicyNumber': doctor_insurance.Policy_Number,
                        'CoverageAmount': doctor_insurance.Coverage_Amount,
                        'ExpiryDate': doctor_insurance.Expiry_Date
                    },
                    'DoctorRouteForm': {
                        'Location': doctor_professional.RouteId.location.Location_Name if doctor_personal.DoctorType=='Referral' else "",
                        'RouteNo': doctor_professional.RouteId.Route_No if doctor_personal.DoctorType=='Referral' else "",
                        'RouteName': doctor_professional.RouteId.Route_Name if doctor_personal.DoctorType=='Referral' else "",
                        'TahsilName': doctor_professional.RouteId.Teshil_Name if doctor_personal.DoctorType=='Referral' else "",
                        'VillageName': doctor_professional.RouteId.Village_Name if doctor_personal.DoctorType=='Referral' else "",
                    },
                    'DoctorDocumentsForm': {
                        'photo': get_file_image(doctor_documents.Photo) if doctor_documents.Photo else None,
                        'Signature': get_file_image(doctor_documents.Signature) if doctor_documents.Signature else None,
                        'AgreementFile': get_file_image(doctor_documents.Agreement_File) if doctor_documents.Agreement_File else None,
                        'AdhaarCard': get_file_image(doctor_documents.AdhaarCard) if doctor_documents.AdhaarCard else None,
                        'PanCard': get_file_image(doctor_documents.PanCard )if doctor_documents.PanCard else None
                    },
                    'DoctorBankForm': {
                        'AccountNumber': doctor_bank.Account_Number,
                        'BankName': doctor_bank.Bank_Name,
                        'BranchName': doctor_bank.Branch_Name,
                        'IFSCCode': doctor_bank.IFSC_Code,
                        'PancardNumber': doctor_bank.Pancard_Number
                    },
                    'DoctorContractForm': {
                        'PreviousEmployeementHistory': doctor_contract.Previous_EmployeementHistory,
                        'Comission': doctor_contract.Comission,
                        'ContractStartDate': doctor_contract.Contract_StartDate,
                        'ContractEndDate': doctor_contract.Contract_EndDate,
                        'ContractRenewalTerms': doctor_contract.Contract_RenewalTerms,
                        'Remarks': doctor_contract.Remarks
                    },
                    'DoctorScheduleForm' : 
                    {
                        'Schedule' : schedule_list,
                        'locations':locations_list,
                    }
                }
                return JsonResponse(response_data)
            
            else:
                return JsonResponse({'error': 'DoctorID parameter is missing'})
            
        except Doctor_Personal_Form_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor details not found for the provided DoctorID'})
        
        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})





@csrf_exempt
def update_status_Doctor_Detials_link(request):
    try:
        data = json.loads(request.body)

        DoctorId = data.get('DoctorId','')
        # Retrieve data from Doctor_Personal_Form_Detials
        doctor_personal_data = Doctor_Personal_Form_Detials.objects.get(Doctor_ID = DoctorId)
        doctor_personal_data.Status = not doctor_personal_data.Status
        doctor_personal_data.save()

        # Return JSON response
        return JsonResponse({'success': 'Doctor Status Updated successfully'})
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})






@csrf_exempt
def get_Doctor_Detials_link(request):
    try:
        # Retrieve data from Doctor_Personal_Form_Detials
        doctor_personal_data = Doctor_Personal_Form_Detials.objects.all()
        
        # Initialize a list to store the formatted data
        doctor_list = []

        # Iterate over each Doctor_Personal_Form_Detials instance
        for doctor_personal in doctor_personal_data:
            # Fetch corresponding Doctor_ProfessForm_Detials instance if available
            try:
                doctor_professional = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=doctor_personal.Doctor_ID)
            except Doctor_ProfessForm_Detials.DoesNotExist:
                doctor_professional = None
            
            
            user_instance = UserRegister_Master_Details.objects.filter(Doctor_Id=doctor_personal.Doctor_ID).exists()
            # departments = list(doctor_professional.Department.all().values("Department_Name"))  # Assuming Department is a ManyToMany field
            # Get departments as a comma-separated string
            if doctor_professional:
                departments = ', '.join(department.Department_Name for department in doctor_professional.Department.all())
            else:
                departments = ''
            # Construct a dictionary with desired fields
            doctor_dict = {
                'id': doctor_personal.Doctor_ID,
                'Name': f'{doctor_personal.Tittle}.{doctor_personal.First_Name} {doctor_personal.Middle_Name} {doctor_personal.Last_Name}',
                'ShortName':f'{doctor_personal.Tittle}. {doctor_personal.ShortName}',
                'Email': doctor_personal.E_mail,
                'ContactNumber': doctor_personal.Contact_Number,
                'Qualification': doctor_professional.Qualification if doctor_professional else '',
                'DoctorType': doctor_personal.DoctorType ,
                'Department': departments,
                'Designation': doctor_professional.Designation.Designation_Name if doctor_professional.Designation else None,
                'Specialization': doctor_professional.Specialization.Speciality_Name if doctor_professional.Specialization else None,
                'Category': doctor_professional.Category.Category_Name if doctor_professional.Category else None,
                'MCI_Number': doctor_professional.MCI_Number if doctor_professional else '',
                'State_RegistrationNumber': doctor_professional.State_RegistrationNumber if doctor_professional else '',
                'License_ExpiryDate': doctor_professional.License_ExpiryDate if doctor_professional else '',
                'Yearsof_Experience': doctor_professional.Yearsof_Experience if doctor_professional else '',
                'Status': 'Active' if doctor_personal.Status else 'Inactive',
                'createdBy': doctor_personal.created_by,
                'usercreated': True if user_instance else False
                
            }
            doctor_list.append(doctor_dict)

        # Return JSON response
        return JsonResponse(doctor_list, safe=False)
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})





@csrf_exempt
def get_Doctor_Ratecard_link(request):
    try:
        # Retrieve data from Doctor_Personal_Form_Detials
        doctor_personal_data = Doctor_Personal_Form_Detials.objects.all()
        
        # Initialize a list to store the formatted data
        doctor_list = []

        # Iterate over each Doctor_Personal_Form_Detials instance
        for doctor_personal in doctor_personal_data:
            # Fetch corresponding Doctor_ProfessForm_Detials instance if available
            try:
                doctor_professional = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=doctor_personal.Doctor_ID)
            except Doctor_ProfessForm_Detials.DoesNotExist:
                doctor_professional = None
            
            # Construct a dictionary with desired fields
            doctor_dict = {
                'id': doctor_personal.Doctor_ID,
                'Name': f'{doctor_personal.Tittle}.{doctor_personal.First_Name} {doctor_personal.Middle_Name} {doctor_personal.Last_Name}',
                'Email': doctor_personal.E_mail,
                'ContactNumber': doctor_personal.Contact_Number,
                'Qualification': doctor_professional.Qualification if doctor_professional else '',
                'DoctorType': doctor_personal.DoctorType ,
                'Department': doctor_professional.Department if doctor_professional else '',
                'Designation': doctor_professional.Designation if doctor_professional else '',
                'Specialization': doctor_professional.Specialization if doctor_professional else '',
                'Category': doctor_professional.Category if doctor_professional else '',
                'MCI_Number': doctor_professional.MCI_Number if doctor_professional else '',
                'State_RegistrationNumber': doctor_professional.State_RegistrationNumber if doctor_professional else '',
                'License_ExpiryDate': doctor_professional.License_ExpiryDate if doctor_professional else '',
                'Yearsof_Experience': doctor_professional.Yearsof_Experience if doctor_professional else '',
                'createdBy': doctor_personal.created_by,
            }
            doctor_list.append(doctor_dict)

        # Return JSON response
        return JsonResponse(doctor_list, safe=False)
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})








def doctor_Ratecard_details_view_by_doctor_id(request):
    try:
        doctor_id = request.GET.get('DoctorId')
        
        if doctor_id:
            doctor = Doctor_Personal_Form_Detials.objects.get(pk=doctor_id)
            ratecard = Doctor_Ratecard_Master.objects.get(Doctor_ID=doctor)
            room_fees = RoomTypeFee.objects.filter(doctor_ratecard=ratecard)
            client_fees = ClientFee.objects.filter(doctor_ratecard=ratecard)
            insurance_fees = InsuranceFee.objects.filter(doctor_ratecard=ratecard)
            client_roomtype_fees = ClientRoomTypeFee.objects.filter(doctor_ratecard=ratecard)
            
            
            doctor_data = {
                'id': doctor.Doctor_ID,
                'doctor_name': f"{doctor.Tittle}.{doctor.First_Name} {doctor.Middle_Name} {doctor.Last_Name}",
                'DoctorType': doctor.DoctorType,
                'Status': 'Active' if doctor.Status else 'Inactive',
                'Roomtypes':[],
                'Ratecarddetials': [
                    {
                        'id': 1,
                        'isrowgroup': False,
                        'RatecardType': 'General',
                        'RatecardShow': 'General',
                        'RatecardName': None,
                        'doctor_ratecard_id':ratecard.RateCard_Id,
                        'consultation_Prev_fee': ratecard.General_Prev_Consultation_Fee,
                        'consultation_curr_fee': ratecard.General_Consultation_Fee,
                        'follow_up_Prev_fee': ratecard.General_Prev_Follow_Up_Fee,
                        'follow_up_curr_fee': ratecard.General_Follow_Up_Fee,
                        'emg_consultant_Prev_fee': ratecard.General_Prev_Emg_Consulting_Fee,
                        'emg_consultant_curr_fee': ratecard.General_Emg_Consulting_Fee,
                    },
                     {
                        'id':2,
                        'isrowgroup': False,
                        'RatecardType': 'Special',
                        'RatecardShow': 'Special',
                        'RatecardName': None,
                        'doctor_ratecard_id':ratecard.RateCard_Id,
                        'consultation_Prev_fee': ratecard.Special_Prev_Consultation_Fee,
                        'consultation_curr_fee': ratecard.Special_Consultation_Fee,
                        'follow_up_Prev_fee': ratecard.Special_Prev_Follow_Up_Fee,
                        'follow_up_curr_fee': ratecard.Special_Follow_Up_Fee,
                        'emg_consultant_Prev_fee': ratecard.Special_Prev_Emg_Consulting_Fee,
                        'emg_consultant_curr_fee': ratecard.Special_Emg_Consulting_Fee,
                    }
                ]
            }

            # Add room fees to ratecard details
           

            # Add client fees as a grouped section
            if client_fees:
                doctor_data['Ratecarddetials'].append({
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': True,
                    'RatecardType': 'Client',
                    'RatecardShow': 'Client',
                    'RatecardName': None,
                    'consultation_Prev_fee': None,
                    'consultation_curr_fee': None,
                    'follow_up_Prev_fee': None,
                    'follow_up_curr_fee': None,
                    'emg_consultant_Prev_fee': None,
                    'emg_consultant_curr_fee': None,
                })

            for client_fee in client_fees:
                client_ratecard = {
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': False,
                    'RatecardType': 'Client',
                    'RatecardShow': None,
                    'doctor_ratecard_id':client_fee.doctor_ratecard.RateCard_Id,
                    'RatecardName': client_fee.client.Client_Name,
                    'Ratecardid': client_fee.client.Client_Id,
                    'consultation_Prev_fee': client_fee.Prev_Consultation_Fee,
                    'consultation_curr_fee': client_fee.Consultation_Fee,
                    'follow_up_Prev_fee': client_fee.Prev_Follow_Up_Fee,
                    'follow_up_curr_fee': client_fee.Follow_Up_Fee,
                    'emg_consultant_Prev_fee': client_fee.Prev_Emg_Consulting_Fee,
                    'emg_consultant_curr_fee': client_fee.Emg_Consulting_Fee,
                }
                doctor_data['Ratecarddetials'].append(client_ratecard)

            # Add insurance fees as a grouped section
            if insurance_fees:
                doctor_data['Ratecarddetials'].append({
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': True,
                    'RatecardType': 'Insurance',
                    'RatecardShow': 'Insurance',
                    'RatecardName': None,
                    'consultation_Prev_fee': None,
                    'consultation_curr_fee': None,
                    'follow_up_Prev_fee': None,
                    'follow_up_curr_fee': None,
                    'emg_consultant_Prev_fee': None,
                    'emg_consultant_curr_fee': None,
                })

            for insurance_fee in insurance_fees:
                insurance_ratecard = {
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': False,
                    'RatecardType': 'Insurance',
                    'RatecardShow': None,
                    'doctor_ratecard_id':insurance_fee.doctor_ratecard.RateCard_Id,
                    'RatecardName': insurance_fee.insurance.Insurance_Name,
                    'Ratecardid': insurance_fee.insurance.Insurance_Id,
                    'consultation_Prev_fee': insurance_fee.Prev_Consultation_Fee,
                    'consultation_curr_fee': insurance_fee.Consultation_Fee,
                    'follow_up_Prev_fee': insurance_fee.Prev_Follow_Up_Fee,
                    'follow_up_curr_fee': insurance_fee.Follow_Up_Fee,
                    'emg_consultant_Prev_fee': insurance_fee.Prev_Emg_Consulting_Fee,
                    'emg_consultant_curr_fee': insurance_fee.Emg_Consulting_Fee,
                }
                doctor_data['Ratecarddetials'].append(insurance_ratecard)
                
                for room_fee in room_fees:
                    room_name = room_fee.room_type.Room_Name
                    room_id = room_fee.room_type.Room_Id
                    if {'id':room_id,'name':room_name} not in doctor_data['Roomtypes']:
                        doctor_data['Roomtypes'].append({'id':room_id,'name':room_name})
                
                for dat in doctor_data['Ratecarddetials']:
                  
                    for room_fee in room_fees:
                        room_name = room_fee.room_type.Room_Name
                        room_id = room_fee.room_type.Room_Id
                        if dat['RatecardType'] == 'General':
                            dat[f'{room_name}_{room_id}_prev_fee'] = room_fee.General_Prev_fee
                            dat[f'{room_name}_{room_id}_curr_fee'] = room_fee.General_fee
                        elif dat['RatecardType'] == 'Special':
                            dat[f'{room_name}_{room_id}_prev_fee'] = room_fee.Special_Prev_fee
                            dat[f'{room_name}_{room_id}_curr_fee'] = room_fee.Special_fee
                        elif dat['RatecardType'] == 'Insurance':
                            if dat['isrowgroup']:
                                dat[f'{room_name}_{room_id}_prev_fee'] = None
                                dat[f'{room_name}_{room_id}_curr_fee'] = None
                            else:
                                if dat['Ratecardid']:
                                    ins_id=dat['Ratecardid']
                                    ins_roomtype_fees = InsuranceRoomTypeFee.objects.get(doctor_ratecard=ratecard,room_type_fee=room_fee,insurance__pk=ins_id)
                                 
                                    if ins_roomtype_fees:
                                        dat[f'{room_name}_{room_id}_prev_fee'] = ins_roomtype_fees.Prev_fee
                                        dat[f'{room_name}_{room_id}_curr_fee'] = ins_roomtype_fees.fee
                                    else:
                                        dat[f'{room_name}_{room_id}_prev_fee'] = None
                                        dat[f'{room_name}_{room_id}_curr_fee'] = None
                        
                        elif dat['RatecardType'] == 'Client':
                            
                            if dat['isrowgroup']:
                                dat[f'{room_name}_{room_id}_prev_fee'] = None
                                dat[f'{room_name}_{room_id}_curr_fee'] = None
                            else:
                                if dat['Ratecardid']:
                                    client_id=dat['Ratecardid']
                                    client_roomtype_fees = ClientRoomTypeFee.objects.get(doctor_ratecard=ratecard,room_type_fee=room_fee,client__pk=client_id)
                                 
                                    if client_roomtype_fees:
                                        dat[f'{room_name}_{room_id}_prev_fee'] = client_roomtype_fees.Prev_fee
                                        dat[f'{room_name}_{room_id}_curr_fee'] = client_roomtype_fees.fee
                                    else:
                                        dat[f'{room_name}_{room_id}_prev_fee'] = None
                                        dat[f'{room_name}_{room_id}_curr_fee'] = None
                        
                        
            return JsonResponse(doctor_data, safe=False)
        else:
            return JsonResponse({'warn': 'Doctor Id required to fetch the ratecard details'}, safe=False)
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})



@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def doctor_Ratecard_details_update(request):
    try:
        data = json.loads(request.body)
        doctor_id = data.get('doctor_id')
        RatecardType = data.get('RatecardType')
        doctor_ratecard_id = data.get('doctor_ratecard_id')
        Ratecardid = data.get('Ratecardid')
        colId = data.get('colId')
        col = data.get('col')
        changedRate = data.get('changedRate')
        
        
        if not doctor_id:
            return JsonResponse({'error': 'Doctor ID is required'}, status=400)
        doctor_detials =Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)
        if RatecardType=='General' :
            if any(sub in col for sub in ['consultation','follow','emg']):
                if col == 'consultation':
                    Doc_ratecard_general = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_general.General_Prev_Consultation_Fee = Doc_ratecard_general.General_Consultation_Fee
                    Doc_ratecard_general.General_Consultation_Fee = changedRate
                    Doc_ratecard_general.save()
                elif col == 'follow':
                    Doc_ratecard_general = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_general.General_Prev_Follow_Up_Fee = Doc_ratecard_general.General_Follow_Up_Fee
                    Doc_ratecard_general.General_Follow_Up_Fee = changedRate
                    Doc_ratecard_general.save()
                else:
                    Doc_ratecard_general = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_general.General_Prev_Emg_Consulting_Fee = Doc_ratecard_general.General_Emg_Consulting_Fee
                    Doc_ratecard_general.General_Emg_Consulting_Fee = changedRate
                    Doc_ratecard_general.save()
                    
            else:
                Doc_ratecard_General_Roomtype_fee = RoomTypeFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,room_type__Room_Id=colId)
                Doc_ratecard_General_Roomtype_fee.General_Prev_fee = Doc_ratecard_General_Roomtype_fee.General_fee
                Doc_ratecard_General_Roomtype_fee.General_fee = changedRate
                Doc_ratecard_General_Roomtype_fee.save()
             
        elif RatecardType=='Special' :
            if any(sub in col for sub in ['consultation','follow','emg']):
                if col == 'consultation':
                    Doc_ratecard_special = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_special.Special_Prev_Consultation_Fee = Doc_ratecard_special.Special_Consultation_Fee
                    Doc_ratecard_special.Special_Consultation_Fee = changedRate
                    Doc_ratecard_special.save()
                elif col == 'follow':
                    Doc_ratecard_special = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_special.Special_Prev_Follow_Up_Fee = Doc_ratecard_special.Special_Follow_Up_Fee
                    Doc_ratecard_special.Special_Follow_Up_Fee = changedRate
                    Doc_ratecard_special.save()
                else:
                    Doc_ratecard_special = Doctor_Ratecard_Master.objects.get(RateCard_Id=doctor_ratecard_id)
                    Doc_ratecard_special.Special_Prev_Emg_Consulting_Fee = Doc_ratecard_special.Special_Emg_Consulting_Fee
                    Doc_ratecard_special.Special_Emg_Consulting_Fee = changedRate
                    Doc_ratecard_special.save()
                    
            else:
                Doc_ratecard_Special_Roomtype_fee = RoomTypeFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,room_type__Room_Id=colId)
                Doc_ratecard_Special_Roomtype_fee.Special_Prev_fee = Doc_ratecard_Special_Roomtype_fee.Special_fee
                Doc_ratecard_Special_Roomtype_fee.Special_fee = changedRate
                Doc_ratecard_Special_Roomtype_fee.save()
             
        elif RatecardType=='Insurance':
            
            if any(sub in col for sub in ['consultation','follow','emg']):
                if col == 'consultation':
                    Doc_ratecard_Insurance_fee = InsuranceFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,insurance__Insurance_Id=Ratecardid)
                    Doc_ratecard_Insurance_fee.Prev_Consultation_Fee = Doc_ratecard_Insurance_fee.Consultation_Fee
                    Doc_ratecard_Insurance_fee.Consultation_Fee = changedRate
                    Doc_ratecard_Insurance_fee.save()
                elif col == 'follow':
                    Doc_ratecard_Insurance_fee = InsuranceFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,insurance__Insurance_Id=Ratecardid)
                    Doc_ratecard_Insurance_fee.Prev_Follow_Up_Fee = Doc_ratecard_Insurance_fee.Follow_Up_Fee
                    Doc_ratecard_Insurance_fee.Follow_Up_Fee = changedRate
                    Doc_ratecard_Insurance_fee.save()
                else:
                    Doc_ratecard_Insurance_fee = InsuranceFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,insurance__Insurance_Id=Ratecardid)
                    Doc_ratecard_Insurance_fee.Prev_Emg_Consulting_Fee = Doc_ratecard_Insurance_fee.Emg_Consulting_Fee
                    Doc_ratecard_Insurance_fee.Emg_Consulting_Fee = changedRate
                    Doc_ratecard_Insurance_fee.save()
                    
            else:
                Doc_ratecard_Insurance_Roomtype_fee = InsuranceRoomTypeFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,room_type_fee__room_type__Room_Id=colId,insurance__Insurance_Id=Ratecardid)
                Doc_ratecard_Insurance_Roomtype_fee.Prev_fee = Doc_ratecard_Insurance_Roomtype_fee.fee
                Doc_ratecard_Insurance_Roomtype_fee.fee = changedRate
                Doc_ratecard_Insurance_Roomtype_fee.save()
        
        else:
            
            if any(sub in col for sub in ['consultation','follow','emg']):
                if col == 'consultation':
                    Doc_ratecard_Client_fee = ClientFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,client__Client_Id=Ratecardid)
                    Doc_ratecard_Client_fee.Prev_Consultation_Fee = Doc_ratecard_Client_fee.Consultation_Fee
                    Doc_ratecard_Client_fee.Consultation_Fee = changedRate
                    Doc_ratecard_Client_fee.save()
                elif col == 'follow':
                    Doc_ratecard_Client_fee = ClientFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,client__Client_Id=Ratecardid)
                    Doc_ratecard_Client_fee.Prev_Follow_Up_Fee = Doc_ratecard_Client_fee.Follow_Up_Fee
                    Doc_ratecard_Client_fee.Follow_Up_Fee = changedRate
                    Doc_ratecard_Client_fee.save()
                else:
                    Doc_ratecard_Client_fee = ClientFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,client__Client_Id=Ratecardid)
                    Doc_ratecard_Client_fee.Prev_Emg_Consulting_Fee = Doc_ratecard_Client_fee.Emg_Consulting_Fee
                    Doc_ratecard_Client_fee.Emg_Consulting_Fee = changedRate
                    Doc_ratecard_Client_fee.save()
                    
            else:
                Doc_ratecard_Client_Roomtype_fee = ClientRoomTypeFee.objects.get(doctor_ratecard__RateCard_Id=doctor_ratecard_id,room_type_fee__room_type__Room_Id=colId,client__Client_Id=Ratecardid)
                Doc_ratecard_Client_Roomtype_fee.Prev_fee = Doc_ratecard_Client_Roomtype_fee.fee
                Doc_ratecard_Client_Roomtype_fee.fee = changedRate
                Doc_ratecard_Client_Roomtype_fee.save()
                
        return JsonResponse({'success': f'Dr.{doctor_detials.First_Name} {doctor_detials.Middle_Name} {doctor_detials.Last_Name}`s ratecard details updated successfully'}, status=200)        

        

    except Doctor_Personal_Form_Detials.DoesNotExist:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
    except Doctor_Ratecard_Master.DoesNotExist:
        return JsonResponse({'error': 'Ratecard not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
def get_User_Doctor_Detials(request):
    if request.method == 'GET':
        try:
            DoctorId = request.GET.get('DoctorId')
            
            if not DoctorId:
                return JsonResponse({'error': 'DoctorId parameter is required'}, status=400)
            
            # Retrieve data from Doctor_Personal_Form_Detials
            try:
                doctor_personal_data = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=DoctorId)
            except Doctor_Personal_Form_Detials.DoesNotExist:
                return JsonResponse({'error': 'Doctor not found'}, status=404)
            
            # Fetch corresponding Doctor_ProfessForm_Detials instance if available
            try:
                doctor_professional = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=doctor_personal_data.Doctor_ID)
            except Doctor_ProfessForm_Detials.DoesNotExist:
                doctor_professional = None

            # Construct a dictionary with desired fields
            doctor_dict = {
                'id': doctor_personal_data.Doctor_ID,
                'Title': doctor_personal_data.Tittle,
                'EmployeeType': '',
                'firstName': doctor_personal_data.First_Name,
                'middleName': doctor_personal_data.Middle_Name,
                'lastName': doctor_personal_data.Last_Name,
                'Email': doctor_personal_data.E_mail,
                'PhoneNo': doctor_personal_data.Contact_Number,
                'Gender': doctor_personal_data.Gender,
                'Qualification': doctor_professional.Qualification if doctor_professional else '',
            }
            
            # Return JSON response
            return JsonResponse(doctor_dict, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


# 

@csrf_exempt
def get_Doctor_by_Speciality_Detials(request):
    if request.method == 'GET':
        try:
            speciality_id = request.GET.get('Speciality')
            
            if not speciality_id:
                return JsonResponse({'error': 'Specialization parameter is required'}, status=400)
            
            # Retrieve data from Doctor_ProfessForm_Detials
            try:
                speciality = Speciality_Detials.objects.get(pk=speciality_id)
                doctor_profess_data = Doctor_ProfessForm_Detials.objects.filter(Specialization=speciality)
            except Speciality_Detials.DoesNotExist:
                return JsonResponse({'error': 'Specialization not found'}, status=404)
            except Doctor_ProfessForm_Detials.DoesNotExist:
                return JsonResponse({'error': 'No doctors found for the given specialization'}, status=404)
            
            doctordatas = []
            # Construct a dictionary with desired fields
            for doc in doctor_profess_data:
                try:
                    doctor_personal_data = Doctor_Personal_Form_Detials.objects.exclude(DoctorType ='Referral').get(pk=doc.Doctor_ID.Doctor_ID)
                    doctor_dict = {
                        'id': doctor_personal_data.Doctor_ID,
                        'Name': f'{doctor_personal_data.Tittle}.{doctor_personal_data.First_Name} {doctor_personal_data.Middle_Name} {doctor_personal_data.Last_Name}',
                        'ShortName': f'{doctor_personal_data.Tittle}.{doctor_personal_data.ShortName}',
                    }
                    doctordatas.append(doctor_dict)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    # Handle the case where a corresponding personal detail record is not found
                    continue
            
            # Return JSON response
            return JsonResponse(doctordatas, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt
def get_referral_doctor_Name_Detials(request):
    if request.method == 'GET':
        try:
        
            # Retrieve data from Doctor_Personal_Form_Detials
            doctor_profess_data =None
            try:
                doctor_profess_data = Doctor_Personal_Form_Detials.objects.filter(DoctorType='Referral')
            except Doctor_ProfessForm_Detials.DoesNotExist:
                return JsonResponse({'error': 'Doctor not found'}, status=404)
            
            doctordatas=[]
            # Construct a dictionary with desired fields
            if doctor_profess_data:
                for doc in doctor_profess_data:
                   
                    doctor_dict = {
                        'id': doc.Doctor_ID,
                        'Name': f'{doc.Tittle}.{doc.First_Name} {doc.Middle_Name} {doc.Last_Name}',
                        'ShortName': f'{doc.Tittle}.{doc.ShortName} ',
                    }
                    doctordatas.append(doctor_dict)
            
            # Return JSON response
            return JsonResponse(doctordatas, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    


@csrf_exempt
def get_route_details(request):
    if request.method == 'GET':
        doctor_id = request.GET.get('DoctorId')
        if not doctor_id:
            return JsonResponse({'error': 'DoctorId is required'}, status=400)

        try:
            # Fetch route details based on DoctorId from Doctor_ProfessForm_Detials
            doctor_profess = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=doctor_id)
            
            Route_dict = {
                'RouteNo': doctor_profess.RouteId.Route_No,
                'RouteName': doctor_profess.RouteId.Route_Name,
                'TehsilName': doctor_profess.RouteId.Teshil_Name,
                'VillageName': doctor_profess.RouteId.Village_Name,
            }
            
            return JsonResponse(Route_dict)
        
        except Doctor_ProfessForm_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'},status=405)




@csrf_exempt
def get_All_doctor_Name_Detials(request):
    if request.method == 'GET':
        try:
        
            # Retrieve data from Doctor_Personal_Form_Detials
            doctor_profess_data =None
            try:
                doctor_profess_data = Doctor_Personal_Form_Detials.objects.exclude(DoctorType ='Referral')
            except Doctor_ProfessForm_Detials.DoesNotExist:
                return JsonResponse({'error': 'Doctor not found'}, status=404)
            doctordatas=[]
            # Construct a dictionary with desired fields
            if doctor_profess_data:
                for doc in doctor_profess_data:
                   
                    doctor_dict = {
                        'id': doc.Doctor_ID,
                        'Name': f'{doc.Tittle}.{doc.First_Name} {doc.Middle_Name} {doc.Last_Name}',
                        'ShortName': f'{doc.Tittle}.{doc.ShortName} ',
                    }
                    doctordatas.append(doctor_dict)
            
            # Return JSON response
            return JsonResponse(doctordatas, safe=False)
        
        except Exception as e:
            # Handle exceptions and return error response
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
    
    

@csrf_exempt
def doctor_calender_details_view_by_doctor_id(request):
    try:
        doctor_id = request.GET.get('DoctorId')

        if not doctor_id:
            return JsonResponse({'error': 'DoctorId parameter is missing'}, status=400)
        
        doctor = Doctor_Personal_Form_Detials.objects.get(pk=doctor_id)
        doctor_details = {
            'id' : doctor.Doctor_ID,
            'doctor_name' : f'{doctor.Tittle}.{doctor.First_Name} {doctor.Middle_Name} {doctor.Last_Name}',
            'DoctorType' : doctor.DoctorType,
            'Status' : 'Active' if doctor.Status else 'Inactive',
        }
        return JsonResponse(doctor_details, safe=False)


    except Exception as e:
        return JsonResponse({'error' : str(e)})
    
    
    
@csrf_exempt
def doctor_calender_details_view_by_day(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get('DoctorId')
            if not doctor_id :
                return JsonResponse({'error': 'Doctorid parameter is missing'}, status = 400)
            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)

            schedule_list = []
            indx=0
            if doctor_personal.DoctorType !='Referral':
                doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID = doctor_id)
                
                for schedule in doctor_schedule:
                    schedule_list.append({
                    'id':indx+1,
                    'days': schedule.Day,
                    'locationId' : schedule.Location.Location_Id if schedule.Location else "",
                    'locationName' : schedule.LocationName,
                    'Status' : schedule.Status,
                    })
                    indx +=1
                    print('Type Working Hours',schedule.End_Time)

            doctor_details = {
                'schedule': schedule_list,
                'created_at' : doctor_personal.created_at,
            }
            return JsonResponse(doctor_details,safe=False)
            
            
        except Exception as e:
            return JsonResponse({'error': str(e)})
    
    
@csrf_exempt
def doctor_calender_details_view_by_doctorId_locationId(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get('DoctorId')
            location_id = request.GET.get('LocationId')
            month = request.GET.get('month')  # e.g., '08' for August
            year = request.GET.get('year')    # e.g., '2024'
            
            if not doctor_id:
                return JsonResponse({'error': 'DoctorId parameter is missing'}, status=400)
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            # Validate month and year
            try:
                month = int(month)
                year = int(year)
                if month < 1 or month > 12:
                    raise ValueError("Month must be between 1 and 12")
            except ValueError as e:
                return JsonResponse({'error': str(e)}, status=400)
            
            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)
            
            # Get the first and last day of the selected month
            first_day = datetime(year, month, 1)
            last_day = (first_day + timedelta(days=31)).replace(day=1) - timedelta(days=1)

            # Generate a list of all days in the month
            all_days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]
            
            # Get doctor schedules
            doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor_id)
            
            if location_id:
                doctor_schedule = doctor_schedule.filter(Location__Location_Id=location_id)
            
            # Get data from Doctor_Calender_Modal_Edit table
            doctor_calendar_edit = Doctor_Calender_Modal_Edit.objects.filter(Doctor_ID=doctor_id)
            
            # Create a dictionary to map weekdays to schedules
            schedule_dict = {}
            for schedule in doctor_schedule:
                weekday = schedule.Day
                if weekday not in schedule_dict:
                    schedule_dict[weekday] = []
                
                schedule_dict[weekday].append({
                    'locationId': schedule.Location.Location_Id if schedule.Location else "",
                    'locationName': schedule.LocationName,
                    'working': schedule.IsWorking,
                    'shift': schedule.Shift,
                    'starting_time': schedule.Starting_Time,
                    'ending_time': schedule.End_Time,
                    'starting_time_f': schedule.Starting_Time_F,
                    'ending_time_f': schedule.End_Time_F,
                    'starting_time_a': schedule.Starting_Time_A,
                    'ending_time_a': schedule.End_Time_A,
                    'working_hours_f': schedule.Working_Hours_F,
                    'working_hours_a': schedule.Working_Hours_A,
                    'working_hours_s': schedule.Working_Hours_S,
                    'total_working_hours': schedule.Total_Working_Hours,
                    'total_working_hours_s': schedule.Total_Working_Hours_S,
                    'changed': "no",
                })
            
            # Map all days of the month to their respective schedules
            calendar_data = []
            for day in all_days:
                day_of_week = day.strftime('%A')  # Get the day of the week
                schedules = schedule_dict.get(day_of_week, [])
                print("Dateeeee",day.strftime('%Y-%m-%d'))
                # Check if there's an entry in Doctor_Calender_Modal_Edit for this day
                edit_entry = doctor_calendar_edit.filter(Date=day.strftime('%Y-%m-%d'), Location__Location_Id = location_id).last()
                print('Gooooodddd')
                if edit_entry:
                    # If an entry exists in the modal edit table, use it to override the schedule
                    if edit_entry.RadioOption == 'Leave':
                        work_status = 'no'
                    else:
                        work_status = 'yes'
                    print('Edit entryyyyy')
                    schedules = [{
                        'locationId': edit_entry.Location.Location_Id if edit_entry.Location else "",
                        'locationName': schedule.LocationName,
                        'working': work_status,
                        'shift': edit_entry.Shift,
                        'starting_time': edit_entry.Starting_Time,
                        'ending_time': edit_entry.End_Time,
                        'starting_time_f': edit_entry.Starting_Time_F,
                        'ending_time_f': edit_entry.End_Time_F,
                        'starting_time_a': edit_entry.Starting_Time_A,
                        'ending_time_a': edit_entry.End_Time_A,
                        'working_hours_f': edit_entry.Working_Hours_F,
                        'working_hours_a': edit_entry.Working_Hours_A,
                        'working_hours_s': edit_entry.Working_Hours_S,
                        'total_working_hours': edit_entry.Total_Working_Hours,
                        'total_working_hours_s': edit_entry.Total_Working_Hours_S,
                        'leave_remarks' : edit_entry.LeaveRemarks,
                        'changed': "yes",
                    }]
                
                # Append the data for this day
                calendar_data.append({
                    'date': day.strftime('%Y-%m-%d'),
                    'day_of_week': day_of_week,
                    'schedules': schedules,
                })

            # Compile the final details to return
            doctor_details = {
                'schedule': calendar_data,
                'created_at': doctor_personal.created_at,
            }
            return JsonResponse(doctor_details, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
     
@csrf_exempt
def calender_modal_display_data_by_day(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get('DoctorId')
            location_id = request.GET.get('LocationId')
            date = request.GET.get('Date')  # Expected in 'YYYY-MM-DD' format
            
            print("Doctorrrrrr",location_id, date)
            if not doctor_id:
                return JsonResponse({'error': 'DoctorId parameter is missing'}, status=400)
            if not date:
                return JsonResponse({'error': 'Date parameter is missing'}, status=400)
            
            # Fetch doctor details
            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)
            
            # Parse the date and get the day of the week
            date_obj = datetime.strptime(date, '%Y-%m-%d')
            day_of_week = date_obj.strftime('%A')

            # Fetch schedules based on the doctor_id, location_id, and day of the week
            doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor_id, Day=day_of_week)
            
            if location_id:
                doctor_schedule = doctor_schedule.filter(Location__Location_Id=location_id)
            
            # Check if there's an entry in Doctor_Calender_Modal_Edit for this date
            edit_entry = Doctor_Calender_Modal_Edit.objects.filter(Doctor_ID=doctor_id, Date=date_obj.strftime('%Y-%m-%d'), Location__Location_Id = location_id).last()
            
            schedule_list = []
            if edit_entry:
                # If an entry exists in Doctor_Calender_Modal_Edit, override the schedule details
                if edit_entry.RadioOption == 'Leave':
                    work_status = 'no'
                else:
                    work_status = 'yes'
                
                schedule_list.append({
                    'locationId': edit_entry.Location.Location_Id if edit_entry.Location else "",
                    'days': day_of_week,
                    'shift': edit_entry.Shift,
                    'starting_time': edit_entry.Starting_Time,
                    'ending_time': edit_entry.End_Time,
                    'starting_time_f': edit_entry.Starting_Time_F,
                    'ending_time_f': edit_entry.End_Time_F,
                    'starting_time_a': edit_entry.Starting_Time_A,
                    'ending_time_a': edit_entry.End_Time_A,
                    'working_hours_f': edit_entry.Working_Hours_F,
                    'working_hours_a': edit_entry.Working_Hours_A,
                    'working_hours_s': edit_entry.Working_Hours_S,
                    'total_working_hours': edit_entry.Total_Working_Hours,
                    'total_working_hours_s': edit_entry.Total_Working_Hours_S,
                    'leave_remarks': edit_entry.LeaveRemarks,
                    'working': work_status,
                    'changed': "yes",
                })
            else:
                # If no edit entry exists, use the original schedule data
                for schedule in doctor_schedule:
                    schedule_list.append({
                        'locationId': schedule.Location.Location_Id if schedule.Location else "",
                        'locationName': schedule.LocationName,
                        'days': schedule.Day,
                        'shift': schedule.Shift,
                        'starting_time': schedule.Starting_Time,
                        'ending_time': schedule.End_Time,
                        'starting_time_f': schedule.Starting_Time_F,
                        'ending_time_f': schedule.End_Time_F,
                        'starting_time_a': schedule.Starting_Time_A,
                        'ending_time_a': schedule.End_Time_A,
                        'working_hours_f': schedule.Working_Hours_F,
                        'working_hours_a': schedule.Working_Hours_A,
                        'working_hours_s': schedule.Working_Hours_S,
                        'total_working_hours': schedule.Total_Working_Hours,
                        'total_working_hours_s': schedule.Total_Working_Hours_S,
                        'working': schedule.IsWorking,  
                        'changed' : 'no',
                    })
            
            doctor_details = {
                'schedule': schedule_list,
                'created_at': doctor_personal.created_at,
            }
            return JsonResponse(doctor_details, safe=False)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST","OPTIONS", "GET"])
def calender_modal_display_edit_by_day(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            DoctorID = data.get('DoctorID')
            day = data.get('day',[])
            date = data.get('date')
            locationId = data.get('location')
            radio_option = data.get('RadioOption')
            shift = data.get('Shift')
            leave_remarks = data.get('LeaveRemarks')
            starting_time = data.get('Starting_time')
            ending_time = data.get('Ending_time')
            starting_time_f = data.get('Starting_time_F')
            ending_time_f = data.get('Ending_time_F')
            starting_time_a = data.get('Starting_time_A')
            ending_time_a = data.get('Ending_time_A')
            working_hours_f = data.get('Working_hours_f')
            working_hours_a = data.get('Working_hours_a')
            working_hours_s = data.get('Working_hours_s')
            total_working_hours = data.get('Total_working_hours')
            total_working_hours_s = data.get('Total_working_hours_s')
            
            print('Checkkkk',data)

            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID = DoctorID )
            # print('DoctorPersonal INstacnceeeeee',doctor_personal.Doctor_ID)
            location_instance = Location_Detials.objects.get(Location_Id = locationId)
 
            # if DoctorID:
            #     with transaction.atomic():
            #         Doctor_modal_edit_instance = Doctor_Calender_Modal_Edit.objects.get(Doctor_ID = DoctorID)
                    
            #         return JsonResponse({'success' : 'Doctor Details updated successfully '})
            # else:
                # with transaction.atomic():
            Doctor_modal_instance = Doctor_Calender_Modal_Edit.objects.create(
                Doctor_ID = doctor_personal,
                Day = day,
                Date = date,
                Location = location_instance,
                RadioOption = radio_option,
                Shift = shift,
                Starting_Time = starting_time,
                End_Time = ending_time,
                Starting_Time_F = starting_time_f,
                End_Time_F = ending_time_f,
                Starting_Time_A = starting_time_a,
                End_Time_A = ending_time_a,
                Working_Hours_F = working_hours_f,
                Working_Hours_A = working_hours_a,
                Working_Hours_S = working_hours_s,
                Total_Working_Hours_S = total_working_hours_s,
                Total_Working_Hours = total_working_hours,
                LeaveRemarks = leave_remarks,
            )
            return JsonResponse({'success': 'Doctor details added successfully'})
        except Exception as e:
            return JsonResponse({'error' : str(e)})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def calender_modal_display_edit_by_mutiple_day(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            DoctorID = data.get('DoctorID')
            days = data.get('day', [])
            dates = data.get('date', [])
            locationId = data.get('location')
            radio_option = data.get('RadioOption')
            shift = data.get('Shift')
            leave_remarks = data.get('LeaveRemarks')
            starting_time = data.get('Starting_time')
            ending_time = data.get('Ending_time')
            starting_time_f = data.get('Starting_time_F')
            ending_time_f = data.get('Ending_time_F')
            starting_time_a = data.get('Starting_time_A')
            ending_time_a = data.get('Ending_time_A')
            working_hours_f = data.get('Working_hours_f')
            working_hours_a = data.get('Working_hours_a')
            working_hours_s = data.get('Working_hours_s')
            total_working_hours = data.get('Total_working_hours')
            total_working_hours_s = data.get('Total_working_hours_s')

            print('Dataaaa', data)

            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=DoctorID)
            location_instance = Location_Detials.objects.get(Location_Id=locationId)

            # Iterate over all the days and dates to create entries for each one
            for day, date in zip(days, dates):
                try:
                    Doctor_Calender_Modal_Edit.objects.create(
                        Doctor_ID=doctor_personal,
                        Day=day,
                        Date=date,
                        Location=location_instance,
                        RadioOption=radio_option,
                        Shift=shift,
                        Starting_Time=starting_time,
                        End_Time=ending_time,
                        Starting_Time_F=starting_time_f,
                        End_Time_F=ending_time_f,
                        Starting_Time_A=starting_time_a,
                        End_Time_A=ending_time_a,
                        Working_Hours_F=working_hours_f,
                        Working_Hours_A=working_hours_a,
                        Working_Hours_S=working_hours_s,
                        Total_Working_Hours_S=total_working_hours_s,
                        Total_Working_Hours=total_working_hours,
                        LeaveRemarks=leave_remarks,
                    )
                except Exception as e:
                    return JsonResponse({"error": str(e)})

            # After all entries are created, return a success response
            return JsonResponse({'success': 'Doctor details added successfully'})

        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt
@require_http_methods(["POST"])
def Appointment_Request_List_Links(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            appointment_ids = data.get('AppointmentID', [])
            request_dates = data.get('RequestDate', [])

            print("Received Data:", data)
            
            if not isinstance(appointment_ids, list) or not appointment_ids:
                return JsonResponse({'error': 'AppointmentID should be a non-empty list'}, status=400)
            if not request_dates or not isinstance(request_dates, list) or len(request_dates) != 1:
                return JsonResponse({'error': 'RequestDate should be a list with a single date string'}, status=400)
            
            request_date = request_dates[0]  # Extract the single date string from the list
            
            # Validate request_date format
            try:
                datetime.fromisoformat(request_date)
            except ValueError:
                return JsonResponse({'error': 'RequestDate is not a valid ISO format date'}, status=400)

            # Update all appointments with the same request date
            updated_count = 0
            for appointment_id in appointment_ids:
                try:
                    appointment_instance = Appointment_Request_List.objects.get(pk=appointment_id)
                    appointment_instance.request_date = request_date
                    appointment_instance.save()
                    updated_count += 1
                except Appointment_Request_List.DoesNotExist:
                    return JsonResponse({'error': f'Appointment with ID {appointment_id} not found'}, status=404)

            return JsonResponse({'success': f'{updated_count} Appointment(s) updated successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def Appointment_Request_List_Delete_Links(request):
    try:
        data = json.loads(request.body)
        appointment_ids = data.get('AppointmentID', [])
        request_dates = data.get('RequestDate', [])

        print("Received Data:", data)

        # Validate input
        if not isinstance(appointment_ids, list) or not isinstance(request_dates, list):
            return JsonResponse({'error': 'AppointmentID and RequestDates should be lists'})
        if not appointment_ids or not request_dates:
            return JsonResponse({'error': 'AppointmentID and RequestDates are required'})
        
        deleted_count = 0
        
        # Process each appointment ID with each request date
        for appointment_id in appointment_ids:
            for request_date in request_dates:
                num_deleted, _ = Appointment_Request_List.objects.filter(
                    pk=appointment_id, request_date=request_date
                ).delete()
                deleted_count += num_deleted

        if deleted_count > 0:
            return JsonResponse({'success': f'{deleted_count} appointments deleted successfully'})
        else:
            return JsonResponse({'error': 'No matching appointments found to delete'})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'})
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'})
    
    
    
@csrf_exempt
@require_http_methods(["GET"])
def get_All_DoctorNames(request):
    try:
        doctor_personal_data = Doctor_Personal_Form_Detials.objects.all()
        doctor_list = []
        for doctor_personal in doctor_personal_data:
            doctor_dict = {
                'id': doctor_personal.Doctor_ID,
                'Name': f'{doctor_personal.Tittle}.{doctor_personal.First_Name} {doctor_personal.Middle_Name} {doctor_personal.Last_Name}',
                'ShortName': f'{doctor_personal.Tittle}. {doctor_personal.ShortName}',
            }
            doctor_list.append(doctor_dict)
        return JsonResponse(doctor_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)},status=500)
    






from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Doctor_Personal_Form_Detials, Doctor_Schedule_Details

@csrf_exempt
def get_DoctorSchedule_details(request):
    if request.method == 'GET':
        doctor_id = request.GET.get('DoctorId')
        if doctor_id:
            try:
                doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)

                schedule_list = []
                indx = 0
                
                if doctor_personal.DoctorType != 'Referral':
                    doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor_id)

                    for schedule in doctor_schedule:
                        schedule_list.append({
                            'id': indx + 1,
                            'days': schedule.Day,
                            'locationId': schedule.Location.Location_Id if schedule.Location else "",
                            'locationName': schedule.LocationName,
                            'working': schedule.IsWorking,
                            'shift': schedule.Shift,
                            'starting_time': schedule.Starting_Time if schedule.Starting_Time != "00:00:00" else "",
                            'ending_time': schedule.End_Time,
                            'starting_time_f': schedule.Starting_Time_F,
                            'ending_time_f': schedule.End_Time_F,
                            'starting_time_a': schedule.Starting_Time_A,
                            'ending_time_a': schedule.End_Time_A,
                            'working_hours_f': schedule.Working_Hours_F,
                            'working_hours_a': schedule.Working_Hours_A,
                            'working_hours_s': schedule.Working_Hours_S,
                            'total_working_hours': schedule.Total_Working_Hours,
                            'total_working_hours_s': schedule.Total_Working_Hours_S,
                            'Status': schedule.Status,
                        })
                        indx += 1
                        print('Type Working Hours', schedule.End_Time)

                    response_data = {
                        'DoctorScheduleForm': {
                            'Schedule': schedule_list,
                        }
                    }
                    return JsonResponse(response_data)

                else:
                    return JsonResponse({'error': 'Doctor is a referral type, no schedule available.'})

            except Doctor_Personal_Form_Detials.DoesNotExist:
                return JsonResponse({'error': 'Doctor details not found for the provided DoctorID'}, status=404)

            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        else:
            return JsonResponse({'error': 'DoctorId parameter is required'}, status=400)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)











