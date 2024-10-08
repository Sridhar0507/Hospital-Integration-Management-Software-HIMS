
from Frontoffice.models import *
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db.models import  Q
from django.http import JsonResponse

# # Create your views here.
# @csrf_exempt
# @require_http_methods(["GET"])
# def get_IP_workbenchquelist_doctor(request):
#     try:
#         RegistrationId = request.GET.get('RegistrationId', '').strip()
#         type = request.GET.get('Type', '').strip()

#         if not RegistrationId :
#             return JsonResponse({'error': 'PatientId and VisitId are required'}, status=400)
        
#         if type == 'IP':
#             # Query the appointment details
#             try:
#                 patient_instance = Patient_Appointment_Registration_Detials.objects.get(pk = RegistrationId)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

            
#             # Serialize the filtered queryset
#             OPRegistration_dict = {
#                 'RegistrationId': patient_instance.Registration_Id,
#                 'PatientId': patient_instance.PatientId.PatientId,
#                 'VisitId': patient_instance.VisitId,
#                 'PatientName': f'{patient_instance.PatientId.Title}.{patient_instance.PatientId.FirstName} {patient_instance.PatientId.MiddleName} {patient_instance.PatientId.SurName}',
#                 'PhoneNo': patient_instance.PatientId.PhoneNo,
#                 'Title': patient_instance.PatientId.Title,
#                 'FirstName': patient_instance.PatientId.FirstName,
#                 'MiddleName': patient_instance.PatientId.MiddleName,
#                 'SurName': patient_instance.PatientId.SurName,
#                 'Gender': patient_instance.PatientId.Gender,
#                 'AliasName': patient_instance.PatientId.AliasName,
#                 'DOB': patient_instance.PatientId.DOB,
#                 'Age': patient_instance.PatientId.Age,
#                 'BloodGroup': patient_instance.PatientId.BloodGroup,
#                 'VisitPurpose': patient_instance.VisitPurpose,
#                 'Specialization': patient_instance.Specialization.Speciality_Id if patient_instance.Specialization else '',
#                 'DoctorName': patient_instance.PrimaryDoctor.Doctor_ID,
#                 'CaseSheetNo': patient_instance.PatientId.CasesheetNo,
#                 'Complaint': patient_instance.Complaint,
#                 'PatientType': patient_instance.PatientType,
#                 'PatientCategory': patient_instance.PatientCategory,
#                 'IsMLC': patient_instance.IsMLC,
#                 'Flagging': patient_instance.Flagging,
#             }



#             return JsonResponse(OPRegistration_dict)
        
#         return JsonResponse({'error': 'Invalid type'}, status=400)

#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
@require_http_methods(["GET"])
def get_IP_workbenchquelist_doctor(request):
    try:
        RegistrationId = request.GET.get('RegistrationId', '').strip()
        type = request.GET.get('Type', '').strip()

        if not RegistrationId:
            return JsonResponse({'error': 'RegistrationId is required'})
        
        if type == 'IP':
            # Query the appointment details
            try:
                patient_instance = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            except Patient_IP_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)
            except Exception as e:
                return JsonResponse({'error': 'Database error: ' + str(e)}, status=500)

            # Serialize the filtered queryset
            OPRegistration_dict = {
                'RegistrationId': patient_instance.Registration_Id,
                'PatientId': patient_instance.PatientId.PatientId if patient_instance.PatientId else '',
                'VisitId': patient_instance.VisitId if patient_instance.VisitId else '',
                'PatientName': (f'{patient_instance.PatientId.Title}.{patient_instance.PatientId.FirstName} '
                                f'{patient_instance.PatientId.MiddleName} {patient_instance.PatientId.SurName}') if patient_instance.PatientId else '',
                'PhoneNo': patient_instance.PatientId.PhoneNo if patient_instance.PatientId else '',
                'Title': patient_instance.PatientId.Title if patient_instance.PatientId else '',
                'FirstName': patient_instance.PatientId.FirstName if patient_instance.PatientId else '',
                'MiddleName': patient_instance.PatientId.MiddleName if patient_instance.PatientId else '',
                'SurName': patient_instance.PatientId.SurName if patient_instance.PatientId else '',
                'Gender': patient_instance.PatientId.Gender if patient_instance.PatientId else '',
                'AliasName': patient_instance.PatientId.AliasName if patient_instance.PatientId else '',
                'DOB': patient_instance.PatientId.DOB if patient_instance.PatientId else '',
                'Age': patient_instance.PatientId.Age if patient_instance.PatientId else '',
                'BloodGroup': patient_instance.PatientId.BloodGroup if patient_instance.PatientId else '',
                'VisitPurpose': patient_instance.VisitPurpose if patient_instance.VisitPurpose else '',
                'Specialization': patient_instance.Specialization.Speciality_Id if patient_instance.Specialization else '',
                'DoctorName': patient_instance.PrimaryDoctor.Doctor_ID if patient_instance.PrimaryDoctor else '',
                'CaseSheetNo': patient_instance.PatientId.CasesheetNo if patient_instance.PatientId else '',
                'Complaint': patient_instance.Complaint if patient_instance.Complaint else '',
                'PatientType': patient_instance.PatientType if patient_instance.PatientType else '',
                'PatientCategory': patient_instance.PatientCategory if patient_instance.PatientCategory else '',
                'IsMLC': patient_instance.IsMLC if patient_instance.IsMLC is not None else '',
                'Flagging': patient_instance.Flagging if patient_instance.Flagging is not None else '',
            }

            return JsonResponse(OPRegistration_dict)

        return JsonResponse({'error': 'Invalid type'})

    except Exception as e:
        import traceback
        print(traceback.format_exc())  # Detailed error logging
        return JsonResponse({'error': str(e)}, status=500)



