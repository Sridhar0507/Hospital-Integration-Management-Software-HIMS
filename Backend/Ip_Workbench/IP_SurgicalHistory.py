from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.utils.timezone import now



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json




@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_SurgicalHistory_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            SurgicalProcedure = data.get("SurgicalProcedure")
            DateOfSurgery = data.get("DateOfSurgery")
            PostOpDate = data.get("PostOpDate")
            MajorSurgicalEvents = data.get("MajorSurgicalEvents")
            BloodProductsTransfusedDuringSurgery = data.get("BloodProductsTransfusedDuringSurgery")
            NoOfBags = data.get("NoOfBags")
            AnyAdverseReactions = data.get("AnyAdverseReactions")
            Remarks = data.get("Remarks")
            DepartmentType = data.get("DepartmentType")
            createdby = data.get("Createdby")
            
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

            else:
                return JsonResponse({'error': 'RegistrationId is required'})

            # Save Surgical details
            Surgical_instance = IP_SurgicalHistory_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
                SurgicalProcedure=SurgicalProcedure,
                DateOfSurgery=DateOfSurgery,
                PostOpDate=PostOpDate,
                MajorSurgicalEvents=MajorSurgicalEvents,
                BloodProductsTransfusedDuringSurgery=BloodProductsTransfusedDuringSurgery,
                NoOfBags=NoOfBags,
                AnyAdverseReactions=AnyAdverseReactions,
                Remarks=Remarks,
                Created_by=createdby,
            )
            Surgical_instance.save()
            
            return JsonResponse({'success': 'Surgical details saved successfully'})

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
                SurgicalHistory_Details = IP_SurgicalHistory_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                SurgicalHistory_Details = IP_SurgicalHistory_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            # Serialize data
            SurgicalHistory_Details_data = []
            for idx, Surgical in enumerate(SurgicalHistory_Details, start=1):
                Surgical_dict = {
                    'id': idx,
                    'RegistrationId': Surgical.Ip_Registration_Id.pk if Surgical.Ip_Registration_Id else Surgical.Casuality_Registration_Id.pk,
                    'VisitId': Surgical.Ip_Registration_Id.VisitId if Surgical.Ip_Registration_Id else Surgical.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Surgical.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Surgical.Ip_Registration_Id else Surgical.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Surgical.Ip_Registration_Id.PrimaryDoctor.ShortName if Surgical.Ip_Registration_Id else Surgical.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'SurgicalProcedure': Surgical.SurgicalProcedure,
                    'DateOfSurgery': Surgical.DateOfSurgery,
                    'PostOpDate': Surgical.PostOpDate,
                    'MajorSurgicalEvents': Surgical.MajorSurgicalEvents,
                    'BloodProductsTransfusedDuringSurgery': Surgical.BloodProductsTransfusedDuringSurgery,
                    'NoOfBags': Surgical.NoOfBags,
                    'AnyAdverseReactions': Surgical.AnyAdverseReactions,
                    'Remarks': Surgical.Remarks,
                    'DepartmentType': Surgical.DepartmentType,
                    'Date': Surgical.created_at.strftime('%d-%m-%y'),
                    'Time': Surgical.created_at.strftime('%H:%M:%S'),
                    'Createdby': Surgical.Created_by,
                }
                SurgicalHistory_Details_data.append(Surgical_dict)

            return JsonResponse(SurgicalHistory_Details_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

