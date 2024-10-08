from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from PIL import Image
import magic
import base64



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_GeneralEvaluation_Details(request):

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
            
            # Extract and validate data
            cheifComplaint = data.get('cheifComplaint','')
            History = data.get('History','')
            Examine = data.get('Examine','')
            Diagnosis = data.get('Diagnosis','')
            ChooseDocument = data.get('ChooseDocument', None)
           
            created_by = data.get('created_by', '')
            registration_id = data.get('RegistrationId', '')

            processedChooseDocument = validate_and_process_file(ChooseDocument) if ChooseDocument  else None

            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            GeneralEvaluation_instance = Workbench_GeneralEvaluation(
                Registration_Id=registration_ins,
                CheifComplaint=cheifComplaint,
                History=History,
                Examine=Examine,
                Diagnosis=Diagnosis,
                ChooseDocument=processedChooseDocument,
                created_by=created_by
            )
            GeneralEvaluation_instance.save()
            return JsonResponse({'success': 'GeneralEvaluation Details added successfully'})
       
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
            
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)
            
            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Fetch all records from the Location_Detials model
            GeneralEvaluation = Workbench_GeneralEvaluation.objects.filter(Registration_Id=registration_ins)
            
            # Construct a list of dictionaries containing location data
            GeneralEvaluation_data = [
                {
                    'id': GeneralEvaluation.Id,
                    'RegistrationId': GeneralEvaluation.Registration_Id.pk,
                    'VisitId': GeneralEvaluation.Registration_Id.VisitId,
                    'PrimaryDoctorId': GeneralEvaluation.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': GeneralEvaluation.Registration_Id.PrimaryDoctor.ShortName,
                    'cheifComplaint': GeneralEvaluation.CheifComplaint,
                    'History': GeneralEvaluation.History,
                    'Examine': GeneralEvaluation.Examine,
                    'Diagnosis': GeneralEvaluation.Diagnosis,
                    'ChooseDocument': get_file_image(GeneralEvaluation.ChooseDocument) if GeneralEvaluation.ChooseDocument else None,
                    'created_by': GeneralEvaluation.created_by,
                    'Date' : GeneralEvaluation.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time' : GeneralEvaluation.created_at.strftime('%H:%M:%S') , # Format time
                } for GeneralEvaluation in GeneralEvaluation
            ]
            print(GeneralEvaluation_data,'GeneralEvaluation_data')
            return JsonResponse(GeneralEvaluation_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)