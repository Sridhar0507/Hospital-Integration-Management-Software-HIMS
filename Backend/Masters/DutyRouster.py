from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json

@csrf_exempt
@require_http_methods(['POST','OPTION','GET'])
def Duty_rouster_master_link(request):
    if request.method == "POST" :
        try:
            data = json.loads(request.body)
            Duty_rouster_id = data.get("DutyRousterId")
            location = data.get("Location")
            shift_name = data.get('ShiftName')
            shift_start_time = data.get('ShiftStartTime')
            shift_end_time = data.get('ShiftEndTime')
            
            location_instance = Location_Detials.objects.get(Location_Id=location)
            
            if DutyRousterMaster.objects.filter(Location=location_instance, ShiftName=shift_name).exclude(pk = Duty_rouster_id).exists():
                return JsonResponse({'warn': "Shift name already exists for this location."})
            
            if Duty_rouster_id:
                duty_rouster_instance = DutyRousterMaster.objects.get(pk = Duty_rouster_id)
                duty_rouster_instance.Location = location_instance
                duty_rouster_instance.ShiftName = shift_name
                duty_rouster_instance.ShiftStartTime = shift_start_time
                duty_rouster_instance.ShiftEndTime = shift_end_time
                duty_rouster_instance.save()
                return JsonResponse({'success' : "Duty Rouster details updated succesfully"})
            
            else:
                DutyRousterMaster.objects.create(
                    Location = location_instance,
                    ShiftName = shift_name,
                    ShiftStartTime = shift_start_time,
                    ShiftEndTime = shift_end_time,
                )
                return JsonResponse({"success": "Duty Rouster details added succesfully"})
        except Exception as e :
            return JsonResponse({'error': str(e)})
    elif request.method == "GET":
        try:
            duty_rouster_instance = DutyRousterMaster.objects.all()
            duty_rouster_data = []
            ind =0
            for duty in duty_rouster_instance: 
                # location_instance = Location_Detials.objects
                duty_rouster = {
                    'indx' : ind +1,
                    'id' : duty.pk,
                    'Location' : duty.Location.Location_Name,
                    'ShiftName' : duty.ShiftName,
                    'ShiftStartTime' : duty.ShiftStartTime,
                    'ShiftEndTime' : duty.ShiftEndTime,
                }
                duty_rouster_data.append(duty_rouster)
                ind += 1
            return JsonResponse(duty_rouster_data, safe =False)
        except Exception as e:
            return JsonResponse({"error": str(e)})