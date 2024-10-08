from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.utils.timezone import now

@csrf_exempt
@require_http_methods(['POST','GET'])
def IP_Mlc_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'data')
            RegistrationId = data.get("RegistrationId")
            MlcNo = data.get('MlcNo','')
            MlcInfoDate = data.get('MlcInfoDate')
            MlcInfoTime = data.get('MlcInfoTime')
            InformedBy = data.get('InformedBy')
            MlcSendTime = data.get('MlcSendTime')
            Reason = data.get('Reason')
            Type = data.get('Type')
            PoliceStationName = data.get('PoliceStationName')
            ConsultantName = data.get('ConsultantName')
            RmoName = data.get('RmoName')
            MlcCopyReceiveTime = data.get('MlcCopyReceiveTime')
            ReceivedBySister = data.get('ReceivedBySister')
            ReceptionStaffName = data.get('ReceptionStaffName')
            InchargeName = data.get('InchargeName')
            Remarks = data.get('Remarks')
            DepartmentType = data.get("DepartmentType")
            createdby = data.get("Createdby")
            #registration_ins=None


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

            
            Mlc_instance = IP_Mlc_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                Mlc_No=MlcNo,
                Mlc_InfoDate=MlcInfoDate,
                Mlc_InfoTime=MlcInfoTime,
                Informed_By=InformedBy,
                Mlc_SendTime=MlcSendTime,
                Mlc_Reason=Reason,
                Mlc_Type=Type,
                PoliceStation_Name=PoliceStationName,
                Consultant_Name=ConsultantName,
                Rmo_Name=RmoName,
                MlcCopy_ReceiveTime=MlcCopyReceiveTime,
                ReceivedBy_Sister=ReceivedBySister,
                Reception_StaffName=ReceptionStaffName,
                Incharge_Name=InchargeName,
                Mlc_Remarks=Remarks,
                DepartmentType=DepartmentType,
                Created_by=createdby
            )
            Mlc_instance.save()
            
            return JsonResponse({'success': 'Mlc saved successfully'})
        except Exception as e:
            print(f"An error occured: {str(e)}")
            return JsonResponse({'error': 'An internal server error occured'}, status = 500)
        
    elif request.method == 'GET':
        try:
            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')

            if DepartmentType=='IP':
                Mlc_Details = IP_Mlc_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Mlc_Details = IP_Mlc_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            

            
            Mlc_Details_data =[]
            for idx,Mlc in enumerate(Mlc_Details, start=1):
                Mlc_dict = {
                    'id' : idx,
                    'RegistrationId': Mlc.Ip_Registration_Id.pk if Mlc.Ip_Registration_Id else Mlc.Casuality_Registration_Id.pk,
                    'VisitId': Mlc.Ip_Registration_Id.VisitId if Mlc.Ip_Registration_Id else Mlc.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Mlc.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Mlc.Ip_Registration_Id else Mlc.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Mlc.Ip_Registration_Id.PrimaryDoctor.ShortName if Mlc.Ip_Registration_Id else Mlc.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'MlcNo': Mlc.Mlc_No,
                    'MlcInfoDate': Mlc.Mlc_InfoDate,
                    'MlcInfoTime': Mlc.Mlc_InfoTime,
                    'InformedBy': Mlc.Informed_By,
                    'MlcSendTime': Mlc.Mlc_SendTime,
                    'Reason': Mlc.Mlc_Reason,
                    'Type': Mlc.Mlc_Type,
                    'PoliceStationName': Mlc.PoliceStation_Name,
                    'ConsultantName': Mlc.Consultant_Name,
                    'RmoName': Mlc.Rmo_Name,
                    'MlcCopyReceiveTime': Mlc.MlcCopy_ReceiveTime,
                    'ReceivedBySister': Mlc.ReceivedBy_Sister,
                    'ReceptionStaffName': Mlc.Reception_StaffName,
                    'InchargeName': Mlc.Incharge_Name,
                    'Remarks': Mlc.Mlc_Remarks,
                    'DepartmentType': Mlc.DepartmentType,
                    'Date': Mlc.created_at.strftime('%d-%m-%y'), 
                    'Time' : Mlc.created_at.strftime('%H:%M:%S'),
                    'Createdby' : Mlc.Created_by,
                }
                Mlc_Details_data.append(Mlc_dict)

            return JsonResponse(Mlc_Details_data,safe=False)
        
        except Exception as e:
            print(f"An error occured: {str(e)}")
            return JsonResponse({'error': 'An internal server error occured'}, status = 500)





