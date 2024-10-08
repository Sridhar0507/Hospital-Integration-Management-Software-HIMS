
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_Gynecology_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaaaaa')
            
            # Extract and validate data
            Oh = data.get('OH','')
            Mh = data.get('MH','')
            Exami = data.get('EXAMI','')
            Ps = data.get('PS','')
            Pv = data.get('PV','')
            # Registration_Id = data.get('Registration_Id', '')
            # PatientName = data.get('PatientName', '')
            created_by = data.get('created_by', '')
            registration_id = data.get('RegistrationId', '')


            # if not registration_id:
            #     return JsonResponse({'error': 'RegistrationId is required'})

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'})

            Gynec_instance = Workbench_Gynecology(
                Registration_Id=registration_ins,
                # PatientName=PatientName,
                OH=Oh,
                MH=Mh,
                EXAMI=Exami,
                PS=Ps,
                PV=Pv,
                created_by=created_by
            )
            Gynec_instance.save()
            return JsonResponse({'success': 'Gynec Details added successfully'})
       
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
            
   
    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'})
            
            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Fetch all records from the Location_Detials model
            Gynecology = Workbench_Gynecology.objects.filter(Registration_Id=registration_ins)
            
            # Construct a list of dictionaries containing location data
            Gynecology_data = []
            for Gynec in Gynecology:
                Gynecology_data.append(
                {
                    'id': Gynec.Id,
                    'RegistrationId': Gynec.Registration_Id.pk,
                    'VisitId': Gynec.Registration_Id.VisitId,
                    'PrimaryDoctorId': Gynec.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Gynec.Registration_Id.PrimaryDoctor.ShortName,
                    'OH': Gynec.OH,
                    'MH': Gynec.MH,
                    'EXAMI': Gynec.EXAMI,
                    'PS': Gynec.PS,
                    'PV': Gynec.PV,
                    'created_by': Gynec.created_by,
                    'Date' : Gynec.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time' : Gynec.created_at.strftime('%H:%M:%S') , # Format time
                }
                )
            
            print(Gynecology_data,'Gynecology_data')
            return JsonResponse(Gynecology_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)












# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_Gynecology_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             # Extract and validate data
#             Oh = data.get('OH','')
#             Mh = data.get('MH','')
#             Exami = data.get('EXAMI','')
#             Ps = data.get('PS','')
#             Pv = data.get('PV','')
#             # Registration_Id = data.get('Registration_Id', '')
#             # PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')
#             registration_id = data.get('RegistrationId', '')


#             if not registration_id:
#                 return JsonResponse({'error': 'RegistrationId is required'})

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             Gynec_instance = Workbench_Gynecology(
#                 Registration_Id=registration_ins,
#                 # PatientName=PatientName,
#                 OH=Oh,
#                 MH=Mh,
#                 EXAMI=Exami,
#                 PS=Ps,
#                 PV=Pv,
#                 created_by=created_by
#             )
#             Gynec_instance.save()
#             return JsonResponse({'success': 'Gynec Details added successfully'})
       
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
            
   
#     elif request.method == 'GET':
#         try:
#             registration_id = request.GET.get('RegistrationId')
#             if not registration_id:
#                 return JsonResponse({'warn': 'RegistrationId is required'})
            
#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             # Fetch all records from the Location_Detials model
#             Gynecology = Workbench_Gynecology.objects.filter(Registration_Id=registration_ins)
            
#             # Construct a list of dictionaries containing location data
#             Gynecology_data = [
#                 {
#                     'id': Gynec.Id,
#                     'RegistrationId': Gynec.Registration_Id.pk,
#                     'VisitId': Gynec.Registration_Id.VisitId,
#                     'PrimaryDoctorId': Gynec.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': Gynec.Registration_Id.PrimaryDoctor.ShortName,
#                     'OH': Gynec.OH,
#                     'MH': Gynec.MH,
#                     'EXAMI': Gynec.EXAMI,
#                     'PS': Gynec.PS,
#                     'PV': Gynec.PV,
#                     'created_by': Gynec.created_by,
#                     'Date' : Gynec.created_at.strftime('%Y-%m-%d'),  # Format date
#                     'Time' : Gynec.created_at.strftime('%H:%M:%S') , # Format time
#                 } for Gynec in Gynecology
#             ]
#             print(Gynecology_data,'Gynecology_data')
#             return JsonResponse(Gynecology_data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
#     return JsonResponse({'error': 'Method not allowed'}, status=405)





