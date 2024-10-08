from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *



# @csrf_exempt
# @require_http_methods(['POST', 'GET'])
# def IP_InchargeAndRefer_Details_Link(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             RegistrationId = data.get("RegistrationId")
#             Speciality = data.get("Speciality")
#             DoctorName = data.get('DoctorName')
#             Reason = data.get('Reason')
#             Type = data.get('Inserttype')
            
#             createdby = data.get("Createdby")
            
#             # Get the Patient_IP_Registration_Detials instance
#             if RegistrationId:
#                 registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
#             else:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             # Save InchargeAndRefer details
#             InchargeAndRefer_instance = IP_InchargeAndRefer_Details(
#                 Registration_Id=registration_ins,
#                 Reason=Reason,
#                 Type=Type,
#                 Created_by=createdby,
#             )
#             InchargeAndRefer_instance.save()
            
#             return JsonResponse({'success': 'InchargeAndRefer details saved successfully'})
#         except Patient_IP_Registration_Detials.DoesNotExist:
#             return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             RegistrationId = request.GET.get('RegistrationId')
#             Type = request.GET.get('Type')
            
#             if not RegistrationId:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
#             # Fetch InchargeAndRefer details based on RegistrationId and Type
#             if Type:
#                 InchargeAndRefer_details = IP_InchargeAndRefer_Details.objects.filter(
#                     Registration_Id__pk=RegistrationId,
#                     Type=Type
#                 )
#             else:
#                 InchargeAndRefer_details = IP_InchargeAndRefer_Details.objects.filter(
#                     Registration_Id__pk=RegistrationId
#                 )
                
#             if not InchargeAndRefer_details.exists():
#                 return JsonResponse({'error': 'No InchargeAndRefer details found for the given RegistrationId'}, status=404)
            
#             InchargeAndRefer_details_data = []
#             for idx, InchargeAndRefer in enumerate(InchargeAndRefer_details, start=1):
                
#                 InchargeAndRefer_dict = {
#                     'id': idx,
#                     'RegistrationId': InchargeAndRefer.Registration_Id.pk,
#                     'VisitId': InchargeAndRefer.Registration_Id.VisitId,
#                     'PrimaryDoctorId': InchargeAndRefer.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': InchargeAndRefer.Registration_Id.PrimaryDoctor.ShortName,
#                     'Speciality': InchargeAndRefer.Registration_Id.Specialization.Speciality_Name,
#                     'DoctorName': InchargeAndRefer.Registration_Id.DoctorId.ShortName,
#                     'Reason': InchargeAndRefer.Reason,
#                     'Type': InchargeAndRefer.Type,
#                     'CurrDate': InchargeAndRefer.created_at.strftime('%d-%m-%y'),
#                     'CurrTime': InchargeAndRefer.created_at.strftime('%H:%M:%S'),
#                     'Createdby': InchargeAndRefer.Created_by,
#                 }
#                 InchargeAndRefer_details_data.append(InchargeAndRefer_dict)

#             return JsonResponse(InchargeAndRefer_details_data, safe=False)
        
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_InchargeAndRefer_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            Speciality = data.get("Speciality")
            DoctorName = data.get('DoctorName')
            Reason = data.get('Reason')
            Type = data.get('Inserttype')
            
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            if DoctorName:
                doc_ins =Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk = DoctorName)
            # Save InchargeAndRefer details
            InchargeAndRefer_instance = IP_InchargeAndRefer_Details(
                Registration_Id=registration_ins,
                Reason=Reason,
                Type=Type,
                Doctor_Id=doc_ins,
                Created_by=createdby,
            )
            InchargeAndRefer_instance.save()
            
            return JsonResponse({'success': 'InchargeAndRefer details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            Type = request.GET.get('Type')
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            # Fetch InchargeAndRefer details based on RegistrationId
            InchargeAndRefer_details = IP_InchargeAndRefer_Details.objects.filter(Registration_Id__pk=RegistrationId,Type=Type)
            
            
            # Serialize data
            InchargeAndRefer_details_data = []
            for idx, InchargeAndRefer in enumerate(InchargeAndRefer_details, start=1):
                InchargeAndRefer_dict = {
                    'id': idx,
                    'RegistrationId': InchargeAndRefer.Registration_Id.pk,
                    'VisitId': InchargeAndRefer.Registration_Id.VisitId,
                    'PrimaryDoctorId': InchargeAndRefer.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': InchargeAndRefer.Registration_Id.PrimaryDoctor.ShortName,
                    'Speciality': InchargeAndRefer.Doctor_Id.Specialization.Speciality_Name if InchargeAndRefer.Doctor_Id else "",
                    'ReferDoctorName': InchargeAndRefer.Doctor_Id.Doctor_ID.ShortName if InchargeAndRefer.Doctor_Id else "",
                    'ReferDoctorId': InchargeAndRefer.Doctor_Id.Doctor_ID.Doctor_ID if InchargeAndRefer.Doctor_Id else "",
                    'Reason': InchargeAndRefer.Reason,
                    'Type': InchargeAndRefer.Type,
                    'CurrDate': InchargeAndRefer.created_at.strftime('%d-%m-%y'),
                    'CurrTime': InchargeAndRefer.created_at.strftime('%I:%M %p'),
                    'Createdby': InchargeAndRefer.Created_by,
                }
                InchargeAndRefer_details_data.append(InchargeAndRefer_dict)

            return JsonResponse(InchargeAndRefer_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


