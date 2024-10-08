from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_Dama_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            print(data,'data')
            RegistrationId = data.get("RegistrationId")
            Type = data.get("Type")
            Reasons = data.get('Reasons')
            Date = data.get('Date')
            Time = data.get('Time')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")

            registration_ins_ip = None
            registration_ins_casuality = None
            
            if RegistrationId:
                try:
                    registration_ins_ip = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
                    print("Found in IP Registration")
                except Patient_IP_Registration_Detials.DoesNotExist:
                    print("Not found in IP Registration, trying Casuality Registration")
                    try:
                        registration_ins_casuality = Patient_Casuality_Registration_Detials.objects.get(pk=RegistrationId)
                        print(registration_ins_casuality,'registration_ins_casuality')
                        print("Found in Casuality Registration")
                    except Patient_Casuality_Registration_Detials.DoesNotExist:
                        return JsonResponse({'error': 'No registration found for the given RegistrationId'})

            else:
                return JsonResponse({'error': 'RegistrationId is required'})

            # Save Damaa details
            Dama_instance = IP_Dama_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                Type=Type,
                Reasons=Reasons,
                DamaDate=Date,
                Time=Time,
                Remarks=Remarks,
                DepartmentType=DepartmentType,
                Created_by=createdby,
            )
            Dama_instance.save()
            
            return JsonResponse({'success': 'DAMA details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'})
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
                Dama_details = IP_Dama_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Dama_details = IP_Dama_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            

            # Serialize data
            Dama_details_data = []
            for idx, Damaa in enumerate(Dama_details, start=1):
                Damaa_dict = {
                    'id': idx,
                    'RegistrationId': Damaa.Ip_Registration_Id.pk if Damaa.Ip_Registration_Id else Damaa.Casuality_Registration_Id.pk,
                    'VisitId': Damaa.Ip_Registration_Id.VisitId if Damaa.Ip_Registration_Id else Damaa.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Damaa.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Damaa.Ip_Registration_Id else Damaa.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Damaa.Ip_Registration_Id.PrimaryDoctor.ShortName if Damaa.Ip_Registration_Id else Damaa.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'Type': Damaa.Type,
                    'Reasons': Damaa.Reasons,
                    'Date': Damaa.DamaDate,
                    'Time': Damaa.Time,
                    'Remarks': Damaa.Remarks,
                    'DepartmentType': Damaa.DepartmentType,
                    'CurrDate': Damaa.created_at.strftime('%d-%m-%y'),
                    'CurrTime': Damaa.created_at.strftime('%H:%M:%S'),
                    'Createdby': Damaa.Created_by,
                }
                Dama_details_data.append(Damaa_dict)

            return JsonResponse(Dama_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)






