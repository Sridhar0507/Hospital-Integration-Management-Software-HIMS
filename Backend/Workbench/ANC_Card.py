from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json
import re






# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_ANC_Card_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             print(data,'data')

#             husbandName = data.get('husbandName', '')
#             menstrualLMP = data.get('menstrualLMP', '')
#             menstrualEDD = data.get('menstrualEDD', '')
#             correctedbyUSG = data.get('correctedbyUSG', '')

#             drainsData = data.get('drainsData', [])
              
            
#             # HighRiskFactors = data.get('HighRiskFactors', {})
#             HighRiskFactors = data.get('HighRiskFactorsCheckbox', '')
            
#             surgicalHistory = data.get('surgicalHistory', '')
#             # FamilyHistory = data.get('FamilyHistory', {})
#             FamilyHistory = data.get('FamilyHistoryCheckbox', '')
#             allergies = data.get('allergies', '')
#             bloodGroupHusband = data.get('bloodGroupHusband', '')

#             drainsData2 = data.get('drainsData2', [])
            

#             # checkboxState = data.get('checkboxState', {})

#             Bsl = data.get('BSL', False)
#             Hiv = data.get('HIV', False)
#             Urea = data.get('Urea', False)
#             Btct = data.get('BTCT', False)
#             Ogct = data.get('OGCT', False)
#             Vdrl = data.get('VDRL', False)
#             AuAg = data.get('AuAg', False)
#             Creatrine = data.get('Creatrine', False)
#             Wbc = data.get('WBC', False)
#             anyotherinves = data.get('anyotherinves', False)
            
#             BslText = data.get('BSLText', '')
#             HivText = data.get('HIVText', '')
#             UreaText = data.get('UreaText', '')
#             BtctText = data.get('BTCTText', '')
#             OgctText = data.get('OGCTText', '')
#             VdrlText = data.get('VDRLText', '')
#             AuAgText = data.get('AuAgText', '')
#             CreatrineText = data.get('CreatrineText', '')
#             WbcText = data.get('WBCText', '')
#             anyotherinvesText = data.get('anyotherinvesText', '')

#             CvsText = data.get('CVSText', '')
#             RsText = data.get('RSText', '')
#             BreastText = data.get('BreastText', '')

#             RadioBtn = data.get('RadioBtn', {})

#             Tt1Text = data.get('TT1Text', '')
#             Tt2Text = data.get('TT2Text', '')
#             Tt3Text = data.get('TT3Text', '')
#             BetnesolText = data.get('BetnesolText', '')
#             FolicAcidText = data.get('FolicAcidText', '')
#             CalciumText = data.get('CalciumText', '')
#             FtndLscsText = data.get('FTNDLSCSText', '')
#             FtndTlText = data.get('FTNDTLText', '')
#             PostDeliveryText = data.get('PostDeliveryText', '')
            
#             Tt1 = data.get('TT1', '')
#             Tt2 = data.get('TT2', '')
#             Tt3 = data.get('TT3', '')
#             Betnesol = data.get('Betnesol', '')
#             FolicAcid = data.get('FolicAcid', '')
#             Calcium = data.get('Calcium', '')
#             FtndLscs = data.get('FTNDLSCS', '')
#             FtndTl = data.get('FTNDTL', '')
#             PostDelivery = data.get('PostDelivery', '')

#             ObstHistory = data.get('ObstHistory', '')
#             DeliveryResult = data.get('DeliveryResult', '')

#             AncCardNo = data.get('AncCardNo', '')
#             MctsNo = data.get('MctsNo', '')
#             DeliveryDate = data.get('DeliveryDate', '')

#             drainsData3 = data.get('drainsData3', [])
            


#             rows = data.get('rows', [])

            

#             selectedRows = data.get('selectedRows', [])
#             registration_id = data.get('RegistrationId', '')
#             # PatientId = data.get('PatientId', '')
#             # PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')
            
#             if not registration_id:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

            
#             ANC_Card_instance = Workbench_ANC_Card(
#                 Registration_Id=registration_ins,
#                 HusbandName=husbandName,
#                 MenstrualLMP=menstrualLMP,
#                 MenstrualEDD=menstrualEDD,
#                 CorrectedbyUSG=correctedbyUSG,

#                 # DrainsData1=drainsData,
#                 HighRiskFactors=HighRiskFactors,

#                 SurgicalHistory=surgicalHistory,

#                 Family_History=FamilyHistory,

#                 Allergies=allergies,
#                 BloodGroupHusband=bloodGroupHusband,

#                 # DrainsData2=drainsData2,

#                 # CheckboxState=checkboxState,
#                 BSL=Bsl,
#                 HIV=Hiv,
#                 Urea=Urea,
#                 BTCT=Btct,
#                 OGCT=Ogct,
#                 VDRL=Vdrl,
#                 AuAg=AuAg,
#                 Creatrine=Creatrine,
#                 WBC=Wbc,
#                 anyotherinves=anyotherinves,

#                 BSLText=BslText,
#                 HIVText=HivText,
#                 UreaText=UreaText,
#                 BTCTText=BtctText,
#                 OGCTText=OgctText,
#                 VDRLText=VdrlText,
#                 AuAgText=AuAgText,
#                 CreatrineText=CreatrineText,
#                 WBCText=WbcText,
#                 AnyotherinvesText=anyotherinvesText,

#                 CVS_Text=CvsText,
#                 RS_Text=RsText,
#                 Breast_Text=BreastText,

#                 # RadioBtns=RadioBtn,

#                 TT1Text=Tt1Text,
#                 TT2Text=Tt2Text,
#                 TT3Text=Tt3Text,
#                 Betnesol_Text=BetnesolText,
#                 FolicAcidText=FolicAcidText,
#                 CalciumText=CalciumText,
#                 FTNDLSCSText=FtndLscsText,
#                 FTNDTLText=FtndTlText,
#                 PostDeliveryText=PostDeliveryText,
                
#                 TT1=Tt1,
#                 TT2=Tt2,
#                 TT3=Tt3,
#                 Betnesol=Betnesol,
#                 FolicAcid=FolicAcid,
#                 Calcium=Calcium,
#                 FTNDLSCS=FtndLscs,
#                 FTNDTL=FtndTl,
#                 PostDelivery=PostDelivery,

#                 ObstHistory=ObstHistory,
#                 DeliveryResult=DeliveryResult,

#                 AncCardNo=AncCardNo,
#                 MctsNo=MctsNo,
#                 DeliveryDate=DeliveryDate,

#                 # DrainsData3=drainsData3,
#                 # Rows=rows,
#                 selectedRows=selectedRows,


#                 created_by=created_by
#             )
#             ANC_Card_instance.save()
            
#             for drain in drainsData:
#                 AgeSex = drain.get('ageSex','')
#                 Type = drain.get('type','')
#                 Immunized = drain.get('immunized','')
#                 Problems = drain.get('problems','')
            
#                 ANC_Card_Table1_instance = Workbench_ANC_Table1(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     AgeSex=AgeSex,
#                     Type=Type,
#                     Immunized=Immunized,
#                     Problems=Problems,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table1_instance.save()
#             for drains2 in drainsData2:
                
#                 DateInv = drains2.get('dateInv','')
#                 Hb = drains2.get('Hb','')
#                 Urine = drains2.get('Urine','')
#                 ANC_Card_Table2_instance = Workbench_ANC_Table2(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     Date1=DateInv,
#                     Hb=Hb,
#                     Urine=Urine,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table2_instance.save()
            
#             for drains3 in drainsData3:
#                 DateforDelivery = drains3.get('dateforDelivery','')
#                 weightDelivery = drains3.get('weightDelivery','')
#                 BPDelivery = drains3.get('BPDelivery','')
#                 ComplaintsDelivery = drains3.get('ComplaintsDelivery','')
#                 AmenorrheaDelivery = drains3.get('AmenorrheaDelivery','')
#                 PallorDelivery = drains3.get('PallorDelivery','')
#                 PresentationDelivery = drains3.get('PresentationDelivery','')
#                 PVAnyOtherDelivery = drains3.get('PVAnyOtherDelivery','')
#                 AdviceDelivery = drains3.get('AdviceDelivery','')

#                 ANC_Card_Table3_instance = Workbench_ANC_Table3(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     DateforDelivery=DateforDelivery,
#                     WeightDelivery=weightDelivery,
#                     BPDelivery=BPDelivery,
#                     ComplaintsDelivery=ComplaintsDelivery,
#                     AmenorrheaDelivery=AmenorrheaDelivery,
#                     PallorDelivery=PallorDelivery,
#                     PresentationDelivery=PresentationDelivery,
#                     PVAnyOtherDelivery=PVAnyOtherDelivery,
#                     AdviceDelivery=AdviceDelivery,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table3_instance.save()
#             for Row in rows:
#                 Date = Row.get('date','')
#                 Amenorrhea = Row.get('amenorrhea','')
#                 Presentation = Row.get('presentation','')
#                 BpdGs = Row.get('bpdGs','')
#                 Hc = Row.get('hc','')
#                 Ac = Row.get('ac','')
#                 FlCrl = Row.get('flCrl','')
#                 GestationalAge = Row.get('gestationalAge','')
#                 Liquor = Row.get('liquor','')
#                 Placenta = Row.get('placenta','')
#                 Anomalies = Row.get('anomalies','')
#                 FoetalWeight = Row.get('foetalWeight','')
#                 CervicalLength = Row.get('cervicalLength','')
#                 Remark = Row.get('remark','')

#                 ANC_Card_Table4_instance = Workbench_ANC_Table4(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     Date2=Date,
#                     Amenorrhea=Amenorrhea,
#                     Presentation=Presentation,
#                     BpdGs=BpdGs,
#                     HC=Hc,
#                     AC=Ac,
#                     FlCrl=FlCrl,
#                     GestationalAge=GestationalAge,
#                     Liquor=Liquor,
#                     Placenta=Placenta,
#                     Anomalies=Anomalies,
#                     FoetalWeight=FoetalWeight,
#                     CervicalLength=CervicalLength,
#                     Remark=Remark,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table4_instance.save()

#             return JsonResponse({'success': 'ANC_Card Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             registration_id = request.GET.get('RegistrationId')
#             if not registration_id:
#                 return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             # Use filter() to get a QuerySet of Workbench_ANC_Card objects
#             anc_cards = Workbench_ANC_Card.objects.filter(Registration_Id=registration_ins)

#             # Prepare the ANC Data by looping through the ANC cards and fetching the related tables data
#             ANC_Data = []
#             for anc_card in anc_cards:
#                 # Fetch related tables' data for this specific ANC card
#                 anc_table1_data = list(Workbench_ANC_Table1.objects.filter(Id=anc_card).values())
#                 anc_table2_data = list(Workbench_ANC_Table2.objects.filter(Id=anc_card).values())
#                 anc_table3_data = list(Workbench_ANC_Table3.objects.filter(Id=anc_card).values())
#                 anc_table4_data = list(Workbench_ANC_Table4.objects.filter(Id=anc_card).values())


#                 # Build the data structure for each ANC card
#                 anc_card_data = {
#                     'id': anc_card.Id,
#                     'RegistrationId': anc_card.Registration_Id.pk,
#                     'VisitId': anc_card.Registration_Id.VisitId,
#                     'PrimaryDoctorId': anc_card.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': anc_card.Registration_Id.PrimaryDoctor.ShortName,
#                     'husbandName': anc_card.HusbandName,
#                     'menstrualLMP': anc_card.MenstrualLMP,
#                     'menstrualEDD': anc_card.MenstrualEDD,
#                     'correctedbyUSG': anc_card.CorrectedbyUSG,
#                     'HighRiskFactors': anc_card.HighRiskFactors,
#                     'surgicalHistory': anc_card.SurgicalHistory,
#                     'FamilyHistory': anc_card.Family_History,
#                     'allergies': anc_card.Allergies,
#                     'bloodGroupHusband': anc_card.BloodGroupHusband,
#                     'Bsl': anc_card.BSL,
#                     'Hiv': anc_card.HIV,
#                     'Urea': anc_card.Urea,
#                     'Btct': anc_card.BTCT,
#                     'Ogct': anc_card.OGCT,
#                     'Vdrl': anc_card.VDRL,
#                     'AuAg': anc_card.AuAg,
#                     'Creatrine': anc_card.Creatrine,
#                     'Wbc': anc_card.WBC,
#                     'anyotherinves': anc_card.anyotherinves,
#                     'BslText': anc_card.BSLText,
#                     'HivText': anc_card.HIVText,
#                     'UreaText': anc_card.UreaText,
#                     'BtctText': anc_card.BTCTText,
#                     'OgctText': anc_card.OGCTText,
#                     'VdrlText': anc_card.VDRLText,
#                     'AuAgText': anc_card.AuAgText,
#                     'CreatrineText': anc_card.CreatrineText,
#                     'WbcText': anc_card.WBCText,
#                     'anyotherinvesText': anc_card.AnyotherinvesText,
#                     'CvsText': anc_card.CVS_Text,
#                     'RsText': anc_card.RS_Text,
#                     'BreastText': anc_card.Breast_Text,
#                     'Tt1Text': anc_card.TT1Text,
#                     'Tt2Text': anc_card.TT2Text,
#                     'Tt3Text': anc_card.TT3Text,
#                     'BetnesolText': anc_card.Betnesol_Text,
#                     'FolicAcidText': anc_card.FolicAcidText,
#                     'CalciumText': anc_card.CalciumText,
#                     'FtndLscsText': anc_card.FTNDLSCSText,
#                     'FtndTlText': anc_card.FTNDTLText,
#                     'PostDeliveryText': anc_card.PostDeliveryText,
#                     'Tt1': anc_card.TT1,
#                     'Tt2': anc_card.TT2,
#                     'Tt3': anc_card.TT3,
#                     'Betnesol': anc_card.Betnesol,
#                     'FolicAcid': anc_card.FolicAcid,
#                     'Calcium': anc_card.Calcium,
#                     'FtndLscs': anc_card.FTNDLSCS,
#                     'FtndTl': anc_card.FTNDTL,
#                     'PostDelivery': anc_card.PostDelivery,
#                     'ObstHistory': anc_card.ObstHistory,
#                     'DeliveryResult': anc_card.DeliveryResult,
#                     'AncCardNo': anc_card.AncCardNo,
#                     'MctsNo': anc_card.MctsNo,
#                     'DeliveryDate': anc_card.DeliveryDate,
                    # 'selectedRows': anc_card.selectedRows,
#                     'created_by': anc_card.created_by,
                    # 'Date': anc_card.created_at.strftime('%Y-%m-%d'),
                    # 'Time': anc_card.created_at.strftime('%H:%M:%S'),

#                     # Add related table data here
#                     'AncTable1Data': anc_table1_data,
#                     'AncTable2Data': anc_table2_data,
#                     'AncTable3Data': anc_table3_data,
#                     'AncTable4Data': anc_table4_data
#                 }

#                 # Append this ANC card data with related tables to the main list
#                 ANC_Data.append(anc_card_data)

#             return JsonResponse(ANC_Data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)







@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_ANC_Card_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            print(data,'data')

            husbandName = data.get('husbandName', '')
            menstrualLMP = data.get('menstrualLMP', '')
            menstrualEDD = data.get('menstrualEDD', '')
            correctedbyUSG = data.get('correctedbyUSG', '')

            drainsData = data.get('drainsData', [])
              
            
            # HighRiskFactors = data.get('HighRiskFactors', {})
            HighRiskFactors = data.get('HighRiskFactorsCheckbox', '')
            
            surgicalHistory = data.get('surgicalHistory', '')
            # FamilyHistory = data.get('FamilyHistory', {})
            FamilyHistory = data.get('FamilyHistoryCheckbox', '')
            allergies = data.get('allergies', '')
            bloodGroupHusband = data.get('bloodGroupHusband', '')

            drainsData2 = data.get('drainsData2', [])
            

            # checkboxState = data.get('checkboxState', {})

            Bsl = data.get('BSL', False)
            Hiv = data.get('HIV', False)
            Urea = data.get('Urea', False)
            Btct = data.get('BTCT', False)
            Ogct = data.get('OGCT', False)
            Vdrl = data.get('VDRL', False)
            AuAg = data.get('AuAg', False)
            Creatrine = data.get('Creatrine', False)
            Wbc = data.get('WBC', False)
            anyotherinves = data.get('anyotherinves', False)
            
            BslText = data.get('BSLText', '')
            HivText = data.get('HIVText', '')
            UreaText = data.get('UreaText', '')
            BtctText = data.get('BTCTText', '')
            OgctText = data.get('OGCTText', '')
            VdrlText = data.get('VDRLText', '')
            AuAgText = data.get('AuAgText', '')
            CreatrineText = data.get('CreatrineText', '')
            WbcText = data.get('WBCText', '')
            anyotherinvesText = data.get('anyotherinvesText', '')

            CvsText = data.get('CVSText', '')
            RsText = data.get('RSText', '')
            BreastText = data.get('BreastText', '')

            RadioBtn = data.get('RadioBtn', {})

            Tt1Text = data.get('TT1Text', '')
            Tt2Text = data.get('TT2Text', '')
            Tt3Text = data.get('TT3Text', '')
            BetnesolText = data.get('BetnesolText', '')
            FolicAcidText = data.get('FolicAcidText', '')
            CalciumText = data.get('CalciumText', '')
            FtndLscsText = data.get('FTNDLSCSText', '')
            FtndTlText = data.get('FTNDTLText', '')
            PostDeliveryText = data.get('PostDeliveryText', '')
            
            Tt1 = data.get('TT1', '')
            Tt2 = data.get('TT2', '')
            Tt3 = data.get('TT3', '')
            Betnesol = data.get('Betnesol', '')
            FolicAcid = data.get('FolicAcid', '')
            Calcium = data.get('Calcium', '')
            FtndLscs = data.get('FTNDLSCS', '')
            FtndTl = data.get('FTNDTL', '')
            PostDelivery = data.get('PostDelivery', '')

            ObstHistory = data.get('ObstHistory', '')
            DeliveryResult = data.get('DeliveryResult', '')

            AncCardNo = data.get('AncCardNo', '')
            MctsNo = data.get('MctsNo', '')
            DeliveryDate = data.get('DeliveryDate', '')

            drainsData3 = data.get('drainsData3', [])
            


            rows = data.get('rows', [])

            

            selectedRows = data.get('selectedRows', [])
            registration_id = data.get('RegistrationId', '')
            # PatientId = data.get('PatientId', '')
            # PatientName = data.get('PatientName', '')
            created_by = data.get('created_by', '')
            
            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            
            ANC_Card_instance = Workbench_ANC_Card(
                Registration_Id=registration_ins,
                HusbandName=husbandName,
                MenstrualLMP=menstrualLMP,
                MenstrualEDD=menstrualEDD,
                CorrectedbyUSG=correctedbyUSG,

                # DrainsData1=drainsData,
                HighRiskFactors=HighRiskFactors,

                SurgicalHistory=surgicalHistory,

                Family_History=FamilyHistory,

                Allergies=allergies,
                BloodGroupHusband=bloodGroupHusband,

                # DrainsData2=drainsData2,

                # CheckboxState=checkboxState,
                BSL=Bsl,
                HIV=Hiv,
                Urea=Urea,
                BTCT=Btct,
                OGCT=Ogct,
                VDRL=Vdrl,
                AuAg=AuAg,
                Creatrine=Creatrine,
                WBC=Wbc,
                anyotherinves=anyotherinves,

                BSLText=BslText,
                HIVText=HivText,
                UreaText=UreaText,
                BTCTText=BtctText,
                OGCTText=OgctText,
                VDRLText=VdrlText,
                AuAgText=AuAgText,
                CreatrineText=CreatrineText,
                WBCText=WbcText,
                AnyotherinvesText=anyotherinvesText,

                CVS_Text=CvsText,
                RS_Text=RsText,
                Breast_Text=BreastText,

                # RadioBtns=RadioBtn,

                TT1Text=Tt1Text,
                TT2Text=Tt2Text,
                TT3Text=Tt3Text,
                Betnesol_Text=BetnesolText,
                FolicAcidText=FolicAcidText,
                CalciumText=CalciumText,
                FTNDLSCSText=FtndLscsText,
                FTNDTLText=FtndTlText,
                PostDeliveryText=PostDeliveryText,
                
                TT1=Tt1,
                TT2=Tt2,
                TT3=Tt3,
                Betnesol=Betnesol,
                FolicAcid=FolicAcid,
                Calcium=Calcium,
                FTNDLSCS=FtndLscs,
                FTNDTL=FtndTl,
                PostDelivery=PostDelivery,

                ObstHistory=ObstHistory,
                DeliveryResult=DeliveryResult,

                AncCardNo=AncCardNo,
                MctsNo=MctsNo,
                DeliveryDate=DeliveryDate,

                # DrainsData3=drainsData3,
                # Rows=rows,
                selectedRows=selectedRows,


                created_by=created_by
            )
            ANC_Card_instance.save()
            
            for drain in drainsData:
                AgeSex = drain.get('ageSex','')
                Type = drain.get('type','')
                Immunized = drain.get('immunized','')
                Problems = drain.get('problems','')
            
                ANC_Card_Table1_instance = Workbench_ANC_Table1(
                    AncId=ANC_Card_instance,
                    Registration_Id=registration_ins,
                    AgeSex=AgeSex,
                    Type=Type,
                    Immunized=Immunized,
                    Problems=Problems,
                    created_by=created_by
                )
                ANC_Card_Table1_instance.save()
            for drains2 in drainsData2:
                
                DateInv = drains2.get('dateInv','')
                Hb = drains2.get('Hb','')
                Urine = drains2.get('Urine','')
                ANC_Card_Table2_instance = Workbench_ANC_Table2(
                    AncId=ANC_Card_instance,
                    Registration_Id=registration_ins,
                    Date1=DateInv,
                    Hb=Hb,
                    Urine=Urine,
                    created_by=created_by
                )
                ANC_Card_Table2_instance.save()
            
            for drains3 in drainsData3:
                DateforDelivery = drains3.get('dateforDelivery','')
                weightDelivery = drains3.get('weightDelivery','')
                BPDelivery = drains3.get('BPDelivery','')
                ComplaintsDelivery = drains3.get('ComplaintsDelivery','')
                AmenorrheaDelivery = drains3.get('AmenorrheaDelivery','')
                PallorDelivery = drains3.get('PallorDelivery','')
                PresentationDelivery = drains3.get('PresentationDelivery','')
                PVAnyOtherDelivery = drains3.get('PVAnyOtherDelivery','')
                AdviceDelivery = drains3.get('AdviceDelivery','')

                ANC_Card_Table3_instance = Workbench_ANC_Table3(
                    AncId=ANC_Card_instance,
                    Registration_Id=registration_ins,
                    DateforDelivery=DateforDelivery,
                    WeightDelivery=weightDelivery,
                    BPDelivery=BPDelivery,
                    ComplaintsDelivery=ComplaintsDelivery,
                    AmenorrheaDelivery=AmenorrheaDelivery,
                    PallorDelivery=PallorDelivery,
                    PresentationDelivery=PresentationDelivery,
                    PVAnyOtherDelivery=PVAnyOtherDelivery,
                    AdviceDelivery=AdviceDelivery,
                    created_by=created_by
                )
                ANC_Card_Table3_instance.save()
            for Row in rows:
                Date = Row.get('date','')
                Amenorrhea = Row.get('amenorrhea','')
                Presentation = Row.get('presentation','')
                BpdGs = Row.get('bpdGs','')
                Hc = Row.get('hc','')
                Ac = Row.get('ac','')
                FlCrl = Row.get('flCrl','')
                GestationalAge = Row.get('gestationalAge','')
                Liquor = Row.get('liquor','')
                Placenta = Row.get('placenta','')
                Anomalies = Row.get('anomalies','')
                FoetalWeight = Row.get('foetalWeight','')
                CervicalLength = Row.get('cervicalLength','')
                Remark = Row.get('remark','')

                ANC_Card_Table4_instance = Workbench_ANC_Table4(
                    AncId=ANC_Card_instance,
                    Registration_Id=registration_ins,
                    Date2=Date,
                    Amenorrhea=Amenorrhea,
                    Presentation=Presentation,
                    BpdGs=BpdGs,
                    HC=Hc,
                    AC=Ac,
                    FlCrl=FlCrl,
                    GestationalAge=GestationalAge,
                    Liquor=Liquor,
                    Placenta=Placenta,
                    Anomalies=Anomalies,
                    FoetalWeight=FoetalWeight,
                    CervicalLength=CervicalLength,
                    Remark=Remark,
                    created_by=created_by
                )
                ANC_Card_Table4_instance.save()

            return JsonResponse({'success': 'ANC_Card Details added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            # Extract the registration ID from the query parameter
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

            # Get the patient registration instance
            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Query the ANC Card and the related table data
            anc_cards = Workbench_ANC_Card.objects.filter(Registration_Id=registration_ins)
            
            # Initialize the response data
            ANC_Data = []

            # Loop through each ANC card and fetch the related tables data
            for anc_card in anc_cards:
                anc_card_data = {
                    'id': anc_card.Id,
                    'RegistrationId': anc_card.Registration_Id.pk,
                    'VisitId': anc_card.Registration_Id.VisitId,
                    'PrimaryDoctorId': anc_card.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': anc_card.Registration_Id.PrimaryDoctor.ShortName,
                    'husbandName': anc_card.HusbandName,
                    'menstrualLMP': anc_card.MenstrualLMP,
                    'menstrualEDD': anc_card.MenstrualEDD,
                    'correctedbyUSG': anc_card.CorrectedbyUSG,
                    'HighRiskFactors': anc_card.HighRiskFactors,
                    'surgicalHistory': anc_card.SurgicalHistory,
                    'FamilyHistory': anc_card.Family_History,
                    'allergies': anc_card.Allergies,
                    'bloodGroupHusband': anc_card.BloodGroupHusband,
                    'Bsl': anc_card.BSL,
                    'Hiv': anc_card.HIV,
                    'Urea': anc_card.Urea,
                    'Btct': anc_card.BTCT,
                    'Ogct': anc_card.OGCT,
                    'Vdrl': anc_card.VDRL,
                    'AuAg': anc_card.AuAg,
                    'Creatrine': anc_card.Creatrine,
                    'Wbc': anc_card.WBC,
                    'anyotherinves': anc_card.anyotherinves,
                    'BslText': anc_card.BSLText,
                    'HivText': anc_card.HIVText,
                    'UreaText': anc_card.UreaText,
                    'BtctText': anc_card.BTCTText,
                    'OgctText': anc_card.OGCTText,
                    'VdrlText': anc_card.VDRLText,
                    'AuAgText': anc_card.AuAgText,
                    'CreatrineText': anc_card.CreatrineText,
                    'WbcText': anc_card.WBCText,
                    'anyotherinvesText': anc_card.AnyotherinvesText,
                    'CvsText': anc_card.CVS_Text,
                    'RsText': anc_card.RS_Text,
                    'BreastText': anc_card.Breast_Text,
                    'Tt1Text': anc_card.TT1Text,
                    'Tt2Text': anc_card.TT2Text,
                    'Tt3Text': anc_card.TT3Text,
                    'BetnesolText': anc_card.Betnesol_Text,
                    'FolicAcidText': anc_card.FolicAcidText,
                    'CalciumText': anc_card.CalciumText,
                    'FtndLscsText': anc_card.FTNDLSCSText,
                    'FtndTlText': anc_card.FTNDTLText,
                    'PostDeliveryText': anc_card.PostDeliveryText,
                    'Tt1': anc_card.TT1,
                    'Tt2': anc_card.TT2,
                    'Tt3': anc_card.TT3,
                    'Betnesol': anc_card.Betnesol,
                    'FolicAcid': anc_card.FolicAcid,
                    'Calcium': anc_card.Calcium,
                    'FtndLscs': anc_card.FTNDLSCS,
                    'FtndTl': anc_card.FTNDTL,
                    'PostDelivery': anc_card.PostDelivery,
                    'ObstHistory': anc_card.ObstHistory,
                    'DeliveryResult': anc_card.DeliveryResult,
                    'AncCardNo': anc_card.AncCardNo,
                    'MctsNo': anc_card.MctsNo,
                    'DeliveryDate': anc_card.DeliveryDate,
                    'selectedRows': anc_card.selectedRows,
                    'created_by': anc_card.created_by,
                    'Date': anc_card.created_at.strftime('%Y-%m-%d'),
                    'Time': anc_card.created_at.strftime('%H:%M:%S'),

                    'AncTable1Data': [],
                    'AncTable2Data': [],
                    'AncTable3Data': [],
                    'AncTable4Data': [],
                }

                # Fetch data for AncTable1
                anc_table1_data = Workbench_ANC_Table1.objects.filter(Registration_Id=registration_ins)
                for table1 in anc_table1_data:
                    anc_card_data['AncTable1Data'].append({
                        # 'id': table1.AncId,
                        'RegistrationId': table1.Registration_Id.pk,
                        'AgeSex': table1.AgeSex,
                        'Type': table1.Type,
                        'Immunized': table1.Immunized,
                        'Problems': table1.Problems,
                        'created_by': table1.created_by,
                    })

                # Fetch data for AncTable2
                anc_table2_data = Workbench_ANC_Table2.objects.filter(Registration_Id=registration_ins)
                for table2 in anc_table2_data:
                    anc_card_data['AncTable2Data'].append({
                        # 'id': table2.AncId,
                        'RegistrationId': table2.Registration_Id.pk,
                        'Date1': table2.Date1,
                        'Hb': table2.Hb,
                        'Urine': table2.Urine,
                    })

                # Fetch data for AncTable3
                anc_table3_data = Workbench_ANC_Table3.objects.filter(Registration_Id=registration_ins)
                for table3 in anc_table3_data:
                    anc_card_data['AncTable3Data'].append({
                        # 'id': table3.AncId,
                        'RegistrationId': table3.Registration_Id.pk,
                        'DateforDelivery': table3.DateforDelivery,
                        'WeightDelivery': table3.WeightDelivery,
                        'BPDelivery': table3.BPDelivery,
                        'ComplaintsDelivery': table3.ComplaintsDelivery,
                        'AmenorrheaDelivery': table3.AmenorrheaDelivery,
                        'PallorDelivery': table3.PallorDelivery,
                        'PresentationDelivery': table3.PresentationDelivery,
                        'PVAnyOtherDelivery': table3.PVAnyOtherDelivery,
                        'AdviceDelivery': table3.AdviceDelivery,
                    })

                # Fetch data for AncTable4
                anc_table4_data = Workbench_ANC_Table4.objects.filter(Registration_Id=registration_ins)
                for table4 in anc_table4_data:
                    anc_card_data['AncTable4Data'].append({
                        # 'id': table4.AncId,
                        'RegistrationId': table4.Registration_Id.pk,
                        'Date2': table4.Date2,
                        'Amenorrhea': table4.Amenorrhea,
                        'Presentation': table4.Presentation,
                        'BpdGs': table4.BpdGs,
                        'HC': table4.HC,
                        'AC': table4.AC,
                        'FlCrl': table4.FlCrl,
                        'GestationalAge': table4.GestationalAge,
                        'Liquor': table4.Liquor,
                        'Placenta': table4.Placenta,
                        'Anomalies': table4.Anomalies,
                        'FoetalWeight': table4.FoetalWeight,
                        'CervicalLength': table4.CervicalLength,
                        'Remark': table4.Remark,
                    })

                # Append this ANC card data to the main list
                ANC_Data.append(anc_card_data)
                print(ANC_Data,'ANC_Data')

            # Return the data as JSON
            return JsonResponse(ANC_Data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})




# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_ANC_Card_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
            
#             print(data,'data')

#             husbandName = data.get('husbandName', '')
#             menstrualLMP = data.get('menstrualLMP', '')
#             menstrualEDD = data.get('menstrualEDD', '')
#             correctedbyUSG = data.get('correctedbyUSG', '')

#             drainsData = data.get('drainsData', [])
              
            
#             # HighRiskFactors = data.get('HighRiskFactors', {})
#             HighRiskFactors = data.get('HighRiskFactorsCheckbox', '')
            
#             surgicalHistory = data.get('surgicalHistory', '')
#             # FamilyHistory = data.get('FamilyHistory', {})
#             FamilyHistory = data.get('FamilyHistoryCheckbox', '')
#             allergies = data.get('allergies', '')
#             bloodGroupHusband = data.get('bloodGroupHusband', '')

#             drainsData2 = data.get('drainsData2', [])
            

#             # checkboxState = data.get('checkboxState', {})

#             Bsl = data.get('BSL', False)
#             Hiv = data.get('HIV', False)
#             Urea = data.get('Urea', False)
#             Btct = data.get('BTCT', False)
#             Ogct = data.get('OGCT', False)
#             Vdrl = data.get('VDRL', False)
#             AuAg = data.get('AuAg', False)
#             Creatrine = data.get('Creatrine', False)
#             Wbc = data.get('WBC', False)
#             anyotherinves = data.get('anyotherinves', False)
            
#             BslText = data.get('BSLText', '')
#             HivText = data.get('HIVText', '')
#             UreaText = data.get('UreaText', '')
#             BtctText = data.get('BTCTText', '')
#             OgctText = data.get('OGCTText', '')
#             VdrlText = data.get('VDRLText', '')
#             AuAgText = data.get('AuAgText', '')
#             CreatrineText = data.get('CreatrineText', '')
#             WbcText = data.get('WBCText', '')
#             anyotherinvesText = data.get('anyotherinvesText', '')

#             CvsText = data.get('CVSText', '')
#             RsText = data.get('RSText', '')
#             BreastText = data.get('BreastText', '')

#             RadioBtn = data.get('RadioBtn', {})

#             Tt1Text = data.get('TT1Text', '')
#             Tt2Text = data.get('TT2Text', '')
#             Tt3Text = data.get('TT3Text', '')
#             BetnesolText = data.get('BetnesolText', '')
#             FolicAcidText = data.get('FolicAcidText', '')
#             CalciumText = data.get('CalciumText', '')
#             FtndLscsText = data.get('FTNDLSCSText', '')
#             FtndTlText = data.get('FTNDTLText', '')
#             PostDeliveryText = data.get('PostDeliveryText', '')
            
#             Tt1 = data.get('TT1', '')
#             Tt2 = data.get('TT2', '')
#             Tt3 = data.get('TT3', '')
#             Betnesol = data.get('Betnesol', '')
#             FolicAcid = data.get('FolicAcid', '')
#             Calcium = data.get('Calcium', '')
#             FtndLscs = data.get('FTNDLSCS', '')
#             FtndTl = data.get('FTNDTL', '')
#             PostDelivery = data.get('PostDelivery', '')

#             ObstHistory = data.get('ObstHistory', '')
#             DeliveryResult = data.get('DeliveryResult', '')

#             AncCardNo = data.get('AncCardNo', '')
#             MctsNo = data.get('MctsNo', '')
#             DeliveryDate = data.get('DeliveryDate', '')

#             drainsData3 = data.get('drainsData3', [])
            


#             rows = data.get('rows', [])

            

#             selectedRows = data.get('selectedRows', [])
#             registration_id = data.get('RegistrationId', '')
#             # PatientId = data.get('PatientId', '')
#             # PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')
            
#             if not registration_id:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

            
#             ANC_Card_instance = Workbench_ANC_Card(
#                 Registration_Id=registration_ins,
#                 HusbandName=husbandName,
#                 MenstrualLMP=menstrualLMP,
#                 MenstrualEDD=menstrualEDD,
#                 CorrectedbyUSG=correctedbyUSG,

#                 # DrainsData1=drainsData,
#                 HighRiskFactors=HighRiskFactors,

#                 SurgicalHistory=surgicalHistory,

#                 Family_History=FamilyHistory,

#                 Allergies=allergies,
#                 BloodGroupHusband=bloodGroupHusband,

#                 # DrainsData2=drainsData2,

#                 # CheckboxState=checkboxState,
#                 BSL=Bsl,
#                 HIV=Hiv,
#                 Urea=Urea,
#                 BTCT=Btct,
#                 OGCT=Ogct,
#                 VDRL=Vdrl,
#                 AuAg=AuAg,
#                 Creatrine=Creatrine,
#                 WBC=Wbc,
#                 anyotherinves=anyotherinves,

#                 BSLText=BslText,
#                 HIVText=HivText,
#                 UreaText=UreaText,
#                 BTCTText=BtctText,
#                 OGCTText=OgctText,
#                 VDRLText=VdrlText,
#                 AuAgText=AuAgText,
#                 CreatrineText=CreatrineText,
#                 WBCText=WbcText,
#                 AnyotherinvesText=anyotherinvesText,

#                 CVS_Text=CvsText,
#                 RS_Text=RsText,
#                 Breast_Text=BreastText,

#                 # RadioBtns=RadioBtn,

#                 TT1Text=Tt1Text,
#                 TT2Text=Tt2Text,
#                 TT3Text=Tt3Text,
#                 Betnesol_Text=BetnesolText,
#                 FolicAcidText=FolicAcidText,
#                 CalciumText=CalciumText,
#                 FTNDLSCSText=FtndLscsText,
#                 FTNDTLText=FtndTlText,
#                 PostDeliveryText=PostDeliveryText,
                
#                 TT1=Tt1,
#                 TT2=Tt2,
#                 TT3=Tt3,
#                 Betnesol=Betnesol,
#                 FolicAcid=FolicAcid,
#                 Calcium=Calcium,
#                 FTNDLSCS=FtndLscs,
#                 FTNDTL=FtndTl,
#                 PostDelivery=PostDelivery,

#                 ObstHistory=ObstHistory,
#                 DeliveryResult=DeliveryResult,

#                 AncCardNo=AncCardNo,
#                 MctsNo=MctsNo,
#                 DeliveryDate=DeliveryDate,

#                 # DrainsData3=drainsData3,
#                 # Rows=rows,
#                 selectedRows=selectedRows,


#                 created_by=created_by
#             )
#             ANC_Card_instance.save()
            
#             for drain in drainsData:
#                 AgeSex = drain.get('ageSex','')
#                 Type = drain.get('type','')
#                 Immunized = drain.get('immunized','')
#                 Problems = drain.get('problems','')
            
#                 ANC_Card_Table1_instance = Workbench_ANC_Table1(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     AgeSex=AgeSex,
#                     Type=Type,
#                     Immunized=Immunized,
#                     Problems=Problems,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table1_instance.save()
#             for drains2 in drainsData2:
                
#                 DateInv = drains2.get('dateInv','')
#                 Hb = drains2.get('Hb','')
#                 Urine = drains2.get('Urine','')
#                 ANC_Card_Table2_instance = Workbench_ANC_Table2(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     Date1=DateInv,
#                     Hb=Hb,
#                     Urine=Urine,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table2_instance.save()
            
#             for drains3 in drainsData3:
#                 DateforDelivery = drains3.get('dateforDelivery','')
#                 weightDelivery = drains3.get('weightDelivery','')
#                 BPDelivery = drains3.get('BPDelivery','')
#                 ComplaintsDelivery = drains3.get('ComplaintsDelivery','')
#                 AmenorrheaDelivery = drains3.get('AmenorrheaDelivery','')
#                 PallorDelivery = drains3.get('PallorDelivery','')
#                 PresentationDelivery = drains3.get('PresentationDelivery','')
#                 PVAnyOtherDelivery = drains3.get('PVAnyOtherDelivery','')
#                 AdviceDelivery = drains3.get('AdviceDelivery','')

#                 ANC_Card_Table3_instance = Workbench_ANC_Table3(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     DateforDelivery=DateforDelivery,
#                     WeightDelivery=weightDelivery,
#                     BPDelivery=BPDelivery,
#                     ComplaintsDelivery=ComplaintsDelivery,
#                     AmenorrheaDelivery=AmenorrheaDelivery,
#                     PallorDelivery=PallorDelivery,
#                     PresentationDelivery=PresentationDelivery,
#                     PVAnyOtherDelivery=PVAnyOtherDelivery,
#                     AdviceDelivery=AdviceDelivery,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table3_instance.save()
#             for Row in rows:
#                 Date = Row.get('date','')
#                 Amenorrhea = Row.get('amenorrhea','')
#                 Presentation = Row.get('presentation','')
#                 BpdGs = Row.get('bpdGs','')
#                 Hc = Row.get('hc','')
#                 Ac = Row.get('ac','')
#                 FlCrl = Row.get('flCrl','')
#                 GestationalAge = Row.get('gestationalAge','')
#                 Liquor = Row.get('liquor','')
#                 Placenta = Row.get('placenta','')
#                 Anomalies = Row.get('anomalies','')
#                 FoetalWeight = Row.get('foetalWeight','')
#                 CervicalLength = Row.get('cervicalLength','')
#                 Remark = Row.get('remark','')

#                 ANC_Card_Table4_instance = Workbench_ANC_Table4(
#                     Id=ANC_Card_instance,
#                     Registration_Id=registration_ins,
#                     Date2=Date,
#                     Amenorrhea=Amenorrhea,
#                     Presentation=Presentation,
#                     BpdGs=BpdGs,
#                     HC=Hc,
#                     AC=Ac,
#                     FlCrl=FlCrl,
#                     GestationalAge=GestationalAge,
#                     Liquor=Liquor,
#                     Placenta=Placenta,
#                     Anomalies=Anomalies,
#                     FoetalWeight=FoetalWeight,
#                     CervicalLength=CervicalLength,
#                     Remark=Remark,
#                     created_by=created_by
#                 )
#                 ANC_Card_Table4_instance.save()

#             return JsonResponse({'success': 'ANC_Card Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        


#     elif request.method == 'GET':
#         try:
#             # Extract the registration ID from the query parameter
#             registration_id = request.GET.get('RegistrationId')

#             if not registration_id:
#                 return JsonResponse({'warn': 'RegistrationId is required'}, status=400)

#             try:
#                 # Get the patient registration instance
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             # Query the ANC Card and the related table data
#             anc_cards = Workbench_ANC_Card.objects.filter(Registration_Id=registration_ins)
#             ANC_Data = []

#             # Loop through each ANC card and fetch the related tables data
#             for anc_card in anc_cards:
#                 # Ensure selectedRows is a list (even if empty)
#                 selectedRows = list(anc_card.selectedRows) if anc_card.selectedRows is not None else []
                
#                 anc_card_data = {
#                     'id': anc_card.Id,
#                     'RegistrationId': anc_card.Registration_Id.pk,
#                     'VisitId': anc_card.Registration_Id.VisitId,
#                     'PrimaryDoctorId': anc_card.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': anc_card.Registration_Id.PrimaryDoctor.ShortName,
#                     'husbandName': anc_card.HusbandName,
#                     'menstrualLMP': anc_card.MenstrualLMP,
#                     'menstrualEDD': anc_card.MenstrualEDD,
#                     'correctedbyUSG': anc_card.CorrectedbyUSG,
#                     'HighRiskFactors': anc_card.HighRiskFactors,
#                     'surgicalHistory': anc_card.SurgicalHistory,
#                     'FamilyHistory': anc_card.Family_History,
#                     'allergies': anc_card.Allergies,
#                     'bloodGroupHusband': anc_card.BloodGroupHusband,
#                     'Bsl': anc_card.BSL,
#                     'Hiv': anc_card.HIV,
#                     'Urea': anc_card.Urea,
#                     'Btct': anc_card.BTCT,
#                     'Ogct': anc_card.OGCT,
#                     'Vdrl': anc_card.VDRL,
#                     'AuAg': anc_card.AuAg,
#                     'Creatrine': anc_card.Creatrine,
#                     'Wbc': anc_card.WBC,
#                     'anyotherinves': anc_card.anyotherinves,
#                     'BslText': anc_card.BSLText,
#                     'HivText': anc_card.HIVText,
#                     'UreaText': anc_card.UreaText,
#                     'BtctText': anc_card.BTCTText,
#                     'OgctText': anc_card.OGCTText,
#                     'VdrlText': anc_card.VDRLText,
#                     'AuAgText': anc_card.AuAgText,
#                     'CreatrineText': anc_card.CreatrineText,
#                     'WbcText': anc_card.WBCText,
#                     'anyotherinvesText': anc_card.AnyotherinvesText,
#                     'CvsText': anc_card.CVS_Text,
#                     'RsText': anc_card.RS_Text,
#                     'BreastText': anc_card.Breast_Text,
#                     'Tt1Text': anc_card.TT1Text,
#                     'Tt2Text': anc_card.TT2Text,
#                     'Tt3Text': anc_card.TT3Text,
#                     'BetnesolText': anc_card.Betnesol_Text,
#                     'FolicAcidText': anc_card.FolicAcidText,
#                     'CalciumText': anc_card.CalciumText,
#                     'FtndLscsText': anc_card.FTNDLSCSText,
#                     'FtndTlText': anc_card.FTNDTLText,
#                     'PostDeliveryText': anc_card.PostDeliveryText,
#                     'Tt1': anc_card.TT1,
#                     'Tt2': anc_card.TT2,
#                     'Tt3': anc_card.TT3,
#                     'Betnesol': anc_card.Betnesol,
#                     'FolicAcid': anc_card.FolicAcid,
#                     'Calcium': anc_card.Calcium,
#                     'FtndLscs': anc_card.FTNDLSCS,
#                     'FtndTl': anc_card.FTNDTL,
#                     'PostDelivery': anc_card.PostDelivery,
#                     'ObstHistory': anc_card.ObstHistory,
#                     'DeliveryResult': anc_card.DeliveryResult,
#                     'AncCardNo': anc_card.AncCardNo,
#                     'MctsNo': anc_card.MctsNo,
#                     'DeliveryDate': anc_card.DeliveryDate,
#                     'selectedRows': selectedRows,
#                     'created_by': anc_card.created_by,
#                     'AncTable1Data': AncTable1,  # Now these variables are properly defined
#                     'AncTable2Data': AncTable2,
#                     'AncTable3Data': AncTable3,
#                     'AncTable4Data': AncTable4,
#                 }

#                 # Fetch related data for AncTable1
#                 AncTable1 = []
#                 anc_table1_data = Workbench_ANC_Table1.objects.filter(Registration_Id=registration_ins)
#                 for Table1 in anc_table1_data:
#                     TableData1 = {
#                         'id': Table1.Id,
#                         'RegistrationId': Table1.Registration_Id.pk,
#                         'AgeSex': Table1.AgeSex,
#                         'Type': Table1.Type,
#                         'Immunized': Table1.Immunized,
#                         'Problems': Table1.Problems,
#                         'created_by': Table1.created_by,
#                     }
#                     AncTable1.append(TableData1)

#                 # Fetch related data for AncTable2
#                 AncTable2 = []
#                 anc_table2_data = Workbench_ANC_Table2.objects.filter(Registration_Id=registration_ins)
#                 for Table2 in anc_table2_data:
#                     TableData2 = {
#                         'id': Table2.Id,
#                         'RegistrationId': Table2.Registration_Id.pk,
#                         'Date1': Table2.Date1,
#                         'Hb': Table2.Hb,
#                         'Urine': Table2.Urine,
#                     }
#                     AncTable2.append(TableData2)

#                 # Fetch related data for AncTable3
#                 AncTable3 = []
#                 anc_table3_data = Workbench_ANC_Table3.objects.filter(Registration_Id=registration_ins)
#                 for Table3 in anc_table3_data:
#                     TableData3 = {
#                         'id': Table3.Id,
#                         'RegistrationId': Table3.Registration_Id.pk,
#                         'DateforDelivery': Table3.DateforDelivery,
#                         'WeightDelivery': Table3.WeightDelivery,
#                         'BPDelivery': Table3.BPDelivery,
#                         'ComplaintsDelivery': Table3.ComplaintsDelivery,
#                         'AmenorrheaDelivery': Table3.AmenorrheaDelivery,
#                         'PallorDelivery': Table3.PallorDelivery,
#                         'PresentationDelivery': Table3.PresentationDelivery,
#                         'PVAnyOtherDelivery': Table3.PVAnyOtherDelivery,
#                         'AdviceDelivery': Table3.AdviceDelivery,
#                     }
#                     AncTable3.append(TableData3)

#                 # Fetch related data for AncTable4
#                 AncTable4 = []
#                 anc_table4_data = Workbench_ANC_Table4.objects.filter(Registration_Id=registration_ins)
#                 for Table4 in anc_table4_data:
#                     TableData4 = {
#                         'id': Table4.Id,
#                         'RegistrationId': Table4.Registration_Id.pk,
#                         'Date2': Table4.Date2,
#                         'Amenorrhea': Table4.Amenorrhea,
#                         'Presentation': Table4.Presentation,
#                         'BpdGs': Table4.BpdGs,
#                         'HC': Table4.HC,
#                         'AC': Table4.AC,
#                         'FlCrl': Table4.FlCrl,
#                         'GestationalAge': Table4.GestationalAge,
#                         'Liquor': Table4.Liquor,
#                         'Placenta': Table4.Placenta,
#                         'Anomalies': Table4.Anomalies,
#                         'FoetalWeight': Table4.FoetalWeight,
#                         'CervicalLength': Table4.CervicalLength,
#                         'Remark': Table4.Remark,
#                     }
#                     AncTable4.append(TableData4)

#                 # Construct the ANC card data after fetching all related data
                
#                 # Append this ANC card data to the main list
#                 ANC_Data.append(anc_card_data)

#             # Prepare the final response
#             response_data = {'data': ANC_Data}
#             return JsonResponse(response_data, status=200)


#         except Exception as e:
#             print("Error", e)
#             return JsonResponse({'error': str(e)}, status=500)



















# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_ANC_Card_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)

#             husbandName = data.get('husbandName', '')
#             menstrualLMP = data.get('menstrualLMP', '')
#             menstrualEDD = data.get('menstrualEDD', '')
#             correctedbyUSG = data.get('correctedbyUSG', '')

#             drainsData = data.get('drainsData', [])
#             HighRiskFactors = data.get('HighRiskFactors', {})
#             surgicalHistory = data.get('surgicalHistory', '')
#             FamilyHistory = data.get('FamilyHistory', {})
#             allergies = data.get('allergies', '')
#             bloodGroupHusband = data.get('bloodGroupHusband', '')

#             drainsData2 = data.get('drainsData2', [])
#             checkboxState = data.get('checkboxState', {})

#             BslText = data.get('BSLText', '')
#             HivText = data.get('HIVText', '')
#             UreaText = data.get('UreaText', '')
#             BtctText = data.get('BTCTText', '')
#             OgctText = data.get('OGCTText', '')
#             VdrlText = data.get('VDRLText', '')
#             AuAgText = data.get('AuAgText', '')
#             CreatrineText = data.get('CreatrineText', '')
#             WbcText = data.get('WBCText', '')
#             anyotherinvesText = data.get('anyotherinvesText', '')

#             CvsText = data.get('CVSText', '')
#             RsText = data.get('RSText', '')
#             BreastText = data.get('BreastText', '')

#             RadioBtn = data.get('RadioBtn', {})

#             Tt1Text = data.get('TT1Text', '')
#             Tt2Text = data.get('TT2Text', '')
#             Tt3Text = data.get('TT3Text', '')
#             BetnesolText = data.get('BetnesolText', '')
#             FolicAcidText = data.get('FolicAcidText', '')
#             CalciumText = data.get('CalciumText', '')
#             FtndLscsText = data.get('FTNDLSCSText', '')
#             FtndTlText = data.get('FTNDTLText', '')
#             PostDeliveryText = data.get('PostDeliveryText', '')
            
#             Tt1 = data.get('TT1', '')
#             Tt2 = data.get('TT2', '')
#             Tt3 = data.get('TT3', '')
#             Betnesol = data.get('Betnesol', '')
#             FolicAcid = data.get('FolicAcid', '')
#             Calcium = data.get('Calcium', '')
#             FtndLscs = data.get('FTNDLSCS', '')
#             FtndTl = data.get('FTNDTL', '')
#             PostDelivery = data.get('PostDelivery', '')

#             ObstHistory = data.get('ObstHistory', '')
#             DeliveryResult = data.get('DeliveryResult', '')

#             AncCardNo = data.get('AncCardNo', '')
#             MctsNo = data.get('MctsNo', '')
#             DeliveryDate = data.get('DeliveryDate', '')

#             drainsData3 = data.get('drainsData3', [])
#             rows = data.get('rows', [])
#             selectedRows = data.get('selectedRows', [])
#             registration_id = data.get('RegistrationId', '')
#             # PatientId = data.get('PatientId', '')
#             # PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')
            
#             if not registration_id:
#                 return JsonResponse({'error': 'RegistrationId is required'}, status=400)

#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

           
#             ANC_Card_instance = Workbench_ANC_Card(
#                 Registration_Id=registration_ins,
#                 HusbandName=husbandName,
#                 MenstrualLMP=menstrualLMP,
#                 MenstrualEDD=menstrualEDD,
#                 CorrectedbyUSG=correctedbyUSG,

#                 DrainsData1=drainsData,
#                 HighRiskFactors=HighRiskFactors,

#                 SurgicalHistory=surgicalHistory,

#                 Family_History=FamilyHistory,

#                 Allergies=allergies,
#                 BloodGroupHusband=bloodGroupHusband,

#                 DrainsData2=drainsData2,

#                 CheckboxState=checkboxState,

#                 BSLText=BslText,
#                 HIVText=HivText,
#                 UreaText=UreaText,
#                 BTCTText=BtctText,
#                 OGCTText=OgctText,
#                 VDRLText=VdrlText,
#                 AuAgText=AuAgText,
#                 CreatrineText=CreatrineText,
#                 WBCText=WbcText,
#                 AnyotherinvesText=anyotherinvesText,

#                 CVS_Text=CvsText,
#                 RS_Text=RsText,
#                 Breast_Text=BreastText,

#                 # RadioBtns=RadioBtn,

#                 TT1Text=Tt1Text,
#                 TT2Text=Tt2Text,
#                 TT3Text=Tt3Text,
#                 Betnesol_Text=BetnesolText,
#                 FolicAcidText=FolicAcidText,
#                 CalciumText=CalciumText,
#                 FTNDLSCSText=FtndLscsText,
#                 FTNDTLText=FtndTlText,
#                 PostDeliveryText=PostDeliveryText,
                
#                 TT1=Tt1,
#                 TT2=Tt2,
#                 TT3=Tt3,
#                 Betnesol=Betnesol,
#                 FolicAcid=FolicAcid,
#                 Calcium=Calcium,
#                 FTNDLSCS=FtndLscs,
#                 FTNDTL=FtndTl,
#                 PostDelivery=PostDelivery,

#                 ObstHistory=ObstHistory,
#                 DeliveryResult=DeliveryResult,

#                 AncCardNo=AncCardNo,
#                 MctsNo=MctsNo,
#                 DeliveryDate=DeliveryDate,

#                 DrainsData3=drainsData3,
#                 Rows=rows,
#                 selectedRows=selectedRows,


#                 created_by=created_by
#             )
#             ANC_Card_instance.save()

#             return JsonResponse({'success': 'ANC_Card Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             registration_id = request.GET.get('RegistrationId')
#             if not registration_id:
#                 return JsonResponse({'warn': 'RegistrationId is required'}, status=400)
            
#             try:
#                 registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
#             except Patient_Appointment_Registration_Detials.DoesNotExist:
#                 return JsonResponse({'error': 'Patient not found'}, status=404)

#             Anc_CardData = Workbench_ANC_Card.objects.filter(Registration_Id=registration_ins)

#             ANC_Data = [
#                 {
#                     'id': ANC.Id,
#                     'RegistrationId': ANC.Registration_Id.pk,
#                     'VisitId': ANC.Registration_Id.VisitId,
#                     'PrimaryDoctorId': ANC.Registration_Id.PrimaryDoctor.Doctor_ID,
#                     'PrimaryDoctorName': ANC.Registration_Id.PrimaryDoctor.ShortName,
                   
#                     'husbandName': ANC.HusbandName,

#                     'menstrualLMP': ANC.MenstrualLMP,
#                     'menstrualEDD': ANC.MenstrualEDD,
#                     'correctedbyUSG': ANC.CorrectedbyUSG,

                    
#                     'drainsData': ANC.DrainsData1,

#                     'HighRiskFactors': ANC.HighRiskFactors,

#                     'surgicalHistory': ANC.SurgicalHistory,

#                     'FamilyHistory': ANC.Family_History,

#                     'allergies': ANC.Allergies,
#                     'bloodGroupHusband': ANC.BloodGroupHusband,

#                     'drainsData2': ANC.DrainsData2,

#                     'checkboxState': ANC.CheckboxState,

#                     'BslText': ANC.BSLText,
#                     'HivText': ANC.HIVText,
#                     'UreaText': ANC.UreaText,
#                     'BtctText': ANC.BTCTText,
#                     'OgctText': ANC.OGCTText,
#                     'VdrlText': ANC.VDRLText,
#                     'AuAgText': ANC.AuAgText,
#                     'CreatrineText': ANC.CreatrineText,
#                     'WbcText': ANC.WBCText,
#                     'anyotherinvesText': ANC.AnyotherinvesText,

#                     'CvsText': ANC.CVS_Text,
#                     'RsText': ANC.RS_Text,
#                     'BreastText': ANC.Breast_Text,

#                     # 'RadioBtn': ANC.RadioBtns,

#                     'Tt1Text': ANC.TT1Text,
#                     'Tt2Text': ANC.TT2Text,
#                     'Tt3Text': ANC.TT3Text,
#                     'BetnesolText': ANC.Betnesol_Text,
#                     'FolicAcidText': ANC.FolicAcidText,
#                     'CalciumText': ANC.CalciumText,
#                     'FtndLscsText': ANC.FTNDLSCSText,
#                     'FtndTlText': ANC.FTNDTLText,
#                     'PostDeliveryText': ANC.PostDeliveryText,
                    
#                     'Tt1': ANC.TT1,
#                     'Tt2': ANC.TT2,
#                     'Tt3': ANC.TT3,
#                     'Betnesol': ANC.Betnesol,
#                     'FolicAcid': ANC.FolicAcid,
#                     'Calcium': ANC.Calcium,
#                     'FtndLscs': ANC.FTNDLSCS,
#                     'FtndTl': ANC.FTNDTL,
#                     'PostDelivery': ANC.PostDelivery,
                    
#                     'ObstHistory': ANC.ObstHistory,
#                     'DeliveryResult': ANC.DeliveryResult,

#                     'AncCardNo': ANC.AncCardNo,
#                     'MctsNo': ANC.MctsNo,
#                     'DeliveryDate': ANC.DeliveryDate,

#                     'drainsData3': ANC.DrainsData3,

#                     'rows': ANC.Rows,
#                     'selectedRows': ANC.selectedRows,


#                     'created_by': ANC.created_by,
#                     'Date': ANC.created_at.strftime('%Y-%m-%d'),  # Format date
#                     'Time': ANC.created_at.strftime('%H:%M:%S'),  # Format time
#                 } for ANC in Anc_CardData
#             ]
#             print(ANC_Data, 'ANC_Data')
#             return JsonResponse(ANC_Data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)











# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_ANC_Card_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)

#             #  -- part-1
#             husbandName = data.get('husbandName', '')
#             husSurName = data.get('husSurName', '')
#             husFirstName = data.get('husFirstName', '')
#             husMiddleName = data.get('husMiddleName', '')
#             age = data.get('age', '')
#             religion = data.get('religion', '')
#             occupation = data.get('occupation', '')
#             phoneNumber = data.get('phoneNumber', '')
#             address = data.get('address', '')
#             menstrualLMP = data.get('menstrualLMP', '')
#             menstrualEDD = data.get('menstrualEDD', '')
#             correctedbyUSG = data.get('correctedbyUSG', '')

#             # -- part-2

#             drainsData = data.get('drainsData', []) #---main

#             print(drainsData,'drainsData1')
#             # -----drainData fields below given..........

#             SNO = data.get('SNO', '')
#             ageSex = data.get('ageSex', '')
#             type = data.get('type', '')
#             immunized = data.get('immunized', '')
#             problems = data.get('problems', '')

# # ----------------------------------------------------------------
# # ========================= High Risk Factors ===============================

#             HighRiskFactors = data.get('HighRiskFactors', {})  #--main

#             CaesareanSection = data.get('CaesareanSection', '')
#             BadObstetricHistory = data.get('BadObstetricHistory', '')
#             Infertility = data.get('Infertility', '')
#             DownsSyndrome = data.get('DownsSyndrome', '')
#             CongenitalAnomalies = data.get('CongenitalAnomalies', '')
#             ForcepVaccumDelivery = data.get('ForcepVaccumDelivery', '')
#             BloodTrans = data.get('BloodTrans', '')
#             Tobacco = data.get('Tobacco', '')
#             Alcohol = data.get('Alcohol', '')
#             RadiationExposure = data.get('RadiationExposure', '')
#             RoNegative = data.get('RoNegative', '')
#             AnyOther = data.get('AnyOther', '')

#             print(HighRiskFactors,'HighRiskFactors')

# # ----------------------------------------------------------------

#             surgicalHistory = data.get('surgicalHistory', '')

# # ----------------------------------------------------------------
# # ========================= Family History ===============================

#             FamilyHistory = data.get('FamilyHistory', {})  #--main

#             Diabetes = data.get('Diabetes', '')
#             Hypertension = data.get('Hypertension', '')
#             HeartDisease = data.get('HeartDisease', '')
#             Twins = data.get('Twins', '')
#             CongenitalAnomaliesFamily = data.get('CongenitalAnomaliesFamily', '')
#             Asthma = data.get('Asthma', '')
#             Tuberculosis = data.get('Tuberculosis', '')
#             AnyOtherFamilyHistory = data.get('AnyOtherFamilyHistory', '')
            
#             print(FamilyHistory,'FamilyHistory')

# # ----------------------------------------------------------------

#             allergies = data.get('allergies', '')
#             bloodGroupHusband = data.get('bloodGroupHusband', '')
# # ----------------------------------------------------------------

#             drainsData2 = data.get('drainsData2', []) #--main

#             dateInv = data.get('dateInv', '')
#             Hb = data.get('Hb', '')
#             Urine = data.get('Urine', '')

#             print(drainsData2,'drainsData2')


# # ----------------------------------------------------------------
#             checkboxState = data.get('checkboxState', {})  #--main

#             Bsl = data.get('BSL', '')
#             Hiv = data.get('HIV', '')
#             Urea = data.get('Urea', '')
#             Btct = data.get('BTCT', '')
#             Ogct = data.get('OGCT', '')
#             Vdrl = data.get('VDRL', '')
#             AuAg = data.get('AuAg', '')
#             Creatrine = data.get('Creatrine', '')
#             Wbc = data.get('WBC', '')
#             anyotherinves = data.get('anyotherinves', '')

#             print(checkboxState,'checkboxState')



#             BslText = data.get('BSLText', '')
#             HivText = data.get('HIVText', '')
#             UreaText = data.get('UreaText', '')
#             BtctText = data.get('BTCTText', '')
#             OgctText = data.get('OGCTText', '')
#             VdrlText = data.get('VDRLText', '')
#             AuAgText = data.get('AuAgText', '')
#             CreatrineText = data.get('CreatrineText', '')
#             WbcText = data.get('WBCText', '')
#             anyotherinvesText = data.get('anyotherinvesText', '')

# # ----------------------------------------------------------------

#             CvsText = data.get('CVSText', '')
#             RsText = data.get('RSText', '')
#             BreastText = data.get('BreastText', '')


# # ----------------------------------------------------------------
#             RadioBtn = data.get('RadioBtn', {})  #main

#             TT1 = data.get('TT1', '')
#             TT2 = data.get('TT2', '')
#             TT3 = data.get('TT3', '')
#             Betnesol = data.get('Betnesol', '')
#             FolicAcid = data.get('FolicAcid', '')
#             Calcium = data.get('Calcium', '')
#             FTNDLscs = data.get('FTNDLSCS', '')
#             FTNDTl = data.get('FTNDTL', '')
#             PostDelivery = data.get('PostDelivery', '')

#             print(RadioBtn,'RadioBtn')

#             Tt1Text = data.get('TT1Text', '')
#             Tt2Text = data.get('TT2Text', '')
#             Tt3Text = data.get('TT3Text', '')
#             BetnesolText = data.get('BetnesolText', '')
#             FolicAcidText = data.get('FolicAcidText', '')
#             CalciumText = data.get('CalciumText', '')
#             FtndLscsText = data.get('FTNDLSCSText', '')
#             FtndTlText = data.get('FTNDTLText', '')
#             PostDeliveryText = data.get('PostDeliveryText', '')

# # ----------------------------------------------------------------


#             drainsData3 = data.get('drainsData3', []) #main

#             dateforDelivery = data.get('dateforDelivery', '')
#             weightDelivery = data.get('weightDelivery', '')
#             BPDelivery = data.get('BPDelivery', '')
#             ComplaintsDelivery = data.get('ComplaintsDelivery', '')
#             AmenorrheaDelivery = data.get('AmenorrheaDelivery', '')
#             PallorDelivery = data.get('PallorDelivery', '')
#             PresentationDelivery = data.get('PresentationDelivery', '')
#             PVAnyOtherDelivery = data.get('PVAnyOtherDelivery', '')
#             AdviceDelivery = data.get('AdviceDelivery', '')
            
#             print(drainsData3,'drainsData3')


# # ----------------------------------------------------------------

#             rows = data.get('rows', []) #//main

#             date = data.get('date', '')
#             amenorrhea = data.get('amenorrhea', '')
#             presentation = data.get('presentation', '')
#             bpdGs = data.get('bpdGs', '')
#             hc = data.get('hc', '')
#             ac = data.get('ac', '')
#             flCrl = data.get('flCrl', '')
#             gestationalAge = data.get('gestationalAge', '')
#             liquor = data.get('liquor', '')
#             placenta = data.get('placenta', '')
#             anomalies = data.get('anomalies', '')
#             foetalWeight = data.get('foetalWeight', '')
#             cervicalLength = data.get('cervicalLength', '')
#             remark = data.get('remark', '')
            
#             print(rows,'rows')

#             PatientId = data.get('PatientId', '')
#             PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')

#             print(data, 'dataaaaaa')


#             # Validate date formats  //use
#             date_fields = ['menstrualLMP', 'menstrualEDD','correctedbyUSG']
#             for field in date_fields:
#                 if field in data and not re.match(r'\d{4}-\d{2}-\d{2}', data[field]):
#                     return JsonResponse({'error': f'Invalid date format for {field}. Must be YYYY-MM-DD format.'})

#             for DrainData2 in drainsData2:  #//use
#                 if 'dateInv' in DrainData2 and not re.match(r'\d{4}-\d{2}-\d{2}', row['date']):
#                     return JsonResponse({'error': f'Invalid date format for row date: {row["date"]}. Must be YYYY-MM-DD format.'})
            
#             for DrainData3 in drainsData3:  #//use
#                 if 'dateforDelivery' in DrainData3 and not re.match(r'\d{4}-\d{2}-\d{2}', row['date']):
#                     return JsonResponse({'error': f'Invalid date format for row date: {row["date"]}. Must be YYYY-MM-DD format.'})
            
#             # for row in rows:  #//use
#             #     if 'date' in row and not re.match(r'\d{4}-\d{2}-\d{2}', row['date']):
#             #         return JsonResponse({'error': f'Invalid date format for row date: {row["date"]}. Must be YYYY-MM-DD format.'})



#             # Save data
#             ANC_Card_instance = Workbench_ANC_Card(
#                 PatientId=PatientId,
#                 PatientName=PatientName,
#                 HusbandName=husbandName,
#                 HusSurName=husSurName,
#                 HusFirstName=husFirstName,
#                 HusMiddleName=husMiddleName,
#                 Age=age,
#                 Religion=religion,
#                 Occupation=occupation,
#                 PhoneNumber=phoneNumber,
#                 Address=address,
#                 MenstrualLMP=menstrualLMP,
#                 MenstrualEDD=menstrualEDD,
#                 CorrectedbyUSG=correctedbyUSG,

#                 DrainsData1=drainsData,
#                 HighRiskFactors=HighRiskFactors,

#                 SurgicalHistory=surgicalHistory,

#                 Family_History=FamilyHistory,

#                 Allergies=allergies,
#                 BloodGroupHusband=bloodGroupHusband,

#                 DrainsData2=drainsData2,

#                 CheckboxState=checkboxState,

#                 BSLText=BslText,
#                 HIVText=HivText,
#                 UreaText=UreaText,
#                 BTCTText=BtctText,
#                 OGCTText=OgctText,
#                 VDRLText=VdrlText,
#                 AuAgText=AuAgText,
#                 CreatrineText=CreatrineText,
#                 WBCText=WbcText,
#                 AnyotherinvesText=anyotherinvesText,

#                 CVS_Text=CvsText,
#                 RS_Text=RsText,
#                 Breast_Text=BreastText,

#                 RadioBtns=RadioBtn,

#                 TT1Text=Tt1Text,
#                 TT2Text=Tt2Text,
#                 TT3Text=Tt3Text,
#                 Betnesol_Text=BetnesolText,
#                 FolicAcidText=FolicAcidText,
#                 CalciumText=CalciumText,
#                 FTNDLSCSText=FtndLscsText,
#                 FTNDTLText=FtndTlText,
#                 PostDeliveryText=PostDeliveryText,

#                 DrainsData3=drainsData3,
#                 Rows=rows,

#                 created_by=created_by
#             )
#             ANC_Card_instance.save()

#             return JsonResponse({'success': 'ANC_Card Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             Anc_CardData = Workbench_ANC_Card.objects.all()

#             ANC_Data = [
#                 {
#                     'id': ANC.Id,
#                     'PatientId': ANC.PatientId,
#                     'PatientName': ANC.PatientName,
#                     'husbandName': ANC.HusbandName,

#                     'husSurName': ANC.HusSurName,
#                     'husFirstName': ANC.HusFirstName,
#                     'husMiddleName': ANC.HusMiddleName,

#                     'age': ANC.Age,
#                     'religion': ANC.Religion,
#                     'occupation': ANC.Occupation,
#                     'phoneNumber': ANC.PhoneNumber,
#                     'address': ANC.Address,
#                     'menstrualLMP': ANC.MenstrualLMP,
#                     'menstrualEDD': ANC.MenstrualEDD,
#                     'correctedbyUSG': ANC.CorrectedbyUSG,



#                     'SNO': ANC.S_NO,
#                     'drainsData': ANC.DrainsData1,

#                     'HighRiskFactors': ANC.HighRiskFactors,

#                     'surgicalHistory': ANC.SurgicalHistory,

#                     'FamilyHistory': ANC.Family_History,

#                     'allergies': ANC.Allergies,
#                     'bloodGroupHusband': ANC.BloodGroupHusband,

#                     'drainsData2': ANC.DrainsData2,

#                     'checkboxState': ANC.CheckboxState,

#                     'BslText': ANC.BSLText,
#                     'HivText': ANC.HIVText,
#                     'UreaText': ANC.UreaText,
#                     'BtctText': ANC.BTCTText,
#                     'OgctText': ANC.OGCTText,
#                     'VdrlText': ANC.VDRLText,
#                     'AuAgText': ANC.AuAgText,
#                     'CreatrineText': ANC.CreatrineText,
#                     'WbcText': ANC.WBCText,
#                     'anyotherinvesText': ANC.AnyotherinvesText,

#                     'CvsText': ANC.CVS_Text,
#                     'RsText': ANC.RS_Text,
#                     'BreastText': ANC.Breast_Text,

#                     'RadioBtn': ANC.RadioBtns,

#                     'Tt1Text': ANC.TT1Text,
#                     'Tt2Text': ANC.TT2Text,
#                     'Tt3Text': ANC.TT3Text,
#                     'BetnesolText': ANC.Betnesol_Text,
#                     'FolicAcidText': ANC.FolicAcidText,
#                     'CalciumText': ANC.CalciumText,
#                     'FtndLscsText': ANC.FTNDLSCSText,
#                     'FtndTlText': ANC.FTNDTLText,
#                     'PostDeliveryText': ANC.PostDeliveryText,

#                     'drainsData3': ANC.DrainsData3,

#                     'rows': ANC.Rows,

#                     'created_by': ANC.created_by,
#                     'Date': ANC.created_at.strftime('%Y-%m-%d'),  # Format date
#                     'Time': ANC.created_at.strftime('%H:%M:%S'),  # Format time
#                 } for ANC in Anc_CardData
#             ]
#             print(ANC_Data, 'ANC_Data')
#             return JsonResponse(ANC_Data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)








