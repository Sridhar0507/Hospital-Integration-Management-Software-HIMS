from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_BedsoreManagement_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            Site = data.get("Site")
            LocationLR = data.get('LocationLR')
            Area = data.get('Area')
            Dressing = data.get('Dressing')
            Condition = data.get('Condition')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            # Save Bedsorea details
            Bedsore_instance = IP_BedsoreManagement_Details(
                Registration_Id=registration_ins,
                Site=Site,
                LocationLR=LocationLR,
                Area=Area,
                Dressing=Dressing,
                Condition=Condition,
                Remarks=Remarks,
                Created_by=createdby,
            )
            Bedsore_instance.save()
            
            return JsonResponse({'success': 'Bedsore details saved successfully'})
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
            
            # Fetch Bedsorea details based on RegistrationId
            Bedsore_details = IP_BedsoreManagement_Details.objects.filter(Registration_Id__pk=RegistrationId)
            if not Bedsore_details.exists():
                return JsonResponse({'error': 'No Bedsorea details found for the given RegistrationId'}, status=404)
            
            # Serialize data
            Bedsore_details_data = []
            for idx, Bedsorea in enumerate(Bedsore_details, start=1):
                Bedsorea_dict = {
                    'id': idx,
                    'RegistrationId': Bedsorea.Registration_Id.pk,
                    'VisitId': Bedsorea.Registration_Id.VisitId,
                    'PrimaryDoctorId': Bedsorea.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Bedsorea.Registration_Id.PrimaryDoctor.ShortName,
                    'Site': Bedsorea.Site,
                    'LocationLR': Bedsorea.LocationLR,
                    'Area': Bedsorea.Area,
                    'Dressing': Bedsorea.Dressing,
                    'Condition': Bedsorea.Condition,
                    'Remarks': Bedsorea.Remarks,
                    'CurrDate': Bedsorea.created_at.strftime('%d-%m-%y'),
                    'CurrTime': Bedsorea.created_at.strftime('%H:%M:%S'),
                    'Createdby': Bedsorea.Created_by,
                }
                Bedsore_details_data.append(Bedsorea_dict)

            return JsonResponse(Bedsore_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





