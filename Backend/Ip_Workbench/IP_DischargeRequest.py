from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *





@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_DischargeRequest_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            print(data,'dataaaaaaaaaa')
            RegistrationId = data.get("RegistrationId")
            Speciality = data.get("Speciality")
            DoctorName = data.get('DoctorName')
            SisterIncharge = data.get('SisterIncharge')
            Reason = data.get('Reason')
            Remarks = data.get('Remarks')
            
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'})
            
            if DoctorName:
                doc_ins =Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk = DoctorName)
            # Save DischargeRequest details
            DischargeRequest_instance = IP_DischargeRequest_Details(
                Registration_Id=registration_ins,
                SisterIncharge=SisterIncharge,
                Reason=Reason,
                Remarks=Remarks,
                Doctor_Id=doc_ins,
                Created_by=createdby,
            )
            DischargeRequest_instance.save()
            
            return JsonResponse({'success': 'DischargeRequest details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})

    elif request.method == 'GET':
        try:

            RegistrationId = request.GET.get('RegistrationId')
            
            DischargeRequest_details = IP_DischargeRequest_Details.objects.all()
            # DischargeRequest_details = IP_DischargeRequest_Details.objects.filter(Registration_Id__pk=RegistrationId)
            # DischargeRequest_details = IP_DischargeRequest_Details.objects.filter(Registration_Id=RegistrationId)
            print(DischargeRequest_details,'DischargeRequest_details')
           
            DischargeRequest_details_data = []
            for idx, DischargeRequest in enumerate(DischargeRequest_details, start=1):
                # Manually serialize related objects (e.g., Patient, Doctor)
                patient = DischargeRequest.Registration_Id.PatientId
                doctor = DischargeRequest.Doctor_Id
                primary_doctor = DischargeRequest.Registration_Id.PrimaryDoctor

                DischargeRequest_dict = {
                    'id': idx,
                    'RegistrationId': DischargeRequest.Registration_Id.pk,
                    'PatientId': patient.pk if patient else "",
                    'PatientName': f"{patient.Title}.{patient.FirstName} {patient.MiddleName} {patient.SurName}" if patient else "",
                    'VisitId': DischargeRequest.Registration_Id.VisitId,
                    'PhoneNo': patient.PhoneNo if patient else "",
                    'Status': DischargeRequest.Registration_Id.Status,
                    'PrimaryDoctorId': primary_doctor.Doctor_ID if primary_doctor else "",
                    'PrimaryDoctorName': primary_doctor.ShortName if primary_doctor else "",
                    'Speciality': doctor.Specialization.Speciality_Name if doctor and doctor.Specialization else "",
                    'DoctorName': doctor.Doctor_ID.ShortName if doctor else "",
                    'SisterIncharge': DischargeRequest.SisterIncharge,
                    'Reason': DischargeRequest.Reason,
                    'Remarks': DischargeRequest.Remarks,
                    'Lab': DischargeRequest.Lab,
                    'Radiology': DischargeRequest.Radiology,
                    'Billing': DischargeRequest.Billing,
                    'LabStatus': DischargeRequest.LabStatus,
                    'RadiologyStatus': DischargeRequest.RadiologyStatus,
                    'BillingStatus': DischargeRequest.BillingStatus,
                    
                    'CurrLabDate': DischargeRequest.LabDateTime.strftime('%d-%m-%y') if DischargeRequest.LabDateTime else "",
                    'CurrLabTime': DischargeRequest.LabDateTime.strftime('%I:%M %p') if DischargeRequest.LabDateTime else "",
                    
                    'CurrRadiologyDate': DischargeRequest.RadiologyDateTime.strftime('%d-%m-%y') if DischargeRequest.RadiologyDateTime else "",
                    'CurrRadiologyTime': DischargeRequest.RadiologyDateTime.strftime('%I:%M %p') if DischargeRequest.RadiologyDateTime else "",
                    
                    'CurrBillingDate': DischargeRequest.BillingDateTime.strftime('%d-%m-%y') if DischargeRequest.BillingDateTime else "",
                    'CurrBillingTime': DischargeRequest.BillingDateTime.strftime('%I:%M %p') if DischargeRequest.BillingDateTime else "",
                    
                    'CurrDate': DischargeRequest.created_at.strftime('%d-%m-%y') if DischargeRequest.created_at else "",
                    'CurrTime': DischargeRequest.created_at.strftime('%I:%M %p') if DischargeRequest.created_at else "",
                    
                    'Createdby': DischargeRequest.Created_by,
                
                }
                DischargeRequest_details_data.append(DischargeRequest_dict)
                print("DischargeRequest_details_data:", DischargeRequest_details_data)  # Log serialized data

            # Return serialized data
            return JsonResponse(DischargeRequest_details_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_DischargeCancel_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            print(data,'dataaaaaaaaaa')
            RegistrationId = data.get("RegistrationId")
            Speciality = data.get("Speciality")
            DoctorName = data.get('DoctorName')
            SisterIncharge = data.get('SisterIncharge')
            Reason = data.get('Reason')
            Remarks = data.get('Remarks')
            
            createdby = data.get("Createdby")
            
            # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'})
            
            if DoctorName:
                doc_ins =Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk = DoctorName)
            # Save DischargeRequest details
            DischargeRequest_instance = IP_DischargeRequest_Details(
                Registration_Id=registration_ins,
                SisterIncharge=SisterIncharge,
                Reason=Reason,
                Remarks=Remarks,
                Doctor_Id=doc_ins,
                Created_by=createdby,
            )
            DischargeRequest_instance.save()
            
            return JsonResponse({'success': 'DischargeRequest details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})

    elif request.method == 'GET':
        try:

            RegistrationId = request.GET.get('RegistrationId')
            
            DischargeRequest_details = IP_DischargeRequest_Details.objects.all()
            # DischargeRequest_details = IP_DischargeRequest_Details.objects.filter(Registration_Id__pk=RegistrationId)
            # DischargeRequest_details = IP_DischargeRequest_Details.objects.filter(Registration_Id=RegistrationId)
            print(DischargeRequest_details,'DischargeRequest_details')
           
            DischargeRequest_details_data = []
            for idx, DischargeRequest in enumerate(DischargeRequest_details, start=1):
                # Manually serialize related objects (e.g., Patient, Doctor)
                patient = DischargeRequest.Registration_Id.PatientId
                doctor = DischargeRequest.Doctor_Id
                primary_doctor = DischargeRequest.Registration_Id.PrimaryDoctor

                DischargeRequest_dict = {
                    'id': idx,
                    'RegistrationId': DischargeRequest.Registration_Id.pk,
                    'PatientId': patient.pk if patient else "",
                    'PatientName': f"{patient.Title}.{patient.FirstName} {patient.MiddleName} {patient.SurName}" if patient else "",
                    'VisitId': DischargeRequest.Registration_Id.VisitId,
                    'PhoneNo': patient.PhoneNo if patient else "",
                    'Status': DischargeRequest.Registration_Id.Status,
                    'PrimaryDoctorId': primary_doctor.Doctor_ID if primary_doctor else "",
                    'PrimaryDoctorName': primary_doctor.ShortName if primary_doctor else "",
                    'Speciality': doctor.Specialization.Speciality_Name if doctor and doctor.Specialization else "",
                    'DoctorName': doctor.Doctor_ID.ShortName if doctor else "",
                    'SisterIncharge': DischargeRequest.SisterIncharge,
                    'Reason': DischargeRequest.Reason,
                    'Remarks': DischargeRequest.Remarks,
                    'Lab': DischargeRequest.Lab,
                    'Radiology': DischargeRequest.Radiology,
                    'Billing': DischargeRequest.Billing,
                    'LabStatus': DischargeRequest.LabStatus,
                    'RadiologyStatus': DischargeRequest.RadiologyStatus,
                    'BillingStatus': DischargeRequest.BillingStatus,
                    
                    'CurrLabDate': DischargeRequest.LabDateTime.strftime('%d-%m-%y') if DischargeRequest.LabDateTime else "",
                    'CurrLabTime': DischargeRequest.LabDateTime.strftime('%I:%M %p') if DischargeRequest.LabDateTime else "",
                    
                    'CurrRadiologyDate': DischargeRequest.RadiologyDateTime.strftime('%d-%m-%y') if DischargeRequest.RadiologyDateTime else "",
                    'CurrRadiologyTime': DischargeRequest.RadiologyDateTime.strftime('%I:%M %p') if DischargeRequest.RadiologyDateTime else "",
                    
                    'CurrBillingDate': DischargeRequest.BillingDateTime.strftime('%d-%m-%y') if DischargeRequest.BillingDateTime else "",
                    'CurrBillingTime': DischargeRequest.BillingDateTime.strftime('%I:%M %p') if DischargeRequest.BillingDateTime else "",
                    
                    'CurrDate': DischargeRequest.created_at.strftime('%d-%m-%y') if DischargeRequest.created_at else "",
                    'CurrTime': DischargeRequest.created_at.strftime('%I:%M %p') if DischargeRequest.created_at else "",
                    'Createdby': DischargeRequest.Created_by,
                
                }
                DischargeRequest_details_data.append(DischargeRequest_dict)
                print("DischargeRequest_details_data:", DischargeRequest_details_data)  # Log serialized data

            # Return serialized data
            return JsonResponse(DischargeRequest_details_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})


@csrf_exempt
@require_http_methods(['POST'])
def Update_DischargeRequest_Details(request):
    try:
        data = json.loads(request.body)
        RegistrationId = data.get("RegistrationId")
        Labvalue = data.get("Labvalue")
        Radiologyvalue = data.get("Radiologyvalue")
        Billingvalue = data.get("Billingvalue")
        LabStatus = data.get("LabStatus")
        RadiologyStatus = data.get("RadiologyStatus")
        BillingStatus = data.get("BillingStatus")

        
        # Get the instance and update the 'Lab' field
        DischargeRequest_instances = IP_DischargeRequest_Details.objects.filter(Registration_Id=RegistrationId)
        # DischargeRequest_instance = IP_DischargeRequest_Details.objects.get(Registration_Id=RegistrationId)
        # Update Lab and LabStatus only if Labvalue and LabStatus are provided
        for DischargeRequest_instance in DischargeRequest_instances:
            if Labvalue is not None:
                DischargeRequest_instance.Lab = Labvalue

            if LabStatus is not None:
                DischargeRequest_instance.LabStatus = LabStatus
                if Labvalue == 1 and LabStatus == 'Completed':
                    DischargeRequest_instance.LabDateTime = datetime.now()

            if Radiologyvalue is not None:
                DischargeRequest_instance.Radiology = Radiologyvalue

            if RadiologyStatus is not None:
                DischargeRequest_instance.RadiologyStatus = RadiologyStatus
                if Radiologyvalue == 1 and RadiologyStatus == 'Completed':
                    DischargeRequest_instance.RadiologyDateTime = datetime.now()

            if Billingvalue is not None:
                DischargeRequest_instance.Billing = Billingvalue

            if BillingStatus is not None:
                DischargeRequest_instance.BillingStatus = BillingStatus
                if Billingvalue == 1 and BillingStatus == 'Completed':
                    DischargeRequest_instance.BillingDateTime = datetime.now()

            DischargeRequest_instance.save()

        return JsonResponse({'success': 'DischargeRequest details updated successfully'})
    except IP_DischargeRequest_Details.DoesNotExist:
        return JsonResponse({'error': 'DischargeRequest details not found'}, status=404)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'},status=500)


# @csrf_exempt
# @require_http_methods(['POST', 'GET'])
# def IP_DischargeRequest_Details_Link(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)

#             print(data,'dataaaaaaaaaa')
#             RegistrationId = data.get("RegistrationId")
#             Speciality = data.get("Speciality")
#             DoctorName = data.get('DoctorName')
#             SisterIncharge = data.get('SisterIncharge')
#             Reason = data.get('Reason')
#             Remarks = data.get('Remarks')
            
#             createdby = data.get("Createdby")
            
#             # Get the Patient_IP_Registration_Detials instance
#             if RegistrationId:
#                 registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
#             else:
#                 return JsonResponse({'error': 'RegistrationId is required'})
            
#             if DoctorName:
#                 doc_ins =Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk = DoctorName)
#             # Save DischargeRequest details
#             DischargeRequest_instance = IP_DischargeRequest_Details(
#                 Registration_Id=registration_ins,
#                 SisterIncharge=SisterIncharge,
#                 Reason=Reason,
#                 Remarks=Remarks,
#                 Doctor_Id=doc_ins,
#                 Created_by=createdby,
#             )
#             DischargeRequest_instance.save()
            
#             return JsonResponse({'success': 'DischargeRequest details saved successfully'})
#         except Patient_IP_Registration_Detials.DoesNotExist:
#             return JsonResponse({'error': 'Patient IP registration details not found'})
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:

#             RegistrationId = request.GET.get('RegistrationId')
#             if not RegistrationId:
#                 return JsonResponse({'error': 'RegistrationId is required'})
            
#             # DischargeRequest_details = IP_DischargeRequest_Details.objects.all()
#             DischargeRequest_details = IP_DischargeRequest_Details.objects.filter(Registration_Id__pk=RegistrationId)
            
           
#             DischargeRequest_details_data = []
#             for idx, DischargeRequest in enumerate(DischargeRequest_details, start=1):
#                 DischargeRequest_dict = {
#                     'id': idx,
#                     'RegistrationId': DischargeRequest.Registration_Id.pk,
#                     'PatientId': DischargeRequest.Registration_Id.PatientId,
#                     'PatientName': f"{DischargeRequest.Registration_Id.PatientId.Title}.{DischargeRequest.Registration_Id.PatientId.FirstName} {DischargeRequest.Registration_Id.PatientId.MiddleName} {DischargeRequest.Registration_Id.PatientId.SurName}",
#                     'VisitId': DischargeRequest.Registration_Id.VisitId,
#                     'PhoneNo': DischargeRequest.Registration_Id.PatientId.PhoneNo,
#                     'Status': DischargeRequest.Registration_Id.Status,
#                     'PrimaryDoctorId': DischargeRequest.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': DischargeRequest.Registration_Id.PrimaryDoctor.ShortName,
#                     'Speciality': DischargeRequest.Doctor_Id.Specialization.Speciality_Name if DischargeRequest.Doctor_Id else "",
#                     'DoctorName': DischargeRequest.Doctor_Id.Doctor_ID.ShortName if DischargeRequest.Doctor_Id else "",
#                     'SisterIncharge': DischargeRequest.SisterIncharge,
#                     'Reason': DischargeRequest.Reason,
#                     'Remarks': DischargeRequest.Remarks,
#                     'CurrDate': DischargeRequest.created_at.strftime('%d-%m-%y'),
#                     'CurrTime': DischargeRequest.created_at.strftime('%I:%M %p'),
#                     'Createdby': DischargeRequest.Created_by,
#                 }
#                 DischargeRequest_details_data.append(DischargeRequest_dict)

#             return JsonResponse(DischargeRequest_details_data, safe=False)
        
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)








