import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from Masters.models import *
from decimal import Decimal
from .models import Patient_Appointment_Registration_Detials
from django.shortcuts import render
from .models import Service_Master_Details, Service_Procedure_Charges
from django.db.models import  Q


from django.db import connection, transaction
from .models import Patient_Appointment_Registration_Detials, Patient_Detials
from Workbench.models import Workbench_Prescription
from django.core.serializers import serialize


# -------------------------------------------------------------------------------

     
@csrf_exempt
@require_http_methods(["GET"])
def Get_OP_Billing_Details(request):
    try:
        location = request.GET.get('location')
        Status = request.GET.get('Status','Pending')
        searchBy = request.GET.get('searchBy')
        
         
            
        Get_OPBilling_instance=OP_Billing_QueueList_Detials.objects.filter(
           ( Q(Registration_Id__PatientId__PatientId__icontains=searchBy)|
            Q(Registration_Id__PatientId__PhoneNo__icontains=searchBy)|
            Q(Registration_Id__PatientId__FirstName__icontains=searchBy)) &
            Q(Status=Status,Registration_Id__Location=location) 
        )

        Billing_data=[]

        for row in Get_OPBilling_instance:
           
           full_name = f"{row.Registration_Id.PatientId.FirstName} {row.Registration_Id.PatientId.MiddleName} {row.Registration_Id.PatientId.SurName}"

           formatted_date = row.created_at.strftime("%d/%b/%Y")

           Billing_data.append({    
                'id':row.BillingQueueList_ID,
                'Status': row.Status,
                'Date': formatted_date,
                'Registration_Id':row.Registration_Id.Registration_Id,
                'PatientId':row.Registration_Id.PatientId.PatientId,
                'PhoneNo':row.Registration_Id.PatientId.PhoneNo,
                'Patient_Name':full_name.strip(),
                'VisitPurpose':row.Registration_Id.VisitPurpose,
                'PatientType':row.Registration_Id.PatientType,
                'PatientCategory':row.Registration_Id.PatientCategory,
                'Doctor_ShortName':row.Doctor_Ratecard_Id.Doctor_ID.ShortName,
            })

        return JsonResponse (Billing_data,safe=False)
    except Exception  as e:
        print({'error':str(e)})
        return JsonResponse ({'error':str(e)})


@csrf_exempt
@require_http_methods(["GET"])
def Get_OP_Billing_Details_SingleId(request):
    try:
        QueueList_ID=request.GET.get('QueueList_ID')

        if not QueueList_ID:
            return JsonResponse({'error':'QueueList_ID is required'},status=400)
        try:
            row =OP_Billing_QueueList_Detials.objects.get(BillingQueueList_ID=QueueList_ID)
        
        except OP_Billing_QueueList_Detials.DoesNotExist:
            return JsonResponse ({'error': 'Billing data not found'}, status=404)


           
        full_name = f"{row.Registration_Id.PatientId.FirstName}"

        formatted_date = row.created_at.strftime("%d/%b/%Y")

        Billing_data={    
                'id':row.BillingQueueList_ID,
                'Billing_Type': row.Billing_Type,
                'ServiceName':row.Registration_Id.VisitPurpose,
                'Status': row.Status,
                'Date': formatted_date,
                'Registration_Id':row.Registration_Id.Registration_Id,
                'PatientId':row.Registration_Id.PatientId.PatientId,
                'PhoneNo':row.Registration_Id.PatientId.PhoneNo,
                'Patient_Name':full_name.strip(),
                'Gender':row.Registration_Id.PatientId.Gender,
                'DoorNo':row.Registration_Id.PatientId.DoorNo,
                'Age':row.Registration_Id.PatientId.Age,
                'Street':row.Registration_Id.PatientId.Street,
                'Area':row.Registration_Id.PatientId.Area,
                'City':row.Registration_Id.PatientId.City,
                'State':row.Registration_Id.PatientId.State,
                'Country':row.Registration_Id.PatientId.Country,
                'Pincode':row.Registration_Id.PatientId.Pincode,
                'VisitId':row.Registration_Id.VisitId,
                'PatientType':row.Registration_Id.PatientType,
                'PatientCategory':row.Registration_Id.PatientCategory,
                'Doctor_ID':row.Doctor_Ratecard_Id.Doctor_ID.Doctor_ID,
                'Doctor_ShortName':row.Doctor_Ratecard_Id.Doctor_ID.ShortName,
            }
        if Billing_data['PatientCategory'] == 'General':
            if Billing_data['ServiceName'] == 'NewConsultation':
                Billing_data['Service_Fee'] = row.Doctor_Ratecard_Id.General_Consultation_Fee
            elif Billing_data['ServiceName'] == 'FollowUp':
                Billing_data['Service_Fee'] = row.Doctor_Ratecard_Id.General_Follow_Up_Fee
        
        elif Billing_data['PatientCategory'] == 'Special':
            if Billing_data['ServiceName'] == 'NewConsultation':
                Billing_data['Service_Fee'] = row.Doctor_Ratecard_Id.Special_Consultation_Fee
            elif Billing_data['ServiceName'] == 'FollowUp':
                Billing_data['Service_Fee'] = row.Doctor_Ratecard_Id.Special_Follow_Up_Fee
        
        return JsonResponse(Billing_data, safe=False)
    except Exception  as e:
        print({'error':str(e)})
        return JsonResponse ({'error':str(e)})


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def GeneralBilling_Link(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            # Extract data from the request
            billAmount = data.get('billAmount', [])
            SelectedPatient_list = data.get('SelectedPatient_list', {})
            NetAmount_CDmethod = data.get('NetAmount_CDmethod', {})
            SelectDatalist = data.get('SelectDatalist', [])
            BillingData = data.get('BillingData', {})
            initialState = data.get('initialState', {})
            Created_by = data.get('Created_by', '')
            Location = data.get('Location', '')
            selectedOption = data.get('selectedOption', '')


            # Fetch related foreign key objects
            try:
                doctor = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=BillingData.get('DoctorId'))
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Doctor not found'})
            except MultipleObjectsReturned:
                return JsonResponse({'error': 'Multiple doctors found'})

            try:
                patient = Patient_Detials.objects.get(PatientId=SelectedPatient_list.get('PatientId'))
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Patient not found'})
            except MultipleObjectsReturned:
                return JsonResponse({'error': 'Multiple patients found'})

            try:
                register = Patient_Appointment_Registration_Detials.objects.get(Registration_Id=SelectedPatient_list.get('RegisterId'))
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Registration not found'})
            except MultipleObjectsReturned:
                return JsonResponse({'error': 'Multiple registrations found'})

            try:
                visit = Patient_Visit_Detials.objects.get(
                    PatientId=SelectedPatient_list.get('PatientId'),
                    VisitId=SelectedPatient_list.get('VisitId')
                )
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Patient visit details not found'})
            except MultipleObjectsReturned:
                return JsonResponse({'error': 'Multiple patient visit details found'})

            # Convert to Decimal
            def to_decimal(value):
                try:
                    return float(value)
                except (TypeError, ValueError):
                    return Decimal('0.00')

            # Create and save the General Billing entry
            general_billing = General_Billing_Table_Detials(
                Billing_Date=BillingData.get('InvoiceDate'),
                Doctor_Id=doctor,
                Patient_Id=patient,
                Register_Id=register,
                Visit_Id=visit,
                Billing_Type=NetAmount_CDmethod.get('Method'),
                Select_Discount=NetAmount_CDmethod.get('Method'),
                Discount_Type=NetAmount_CDmethod.get('Method'),
                Discount_Value=to_decimal(NetAmount_CDmethod.get('Amount')),
                Discount_Amount=to_decimal(initialState.get('totalDiscount')),
                Total_Items=int(initialState.get('totalItems')),
                Total_Qty=int(initialState.get('totalUnits')),
                Total_Amount=to_decimal(initialState.get('totalTaxable')),
                Total_GSTAmount=to_decimal(initialState.get('totalGstamount')),
                Net_Amount=to_decimal(initialState.get('totalNetAmount')),
                Round_Off=to_decimal(initialState.get('Roundoff')),
                Paid_Amount=to_decimal(initialState.get('PaidAmount')),
                Balance_Amount=to_decimal(initialState.get('BalanceAmount')),
                Bill_Status="Paid",
                created_by=Created_by,
            )
            general_billing.save()

            # Save each item in the General Billing Items Table Details
            for item in SelectDatalist:
                general_billing_item = General_Billing_Items_Table_Detials(
                    Billing_Invoice_No=general_billing,
                    Service_Type=item.get('ServiceType'),
                    Service_Code=item.get('Servicecode'),
                    Service_Name=item.get('SelectItemName'),
                    Rate=to_decimal(item.get('Rate')),
                    Charge=to_decimal(item.get('Charges')),
                    Quantity=int(item.get('Quantity')),
                    Amount=to_decimal(item.get('Amount')),
                    Discount_Type=item.get('DiscountType'),
                    Discount_Value=to_decimal(item.get('Discount')),
                    Discount_Amount=to_decimal(item.get('DiscountAmount')),
                    Taxable_Amount=to_decimal(item.get('Amount')),
                    Tax_Percentage=to_decimal(item.get('GST')) if item.get('GST') else Decimal('0.00'),
                    Tax_Amount=to_decimal(item.get('GSTamount')),
                    Total_Amount=to_decimal(item.get('Total')),
                    Item_Status="Paid",
                )
                general_billing_item.save()

            # Save multiple payment details
            for payment in billAmount:
                multiple_payment = Multiple_Payment_Table_Detials(
                    Invoice_No=general_billing,
                    Payment_Type=payment.get('Billpay_method'),
                    Cart_Type=payment.get('CardType'),
                    Cheque_No=payment.get('ChequeNo'),
                    Bank_Name=payment.get('BankName'),
                    Amount=to_decimal(payment.get('paidamount')),
                )
                multiple_payment.save()

            # Update the billing queue list status
            if SelectedPatient_list.get('QueueList_ID'):
                try:
                    billing_queue_list_instance = OP_Billing_QueueList_Detials.objects.get(BillingQueueList_ID=SelectedPatient_list.get('QueueList_ID'))
                    billing_queue_list_instance.Status = 'Completed'
                    billing_queue_list_instance.save()
                except ObjectDoesNotExist:
                    return JsonResponse({'error': 'Billing Queue List not found'})
                except MultipleObjectsReturned:
                    return JsonResponse({'error': 'Multiple Billing Queue List instances found'})

            return JsonResponse({'status': 'success', 'message': 'Billing details saved successfully','InvoiceNo':general_billing.Billing_Invoice_No})

        except Exception as e:
            print({'error':str(e)})
            return JsonResponse({'error': str(e)})
    
    elif request.method == "GET":
        try:
            general_billing_data = General_Billing_Table_Detials.objects.all()
            response_data = []

            for row in general_billing_data:
                # Construct the patient's full name
                full_name = f"{row.Patient_Id.FirstName} {row.Patient_Id.MiddleName or ''} {row.Patient_Id.SurName}".strip()

                # Prepare the general billing details
                billing_details = {
                    'id': row.Billing_Invoice_No,
                    'Billing_Date': row.Billing_Date,
                    'Doctor_Id': row.Doctor_Id.Doctor_ID,
                    'Doctor_Name': row.Doctor_Id.ShortName,
                    'Patient_Id': row.Patient_Id.PatientId,
                    'Patient_Name': full_name,
                    'PhoneNumber': row.Patient_Id.PhoneNo,
                    'Register_Id': row.Register_Id.Registration_Id,
                    'Visit_Id': row.Visit_Id.VisitId,
                    'Billing_Type': row.Billing_Type,
                    'Net_Amount': row.Net_Amount,
                    'Bill_Status': row.Bill_Status,
                    'Billing_Items': [],
                    'Payment_Details': [],
                }

                # Fetch related billing items
                billing_items = General_Billing_Items_Table_Detials.objects.filter(Billing_Invoice_No=row.Billing_Invoice_No)
                for item in billing_items:
                    item_details = {
                        'Service_Type': item.Service_Type,
                        'Service_Code': item.Service_Code,
                        'Service_Name': item.Service_Name,
                        'Rate': item.Rate,
                        'Charge': item.Charge,
                        'Quantity': item.Quantity,
                        'Amount': item.Amount,
                        'Discount_Type': item.Discount_Type,
                        'Discount_Value': item.Discount_Value,
                        'Discount_Amount': item.Discount_Amount,
                        'Taxable_Amount': item.Taxable_Amount,
                        'Tax_Percentage': item.Tax_Percentage,
                        'Tax_Amount': item.Tax_Amount,
                        'Total_Amount': item.Total_Amount,
                    }
                    billing_details['Billing_Items'].append(item_details)

                # Fetch related payment details
                payment_details = Multiple_Payment_Table_Detials.objects.filter(Invoice_No=row.Billing_Invoice_No)
                for payment in payment_details:
                    payment_info = {
                        'Payment_Type': payment.Payment_Type,
                        'Cart_Type': payment.Cart_Type,
                        'Cheque_No': payment.Cheque_No,
                        'Bank_Name': payment.Bank_Name,
                        'Amount': payment.Amount,
                    }
                    billing_details['Payment_Details'].append(payment_info)

                # Add the billing details to the response data
                response_data.append(billing_details)

            return JsonResponse(response_data, safe=False)

        except Exception as e:
            print({'error': str(e)})
            return JsonResponse({'error': str(e)})

            

    return JsonResponse({'status': 'failure', 'message': 'Invalid request method'})



@csrf_exempt
@require_http_methods(["GET"])
def Filter_Patient_data_For_Billing(request):
    try:
        first_name = request.GET.get("FirstName", None)
        phone_no = request.GET.get("PhoneNo", None)
        patient_id = request.GET.get("PatientId", None)

        filter_Conditions=Q()

        if first_name:
            filter_Conditions &= Q(FirstName__icontains=first_name)
        if phone_no:
            filter_Conditions &= Q(PhoneNo__icontains=phone_no)
        if patient_id:
            filter_Conditions &= Q(PatientId__icontains=patient_id)

        patients = Patient_Detials.objects.filter(filter_Conditions,DuplicateId=False)
        print('patients :', patients)

        patient_data = [
            {
                'PatientId': patient.PatientId,
                'PhoneNo': patient.PhoneNo,
                'FirstName': patient.FirstName,
                'Gender':patient.Gender,
                'DoorNo':patient.DoorNo,
                'Age':patient.Age,
                'Street':patient.Street,
                'Area':patient.Area,
                'City':patient.City,
                'State':patient.State,
                'Country':patient.Country,
                'Pincode':patient.Pincode,

            } for patient in patients
        ]

       
        return JsonResponse(patient_data, safe=False)

    
    except Exception as e:
        print({f'error:{str(e)}'})
        return JsonResponse({'error':'An internal server error occurred'},status=500)


 
# @csrf_exempt
# def get_merged_service_data(request):
#     services = Service_Master_Details.objects.exclude(Department='IP').values(
#         'Service_Id', 'Service_Name', 'Department', 'IsGst', 'GstValue', 'Status', 'created_by', 'created_at', 'updated_at'
#     )
#     charges = Service_Procedure_Charges.objects.select_related(
#         'Service_ratecard', 'Procedure_ratecard', 'Location'
#     ).all().values(
#         'MasterType', 'Service_ratecard__Service_Id', 'Service_ratecard__Service_Name', 'Procedure_ratecard__Procedure_Name', 'Location__Location_Name',
#         'General_Prev_fee', 'General_fee', 'Special_Prev_fee', 'Special_fee'
#     )
#     merged_data = []

#     service_dict = {service['Service_Id']: service for service in services}
    
#     for charge in charges:
#         if charge['MasterType'] == 'Service':
#             service_id = charge['Service_ratecard__Service_Id']
#             service_info = service_dict.get(service_id, {})
#             merged_data.append({
#                 'Type': 'Service',
#                 'Service_Id': service_id,
#                 'Service_Name': charge['Service_ratecard__Service_Name'],
#                 'GstValue': service_info.get('GstValue', 'N/A'),
#                 'Location': charge['Location__Location_Name'],
#                 'General_Prev_fee': charge['General_Prev_fee'],
#                 'General_fee': charge['General_fee'],
#                 'Special_Prev_fee': charge['Special_Prev_fee'],
#                 'Special_fee': charge['Special_fee']
#             })
#         elif charge['MasterType'] == 'Procedure':
#             merged_data.append({
#                 'Type': 'Procedure',
#                 'Procedure_Name': charge['Procedure_ratecard__Procedure_Name'],
#                 'Location': charge['Location__Location_Name'],
#                 'General_Prev_fee': charge['General_Prev_fee'],
#                 'General_fee': charge['General_fee'],
#                 'Special_Prev_fee': charge['Special_Prev_fee'],
#                 'Special_fee': charge['Special_fee']
#             })
    
#     return JsonResponse(merged_data,safe=False)





@csrf_exempt
def get_merged_service_data(request):
    try:
        selectedOption = request.GET.get('selectedOption')
        location = request.GET.get('location')
        PatientCategory = request.GET.get('PatientCategory')
        PatientCategoryType = request.GET.get('PatientCategoryType', None)
        ServiceType = request.GET.get('ServiceType', 'Interventional')
        merged_data = []
        
        if selectedOption == 'OPDServices':
            ser_pro_inss = Service_Master_Details.objects.filter(Status=True).exclude(Department='IP')
        else:
            ser_pro_inss = Procedure_Master_Details.objects.filter(Status=True, Type=ServiceType)
        
        for inss in ser_pro_inss:
            data = {
                'Service_Id': inss.pk,
                'Service_Name': inss.Service_Name if selectedOption == 'OPDServices' else inss.Procedure_Name,
                'GstValue': inss.GstValue if inss.IsGst == 'Yes' else "Nill"
            }

            # Filter conditions
            filter_conditions = Q()
            if selectedOption == 'OPDServices':
                filter_conditions &= Q(Service_ratecard__pk=inss.pk, Location__pk=location)
            elif selectedOption == 'OPDProcedures':
                filter_conditions &= Q(Procedure_ratecard__pk=inss.pk, Location__pk=location)

            try:
                inss_ser_pro = Service_Procedure_Charges.objects.get(filter_conditions)
                charges_gen_spe = Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=inss_ser_pro)

                if PatientCategory == 'General':
                    data['charge'] = charges_gen_spe.General_fee
                elif PatientCategory == 'Special':
                    data['charge'] = charges_gen_spe.Special_fee
                elif PatientCategory == 'Insurance' and PatientCategoryType:
                    ins_ins = Service_Procedure_InsuranceFee.objects.get(Service_Procedure_ratecard=inss_ser_pro, insurance__pk=PatientCategoryType)
                    data['charge'] = ins_ins.fee
                elif PatientCategory == 'Client' and PatientCategoryType:
                    cli_ins = Service_Procedure_ClientFee.objects.get(Service_Procedure_ratecard=inss_ser_pro, client__pk=PatientCategoryType)
                    data['charge'] = cli_ins.fee

            except Service_Procedure_Charges.DoesNotExist:
                data['charge'] = ""
            except Service_Procedure_Rate_Charges.DoesNotExist:
                data['charge'] = ""
            except (Service_Procedure_InsuranceFee.DoesNotExist, Service_Procedure_ClientFee.DoesNotExist):
                data['charge'] = ""

            merged_data.append(data)
        
        return JsonResponse(merged_data, safe=False)

    except Exception as e:
        print(f'error: {str(e)}')
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)

        
    
    

@csrf_exempt
def get_latest_appointment_for_patient(request):
    try:
        patient_id = request.GET.get('PatientId')
        latest_appointment = Patient_Appointment_Registration_Detials.objects.filter(PatientId=patient_id).order_by('-Registration_Id').first()

        if latest_appointment:
            appointment_data = {
                'Registration_Id': latest_appointment.Registration_Id,
                'VisitId': latest_appointment.VisitId,
            }

            return JsonResponse(appointment_data, safe=False)
        else:
            return JsonResponse({'error': 'No appointments found for this patient.'}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)








#  For  Pharmacy Billing Op



def get_prescription(request):
    try:
        # Retrieve PatientID from request
        PatientID = request.GET.get('PatientID')
        print('PatientID :',PatientID)
        VisitID=request.GET.get('VisitID')
        # Check if PatientID is provided
        if not PatientID:
            return JsonResponse({"error": "PatientID parameter is required"}, status=400)

        # Fetch patient details to get the Patient Name
        patient = Patient_Detials.objects.get(PatientId=PatientID)
        PatientName = f"{patient.FirstName} {patient.MiddleName} {patient.SurName}"

        registration = Patient_Appointment_Registration_Detials.objects.get(
            PatientId_id =PatientID, VisitId=VisitID
        )



        # Query the prescriptions related to the PatientID
        prescriptions = Workbench_Prescription.objects.filter(
            Registration_Id_id =registration
        ).select_related('Doctor_Id', 'Registration_Id')

        # Prepare the list of prescriptions in the specified format
        prescription_list = []
        for prescription in prescriptions:
            registration = prescription.Registration_Id
            try:
                location = Location_Detials.objects.get(Location_Id=registration.Location_id)
                location_name = location.Location_Name
            except ObjectDoesNotExist:
                location_name = "N/A"
            
            doctor = prescription.Doctor_Id
            prescription_dict = {
                'PrescriptionID': prescription.Id,
                'PatientID': PatientID,
                'VisitID': registration.VisitId,
                'AppointmentDate': registration.created_at.date().isoformat(),  # or any other date field you want to use
                'DoctorName': f"{doctor.First_Name} {doctor.Last_Name}" if doctor else "N/A",
                'GenericName': prescription.GenericName,
                'ItemName': prescription.ItemName,
                'Dose': prescription.Dose,
                'Route': prescription.Route,
                'Frequency': prescription.Frequency,
                'Duration': f"{prescription.DurationNumber} {prescription.DurationUnit}",
                'Qty': prescription.Qty,
                'Instruction': prescription.Instruction,
                'Status': registration.Status,
                'LoggedBy': prescription.created_by,
                'Location': location_name,
                'CreatedAt': prescription.created_at.date().isoformat(),
                'Patient_Name': PatientName
            }
            prescription_list.append(prescription_dict)

        return JsonResponse(prescription_list, safe=False)

    except ObjectDoesNotExist:
        return JsonResponse({"error": "Patient not found"})
    except Exception as e:
        print('error:', str(e))
        return JsonResponse({"error": "Internal Server Error: " + str(e)})
    

    
def get_prescriptionqueue(request):
    try:
        # Fetch all prescriptions with related data
        prescriptions = Workbench_Prescription.objects.select_related(
            'Doctor_Id'  # Related doctor details
        ).all()

        # Serialize the prescriptions queryset to JSON
        serialized_prescriptions = serialize('json', prescriptions, use_natural_primary_keys=True)
        
        # Convert serialized data to Python dict
        serialized_data = json.loads(serialized_prescriptions)

        # Dictionary to hold unique patient details
        patient_data = {}
        
        id = 1
        # Enhance the serialized data with additional details
        for item in serialized_data:
            fields = item['fields']
            registration_id = fields.get('Registration_Id')
            doctor_id = fields.get('Doctor_Id')
            
            # Get PatientId using Registration_Id
            appointment = Patient_Appointment_Registration_Detials.objects.filter(id=registration_id).first()
            if appointment:
                patient_id = appointment.PatientId.PatientId
            else:
                patient_id = None
            
            if patient_id:
                if registration_id not in patient_data:
                    patient = Patient_Detials.objects.filter(PatientId=patient_id).first()
                    if patient:
                        # Fetch doctor details
                        doctor = Doctor_Personal_Form_Detials.objects.filter(Doctor_ID=doctor_id).first()
                        doctor_name = f"{doctor.First_Name} {doctor.Last_Name}" if doctor else ''
                        
                        patient_data[registration_id] = {
                            'Patient_Name': f"{patient.FirstName} {patient.MiddleName} {patient.SurName}",
                            'PatientPhoneNo': patient.PhoneNo,
                            'PatientEmail': patient.Email,
                            'PatientCity': patient.City,
                            'PatientState': patient.State,
                            'PatientCountry': patient.Country,
                            'VisitID': appointment.VisitId if appointment else '',
                            'DoctorName': doctor_name,
                            'id': id,
                            'PatientID': patient.PatientId 
                        }
            id += 1    
        # Convert patient data dictionary to list
        enhanced_data = list(patient_data.values())
        
        # Return the enhanced serialized data
        return JsonResponse(enhanced_data, safe=False)

    except Exception as e:
        print('error:', str(e))
        return JsonResponse({"error": "Internal Server Error: " + str(e)}, status=500)
    
    
    
@csrf_exempt
def get_personal_info(request):
    try:
        

        patientdata = Patient_Detials.objects.all()
        serialized_prescriptions = serialize('json', patientdata, use_natural_primary_keys=True)
        
        # Convert serialized data to Python dict
        serialized_data = json.loads(serialized_prescriptions)

        cleaned_data = [
            {
                **item['fields'],
                'PatientId': item['pk'] 
            }
            for item in serialized_data
        ]

        return JsonResponse(cleaned_data, safe=False)


    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Internal Server Error: ' + str(e)},
                            status=500)
    

@csrf_exempt
def get_quick_list(request):
    try:
        # Get location id from query parameters
        location_id = request.GET.get('location')
        
        location = Location_Detials.objects.filter(Location_Id=location_id).first()

        if not location:
            return JsonResponse({'error': 'Location not found'}, status=404)

        stock_query = pharmacy_stock_location_information.objects.filter(Location=location.Location_Name)

        serialized_stock = serialize('json', stock_query, use_natural_primary_keys=True)
        
        serialized_data = json.loads(serialized_stock)
        
        cleaned_data = [
            {
                **item['fields']
            }
            for item in serialized_data
        ]

        return JsonResponse(cleaned_data, safe=False)

        
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Internal Server Error: ' + str(e)})
    
    
@csrf_exempt
def get_name(request):
    try:
        item_name = request.GET.get('ItemName')  
        batch_no = request.GET.get('BatchNo') 
        location = request.GET.get('location')  
        
        location = Location_Detials.objects.get(Location_Id=location)
        print('location :',location)
        if not location:
            return JsonResponse({'error': f'Location {location} not found'}, status=404)
        
        stock_query = pharmacy_stock_location_information.objects.filter(Location=location.Location_Name,Item_Name=item_name,Batch_No=batch_no)
       
        
        serialized_stock = serialize('json', stock_query, use_natural_primary_keys=True)
        # cleaned_data = [
        #     {
        #         **item['fields']
        #     }
        #     for item in serialized_stock
        # ]
        serialized_data = json.loads(serialized_stock)

        return JsonResponse(serialized_data, safe=False)
    
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Internal Server Error: ' + str(e)}, status=500)
    



# def get_prescription_forIP(request):
#     try:
#         # Retrieve PatientID from request
#         PatientID = request.GET.get('PatientID')
#         VisitID = request.GET.get('VisitID')

#         # Check if PatientID and VisitID are provided
#         if not PatientID:
#             return JsonResponse({"error": "PatientID parameter is required"}, status=400)
#         if not VisitID:
#             return JsonResponse({"error": "VisitID parameter is required"}, status=400)

#         # Fetch patient details to get the Patient Name
#         patient = Patient_Detials.objects.get(PatientId=PatientID)
#         PatientName = f"{patient.FirstName} {patient.MiddleName} {patient.SurName}"

#         # Query the prescriptions related to the VisitID (Registration_Id_id)
#         prescriptions = ip_drug_request_table.objects.filter(Booking_Id=VisitID)

#         # Prepare the list of prescriptions in the specified format
#         prescription_list = []
#         for prescription in prescriptions:
#             prescription_dict = {
#                 'PrescriptionID': prescription.Drug_Request_Id,
#                 'PatientID': PatientID,
#                 'VisitID': VisitID,  # Mapping VisitID as Registration_Id
#                 'Booking_Id': prescription.Booking_Id,
#                 # 'AppointmentDate': prescription.CreatedAt.date().isoformat(),  # Date of prescription creation
#                 'DoctorName': prescription.DoctorName,
#                 'GenericName': prescription.GenericName,
#                 'ItemName': prescription.MedicineName,
#                 'Dose': prescription.Dosage,
#                 'Route': prescription.Route,
#                 'Frequency': prescription.Duration,  # Assuming Frequency is in Duration
#                 'Duration': prescription.DurationType,
#                 'Qty': prescription.RequestQuantity,
#                 'Instruction': prescription.RequestType,  # Assuming RequestType includes instructions
#                 'Status': prescription.Status,
#                 'LoggedBy': prescription.CreatedBy,
#                 # 'CreatedAt': prescription.CreatedAt.date().isoformat(),
#                 'Patient_Name': PatientName
#             }
#             prescription_list.append(prescription_dict)

#         return JsonResponse(prescription_list, safe=False)

#     except Patient_Detials.DoesNotExist:
#         return JsonResponse({"error": "Patient not found"}, status=404)
#     except Exception as e:
#         print('error:', str(e))
#         return JsonResponse({"error": "Internal Server Error: " + str(e)}, status=500)



# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.db import connection

# @csrf_exempt
# def Post_Ip_PharmacyBilling_table(request):
#     if request.method == 'POST':
#         try:
#             # Extract prescription barcode from the form
#             prescription_barcode = request.POST.get('Priscription_Barcode', None)
            
#             # Extract medicines data
#             Billing_itemtable = []
#             index = 0
#             while True:
#                 item_id = request.POST.get(f'ItemId_{index}', None)
#                 quantity = request.POST.get(f'Billing_Quantity_{index}', None)
#                 if item_id is None and quantity is None:
#                     break
#                 Billing_itemtable.append({
#                     'ItemId': item_id,
#                     'Billing_Quantity': quantity
#                 })
#                 index += 1

#             # Database operations
#             with connection.cursor() as cursor:
#                 if prescription_barcode:
#                     # Update the status of the prescription barcode
#                     update_query_ip = """
#                         UPDATE Ip_Drug_Request_Table
#                         SET Status = 'Completed'
#                         WHERE Priscription_Barcode = %s
#                     """
#                     cursor.execute(update_query_ip, [prescription_barcode])

#                     # Update quantities for each medicine item
#                     for item in Billing_itemtable:
#                         item_id = item.get('ItemId')
#                         quantity = item.get('Billing_Quantity')
#                         if item_id and quantity is not None:
#                             update_query_item = """
#                                 UPDATE Ip_Drug_Request_Table
#                                 SET RecivedQuantity = %s
#                                 WHERE Priscription_Barcode = %s AND MedicineCode = %s
#                             """
#                             cursor.execute(update_query_item, [quantity, prescription_barcode, item_id])

#                     response_data = {'message': 'Data updated successfully'}
#                     return JsonResponse(response_data)
#                 else:
#                     return JsonResponse({'error': 'Prescription barcode is missing'}, status=400)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)



