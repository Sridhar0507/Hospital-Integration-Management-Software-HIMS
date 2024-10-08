from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IPD_Handover_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            ReasonForAdmission = data.get("ReasonForAdmission")
            PatientConditionOnAdmission = data.get("PatientConditionOnAdmission")
            DoctorIncharge = data.get("DoctorIncharge")
            NurseIncharge = data.get("NurseIncharge")
            PatientFile = data.get("PatientFile")
            AadharCardNo = data.get("AadharCardNo")
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            # Save admission details
            admission_instance = IPD_Handover_Details(
                Registration_Id=registration_ins,
                ReasonForAdmission=ReasonForAdmission,
                PatientConditionOnAdmission=PatientConditionOnAdmission,
                DoctorIncharge=DoctorIncharge,
                NurseIncharge=NurseIncharge,
                ReceptionInchargeName=registration_ins.created_by,
                PatientFile=PatientFile,
                AadharCardNo=AadharCardNo,
                Created_by=createdby,
            )
            admission_instance.save()
            
            return JsonResponse({'success': 'Admission details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            # Fetch admission details based on RegistrationId
            admission_details = IPD_Handover_Details.objects.filter(Registration_Id__pk=RegistrationId)
            if not admission_details.exists():
                return JsonResponse({'error': 'No admission details found for the given RegistrationId'}, status=404)
            
            # Serialize data
            admission_details_data = []
            for idx, admission in enumerate(admission_details, start=1):
                admission_dict = {
                    'id': idx,
                    'RegistrationId': admission.Registration_Id.pk,
                    'VisitId': admission.Registration_Id.VisitId,
                    'PrimaryDoctorId': admission.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': admission.Registration_Id.PrimaryDoctor.ShortName,
                    'ReasonForAdmission': admission.ReasonForAdmission,
                    'PatientConditionOnAdmission': admission.PatientConditionOnAdmission,
                    'DoctorIncharge': admission.DoctorIncharge,
                    'NurseIncharge': admission.NurseIncharge,
                    'ReceptionInchargeName': admission.ReceptionInchargeName,
                    'PatientFile': admission.PatientFile,
                    'AadharCardNo': admission.AadharCardNo,
                    'Date': admission.created_at.strftime('%d-%m-%y'),
                    'Time': admission.created_at.strftime('%H:%M:%S'),
                    'Createdby': admission.Created_by,
                }
                admission_details_data.append(admission_dict)

            return JsonResponse(admission_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





