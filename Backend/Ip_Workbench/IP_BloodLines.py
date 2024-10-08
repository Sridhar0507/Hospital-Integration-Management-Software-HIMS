from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *




@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_BloodLines_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId",'')
            BlType = data.get("BlType",'')
            IVsite = data.get('IVsite','')
            IAsite = data.get('IAsite','')
            Condition = data.get('Condition','')
            Status = data.get('Status','')
            CentralLineInfection = data.get('CentralLineInfection','')
            Remarks = data.get('Remarks','')
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")

            
            registration_ins_ip = None
            registration_ins_casuality = None
            
            print(f"Received RegistrationId: {RegistrationId}")  # Debugging line
            
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

            # Save BloodLines details
            BloodLines_instance = IP_BloodLines_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                BlType=BlType,
                IVsite=IVsite,
                IAsite=IAsite,
                Condition=Condition,
                Status=Status,
                CentralLineInfection=CentralLineInfection,
                Remarks=Remarks,
                Created_by=createdby,
            )
            BloodLines_instance.save()
            
            return JsonResponse({'success': 'BloodLines details saved successfully'})
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
                BloodLines_details = IP_BloodLines_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                BloodLines_details = IP_BloodLines_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            
            # Serialize data
            BloodLines_details_data = []
            for idx, BloodLines in enumerate(BloodLines_details, start=1):
                BloodLines_dict = {
                    'id': idx,
                    'RegistrationId': BloodLines.Ip_Registration_Id.pk if BloodLines.Ip_Registration_Id else BloodLines.Casuality_Registration_Id.pk,
                    'VisitId': BloodLines.Ip_Registration_Id.VisitId if BloodLines.Ip_Registration_Id else BloodLines.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': BloodLines.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if BloodLines.Ip_Registration_Id else BloodLines.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': BloodLines.Ip_Registration_Id.PrimaryDoctor.ShortName if BloodLines.Ip_Registration_Id else BloodLines.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': BloodLines.DepartmentType,
                    'BlType': BloodLines.BlType,
                    'IVsite': BloodLines.IVsite,
                    'IAsite': BloodLines.IAsite,
                    'Condition': BloodLines.Condition,
                    'Status': BloodLines.Status,
                    'CentralLineInfection': BloodLines.CentralLineInfection,
                    'Remarks': BloodLines.Remarks,
                    'CurrDate': BloodLines.created_at.strftime('%d-%m-%y'),
                    'CurrTime': BloodLines.created_at.strftime('%H:%M:%S'),
                    'Createdby': BloodLines.Created_by,
                }
                BloodLines_details_data.append(BloodLines_dict)

            return JsonResponse(BloodLines_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





