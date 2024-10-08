from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.utils.timezone import now
from Ip_Workbench.models import *
from datetime import datetime, date
from django.db.models import Q





@csrf_exempt
@require_http_methods(['POST', 'GET'])
def Vitals_Form_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data, 'data')

            # Extract data from the request body
            RegistrationId = data.get("RegistrationId", '')
            temperature = data.get("Temperature", '')
            pulserate = data.get("PulseRate", '')
            spo2 = data.get("SPO2", '')
            heartrate = data.get("HeartRate", '')
            respiratoryrate = data.get("RespiratoryRate", '')
            sbp = data.get("SBP", '')
            dbp = data.get("DBP", '')
            height = data.get("Height", '')
            weight = data.get("Weight", '')
            bmi = data.get("BMI", '')
            wc = data.get("WC", '')
            hc = data.get("HC", '')
            bsl = data.get("BSL", '')
            Painscore = data.get("Painscore", '')
            SupplementalOxygen = data.get("SupplementalOxygen", '')
            LevelOfConsiousness = data.get("LevelOfConsiousness", '')
            CapillaryRefillTime = data.get("CapillaryRefillTime", '')
            DepartmentType = data.get("DepartmentType")
            Type = data.get("Type", '')
            createdby = data.get("Createdby", '')

            if RegistrationId:
                # Try to get from IP Registration first
                registration_ins = None
                registration_ins_casuality = None
                
                try:
                    registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=RegistrationId)
                    print("Found in IP Registration")
                    patient_dob = registration_ins.PatientId.DOB  # Get DOB from IP registration
                except Patient_Appointment_Registration_Detials.DoesNotExist:
                    print("Not found in OP Registration")
                    
                if not patient_dob:
                    return JsonResponse({'error': 'No DOB found for the RegistrationId'})
                
            else:
                return JsonResponse({'error': 'RegistrationId is required'})
                
            # Calculate age and determine age group
            # patient_dob1 = registration_ins_ip.PatientId.DOB
            # patient_dob2 = registration_ins_casuality.PatientId.DOB
            # print(patient_dob1, 'patient_dob1')
            # print(patient_dob2, 'patient_dob2')

            
            # Ensure patient_dob is parsed as a date object if it's a string
            if isinstance(patient_dob, str):
                try:
                    patient_dob = datetime.strptime(patient_dob, "%Y-%m-%d").date()
                except ValueError:
                    return JsonResponse({'error': 'Invalid date format for DOB'})
            elif isinstance(patient_dob, datetime):
                patient_dob = patient_dob.date()

            today = date.today()
            age_in_years = today.year - patient_dob.year - ((today.month, today.day) < (patient_dob.month, patient_dob.day))
            age_in_months = (today.year - patient_dob.year) * 12 + today.month - patient_dob.month - (1 if today.day < patient_dob.day else 0)

            print(age_in_months, 'age_in_months')

            if age_in_months < 4:
                age_group = 'Child < 4 months'
            elif 4 <= age_in_months < 24:
                age_group = '4 months - 2 years'
            elif 2 <= age_in_years < 5:
                age_group = '2-5 years'
            elif 5 <= age_in_years < 12:
                age_group = '5-12 years'
            elif 12 <= age_in_years < 16:
                age_group = '12-16 years'
            elif age_in_years < 16:
                age_group = 'Child all age < 16 Years'
            else:
                age_group = 'Adult >16 years'

            print(age_group, 'age_group')

            # Debugging: Print available age groups and the specific query being run
            all_age_groups = IP_VitalsChart.objects.values_list('Age', flat=True).distinct()
            print("Available age groups:", all_age_groups)

            def evaluate_vital_sign(respiratoryrate, spo2,temperature,sbp, heartrate,SupplementalOxygen, LevelOfConsiousness,CapillaryRefillTime,age_group):
                
                
                def parse_value(value):
                    """Parses a single comparison or integer value."""
                    if not value or value.strip() == '':
                        return None
                    value = value.strip()
                    try:
                        if value.startswith('<='):
                            return int(value[2:]) if '.' not in value else float(value[2:])
                        elif value.startswith('>='):
                            return int(value[2:]) if '.' not in value else float(value[2:])
                        elif value.startswith('<'):
                            return int(value[1:]) - 1 if '.' not in value else float(value[1:]) - 1
                        elif value.startswith('>'):
                            return int(value[1:]) + 1 if '.' not in value else float(value[1:]) + 1
                        else:
                            return int(value) if '.' not in value else float(value)
                    except ValueError:
                        return None

                def parse_range(value):
                    """Parses a value that can be a range string, comparison string, or a single value."""
                    if not value or value.strip() == '':
                        return None

                    value = value.strip()

                    if '-' in value:
                        # Range case
                        return list(map(parse_value, value.split('-')))
                    
                    if ',' in value:
                        # Handle comma-separated strings (like in MaxHigh)
                        return [item.strip() for item in value.split(',')]
                    
                    # Comparison or single value case
                    parsed_value = parse_value(value)

                    
                    if parsed_value is not None:
                        return parsed_value
                    
                    return value
                
                
                

                try:
                    respiratoryrate = int(respiratoryrate) if respiratoryrate is not None else None
                    spo2 = int(spo2) if spo2 is not None else None
                    temperature = float(temperature) if temperature is not None else None
                    sbp = int(sbp) if sbp is not None else None
                    heartrate = int(heartrate) if heartrate is not None else None
                    SupplementalOxygen = SupplementalOxygen.strip() if SupplementalOxygen else None
                    LevelOfConsiousness = LevelOfConsiousness.strip() if LevelOfConsiousness else None
                    CapillaryRefillTime = CapillaryRefillTime.strip() if CapillaryRefillTime else None


                except ValueError:
                    print("Invalid value for respiratory rate or SpO2")
                    return None, None, None, None, None, None, None, None

                age_group = age_group.strip().lower()
                print(f"Normalized Age Group: '{age_group}'")

                # Query for both "Respiratory Rate" and "SpO2"
                vital_chart_queryset = IP_VitalsChart.objects.filter(
                    (Q(Vitals='Respiratory Rate') | Q(Vitals='SpO2') | Q(Vitals='Temperature (Frahrenheit)') | Q(Vitals='Systolic BP') | Q(Vitals='Heart Rate (per min)') | Q(Vitals='Supplemental Oxygen' ) | Q(Vitals='Level of Consiousness') | Q(Vitals = 'Capillary Refill Time')),
                    Age__icontains=age_group
                )

                print(vital_chart_queryset, 'vital_chart_queryset----')

                if not vital_chart_queryset.exists():
                    print(f"No vital chart entries found for age group: {age_group}")
                    return None, None, None, None, None, None, None, None

                # Initialize status variables
                respiratory_status = None
                spo2_status = None
                temperature_status = None
                sbp_status = None
                heartrate_status = None
                SupplementalOxygen_status = None
                LevelOfConsiousness_status = None
                CapillaryRefillTime_status = None

                for vital_chart in vital_chart_queryset:
                    min_high = parse_value(vital_chart.MinHigh) if vital_chart.MinHigh else None
                    min_medium = parse_range(vital_chart.MinMedium) if vital_chart.MinMedium else None
                    min_low = parse_range(vital_chart.MinLow) if vital_chart.MinLow else None
                    normal = parse_range(vital_chart.Normal) if vital_chart.Normal else None
                    max_low = parse_range(vital_chart.MaxLow) if vital_chart.MaxLow else None
                    max_medium = parse_range(vital_chart.MaxMedium) if vital_chart.MaxMedium else None
                    max_high = parse_range(vital_chart.MaxHigh) if vital_chart.MaxHigh else None

                    print(f"Parsed thresholds - MinHigh: {min_high}, MinMedium: {min_medium}, MinLow: {min_low}, Normal: {normal}, MaxLow: {max_low}, MaxMedium: {max_medium}, MaxHigh: {max_high}")
                    print(f"Parsed MaxHigh: {max_high}") 
                    if vital_chart.Vitals == 'Respiratory Rate' and respiratoryrate is not None:
                        if min_high is not None and respiratoryrate <= min_high:
                            respiratory_status = 3  # Critical
                        elif max_high is not None and respiratoryrate >= max_high:
                            respiratory_status = 3  # Critical
                        elif min_low and min_low[0] is not None and min_low[1] is not None and min_low[0] <= respiratoryrate <= min_low[1]:
                            respiratory_status = 1  # Abnormal
                        elif max_low and max_low[0] is not None and max_low[1] is not None and max_low[0] <= respiratoryrate <= max_low[1]:
                            respiratory_status = 1  # Abnormal
                        elif normal and isinstance(normal, list) and normal[0] is not None and normal[1] is not None and normal[0] <= respiratoryrate <= normal[1]:
                            respiratory_status = 0  # Normal
                        elif normal and not isinstance(normal, list) and respiratoryrate >= normal:
                            respiratory_status = 0  # Normal
                        elif min_medium and min_medium[0] is not None and min_medium[1] is not None and min_medium[0] <= respiratoryrate <= min_medium[1]:
                            respiratory_status = 2  # Critical
                        elif max_medium and max_medium[0] is not None and max_medium[1] is not None and max_medium[0] <= respiratoryrate <= max_medium[1]:
                            respiratory_status = 2  # Critical

                    if vital_chart.Vitals == 'SpO2' and spo2 is not None:
                        if min_high is not None and spo2 <= min_high:
                            spo2_status = 3  # Critical
                        elif max_high is not None and spo2 >= max_high:
                            spo2_status = 3  # Critical
                        elif min_low and min_low[0] is not None and min_low[1] is not None and min_low[0] <= spo2 <= min_low[1]:
                            spo2_status = 1  # Abnormal
                        elif normal and isinstance(normal, list) and normal[0] is not None and normal[1] is not None and normal[0] <= spo2 <= normal[1]:
                            spo2_status = 0  
                        elif normal and not isinstance(normal, list) and spo2 >= normal:
                            spo2_status = 0  # Normal
                        elif normal is not None and spo2 >= normal:
                            spo2_status = 0    
                        elif min_medium and min_medium[0] is not None and min_medium[1] is not None and min_medium[0] <= spo2 <= min_medium[1]:
                            spo2_status = 2  # Critical

                    if vital_chart.Vitals == 'Temperature (Frahrenheit)' and temperature is not None:
                        if min_high is not None and temperature <= min_high:
                            temperature_status = 3  # Critical
                        elif max_high is not None and temperature >= max_high:
                            temperature_status = 3  # Critical
                        elif min_low and min_low[0] is not None and min_low[1] is not None and min_low[0] <= temperature <= min_low[1]:
                            temperature_status = 1  # Abnormal
                        elif max_low and max_low[0] is not None and max_low[1] is not None and max_low[0] <= temperature <= max_low[1]:
                            temperature_status = 1  # Abnormal
                        elif normal and max_low[0] is not None and max_low[1] is not None and max_low[0] <= temperature <= max_low[1]:
                            temperature_status = 0 # Abnormal    
                        elif normal and isinstance(normal, list) and normal[0] is not None and normal[1] is not None and normal[0] <= temperature <= normal[1]:
                            temperature_status = 0  # Normal
                        elif normal and not isinstance(normal, list) and temperature >= normal:
                            temperature_status = 0  # Normal
                        elif min_medium and min_medium[0] is not None and min_medium[1] is not None and min_medium[0] <= temperature <= min_medium[1]:
                            temperature_status = 2  # Critical
                        
                        elif max_medium is not None and max_medium >= max_medium:
                            temperature_status = 2   

                    if vital_chart.Vitals == 'Systolic BP' and sbp is not None:
                        if min_high is not None and sbp <= min_high:
                            sbp_status = 3  # Critical
                        elif max_high is not None and sbp >= max_high:
                            sbp_status = 3  # Critical
                        elif min_low and min_low[0] is not None and min_low[1] is not None and min_low[0] <= sbp <= min_low[1]:
                            sbp_status = 1  # Abnormal
                        elif max_low and max_low[0] is not None and max_low[1] is not None and max_low[0] <= sbp <= max_low[1]:
                            sbp_status = 1  # Abnormal
                        elif normal and isinstance(normal, list) and normal[0] is not None and normal[1] is not None and normal[0] <= sbp <= normal[1]:
                            sbp_status = 0  # Normal
                        elif normal and not isinstance(normal, list) and sbp >= normal:
                            sbp_status = 0  # Normal
                        elif min_medium and min_medium[0] is not None and min_medium[1] is not None and min_medium[0] <= sbp <= min_medium[1]:
                            sbp_status = 2  # Critical
                        elif max_medium and max_medium[0] is not None and max_medium[1] is not None and max_medium[0] <= sbp <= max_medium[1]:
                            sbp_status = 2  # Critical
                        elif max_medium is not None and max_medium >= max_medium:
                            sbp_status = 0   

                    if vital_chart.Vitals == 'Heart Rate (per min)' and heartrate is not None:
                        if min_high is not None and heartrate <= min_high:
                            heartrate_status = 3  # Critical
                        elif max_high is not None and heartrate >= max_high:
                            heartrate_status = 3  # Critical
                        elif min_low and min_low[0] is not None and min_low[1] is not None and min_low[0] <= heartrate <= min_low[1]:
                            heartrate_status = 1  # Abnormal
                        elif max_low and max_low[0] is not None and max_low[1] is not None and max_low[0] <= heartrate <= max_low[1]:
                            heartrate_status = 1  # Abnormal
                        elif heartrate and isinstance(heartrate, list) and heartrate[0] is not None and normal[1] is not None and normal[0] <= heartrate <= normal[1]:
                            heartrate_status = 0  # Normal
                        elif heartrate and not isinstance(heartrate, list) and heartrate >= heartrate:
                            heartrate_status = 0  # Normal
                        elif min_medium and min_medium[0] is not None and min_medium[1] is not None and min_medium[0] <= heartrate <= min_medium[1]:
                            heartrate_status = 2  # Critical
                        elif max_medium and max_medium[0] is not None and max_medium[1] is not None and max_medium[0] <= heartrate <= max_medium[1]:
                            heartrate_status = 2  # Critical
                        elif max_medium is not None and max_medium >= max_medium:
                            heartrate_status = 2  

                    if vital_chart.Vitals == 'Supplemental Oxygen' and SupplementalOxygen is not None:
                        # Logic for Supplemental Oxygen
                        if normal and  SupplementalOxygen in normal:
                            SupplementalOxygen_status = 0  # Normal
                        
                        elif min_medium and SupplementalOxygen in min_medium:
                            SupplementalOxygen_status = 2  # Critical


                    if vital_chart.Vitals == 'Level of Consiousness' and LevelOfConsiousness is not None:
                       

                        if normal and  LevelOfConsiousness in normal:
                            LevelOfConsiousness_status = 0  # Normal
                        
                        elif max_high and LevelOfConsiousness in max_high:
                            LevelOfConsiousness_status = 3  # Critical

                        elif max_medium and LevelOfConsiousness in max_medium:
                            LevelOfConsiousness_status = 2  # Critical

             

                    if vital_chart.Vitals == 'Capillary Refill Time' and CapillaryRefillTime is not None:
                        if normal and  CapillaryRefillTime in normal:
                            CapillaryRefillTime_status = 0  # Normal
                        elif max_low and CapillaryRefillTime in max_low:
                            CapillaryRefillTime_status = 1  # Critical        
                        elif max_high and CapillaryRefillTime in max_high:
                            CapillaryRefillTime_status = 3  # Critical        
                        elif max_medium and CapillaryRefillTime in max_medium:
                            CapillaryRefillTime_status = 2  # Critical        
                            
                return respiratory_status, spo2_status,temperature_status,sbp_status,heartrate_status,SupplementalOxygen_status,LevelOfConsiousness_status,CapillaryRefillTime_status

            respiratory_status, spo2_status,temperature_status,sbp_status,heartrate_status,SupplementalOxygen_status,LevelOfConsiousness_status,CapillaryRefillTime_status = evaluate_vital_sign(respiratoryrate, spo2,temperature,sbp,heartrate,SupplementalOxygen,LevelOfConsiousness,CapillaryRefillTime, age_group)

            print(respiratory_status, 'respiratory_status----------')
            print(spo2_status, 'spo2_status----------')
            print(temperature_status, 'temperature_status----------')
            print(sbp_status, 'sbp_status----------')
            print(heartrate_status, 'heartrate_status----------')
            print(SupplementalOxygen_status, 'SupplementalOxygen_status----------')
            print(LevelOfConsiousness_status, 'LevelOfConsiousness_status----------')
            print(CapillaryRefillTime_status, 'CapillaryRefillTime_status----------')

            
            vital_instance = Patient_Vital_Details(
                Registration_Id=registration_ins,
                Temperature=temperature,
                Temperature_Status=temperature_status,
                Pulse_Rate=pulserate,
                SPO2=spo2,
                SPO2_Status=spo2_status,
                Heart_Rate=heartrate,
                Heart_Rate_Status=heartrate_status,
                Respiratory_Rate=respiratoryrate,
                Respiratory_Status=respiratory_status,
                SBP=sbp,
                SBP_Status=sbp_status,
                DBP=dbp,
                Height=height,
                Weight=weight,
                BMI=bmi,
                WC=wc,
                HC=hc,
                BSL=bsl,
                Painscore=Painscore,
                SupplementalOxygen=SupplementalOxygen,
                SupplementalOxygen_Status=SupplementalOxygen_status,
                LevelOfConsiousness=LevelOfConsiousness,
                LevelOfConsiousness_Status=LevelOfConsiousness_status,
                CapillaryRefillTime=CapillaryRefillTime,
                CapillaryRefillTime_Status=CapillaryRefillTime_status,
                Type=Type,
                # DepartmentType=DepartmentType,
                Created_by=createdby,
            )
            vital_instance.save()

            return JsonResponse({'success': 'Vitals saved successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            Registration_Id = request.GET.get('RegistrationId')
            # DepartmentType = request.GET.get('DepartmentType')

            if not Registration_Id :
                return JsonResponse({'error': 'Registration_Id  is required'})

            
            vital_details = Patient_Vital_Details.objects.filter(Registration_Id__pk=Registration_Id)
           

            vital_details_data = []
            for idx, vital in enumerate(vital_details, start=1):
                vital_dict = {
                    'id': idx,
                    'RegistrationId': vital.Registration_Id.pk,
                    'VisitId': vital.Registration_Id.VisitId,
                    'PrimaryDoctorId': vital.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': vital.Registration_Id.PrimaryDoctor.ShortName,
                   'Temperature': vital.Temperature,
                    'temperature_status': vital.Temperature_Status,
                    'PulseRate': vital.Pulse_Rate,
                    'SPO2': vital.SPO2,
                    'spo2_status': vital.SPO2_Status,
                    'HeartRate': vital.Heart_Rate,
                    'heartrate_status': vital.Heart_Rate_Status,
                    'RespiratoryRate': vital.Respiratory_Rate,
                    'RespiratoryStatus': vital.Respiratory_Status,
                    'SBP': vital.SBP,
                    'sbp_status': vital.SBP_Status,
                    'DBP': vital.DBP,
                    'Height': vital.Height,
                    'Weight': vital.Weight,
                    'BMI': vital.BMI,
                    'WC': vital.WC,
                    'HC': vital.HC,
                    'BSL': vital.BSL,
                    'Painscore': vital.Painscore,
                    'SupplementalOxygen': vital.SupplementalOxygen,
                    'SupplementalOxygen_status': vital.SupplementalOxygen_Status,
                    'LevelOfConsiousness': vital.LevelOfConsiousness,
                    'LevelOfConsiousness_Status': vital.LevelOfConsiousness_Status,
                    'CapillaryRefillTime': vital.CapillaryRefillTime,
                    'CapillaryRefillTime_Status': vital.CapillaryRefillTime_Status,
                    'Type': vital.Type,
                    # 'DepartmentType': vital.DepartmentType,
                    'Date': vital.created_at.strftime('%d-%m-%y'),
                    'Time': vital.created_at.strftime('%H:%M:%S'),
                    'Createdby': vital.Created_by,
                }
                vital_details_data.append(vital_dict)

            return JsonResponse({'vital_details': vital_details_data})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)








# @csrf_exempt
# @require_http_methods(['POST','GET'])
# def Vitals_Form_Details_Link(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print(data)
#             RegistrationId = data.get("RegistrationId")
#             temperature = data.get("Temperature")
#             pulserate = data.get("PulseRate")
#             spo2 = data.get("SPO2")
#             heartrate = data.get("HeartRate")
#             respiratoryrate = data.get("RespiratoryRate")
#             sbp = data.get("SBP")
#             dbp = data.get("DBP")
#             height = data.get("Height")
#             weight = data.get("Weight")
#             bmi = data.get("BMI")
#             wc = data.get("WC")
#             hc = data.get("HC")
#             bsl = data.get("BSL")
#             Painscore = data.get("Painscore")
#             EtCO2 = data.get("ETCO2")
#             BreathSounds = data.get("BreathSounds")
#             createdby = data.get("Createdby")
#             registration_ins=None
            
#             if RegistrationId:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk = RegistrationId)
            
#             vital_instance = Patient_Vital_Details(
#                 Registration_Id = registration_ins,
#                 Temperature = temperature,
#                 Pulse_Rate =pulserate,
#                 SPO2 = spo2,
#                 Heart_Rate = heartrate,
#                 Respiratory_Rate = respiratoryrate,
#                 SBP =sbp,
#                 DBP = dbp,
#                 Height = height,
#                 Weight = weight,
#                 BMI = bmi,
#                 WC = wc,
#                 HC = hc,
#                 BSL = bsl,
#                 Painscore = Painscore,
#                 ETCO2 = EtCO2,
#                 BreathSounds = BreathSounds,
#                 Created_by = createdby,
#             )
#             vital_instance.save()
            
#             return JsonResponse({'success': 'Vitals saved successfully'})
#         except Exception as e:
#             print(f"An error occured: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occured'}, status = 500)
        
#     elif request.method == 'GET':
#         try:
#             RegistrationId=request.GET.get('RegistrationId')
#             if not RegistrationId:
#                 return JsonResponse({'warn': 'Patient Id required'}, status = 500)
            
#             vital_details = Patient_Vital_Details.objects.filter(Registration_Id__pk=RegistrationId)
#             print(vital_details,'vital_details')
#             vital_details_data =[]
#             for idx,vital in enumerate(vital_details, start=1):
#                 vital_dict = {
#                     'id' : idx,
#                     'RegistrationId': vital.Registration_Id.pk,
#                     'VisitId': vital.Registration_Id.VisitId,
#                     'PrimaryDoctorId': vital.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': vital.Registration_Id.PrimaryDoctor.ShortName,
#                     'Temperature' : vital.Temperature,
#                     'PulseRate' : vital.Pulse_Rate,
#                     'SPO2' : vital.SPO2,
#                     'HeartRate' : vital.Heart_Rate,
#                     'RespiratoryRate' : vital.Respiratory_Rate,
#                     'SBP' : vital.SBP,
#                     'DBP' : vital.DBP,
#                     'Height' : vital.Height,
#                     'Weight' : vital.Weight,
#                     'BMI' : vital.BMI,
#                     'WC' : vital.WC,
#                     'HC' : vital.HC,
#                     'BSL' : vital.BSL,
#                     'Painscore' : vital.Painscore,
#                     'EtCO2' : vital.ETCO2,
#                     'BreathSounds' : vital.BreathSounds,
#                     'Date': vital.created_at.strftime('%d-%m-%y'), 
#                     'Time' : vital.created_at.strftime('%H:%M:%S'),
#                     'Createdby' : vital.Created_by,
#                 }
#                 vital_details_data.append(vital_dict)

#             return JsonResponse(vital_details_data,safe=False)
        
#         except Exception as e:
#             print(f"An error occured: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occured'}, status = 500)
        
































