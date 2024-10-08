from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_Ventilator_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            Mode = data.get("Mode")
            BreathsPerMin = data.get('BreathsPerMin')
            PressSupport = data.get('PressSupport')
            PeakPress = data.get('PeakPress')
            Peep = data.get('Peep')
            MeanPress = data.get('MeanPress')
            Mv = data.get('MV')
            Itv = data.get('ITV')
            Etv = data.get('ETV')
            F2o2 = data.get('F2O2')
            VentilatorAssociatedPneumonia = data.get('VentilatorAssociatedPneumonia')
            Status = data.get('Status')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")

            registration_ins_ip = None
            registration_ins_casuality = None
            
            print(f"Received RegistrationId: {RegistrationId}")  # Debugging line
            
            # Get the Patient_IP_Registration_Detials instance
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

            # Save Ventilator details
            VentilatorSettings_instance = IP_VentilatorSettings_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                Mode=Mode,
                BreathsPerMin=BreathsPerMin,
                PressSupport=PressSupport,
                PeakPress=PeakPress,
                Peep=Peep,
                MeanPress=MeanPress,
                MV=Mv,
                ITV=Itv,
                ETV=Etv,
                F2O2=F2o2,
                VentilatorAssociatedPneumonia=VentilatorAssociatedPneumonia,
                Status=Status,
                Remarks=Remarks,
                Created_by=createdby,
            )
            VentilatorSettings_instance.save()
            
            return JsonResponse({'success': 'VentilatorSettings details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
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
                Ventilator_details = IP_VentilatorSettings_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Ventilator_details = IP_VentilatorSettings_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            
            # Serialize data
            Ventilator_details_data = []
            for idx, Ventilator in enumerate(Ventilator_details, start=1):
                Ventilator_dict = {
                    'id': idx,
                    'RegistrationId': Ventilator.Ip_Registration_Id.pk if Ventilator.Ip_Registration_Id else Ventilator.Casuality_Registration_Id.pk,
                    'VisitId': Ventilator.Ip_Registration_Id.VisitId if Ventilator.Ip_Registration_Id else Ventilator.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Ventilator.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Ventilator.Ip_Registration_Id else Ventilator.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Ventilator.Ip_Registration_Id.PrimaryDoctor.ShortName if Ventilator.Ip_Registration_Id else Ventilator.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': Ventilator.DepartmentType,
                    'Mode': Ventilator.Mode,
                    'BreathsPerMin': Ventilator.BreathsPerMin,
                    'PressSupport': Ventilator.PressSupport,
                    'PeakPress': Ventilator.PeakPress,
                    'Peep': Ventilator.Peep,
                    'MeanPress': Ventilator.MeanPress,
                    'Mv': Ventilator.MV,
                    'Itv': Ventilator.ITV,
                    'Etv': Ventilator.ETV,
                    'F2o2': Ventilator.F2O2,
                    'VentilatorAssociatedPneumonia': Ventilator.VentilatorAssociatedPneumonia,
                    'Status': Ventilator.Status,
                    'Remarks': Ventilator.Remarks,
                    'CurrDate': Ventilator.created_at.strftime('%d-%m-%y'),
                    'CurrTime': Ventilator.created_at.strftime('%H:%M:%S'),
                    'Createdby': Ventilator.Created_by,
                }
                Ventilator_details_data.append(Ventilator_dict)

            return JsonResponse(Ventilator_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





