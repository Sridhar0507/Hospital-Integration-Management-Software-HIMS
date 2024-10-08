from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json
import re




@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_IFCard_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data, 'dataaaaaa')

            # Extract data from request
            husbandName = data.get('husbandName', '')
            husbandage = data.get('husbandage', '')
            bloodGroupHusband = data.get('bloodGroupHusband', '')
            durationRelation = data.get('durationRelation', '')
            phoneNumber = data.get('phoneNumber', '')
            address = data.get('address', '')
            attemptingPregnancy = data.get('attemptingPregnancy', '')
            menstrualHistory = data.get('menstrualHistory', '')
            noOfDays = data.get('noOfDays', '')
            dysmenorrhea = data.get('dysmenorrhea', '')
            Mcb = data.get('MCB', '')
            LMPs = data.get('LMPs', [])
            sexualHistory = data.get('sexualHistory', '')
            durationIC = data.get('durationIC', '')
            visitAboard = data.get('visitAboard', '')
            medicalHistory = data.get('medicalHistory', '')
            obstlHistory = data.get('obstlHistory', '')
            surgicalHistory = data.get('surgicalHistory', '')
            AddDate = data.get('AddDate', '')
            AddImpression = data.get('AddImpression', '')
            USGDate = data.get('USGDate', '')
            USGImpression = data.get('USGImpression', '')
            labelsData = data.get('labelsData', {})
            drainsData3 = data.get('drainsData3', [])
            rows = data.get('rows', [])
            selectedRows = data.get('selectedRows', [])
            # PatientId = data.get('PatientId', '')
            # PatientName = data.get('PatientName', '')
            created_by = data.get('created_by', '')
            registration_id = data.get('RegistrationId', '')

            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Save data
            IFard_instance = Workbench_IFCard(
           
                Registration_Id=registration_ins,
                HusbandName=husbandName,
                Husbandage=husbandage,
                BloodGroupHusband=bloodGroupHusband,
                DurationRelation=durationRelation,
                PhoneNumber=phoneNumber,
                Address=address,
                AttemptingPregnancy=attemptingPregnancy,
                MenstrualHistory=menstrualHistory,
                NoOfDays=noOfDays,
                Dysmenorrhea=dysmenorrhea,
                MCB=Mcb,
                LMPs=LMPs,
                SexualHistory=sexualHistory,
                DurationIC=durationIC,
                VisitAboard=visitAboard,
                MedicalHistory=medicalHistory,
                ObstlHistory=obstlHistory,
                SurgicalHistory=surgicalHistory,
                AddDate=AddDate,
                AddImpression=AddImpression,
                USGDate=USGDate,
                USGImpression=USGImpression,
                Hb=labelsData.get('Hb', ''),
                TLC=labelsData.get('TLC', ''),
                BSL=labelsData.get('BSL', ''),
                Prolactin=labelsData.get('S.Prolactin', ''),
                FSH=labelsData.get('FSH', ''),
                E2=labelsData.get('E2', ''),
                HIV=labelsData.get('HIV', ''),
                Urine=labelsData.get('Urine', ''),
                AMH=labelsData.get('AMH', ''),
                TSH=labelsData.get('TSH', ''),
                LH=labelsData.get('LH', ''),
                T3=labelsData.get('T3', ''),
                T4=labelsData.get('T4', ''),
                HCG=labelsData.get('S.HCG', ''),
                rows=rows,
                drainsData3=drainsData3,
                selectedRows=selectedRows,
                created_by=created_by
            )
            IFard_instance.save()

            return JsonResponse({'success': 'IFCard Details added successfully'})

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

            IFCard_Data = Workbench_IFCard.objects.filter(Registration_Id=registration_ins)

            data=[]
            for IFcard in IFCard_Data:
                data.append({
                    'id': IFcard.Id,
                    'RegistrationId': IFcard.Registration_Id.pk,
                    'VisitId': IFcard.Registration_Id.VisitId,
                    'PrimaryDoctorId': IFcard.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': IFcard.Registration_Id.PrimaryDoctor.ShortName,
                    'husbandName': IFcard.HusbandName,
                    'husbandage': IFcard.Husbandage,
                    'bloodGroupHusband': IFcard.BloodGroupHusband,
                    'durationRelation': IFcard.DurationRelation,
                    'phoneNumber': IFcard.PhoneNumber,
                    'address': IFcard.Address,
                    'attemptingPregnancy': IFcard.AttemptingPregnancy,
                    'menstrualHistory': IFcard.MenstrualHistory,
                    'noOfDays': IFcard.NoOfDays,
                    'dysmenorrhea': IFcard.Dysmenorrhea,
                    'Mcb': IFcard.MCB,
                    'LMPs': IFcard.LMPs,
                    'sexualHistory': IFcard.SexualHistory,
                    'durationIC': IFcard.DurationIC,
                    'visitAboard': IFcard.VisitAboard,
                    'medicalHistory': IFcard.MedicalHistory,
                    'obstlHistory': IFcard.ObstlHistory,
                    'surgicalHistory': IFcard.SurgicalHistory,
                    'AddDate': IFcard.AddDate,
                    'AddImpression': IFcard.AddImpression,
                    'USGDate': IFcard.USGDate,
                    'USGImpression': IFcard.USGImpression,
                    'Hb': IFcard.Hb,
                    'Tlc': IFcard.TLC,
                    'Bsl': IFcard.BSL,
                    'Prolactin': IFcard.Prolactin,
                    'Fsh': IFcard.FSH,
                    'e2': IFcard.E2,
                    'Hiv': IFcard.HIV,
                    'Urine': IFcard.Urine,
                    'Amh': IFcard.AMH,
                    'Tsh': IFcard.TSH,
                    'Lh': IFcard.LH,
                    't3': IFcard.T3,
                    't4': IFcard.T4,
                    'Hcg': IFcard.HCG,
                    'rows': IFcard.rows,
                    'drainsData3': IFcard.drainsData3,
                    'selectedRows': IFcard.selectedRows,
                    'created_by': IFcard.created_by,
                    'Date': IFcard.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time': IFcard.created_at.strftime('%H:%M:%S'),  # Format time

                })

            print(data, 'IFCard_data')
            return JsonResponse(data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)




# @csrf_exempt
# @require_http_methods(["POST", "OPTIONS", "GET"])
# def Workbench_IFCard_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print(data, 'dataaaaaa')

        
#             husbandName = data.get('husbandName', '')
#             husbandage = data.get('husbandage', '')
#             bloodGroupHusband = data.get('bloodGroupHusband', '')
#             durationRelation = data.get('durationRelation', '')
#             phoneNumber = data.get('phoneNumber', '')
#             address = data.get('address', '')
#             attemptingPregnancy = data.get('attemptingPregnancy', '')
#             menstrualHistory = data.get('menstrualHistory', '')
#             noOfDays = data.get('noOfDays', '')
#             dysmenorrhea = data.get('dysmenorrhea', '')
#             Mcb = data.get('MCB', '')
#             LMPs = data.get('LMPs', [])
#             sexualHistory = data.get('sexualHistory', '')
#             durationIC = data.get('durationIC', '')
#             visitAboard = data.get('visitAboard', '')
#             medicalHistory = data.get('medicalHistory', '')
#             obstlHistory = data.get('obstlHistory', '')
#             surgicalHistory = data.get('surgicalHistory', '')
#             AddDate = data.get('AddDate', '')
#             AddImpression = data.get('AddImpression', '')
#             USGDate = data.get('USGDate', '')
#             USGImpression = data.get('USGImpression', '')
#             labelsData = data.get('labelsData', {})
#             drainsData3 = data.get('drainsData3', [])
#             rows = data.get('rows', [])

#             # Validate date format for single date fields
#             date_fields = ['AddDate', 'USGDate']
#             for field in date_fields:
#                 if field in data:
#                     if not re.match(r'\d{4}-\d{2}-\d{2}', data[field]):
#                         return JsonResponse({'error': f'Invalid date format for {field}. Must be YYYY-MM-DD format.'})

#             # Validate date format for LMPs array
#             for lmp in LMPs:
#                 if not re.match(r'\d{4}-\d{2}-\d{2}', lmp):
#                     return JsonResponse({'error': f'Invalid date format for LMP: {lmp}. Must be YYYY-MM-DD format.'})

#             # Validate date format for rows and drainsData3
#             for row in rows:
#                 Date=row.get('date', ''),
#                 Count=row.get('count', ''),
#                 Mot=row.get('mot', ''),
#                 Norm=row.get('norm', ''),
#                 if 'date' in row and not re.match(r'\d{4}-\d{2}-\d{2}', row['date']):
#                     return JsonResponse({'error': f'Invalid date format for row date: {row["date"]}. Must be YYYY-MM-DD format.'})

#             for drain in drainsData3:
#                 if 'DateforDelivery' in drain and not re.match(r'\d{4}-\d{2}-\d{2}', drain['DateforDelivery']):
#                     return JsonResponse({'error': f'Invalid date format for DateforDelivery: {drain["DateforDelivery"]}. Must be YYYY-MM-DD format.'})

#             selectedRows = data.get('selectedRows', [])
#             PatientId = data.get('PatientId', '')
#             PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')
            
#             print(rows,'rowwwwww')
#             IFard_instance = Workbench_IFCard(
#                 PatientId=PatientId,
#                 PatientName=PatientName,
#                 HusbandName=husbandName,
#                 Husbandage=husbandage,
#                 BloodGroupHusband=bloodGroupHusband,
#                 DurationRelation=durationRelation,
#                 PhoneNumber=phoneNumber,
#                 Address=address,
#                 AttemptingPregnancy=attemptingPregnancy,
#                 MenstrualHistory=menstrualHistory,
#                 NoOfDays=noOfDays,
#                 Dysmenorrhea=dysmenorrhea,
#                 MCB=Mcb,
#                 LMPs=LMPs,
#                 SexualHistory=sexualHistory,
#                 DurationIC=durationIC,
#                 VisitAboard=visitAboard,
#                 MedicalHistory=medicalHistory,
#                 ObstlHistory=obstlHistory,
#                 SurgicalHistory=surgicalHistory,
#                 AddDate=AddDate,
#                 AddImpression=AddImpression,
#                 USGDate=USGDate,
#                 USGImpression=USGImpression,
#                 Hb=labelsData.get('Hb', ''),
#                 TLC=labelsData.get('TLC', ''),
#                 BSL=labelsData.get('BSL', ''),
#                 Prolactin=labelsData.get('S.Prolactin', ''),
#                 FSH=labelsData.get('FSH', ''),
#                 E2=labelsData.get('E2', ''),
#                 HIV=labelsData.get('HIV', ''),
#                 Urine=labelsData.get('Urine', ''),
#                 AMH=labelsData.get('AMH', ''),
#                 TSH=labelsData.get('TSH', ''),
#                 LH=labelsData.get('LH', ''),
#                 T3=labelsData.get('T3', ''),
#                 T4=labelsData.get('T4', ''),
#                 HCG=labelsData.get('S.HCG', ''),
#                 Date=row.get('date', ''),
#                 Count=row.get('count', ''),
#                 Mot=row.get('mot', ''),
#                 Norm=row.get('norm', ''),
#                 DateforDelivery=drain.get('DateforDelivery', ''),
#                 DayDelivery=drain.get('DayDelivery', ''),
#                 RODelivery=drain.get('RODelivery', ''),
#                 LODelivery=drain.get('LODelivery', ''),
#                 ETDelivery=drain.get('ETDelivery', ''),
#                 StimDelivery=drain.get('StimDelivery', ''),
#                 selectedRows=selectedRows,
#                 created_by=created_by
#             )
#             IFard_instance.save()
           

#             # print(IFard_instance, 'IFard_instance')
#             return JsonResponse({'success': 'IFCard Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             # Fetch all records from the Workbench_IFCard model
#             IFCardData = Workbench_IFCard.objects.all()

#             # Construct a list of dictionaries containing IFCard data
#             IFCard_data = [
#                 {
#                     'id': IFcard.Id,
#                     'PatientId': IFcard.PatientId,
#                     'PatientName': IFcard.PatientName,
#                     'husbandName': IFcard.HusbandName,
#                     'husbandage': IFcard.Husbandage,
#                     'bloodGroupHusband': IFcard.BloodGroupHusband,
#                     'durationRelation': IFcard.DurationRelation,
#                     'phoneNumber': IFcard.PhoneNumber,
#                     'address': IFcard.Address,
#                     'attemptingPregnancy': IFcard.AttemptingPregnancy,
#                     'menstrualHistory': IFcard.MenstrualHistory,
#                     'noOfDays': IFcard.NoOfDays,
#                     'dysmenorrhea': IFcard.Dysmenorrhea,
#                     'Mcb': IFcard.MCB,
#                     'LMPs': IFcard.LMPs,
#                     'sexualHistory': IFcard.SexualHistory,
#                     'durationIC': IFcard.DurationIC,
#                     'visitAboard': IFcard.VisitAboard,
#                     'medicalHistory': IFcard.MedicalHistory,
#                     'obstlHistory': IFcard.ObstlHistory,
#                     'surgicalHistory': IFcard.SurgicalHistory,
#                     'AddDate': IFcard.AddDate,
#                     'AddImpression': IFcard.AddImpression,
#                     'USGDate': IFcard.USGDate,
#                     'USGImpression': IFcard.USGImpression,
#                     'Hb': IFcard.Hb,
#                     'Tlc': IFcard.TLC,
#                     'Bsl': IFcard.BSL,
#                     'Prolactin': IFcard.Prolactin,
#                     'Fsh': IFcard.FSH,
#                     'e2': IFcard.E2,
#                     'Hiv': IFcard.HIV,
#                     'Urine': IFcard.Urine,
#                     'Amh': IFcard.AMH,
#                     'Tsh': IFcard.TSH,
#                     'Lh': IFcard.LH,
#                     't3': IFcard.T3,
#                     't4': IFcard.T4,
#                     'Hcg': IFcard.HCG,
#                     'date': IFcard.Date,
#                     'count': IFcard.Count,
#                     'mot': IFcard.Mot,
#                     'norm': IFcard.Norm,
#                     'DateforDelivery': IFcard.DateforDelivery,
#                     'DayDelivery': IFcard.DayDelivery,
#                     'RODelivery': IFcard.RODelivery,
#                     'LODelivery': IFcard.LODelivery,
#                     'ETDelivery': IFcard.ETDelivery,
#                     'StimDelivery': IFcard.StimDelivery,
#                     'selectedRows': IFcard.selectedRows,
#                     'created_by': IFcard.created_by,
#                     'Date': IFcard.created_at.strftime('%Y-%m-%d'),  # Format date
#                     'Time': IFcard.created_at.strftime('%H:%M:%S'),  # Format time
#                     # 'drainsData3': list(IFcard.drains.values())
#                 } for IFcard in IFCardData
#             ]
#             print(IFCard_data, 'IFCard_data')
#             return JsonResponse(IFCard_data, safe=False)

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)
































