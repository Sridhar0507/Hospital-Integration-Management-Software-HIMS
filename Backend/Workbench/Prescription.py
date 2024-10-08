from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json
from collections import defaultdict


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_Prescription_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data, 'data--------')

            # Extract common attributes
            created_by = data[0].get('created_by', '')
            registration_id = data[0].get('RegistrationId', '')

            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'})

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Iterate over each prescription in the list and save it
            for prescription in data:
                GenericName = prescription.get('GenericName', '')
                ItemName = prescription.get('ItemName', '')
                Itemtype = prescription.get('itemtype', '')
                Dose = prescription.get('dose', '')
                Route = prescription.get('route', '')
                Frequency = prescription.get('frequency', '')

                # Split duration into number and unit
                Duration = prescription.get('duration', '').split()
                DurationNumber = Duration[0] if len(Duration) > 0 else ''
                DurationUnit = Duration[1] if len(Duration) > 1 else ''

                Qty = prescription.get('qty', '')
                Instruction = prescription.get('instruction', '')
                Doctor_id = prescription.get('Doctor_id', '')

                # Retrieve the Doctor_Personal_Form_Detials instance
                try:
                    doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=Doctor_id)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    return JsonResponse({'error': 'Doctor not found'}, status=404)

                Prescription_instance = Workbench_Prescription(
                    Registration_Id=registration_ins,
                    GenericName=GenericName,
                    ItemName=ItemName,
                    Itemtype=Itemtype,
                    Dose=Dose,
                    Route=Route,
                    Frequency=Frequency,
                    DurationNumber=DurationNumber,
                    DurationUnit=DurationUnit,
                    Qty=Qty,
                    Instruction=Instruction,
                    created_by=created_by,
                    Doctor_Id=doctor_instance  # Assign the correct doctor instance
                )
                Prescription_instance.save()

                print(Prescription_instance, 'Prescription_instance')

            return JsonResponse({'success': 'Prescription Details added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Fetch all prescriptions associated with the registration ID
            prescriptions = Workbench_Prescription.objects.filter(Registration_Id=registration_ins)
            print('prescriptions', prescriptions)
            # Initialize a dictionary to group prescriptions by 'created_by'
            grouped_prescriptions = defaultdict(list)

            # Construct a list of dictionaries containing prescription data
            for presc in prescriptions:
                doctor_ins = presc.Doctor_Id
                print('doctor_ins', presc.Doctor_Id)

            # Retrieve doctor details
                try:
                    doctor_details = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_ins.Doctor_ID)
                    print('doctor_details', doctor_details)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    doctor_details = None

                prescription_info = {
                    'id': presc.Id,
                    'RegistrationId': presc.Registration_Id.pk,
                    'VisitId': presc.Registration_Id.VisitId,
                    'PrimaryDoctorId': presc.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': presc.Registration_Id.PrimaryDoctor.ShortName,
                    'First_Name': doctor_details.First_Name if doctor_details else None,
                    'Middle_Name': doctor_details.Middle_Name if doctor_details else None,
                    'Last_Name': doctor_details.Last_Name if doctor_details else None,
                    'GenericName': presc.GenericName,
                    'ItemName': presc.ItemName,
                    'Itemtype': presc.Itemtype,
                    'Dose': presc.Dose,
                    'Route': presc.Route,
                    'Frequency': presc.Frequency,
                    'DurationNumber': presc.DurationNumber,
                    'DurationUnit': presc.DurationUnit,
                    'Qty': presc.Qty,
                    'Instruction': presc.Instruction,
                    'created_by': presc.created_by,
                    'Date': presc.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time': presc.created_at.strftime('%H:%M:%S'),  # Format time
                }

                # Group by 'created_by'
                grouped_prescriptions[ presc.Registration_Id.PrimaryDoctor.ShortName].append(prescription_info)

            # Convert defaultdict to a regular dict if needed
            grouped_prescriptions = dict(grouped_prescriptions)

            print(grouped_prescriptions, 'Grouped Prescription Data')
            return JsonResponse(grouped_prescriptions, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_Prescription_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print(data,'data--------')
            
#             # Extract and validate data
#             GenericName = data.get('GenericName','')
#             ItemName = data.get('ItemName','')
#             Itemtype = data.get('itemtype','')
#             Dose = data.get('dose','')
#             Route = data.get('route','')
#             Frequency = data.get('frequency','')
#             DurationNumber = data.get('durationNumber','')
#             DurationUnit = data.get('durationUnit','')
#             Qty = data.get('qty','')
#             Instruction = data.get('instruction','')
           
#             created_by = data.get('created_by', '')
#             registration_id = data.get('RegistrationId', '')

#             if not registration_id:
#                 return JsonResponse({'error': 'RegistrationId is required'})

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             Prescription_instance = Workbench_Prescription(
#                 Registration_Id=registration_ins,
#                 GenericName=GenericName,
#                 ItemName=ItemName,
#                 Itemtype=Itemtype,
#                 Dose=Dose,
#                 Route=Route,
#                 Frequency=Frequency,
#                 DurationNumber=DurationNumber,
#                 DurationUnit=DurationUnit,
#                 Qty=Qty,
#                 Instruction=Instruction,
#                 created_by=created_by
#             )
#             Prescription_instance.save()
#             print(Prescription_instance,'Prescription_instance')
#             return JsonResponse({'success': 'Prescription Details added successfully'})
       
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
#             Prescription = Workbench_Prescription.objects.filter(Registration_Id=registration_ins)
            
#             # Construct a list of dictionaries containing location data
#             Prescription_data = [
#                 {
#                     'id': Presc.Id,
#                     'RegistrationId': Presc.Registration_Id.pk,
#                     'VisitId': Presc.Registration_Id.VisitId,
#                     'PrimaryDoctorId': Presc.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': Presc.Registration_Id.PrimaryDoctor.ShortName,
#                     'GenericName': Presc.GenericName,
#                     'ItemName': Presc.ItemName,
#                     'Itemtype': Presc.Itemtype,
#                     'Dose': Presc.Dose,
#                     'Route': Presc.Route,
#                     'Frequency': Presc.Frequency,
#                     'DurationNumber': Presc.DurationNumber,
#                     'DurationUnit': Presc.DurationUnit,
#                     'Qty': Presc.Qty,
#                     'Instruction': Presc.Instruction,
#                     'created_by': Presc.created_by,
#                     'Date' : Presc.created_at.strftime('%Y-%m-%d'),  # Format date
#                     'Time' : Presc.created_at.strftime('%H:%M:%S') , # Format time
#                 } for Presc in Prescription
#             ]
#             print(Prescription_data,'Prescription_data')
#             return JsonResponse(Prescription_data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
#     return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
# def Medical_Stock_InsetLink_for_Prescription(request):
#     if request.method == "GET":
#         try:
#             medical_stock_data = Medical_Stock_FileUpload.objects.all()
#             data = [
#                 {
#                     'id': item.Product_Id,
#                     'Product_Name': item.Product_Name,
#                     'Generic_Name': item.Generic_Name,
#                     'Available_Qantity': item.Available_Qantity,
#                     'Item_Type': item.Item_Type,
#                     'Dosage' : item.Dosage
#                 }
#                 for item in medical_stock_data
#             ]
#             return JsonResponse(data, safe=False)

#         except Exception as e:
#             print(f'An error occurred: {str(e)}')
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)


def Medical_Stock_InsetLink_for_Prescription(request):
    if request.method == "GET":
        try:
            medical_stock_data = pharmacy_stock_location_information.objects.all()
            data = [
                {
                    "id": item.Item_Code,
                    "Product_Name": item.Item_Name,
                    "Generic_Name": item.Generic_Name,
                    "Available_Qantity": item.AvailableQuantity,
                    "Item_Type": item.Pack_type,
                    "Dosage": f"{item.Strength}{item.UOM}",
                }
                for item in medical_stock_data
            ]
            return JsonResponse(data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse(
                {"error": "An internal server error occurred"}, status=500
)



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Doctor_previous_prescripion_details(request):
    if request.method == 'GET':
        try:
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

            try:
               
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)
            
            patient_id = registration_ins.PatientId_id
           

          
            last_registration = Patient_Appointment_Registration_Detials.objects.filter(
                PatientId=patient_id
            ).exclude(pk=registration_id).order_by('-created_at').first() 
            if last_registration:
                last_registration_id = last_registration.pk
                print('last_registration_id', last_registration_id)
            else:
                last_registration_id = None 
            

           
            prescriptions = Workbench_Prescription.objects.filter(Registration_Id = last_registration_id)
            print('prescriptions', prescriptions)
            # Initialize a dictionary to group prescriptions by 'created_by'
            grouped_prescriptions = defaultdict(list)

            # Construct a list of dictionaries containing prescription data
            for presc in prescriptions:
                doctor_ins = presc.Doctor_Id
                print('doctor_ins', presc.Doctor_Id)

            # Retrieve doctor details
                try:
                    doctor_details = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_ins.Doctor_ID)
                    print('doctor_details', doctor_details)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    doctor_details = None

                prescription_info = {
                    'id': presc.Id,
                    'RegistrationId': presc.Registration_Id.pk,
                    'VisitId': presc.Registration_Id.VisitId,
                    'PrimaryDoctorId': presc.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': presc.Registration_Id.PrimaryDoctor.ShortName,
                    'First_Name': doctor_details.First_Name if doctor_details else None,
                    'Middle_Name': doctor_details.Middle_Name if doctor_details else None,
                    'Last_Name': doctor_details.Last_Name if doctor_details else None,
                    'GenericName': presc.GenericName,
                    'ItemName': presc.ItemName,
                    'Itemtype': presc.Itemtype,
                    'Dose': presc.Dose,
                    'Route': presc.Route,
                    'Frequency': presc.Frequency,
                    'DurationNumber': presc.DurationNumber,
                    'DurationUnit': presc.DurationUnit,
                    'Qty': presc.Qty,
                    'Instruction': presc.Instruction,
                    'created_by': presc.created_by,
                    'Date': presc.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time': presc.created_at.strftime('%H:%M:%S'),  # Format time
                }

                # Group by 'created_by'
                grouped_prescriptions[ presc.Registration_Id.PrimaryDoctor.ShortName].append(prescription_info)

            # Convert defaultdict to a regular dict if needed
            grouped_prescriptions = dict(grouped_prescriptions)

            print(grouped_prescriptions, 'Grouped Prescription Data')
            return JsonResponse(grouped_prescriptions, safe=False)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


