from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_UrinaryCathetor_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            CathetorFunction = data.get("CathetorFunction")
            UrineQuality = data.get('UrineQuality')
            CatheterSite = data.get('CatheterSite')
            UrinaryCatheterSize = data.get('UrinaryCatheterSize')
            Uti = data.get('Uti')
            Remarks = data.get('Remarks')
            Status = data.get('Status')
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")

            registration_ins_ip = None
            registration_ins_casuality = None
            
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

            # Save UrinaryCathetor details
            Dama_instance = IP_UrinaryCathetor_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                CathetorFunction=CathetorFunction,
                UrineQuality=UrineQuality,
                CatheterSite=CatheterSite,
                UrinaryCatheterSize=UrinaryCatheterSize,
                Status=Status,
                Uti=Uti,
                Remarks=Remarks,
                Created_by=createdby,
            )
            Dama_instance.save()
            
            return JsonResponse({'success': 'UrinaryCathetor details saved successfully'})
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
                UrinaryCathetor_Details = IP_UrinaryCathetor_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                UrinaryCathetor_Details = IP_UrinaryCathetor_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            # Serialize data
            UrinaryCathetor_Details_data = []
            for idx, UrinaryCathetor in enumerate(UrinaryCathetor_Details, start=1):
                UrinaryCathetor_dict = {
                    'id': idx,

                    'RegistrationId': UrinaryCathetor.Ip_Registration_Id.pk if UrinaryCathetor.Ip_Registration_Id else UrinaryCathetor.Casuality_Registration_Id.pk,
                    'VisitId': UrinaryCathetor.Ip_Registration_Id.VisitId if UrinaryCathetor.Ip_Registration_Id else UrinaryCathetor.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': UrinaryCathetor.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if UrinaryCathetor.Ip_Registration_Id else UrinaryCathetor.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': UrinaryCathetor.Ip_Registration_Id.PrimaryDoctor.ShortName if UrinaryCathetor.Ip_Registration_Id else UrinaryCathetor.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'CathetorFunction': UrinaryCathetor.CathetorFunction,
                    'UrineQuality': UrinaryCathetor.UrineQuality,
                    'CatheterSite': UrinaryCathetor.CatheterSite,
                    'UrinaryCatheterSize': UrinaryCathetor.UrinaryCatheterSize,
                    'Status': UrinaryCathetor.Status,
                    'Uti': UrinaryCathetor.Uti,
                    'DepartmentType': UrinaryCathetor.DepartmentType,
                    'Remarks': UrinaryCathetor.Remarks,
                    'CurrDate': UrinaryCathetor.created_at.strftime('%d-%m-%y'),
                    'CurrTime': UrinaryCathetor.created_at.strftime('%H:%M:%S'),
                    'Createdby': UrinaryCathetor.Created_by,
                }
                UrinaryCathetor_Details_data.append(UrinaryCathetor_dict)

            return JsonResponse(UrinaryCathetor_Details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





