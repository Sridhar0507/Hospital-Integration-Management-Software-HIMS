
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from .models import *
from Masters.models import *
from Frontoffice.models import *
from django.utils.timezone import now
import base64
import magic
from PIL import Image
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter


@csrf_exempt
@require_http_methods(["GET"])
def Radiology_Queuelist_link(request):
    try:
        query = request.GET.get('query', '')
        status = request.GET.get('status', '')
        queryset = Radiology_Request_Details.objects.all()
        if query:
            queryset = queryset.filter(
                Q(OP_Register_Id_PatientIdFirstName_icontains=query) |
                Q(OP_Register_Id_PatientIdMiddleName_icontains=query) |
                Q(OP_Register_Id_PatientIdSurName_icontains=query) |
                Q(OP_Register_Id_PatientIdPatientId_icontains=query) |
                Q(OP_Register_Id_PatientIdPhoneNo_icontains=query) |
                Q(IP_Register_Id_PatientIdFirstName_icontains=query) |
                Q(IP_Register_Id_PatientIdMiddleName_icontains=query) |
                Q(IP_Register_Id_PatientIdSurName_icontains=query) |
                Q(IP_Register_Id_PatientIdPatientId_icontains=query) |
                Q(IP_Register_Id_PatientIdPhoneNo_icontains=query) |
                Q(Casuality_Register_Id_PatientIdFirstName_icontains=query) |
                Q(Casuality_Register_Id_PatientIdMiddleName_icontains=query) |
                Q(Casuality_Register_Id_PatientIdSurName_icontains=query) |
                Q(Casuality_Register_Id_PatientIdPatientId_icontains=query) |
                Q(Casuality_Register_Id_PatientIdPhoneNo_icontains=query)
            )

        if status:
            queryset = queryset.filter(Q(Status__icontains=status))

        
        response_data = []
        seen_registration_ids = set()  # Set to track unique registration IDs
        index = 1  # Initialize index outside the loop

        for radiology_request in queryset:
            registration_id = None
            registration_details = None

            # Determine which registration ID to use based on RegisterType
            if radiology_request.RegisterType == 'OP' and radiology_request.OP_Register_Id:
                registration_id = radiology_request.OP_Register_Id.pk
                registration_details = radiology_request.OP_Register_Id
            elif radiology_request.RegisterType == 'IP' and radiology_request.IP_Register_Id:
                registration_id = radiology_request.IP_Register_Id.Registration_Id
                registration_details = radiology_request.IP_Register_Id
            elif radiology_request.RegisterType == 'Casuality' and radiology_request.Casuality_Register_Id:
                registration_id = radiology_request.Casuality_Register_Id.Registration_Id
                registration_details = radiology_request.Casuality_Register_Id

            # Skip if the registration_id is not set or if we've already seen this registration ID
            if not registration_id or registration_id in seen_registration_ids:
                continue

            # Add registration ID to the set
            seen_registration_ids.add(registration_id)

            # Extract patient and doctor details
            patient_id = registration_details.PatientId.PatientId
            patient_age = registration_details.PatientId.Age
            patient_gender = registration_details.PatientId.Gender
            patient_name = f"{registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
            phone_number = registration_details.PatientId.PhoneNo
            doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None
            doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None
            
            response_data.append({
                'id': index,
                'PatientId': patient_id,
                'VisitId': registration_details.VisitId,
                'RegistrationId': registration_id,
                'PatientName': patient_name,
                'PhoneNumber': phone_number,
                'DoctorId': doctor_id,
                'DoctorShortName': doctor_shortname,
                'RegisterType': radiology_request.RegisterType, 
                'age': patient_age,
                'gender': patient_gender
                
            })
            index += 1  # Increment index inside the loop

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        print("Exception:", e)
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)


@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Radiology_Complete_Details_Link(request):
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
            while quality >= min_quality:
                output.seek(0)
                image.save(output, format='JPEG', quality=quality)
                compressed_data = output.getvalue()
                quality -= step
            return compressed_data, len(compressed_data)

        def compress_pdf(file):
            output = BytesIO()
            reader = PdfReader(file)
            writer = PdfWriter()
            for page_num in range(len(reader.pages)):
                writer.add_page(reader.pages[page_num])
            writer.write(output)
            return output.getvalue(), len(output.getvalue())

        if file:
            try:
                file_data = file.split(',')[1]
                file_content = base64.b64decode(file_data)
                file_size = len(file_content)

                max_size_mb = 5
                if file_size > max_size_mb * 1024 * 1024:
                    return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'}, status=400)

                file_type = get_file_type(file)

                if file_type in ['image/jpeg', 'image/png']:
                    image = Image.open(BytesIO(file_content))
                    if image.mode in ('RGBA', 'P'):
                        image = image.convert('RGB')
                    compressed_image_data, _ = compress_image(image)
                    return compressed_image_data

                elif file_type == 'application/pdf':
                    compressed_pdf_data, _ = compress_pdf(BytesIO(file_content))
                    return compressed_pdf_data

                else:
                    return JsonResponse({'warn': 'Unsupported file format'}, status=400)

            except Exception as e:
                return JsonResponse({'error': f'Error processing file: {str(e)}'}, status=500)

        return None

 
    if request.method == 'POST':
        try:
            if not request.body:
                return JsonResponse({'warn': 'Request body is empty'}, status=400)
            
            data = request.POST
            print("complete Radiology", data)
            RegistrationId = data.get('Registeration_Id', None)
            RegisterType = data.get('RegisterType', None)
            ReportDate = data.get('ReportDate', '')
            ReportTime = data.get('ReportTime', '')
            RadiologistName = data.get('RadiologistName', '')
            TechnicianName = data.get('TechnicianName', '')
            Report = data.get('Report', '')
            ReportHandoOvered = data.get('ReportHandoOvered', '')
            RelativeName = data.get('RelativeName', '')
            Radiology_RequestID = data.get('Radiology_RequestID', None)
            ChooseFileOne = data.get('ChooseFileOne', '')
            ChooseFileTwo = data.get('ChooseFileTwo', '')
            ChooseFileThree = data.get('ChooseFileThree', '')
            created_by = data.get('created_by', '')
            Radiology_CompleteId = data.get('Radiology_CompleteId','')
            
            # Correcting the typo in variable name
            processed_files = {
                'ChooseFileOne': validate_and_process_file(ChooseFileOne) if ChooseFileOne else None,
                'ChooseFileTwo': validate_and_process_file(ChooseFileTwo) if ChooseFileTwo else None,
                'ChooseFileThree': validate_and_process_file(ChooseFileThree) if ChooseFileThree else None,
            }
            
            if any(isinstance(value, JsonResponse) for value in processed_files.values()):
                return next(value for value in processed_files.values() if isinstance(value, JsonResponse))
            
            if not RegistrationId:
                return JsonResponse({'warn': 'Missing Registration Id'}, status=200)
            if not Radiology_RequestID:
                return JsonResponse({'warn': 'Missing Request Id'}, status=200)
            if not RegisterType:
                return JsonResponse({'warn': 'Missing RegisterType'}, status=200)
            
            # Fetching registration instance based on RegisterType
            registration_instance = None
            if RegisterType == "OP":
                registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=RegistrationId).first()
            elif RegisterType == "IP":
                registration_instance = Patient_IP_Registration_Detials.objects.filter(pk=RegistrationId).first()
            elif RegisterType == "Casuality":
                registration_instance = Patient_Casuality_Registration_Detials.objects.filter(pk=RegistrationId).first()
            
            if not registration_instance:
                return JsonResponse({'warn': 'Invalid registration ID or RegisterType'})
            
            Radiology_Request_ins = Radiology_Request_Details.objects.filter(pk=Radiology_RequestID).first()
            
            # If Radiology_CompleteId exists, update the entry
            if Radiology_CompleteId:
                try:
                    Radiology_Complete_ins = Radiology_Complete_Details.objects.get(pk=Radiology_CompleteId)
                except Radiology_Complete_Details.DoesNotExist:
                    return JsonResponse({'warn': 'RadiologyTest not found'}, status=404)
                
                # Updating fields
                Radiology_Complete_ins.Radiology_CompleteId = Radiology_CompleteId
                Radiology_Complete_ins.RegisterType = RegisterType
                Radiology_Complete_ins.OP_Register_Id = registration_instance if RegisterType == "OP" else None
                Radiology_Complete_ins.IP_Register_Id = registration_instance if RegisterType == "IP" else None
                Radiology_Complete_ins.Casuality_Register_Id = registration_instance if RegisterType == "Casuality" else None
                Radiology_Complete_ins.Radiology_RequestId = Radiology_Request_ins
                Radiology_Complete_ins.ReportDate = ReportDate
                Radiology_Complete_ins.ReportTime = ReportTime
                Radiology_Complete_ins.RadiologistName = RadiologistName
                Radiology_Complete_ins.Technician_Name = TechnicianName
                Radiology_Complete_ins.Report = Report
                Radiology_Complete_ins.Report_fileone = processed_files['ChooseFileOne']
                Radiology_Complete_ins.Report_filetwo = processed_files['ChooseFileTwo']
                Radiology_Complete_ins.Report_filethree = processed_files['ChooseFileThree']
                Radiology_Complete_ins.Report_HandOverTo = ReportHandoOvered
                Radiology_Complete_ins.RelativeName = RelativeName
                Radiology_Complete_ins.save()
                return JsonResponse({'success': 'Report Entry Updated successfully'}, status=200)
            
            # Else, create a new Radiology Complete entry
            else:
                Radiology_Complete_ins = Radiology_Complete_Details.objects.create(
                    RegisterType=RegisterType,
                    OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                    IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                    Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                    Radiology_RequestId=Radiology_Request_ins,
                    ReportDate=ReportDate,
                    ReportTime=ReportTime,
                    RadiologistName=RadiologistName,
                    Technician_Name=TechnicianName,
                    Report=Report,
                    Report_fileone=processed_files['ChooseFileOne'],
                    Report_filetwo=processed_files['ChooseFileTwo'],
                    Report_filethree=processed_files['ChooseFileThree'],
                    Report_HandOverTo=ReportHandoOvered,
                    RelativeName=RelativeName,
                    Createdby=created_by
                )
                Radiology_Request_ins.Status = "Completed"
                Radiology_Request_ins.save()
                return JsonResponse({'success': 'Report Entry Saved successfully'}, status=200)
        
        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    # elif request.method == 'GET':
    #     try:
    #         registration_id = request.GET.get('Register_Id', None)
    #         RegisterType = request.GET.get('RegisterType', None)

    #         if registration_id is None or RegisterType is None:
    #             return JsonResponse({'warn': 'Missing Registration Id or RegisterType'}, status=400)

    #         # Fetch registration details and corresponding radiology requests
    #         if RegisterType == "OP":
    #             registration_details = Patient_Appointment_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
    #             radiology_requests = Radiology_Complete_Details.objects.filter(OP_Register_Id=registration_id, RegisterType=RegisterType)
    #         elif RegisterType == "IP":
    #             registration_details = Patient_IP_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(Registration_Id=registration_id)
    #             radiology_requests = Radiology_Complete_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType)
    #         elif RegisterType == "Casuality":
    #             registration_details = Patient_Casuality_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
    #             radiology_requests = Radiology_Complete_Details.objects.filter(Casuality_Register_Id=registration_id, RegisterType=RegisterType)
    #         else:
    #             return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

    #         # Function to encode files
    #         def get_file_image(filedata):
    #             mime = magic.Magic(mime=True)
    #             contenttype = mime.from_buffer(filedata)
    #             return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}' if contenttype in ['application/pdf', 'image/jpeg', 'image/png'] else f'data:application/octet-stream;base64,{base64.b64encode(filedata).decode("utf-8")}'

    #         # Prepare response data
    #         response_data = []
    #         for index, req in enumerate(radiology_requests, start=1):
    #             test_code = req.Radiology_RequestId.TestCode
    #             subtest_code = req.Radiology_RequestId.SubTestCode

    #             # Initialize radiology_id for consistency
    #             radiology_id = None
    #             radiology_name = None

    #             # Fetch the required names based on IsSubTest
    #             if req.Radiology_RequestId.IsSubTest == 'Yes':
    #                 testname = TestName_Details.objects.get(Test_Code=test_code)
    #                 subtestname = SubTest_Details.objects.get(SubTest_Code=subtest_code)
    #                 radiology_id = testname.Radiology_Id
    #                 radiology_name = radiology_id.Radiology_Name if radiology_id else None
    #             else:  # If IsSubTest is 'No'
    #                 testname = TestName_Details.objects.get(Test_Code=subtest_code)
    #                 subtestname = None
    #                 radiology_name_obj = RadiologyNames_Details.objects.get(Radiology_Id=test_code)
    #                 radiology_id = radiology_name_obj.Radiology_Id if radiology_name_obj else None
    #                 radiology_name = radiology_name_obj.Radiology_Name if radiology_name_obj else None

    #             current_month = datetime.now()
    #             formatted_date = current_month.strftime("%Y-%m-%d")
    #             report_date = None

    #             if isinstance(req.ReportDate, str) and req.ReportDate:
    #                 try:
    #                     report_date = datetime.fromisoformat(req.ReportDate).strftime('%d-%m-%Y')
    #                 except ValueError:
    #                     print(f"Invalid ReportDate format: {req.ReportDate}")  # Debug print

    #             # Format ReportTime
    #             report_time = None
    #             if isinstance(req.ReportTime, str) and req.ReportTime:
    #                 try:
    #                     report_time = datetime.fromisoformat(req.ReportTime).strftime('%H:%M')
    #                 except ValueError:
    #                     print(f"Invalid ReportTime format: {req.ReportTime}")  # Debug print

    #             response_data.append({
    #                 'id': index,
    #                 'ReportDate': report_date if report_date else formatted_date,
    #                 'ReportTime': report_time if report_time else current_month.strftime('%H:%M'),
    #                 'RadiologistName': req.RadiologistName,
    #                 'TechnicianName': req.Technician_Name,
    #                 'TestCode': test_code,  # Add TestCode
    #                 'SubTestCode': subtest_code,
    #                 'Radiology_RequestId': req.Radiology_RequestId.pk,  # Add Radiology_RequestId
    #                 'Radiology_CompleteId': req.pk,
    #                 'Report': req.Report,
    #                 'IsSubTest': req.Radiology_RequestId.IsSubTest,
    #                 'RadiologyName': radiology_name,
    #                 'TestName': testname.Test_Name if testname else None,
    #                 'SubTestName': subtestname.SubTestName if subtestname else None,
    #                 'RadiologyId': radiology_id if radiology_id else None,
    #                 'Report_fileone': get_file_image(req.Report_fileone) if req.Report_fileone else None,
    #                 'Report_filetwo': get_file_image(req.Report_filetwo) if req.Report_filetwo else None,
    #                 'Report_filethree': get_file_image(req.Report_filethree) if req.Report_filethree else None,
    #                 'Report_HandOverTo': req.Report_HandOverTo,
    #                 'RelativeName': req.RelativeName,
    #                 'Createdby': req.Createdby,
    #                 'Status': req.Status,
    #             })

    #         # Return the response
    #         return JsonResponse(response_data, safe=False)

    #     except Exception as e:
    #         print(f"Exception: {e}")
    #         return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)

    # return JsonResponse({'warn': 'Invalid request method'}, status=405)

    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('Register_Id', None)
            RegisterType = request.GET.get('RegisterType', None)

            if registration_id is None or RegisterType is None:
                return JsonResponse({'warn': 'Missing Registration Id or RegisterType'}, status=400)

            # Fetch registration details and corresponding radiology requests
            if RegisterType == "OP":
                registration_details = Patient_Appointment_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
                radiology_requests = Radiology_Complete_Details.objects.filter(OP_Register_Id=registration_id, RegisterType=RegisterType)
            elif RegisterType == "IP":
                registration_details = Patient_IP_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(Registration_Id=registration_id)
                radiology_requests = Radiology_Complete_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType)
            elif RegisterType == "Casuality":
                registration_details = Patient_Casuality_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
                radiology_requests = Radiology_Complete_Details.objects.filter(Casuality_Register_Id=registration_id, RegisterType=RegisterType)
            else:
                return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

            # Function to encode files
            def get_file_image(filedata):
                mime = magic.Magic(mime=True)
                contenttype = mime.from_buffer(filedata)
                return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}' if contenttype in ['application/pdf', 'image/jpeg', 'image/png'] else f'data:application/octet-stream;base64,{base64.b64encode(filedata).decode("utf-8")}'

            # Prepare response data
            response_data = []
            for index, req in enumerate(radiology_requests, start=1):
                # Fetch the required names based on IsSubTest
                test_code = req.Radiology_RequestId.TestCode
                subtest_code = req.Radiology_RequestId.SubTestCode
                radiology_id = None
                radiology_name = None
                if req.Radiology_RequestId.IsSubTest == 'Yes':
                    testname = TestName_Details.objects.get(Test_Code=test_code)
                    subtestname = SubTest_Details.objects.get(SubTest_Code=subtest_code)
                    radiology_id = testname.Radiology_Id
                    radiology_name = radiology_id.Radiology_Name if radiology_id else None
                else:  # If IsSubTest is 'No'
                    testname = TestName_Details.objects.get(Test_Code=subtest_code)
                    subtestname = None
                    radiology_name_obj = RadiologyNames_Details.objects.get(Radiology_Id=test_code)
                    radiology_name = radiology_name_obj.Radiology_Name if radiology_name_obj else None
                                

                            
                
                current_month = datetime.now()
                # formatted_date = current_month.strftime("%d-%m-%Y")
                formatted_date = current_month.strftime("%Y-%m-%d")
                report_date = None
                if isinstance(req.ReportDate, str) and req.ReportDate:
                    try:
                        report_date = datetime.fromisoformat(req.ReportDate).strftime('%d-%m-%Y')
                    except ValueError:
                        print(f"Invalid ReportDate format: {req.ReportDate}")  # Debug print

    # Format ReportTime
                report_time = None
                if isinstance(req.ReportTime, str) and req.ReportTime:
                    try:
                        report_time = datetime.fromisoformat(req.ReportTime).strftime('%H:%M')
                    except ValueError:
                        print(f"Invalid ReportTime format: {req.ReportTime}")  # Debug print
                response_data.append({
                    'id': index,
                    'ReportDate': report_date if report_date else formatted_date,
                    'ReportTime': report_time if report_time else current_month.strftime('%H:%M'),
                    'RadiologistName': req.RadiologistName,
                    'TechnicianName': req.Technician_Name,
                    'TestCode': test_code,  # Add TestCode
                    'SubTestCode': subtest_code, 
                    'Radiology_RequestId': req.Radiology_RequestId.pk,  # Add Radiology_RequestId
                    'Radiology_CompleteId': req.pk,
                    'Report': req.Report,
                    'IsSubTest':req.Radiology_RequestId.IsSubTest,
                    'RadiologyName': radiology_name,
                    'TestName': testname.Test_Name if testname else None,
                    'SubTestName': subtestname.SubTestName if subtestname else None,
                    'RadiologyId': radiology_id.Radiology_Id if radiology_id else None,
                    'Report_fileone': get_file_image(req.Report_fileone) if req.Report_fileone else None,
                    'Report_filetwo': get_file_image(req.Report_filetwo) if req.Report_filetwo else None,
                    'Report_filethree': get_file_image(req.Report_filethree) if req.Report_filethree else None,
                    'Report_HandOverTo': req.Report_HandOverTo,
                    'RelativeName': req.RelativeName,
                    'Createdby': req.Createdby,
                    'Status': req.Status,
                })

            # Return the response
            return JsonResponse(response_data,  safe=False)


        except Exception as e:
            print(f"Exception: {e}")
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)

    return JsonResponse({'warn': 'Invalid request method'}, status=405)




@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def ReferDoctor_Details_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            ReferId = data.get("ReferId", '')
            PrimaryDoctorId = data.get("DoctorID", '')
            VisitId = data.get("VisitId", '')
            PatientId = data.get("PatientId", '')
            DoctorType = data.get("doctorType", '')
            Remarks = data.get("remarks", '')
            ReferDoctorId = data.get("doctorName", '')
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            # Fetch the primary doctor instance
            
            doctor_register_instance = Doctor_Personal_Form_Detials.objects.get(pk=PrimaryDoctorId)
            print(doctor_register_instance)
            
            # Fetch the referred doctor instance, if provided
            refer_register_instance = Doctor_Personal_Form_Detials.objects.get(pk=ReferDoctorId) if ReferDoctorId else None
            print(refer_register_instance)
            
            if refer_register_instance:
                
                refer_register_instancetype = refer_register_instance.DoctorType
                print(f"ReferDoctorType: {refer_register_instancetype}")
            else:
                refer_register_instancetype = DoctorType
                
            
            # Create a new referral entry
            ReferalDoctorDetails.objects.create(
                PatientId=PatientId,
                VisitId=VisitId,
                PrimaryDoctorId=doctor_register_instance,
                ReferDoctorId=refer_register_instance,
                ReferDoctorType=refer_register_instancetype,
                Remarks=Remarks,
                created_by=created_by
            )

            return JsonResponse({'success': 'Refer a Doctor added successfully'}, status=200)

        except Doctor_Personal_Form_Detials.DoesNotExist:
            return JsonResponse({'warn': 'Doctor not found'})
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while processing your request'}, status=500)

    elif request.method == 'GET':
        try:
            PatientId = request.GET.get('PatientId', None)
            VisitId = request.GET.get('VisitId', None)
            filters = {}
            if PatientId:
                filters['PatientId'] = PatientId
            if VisitId:
                filters['VisitId'] = VisitId

            refer_doctors = ReferalDoctorDetails.objects.filter(**filters)
            refer_data = []
            index = 1

            
            for refer in refer_doctors:
                primary_doctor_name = f"{refer.PrimaryDoctorId.Tittle} {refer.PrimaryDoctorId.First_Name} {refer.PrimaryDoctorId.Middle_Name} {refer.PrimaryDoctorId.Last_Name}".strip()
                refer_doctor_name = f"{refer.ReferDoctorId.Tittle} {refer.ReferDoctorId.First_Name} {refer.ReferDoctorId.Middle_Name} {refer.ReferDoctorId.Last_Name}".strip() if refer.ReferDoctorId else 'N/A'

                refer_data.append({
                    'id': index,
                    'ReferId': refer.Refer_Id,
                    'PatientId': refer.PatientId,
                    'VisitId': refer.VisitId,
                    'PrimaryDoctorId': refer.PrimaryDoctorId.pk if refer.PrimaryDoctorId else None,
                    'PrimaryDoctorName': primary_doctor_name,
                    'ReferDoctorId': refer.ReferDoctorId.pk if refer.ReferDoctorId else None,
                    'ReferDoctorName': refer_doctor_name,
                    'DoctorType': refer.ReferDoctorType,
                    'Remarks': refer.Remarks,
                    'Status': 'Active' if refer.Status else 'Inactive',
                    'created_by': refer.created_by
                })
                index += 1
            return JsonResponse(refer_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})
    # Ensure there's an HttpResponse in every code path
    return JsonResponse({'error': 'Invalid request method'},status=405)



@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Lab_Request_Detailslink(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Extract data from the request
            lab_queue_id = data.get('LabQueueId', '')
            indivitual_arr = data.get('IndivitualArr', [])
            favourites_arr = data.get('FavouritesArr', [])
            created_by = data.get('created_by', '')
            registration_id = data.get('Register_Id', None)
            print(registration_id)
            register_type = data.get('RegisterType', '')

            print(registration_id, 'registration_id')

            if registration_id is None or register_type not in ['OP', 'IP', 'Casuality']:
                return JsonResponse({'warn': 'Missing or invalid registration ID or registration type'})

            # Prepare the arguments based on the register type
            register_kwargs = {'RegisterType': register_type}
            if register_type == 'OP':
                # Fetch the corresponding Patient_Appointment_Registration_Detials instance
                try:
                    op_register_instance = Patient_Appointment_Registration_Detials.objects.get(Registration_Id=registration_id)
                    register_kwargs['OP_Register_Id'] = op_register_instance
                    print(op_register_instance,'op_register_instance')
                except Patient_Appointment_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'OP Registration ID not found'})
                
            elif register_type == 'IP':
                try:
                    ip_register_instance = Patient_IP_Registration_Detials.objects.get(Registration_Id=registration_id)
                    register_kwargs['IP_Register_Id'] = ip_register_instance
                except Patient_IP_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'IP Registration ID not found'})

            elif register_type == 'Casuality':
                try:
                    casuality_register_instance = Patient_Casuality_Registration_Detials.objects.get(Registration_Id=registration_id)
                    register_kwargs['Casuality_Register_Id'] = casuality_register_instance
                except Patient_Casuality_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'Casuality Registration ID not found'})

            # Process Individual Tests
            for indivitual in indivitual_arr:
                test_type = indivitual.get('testType', "Individual")
                test_code = indivitual.get('id', '')
                Lab_Request_Details.objects.create(
                    TestType=test_type,
                    Code=test_code,
                    created_by=created_by,
                    **register_kwargs
                )

            # Process Favourites
            for favourite in favourites_arr:
                test_type = favourite.get('testType', "Favourites")
                favourite_key = favourite.get('key', '')
                Lab_Request_Details.objects.create(
                    TestType=test_type,
                    Code=favourite_key,
                    created_by=created_by,
                    **register_kwargs
                )

            return JsonResponse({'success': 'Data saved successfully'}, status=200)

        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    elif request.method == 'GET':
        try:
            # Extract query parameters
            registration_id = request.GET.get('Register_Id', None)
            register_type = request.GET.get('RegisterType', None)

            if not registration_id:
                return JsonResponse({'warn': 'Missing registration ID'})
            if register_type not in ["OP", "IP", "Casuality"]:
                return JsonResponse({'warn': 'Missing or invalid Register Type'})

            # Fetch the registration details, including related patient and doctor details
            registration_details = None
            if register_type == "OP":
                registration_details = Patient_Appointment_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
            elif register_type == "IP":
                registration_details = Patient_IP_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
            elif register_type == "Casuality":
                registration_details = Patient_Casuality_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)

            # Extract patient and doctor details
            patient_id = registration_details.PatientId.PatientId
            patient_name = f"{registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
            phone_number = registration_details.PatientId.PhoneNo
            doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None
            doctor_name = f"{registration_details.PrimaryDoctor.First_Name} {registration_details.PrimaryDoctor.Last_Name}" if registration_details.PrimaryDoctor else None
            doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None

            # Filter Lab_Request_Details by registration_id
            lab_requests = Lab_Request_Details.objects.filter(
                **{
                    f"{register_type}_Register_Id": registration_id
                }
            )

            response_data = []
            index = 1
            for request in lab_requests:
                if request.TestType == 'Individual':
                    test_name = LabTestName_Details.objects.filter(TestCode=request.Code).first()
                    if test_name:
                        response_data.append({
                            'id': index,
                            'PatientId': patient_id,
                            'PatientName': patient_name,
                            'PhoneNumber': phone_number,
                            'DoctorId': doctor_id,
                            'DoctorName': doctor_name,
                            'DoctorShortName': doctor_shortname,
                            'RegisterType': request.RegisterType,
                            'TestType': request.TestType,
                            'TestCode': request.Code,
                            'TestName': test_name.Test_Name
                        })
                        index += 1
                elif request.TestType == 'Favourites':
                    favourite = TestName_Favourites.objects.filter(Favourite_Code=request.Code).first()
                    if favourite:
                        for test_index, test in enumerate(favourite.TestName.all(), start=1):
                            response_data.append({
                                'id': index,
                                'PatientId': patient_id,
                                'PatientName': patient_name,
                                'PhoneNumber': phone_number,
                                'DoctorId': doctor_id,
                                'DoctorName': doctor_name,
                                'DoctorShortName': doctor_shortname,
                                'RegisterType': request.RegisterType,
                                'TestType': request.TestType,
                                'FavouriteCode': favourite.Favourite_Code,
                                'FavouriteName': favourite.FavouriteName,
                                'TestCode': test.TestCode,
                                'TestName': test.Test_Name
                            })
                            index += 1

            return JsonResponse(response_data, safe=False)

        except Patient_Appointment_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Registration ID not found'}, status=404)
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Registration ID not found'}, status=404)
        except Patient_Casuality_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Registration ID not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)



# @csrf_exempt
# @require_http_methods(["POST", "GET", "OPTIONS"])
# def Radiology_Request_Detailslink(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             # Extract data from the request
#             Radiology_queue_id = data.get('RadiologyTestId', '')
#             Testname_arr = data.get('SubtestNoArr', [])
#             SubTestname_arr = data.get('CheckedTestNameArr', [])
#             created_by = data.get('created_by', '')
#             RegisterType = data.get('RegisterType',None)
#             registration_id = data.get('Register_Id', None)
#             print(registration_id)
            
#             if registration_id is None or RegisterType is None:
#                 return JsonResponse({'warn': 'Missing registration ID or RegisterType'})
#              # Determine the correct registration model and fetch the instance
#             registration_instance = None
#             if RegisterType == "OP":
#                 registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=registration_id).first()
#             elif RegisterType == "IP":
#                 registration_instance = Patient_IP_Registration_Detials.objects.filter(Registration_Id=registration_id).first()
#             elif RegisterType == "Casuality":
#                 registration_instance = Patient_Casuality_Registration_Detials.objects.filter(pk=registration_id).first()
            
#             # Process IsSubTest No Tests
#             for testname in Testname_arr:
#                 test_Type = testname.get('SubTestType', "No")
#                 Radiologyid = testname.get('Radiologyid', None)
#                 TestCode = testname.get('TestCode', None)
                
#                 if Radiologyid and TestCode:  # Ensure required fields are present
#                     Radiology_Request_Details.objects.create(
#                         RegisterType = RegisterType,
#                         OP_Register_Id=registration_instance if RegisterType == "OP" else None,
#                         IP_Register_Id=registration_instance if RegisterType == "IP" else None,
#                         Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
#                         IsSubTest=test_Type,
#                         TestCode=Radiologyid,
#                         SubTestCode=TestCode,
#                         created_by=created_by
#                     )
            
#             # Process IsSubTest Yes Tests
#             for subtest in SubTestname_arr:
#                 test_Type = subtest.get('SubTestType', "Yes")
#                 TestCode = subtest.get('TestCode', '')
#                 SubTest_Code = subtest.get('SubTest_Code', '')
                
#                 if TestCode and SubTest_Code:  # Ensure required fields are present
#                     Radiology_Request_Details.objects.create(
#                         RegisterType = RegisterType,
#                         OP_Register_Id=registration_instance if RegisterType == "OP" else None,
#                         IP_Register_Id=registration_instance if RegisterType == "IP" else None,
#                         Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
#                         IsSubTest=test_Type,
#                         TestCode=TestCode,
#                         SubTestCode=SubTest_Code,
#                         created_by=created_by
#                     )
        
#             return JsonResponse({'success': 'Data Saved successfully'}, status=200)
        
#         except Exception as e:
#             print("Exception:", e)
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
#     elif request.method == 'GET':
#         try:
#             registration_id = request.GET.get('Register_Id', None)
#             RegisterType = request.GET.get('RegisterType', None)
            
#             if registration_id is None or RegisterType is None:
#                 return JsonResponse({'warn': 'Missing Registration Id or RegisterType'}, status=400)
            
#             # Fetch registration details based on RegisterType
#             if RegisterType == "OP":
#                 registration_details = Patient_Appointment_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
#                 radiology_requests = Radiology_Request_Details.objects.filter(OP_Register_Id_id=registration_id, RegisterType=RegisterType)
#             elif RegisterType == "IP":
#                 registration_details = Patient_IP_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(Registration_Id=registration_id)
#                 radiology_requests = Radiology_Request_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType)
#             elif RegisterType == "Casuality":
#                 registration_details = Patient_Casuality_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
#                 radiology_requests = Radiology_Request_Details.objects.filter(Casuality_Register_Id_id=registration_id, RegisterType=RegisterType)
#             else:
#                 return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)
            
#             # Extract patient and doctor details
#             patient_id = registration_details.PatientId.PatientId
#             patient_name = f"{registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
#             phone_number = registration_details.PatientId.PhoneNo
#             doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None
#             doctor_name = f"{registration_details.PrimaryDoctor.First_Name} {registration_details.PrimaryDoctor.Last_Name}" if registration_details.PrimaryDoctor else None
#             doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None
            
#             if RegisterType == "OP":
#                 radiology_requests = Radiology_Request_Details.objects.filter(OP_Register_Id=registration_id, RegisterType=RegisterType)
#             elif RegisterType == "IP":
#                 radiology_requests = Radiology_Request_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType)
#             elif RegisterType == "Casuality":
#                 radiology_requests = Radiology_Request_Details.objects.filter(Casuality_Register_Id=registration_id, RegisterType=RegisterType)
                

            
#             response_data_yes = []
#             response_data_no = []
#             index = 1
#             indexx = 1
            
#             for req in radiology_requests:
#                 if req.IsSubTest == "No":
#                     # Fetch related TestName_Details and RadiologyNames_Details
#                     testname = TestName_Details.objects.filter(Test_Code=req.SubTestCode).first()
#                     radiologyname = RadiologyNames_Details.objects.filter(Radiology_Id=req.TestCode).first()
                    
#                     if radiologyname and testname:
#                         response_data_no.append({
#                             'id': index,
#                             'PatientId': patient_id,
#                             'PatientName': patient_name,
#                             'PhoneNumber': phone_number,
#                             'DoctorId': doctor_id,
#                             'DoctorName': doctor_name,
#                             'DoctorShortName': doctor_shortname,
#                             'IsSubTest': req.IsSubTest,
#                             'Radiologyid': radiologyname.Radiology_Id,
#                             'RadiologyName': radiologyname.Radiology_Name,
#                             'TestCode': testname.Test_Code,
#                             'TestName': testname.Test_Name,
#                             'SubTestCode': req.SubTestCode,
#                             'Amount': testname.Amount,
#                         })
#                         index += 1
                
#                 elif req.IsSubTest == "Yes":
#                     # Fetch related TestName_Details and SubTest_Details
#                     testname = TestName_Details.objects.filter(Test_Code=req.TestCode).first()
#                     subtestname = SubTest_Details.objects.filter(SubTest_Code=req.SubTestCode).first()
                    
#                     if testname and subtestname:
#                         # Fetch the RadiologyNames_Details using TestName_Details' Radiology_Id
#                         radiologyname = testname.Radiology_Id  # Access the foreign key related object
                        
#                         response_data_yes.append({
#                             'id': indexx,
#                             'PatientId': patient_id,
#                             'PatientName': patient_name,
#                             'PhoneNumber': phone_number,
#                             'DoctorId': doctor_id,
#                             'DoctorName': doctor_name,
#                             'DoctorShortName': doctor_shortname,
#                             'IsSubTest': req.IsSubTest,
#                             'Radiologyid': radiologyname.Radiology_Id,
#                             'RadiologyName': radiologyname.Radiology_Name,
#                             'TestCode': testname.Test_Code,
#                             'TestName': testname.Test_Name,
#                             'SubTestCode': subtestname.SubTest_Code,
#                             'SubTestName': subtestname.SubTestName,
#                             'Amount': subtestname.Amount,
#                         })
                    
#                         indexx += 1
            
#             # Return both lists in the response
#             return JsonResponse({
#                 'IsSubTestYes': response_data_yes,
#                 'IsSubTestNo': response_data_no
#             }, safe=False)
                    
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#         return JsonResponse({'error': 'Method not allowed'}, status=405)







@csrf_exempt
@require_http_methods(["GET"])
def Lab_Queuelist_link(request):
    try:
        query = request.GET.get('query', '')
        status = request.GET.get('status', '')

        # Fetch all Lab_Request_Details
        queryset = Lab_Request_Details.objects.all()

        # Apply filters based on the query parameters
        if query:
            queryset = queryset.filter(
                Q(OP_Register_Id__PatientId__FirstName__icontains=query) |
                Q(OP_Register_Id__PatientId__MiddleName__icontains=query) |
                Q(OP_Register_Id__PatientId__SurName__icontains=query) |
                Q(OP_Register_Id__PatientId__PatientId__icontains=query) |
                Q(OP_Register_Id__PatientId__PhoneNo__icontains=query) |
                Q(IP_Register_Id__PatientId__FirstName__icontains=query) |
                Q(IP_Register_Id__PatientId__MiddleName__icontains=query) |
                Q(IP_Register_Id__PatientId__SurName__icontains=query) |
                Q(IP_Register_Id__PatientId__PatientId__icontains=query) |
                Q(IP_Register_Id__PatientId__PhoneNo__icontains=query) |
                Q(Casuality_Register_Id__PatientId__FirstName__icontains=query) |
                Q(Casuality_Register_Id__PatientId__MiddleName__icontains=query) |
                Q(Casuality_Register_Id__PatientId__SurName__icontains=query) |
                Q(Casuality_Register_Id__PatientId__PatientId__icontains=query) |
                Q(Casuality_Register_Id__PatientId__PhoneNo__icontains=query)
            )

        if status:
            queryset = queryset.filter(Q(Status__icontains=status))

        response_data = []
        seen_registration_ids = set()
        index = 1

        for lab_request in queryset:
            registration_details = None
            if lab_request.RegisterType == "OP":
                registration_details = lab_request.OP_Register_Id
            elif lab_request.RegisterType == "IP":
                registration_details = lab_request.IP_Register_Id
            elif lab_request.RegisterType == "Casuality":
                registration_details = lab_request.Casuality_Register_Id

            if not registration_details:
                continue

            # Determine registration ID based on RegisterType
            if lab_request.RegisterType == "OP":
                registration_id = registration_details.id
            elif lab_request.RegisterType == "IP":
                registration_id = registration_details.Registration_Id
            elif lab_request.RegisterType == "Casuality":
                registration_id = registration_details.id
            else:
                continue

            # Skip if we've already seen this registration ID
            if registration_id in seen_registration_ids:
                continue

            # Add registration ID to the set
            seen_registration_ids.add(registration_id)

            # Extract patient and doctor details
            patient_id = registration_details.PatientId.PatientId
            patient_name = f"{registration_details.PatientId.Title}. {registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
            phone_number = registration_details.PatientId.PhoneNo
            doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None
            doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None

            response_data.append({
                'id': index,
                'PatientId': patient_id,
                'VisitId': registration_details.VisitId,
                'RegistrationId': registration_id,
                'PatientName': patient_name,
                'PhoneNumber': phone_number,
                'DoctorId': doctor_id,
                'DoctorShortName': doctor_shortname,
                'Specilization': str(registration_details.Specialization.Speciality_Name) if registration_details.Specialization else '',
                'RegisterType': lab_request.RegisterType,  # Added RegisterType
            })
            index += 1

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'Internal server error'}, status=500)



@csrf_exempt
@require_http_methods(["GET"])
def Lab_Request_TestDetails(request):
    try:
        registration_id = request.GET.get('Register_Id')
        patient_id = request.GET.get('Patient_Id')
        register_type = request.GET.get('RegisterType')

        if not registration_id or not patient_id or not register_type:
            return JsonResponse({'warn': 'Missing registration ID, patient ID, or RegisterType'}, status=400)

        # Get the patient details
        try:
            patient_details = Patient_Detials.objects.get(PatientId=patient_id)  # Ensure this is the correct model
            patient_age = patient_details.Age
            patient_gender = patient_details.Gender
        except Patient_Detials.DoesNotExist:
            return JsonResponse({'warn': 'Patient ID not found'}, status=404)

        # Get the lab requests for the given registration ID based on RegisterType
        if register_type == "OP":
            lab_requests = Lab_Request_Details.objects.filter(
                OP_Register_Id=registration_id,
                RegisterType=register_type
            )
        elif register_type == "IP":
            lab_requests = Lab_Request_Details.objects.filter(
                IP_Register_Id=registration_id,
                RegisterType=register_type
            )
        elif register_type == "Casuality":
            lab_requests = Lab_Request_Details.objects.filter(
                Casuality_Register_Id=registration_id,  # Fixed the field name here
                RegisterType=register_type
            )
        else:
            return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

        # Separate lists for Individual and Favourites with unique indices
        individual_requests = []
        favourites_requests = []

        individual_index = 1
        favourites_index = 1

        for lab_request in lab_requests:
            if lab_request.TestType == 'Individual':
                test_name = LabTestName_Details.objects.filter(TestCode=lab_request.Code).first()
                if test_name:
                    individual_requests.append({
                        'Id': individual_index,
                        'TestType': lab_request.TestType,
                        'TestCode': lab_request.Code,
                        'TestName': test_name.Test_Name,
                        'Amount': test_name.Amount,
                    })
                    individual_index += 1  # Increment the individual index

            elif lab_request.TestType == 'Favourites':
                favourite = TestName_Favourites.objects.filter(Favourite_Code=lab_request.Code).first()
                if favourite:
                    favourites_requests.append({
                        'Id': favourites_index,
                        'TestType': lab_request.TestType,
                        'FavouriteCode': favourite.Favourite_Code,
                        'FavouriteName': favourite.FavouriteName,
                        'Amount': favourite.Current_Amount,
                        'TestNames': [{
                            'Id': test_index,
                            'TestCode': test.TestCode,
                            'TestName': test.Test_Name
                        } for test_index, test in enumerate(favourite.TestName.all(), start=1)]
                    })
                    favourites_index += 1  # Increment the favourites index

        # Add patient's age and gender to the response
        response = {
            'PatientAge': patient_age,
            'PatientGender': patient_gender,
            'IndividualRequests': individual_requests,
            'FavouritesRequests': favourites_requests,
        }

        return JsonResponse(response, safe=False)


    except Exception as e:
        print(f"Internal server error: {str(e)}")  # Log the error for debugging
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)





@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Lab_SelectedTest_Detailslink(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)
            
            individual_arr = data.get('IndividualArr', [])
            favourites_arr = data.get('FavouritesArr', [])
            unchecked_arr = data.get('uncheckedTestsArr', [])
            created_by = data.get('created_by', '')
            registration_id = data.get('RegistrationId', None)
            RegisterType = data.get('RegisterType', None)
            
            if registration_id is None or RegisterType is None:
                return JsonResponse({'warn': 'Missing registration ID or RegisterType'})
            
            # Determine the correct registration model and fetch the instance
            registration_instance = None
            if RegisterType == "OP":
                registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=registration_id).first()
            elif RegisterType == "IP":
                registration_instance = Patient_IP_Registration_Detials.objects.filter(pk=registration_id).first()
            elif RegisterType == "Casuality":
                registration_instance = Patient_Casuality_Registration_Detials.objects.filter(ipk=registration_id).first()
            
            if not registration_instance:
                return JsonResponse({'warn': 'Invalid registration ID or RegisterType'})

            # Save individual tests
            for individual in individual_arr:
                test_code = individual.get('testCode', '')
                try:
                    amount = int(individual.get('amount', 0))
                    categorytype = individual.get('category', 'InHouse')
                    address = individual.get('address', '')
                    location = individual.get('location', '')
                except ValueError:
                    return JsonResponse({'error': 'Invalid amount value'})
                
                if amount > 0:
                    Lab_Request_Selected_Details.objects.create(
                        RegisterType=RegisterType,
                        OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                        IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                        Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                        TestType="Individual",
                        Code=test_code,
                        Amount=amount,
                        created_by=created_by,
                        CategoryType=categorytype,
                        Address=address,
                        Location=location
                    )
                    
                    # Check and update Lab_Request_Details status
                    if RegisterType == "OP":
                        related_request = Lab_Request_Details.objects.filter(
                            OP_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    elif RegisterType == "IP":
                        related_request = Lab_Request_Details.objects.filter(
                            IP_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    elif RegisterType == "Casuality":
                        related_request = Lab_Request_Details.objects.filter(
                            Casuality_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    
                    if related_request:
                        if not related_request.Reason:
                            related_request.Status = 'Completed'
                            related_request.save()

            # Save favourite tests
            for favourite in favourites_arr:
                favourite_code = favourite.get('FavouriteCode', '')
                try:
                    amount = int(favourite.get('amount', 0))
                    categorytype = favourite.get('category', 'InHouse')
                    address = favourite.get('address', '')
                    location = favourite.get('location', '')
                except ValueError:
                    return JsonResponse({'error': 'Invalid amount value'})
                
                if amount > 0:
                    Lab_Request_Selected_Details.objects.create(
                        RegisterType=RegisterType,
                        OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                        IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                        Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                        TestType="Favourites",
                        Code=favourite_code,
                        Amount=amount,
                        created_by=created_by,
                        CategoryType=categorytype,
                        Address=address,
                        Location=location
                    )
                    
                    # Check and update Lab_Request_Details status
                    if RegisterType == "OP":
                        related_request = Lab_Request_Details.objects.filter(
                            OP_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    elif RegisterType == "IP":
                        related_request = Lab_Request_Details.objects.filter(
                            IP_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    elif RegisterType == "Casuality":
                        related_request = Lab_Request_Details.objects.filter(
                            Casuality_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    
                    if related_request:
                        if not related_request.Reason:
                            related_request.Status = 'Completed'
                            related_request.save()

            # Update status to 'Cancelled' and set reason for unchecked tests
            for test in unchecked_arr:
                test_code = test.get('testCode', '')
                favourite_code = test.get('FavouriteCode', '')
                reason = test.get('reason', '')  # Default reason if not provided

                if test_code:
                    if RegisterType == "OP":
                        related_request = Lab_Request_Details.objects.filter(
                            OP_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    elif RegisterType == "IP":
                        related_request = Lab_Request_Details.objects.filter(
                            IP_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    elif RegisterType == "Casuality":
                        related_request = Lab_Request_Details.objects.filter(
                            Casuality_Register_Id=registration_id,
                            Code=test_code
                        ).first()
                    
                    if related_request:
                        related_request.Status = 'Cancelled'
                        related_request.Reason = reason
                        related_request.save()

                if favourite_code:
                    if RegisterType == "OP":
                        related_request = Lab_Request_Details.objects.filter(
                            OP_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    elif RegisterType == "IP":
                        related_request = Lab_Request_Details.objects.filter(
                            IP_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    elif RegisterType == "Casuality":
                        related_request = Lab_Request_Details.objects.filter(
                            Casuality_Register_Id=registration_id,
                            Code=favourite_code
                        ).first()
                    
                    if related_request:
                        related_request.Status = 'Cancelled'
                        related_request.Reason = reason
                        related_request.save()

            return JsonResponse({'success': 'Data saved successfully'}, status=200)
                
        except Exception as e:
            print("Exception occurred:", e)
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)




# @csrf_exempt
# @require_http_methods(["GET"])
# def Radiology_Queuelist_link(request):
#     try:
#         # Fetch all Radiology_Request_Details with the status 'Request'
#         radiology_requests = Radiology_Request_Details.objects.filter(Status='Request')

#         response_data = []
#         seen_registration_ids = set()  # Set to track unique registration IDs
#         index = 1  # Initialize index outside the loop

#         for radiology_request in radiology_requests:
#             registration_id = None
#             registration_details = None

#             # Determine which registration ID to use based on RegisterType
#             if radiology_request.RegisterType == 'OP' and radiology_request.OP_Register_Id:
#                 registration_id = radiology_request.OP_Register_Id.Registration_Id
#                 registration_details = radiology_request.OP_Register_Id
#             elif radiology_request.RegisterType == 'IP' and radiology_request.IP_Register_Id:
#                 registration_id = radiology_request.IP_Register_Id.Registration_Id
#                 registration_details = radiology_request.IP_Register_Id
#             elif radiology_request.RegisterType == 'Casuality' and radiology_request.Casuality_Register_Id:
#                 registration_id = radiology_request.Casuality_Register_Id.Registration_Id
#                 registration_details = radiology_request.Casuality_Register_Id

#             # Skip if the registration_id is not set or if we've already seen this registration ID
#             if not registration_id or registration_id in seen_registration_ids:
#                 continue

#             # Add registration ID to the set
#             seen_registration_ids.add(registration_id)

#             # Extract patient and doctor details
#             patient_id = registration_details.PatientId.PatientId
#             patient_name = f"{registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
#             phone_number = registration_details.PatientId.PhoneNo
#             doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None
#             doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None
            
#             response_data.append({
#                 'id': index,
#                 'PatientId': patient_id,
#                 'VisitId': registration_details.VisitId,
#                 'RegistrationId': registration_id,
#                 'PatientName': patient_name,
#                 'PhoneNumber': phone_number,
#                 'DoctorId': doctor_id,
#                 'DoctorShortName': doctor_shortname,
#                 'RegisterType': radiology_request.RegisterType, 
#             })
#             index += 1  # Increment index inside the loop

#         return JsonResponse(response_data, safe=False)

#     except Exception as e:
#         print("Exception:", e)
#         return JsonResponse({'error': 'An internal server error occurred'}, status=500)




@csrf_exempt
@require_http_methods(["GET"])
def Lab_ViewStatus_link(request):
    try:
        registration_id = request.GET.get('RegistrationId')
        status = request.GET.get('status', '')
        register_type = request.GET.get('RegisterType', '')

        if not registration_id:
            return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

        # Validate RegisterType
        if register_type not in ['OP', 'IP', 'Casuality']:
            return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

        # Adjust the queryset based on RegisterType
        queryset_filter = Q()
        if register_type == "IP":
            queryset_filter = Q(IP_Register_Id=registration_id)
        elif register_type == "OP":
            queryset_filter = Q(OP_Register_Id=registration_id)
        elif register_type == "Casuality":
            queryset_filter = Q(Casuality_Register_Id=registration_id)

        queryset = Lab_Request_Details.objects.filter(
            queryset_filter & Q(Status=status) & Q(RegisterType=register_type)
        )

        # Initialize lists to store individual and favourite test details
        individual_tests = []
        favourite_tests = []

        individual_index = 1  # Initialize index for individual tests
        favourite_index = 1   # Initialize index for favourite tests

        for lab_request in queryset:
            if lab_request.TestType == 'Favourites':
                # Fetch the favourite test details
                favourite_test_obj = TestName_Favourites.objects.filter(Favourite_Code=lab_request.Code).first()
                if not favourite_test_obj:
                    continue  # Skip if Favourite_Code is not found

                favourite_test_details = {
                    'id': favourite_index,
                    'FavouriteTestCode': favourite_test_obj.Favourite_Code,
                    'FavouriteTestName': favourite_test_obj.FavouriteName,
                    'Status': lab_request.Status,
                }

                if lab_request.Status == 'Cancelled':
                    favourite_test_details['Reason'] = lab_request.Reason

                favourite_tests.append(favourite_test_details)
                favourite_index += 1

            elif lab_request.TestType == 'Individual':
                # Fetch the individual test details
                test_name_obj = LabTestName_Details.objects.filter(TestCode=lab_request.Code).first()
                if not test_name_obj:
                    continue  # Skip if TestCode is not found

                individual_test_details = {
                    'id': individual_index,
                    'IndividualTestCode': lab_request.Code,
                    'IndividualTestName': test_name_obj.Test_Name,
                    'Status': lab_request.Status,
                }

                if lab_request.Status == 'Cancelled':
                    individual_test_details['Reason'] = lab_request.Reason

                individual_tests.append(individual_test_details)
                individual_index += 1

        # Combine the lists into the response data
        response_data = {
            'IndividualTests': individual_tests,
            'FavouriteTests': favourite_tests
        }

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        # Print the error to the console or logs for debugging
        print(f"Error occurred: {str(e)}")
        return JsonResponse({'error': 'Internal server error'}, status=500)


# lab completedqueue 
@csrf_exempt
@require_http_methods(["GET"])
def Lab_completed_quelist(request):
    try:
        # Get the 'status' parameter from the request
        status = request.GET.get('status', '')
        query = request.GET.get('query', '')

        # Filter queryset to include records with RegisterType 'OP' or 'IP'
        queryset = Lab_Request_Selected_Details.objects.filter(
            Q(RegisterType='OP') | Q(RegisterType='IP')
        )

        # Apply additional status filtering if provided
        if status:
            queryset = queryset.filter(Q(Status__icontains=status))

        response_data = []
        seen_registration_ids = set()
        index = 1

        for lab_complete in queryset:
            # Determine registration ID based on RegisterType
            if lab_complete.RegisterType == 'OP':
                registration_id = lab_complete.OP_Register_Id.pk
                registration_details = lab_complete.OP_Register_Id
            else:
                registration_id = lab_complete.IP_Register_Id.Registration_Id
                registration_details = lab_complete.IP_Register_Id

            # Avoid duplicate entries based on registration ID
            if registration_id in seen_registration_ids:
                continue
            seen_registration_ids.add(registration_id)

            patient = registration_details.PatientId
            patient_name = f"{patient.Title}. {patient.FirstName} {patient.MiddleName} {patient.SurName}".strip()
            phone_number = patient.PhoneNo
            doctor = registration_details.PrimaryDoctor
            doctor_shortname = doctor.ShortName if doctor else None
            doctor_id = doctor.Doctor_ID if doctor else None
            specialization_name = registration_details.Specialization.Speciality_Name if registration_details.Specialization else ''
            
            response_data.append({
                'id': index,
                'PatientId': patient.PatientId,
                'VisitId': registration_details.VisitId,
                'RegistrationId': registration_id,
                'PatientName': patient_name,
                'PhoneNumber': phone_number,
                'DoctorId': doctor_id,
                'DoctorShortName': doctor_shortname,
                'Specialization': str(specialization_name),
                'CategoryType': lab_complete.CategoryType,
                'Status': lab_complete.Status,
                'RegisterType': lab_complete.RegisterType
            })
            index += 1

        return JsonResponse(response_data, safe=False)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
@require_http_methods(["GET"])
def Lab_Complete_TestDetails(request):
    try:
        # Retrieve parameters from the request
        registration_id = request.GET.get('Register_Id')
        patient_id = request.GET.get('Patient_Id')
        status = request.GET.get('Status', 'Paid')
        register_type = request.GET.get('RegisterType')

        # Validate required parameters
        if not all([registration_id, patient_id, register_type]):
            return JsonResponse({'warn': 'Missing registration ID, patient ID, or register type'}, status=400)

        try:
            # Fetch patient details
            patient_details = Patient_Detials.objects.get(PatientId=patient_id)
            patient_age = patient_details.Age
            patient_gender = patient_details.Gender
        except Patient_Detials.DoesNotExist:
            return JsonResponse({'warn': 'Patient ID not found'}, status=404)

        # Filter lab requests based on parameters
        if register_type == "OP":
            lab_completes = Lab_Request_Selected_Details.objects.filter(
                Q(OP_Register_Id=registration_id) &
                Q(Status=status) &
                Q(RegisterType=register_type)
            )
        elif register_type == "IP":
            lab_completes = Lab_Request_Selected_Details.objects.filter(
                Q(IP_Register_Id=registration_id) &
                Q(Status=status) &
                Q(RegisterType=register_type)
            )
        elif register_type == "Casuality":
            lab_completes = Lab_Request_Selected_Details.objects.filter(
                Q(Casuality_Register_Id=registration_id) &
                Q(Status=status) &
                Q(RegisterType=register_type)
            )
        else:
            return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

        individual_complete = []
        favourites_complete = []

        individual_index = 1
        favourites_index = 1

        for lab_complete in lab_completes:
            if lab_complete.TestType == 'Individual':
                test_name = LabTestName_Details.objects.filter(TestCode=lab_complete.Code).first()
                if test_name:
                    individual_complete.append({
                        'Id': individual_index,
                        'TestType': lab_complete.TestType,
                        'TestName': test_name.Test_Name,
                        'TestCode': test_name.TestCode,
                        'CategoryType': lab_complete.CategoryType,
                    })
                    individual_index += 1

            elif lab_complete.TestType == 'Favourites':
                favourite = TestName_Favourites.objects.filter(Favourite_Code=lab_complete.Code).first()
                if favourite:
                    # Add the favourite entry
                    favourites_complete.append({
                        'Id': favourites_index,
                        'FavouriteName': favourite.FavouriteName,
                        'FavouriteCode': favourite.Favourite_Code,
                        'TestCode': None,
                        'TestName': None,
                        'CategoryType': lab_complete.CategoryType,
                    })
                    favourites_index += 1

                    # Add entries for each test within the favourite
                    for test_index, test in enumerate(favourite.TestName.all(), start=1):
                        favourites_complete.append({
                            'Id': favourites_index,
                            'FavouriteName': None,
                            'FavouriteCode': None,
                            'TestCode': test.TestCode,
                            'TestName': test.Test_Name,
                            'CategoryType': lab_complete.CategoryType,
                        })
                        favourites_index += 1

        # Prepare the response data
        response = {
            'PatientAge': patient_age,
            'PatientGender': patient_gender,
            'IndividualRequests': individual_complete,
            'FavouritesRequests': favourites_complete,
        }

        return JsonResponse(response, safe=False)

    except Exception as e:
        return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)







@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Lab_PaidDetails_link(request):
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
            while quality >= min_quality:
                output.seek(0)
                image.save(output, format='JPEG', quality=quality)
                compressed_data = output.getvalue()
                quality -= step
            return compressed_data, len(compressed_data)

        def compress_pdf(file):
            output = BytesIO()
            reader = PdfReader(file)
            writer = PdfWriter()
            for page_num in range(len(reader.pages)):
                writer.add_page(reader.pages[page_num])
            writer.write(output)
            return output.getvalue(), len(output.getvalue())

        if file:
            try:
                file_data = file.split(',')[1]
                file_content = base64.b64decode(file_data)
                file_size = len(file_content)

                max_size_mb = 5
                if file_size > max_size_mb * 1024 * 1024:
                    return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'}, status=400)

                file_type = get_file_type(file)

                if file_type in ['image/jpeg', 'image/png']:
                    image = Image.open(BytesIO(file_content))
                    if image.mode in ('RGBA', 'P'):
                        image = image.convert('RGB')
                    compressed_image_data, _ = compress_image(image)
                    return compressed_image_data

                elif file_type == 'application/pdf':
                    compressed_pdf_data, _ = compress_pdf(BytesIO(file_content))
                    return compressed_pdf_data

                else:
                    return JsonResponse({'warn': 'Unsupported file format'}, status=400)

            except Exception as e:
                return JsonResponse({'error': f'Error processing file: {str(e)}'}, status=500)

        return None
     
     
    if request.method == 'POST':
        try:
            # Ensure the request body is not empty
            if not request.body:
                return JsonResponse({'warn': 'Request body is empty'}, status=400)

            # Parse JSON body
            data = request.POST
            
            RegistrationId = data.get('RegistrationId')
            RelativeName = data.get('RelativeName', '')
            ReportDate = data.get('ReportDate', '')
            ReportHandovered = data.get('ReportHandoOvered', '')
            ReportTime = data.get('ReportTime', '')
            TechnicianName = data.get('TechnicianName', '')
            created_by = data.get('created_by', '')
            ChooseFileOne = data.get('ChooseFile', '')
            RegisterType = data.get('RegisterType')
            FavArr = data.get('FavArr', [])
            checkarr = data.get('checkarr', [])

            fav_arr_list = json.loads(FavArr)
            check_arr_list = json.loads(checkarr)

            processed_files = {
                'ChooseFileOne': validate_and_process_file(ChooseFileOne) if ChooseFileOne else None,
            }

            # Check if any file processing returned an error response
            if any(isinstance(value, JsonResponse) for value in processed_files.values()):
                return next(value for value in processed_files.values() if isinstance(value, JsonResponse))

            if not RegistrationId:
                return JsonResponse({'warn': 'Missing Registration Id'}, status=400)

            # Save Lab_ReportEntry_Details only once
            registration_instance = None
            if RegisterType == "OP":
                registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=RegistrationId).first()
            elif RegisterType == "IP":
                registration_instance = Patient_IP_Registration_Detials.objects.filter(pk=RegistrationId).first()
            elif RegisterType == "Casuality":
                registration_instance = Patient_Casuality_Registration_Detials.objects.filter(pk=RegistrationId).first()

            if not registration_instance:
                return JsonResponse({'warn': 'Invalid registration ID or RegisterType'}, status=400)

            lab_ins = Lab_ReportEntry_Details.objects.create(
                RegisterType=RegisterType,
                OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                report_date=ReportDate,
                report_time=ReportTime,
                report_file=processed_files['ChooseFileOne'],
                technician_name=TechnicianName,
                report_handovered_by=ReportHandovered,
                report_handovered_to=RelativeName,
                created_by=created_by
            )

            # Save PaidTest_Indivitaul instances
            paid_test_instances = []
            for item in check_arr_list:
                test_code_instance = LabTestName_Details.objects.filter(TestCode=item.get('TestCode')).first()
                if test_code_instance:
                    paid_test_instances.append(
                        PaidTest_Indivitaul(
                            Registration_Id=lab_ins,
                            test_type=item.get('TestType', 'Individual'),
                            testCode=test_code_instance,  # Use the instance here
                            value=item.get('Values', ''),
                            category_type=item.get('CategoryType', ''),
                            description=item.get('Description', ''),
                            status='Completed' if item.get('Values', '') else 'Pending'
                        )
                    )
            if paid_test_instances:
                PaidTest_Indivitaul.objects.bulk_create(paid_test_instances)

            # Save PaidTest_Favourites instances
            fav_test_instances = []
            last_fav_code = ''
            last_category_type = ''
            for item in fav_arr_list:
                if isinstance(item, dict):
                    fav_code = item.get('FavouriteCode', '')
                    catogory_type = item.get('CategoryType', '')
                    
                    # Retrieve or continue with the last favCode and categoryType
                    if fav_code:
                        fav_code_instance = TestName_Favourites.objects.filter(Favourite_Code=fav_code).first()
                        last_fav_code = fav_code_instance if fav_code_instance else last_fav_code
                    if catogory_type:
                        last_category_type = catogory_type

                    if item.get('TestCode'):
                        test_code_instance = LabTestName_Details.objects.filter(TestCode=item.get('TestCode')).first()
                        if test_code_instance and last_fav_code:
                            fav_test_instances.append(
                                PaidTest_Favourites(
                                    Registration_Id=lab_ins,
                                    favCode=last_fav_code,  # Use the instance of favCode
                                    test_type="Favourites",
                                    category_type=last_category_type,
                                    testCode=test_code_instance,  # Use the instance of testCode
                                    value=item.get('Values', ''),
                                    description=item.get('Description', ''),
                                    status='Completed' if item.get('Values', '') else 'Pending'
                                )
                            )

            if fav_test_instances:
                PaidTest_Favourites.objects.bulk_create(fav_test_instances)

            return JsonResponse({'success': 'Data saved successfully'}, status=200)

        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)

    return JsonResponse({'warn': 'Invalid request method'}, status=405)

    # if request.method == 'POST':
    #     try:
    #         # Ensure the request body is not empty
    #         if not request.body:
    #             return JsonResponse({'warn': 'Request body is empty'}, status=400)
            
    #         # Parse JSON body
    #         data = request.POST
            
    #         RegistrationId = data.get('RegistrationId')
    #         print(RegistrationId)
    #         RelativeName = data.get('RelativeName', '')
    #         ReportDate = data.get('ReportDate', '')
    #         ReportHandovered = data.get('ReportHandoOvered', '')
    #         ReportTime = data.get('ReportTime', '')
    #         TechnicianName = data.get('TechnicianName', '')
    #         created_by = data.get('created_by', '')
    #         ChooseFileOne = data.get('ChooseFile', '')
    #         RegisterType = data.get('RegisterType')
    #         FavArr = data.get('FavArr', [])
    #         checkarr = data.get('checkarr', [])
            
    #         fav_arr_list = json.loads(FavArr)
    #         check_arr_list = json.loads(checkarr)
            
    #         processed_files = {
    #             'ChooseFileOne': validate_and_process_file(ChooseFileOne) if ChooseFileOne else None,
    #         }

    #         # Check if any file processing returned an error response
    #         if any(isinstance(value, JsonResponse) for value in processed_files.values()):
    #             return next(value for value in processed_files.values() if isinstance(value, JsonResponse))

    #         if not RegistrationId:
    #             return JsonResponse({'warn': 'Missing Registration Id'}, status=400)


                

    #         # Save Lab_ReportEntry_Details only once
    #         registration_instance = None
    #         if RegisterType == "OP":
    #             registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=RegistrationId).first()
    #         elif RegisterType == "IP":
    #             registration_instance = Patient_IP_Registration_Detials.objects.filter(pk=RegistrationId).first()
    #         elif RegisterType == "Casuality":
    #             registration_instance = Patient_Casuality_Registration_Detials.objects.filter(pk=RegistrationId).first()

    #         if not registration_instance:
    #             return JsonResponse({'warn':'Invalid registration ID or RegisterType'})

                
    #         lab_ins = Lab_ReportEntry_Details.objects.create(
    #             RegisterType=RegisterType,
    #             OP_Register_Id=registration_instance if RegisterType == "OP" else None,
    #             IP_Register_Id=registration_instance if RegisterType == "IP" else None,
    #             Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
    #             report_date=ReportDate,
    #             report_time=ReportTime,
    #             report_file=processed_files['ChooseFileOne'],
    #             technician_name=TechnicianName,
    #             report_handovered_by=ReportHandovered,
    #             report_handovered_to=RelativeName,
    #             created_by=created_by
    #         )

    #         # Save PaidTest_Indivitaul instances
    #         paid_test_instances = [
    #             PaidTest_Indivitaul(
    #                 Registration_Id=lab_ins,
    #                 test_type=item.get('TestType', 'Individual'),
    #                 testCode=item.get('TestCode', ''),
    #                 value=item.get('Values', ''),
    #                 category_type=item.get('CategoryType', ''),
    #                 description=item.get('Description', ''),
    #                 status='Completed' if item.get('Values', '') else 'Pending'
    #             )
    #             for item in check_arr_list
    #         ]
    #         PaidTest_Indivitaul.objects.bulk_create(paid_test_instances)

    #         # Save PaidTest_Favourites instances
    #         fav_test_instances = []
    #         last_fav_code = ''
    #         last_catogory_type = ''
    #         for item in fav_arr_list:
    #             if isinstance(item, dict):
    #                 fav_code = item.get('FavouriteCode', '')
    #                 catogory_type = item.get('CategoryType', '')
    #                 if fav_code:
    #                     last_fav_code = fav_code
    #                 elif not fav_code and last_fav_code:
    #                     fav_code = last_fav_code
    #                 if catogory_type:
    #                     last_catogory_type = catogory_type
    #                 elif not catogory_type and last_catogory_type:
    #                     catogory_type = last_catogory_type

    #                 if item.get('TestCode') is not None:
    #                     fav_test_instances.append(
    #                         PaidTest_Favourites(
    #                             Registration_Id=lab_ins,
    #                             favCode=fav_code,
    #                             test_type="Favourites",
    #                             category_type=catogory_type,
    #                             testCode=item.get('TestCode', ''),
    #                             value=item.get('Values', ''),
    #                             description=item.get('Description', ''),
    #                             status='Completed' if item.get('Values', '') else 'Pending'
    #                         )
    #                     )

    #         if fav_test_instances:
    #             PaidTest_Favourites.objects.bulk_create(fav_test_instances)
          
    #         return JsonResponse({'success': 'Data saved successfully'}, status=200)


    #     except Exception as e:
    #         print("Exception:", e)
    #         return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    
    # return JsonResponse({'warn': 'Invalid request method'}, status=405)





@csrf_exempt
@require_http_methods(["GET"])
def lab_report_details_view(request):
    if request.method == 'GET':
        try:
            registration_id = request.GET.get('Register_Id')
            RegisterType = request.GET.get('RegisterType')
            if not registration_id:
                return JsonResponse({'warn': 'Missing registration Id'}, status=400)
            if not RegisterType:
                return JsonResponse({'warn': 'Missing RegisterType'}, status=400)

            lab_report = None
            if RegisterType == "OP":
                lab_report = Lab_ReportEntry_Details.objects.filter(OP_Register_Id_id=registration_id, RegisterType=RegisterType).last()
            elif RegisterType == "IP":
                lab_report = Lab_ReportEntry_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType).last()
            elif RegisterType == "Casuality":
                lab_report = Lab_ReportEntry_Details.objects.filter(Casuality_Register_Id_id=registration_id, RegisterType=RegisterType).last()

            if not lab_report:
                return JsonResponse({'warn': 'Lab report not found for the given Registration ID'}, status=404)

            def get_file_image(filedata):
                mime = magic.Magic(mime=True)
                contenttype = mime.from_buffer(filedata)
                
                if contenttype in ['application/pdf', 'image/jpeg', 'image/png']:
                    return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}'
                
                return f'data:application/octet-stream;base64,{base64.b64encode(filedata).decode("utf-8")}'

            # Initialize response data
            response_data = {
                'lab_report_entry': {
                    'report_id': lab_report.report_id,
                    'registrationid': lab_report.OP_Register_Id.id if RegisterType == "OP" else 
                                      lab_report.IP_Register_Id.Registration_Id if RegisterType == "IP" else
                                      lab_report.Casuality_Register_Id.id,
                    'report_date': lab_report.report_date,
                    'report_time': lab_report.report_time,
                    'reportfile': get_file_image(lab_report.report_file) if lab_report.report_file else None,
                    'technician_name': lab_report.technician_name,
                    'report_handovered_by': lab_report.report_handovered_by,
                    'report_handovered_to': lab_report.report_handovered_to,
                    'created_by': lab_report.created_by,
                    'status': lab_report.status
                },
                'individual_tests': [],
                'favourite_tests': []
            }

            # Get individual tests linked to this lab report
            individual_tests = PaidTest_Indivitaul.objects.filter(Registration_Id=lab_report)
            for index, test in enumerate(individual_tests, start=1):
                test_name_obj = LabTestName_Details.objects.filter(TestCode=test.testCode).first()
                test_name = test_name_obj.Test_Name if test_name_obj else 'Unknown Test'
                
                response_data['individual_tests'].append({
                    'id': index,
                    'testCode': test.testCode,
                    'test_type': test.test_type,
                    'test_name': test_name,
                    'value': test.value,
                    'category_type': test.category_type,
                    'description': test.description,
                    'status': test.status
                })

            # Get favourite tests linked to this lab report
            favourite_tests = PaidTest_Favourites.objects.filter(Registration_Id=lab_report)
            for ind, fav_test in enumerate(favourite_tests, start=1):
                fav_details = TestName_Favourites.objects.filter(Favourite_Code=fav_test.favCode).first()
                if fav_details:
                    favourite_name = fav_details.FavouriteName
                    test_names = fav_details.TestName.all()

                    fav_test_name_obj = test_names.filter(TestCode=fav_test.testCode).first()
                    fav_test_name = fav_test_name_obj.Test_Name if fav_test_name_obj else 'Unknown Test'
                    
                    response_data['favourite_tests'].append({
                        'id': ind,
                        'favCode': fav_test.favCode,
                        'favouriteName': favourite_name,
                        'test_type': fav_test.test_type,
                        'testCode': fav_test.testCode,
                        'value': fav_test.value,
                        'category_type': fav_test.category_type,
                        'description': fav_test.description,
                        'status': fav_test.status,
                        'testName': fav_test_name
                    })

            return JsonResponse(response_data, status=200)
            
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
 


# import schedule
# import time

# def job():
#     print("I'm working...")

# # Call the job function directly
# job()

# schedule.every(1).minutes.do(job)
# # schedule.every().hour.do(job)
# # schedule.every().day.at("10:30").do(job)
# # schedule.every().monday.do(job)
# # schedule.every().wednesday.at("13:15").do(job)

# while True:
#     schedule.run_pending()
#     time.sleep(1)







@csrf_exempt
@require_http_methods(["GET"])
def OtRequest_Details(request):
    try:
        DoctorId = request.GET.get("DoctorId", None)
        Speciality = request.GET.get("Specialization", None)

        if not DoctorId or not Speciality:
            return JsonResponse({'warn': 'DoctorId and Specialization missing'})

        # Fetch doctor details
        doctor = Doctor_Personal_Form_Detials.objects.get(pk=DoctorId)

        # Fetch speciality details
        speciality = Speciality_Detials.objects.get(pk=Speciality)

        # Construct the full name of the doctor
        doctor_name = f"{doctor.Tittle} {doctor.First_Name} {doctor.Middle_Name} {doctor.Last_Name}".strip()

        return JsonResponse({
            'DoctorName': doctor_name,
            'SpecialityName': speciality.Speciality_Name
        })

    except Doctor_Personal_Form_Detials.DoesNotExist:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
    except Speciality_Detials.DoesNotExist:
        return JsonResponse({'error': 'Specialization not found'}, status=404)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'Internal Server Error'},status=500)




@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Radiology_Request_Detailslink(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract data from the request
            Radiology_queue_id = data.get('RadiologyTestId', '')
            Testname_arr = data.get('SubtestNoArr', [])
            SubTestname_arr = data.get('CheckedTestNameArr', [])
            created_by = data.get('created_by', '')
            RegisterType = data.get('RegisterType',None)
            registration_id = data.get('Register_Id', None)
            print(registration_id)
            
            if registration_id is None or RegisterType is None:
                return JsonResponse({'warn': 'Missing registration ID or RegisterType'})
             # Determine the correct registration model and fetch the instance
            registration_instance = None
            if RegisterType == "OP":
                registration_instance = Patient_Appointment_Registration_Detials.objects.filter(pk=registration_id).first()
            elif RegisterType == "IP":
                registration_instance = Patient_IP_Registration_Detials.objects.filter(Registration_Id=registration_id).first()
            elif RegisterType == "Casuality":
                registration_instance = Patient_Casuality_Registration_Detials.objects.filter(pk=registration_id).first()
            
            # Process IsSubTest No Tests
            for testname in Testname_arr:
                test_Type = testname.get('SubTestType', "No")
                Radiologyid = testname.get('Radiologyid', None)
                TestCode = testname.get('TestCode', None)
                
                if Radiologyid and TestCode:  # Ensure required fields are present
                    Radiology_Request_Details.objects.create(
                        RegisterType = RegisterType,
                        OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                        IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                        Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                        IsSubTest=test_Type,
                        TestCode=Radiologyid,
                        SubTestCode=TestCode,
                        created_by=created_by
                    )
            
            # Process IsSubTest Yes Tests
            for subtest in SubTestname_arr:
                test_Type = subtest.get('SubTestType', "Yes")
                TestCode = subtest.get('TestCode', '')
                SubTest_Code = subtest.get('SubTest_Code', '')
                
                if TestCode and SubTest_Code:  # Ensure required fields are present
                    Radiology_Request_Details.objects.create(
                        RegisterType = RegisterType,
                        OP_Register_Id=registration_instance if RegisterType == "OP" else None,
                        IP_Register_Id=registration_instance if RegisterType == "IP" else None,
                        Casuality_Register_Id=registration_instance if RegisterType == "Casuality" else None,
                        IsSubTest=test_Type,
                        TestCode=TestCode,
                        SubTestCode=SubTest_Code,
                        created_by=created_by
                    )
        
            return JsonResponse({'success': 'Data Saved successfully'}, status=200)
        
        except Exception as e:
            print("Exception:", e)
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('Register_Id', None)
            RegisterType = request.GET.get('RegisterType', None)
            
            if registration_id is None or RegisterType is None:
                return JsonResponse({'warn': 'Missing Registration Id or RegisterType'}, status=400)
            
            # Fetch registration details based on RegisterType
            if RegisterType == "OP":
                registration_details = Patient_Appointment_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
                radiology_requests = Radiology_Request_Details.objects.filter(OP_Register_Id_id=registration_id, RegisterType=RegisterType)
            elif RegisterType == "IP":
                registration_details = Patient_IP_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(Registration_Id=registration_id)
                radiology_requests = Radiology_Request_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType)
            elif RegisterType == "Casuality":
                registration_details = Patient_Casuality_Registration_Detials.objects.select_related('PatientId', 'PrimaryDoctor').get(pk=registration_id)
                radiology_requests = Radiology_Request_Details.objects.filter(Casuality_Register_Id_id=registration_id, RegisterType=RegisterType)
            else:
                return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)
            
            # Extract patient and doctor details
            patient_id = registration_details.PatientId.PatientId
            patient_name = f"{registration_details.PatientId.FirstName} {registration_details.PatientId.MiddleName} {registration_details.PatientId.SurName}"
            phone_number = registration_details.PatientId.PhoneNo
            doctor_id = registration_details.PrimaryDoctor.Doctor_ID if registration_details.PrimaryDoctor else None
            doctor_name = f"{registration_details.PrimaryDoctor.First_Name} {registration_details.PrimaryDoctor.Last_Name}" if registration_details.PrimaryDoctor else None
            doctor_shortname = registration_details.PrimaryDoctor.ShortName if registration_details.PrimaryDoctor else None
            
            if RegisterType == "OP":
                radiology_requests = Radiology_Request_Details.objects.filter(OP_Register_Id=registration_id, RegisterType=RegisterType, Status='Request')
            elif RegisterType == "IP":
                radiology_requests = Radiology_Request_Details.objects.filter(IP_Register_Id=registration_id, RegisterType=RegisterType, Status='Request')
            elif RegisterType == "Casuality":
                radiology_requests = Radiology_Request_Details.objects.filter(Casuality_Register_Id=registration_id, RegisterType=RegisterType, Status='Request')
                

            
            response_data_yes = []
            response_data_no = []
            index = 1
            indexx = 1
            
            for req in radiology_requests:
                if req.IsSubTest == "No":
                    # Fetch related TestName_Details and RadiologyNames_Details
                    testname = TestName_Details.objects.filter(Test_Code=req.SubTestCode).first()
                    radiologyname = RadiologyNames_Details.objects.filter(Radiology_Id=req.TestCode).first()
                    
                    if radiologyname and testname:
                        response_data_no.append({
                            'id': index,
                            'PatientId': patient_id,
                            'Radiology_RequestId': req.Radiology_RequestId, 
                            'PatientName': patient_name,
                            'PhoneNumber': phone_number,
                            'DoctorId': doctor_id,
                            'DoctorName': doctor_name,
                            'DoctorShortName': doctor_shortname,
                            'IsSubTest': req.IsSubTest,
                            'Radiologyid': radiologyname.Radiology_Id,
                            'RadiologyName': radiologyname.Radiology_Name,
                            'TestCode': testname.Test_Code,
                            'TestName': testname.Test_Name,
                            'SubTestCode': req.SubTestCode,
                            'Amount': testname.Amount,
                        })
                        index += 1
                
                elif req.IsSubTest == "Yes":
                    # Fetch related TestName_Details and SubTest_Details
                    testname = TestName_Details.objects.filter(Test_Code=req.TestCode).first()
                    subtestname = SubTest_Details.objects.filter(SubTest_Code=req.SubTestCode).first()
                    
                    if testname and subtestname:
                        # Fetch the RadiologyNames_Details using TestName_Details' Radiology_Id
                        radiologyname = testname.Radiology_Id  # Access the foreign key related object
                        
                        response_data_yes.append({
                            'id': indexx,
                            'PatientId': patient_id,
                            'Radiology_RequestId': req.Radiology_RequestId, 
                            'PatientName': patient_name,
                            'PhoneNumber': phone_number,
                            'DoctorId': doctor_id,
                            'DoctorName': doctor_name,
                            'DoctorShortName': doctor_shortname,
                            'IsSubTest': req.IsSubTest,
                            'Radiologyid': radiologyname.Radiology_Id,
                            'RadiologyName': radiologyname.Radiology_Name,
                            'TestCode': testname.Test_Code,
                            'TestName': testname.Test_Name,
                            'SubTestCode': subtestname.SubTest_Code,
                            'SubTestName': subtestname.SubTestName,
                            'Amount': subtestname.Amount,
                        })
                    
                        indexx += 1
            
            # Return both lists in the response
            return JsonResponse({
                'IsSubTestYes': response_data_yes,
                'IsSubTestNo': response_data_no
            }, safe=False)
                    
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

        return JsonResponse({'error': 'Method not allowed'}, status=405)

