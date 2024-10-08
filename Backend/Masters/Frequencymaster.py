from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json



@csrf_exempt
@require_http_methods(['POST', 'OPTIONS', 'GET'])
def insert_frequency_masters(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            FrequencyId = data.get('Frequency_Id')
            FrequencyType = data.get('FrequencyType')
            Frequency = data.get('Frequency')
            FrequencyTime = data.get('FrequencyTime')
            FrequencyName = data.get('FrequencyName')
            Status = data.get('Status')
            location_id = data.get("Location")

            location_instance = Location_Detials.objects.get(Location_Id=location_id)

            if FrequencyId:
                # Update existing Frequency_Master_Drug
                Frequency_instance = Frequency_Master_Drug.objects.get(pk=FrequencyId)
                Frequency_instance.FrequencyType = FrequencyType
                Frequency_instance.Frequency = Frequency
                Frequency_instance.FrequencyTime = FrequencyTime
                Frequency_instance.Status = Status
                # Frequency_instance.Location = location_instance
                Frequency_instance.FrequencyName = FrequencyName

                Frequency_instance.save()
                return JsonResponse({'success': "Frequency Master details updated successfully"})
            else:
                # Create new Frequency_Master_Drug
                Frequency_Master_Drug.objects.create(
                    # Location=location_instance,
                    FrequencyType=FrequencyType,
                    Frequency=Frequency,
                    FrequencyTime=FrequencyTime,
                    FrequencyName =FrequencyName,
                    Status=Status
                )
                return JsonResponse({'success': "Frequency Master details created successfully"})
        except Location_Detials.DoesNotExist:
            return JsonResponse({'error': "Location not found"}, status=400)
        except Frequency_Master_Drug.DoesNotExist:
            return JsonResponse({'error': "Frequency Master not found for update"}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    elif request.method == "GET":
        try:
            print('-----')
            Frequency_instance = Frequency_Master_Drug.objects.all()
            print('-----',len(Frequency_instance))
            
            Frequency_data = []
            for ind, Frequency in enumerate(Frequency_instance):
                frequeny = {
                    'indx': ind + 1,
                    'Frequency_Id': Frequency.pk,
                    'FrequencyName': Frequency.FrequencyName,
                    'FrequencyType': Frequency.FrequencyType,
                    'Frequency': Frequency.Frequency,
                    'FrequencyTime': Frequency.FrequencyTime,
                    'Status': Frequency.Status,
                }
                Frequency_data.append(frequeny)
            print('0-0-0-0-')
            return JsonResponse(Frequency_data, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        