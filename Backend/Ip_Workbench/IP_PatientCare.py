from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_PatientCare_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            PatientCareParameter = data.get("PatientCareParameter")
            Time = data.get('Time')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            # Save PatientCare details
            PatientCare_instance = IP_PatientCare_Details(
                Registration_Id=registration_ins,
                PatientCareParameter=PatientCareParameter,
                Time=Time,
                Remarks=Remarks,
                Created_by=createdby,
            )
            PatientCare_instance.save()
            
            return JsonResponse({'success': 'PatientCare details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            # Fetch PatientCare details based on RegistrationId
            PatientCare_details = IP_PatientCare_Details.objects.filter(Registration_Id__pk=RegistrationId)
            if not PatientCare_details.exists():
                return JsonResponse({'error': 'No PatientCare details found for the given RegistrationId'}, status=404)
            
            # Serialize data
            PatientCare_details_data = []
            for idx, PatientCare in enumerate(PatientCare_details, start=1):
                PatientCare_dict = {
                    'id': idx,
                    'RegistrationId': PatientCare.Registration_Id.pk,
                    'VisitId': PatientCare.Registration_Id.VisitId,
                    'PrimaryDoctorId': PatientCare.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': PatientCare.Registration_Id.PrimaryDoctor.ShortName,
                    'PatientCareParameter': PatientCare.PatientCareParameter,
                    'Time': PatientCare.Time,
                    'Remarks': PatientCare.Remarks,
                    'CurrDate': PatientCare.created_at.strftime('%d-%m-%y'),
                    'CurrTime': PatientCare.created_at.strftime('%H:%M:%S'),
                    'Createdby': PatientCare.Created_by,
                }
                PatientCare_details_data.append(PatientCare_dict)

            return JsonResponse(PatientCare_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





