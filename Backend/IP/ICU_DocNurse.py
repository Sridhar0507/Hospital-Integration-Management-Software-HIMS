from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import *
from django.db.models import Max
from django.core.exceptions import ValidationError
import base64
from django.core.files.base import ContentFile

import magic


#------------------------ Assesment Insert Get --------------------------------------


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Assessment_Details_Link(request):
    if request.method == 'POST':
        try:
            # Parse the form data from the request
            data = request.POST

            # Extract and validate data
            PresentingComplaints = data.get('PresentingComplaints', '')
            DetailsPresentingComplaints = data.get('DetailsPresentingComplaints', '')
            HistoryOf = data.get('HistoryOf', '')
            PatientStatusAtAdmission = data.get('PatientStatusAtAdmission', '')
            MedicalHistoryCheckbox = data.get('MedicalHistoryCheckbox', '')
            MedicalHistoryOthers = data.get('MedicalHistoryOthers', '')
            SocialHistoryCheckbox = data.get('SocialHistoryCheckbox', '')
            FamilyHistoryCheckbox = data.get('FamilyHistoryCheckbox', '')
            FamilyHistoryOthers = data.get('FamilyHistoryOthers', '')
            RelationShip1 = data.get('RelationShip1', '')
            SurgicalHistoryCheckbox = data.get('SurgicalHistoryCheckbox', '')
            SurgicalHistoryOthers = data.get('SurgicalHistoryOthers', '')
            ListnamesAnddates = data.get('ListnamesAnddates', '')
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
            Created_By = data.get('CreatedBy', '')
            location = data.get('Location', '')
            PatientId = data.get('PatientId', '')
            Booking_Id = data.get('Booking_Id', '')
            PatientName = data.get('PatientName', '')

 # Check if an assessment with the same Booking_Id already exists
            if Assesment_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'Assessment already exists for this Booking_Id'}, status=400)



            Vitals_instance = Assesment_Details(
                
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                Presenting_Complaints=PresentingComplaints,
                DetailsPresenting_Complaints=DetailsPresentingComplaints,
                History_Of=HistoryOf,
                PatientStatus_AtAdmission=PatientStatusAtAdmission,
                MedicalHistory_Checkbox=MedicalHistoryCheckbox,
                MedicalHistory_Others=MedicalHistoryOthers,
                SocialHistory_Checkbox=SocialHistoryCheckbox,
                FamilyHistory_Checkbox=FamilyHistoryCheckbox,
                FamilyHistory_Others=FamilyHistoryOthers,
                RelationShip=RelationShip1,
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
                Location=location,
                CreatedBy=Created_By
            )
            Vitals_instance.save()

            return JsonResponse({'success': 'Assessment added successfully'})
               
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)}, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            
            Booking_Id = request.GET.get('Booking_Id')

 # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            Assesments = Assesment_Details.objects.filter(Booking_Id =Booking_Id)

            Assesment_data = [
                {
                    'id': Assesment.Assesment_Id,
                    'PresentingComplaints': Assesment.Presenting_Complaints,
                    'DetailsPresentingComplaints': Assesment.DetailsPresenting_Complaints,
                    'HistoryOf': Assesment.History_Of,
                    'PatientStatusAtAdmission': Assesment.PatientStatus_AtAdmission,
                    'MedicalHistoryCheckbox': Assesment.MedicalHistory_Checkbox,
                    'MedicalHistoryOthers': Assesment.MedicalHistory_Others,
                    'SocialHistoryCheckbox': Assesment.SocialHistory_Checkbox,
                    'FamilyHistoryCheckbox': Assesment.FamilyHistory_Checkbox,
                    'FamilyHistoryOthers': Assesment.FamilyHistory_Others,
                    'RelationShip1': Assesment.RelationShip,
                    'SurgicalHistoryCheckbox': Assesment.SurgicalHistory_Checkbox,
                    'SurgicalHistoryOthers': Assesment.SurgicalHistory_Others,
                    'ListnamesAnddates': Assesment.Listnames_Anddates,
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
                    'Location': Assesment.Location,
                    'CreatedBy': Assesment.CreatedBy
                } for Assesment in Assesments
            ]

            return JsonResponse(Assesment_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)




#------------------------ MLC  Insert Get--------------------------------------


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Mlc_Details_Link(request):
    if request.method == 'POST':
        try:


            # Parse the form data from the request
            data = json.loads(request.body)

            # Extract and validate data
            print(data,'fffffffff')
            MlcNo = data.get('MlcNo','')
            MlcInfoDate = data.get('MlcInfoDate')
            MlcInfoTime = data.get('MlcInfoTime')
            InformedBy = data.get('InformedBy')
            MlcSendTime = data.get('MlcSendTime')
            Reason = data.get('Reason')
            Type = data.get('Type')
            PoliceStationName = data.get('PoliceStationName')
            ConsultantName = data.get('ConsultantName')
            RmoName = data.get('RmoName')
            MlcCopyReceiveTime = data.get('MlcCopyReceiveTime')
            ReceivedBySister = data.get('ReceivedBySister')
            ReceptionStaffName = data.get('ReceptionStaffName')
            InchargeName = data.get('InchargeName')
            Remarks = data.get('Remarks')
            
            Created_By = data.get('CreatedBy')
            location = data.get('Location')
            PatientId = data.get('PatientId','')
            Booking_Id = data.get('Booking_Id','')
            PatientName = data.get('PatientName','')

            print(data,'data')

 # Check if an assessment with the same Booking_Id already exists
            if Mlc_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'MLC already exists for this Booking_Id'})


            # max_id = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id'] or 0
            # next_id = max_id + 1

            Mlc_instance = Mlc_Details(
                
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                Mlc_No=MlcNo,
                Mlc_InfoDate=MlcInfoDate,
                Mlc_InfoTime=MlcInfoTime,
                Informed_By=InformedBy,
                Mlc_SendTime=MlcSendTime,
                Mlc_Reason=Reason,
                Mlc_Type=Type,
                PoliceStation_Name=PoliceStationName,
                Consultant_Name=ConsultantName,
                Rmo_Name=RmoName,
                MlcCopy_ReceiveTime=MlcCopyReceiveTime,
                ReceivedBy_Sister=ReceivedBySister,
                Reception_StaffName=ReceptionStaffName,
                Incharge_Name=InchargeName,
                Mlc_Remarks=Remarks,
                Location=location,
                CreatedBy=Created_By
            )
            Mlc_instance.save()

            return JsonResponse({'success': 'Mlc added successfully'})
               
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            
            Booking_Id = request.GET.get('Booking_Id')

 # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            MlcData = Mlc_Details.objects.filter(Booking_Id =Booking_Id)

            Assesment_data = [
                {
                    'id': Mlc.Mlc_Id,
                    'MlcNo': Mlc.Mlc_No,
                    'MlcInfoDate': Mlc.Mlc_InfoDate,
                    'MlcInfoTime': Mlc.Mlc_InfoTime,
                    'InformedBy': Mlc.Informed_By,
                    'MlcSendTime': Mlc.Mlc_SendTime,
                    'Reason': Mlc.Mlc_Reason,
                    'Type': Mlc.Mlc_Type,
                    'PoliceStationName': Mlc.PoliceStation_Name,
                    'ConsultantName': Mlc.Consultant_Name,
                    'RmoName': Mlc.Rmo_Name,
                    'MlcCopyReceiveTime': Mlc.MlcCopy_ReceiveTime,
                    'ReceivedBySister': Mlc.ReceivedBy_Sister,
                    'ReceptionStaffName': Mlc.Reception_StaffName,
                    'InchargeName': Mlc.Incharge_Name,
                    'Remarks': Mlc.Mlc_Remarks,
                    
                } for Mlc in MlcData
            ]

            return JsonResponse(Assesment_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)



#------------------------  Ward_PreOpChecklist  Insert Get--------------------------------------


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Ward_PreOpChecklist_Details_Link(request):
    if request.method == 'POST':
        try:


            # Parse the form data from the request
            data = json.loads(request.body)

            # Extract and validate data
            print(data,'fffffffff')
            Date = data.get('Date','')
            Time = data.get('Time')
            OperativeArea = data.get('OperativeArea')
            OperativeAreaRemarks = data.get('OperativeAreaRemarks')
            Operativeinspected = data.get('Operativeinspected')
            OperativeinspectedRemarks = data.get('OperativeinspectedRemarks')
            JewelleryRemoved = data.get('JewelleryRemoved')
            JewelleryRemovedRemarks = data.get('JewelleryRemovedRemarks')
            JewelleryTied = data.get('JewelleryTied')
            JewelleryTiesRemarks = data.get('JewelleryTiesRemarks')
            NasogastricTube = data.get('NasogastricTube')
            NasogastricTubeRemarks = data.get('NasogastricTubeRemarks')
            Falsetooth = data.get('Falsetooth')
            FalsetoothRemarks = data.get('FalsetoothRemarks')
            ColouredNail = data.get('ColouredNail')
            ColouredNailRemarks = data.get('ColouredNailRemarks')
            HairPrepared = data.get('HairPrepared')
            HairPreparedRemarks = data.get('HairPreparedRemarks')
            VoidedAmount = data.get('VoidedAmount')
            VoidedAmountRemarks = data.get('VoidedAmountRemarks')
            VoidedTime = data.get('VoidedTime')
            VoidedTimeRemarks = data.get('VoidedTimeRemarks')
            VaginalDouche = data.get('VaginalDouche')
            VaginalDoucheRemarks = data.get('VaginalDoucheRemarks')
            Allergies = data.get('Allergies')
            AllergiesRemarks = data.get('AllergiesRemarks')
            BathTaken = data.get('BathTaken')
            BathTakenRemarks = data.get('BathTakenRemarks')
            BloodRequirement = data.get('BloodRequirement')
            BloodRequirementRemarks = data.get('BloodRequirementRemarks')
            ConsentForm = data.get('ConsentForm')
            ConsentFormRemarks = data.get('ConsentFormRemarks')
            MorningTPR = data.get('MorningTPR')
            MorningTPRRemarks = data.get('MorningTPRRemarks')
            MorningSample = data.get('MorningSample')
            MorningSampleRemarks = data.get('MorningSampleRemarks')
            XRayFilms = data.get('XRayFilms')
            XRayFilmsRemarks = data.get('XRayFilmsRemarks')
            PreanaestheticMedication = data.get('PreanaestheticMedication')
            PreanaestheticMedicationRemarks = data.get('PreanaestheticMedicationRemarks')
            SideRails = data.get('SideRails')
            SideRailsRemarks = data.get('SideRailsRemarks')
            PulseRate = data.get('PulseRate')
            PulseRateRemarks = data.get('PulseRateRemarks')
            RespRate = data.get('RespRate')
            RespRateRemarks = data.get('RespRateRemarks')
            IdentificationWristlet = data.get('IdentificationWristlet')
            IdentificationWristletRemarks = data.get('IdentificationWristletRemarks')
            SpecialDrug = data.get('SpecialDrug')
            DutySisterName = data.get('DutySisterName')
            Created_By = data.get('CreatedBy')
            location = data.get('Location')
            PatientId = data.get('PatientId','')
            Booking_Id = data.get('Booking_Id','')
            PatientName = data.get('PatientName','')

            print(data,'data')

 # Check if an assessment with the same Booking_Id already exists
            if Ward_PreOpChecklist_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'MLC already exists for this Booking_Id'})


            # max_id = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id'] or 0
            # next_id = max_id + 1

            PreOpChecklist_instance = Ward_PreOpChecklist_Details(
                
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                Date=Date,
                Time=Time,
                OperativeArea=OperativeArea,
                OperativeAreaRemarks=OperativeAreaRemarks,
                Operativeinspected=Operativeinspected,
                OperativeinspectedRemarks=OperativeinspectedRemarks,
                JewelleryRemoved=JewelleryRemoved,
                JewelleryRemovedRemarks=JewelleryRemovedRemarks,
                JewelleryTied=JewelleryTied,
                JewelleryTiesRemarks=JewelleryTiesRemarks,
                NasogastricTube=NasogastricTube,
                NasogastricTubeRemarks=NasogastricTubeRemarks,
                Falsetooth=Falsetooth,
                FalsetoothRemarks=FalsetoothRemarks,
                ColouredNail=ColouredNail,
                ColouredNailRemarks=ColouredNailRemarks,
                HairPrepared=HairPrepared,
                HairPreparedRemarks=HairPreparedRemarks,
                VoidedAmount=VoidedAmount,
                VoidedAmountRemarks=VoidedAmountRemarks,
                VoidedTime=VoidedTime,
                VoidedTimeRemarks=VoidedTimeRemarks,
                VaginalDouche=VaginalDouche,
                VaginalDoucheRemarks=VaginalDoucheRemarks,
                Allergies=Allergies,
                AllergiesRemarks=AllergiesRemarks,
                BathTaken=BathTaken,
                BathTakenRemarks=BathTakenRemarks,
                BloodRequirement=BloodRequirement,
                BloodRequirementRemarks=BloodRequirementRemarks,
                ConsentForm=ConsentForm,
                ConsentFormRemarks=ConsentFormRemarks,
                MorningTPR=MorningTPR,
                MorningTPRRemarks=MorningTPRRemarks,
                MorningSample=MorningSample,
                MorningSampleRemarks=MorningSampleRemarks,
                XRayFilms=XRayFilms,
                XRayFilmsRemarks=XRayFilmsRemarks,
                PreanaestheticMedication=PreanaestheticMedication,
                PreanaestheticMedicationRemarks=PreanaestheticMedicationRemarks,
                SideRails=SideRails,
                SideRailsRemarks=SideRailsRemarks,
                PulseRate=PulseRate,
                PulseRateRemarks=PulseRateRemarks,
                RespRate=RespRate,
                RespRateRemarks=RespRateRemarks,
                IdentificationWristlet=IdentificationWristlet,
                IdentificationWristletRemarks=IdentificationWristletRemarks,
                SpecialDrug=SpecialDrug,
                DutySisterName=DutySisterName,
                Location=location,
                CreatedBy=Created_By
            )
            PreOpChecklist_instance.save()

            return JsonResponse({'success': 'PreOpChecklist added successfully'})
               
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            
            Booking_Id = request.GET.get('Booking_Id')

 # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            PreOpChecklistData = Ward_PreOpChecklist_Details.objects.filter(Booking_Id =Booking_Id)

            PreOp_data = [
                {
                    'id': PreOpCh.PreOp_Id,
                    'Date': PreOpCh.Date,
                    'Time': PreOpCh.Time,
                    'OperativeArea': PreOpCh.OperativeArea,
                    'OperativeAreaRemarks': PreOpCh.OperativeAreaRemarks,
                    'Operativeinspected': PreOpCh.Operativeinspected,
                    'OperativeinspectedRemarks': PreOpCh.OperativeinspectedRemarks,
                    'JewelleryRemoved': PreOpCh.JewelleryRemoved,
                    'JewelleryRemovedRemarks': PreOpCh.JewelleryRemovedRemarks,
                    'JewelleryTied': PreOpCh.JewelleryTied,
                    'JewelleryTiesRemarks': PreOpCh.JewelleryTiesRemarks,
                    'NasogastricTube': PreOpCh.NasogastricTube,
                    'NasogastricTubeRemarks': PreOpCh.NasogastricTubeRemarks,
                    'Falsetooth': PreOpCh.Falsetooth,
                    'FalsetoothRemarks': PreOpCh.FalsetoothRemarks,
                    'ColouredNail': PreOpCh.ColouredNail,
                    'ColouredNailRemarks': PreOpCh.ColouredNailRemarks,
                    'HairPrepared': PreOpCh.HairPrepared,
                    'HairPreparedRemarks': PreOpCh.HairPreparedRemarks,
                    'VoidedAmount': PreOpCh.VoidedAmount,
                    'VoidedAmountRemarks': PreOpCh.VoidedAmountRemarks,
                    'VoidedTime': PreOpCh.VoidedTime,
                    'VoidedTimeRemarks': PreOpCh.VoidedTimeRemarks,
                    'VaginalDouche': PreOpCh.VaginalDouche,
                    'VaginalDoucheRemarks': PreOpCh.VaginalDoucheRemarks,
                    'Allergies': PreOpCh.Allergies,
                    'AllergiesRemarks': PreOpCh.AllergiesRemarks,
                    'BathTaken': PreOpCh.BathTaken,
                    'BathTakenRemarks': PreOpCh.BathTakenRemarks,
                    'BloodRequirement': PreOpCh.BloodRequirement,
                    'BloodRequirementRemarks': PreOpCh.BloodRequirementRemarks,
                    'ConsentForm': PreOpCh.ConsentForm,
                    'ConsentFormRemarks': PreOpCh.ConsentFormRemarks,
                    'MorningTPR': PreOpCh.MorningTPR,
                    'MorningTPRRemarks': PreOpCh.MorningTPRRemarks,
                    'MorningSample': PreOpCh.MorningSample,
                    'MorningSampleRemarks': PreOpCh.MorningSampleRemarks,
                    'XRayFilms': PreOpCh.XRayFilms,
                    'XRayFilmsRemarks': PreOpCh.XRayFilmsRemarks,
                    'PreanaestheticMedication': PreOpCh.PreanaestheticMedication,
                    'PreanaestheticMedicationRemarks': PreOpCh.PreanaestheticMedicationRemarks,
                    'SideRails': PreOpCh.SideRails,
                    'SideRailsRemarks': PreOpCh.SideRailsRemarks,
                    'PulseRate': PreOpCh.PulseRate,
                    'PulseRateRemarks': PreOpCh.PulseRateRemarks,
                    'RespRate': PreOpCh.RespRate,
                    'RespRateRemarks': PreOpCh.RespRateRemarks,
                    'IdentificationWristlet': PreOpCh.IdentificationWristlet,
                    'IdentificationWristletRemarks': PreOpCh.IdentificationWristletRemarks,
                    'SpecialDrug': PreOpCh.SpecialDrug,
                    'DutySisterName': PreOpCh.DutySisterName,
                    
                    
                } for PreOpCh in PreOpChecklistData
            ]

            return JsonResponse(PreOp_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)





#------------------------  OT_PreOpChecklist  Insert Get--------------------------------------


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def OT_PreOpChecklist_Details_Link(request):
    if request.method == 'POST':
        try:


            # Parse the form data from the request
            data = json.loads(request.body)

            # Extract and validate data
            print(data,'fffffffff')
            Date = data.get('Date','')
            Time = data.get('Time')
            NbmStatus = data.get('NbmStatus')
            NbmStatusRemarks = data.get('NbmStatusRemarks')
            PulseBp = data.get('PulseBp')
            PulseBpRemarks = data.get('PulseBpRemarks')
            PreoperativeInj = data.get('PreoperativeInj')
            PreoperativeInjRemarks = data.get('PreoperativeInjRemarks')
            CheckVeinflowIv = data.get('CheckVeinflowIv')
            CheckVeinflowIvRemarks = data.get('CheckVeinflowIvRemarks')
            InvestigationReport = data.get('InvestigationReport')
            InvestigationReportCheckbox = data.get('InvestigationReportCheckbox')
            InvestigationReportRemarks = data.get('InvestigationReportRemarks')
            PatientConsent = data.get('PatientConsent')
            PatientConsentRemarks = data.get('PatientConsentRemarks')
            JewellryConsentActualStatus = data.get('JewellryConsentActualStatus')
            JewellryConsentActualStatusRemarks = data.get('JewellryConsentActualStatusRemarks')
            DentureRemoval = data.get('DentureRemoval')
            DentureRemovalRemarks = data.get('DentureRemovalRemarks')
            NailPaint = data.get('NailPaint')
            NailPaintRemarks = data.get('NailPaintRemarks')
            SugarLevel = data.get('SugarLevel')
            SugarLevelRemarks = data.get('SugarLevelRemarks')
            PatientAllergy = data.get('PatientAllergy')
            PatientAllergyRemarks = data.get('PatientAllergyRemarks')
            PatientShave = data.get('PatientShave')
            PatientShaveRemarks = data.get('PatientShaveRemarks')
            PatientCatheter = data.get('PatientCatheter')
            PatientCatheterRemarks = data.get('PatientCatheterRemarks')
            BpTablet = data.get('BpTablet')
            BpTabletRemarks = data.get('BpTabletRemarks')
            SurgicalSide = data.get('SurgicalSide')
            SurgicalSideRemarks = data.get('SurgicalSideRemarks')
            XrayCt = data.get('XrayCt')
            XrayCtRemarks = data.get('XrayCtRemarks')
            TabMisoprost = data.get('TabMisoprost')
            TabMisoprostRemarks = data.get('TabMisoprostRemarks')
            Hrct = data.get('Hrct')
            HrctRemarks = data.get('HrctRemarks')
            DutySisterName = data.get('DutySisterName')
            OtTechName = data.get('OtTechName')
            CreatedBy = data.get('CapturedBy')
            location = data.get('Location')
            PatientId = data.get('PatientId','')
            Booking_Id = data.get('Booking_Id','')
            PatientName = data.get('Patient_Name','')

            print(data,'data')

 # Check if an assessment with the same Booking_Id already exists
            if OT_PreOpChecklist_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'MLC already exists for this Booking_Id'})


            # max_id = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id'] or 0
            # next_id = max_id + 1

            PreOpChecklist_instance = OT_PreOpChecklist_Details(
                
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                Date=Date,
                Time=Time,
                NbmStatus=NbmStatus,
                NbmStatusRemarks=NbmStatusRemarks,
                PulseBp=PulseBp,
                PulseBpRemarks=PulseBpRemarks,
                PreoperativeInj=PreoperativeInj,
                PreoperativeInjRemarks=PreoperativeInjRemarks,
                CheckVeinflowIv=CheckVeinflowIv,
                CheckVeinflowIvRemarks=CheckVeinflowIvRemarks,
                InvestigationReport=InvestigationReport,
                InvestigationReportCheckbox=InvestigationReportCheckbox,
                InvestigationReportRemarks=InvestigationReportRemarks,
                PatientConsent=PatientConsent,
                PatientConsentRemarks=PatientConsentRemarks,
                JewellryConsentActualStatus=JewellryConsentActualStatus,
                JewellryConsentActualStatusRemarks=JewellryConsentActualStatusRemarks,
                DentureRemoval=DentureRemoval,
                DentureRemovalRemarks=DentureRemovalRemarks,
                NailPaint=NailPaint,
                NailPaintRemarks=NailPaintRemarks,
                SugarLevel=SugarLevel,
                SugarLevelRemarks=SugarLevelRemarks,
                PatientAllergy=PatientAllergy,
                PatientAllergyRemarks=PatientAllergyRemarks,
                PatientShave=PatientShave,
                PatientShaveRemarks=PatientShaveRemarks,
                PatientCatheter=PatientCatheter,
                PatientCatheterRemarks=PatientCatheterRemarks,
                BpTablet=BpTablet,
                BpTabletRemarks=BpTabletRemarks,
                SurgicalSide=SurgicalSide,
                SurgicalSideRemarks=SurgicalSideRemarks,
                XrayCt=XrayCt,
                XrayCtRemarks=XrayCtRemarks,
                TabMisoprost=TabMisoprost,
                TabMisoprostRemarks=TabMisoprostRemarks,
                Hrct=Hrct,
                HrctRemarks=HrctRemarks,
                DutySisterName=DutySisterName,
                OtTechName=OtTechName,
                Location=location,
                CreatedBy=CreatedBy,
                
            )
            PreOpChecklist_instance.save()

            return JsonResponse({'success': 'PreOpChecklist added successfully'})
               
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            
            Booking_Id = request.GET.get('Booking_Id')

 # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            PreOpChecklistData = OT_PreOpChecklist_Details.objects.filter(Booking_Id =Booking_Id)

            PreOp_data = [
                {
                    'id': PreOpCh.PreOp_Id,
                    'Date': PreOpCh.Date,
                    'Time': PreOpCh.Time,
                    'NbmStatus': PreOpCh.NbmStatus,
                    'NbmStatusRemarks': PreOpCh.NbmStatusRemarks,
                    'PulseBp': PreOpCh.PulseBp,
                    'PulseBpRemarks': PreOpCh.PulseBpRemarks,
                    'PreoperativeInj': PreOpCh.PreoperativeInj,
                    'PreoperativeInjRemarks': PreOpCh.PreoperativeInjRemarks,
                    'CheckVeinflowIv': PreOpCh.CheckVeinflowIv,
                    'CheckVeinflowIvRemarks': PreOpCh.CheckVeinflowIvRemarks,
                    'InvestigationReport': PreOpCh.InvestigationReport,
                    'InvestigationReportCheckbox': PreOpCh.InvestigationReportCheckbox,
                    'InvestigationReportRemarks': PreOpCh.InvestigationReportRemarks,
                    'PatientConsent': PreOpCh.PatientConsent,
                    'PatientConsentRemarks': PreOpCh.PatientConsentRemarks,
                    'JewellryConsentActualStatus': PreOpCh.JewellryConsentActualStatus,
                    'JewellryConsentActualStatusRemarks': PreOpCh.JewellryConsentActualStatusRemarks,
                    'DentureRemoval': PreOpCh.DentureRemoval,
                    'DentureRemovalRemarks': PreOpCh.DentureRemovalRemarks,
                    'NailPaint': PreOpCh.NailPaint,
                    'NailPaintRemarks': PreOpCh.NailPaintRemarks,
                    'SugarLevel': PreOpCh.SugarLevel,
                    'SugarLevelRemarks': PreOpCh.SugarLevelRemarks,
                    'PatientAllergy': PreOpCh.PatientAllergy,
                    'PatientAllergyRemarks': PreOpCh.PatientAllergyRemarks,
                    'PatientShave': PreOpCh.PatientShave,
                    'PatientShaveRemarks': PreOpCh.PatientShaveRemarks,
                    'PatientCatheter': PreOpCh.PatientCatheter,
                    'PatientCatheterRemarks': PreOpCh.PatientCatheterRemarks,
                    'BpTablet': PreOpCh.BpTablet,
                    'BpTabletRemarks': PreOpCh.BpTabletRemarks,
                    'SurgicalSide': PreOpCh.SurgicalSide,
                    'SurgicalSideRemarks': PreOpCh.SurgicalSideRemarks,
                    'XrayCt': PreOpCh.XrayCt,
                    'XrayCtRemarks': PreOpCh.XrayCtRemarks,
                    'TabMisoprost': PreOpCh.TabMisoprost,
                    'TabMisoprostRemarks': PreOpCh.TabMisoprostRemarks,
                    'Hrct': PreOpCh.Hrct,
                    'HrctRemarks': PreOpCh.HrctRemarks,
                    'DutySisterName': PreOpCh.DutySisterName,
                    'OtTechName': PreOpCh.OtTechName,
                   
                    
                } for PreOpCh in PreOpChecklistData
            ]

            return JsonResponse(PreOp_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)



#------------------------  Ward_PreOpInstructions Insert Get--------------------------------------


# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Ward_PreOpInstructions_Details_Link(request):
#     if request.method == 'POST':
#         try:


#             # Parse the form data from the request
#             data = request.POST

#             # Extract and validate data
#             print(data,'fffffffff')
#             Date = data.get('Date','')
#             Time = data.get('Time')
            
#             ScalpHair = data.get('ScalpHair')
#             Nails = data.get('Nails')
#             Givemouth = data.get('Givemouth')
#             Vaginal = data.get('Vaginal')
#             Bowel = data.get('Bowel')
#             Enema = data.get('Enema')
#             secTextArea = data.get('secTextArea')
#             SixTextArea = data.get('SixTextArea')
#             SevenTextArea = data.get('SevenTextArea')
#             ThirdTextArea = data.get('ThirdTextArea')
#             DutySisterName = data.get('DutySisterName')
#             nilOrallyAfter = data.get('nilOrallyAfter')
#             ivDripAt = data.get('ivDripAt')
#             ivSiteList = data.get('ivSiteList')
#             urinaryCatheter = data.get('urinaryCatheter')
#             nasogastricTube = data.get('nasogastricTube')
#             IVlocation = data.get('location')
#             CreatedBy = data.get('CapturedBy')
#             location = data.get('Location')
#             PatientId = data.get('Patient_Id')
#             Booking_Id = data.get('Booking_Id')
#             PatientName = data.get('PatientName')
#             AnnotatedImage = data.get('AnnotatedImage')
            
#             print(AnnotatedImage,'AnnotatedImage')

#             print(data,'data')

#             # Convert base64 to binary
#             annotated_image_data = base64.b64decode(AnnotatedImage) if AnnotatedImage else None

#  # Check if an assessment with the same Booking_Id already exists
#             if OT_PreOpInstructions_Details.objects.filter(Booking_Id=Booking_Id).exists():
#                 return JsonResponse({'error': 'PreOperative instructions already exists for this Booking_Id'})


#             # max_id = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id'] or 0
#             # next_id = max_id + 1

#             PreOpChecklist_instance = OT_PreOpInstructions_Details(
                
#                 Patient_Id=PatientId,
#                 Booking_Id=Booking_Id,
#                 Patient_Name=PatientName,
#                 Date=Date,
#                 Time=Time,
#                 AnnotatedImage=annotated_image_data,
#                 ScalpHair=ScalpHair,
#                 Nails=Nails,
#                 Givemouth=Givemouth,
#                 Vaginal=Vaginal,
#                 Bowel=Bowel,
#                 Enema=Enema,
#                 secTextArea=secTextArea,
#                 urinaryCatheter=urinaryCatheter,
#                 nasogastricTube=nasogastricTube,
#                 ThirdTextArea=ThirdTextArea,
#                 SixTextArea=SixTextArea,
#                 SevenTextArea=SevenTextArea,
#                 nilOrallyAfter=nilOrallyAfter,
#                 ivDripAt=ivDripAt,
#                 ivSiteList=ivSiteList,
#                 ivLocation=IVlocation,
#                 DutySisterName=DutySisterName,
#                 Location=location,
#                 CreatedBy=CreatedBy,
                
#             )
#             PreOpChecklist_instance.save()

#             return JsonResponse({'success': 'PreOpChecklist added successfully'})
               
#         except ValidationError as e:
#             print(f"Validation error: {str(e)}")
#             return JsonResponse({'error': str(e)})
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
#     elif request.method == 'GET':
#         try:
            
#             Booking_Id = request.GET.get('Booking_Id')

#  # Log the parameters to confirm they're being passed correctly
#             print(f"Fetching data for Booking_Id: {Booking_Id}")

#             PreOpChecklistData = OT_PreOpInstructions_Details.objects.filter(Booking_Id =Booking_Id)
#             def get_file_image(filedata):
#                 mime = magic.Magic()
#                 contenttype = mime.from_buffer(filedata).split(',')[0]
#                 print('contenttype :',contenttype)
#                 contenttype1 = 'application/pdf'
#                 if contenttype == 'application/pdf':
#                     contenttype1 = 'application/pdf'
#                 elif contenttype == 'JPEG image data':
#                     contenttype1 = 'image/jpeg'
#                 elif contenttype == 'PNG image data':
#                     contenttype1 = 'image/png'
            
                    
#                 return f'data:{contenttype1};base64,{base64.b64encode(filedata).decode('utf-8')}'
#             PreOp_data = [
#                 {
#                     'id': PreOpCh.PreOp_Id,
#                     'Date': PreOpCh.Date,
#                     'Time': PreOpCh.Time,
#                     'AnnotatedImage':get_file_image(PreOpCh.AnnotatedImage) if PreOpCh.AnnotatedImage else None,
#                     'ScalpHair': PreOpCh.ScalpHair,
#                     'Nails': PreOpCh.Nails,
#                     'Givemouth': PreOpCh.Givemouth,
#                     'Vaginal': PreOpCh.Vaginal,
#                     'Bowel': PreOpCh.Bowel,
#                     'Enema': PreOpCh.Enema,
#                     'secTextArea': PreOpCh.secTextArea,
#                     'urinaryCatheter': PreOpCh.urinaryCatheter,
#                     'nasogastricTube': PreOpCh.nasogastricTube,
#                     'ThirdTextArea': PreOpCh.ThirdTextArea,
#                     'nilOrallyAfter': PreOpCh.nilOrallyAfter,
#                     'ivDripAt': PreOpCh.ivDripAt,
#                     'ivSiteList': PreOpCh.ivSiteList,
#                     'location': PreOpCh.ivLocation,
#                     'SixTextArea': PreOpCh.SixTextArea,
#                     'SevenTextArea': PreOpCh.SevenTextArea,
#                     'DutySisterName': PreOpCh.DutySisterName,
                    
                    
#                 } for PreOpCh in PreOpChecklistData
#             ]

#             return JsonResponse(PreOp_data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
#     return JsonResponse({'error': 'Method not allowed'}, status=405)





@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Ward_PreOpInstructions_Details_Link(request):
    if request.method == 'POST':
        try:
            # Parse the form data from the request
            data = request.POST

            # Extract and validate data
            Date = data.get('Date', '')
            Time = data.get('Time', '')
            ScalpHair = data.get('ScalpHair', '')
            Nails = data.get('Nails', '')
            Givemouth = data.get('Givemouth', '')
            Vaginal = data.get('Vaginal', '')
            Bowel = data.get('Bowel', '')
            Enema = data.get('Enema', '')
            secTextArea = data.get('secTextArea', '')
            SixTextArea = data.get('SixTextArea', '')
            SevenTextArea = data.get('SevenTextArea', '')
            ThirdTextArea = data.get('ThirdTextArea', '')
            DutySisterName = data.get('DutySisterName', '')
            nilOrallyAfter = data.get('nilOrallyAfter', '')
            ivDripAt = data.get('ivDripAt', '')
            ivSiteList = data.get('ivSiteList', '')
            urinaryCatheter = data.get('urinaryCatheter', '')
            nasogastricTube = data.get('nasogastricTube', '')
            IVlocation = data.get('location', '')
            CreatedBy = data.get('CapturedBy', '')
            location = data.get('Location', '')
            PatientId = data.get('Patient_Id', '')
            Booking_Id = data.get('Booking_Id', '')
            PatientName = data.get('PatientName', '')
            AnnotatedImage = data.get('AnnotatedImage', '')

            # Convert base64 to binary
            annotated_image_data = base64.b64decode(AnnotatedImage) if AnnotatedImage else None

            # Check if an assessment with the same Booking_Id already exists
            if OT_PreOpInstructions_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'PreOperative instructions already exist for this Booking_Id'})

            # Create a new PreOpChecklist instance
            PreOpChecklist_instance = OT_PreOpInstructions_Details(
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                Date=Date,
                Time=Time,
                AnnotatedImage=annotated_image_data,
                ScalpHair=ScalpHair,
                Nails=Nails,
                Givemouth=Givemouth,
                Vaginal=Vaginal,
                Bowel=Bowel,
                Enema=Enema,
                secTextArea=secTextArea,
                urinaryCatheter=urinaryCatheter,
                nasogastricTube=nasogastricTube,
                ThirdTextArea=ThirdTextArea,
                SixTextArea=SixTextArea,
                SevenTextArea=SevenTextArea,
                nilOrallyAfter=nilOrallyAfter,
                ivDripAt=ivDripAt,
                ivSiteList=ivSiteList,
                ivLocation=IVlocation,
                DutySisterName=DutySisterName,
                Location=location,
                CreatedBy=CreatedBy,
            )
            PreOpChecklist_instance.save()

            return JsonResponse({'success': 'PreOpChecklist added successfully'})

        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            Booking_Id = request.GET.get('Booking_Id')

            # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            PreOpChecklistData = OT_PreOpInstructions_Details.objects.filter(Booking_Id=Booking_Id)

            def get_file_image(filedata):
                mime = magic.Magic(mime=True)
                contenttype = mime.from_buffer(filedata)
                return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}'

            PreOp_data = [
                {
                    'id': PreOpCh.PreOp_Id,
                    'Date': PreOpCh.Date,
                    'Time': PreOpCh.Time,
                    'AnnotatedImage': get_file_image(PreOpCh.AnnotatedImage) if PreOpCh.AnnotatedImage else None,
                    'ScalpHair': PreOpCh.ScalpHair,
                    'Nails': PreOpCh.Nails,
                    'Givemouth': PreOpCh.Givemouth,
                    'Vaginal': PreOpCh.Vaginal,
                    'Bowel': PreOpCh.Bowel,
                    'Enema': PreOpCh.Enema,
                    'secTextArea': PreOpCh.secTextArea,
                    'urinaryCatheter': PreOpCh.urinaryCatheter,
                    'nasogastricTube': PreOpCh.nasogastricTube,
                    'ThirdTextArea': PreOpCh.ThirdTextArea,
                    'nilOrallyAfter': PreOpCh.nilOrallyAfter,
                    'ivDripAt': PreOpCh.ivDripAt,
                    'ivSiteList': PreOpCh.ivSiteList,
                    'location': PreOpCh.ivLocation,
                    'SixTextArea': PreOpCh.SixTextArea,
                    'SevenTextArea': PreOpCh.SevenTextArea,
                    'DutySisterName': PreOpCh.DutySisterName,
                } for PreOpCh in PreOpChecklistData
            ]

            return JsonResponse(PreOp_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)







#------------------------  Dama Insert Get--------------------------------------


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Dama_Details_Link(request):
    if request.method == 'POST':
        try:


            # Parse the form data from the request
            data = json.loads(request.body)

            # Extract and validate data
            print(data,'fffffffff')
            # Date = data.get('Date','')
            # Time = data.get('Time')
            BroughtDead = data.get('BroughtDead')
            BroughtDeadDate = data.get('BroughtDeadDate')
            BroughtDeadTime = data.get('BroughtDeadTime')
            HigherCenter = data.get('HigherCenter')
            HigherCenterDate = data.get('HigherCenterDate')
            HigherCenterTime = data.get('HigherCenterTime')
            NonAvailabilityOfConsultant = data.get('NonAvailabilityOfConsultant')
            NonAvailabilityOfConsultantDate = data.get('NonAvailabilityOfConsultantDate')
            NonAvailabilityOfConsultantTime = data.get('NonAvailabilityOfConsultantTime')
            NonAvailabilityOfIcuBed = data.get('NonAvailabilityOfIcuBed')
            NonAvailabilityOfIcuBedDate = data.get('NonAvailabilityOfIcuBedDate')
            NonAvailabilityOfIcuBedTime = data.get('NonAvailabilityOfIcuBedTime')
            ToxicPatientsOrRelatives = data.get('ToxicPatientsOrRelatives')
            ToxicPatientsOrRelativesDate = data.get('ToxicPatientsOrRelativesDate')
            ToxicPatientsOrRelativesTime = data.get('ToxicPatientsOrRelativesTime')
            DrunkPatients = data.get('DrunkPatients')
            DrunkPatientsDate = data.get('DrunkPatientsDate')
            DrunkPatientsTime = data.get('DrunkPatientsTime')
            RelativesNotAvailable = data.get('RelativesNotAvailable')
            RelativesNotAvailableDate = data.get('RelativesNotAvailableDate')
            RelativesNotAvailableTime = data.get('RelativesNotAvailableTime')
            TransferredtoCOVIDcentre = data.get('TransferredtoCOVIDcentre')
            TransferredtoCOVIDcentreDate = data.get('TransferredtoCOVIDcentreDate')
            TransferredtoCOVIDcentreTime = data.get('TransferredtoCOVIDcentreTime')
            Absconded = data.get('Absconded')
            AbscondedDate = data.get('AbscondedDate')
            AbscondedTime = data.get('AbscondedTime')
            DamaNonAffordable = data.get('DamaNonAffordable')
            DamaNonAffordableDate = data.get('DamaNonAffordableDate')
            DamaNonAffordableTime = data.get('DamaNonAffordableTime')
            DamaRelativesNotWish = data.get('DamaRelativesNotWish')
            DamaRelativesNotWishDate = data.get('DamaRelativesNotWishDate')
            DamaRelativesNotWishTime = data.get('DamaRelativesNotWishTime')
            DamaInsuranceOrCashless = data.get('DamaInsuranceOrCashless')
            DamaInsuranceOrCashlessDate = data.get('DamaInsuranceOrCashlessDate')
            DamaInsuranceOrCashlessTime = data.get('DamaInsuranceOrCashlessTime')
            OtherReasons = data.get('OtherReasons')
            CreatedBy = data.get('CreatedBy')
            location = data.get('Location')
            PatientId = data.get('PatientId','')
            Booking_Id = data.get('Booking_Id','')
            PatientName = data.get('Patient_Name','')

            print(data,'data')

 # Check if an assessment with the same Booking_Id already exists
            if Dama_Details.objects.filter(Booking_Id=Booking_Id).exists():
                return JsonResponse({'error': 'Dama already exists for this Booking_Id'})


            # max_id = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id'] or 0
            # next_id = max_id + 1

            Dama_instance = Dama_Details(
                
                Patient_Id=PatientId,
                Booking_Id=Booking_Id,
                Patient_Name=PatientName,
                BroughtDead=BroughtDead,
                BroughtDeadDate=BroughtDeadDate,
                BroughtDeadTime=BroughtDeadTime,
                HigherCenter=HigherCenter,
                HigherCenterDate=HigherCenterDate,
                HigherCenterTime=HigherCenterTime,
                NonAvailabilityOfConsultant=NonAvailabilityOfConsultant,
                NonAvailabilityOfConsultantDate=NonAvailabilityOfConsultantDate,
                NonAvailabilityOfConsultantTime=NonAvailabilityOfConsultantTime,
                NonAvailabilityOfIcuBed=NonAvailabilityOfIcuBed,
                NonAvailabilityOfIcuBedDate=NonAvailabilityOfIcuBedDate,
                NonAvailabilityOfIcuBedTime=NonAvailabilityOfIcuBedTime,
                ToxicPatientsOrRelatives=ToxicPatientsOrRelatives,
                ToxicPatientsOrRelativesDate=ToxicPatientsOrRelativesDate,
                ToxicPatientsOrRelativesTime=ToxicPatientsOrRelativesTime,
                DrunkPatients=DrunkPatients,
                DrunkPatientsDate=DrunkPatientsDate,
                DrunkPatientsTime=DrunkPatientsTime,
                RelativesNotAvailable=RelativesNotAvailable,
                RelativesNotAvailableDate=RelativesNotAvailableDate,
                RelativesNotAvailableTime=RelativesNotAvailableTime,
                TransferredtoCOVIDcentre=TransferredtoCOVIDcentre,
                TransferredtoCOVIDcentreDate=TransferredtoCOVIDcentreDate,
                TransferredtoCOVIDcentreTime=TransferredtoCOVIDcentreTime,
                Absconded=Absconded,
                AbscondedDate=AbscondedDate,
                AbscondedTime=AbscondedTime,
                DamaNonAffordable=DamaNonAffordable,
                DamaNonAffordableDate=DamaNonAffordableDate,
                DamaNonAffordableTime=DamaNonAffordableTime,
                DamaRelativesNotWish=DamaRelativesNotWish,
                DamaRelativesNotWishDate=DamaRelativesNotWishDate,
                DamaRelativesNotWishTime=DamaRelativesNotWishTime,
                DamaInsuranceOrCashless=DamaInsuranceOrCashless,
                DamaInsuranceOrCashlessDate=DamaInsuranceOrCashlessDate,
                DamaInsuranceOrCashlessTime=DamaInsuranceOrCashlessTime,
                OtherReasons=OtherReasons,
                Location=location,
                CreatedBy=CreatedBy,
                
            )
            Dama_instance.save()

            return JsonResponse({'success': 'PreOpChecklist added successfully'})
               
        except ValidationError as e:
            print(f"Validation error: {str(e)}")
            return JsonResponse({'error': str(e)})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            
            Booking_Id = request.GET.get('Booking_Id')

 # Log the parameters to confirm they're being passed correctly
            print(f"Fetching data for Booking_Id: {Booking_Id}")

            DamaData = Dama_Details.objects.filter(Booking_Id =Booking_Id)

            Damaa_data = [
                {
                    'id': Damaa.Dama_Id,
                    'BroughtDead': Damaa.BroughtDead,
                    'BroughtDeadDate': Damaa.BroughtDeadDate,
                    'BroughtDeadTime': Damaa.BroughtDeadTime,
                    'HigherCenter': Damaa.HigherCenter,
                    'HigherCenterDate': Damaa.HigherCenterDate,
                    'HigherCenterTime': Damaa.HigherCenterTime,
                    'NonAvailabilityOfConsultant': Damaa.NonAvailabilityOfConsultant,
                    'NonAvailabilityOfConsultantDate': Damaa.NonAvailabilityOfConsultantDate,
                    'NonAvailabilityOfConsultantTime': Damaa.NonAvailabilityOfConsultantTime,
                    'NonAvailabilityOfIcuBed': Damaa.NonAvailabilityOfIcuBed,
                    'NonAvailabilityOfIcuBedDate': Damaa.NonAvailabilityOfIcuBedDate,
                    'NonAvailabilityOfIcuBedTime': Damaa.NonAvailabilityOfIcuBedTime,
                    'ToxicPatientsOrRelatives': Damaa.ToxicPatientsOrRelatives,
                    'ToxicPatientsOrRelativesDate': Damaa.ToxicPatientsOrRelativesDate,
                    'ToxicPatientsOrRelativesTime': Damaa.ToxicPatientsOrRelativesTime,
                    'DrunkPatients': Damaa.DrunkPatients,
                    'DrunkPatientsDate': Damaa.DrunkPatientsDate,
                    'DrunkPatientsTime': Damaa.DrunkPatientsTime,
                    'RelativesNotAvailable': Damaa.RelativesNotAvailable,
                    'RelativesNotAvailableDate': Damaa.RelativesNotAvailableDate,
                    'RelativesNotAvailableTime': Damaa.RelativesNotAvailableTime,
                    'TransferredtoCOVIDcentre': Damaa.TransferredtoCOVIDcentre,
                    'TransferredtoCOVIDcentreDate': Damaa.TransferredtoCOVIDcentreDate,
                    'TransferredtoCOVIDcentreTime': Damaa.TransferredtoCOVIDcentreTime,
                    'Absconded': Damaa.Absconded,
                    'AbscondedDate': Damaa.AbscondedDate,
                    'AbscondedTime': Damaa.AbscondedTime,
                    'DamaNonAffordable': Damaa.DamaNonAffordable,
                    'DamaNonAffordableDate': Damaa.DamaNonAffordableDate,
                    'DamaNonAffordableTime': Damaa.DamaNonAffordableTime,
                    'DamaRelativesNotWish': Damaa.DamaRelativesNotWish,
                    'DamaRelativesNotWishDate': Damaa.DamaRelativesNotWishDate,
                    'DamaRelativesNotWishTime': Damaa.DamaRelativesNotWishTime,
                    'DamaInsuranceOrCashless': Damaa.DamaInsuranceOrCashless,
                    'DamaInsuranceOrCashlessDate': Damaa.DamaInsuranceOrCashlessDate,
                    'DamaInsuranceOrCashlessTime': Damaa.DamaInsuranceOrCashlessTime,
                    'OtherReasons': Damaa.OtherReasons,
                   
                    
                } for Damaa in DamaData
            ]

            return JsonResponse(Damaa_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)







