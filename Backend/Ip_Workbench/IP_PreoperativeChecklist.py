from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.utils.timezone import now

@csrf_exempt
@require_http_methods(['POST','GET'])
def IP_PreOpChecklist_Details_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'data')
            RegistrationId = data.get("RegistrationId")
            Date = data.get('Date','')
            Time = data.get('Time','')
            OperativeArea = data.get('OperativeArea','')
            OperativeAreaRemarks = data.get('OperativeAreaRemarks','')
            Operativeinspected = data.get('Operativeinspected','')
            OperativeinspectedRemarks = data.get('OperativeinspectedRemarks','')
            JewelleryRemoved = data.get('JewelleryRemoved','')
            JewelleryRemovedRemarks = data.get('JewelleryRemovedRemarks','')
            JewelleryTied = data.get('JewelleryTied','')
            JewelleryTiesRemarks = data.get('JewelleryTiesRemarks','')
            NasogastricTube = data.get('NasogastricTube','')
            NasogastricTubeRemarks = data.get('NasogastricTubeRemarks','')
            Falsetooth = data.get('Falsetooth','')
            FalsetoothRemarks = data.get('FalsetoothRemarks','')
            ColouredNail = data.get('ColouredNail','')
            ColouredNailRemarks = data.get('ColouredNailRemarks','')
            HairPrepared = data.get('HairPrepared','')
            HairPreparedRemarks = data.get('HairPreparedRemarks','')
            VoidedOrCatheroized = data.get('VoidedOrCatheroized','')
            VoidedOrCatheroizedRemarks = data.get('VoidedOrCatheroizedRemarks','')
            VoidedAmount = data.get('VoidedAmount','')
            VoidedTime = data.get('VoidedTime','')
            VaginalDouche = data.get('VaginalDouche','')
            VaginalDoucheRemarks = data.get('VaginalDoucheRemarks','')
            Allergies = data.get('Allergies','')
            AllergiesRemarks = data.get('AllergiesRemarks','')
            BathTaken = data.get('BathTaken','')
            BathTakenRemarks = data.get('BathTakenRemarks','')
            BloodRequirement = data.get('BloodRequirement','')
            BloodRequirementRemarks = data.get('BloodRequirementRemarks','')
            ConsentForm = data.get('ConsentForm','')
            ConsentFormRemarks = data.get('ConsentFormRemarks','')
            MorningTPR = data.get('MorningTPR','')
            MorningTPRRemarks = data.get('MorningTPRRemarks','')
            MorningSample = data.get('MorningSample','')
            MorningSampleRemarks = data.get('MorningSampleRemarks','')
            XRayFilms = data.get('XRayFilms','')
            XRayFilmsRemarks = data.get('XRayFilmsRemarks','')
            PreanaestheticMedication = data.get('PreanaestheticMedication','')
            PreanaestheticMedicationRemarks = data.get('PreanaestheticMedicationRemarks','')
            SideRails = data.get('SideRails','')
            SideRailsRemarks = data.get('SideRailsRemarks','')
            PulseRate = data.get('PulseRate','')
            RespRate = data.get('RespRate','')
            IdentificationWristlet = data.get('IdentificationWristlet','')
            IdentificationWristletRemarks = data.get('IdentificationWristletRemarks','')
            SpecialDrug = data.get('SpecialDrug','')
            DutySisterName = data.get('DutySisterName','')
            createdby = data.get("Createdby",'')
            DepartmentType = data.get("DepartmentType",'')

            #registration_ins=None
            
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

            
            PreOpCh_instance = IP_PreOpChecklist_Details(
                
                Ip_Registration_Id=registration_ins_ip,
                Casuality_Registration_Id=registration_ins_casuality,
                DepartmentType=DepartmentType,
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
                VoidedOrCatheroized=VoidedOrCatheroized,
                VoidedOrCatheroizedRemarks=VoidedOrCatheroizedRemarks,
                VoidedAmount=VoidedAmount,
                VoidedTime=VoidedTime,
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
                RespRate=RespRate,
                IdentificationWristlet=IdentificationWristlet,
                IdentificationWristletRemarks=IdentificationWristletRemarks,
                SpecialDrug=SpecialDrug,
                DutySisterName=DutySisterName,
                Created_by=createdby
            )
            PreOpCh_instance.save()
            
            return JsonResponse({'success': 'PreOpCh saved successfully'})
        except Exception as e:
            print(f"An error occured: {str(e)}")
            return JsonResponse({'error': 'An internal server error occured'}, status = 500)
        
    elif request.method == 'GET':
        try:
            Ip_Registration_Id = request.GET.get('RegistrationId')
            DepartmentType = request.GET.get('DepartmentType')
            if not Ip_Registration_Id and not DepartmentType:
                return JsonResponse({'error': 'both Ip_Registration_Id and DepartmentType is required'})

            if DepartmentType=='IP':
                PreOpCh_Details = IP_PreOpChecklist_Details.objects.filter(Ip_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            else:
                PreOpCh_Details = IP_PreOpChecklist_Details.objects.filter(Casuality_Registration_Id__pk=Ip_Registration_Id, DepartmentType=DepartmentType)
            
            
            
            PreOpCh_Details_data =[]
            for idx,PreOpCh in enumerate(PreOpCh_Details, start=1):
                PreOpCh_dict = {
                    'id' : idx,
                    'RegistrationId': PreOpCh.Ip_Registration_Id.pk if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.pk,
                    'VisitId': PreOpCh.Ip_Registration_Id.VisitId if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.VisitId,
                    'PrimaryDoctorId': PreOpCh.Ip_Registration_Id.PrimaryDoctor.Doctor_ID if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': PreOpCh.Ip_Registration_Id.PrimaryDoctor.ShortName if PreOpCh.Ip_Registration_Id else PreOpCh.Casuality_Registration_Id.PrimaryDoctor.ShortName,
                    'DepartmentType': PreOpCh.DepartmentType,
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
                    'VoidedOrCatheroized': PreOpCh.VoidedOrCatheroized,
                    'VoidedOrCatheroizedRemarks': PreOpCh.VoidedOrCatheroizedRemarks,
                    'VoidedAmount': PreOpCh.VoidedAmount,
                    'VoidedTime': PreOpCh.VoidedTime,
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
                    'RespRate': PreOpCh.RespRate,
                    'IdentificationWristlet': PreOpCh.IdentificationWristlet,
                    'IdentificationWristletRemarks': PreOpCh.IdentificationWristletRemarks,
                    'SpecialDrug': PreOpCh.SpecialDrug,
                    'DutySisterName': PreOpCh.DutySisterName,
                    'CurrDate': PreOpCh.created_at.strftime('%d-%m-%y'), 
                    'CurrTime' : PreOpCh.created_at.strftime('%H:%M:%S'),
                    'Createdby' : PreOpCh.Created_by,
                }
                PreOpCh_Details_data.append(PreOpCh_dict)

            return JsonResponse(PreOpCh_Details_data,safe=False)
        
        except Exception as e:
            print(f"An error occured: {str(e)}")
            return JsonResponse({'error': 'An internal server error occured'}, status = 500)





