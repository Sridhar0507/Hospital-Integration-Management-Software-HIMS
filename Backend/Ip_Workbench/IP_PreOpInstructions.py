from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import base64
from dateutil import parser  # Import dateutil.parser
import magic
from .models import *

@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_PreOpInstructions_Details_Link(request):
    if request.method == 'POST':
        try:
            # Parse form data from the request
            data = request.POST

            # Extract and validate data
            RegistrationId = data.get('RegistrationId')
            Date = data.get('Date', '')
            Time = data.get('Time', '')
            ScalpHair = data.get('ScalpHair', '')
            Nails = data.get('Nails', '')
            Givemouth = data.get('Givemouth', '')
            Vaginal = data.get('Vaginal', '')
            Bowel = data.get('Bowel', '')
            Enema = data.get('Enema', '')
            secTextArea = data.get('secTextArea', '')
            SixTextArea = data.get('SixTextArea', '')
            SevenTextArea = data.get('SevenTextArea', '')
            ThirdTextArea = data.get('ThirdTextArea', '')
            DutySisterName = data.get('DutySisterName', '')
            nilOrallyAfter = data.get('nilOrallyAfter', '')
            ivDripAt = data.get('ivDripAt', '')
            ivSiteList = data.get('ivSiteList', '')
            urinaryCatheter = data.get('urinaryCatheter', '')
            nasogastricTube = data.get('nasogastricTube', '')
            IVlocation = data.get('location', '')
            CreatedBy = data.get('Createdby', '')
            DepartmentType = data.get("DepartmentType")
            
            registration_ins_ip = None
            registration_ins_casuality = None

            # Handle base64 encoded image data
            AnnotatedImage = data.get('AnnotatedImage', '')

            annotated_image_data = base64.b64decode(AnnotatedImage) if AnnotatedImage else None

            # Parse and format date
            try:
                parsed_date = parser.parse(Date, dayfirst=True)
                formatted_date = parsed_date.strftime('%Y-%m-%d')
            except (ValueError, TypeError):
                formatted_date = Date  # Use the original date if parsing fails

            # Retrieve the Registration instance
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
            
            print(RegistrationId,'RegistrationId')
            # Create a new PreOpChecklist instance
            PreOpChecklist_instance = IP_PreOpInstructions_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                Date=formatted_date,
                Time=Time,
                AnnotatedImage=annotated_image_data,
                ScalpHair=ScalpHair,
                Nails=Nails,
                Givemouth=Givemouth,
                Vaginal=Vaginal,
                Bowel=Bowel,
                Enema=Enema,
                secTextArea=secTextArea,
                urinaryCatheter=urinaryCatheter,
                nasogastricTube=nasogastricTube,
                ThirdTextArea=ThirdTextArea,
                SixTextArea=SixTextArea,
                SevenTextArea=SevenTextArea,
                nilOrallyAfter=nilOrallyAfter,
                ivDripAt=ivDripAt,
                ivSiteList=ivSiteList,
                ivLocation=IVlocation,
                DutySisterName=DutySisterName,
                Created_by=CreatedBy,
            )
            PreOpChecklist_instance.save()

            return JsonResponse({'success': 'PreOpChecklist added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')
            if not Ip_Registration_Id and not DepartmentType:
                return JsonResponse({'error': 'both Ip_Registration_Id and DepartmentType is required'})

            if DepartmentType=='IP':
                PreOpChecklistData = IP_PreOpInstructions_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                PreOpChecklistData = IP_PreOpInstructions_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            

            def get_file_image(filedata):
                if filedata:
                    mime = magic.Magic(mime=True)
                    contenttype = mime.from_buffer(filedata)
                    return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}'
                return None

            PreOp_data = [
                {
                    'id': idx,
                    'RegistrationId': PreOpCh.Ip_Registration_Id.pk if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.pk,
                    'VisitId': PreOpCh.Ip_Registration_Id.VisitId if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': PreOpCh.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': PreOpCh.Ip_Registration_Id.PrimaryDoctor.ShortName if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': PreOpCh.DepartmentType,
                    'Date': PreOpCh.Date,
                    'Time': PreOpCh.Time,
                    'AnnotatedImage': get_file_image(PreOpCh.AnnotatedImage) if PreOpCh.AnnotatedImage else None,
                    'ScalpHair': PreOpCh.ScalpHair,
                    'Nails': PreOpCh.Nails,
                    'Givemouth': PreOpCh.Givemouth,
                    'Vaginal': PreOpCh.Vaginal,
                    'Bowel': PreOpCh.Bowel,
                    'Enema': PreOpCh.Enema,
                    'secTextArea': PreOpCh.secTextArea,
                    'urinaryCatheter': PreOpCh.urinaryCatheter,
                    'nasogastricTube': PreOpCh.nasogastricTube,
                    'ThirdTextArea': PreOpCh.ThirdTextArea,
                    'nilOrallyAfter': PreOpCh.nilOrallyAfter,
                    'ivDripAt': PreOpCh.ivDripAt,
                    'ivSiteList': PreOpCh.ivSiteList,
                    'location': PreOpCh.ivLocation,
                    'SixTextArea': PreOpCh.SixTextArea,
                    'SevenTextArea': PreOpCh.SevenTextArea,
                    'DutySisterName': PreOpCh.DutySisterName,
                    'Createdby': PreOpCh.Created_by,
                }
                for idx, PreOpCh in enumerate(PreOpChecklistData, start=1)
            ]

            return JsonResponse(PreOp_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)








