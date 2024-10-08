from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import base64
from dateutil import parser  # Import dateutil.parser
import magic
from .models import *
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from PIL import Image


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_ConsentForm_Details_Link(request):
   
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
            file_data = file.split(',')[1] if ',' in file else file
            file_content = base64.b64decode(file_data)
            file_size = len(file_content)
            max_size_mb = 5

            if file_size > max_size_mb * 1024 * 1024:
                return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'})

            file_type = get_file_type(file)

            if file_type in ['image/jpeg', 'image/png']:
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

            RegistrationId = data.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            Date = data.get('Date', '')
            Time = data.get('Time', '')
            Department = data.get('Department', '')
            ConsentFormName = data.get('ConsentFormName', '')
            ChkBox = data.get('ChkBox', '')
            SisterName = data.get('SisterName', '')
            CreatedBy = data.get('Createdby', '')
            ChooseDocument = data.get('ChooseDocument', None)
            DepartmentType = data.get("DepartmentType")

            registration_ins_ip = None
            registration_ins_casuality = None

            processedChooseDocument = validate_and_process_file(ChooseDocument) if ChooseDocument  else None

            if RegistrationId:
                # Try to get from IP Registration first
                try:
                    registration_ins_ip = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
                    print("Found in IP Registration")
                except Patient_IP_Registration_Detials.DoesNotExist:
                    print("Not found in IP Registration, trying Casuality Registration")
                    try:
                        registration_ins_casuality = Patient_Casuality_Registration_Detials.objects.get(pk=RegistrationId)
                        print("Found in Casuality Registration")
                    except Patient_Casuality_Registration_Detials.DoesNotExist:
                        return JsonResponse({'error': 'No registration found for the given RegistrationId'})

            else:
                return JsonResponse({'error': 'RegistrationId is required'})

            ConsernForm_instance = IP_ConsernForms_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                Date=Date,
                Time=Time,
                ChooseDocument=processedChooseDocument,
                Department=Department,
                ConsernFormName=ConsentFormName,
                ChkBox=ChkBox,
                SisterName=SisterName,
                DepartmentType=DepartmentType,
                Created_by=CreatedBy,
            )
            ConsernForm_instance.save()

            return JsonResponse({'success': 'ConsentForm added successfully'})

        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Registration not found'}, status=404)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:

            def get_file_image(filedata):
                mime = magic.Magic()
                contenttype = mime.from_buffer(filedata).split(',')[0]
                contenttype1 = 'application/pdf'
                if contenttype == 'application/pdf':
                    contenttype1 = 'application/pdf'
                elif contenttype == 'JPEG image data':
                    contenttype1 = 'image/jpeg'
                elif contenttype == 'PNG image data':
                    contenttype1 = 'image/png'

                return f'data:{contenttype1};base64,{base64.b64encode(filedata).decode("utf-8")}'
            
            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')
            if not Ip_Registration_Id and not DepartmentType:
                return JsonResponse({'error': 'both Ip_Registration_Id and DepartmentType is required'})

            if DepartmentType=='IP':
                ConsentFormData = IP_ConsernForms_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                ConsentFormData = IP_ConsernForms_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            

            
            Consent_data = [
                {
                    'id': idx,
                    'RegistrationId': Consent.Ip_Registration_Id.pk if Consent.Ip_Registration_Id else Consent.Casuality_Registration_Id.pk,
                    'VisitId': Consent.Ip_Registration_Id.VisitId if Consent.Ip_Registration_Id else Consent.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Consent.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Consent.Ip_Registration_Id else Consent.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Consent.Ip_Registration_Id.PrimaryDoctor.ShortName if Consent.Ip_Registration_Id else Consent.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': Consent.DepartmentType,
                    'Date': Consent.Date,
                    'Time': Consent.Time,
                    'ChooseDocument': get_file_image(Consent.ChooseDocument) if Consent.ChooseDocument else None,
                    'Department': Consent.Department,
                    'ConsentFormName': Consent.ConsernFormName,
                    'ChkBox': Consent.ChkBox,
                    'SisterName': Consent.SisterName,
                    'Createdby': Consent.Created_by,
                }
                for idx, Consent in enumerate(ConsentFormData, start=1)
            ]

            return JsonResponse(Consent_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)





# @csrf_exempt
# @require_http_methods(['POST', 'GET'])
# def IP_ConsentForm_Details_Link(request):
    
   
    
#     if request.method == 'POST':
#         try:
#             data = request.POST

#             RegistrationId = data.get('RegistrationId')
#             Date = data.get('Date', '')
#             Time = data.get('Time', '')
#             Department = data.get('Department', '')
#             ConsentFormName = data.get('ConsentFormName', '')
#             ChkBox = data.get('ChkBox', '')
#             SisterName = data.get('SisterName', '')
#             CreatedBy = data.get('Createdby', '')
#             ChooseDocument = data.get('ChooseDocument', '')

#             if RegistrationId:
#                 registration_instance = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
#             else:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             # Decode the base64 file data if it exists
#             if ChooseDocument:
#                 ChooseDocument = base64.b64decode(ChooseDocument)
#             else:
#                 ChooseDocument = None

#             # Create a new ConsentForm instance
#             ConsernForm_instance = IP_ConsernForms_Details(
#                 Registration_Id=registration_instance,
#                 Date=Date,
#                 Time=Time,
#                 ChooseDocument=ChooseDocument,
#                 Department=Department,
#                 ConsernFormName=ConsentFormName,
#                 ChkBox=ChkBox,
#                 SisterName=SisterName,
#                 Created_by=CreatedBy,
#             )
#             ConsernForm_instance.save()

#             return JsonResponse({'success': 'ConsentForm added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             RegistrationId = request.GET.get('RegistrationId')

#             if not RegistrationId:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             ConsentFormData = IP_ConsernForms_Details.objects.filter(Registration_Id__pk=RegistrationId)

#             def get_file_image(filedata):
#                 if filedata:
#                     mime = magic.Magic(mime=True)
#                     contenttype = mime.from_buffer(filedata)
#                     return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}'
#                 return None

#             Consent_data = [
#                 {
#                     'id': idx,
#                     'RegistrationId': Consent.Registration_Id.pk,
#                     'VisitId': Consent.Registration_Id.VisitId,
#                     'PrimaryDoctorId': Consent.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': Consent.Registration_Id.PrimaryDoctor.ShortName,
#                     'Date': Consent.Date,
#                     'Time': Consent.Time,
#                     'ChooseDocument': get_file_image(Consent.ChooseDocument) if Consent.ChooseDocument else None,
#                     'Department': Consent.Department,
#                     'ConsentFormName': Consent.ConsernFormName,
#                     'ChkBox': Consent.ChkBox,
#                     'SisterName': Consent.SisterName,
#                     'Createdby': Consent.Created_by,
#                 }
#                 for idx, Consent in enumerate(ConsentFormData, start=1)
#             ]

#             return JsonResponse(Consent_data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)

