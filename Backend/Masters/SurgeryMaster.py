import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from django.db.models import Sum, Max, Q

import random
import string
from django.db import transaction
from decimal import Decimal

# ------------------------Surgery_master-------------



@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Surgery_Names_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("123", data)
            SurgeryNameId = data.get('SurgeryNameId', None)
            SurgeryName = data.get('SurgeryName', '')
            Speciality = data.get('Speciality', '')
            Location = data.get('Location', None)
            Duration = data.get('Duration', '')
            EstimateCost = data.get('Cost', '')
            AnesthesiaType = data.get('AnesthesiaType', '')
            Statusedit = data.get('Statusedit', False)

            # Handling existing surgery update
            if SurgeryNameId:
                try:
                    surgery_instance = SurgeryName_Details.objects.get(Surgery_Id=SurgeryNameId)
                except SurgeryName_Details.DoesNotExist:
                    return JsonResponse({'warn': 'SurgeryName not found'}, status=404)

                # Handle status edit
                if Statusedit:
                    try:
                        surgery_instance = SurgeryName_Details.objects.get(pk=SurgeryNameId)
                        surgery_instance.Status = not surgery_instance.Status
                        surgery_instance.save()
                        return JsonResponse({'success': 'SurgeryName status updated successfully'})
                    except SurgeryName_Details.DoesNotExist:
                        return JsonResponse({'error': f"No entry found with SurgeryName '{SurgeryNameId}'."})
                else:
                    # Update fields
                    try:
                        surgery_instance.Speciality_Name = Speciality_Detials.objects.get(pk=Speciality)
                    except Speciality_Detials.DoesNotExist:
                        return JsonResponse({'warn': 'Invalid Speciality'}, status=404)

                    surgery_instance.Surgery_Name = SurgeryName
                    surgery_instance.Duration_Hours = Duration
                    surgery_instance.Estimate_Cost = EstimateCost
                    surgery_instance.Anesthesia_Type = AnesthesiaType

                surgery_instance.save()
                return JsonResponse({'success': 'Surgery details updated successfully'}, status=200)

            else:
                # Handling new surgery creation
                if not Location:
                    return JsonResponse({'warn': 'Location is required'}, status=400)

                try:
                    Location_instance = Location_Detials.objects.get(pk=Location)
                except Location_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'Invalid Location'}, status=404)

                try:
                    Speciality_instance = Speciality_Detials.objects.get(pk=Speciality)
                except Speciality_Detials.DoesNotExist:
                    return JsonResponse({'warn': 'Invalid Speciality'}, status=404)

                if SurgeryName_Details.objects.filter(Surgery_Name=SurgeryName).exists():
                    return JsonResponse({'warn': f"The SurgeryName '{SurgeryName}' already exists"}, status=400)

                # Create a new SurgeryName instance
                surgery_instance = SurgeryName_Details(
                    Location_Name=Location_instance,
                    Speciality_Name=Speciality_instance,
                    Surgery_Name=SurgeryName,
                    Duration_Hours=Duration,
                    Estimate_Cost=EstimateCost,
                    Anesthesia_Type=AnesthesiaType
                )
                surgery_instance.save()

                return JsonResponse({'success': 'New surgery created successfully'}, status=201)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    elif request.method == 'GET':
        try:
            surgery_names = SurgeryName_Details.objects.all().select_related('Location_Name', 'Speciality_Name')


            surgery_list = []
            for surgery in surgery_names:
                surgery_list.append({
                    'id': surgery.Surgery_Id,
                    'Surgery_Name': surgery.Surgery_Name,
                    'Speciality_Name': surgery.Speciality_Name.Speciality_Name if surgery.Speciality_Name else None,
                    'Location_Name': surgery.Location_Name.Location_Name if surgery.Location_Name else None,
                    'Location_Id': surgery.Location_Name.Location_Id,
                    'Speciality_Id': surgery.Speciality_Name.Speciality_Id,
                    'Duration_Hours': surgery.Duration_Hours,
                    'Estimate_Cost': surgery.Estimate_Cost,
                    'Anesthesia_Type': surgery.Anesthesia_Type,
                    'Status': 'Active' if surgery.Status else 'Inactive',
                })
             

            return JsonResponse(surgery_list, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)





# otrequest

@csrf_exempt
@require_http_methods(["GET", "OPTIONS"])
def Surgeryname_Speciality_link(request):
    if request.method == 'GET':
        try:
            speciality_name = request.GET.get('Speciality', None)
            
            if not speciality_name:
                return JsonResponse({'warn': 'Missing Speciality'})

            # Assuming Speciality_Id is the primary key or you're filtering by it
            speciality_obj = Speciality_Detials.objects.filter(Speciality_Id=speciality_name).first()

            if not speciality_obj:
                return JsonResponse({'warn': 'Speciality not found'})

            # Filter SurgeryName_Details based on the matched Speciality
            surgery_names = SurgeryName_Details.objects.filter(Speciality_Name=speciality_obj, Status=True).values('Surgery_Id', 'Surgery_Name')

            if surgery_names.exists():
                return JsonResponse(list(surgery_names), safe=False)
            else:
                return JsonResponse({'warn': 'No surgeries found for the given speciality'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
@require_http_methods(["GET", "OPTIONS"])
def Surgeryname_Speciality_Doctor_link(request):
    if request.method == 'GET':
        try:
            # Get Speciality from the request
            speciality_name = request.GET.get('Speciality', None)
            
            if not speciality_name:
                return JsonResponse({'warn': 'Missing Speciality'}, status=400)

            # Debugging information to ensure the Speciality parameter is correct
            print(f"Received Speciality: {speciality_name}")

            # Check if the Speciality_Detials object exists
            speciality= Speciality_Detials.objects.filter(Speciality_Id=speciality_name).first()



            # Filter Doctor_ProfessForm_Detials by Specialization
            doctor_profess_forms = Doctor_ProfessForm_Detials.objects.filter(Specialization=speciality).select_related('Doctor_ID')

            # Check if any doctors are found for this speciality
            if not doctor_profess_forms.exists():
                return JsonResponse({'warn': 'No doctors found for the given speciality'}, status=404)

            # Prepare response data
            doctor_data = []
            for doctor in doctor_profess_forms:
                doctor_personal = doctor.Doctor_ID  # Directly access the related Doctor_Personal_Form_Detials

                if doctor_personal:
                    # Formatting the full doctor name
                    full_name = f"{doctor_personal.Tittle} {doctor_personal.First_Name} {doctor_personal.Middle_Name} {doctor_personal.Last_Name}".strip()
                    doctor_data.append({
                        'Doctor_ID': doctor_personal.Doctor_ID,
                        'Doctor_Name': full_name
                    })

            # Return doctor data if found
            return JsonResponse(doctor_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)