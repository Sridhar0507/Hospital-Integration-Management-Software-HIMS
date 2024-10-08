from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_BloodTransfusedRecord_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            SourcedFrom = data.get("SourcedFrom",'')
            GetAddress = data.get('GetAddress','')
            BloodGroup = data.get('BloodGroup')
            Type = data.get('Type')
            CompatabilityCheckDone = data.get('CompatabilityCheckDone')
            PackNo = data.get('PackNo')
            ExpiryDate = data.get('ExpiryDate')
            ExpiryStartTime = data.get('ExpiryStartTime')
            ExpiryEndTime = data.get('ExpiryEndTime')
            AnyAdverseReactions = data.get('AnyAdverseReactions')
            Remarks = data.get('Remarks')
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")

            registration_ins_ip = None
            registration_ins_casuality = None
            
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

            # Save BloodTransfusedRecorda details
            BloodTransfusedRecord_instance = IP_BloodTransfusedRecord_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                SourcedFrom=SourcedFrom,
                GetAddress=GetAddress,
                BloodGroup=BloodGroup,
                Type=Type,
                CompatabilityCheckDone=CompatabilityCheckDone,
                PackNo=PackNo,
                ExpiryDate=ExpiryDate,
                ExpiryStartTime=ExpiryStartTime,
                ExpiryEndTime=ExpiryEndTime,
                AnyAdverseReactions=AnyAdverseReactions,
                Remarks=Remarks,
                Created_by=createdby,
            )
            BloodTransfusedRecord_instance.save()
            
            return JsonResponse({'success': 'DAMA details saved successfully'})
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
                BloodTransfusedRecord_details = IP_BloodTransfusedRecord_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                BloodTransfusedRecord_details = IP_BloodTransfusedRecord_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            # Serialize data
            BloodTransfusedRecord_details_data = []
            for idx, BloodTransfusedRecord in enumerate(BloodTransfusedRecord_details, start=1):
                BloodTransfusedRecord_dict = {
                    'id': idx,
                    'RegistrationId': BloodTransfusedRecord.Ip_Registration_Id.pk if BloodTransfusedRecord.Ip_Registration_Id else BloodTransfusedRecord.Casuality_Registration_Id.pk,
                    'VisitId': BloodTransfusedRecord.Ip_Registration_Id.VisitId if BloodTransfusedRecord.Ip_Registration_Id else BloodTransfusedRecord.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': BloodTransfusedRecord.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if BloodTransfusedRecord.Ip_Registration_Id else BloodTransfusedRecord.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': BloodTransfusedRecord.Ip_Registration_Id.PrimaryDoctor.ShortName if BloodTransfusedRecord.Ip_Registration_Id else BloodTransfusedRecord.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'SourcedFrom': BloodTransfusedRecord.SourcedFrom,
                    'GetAddress': BloodTransfusedRecord.GetAddress,
                    'BloodGroup': BloodTransfusedRecord.BloodGroup,
                    'Type': BloodTransfusedRecord.Type,
                    'DepartmentType': BloodTransfusedRecord.DepartmentType,
                    'CompatabilityCheckDone': BloodTransfusedRecord.CompatabilityCheckDone,
                    'PackNo': BloodTransfusedRecord.PackNo,
                    'ExpiryDate': BloodTransfusedRecord.ExpiryDate,
                    'ExpiryStartTime': BloodTransfusedRecord.ExpiryStartTime,
                    'ExpiryEndTime': BloodTransfusedRecord.ExpiryEndTime,
                    'AnyAdverseReactions': BloodTransfusedRecord.AnyAdverseReactions,
                    'Remarks': BloodTransfusedRecord.Remarks,
                    'CurrDate': BloodTransfusedRecord.created_at.strftime('%d-%m-%y'),
                    'CurrTime': BloodTransfusedRecord.created_at.strftime('%H:%M:%S'),
                    'Createdby': BloodTransfusedRecord.Created_by,
                }
                BloodTransfusedRecord_details_data.append(BloodTransfusedRecord_dict)

            return JsonResponse(BloodTransfusedRecord_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





