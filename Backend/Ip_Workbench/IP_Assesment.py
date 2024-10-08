
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *


@csrf_exempt
@require_http_methods(['POST', 'GET'])
def IP_Assesment_details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            PresentingComplaints = data.get('PresentingComplaints', '')
            DetailsPresentingComplaints = data.get('DetailsPresentingComplaints', '')
            HistoryOf = data.get('HistoryOf', '')
            PatientStatusAtAdmission = data.get('PatientStatusAtAdmission', '')
            MedicalHistoryCheckbox = data.get('MedicalHistoryCheckbox', '')
            MedicalHistoryOthers = data.get('MedicalHistoryOthers', '')
            SocialHistoryCheckbox = data.get('SocialHistoryCheckbox', '')
            FamilyHistoryCheckbox = data.get('FamilyHistoryCheckbox', '')
            FamilyHistoryOthers = data.get('FamilyHistoryOthers', '')
            RelationShip = data.get('RelationShip', '')
            SurgicalHistoryCheckbox = data.get('SurgicalHistoryCheckbox', '')
            SurgicalHistoryOthers = data.get('SurgicalHistoryOthers', '')
            ListnamesAnddates = data.get('Listnamesdates', '')
            womenMenCheckbox = data.get('womenMenCheckbox', '')
            menCheckbox = data.get('menCheckbox', '')
            Dateoflastcolonoscopy = data.get('Dateoflastcolonoscopy', '')
            Lmp = data.get('Lmp', '')
            NoOfPregnancies = data.get('NoOfPregnancies', '')
            NoOfDeliveries = data.get('NoOfDeliveries', '')
            Vaginal = data.get('Vaginal', '')
            Csection = data.get('Csection', '')
            MisCarriage = data.get('MisCarriage', '')
            VipAbortions = data.get('VipAbortions', '')
            Allergies = data.get('Allergies', '')
            Temperature = data.get('Temperature', '')
            PulseRate = data.get('PulseRate', '')
            Spo2 = data.get('SPO2', '')
            HeartRate = data.get('HeartRate', '')
            Rr = data.get('RR', '')
            Bp = data.get('BP', '')
            Height = data.get('Height', '')
            Weight = data.get('Weight', '')
            Bmi = data.get('BMI', '')
            Wc = data.get('WC', '')
            Hc = data.get('HC', '')
            Bsl = data.get('BSL', '')
            Cvs = data.get('Cvs', '')
            Pupil = data.get('Pupil', '')
            UlRt = data.get('UlRt', '')
            UlLt = data.get('UlLt', '')
            LlRt = data.get('LlRt', '')
            LlLt = data.get('LlLt', '')
            Rt = data.get('Rt', '')
            Lt = data.get('Lt', '')
            Rs = data.get('Rs', '')
            Pa = data.get('Pa', '')
            Cns = data.get('Cns', '')
            LocalExamination = data.get('LocalExamination', '')
            LocalOthers = data.get('LocalOthersCheckbox', '')
            ProvisionalDiagnosis = data.get('ProvisionalDiagnosis', '')
            FinalDiagnosis = data.get('FinalDiagnosis', '')
            isSameAsProvisional = data.get('isSameAsProvisional', '')
            TreatmentGiven = data.get('TreatmentGiven', '')
            DepartmentType = data.get("DepartmentType")

            RegistrationId = data.get("RegistrationId")
            createdby = data.get("created_by")

            registration_ins_ip = None
            registration_ins_casuality = None
            
            if RegistrationId:
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

            # Save Assesment details
            Assesment_instance = IP_Assesment_Details(
                Presenting_Complaints=PresentingComplaints,
                DetailsPresenting_Complaints=DetailsPresentingComplaints,
                History_Of=HistoryOf,
                PatientStatus_AtAdmission=PatientStatusAtAdmission,
                MedicalHistory_Checkbox=MedicalHistoryCheckbox,
                MedicalHistory_Others=MedicalHistoryOthers,
                SocialHistory_Checkbox=SocialHistoryCheckbox,
                FamilyHistory_Checkbox=FamilyHistoryCheckbox,
                FamilyHistory_Others=FamilyHistoryOthers,
                RelationShip=RelationShip,
                SurgicalHistory_Checkbox=SurgicalHistoryCheckbox,
                SurgicalHistory_Others=SurgicalHistoryOthers,
                Listnames_Anddates=ListnamesAnddates,
                womenMen_Checkbox=womenMenCheckbox,
                men_Checkbox=menCheckbox,
                Dateoflast_colonoscopy=Dateoflastcolonoscopy,
                Lmp=Lmp,
                NoOf_Pregnancies=NoOfPregnancies,
                NoOf_Deliveries=NoOfDeliveries,
                Vaginal=Vaginal,
                Csection=Csection,
                MisCarriage=MisCarriage,
                Vip_Abortions=VipAbortions,
                Allergies=Allergies,
                Temperature=Temperature,
                Pulse_Rate=PulseRate,
                SPO2=Spo2,
                Heart_Rate=HeartRate,
                RR=Rr,
                BP=Bp,
                Height=Height,
                Weight=Weight,
                BMI=Bmi,
                WC=Wc,
                HC=Hc,
                BSL=Bsl,
                CVS=Cvs,
                Pupil=Pupil,
                UlRt=UlRt,
                UlLt=UlLt,
                LlRt=LlRt,
                LlLt=LlLt,
                Rt=Rt,
                Lt=Lt,
                RS=Rs,
                PA=Pa,
                CNS=Cns,
                Local_Examination=LocalExamination,
                LocalOthers=LocalOthers,
                Provisional_Diagnosis=ProvisionalDiagnosis,
                isSameAsProvisional=isSameAsProvisional,
                Final_Diagnosis=FinalDiagnosis,
                Treatment_Given=TreatmentGiven,
                DepartmentType=DepartmentType,
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                Created_by=createdby,
            )
            Assesment_instance.save()
            
            return JsonResponse({'success': 'Assesment details saved successfully'})
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
                Assesment_details = IP_Assesment_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                Assesment_details = IP_Assesment_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
           
            # Serialize data
            Assesment_details_data = []
            for idx, Assesment in enumerate(Assesment_details, start=1):
                Assesment_dict = {
                    'id': idx,
                    'RegistrationId': Assesment.Ip_Registration_Id.pk if Assesment.Ip_Registration_Id else Assesment.Casuality_Registration_Id.pk,
                    'VisitId': Assesment.Ip_Registration_Id.VisitId if Assesment.Ip_Registration_Id else Assesment.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': Assesment.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if Assesment.Ip_Registration_Id else Assesment.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Assesment.Ip_Registration_Id.PrimaryDoctor.ShortName if Assesment.Ip_Registration_Id else Assesment.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'PresentingComplaints': Assesment.Presenting_Complaints,
                    'DetailsPresentingComplaints': Assesment.DetailsPresenting_Complaints,
                    'HistoryOf': Assesment.History_Of,
                    'PatientStatusAtAdmission': Assesment.PatientStatus_AtAdmission,
                    'MedicalHistoryCheckbox': Assesment.MedicalHistory_Checkbox,
                    'MedicalHistoryOthers': Assesment.MedicalHistory_Others,
                    'SocialHistoryCheckbox': Assesment.SocialHistory_Checkbox,
                    'FamilyHistoryCheckbox': Assesment.FamilyHistory_Checkbox,
                    'FamilyHistoryOthers': Assesment.FamilyHistory_Others,
                    'RelationShip': Assesment.RelationShip,
                    'SurgicalHistoryCheckbox': Assesment.SurgicalHistory_Checkbox,
                    'SurgicalHistoryOthers': Assesment.SurgicalHistory_Others,
                    'Listnamesdates': Assesment.Listnames_Anddates,
                    'womenMenCheckbox': Assesment.womenMen_Checkbox,
                    'menCheckbox': Assesment.men_Checkbox,
                    'Dateoflastcolonoscopy': Assesment.Dateoflast_colonoscopy,
                    'Lmp': Assesment.Lmp,
                    'NoOfPregnancies': Assesment.NoOf_Pregnancies,
                    'NoOfDeliveries': Assesment.NoOf_Deliveries,
                    'Vaginal': Assesment.Vaginal,
                    'Csection': Assesment.Csection,
                    'MisCarriage': Assesment.MisCarriage,
                    'VipAbortions': Assesment.Vip_Abortions,
                    'Allergies': Assesment.Allergies,
                    'Temperature': Assesment.Temperature,
                    'PulseRate': Assesment.Pulse_Rate,
                    'SPO2': Assesment.SPO2,
                    'HeartRate': Assesment.Heart_Rate,
                    'RR': Assesment.RR,
                    'BP': Assesment.BP,
                    'Height': Assesment.Height,
                    'Weight': Assesment.Weight,
                    'BMI': Assesment.BMI,
                    'WC': Assesment.WC,
                    'HC': Assesment.HC,
                    'BSL': Assesment.BSL,
                    'Cvs': Assesment.CVS,
                    'Pupil': Assesment.Pupil,
                    'UlRt': Assesment.UlRt,
                    'UlLt': Assesment.UlLt,
                    'LlRt': Assesment.LlRt,
                    'LlLt': Assesment.LlLt,
                    'Rt': Assesment.Rt,
                    'Lt': Assesment.Lt,
                    'Rs': Assesment.RS,
                    'Pa': Assesment.PA,
                    'Cns': Assesment.CNS,
                    'LocalExamination': Assesment.Local_Examination,
                    'LocalOthersCheckbox': Assesment.LocalOthers,
                    'ProvisionalDiagnosis': Assesment.Provisional_Diagnosis,
                    'isSameAsProvisional': Assesment.isSameAsProvisional,
                    'FinalDiagnosis': Assesment.Final_Diagnosis,
                    'TreatmentGiven': Assesment.Treatment_Given,
                    'Date': Assesment.created_at.strftime('%d-%m-%y'),
                    'Time': Assesment.created_at.strftime('%H:%M:%S'),
                    'Createdby': Assesment.Created_by,
                    'DepartmentType': Assesment.DepartmentType,

                }
                Assesment_details_data.append(Assesment_dict)

            return JsonResponse(Assesment_details_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





