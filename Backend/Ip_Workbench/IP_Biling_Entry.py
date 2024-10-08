from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_Billing_Entry_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Registration_Id = data.get('RegistrationId')
            ServiceType = data.get('ServiceType')
            PhysicianType = data.get('PhysicianType')
            Physician = data.get('Physician')
            Service = data.get('Service')
            Procedure = data.get('Procedure')
            DrugName = data.get('DrugName')
            LabTest = data.get('LabTest')
            RadiologyTest = data.get('RadiologyTest')
            Units = data.get('Units')
            Created_by = data.get('createdby')
            Billing_Id = data.get('BillingDataList_ID')

            print('11111',data)
            if not Registration_Id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)
            
            # Fetch the registration instance
            registration_instance = Patient_IP_Registration_Detials.objects.get(Registration_Id=Registration_Id)

            # Optional fields handling (Physician, Service, Procedure)
            physician_instance = None
            service_instance = None
            procedure_instance = None
            billing_instance =None
            if Physician and ServiceType == 'Consultation':
                physician_instance = Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk=Physician)
            if Service and ServiceType == 'Service':
                service_instance = Service_Master_Details.objects.get(Service_Id=Service)
                print('serrrr',service_instance)
            if Procedure and ServiceType == 'Procedure':
                procedure_instance = Procedure_Master_Details.objects.get(Procedure_Id=Procedure)
                print('prooo',procedure_instance)
            if Billing_Id:
                billing_instance = IP_Billing_QueueList_Detials.objects.get(BillingQueueList_ID = Billing_Id)
                print('billll',billing_instance)

            # Create billing entry with conditionally populated fields
            billing_instance = IP_Billing_Entry(
                BillingDataList_ID = billing_instance if billing_instance else None,
                Registration_Id=registration_instance,
                ServiceType=ServiceType,
                Physician_Type=PhysicianType,
                Physician=physician_instance if physician_instance else None,
                Units=Units,
                DrugName=DrugName,
                Service=service_instance if service_instance else None,
                Procedure=procedure_instance if procedure_instance else None,
                DrugStatus='Pending' if DrugName else "",
                RadiologyTest=RadiologyTest,
                RadiologySatus='Pending' if RadiologyTest else "",
                LabTest=LabTest,
                LabTestStatus='Pending' if LabTest else '',
                Created_by=Created_by
            )
            billing_instance.save()
            
            return JsonResponse({'success': 'Bill Entry details saved successfully'})
        except Exception as e:
            return JsonResponse({"error": str(e)})

    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'})

            service_instance = IP_Billing_Entry.objects.filter(Registration_Id=RegistrationId)
            ip_bill_data = []
            indx = 1
            for service in service_instance:
                service_name = ''
                service_status = ''
                physician_name = ''
                if service.ServiceType == 'Consultation':
                    service_name = 'Consultation'
                    service_status = 'Completed'
                    physician_name = service.Physician.Doctor_ID.ShortName if service.Physician else None
                elif service.ServiceType == 'Pharmacy':
                    service_name = service.DrugName
                    service_status = service.DrugStatus
                elif service.ServiceType == 'Lab':
                    service_name = service.LabTest
                    service_status = service.LabTestStatus
                elif service.ServiceType == 'Radiology':
                    service_name = service.RadiologyTest
                    service_status = service.RadiologySatus
                elif service.ServiceType == 'Service':
                    service_name = service.Service.Service_Name
                    service_status = service.ServiceStatus
                elif service.ServiceType == 'Procedure':
                    service_name = service.Procedure.Procedure_Name
                    service_status = service.ServiceStatus

                ip_bill = {
                    'id': indx,
                    'ServiceType': service.ServiceType,
                    'ServiceName': service_name,
                    'PhysicianType': service.Physician_Type,
                    'Physician': physician_name,
                    'ServiceStatus': service_status,
                    'Units': service.Units,
                    'created_at': service.created_at.strftime('%d-%m-%y / %I-%M %p'),
                }
                indx += 1

                ip_bill_data.append(ip_bill)

            return JsonResponse(ip_bill_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})
        
        
@csrf_exempt
@require_http_methods(['POST','GET'])
def IP_Consultation_Entry(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Registration_Id = data.get('RegistrationId')
            PhysicianType = data.get('PhysicianType')
            Physician = data.get('Physician')
            Units = data.get('Units')
            Created_by = data.get('createdby')

            print('11111',data)
            
            if not Registration_Id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            registration_instance = Patient_IP_Registration_Detials.objects.get(Registration_Id=Registration_Id)


            physician_instance = None
            if Physician:
                physician_instance = Doctor_ProfessForm_Detials.objects.get(Doctor_ID__pk=Physician)
            
            billing_instance = IP_Consultation(
                Registration_Id=registration_instance,
                Physician_Type=PhysicianType,
                Physician=physician_instance if physician_instance else None,
                Units=Units,
                Created_by=Created_by
            )
            billing_instance.save()
            
            return JsonResponse({'success': 'Consultation details saved successfully'})

        except Exception as e:
            return JsonResponse({"error": str(e)})

    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'})

            service_instance = IP_Consultation.objects.filter(Registration_Id=RegistrationId)
            ip_bill_data = []
            indx = 1
            for service in service_instance:
                physician_name = service.Physician.Doctor_ID.ShortName if service.Physician else None

                ip_bill = {
                    'id': indx,
                    'ServiceType': service.ServiceType,
                    'ServiceName': service.ServiceType,
                    'PhysicianType': service.Physician_Type,
                    'Physician': physician_name,
                    'Units': service.Units,
                    'Status' : service.Status,
                    'created_at': service.created_at.strftime('%d-%m-%y / %I-%M %p'),
                }
                indx += 1

                ip_bill_data.append(ip_bill)

            return JsonResponse(ip_bill_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)})
        
