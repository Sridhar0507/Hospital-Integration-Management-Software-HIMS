
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_ProgressNotes_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            ProgressNotes = data.get("ProgressNotes")
            TreatmentNotes = data.get("TreatmentNotes")
            AdverseEvents = data.get("AdverseEvents")
            colorFlag = data.get("colorFlag")
            Type = data.get("Type")
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

            # Save progressnotes details
            progressnotes_instance = IP_ProgressNotes_Details(
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                ProgressNotes=ProgressNotes,
                TreatmentNotes=TreatmentNotes,
                AdverseEvents=AdverseEvents,
                colorFlag=colorFlag,
                Type=Type,
                DepartmentType=DepartmentType,
                Created_by=createdby,
            )
            progressnotes_instance.save()
            
            return JsonResponse({'success': 'ProgressNotes details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')

            if DepartmentType=='IP':
                progressnotes_details = IP_ProgressNotes_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                progressnotes_details = IP_ProgressNotes_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            

            
           
            # Serialize data
            progressnotes_details_data = []
            for idx, progressnotes in enumerate(progressnotes_details, start=1):
                progressnotes_dict = {
                    'id': idx,
                    'RegistrationId': progressnotes.Ip_Registration_Id.pk if progressnotes.Ip_Registration_Id else progressnotes.Casuality_Registration_Id.pk,
                    'VisitId': progressnotes.Ip_Registration_Id.VisitId if progressnotes.Ip_Registration_Id else progressnotes.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': progressnotes.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if progressnotes.Ip_Registration_Id else progressnotes.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': progressnotes.Ip_Registration_Id.PrimaryDoctor.ShortName if progressnotes.Ip_Registration_Id else progressnotes.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'ProgressNotes': progressnotes.ProgressNotes,
                    'TreatmentNotes': progressnotes.TreatmentNotes,
                    'AdverseEvents': progressnotes.AdverseEvents,
                    'colorFlag': progressnotes.colorFlag,
                    'Type': progressnotes.Type,
                    'DepartmentType': progressnotes.DepartmentType,
                    'Date': progressnotes.created_at.strftime('%d-%m-%y'),
                    'Time': progressnotes.created_at.strftime('%H:%M:%S'),
                    'Createdby': progressnotes.Created_by,
                }
                progressnotes_details_data.append(progressnotes_dict)

            return JsonResponse(progressnotes_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



