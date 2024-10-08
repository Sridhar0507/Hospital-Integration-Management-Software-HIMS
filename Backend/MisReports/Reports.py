
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Q

from .models import *
from Frontoffice.models import *
from Workbench.models import *



# ---ANc And Mcts Get

# def MisAncCard_Detials_link(request):
#     try:
#         search_query = request.GET.get('search', None)
#         limit = request.GET.get('limit', None)
#         from_date = request.GET.get('fromDate', None)
#         to_date = request.GET.get('toDate', None)
        

#         AncDetails = Workbench_ANC_Card.objects.all()

#         # radio_btns = AncDetails.RadioBtns
#         # tt1_value = radio_btns.get('TT1', '')


#         if search_query:
#             AncDetails = AncDetails.filter(
#                 Q(Registration_Id__PatientId__PatientId__icontains=search_query) |
#                 Q(Registration_Id__PatientId__FirstName__icontains=search_query) |
#                 Q(Registration_Id__PatientId__CasesheetNo__icontains=search_query) |
#                 Q(Registration_Id__Registration_Id__icontains=search_query)
#             )

#         if from_date and to_date:
#             from_date = datetime.strptime(from_date, '%Y-%m-%d')
#             to_date = datetime.strptime(to_date, '%Y-%m-%d')
#             AncDetails = AncDetails.filter(created_at__date__range=[from_date, to_date])
#         elif from_date:
#             # If from_date is set but to_date is not, filter by a single date
#             from_date = datetime.strptime(from_date, '%Y-%m-%d')
#             AncDetails = AncDetails.filter(created_at__date=from_date)


#         if limit:
#             AncDetails = AncDetails[:int(limit)]  # Limit the number of records


#         AncCard_list = [
#             {
#                 'id': indx + 1,
#                 'Registration_Id': patient.Registration_Id.Registration_Id,
#                 'PatientId': patient.Registration_Id.PatientId.PatientId,
#                 'PatientName': patient.Registration_Id.PatientId.FirstName,
#                 'Age': patient.Registration_Id.PatientId.Age,
#                 'Address': f"{patient.Registration_Id.PatientId.DoorNo}, {patient.Registration_Id.PatientId.Street}, {patient.Registration_Id.PatientId.Area}, {patient.Registration_Id.PatientId.City}, {patient.Registration_Id.PatientId.State}, {patient.Registration_Id.PatientId.Country}, {patient.Registration_Id.PatientId.Pincode}",
#                 'BloodGroup': patient.Registration_Id.PatientId.BloodGroup,
#                 'PhoneNo': patient.Registration_Id.PatientId.PhoneNo,
#                 'UniqueIdNo': patient.Registration_Id.PatientId.UniqueIdNo,#Aadhar card No
#                 'ObstHistory': patient.ObstHistory,
#                 'MenstrualEDD': patient.MenstrualEDD,
#                 'MenstrualLMP': patient.MenstrualLMP,
#                 'DeliveryResult': patient.DeliveryResult,
#                 'AncCardNo': patient.AncCardNo,
#                 'MctsNo': patient.MctsNo,
#                 'DeliveryDate': patient.DeliveryDate,
#                 'VisitId': patient.Registration_Id.VisitId,
#                 'AmenorrheaDelivery': (patient.DrainsData3[0].get('AmenorrheaDelivery', '') if patient.DrainsData3 else ''),
#                 'weightDelivery': (patient.DrainsData3[0].get('weightDelivery', '') if patient.DrainsData3 else ''),
#                 'BPDelivery': (patient.DrainsData3[0].get('BPDelivery', '') if patient.DrainsData3 else ''),
#                 'BSLText': patient.BSLText,
#                 'Hb': (patient.DrainsData2[0].get('Hb','') if patient.DrainsData2 else ''),
#                 'VDRLText': patient.VDRLText,
#                 'OGCTText': patient.OGCTText,
#                 'TT1': patient.TT1,
#                 'TT2': patient.TT2,
#                 'TT3': patient.TT3,
#                 'Betnesol': patient.Betnesol,
#                 'FolicAcid': patient.FolicAcid,
#                 'Calcium': patient.Calcium,
#                 'FTNDLSCS': patient.FTNDLSCS,
#                 'FTNDTL': patient.FTNDTL,
#                 'PostDelivery': patient.PostDelivery,

                
#                 'created_by': patient.created_by,
#                 'Date': patient.created_at.strftime('%y-%m-%d'), 
#             }
#             for indx, patient in enumerate(AncDetails)
#         ]

#         return JsonResponse(AncCard_list, safe=False)

#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)




def MisAncCard_Detials_link(request):
    try:
        search_query = request.GET.get('search', None)
        limit = request.GET.get('limit', None)
        from_date = request.GET.get('fromDate', None)
        to_date = request.GET.get('toDate', None)

        AncDetails = Workbench_ANC_Card.objects.all()

        if search_query:
            AncDetails = AncDetails.filter(
                Q(Registration_Id__PatientId__PatientId__icontains=search_query) |
                Q(Registration_Id__PatientId__FirstName__icontains=search_query) |
                Q(Registration_Id__PatientId__CasesheetNo__icontains=search_query) |
                Q(Registration_Id__Registration_Id__icontains=search_query)
            )

        if from_date and to_date:
            from_date = datetime.strptime(from_date, '%Y-%m-%d')
            to_date = datetime.strptime(to_date, '%Y-%m-%d')
            AncDetails = AncDetails.filter(created_at__date__range=[from_date, to_date])
        elif from_date:
            from_date = datetime.strptime(from_date, '%Y-%m-%d')
            AncDetails = AncDetails.filter(created_at__date=from_date)

        if limit:
            AncDetails = AncDetails[:int(limit)]

        AncCard_list = []
        for indx, patient in enumerate(AncDetails):
            # Fetch all matching records from AncTable3
            anc_table3_data = Workbench_ANC_Table3.objects.filter(Registration_Id=patient.Registration_Id)

            # Initialize default values
            AmenorrheaDelivery = ''
            weightDelivery = ''
            BPDelivery = ''

            # Process each record if any exist
            if anc_table3_data.exists():
                # You could either process each record or select one based on a certain condition
                for table3 in anc_table3_data:
                    AmenorrheaDelivery = table3.AmenorrheaDelivery
                    weightDelivery = table3.WeightDelivery
                    BPDelivery = table3.BPDelivery
                    # If needed, aggregate or process the values here. For now, we assume you want the last values.

            # Fetch all matching records from AncTable2
            anc_table2_data = Workbench_ANC_Table2.objects.filter(Registration_Id=patient.Registration_Id)

            # Initialize default value for Hb in case there are no matching records
            Hb = ''

            # Process each record if any exist
            if anc_table2_data.exists():
                # You could either process each record or select one based on a certain condition
                for table2 in anc_table2_data:
                    Hb = table2.Hb
                    # If needed, aggregate or process the values here. For now, we assume you want the last value.
            else:
                Hb = ''


            # Add data to the response list
            AncCard_list.append({
                'id': indx + 1,
                'Registration_Id': patient.Registration_Id.Registration_Id,
                'PatientId': patient.Registration_Id.PatientId.PatientId,
                'PatientName': patient.Registration_Id.PatientId.FirstName,
                'Age': patient.Registration_Id.PatientId.Age,
                'Address': f"{patient.Registration_Id.PatientId.DoorNo}, {patient.Registration_Id.PatientId.Street}, {patient.Registration_Id.PatientId.Area}, {patient.Registration_Id.PatientId.City}, {patient.Registration_Id.PatientId.State}, {patient.Registration_Id.PatientId.Country}, {patient.Registration_Id.PatientId.Pincode}",
                'BloodGroup': patient.Registration_Id.PatientId.BloodGroup,
                'PhoneNo': patient.Registration_Id.PatientId.PhoneNo,
                'UniqueIdNo': patient.Registration_Id.PatientId.UniqueIdNo,
                'ObstHistory': patient.ObstHistory,
                'MenstrualEDD': patient.MenstrualEDD,
                'MenstrualLMP': patient.MenstrualLMP,
                'DeliveryResult': patient.DeliveryResult,
                'AncCardNo': patient.AncCardNo,
                'MctsNo': patient.MctsNo,
                'DeliveryDate': patient.DeliveryDate,
                'VisitId': patient.Registration_Id.VisitId,
                'AmenorrheaDelivery': AmenorrheaDelivery,
                'weightDelivery': weightDelivery,
                'BPDelivery': BPDelivery,
                'BSLText': patient.BSLText,
                'Hb': Hb,
                'VDRLText': patient.VDRLText,
                'OGCTText': patient.OGCTText,
                'TT1': patient.TT1,
                'TT2': patient.TT2,
                'TT3': patient.TT3,
                'Betnesol': patient.Betnesol,
                'FolicAcid': patient.FolicAcid,
                'Calcium': patient.Calcium,
                'FTNDLSCS': patient.FTNDLSCS,
                'FTNDTL': patient.FTNDTL,
                'PostDelivery': patient.PostDelivery,
                'created_by': patient.created_by,
                'Date': patient.created_at.strftime('%y-%m-%d'),
            })

        return JsonResponse(AncCard_list, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)





def MisCasePaper_Detials_link(request):
    try:
        search_query = request.GET.get('search', None)
        limit = request.GET.get('limit', None)

        queryset = Patient_Detials.objects.all()

        if search_query:
            queryset = queryset.filter(
                PatientId__icontains=search_query
            ) | queryset.filter(
                CasesheetNo__icontains=search_query
            ) | queryset.filter(
                FirstName__icontains=search_query
            )

        if limit:
            queryset = queryset[:int(limit)]  # Limit the number of records
       
        CasePaper_list = [
            {
                'id': indx + 1,  # Start index from 1
                'PatientId': patient.PatientId,
                'PatientName': patient.FirstName,
                'Age': patient.Age,
                'CasesheetNo': patient.CasesheetNo,
                'created_by': patient.created_by,
            } 
            for indx, patient in enumerate(queryset)
        ]

        return JsonResponse(CasePaper_list, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)






