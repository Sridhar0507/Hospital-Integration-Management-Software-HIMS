from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_SurgicalSite_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            Skin = data.get("Skin")
            Wound = data.get('Wound')
            Dressing = data.get('Dressing')
            SurgicalSiteInfection = data.get('SurgicalSiteInfection')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            # Save SurgicalSite details
            Dama_instance = IP_SurgicalSite_Details(
                Registration_Id=registration_ins,
                Skin=Skin,
                Wound=Wound,
                Dressing=Dressing,
                SurgicalSiteInfection=SurgicalSiteInfection,
                Remarks=Remarks,
                Created_by=createdby,
            )
            Dama_instance.save()
            
            return JsonResponse({'success': 'SurgicalSite details saved successfully'})
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
            
            # Fetch SurgicalSite details based on RegistrationId
            SurgicalSite_details = IP_SurgicalSite_Details.objects.filter(Registration_Id__pk=RegistrationId)
            if not SurgicalSite_details.exists():
                return JsonResponse({'error': 'No SurgicalSite details found for the given RegistrationId'}, status=404)
            
            # Serialize data
            SurgicalSite_details_data = []
            for idx, SurgicalSite in enumerate(SurgicalSite_details, start=1):
                SurgicalSite_dict = {
                    'id': idx,
                    'RegistrationId': SurgicalSite.Registration_Id.pk,
                    'VisitId': SurgicalSite.Registration_Id.VisitId,
                    'PrimaryDoctorId': SurgicalSite.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': SurgicalSite.Registration_Id.PrimaryDoctor.ShortName,
                    'Skin': SurgicalSite.Skin,
                    'Wound': SurgicalSite.Wound,
                    'Dressing': SurgicalSite.Dressing,
                    'SurgicalSiteInfection': SurgicalSite.SurgicalSiteInfection,
                    'Remarks': SurgicalSite.Remarks,
                    'CurrDate': SurgicalSite.created_at.strftime('%d-%m-%y'),
                    'CurrTime': SurgicalSite.created_at.strftime('%H:%M:%S'),
                    'Createdby': SurgicalSite.Created_by,
                }
                SurgicalSite_details_data.append(SurgicalSite_dict)

            return JsonResponse(SurgicalSite_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





