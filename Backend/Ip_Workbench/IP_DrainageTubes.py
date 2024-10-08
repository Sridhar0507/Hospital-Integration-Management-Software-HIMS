from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *



@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_DrainageTubes_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            Site = data.get("Site")
            LocationLR = data.get('LocationLR')
            Status = data.get('Status')
            Quality = data.get('Quality')
            DrainageTubeSize = data.get('DrainageTubeSize')
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

            # Save Drainage details
            DrainageTubes_instance = IP_DrainageTubes_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                Status=Status,
                Site=Site,
                LocationLR=LocationLR,
                Quality=Quality,
                DrainageTubeSize=DrainageTubeSize,
                Remarks=Remarks,
                Created_by=createdby,
            )
            DrainageTubes_instance.save()

            return JsonResponse({'success': 'Drainage tubes details saved successfully'})
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
                DrainageTubes_details = IP_DrainageTubes_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                DrainageTubes_details = IP_DrainageTubes_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
           
            # Serialize data
            DrainageTubes_details_data = []
            for idx, Drainage in enumerate(DrainageTubes_details, start=1):
                Drainage_dict = {
                    'id': idx,
                    'RegistrationId': Drainage.Ip_Registration_Id.pk if Drainage.Ip_Registration_Id else Drainage.Casuality_Registration_Id.pk,
                    'VisitId': Drainage.Ip_Registration_Id.VisitId if Drainage.Ip_Registration_Id else Drainage.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Drainage.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Drainage.Ip_Registration_Id else Drainage.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Drainage.Ip_Registration_Id.PrimaryDoctor.ShortName if Drainage.Ip_Registration_Id else Drainage.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': Drainage.DepartmentType,
                    'Status': Drainage.Status,
                    'Site': Drainage.Site,
                    'LocationLR': Drainage.LocationLR,
                    'Quality': Drainage.Quality,
                    'DrainageTubeSize': Drainage.DrainageTubeSize,
                    'Remarks': Drainage.Remarks,
                    'CurrDate': Drainage.created_at.strftime('%d-%m-%y'),
                    'CurrTime': Drainage.created_at.strftime('%H:%M:%S'),
                    'Createdby': Drainage.Created_by,
                }
                DrainageTubes_details_data.append(Drainage_dict)

            return JsonResponse(DrainageTubes_details_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


