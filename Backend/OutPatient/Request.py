import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from .models import *
from Masters.models import *
from Frontoffice.models import *
from django.utils.timezone import now
import base64
import magic
from PIL import Image
from io import BytesIO

import random
import string
from django.db import transaction
from decimal import Decimal


# ----------------------------otRequest-----------

@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def OtRequest_Names_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            
            SurgeryName = data.get('SurgeryName', None)
            SurgeryDate = data.get('SurgeryDate', "")
            SurgeryTime = data.get('SurgeryTime', "")
            Remarks = data.get('Remarks', "")
            Priority = data.get("Priority", "")
            RegistrationId = data.get("RegistrationId", None)
            created_by = data.get("created_by", "")
            RegisterType = data.get("RegisterType", None)
            Reason = data.get("Reason", "")  
            SurgeonName = data.get("SurgeonName","")
            # Validate RegistrationId and RegisterType
            if not RegistrationId or RegisterType not in ['OP', 'IP', 'Casuality', 'WARD', 'ICU', 'HDU']:
                return JsonResponse({'warn': 'Missing or invalid registration ID or registration type'})
            
            registration_instance = None  # Initialize variable for registration instance
            
            # Fetch the correct registration instance based on the RegisterType
            if RegisterType == 'OP':
                try:
                    registration_instance = Patient_Appointment_Registration_Detials.objects.get(Registration_Id=RegistrationId)
                    print(registration_instance, 'OP Registration instance found')
                except Patient_Appointment_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'OP Registration ID not found'})
                
            elif RegisterType == 'IP':
                try:
                    registration_instance = Patient_IP_Registration_Detials.objects.get(Registration_Id=RegistrationId)
                    print(registration_instance, 'IP Registration instance found')
                except Patient_IP_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'IP Registration ID not found'})
                    
            elif RegisterType == 'Casuality':
                try:
                    registration_instance = Patient_Casuality_Registration_Detials.objects.get(Registration_Id=RegistrationId)
                    print(registration_instance, 'Casuality Registration instance found')
                except Patient_Casuality_Registration_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'Casuality Registration ID not found'})

            # Ensure SurgeryName is provided
            if SurgeryName:
                surgeryname_instance = SurgeryName_Details.objects.get(pk=SurgeryName)
            else:
                return JsonResponse({'warn': 'Surgery Name is missing or invalid'})
            
          # Initialize doctor_instance to None
            doctor_instance = None

            if SurgeonName:
                try:
                    doctor_instance = Doctor_Personal_Form_Detials.objects.get(pk=SurgeonName)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'Surgeon not found'})

                # Create Ot_Request entry
                Ot_Request.objects.create(
                    RegisterType=RegisterType,
                    OP_Register_Id=registration_instance if RegisterType == 'OP' else None,
                    IP_Register_Id=registration_instance if RegisterType == 'IP' else None,
                    Casuality_Register_Id=registration_instance if RegisterType == 'Casuality' else None,
                    Surgery_Name=surgeryname_instance,
                    Surgery_Date=SurgeryDate,
                    Surgery_Time=SurgeryTime,
                    Remarks=Remarks,
                    Reason=Reason,  
                    Priority=Priority,
                    created_by=created_by,
                    Additional_Doctor=doctor_instance if doctor_instance else ""
                )


            return JsonResponse({'success': 'Ot_Request created successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('RegistrationId', None)
            RegisterType = request.GET.get('RegisterType', None)
            
            if registration_id is None or RegisterType is None:
                return JsonResponse({'warn': 'Missing Registration Id or RegisterType'})

            ot_requests = None
            
            if RegisterType == "OP":
                ot_requests = Ot_Request.objects.filter(OP_Register_Id=registration_id)
            elif RegisterType == "IP":
                ot_requests = Ot_Request.objects.filter(IP_Register_Id=registration_id)
            elif RegisterType == "Casuality":
                ot_requests = Ot_Request.objects.filter(Casuality_Register_Id=registration_id)
            else:
                return JsonResponse({'warn': 'Invalid RegisterType'}, status=400)

            # Fetch the related SurgeryName details
            surgery_data = []
            index = 0
            for ot_request in ot_requests:
                additional_doctor_name = None
                if ot_request.Additional_Doctor:
                    # Assuming `Additional_Doctor` is a Doctor_Personal_Form_Detials instance
                    doctor = ot_request.Additional_Doctor
                    additional_doctor_name = f"{doctor.First_Name} {doctor.Middle_Name or ''} {doctor.Last_Name}".strip()

                # Format date and time
                surgery_date = ot_request.Surgery_Date
                if surgery_date:
                    surgery_date = surgery_date.strftime('%d/%m/%Y')  # Format to dd/mm/yyyy

                surgery_time = ot_request.Surgery_Time
                if surgery_time:
                    surgery_time = surgery_time.strftime('%H:%M:%S')  # Format to hh:mm:ss

                surgery_data.append({
                    'id':index+1,
                    'SurgeryName': ot_request.Surgery_Name.Surgery_Name if ot_request.Surgery_Name else None,
                    'SurgeryDate': surgery_date,
                    'SurgeryTime': surgery_time,
                    'Priority': ot_request.Priority,
                    'Remarks': ot_request.Remarks,
                    'Reason': ot_request.Reason,
                    'AdditionalDoctor': additional_doctor_name,
                })
                index +=1

            return JsonResponse(surgery_data, safe=False)

        except Exception as e:
            print(f"An error occurred during GET: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred during GET request'}, status=500)