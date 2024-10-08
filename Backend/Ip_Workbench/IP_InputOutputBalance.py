from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.utils import timezone
from django.core.management import call_command

@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_InputOutputBalance_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            print(data,'data')
            RegistrationId = data.get("RegistrationId")
            IntakeType = data.get("IntakeType")
            IntakeMode = data.get("IntakeMode")
            Site = data.get("Site")
            Measurement1 = data.get("Measurement1")
            MeasurementType1 = data.get("MeasurementType1")
            Duration = data.get("Duration")
            DurationType = data.get("DurationType")
            Remarks1 = data.get("Remarks1")
            OutputType = data.get("OutputType")
            Measurement2 = data.get("Measurement2")
            MeasurementType2 = data.get("MeasurementType2")
            Remarks2 = data.get("Remarks2")
            totalInputDay = data.get("totalInputDay")
            totalOutputDay = data.get("totalOutputDay")
            balance = data.get("balance")
            balanceType = data.get("balanceType")
            createdby = data.get("Createdby")
            DepartmentType = data.get("DepartmentType")
            
            Inserttype = data.get('Inserttype')
            
            registration_ins_ip = None
            registration_ins_casuality = None
            
            if RegistrationId:
                # Try to get from IP Registration first
                try:
                    registration_ins_ip = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
                    print("Found in IP Registration")
                except Patient_IP_Registration_Detials.DoesNotExist:
                    print("Not found in IP Registration, trying Casuality Registration")
                    try:
                        registration_ins_casuality = Patient_Casuality_Registration_Detials.objects.get(pk=RegistrationId)
                        print("Found in Casuality Registration")
                    except Patient_Casuality_Registration_Detials.DoesNotExist:
                        return JsonResponse({'error': 'No registration found for the given RegistrationId'})

            else:
                return JsonResponse({'error': 'RegistrationId is required'})


            if Inserttype == 'Intake':
                intake_instance = IP_Intake_Details(
                    Ip_Registration_Id=registration_ins_ip,
                    Casuality_Registration_Id=registration_ins_casuality,
                    IntakeType=IntakeType,
                    IntakeMode=IntakeMode,
                    Site=Site,
                    Measurement=Measurement1,
                    MeasurementType=MeasurementType1,
                    Duration=Duration,
                    DurationType=DurationType,
                    Remarks=Remarks1,
                    Created_by=createdby,
                    DepartmentType=DepartmentType,

                )
                intake_instance.save()
                

            if Inserttype == 'Output':
                Output_instance = IP_Output_Details(
                    Ip_Registration_Id=registration_ins_ip,
                    Casuality_Registration_Id=registration_ins_casuality,
                    OutputType=OutputType,
                    Measurement=Measurement2,
                    MeasurementType=MeasurementType2,
                    Remarks=Remarks2,
                    Created_by=createdby,
                    DepartmentType=DepartmentType,

                )
                Output_instance.save()


            if Inserttype == 'Balance':
                Balance_instance = IP_Balance_Details(
                    Ip_Registration_Id=registration_ins_ip,
                    Casuality_Registration_Id=registration_ins_casuality,
                    totalInputDay=totalInputDay,
                    totalOutputDay=totalOutputDay,
                    balance=balance,
                    balanceType=balanceType,
                    Created_by=createdby,
                    DepartmentType=DepartmentType,

                )
                Balance_instance.save()
                
            return JsonResponse({'success': 'intake details saved successfully'})
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:

            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')

            if not Ip_Registration_Id and not DepartmentType:
                return JsonResponse({'error': 'both Ip_Registration_Id and DepartmentType is required'})

            if DepartmentType=='IP':
                intake_details = IP_Intake_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                intake_details = IP_Intake_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            # intake_details = IP_Intake_Details.objects.filter(Registration_Id__pk=RegistrationId)
            
            intake_details_data = []
            for idx, intake in enumerate(intake_details, start=1):
                intake_dict = {
                    'id': idx,
                    'RegistrationId': intake.Ip_Registration_Id.pk if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.pk,
                    'VisitId': intake.Ip_Registration_Id.VisitId if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': intake.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': intake.Ip_Registration_Id.PrimaryDoctor.ShortName if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'IntakeType': intake.IntakeType,
                    'IntakeMode': intake.IntakeMode,
                    'Site': intake.Site,
                    'Measurement1': intake.Measurement,
                    'MeasurementType1': intake.MeasurementType,
                    'Duration': intake.Duration,
                    'DurationType': intake.DurationType,
                    'Remarks': intake.Remarks,
                    'DepartmentType': intake.DepartmentType,
                    'Date': intake.created_at.strftime('%d-%m-%y'),
                    'Time': intake.created_at.strftime('%H:%M:%S'),
                    'Createdby': intake.Created_by,
                }
                intake_details_data.append(intake_dict)
            
            print(intake_details_data,'intake_details_data')

            # Outut_details = IP_Output_Details.objects.filter(Registration_Id__pk=RegistrationId)
            
            if DepartmentType=='IP':
                Outut_details = IP_Output_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Outut_details = IP_Output_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            Output_details_data = []
            for idx, Output in enumerate(Outut_details, start=1):
                Output_dict = {
                    'id': idx,
                    'RegistrationId': intake.Ip_Registration_Id.pk if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.pk,
                    'VisitId': Output.Ip_Registration_Id.VisitId if Output.Ip_Registration_Id else Output.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Output.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Output.Ip_Registration_Id else Output.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Output.Ip_Registration_Id.PrimaryDoctor.ShortName if Output.Ip_Registration_Id else Output.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'OutputType': Output.OutputType,
                    'Measurement2': Output.Measurement,
                    'MeasurementType2': Output.MeasurementType,
                    'Remarks2': Output.Remarks,
                    'DepartmentType': Output.DepartmentType,
                    'Date': Output.created_at.strftime('%d-%m-%y'),
                    'Time': Output.created_at.strftime('%H:%M:%S'),
                    'Createdby': Output.Created_by,
                }
                Output_details_data.append(Output_dict)

            print(Output_details_data,'Output_details_data') 

            # Balance_details = IP_Balance_Details.objects.filter(Registration_Id__pk=RegistrationId)
            
            if DepartmentType=='IP':
                Balance_details = IP_Balance_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Balance_details = IP_Balance_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            # Serialize data
            Balance_details_data = []
            for idx, Balance in enumerate(Balance_details, start=1):
                Balance_dict = {
                    'id': idx,
                    'RegistrationId': intake.Ip_Registration_Id.pk if intake.Ip_Registration_Id else intake.Casuality_Registration_Id.pk,
                    'VisitId': Balance.Ip_Registration_Id.VisitId if Balance.Ip_Registration_Id else Balance.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Balance.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Balance.Ip_Registration_Id else Balance.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Balance.Ip_Registration_Id.PrimaryDoctor.ShortName if Balance.Ip_Registration_Id else Balance.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'totalInputDay': Balance.totalInputDay,
                    'totalOutputDay': Balance.totalOutputDay,
                    'balance': Balance.balance,
                    'balanceType': Balance.balanceType,
                    'DepartmentType': Balance.DepartmentType,
                    'Date': Balance.created_at.strftime('%d-%m-%y'),
                    'Time': Balance.created_at.strftime('%H:%M:%S'),
                    'Createdby': Balance.Created_by,
                }
                Balance_details_data.append(Balance_dict)
            print(Balance_details_data,'Balance_details_data')
            response_data = {
                'intake_details': intake_details_data,
                'output_details': Output_details_data,
                'balance_details': Balance_details_data,
            }
            print(response_data,'vvvvvvvvvvvvvv')

            return JsonResponse(response_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


