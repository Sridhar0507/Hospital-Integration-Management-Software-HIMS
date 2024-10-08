import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from .models import Instrument_TrayNames, Instrument_Details, TrayInstrumentLink
from decimal import Decimal  
        


@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Instrument_Name_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("data", data)
            InstrumentCode = data.get("InstrumentCode", None)
            InstrumentName = data.get("InstrumentName", None)
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            if InstrumentCode:
                if Statusedit:
                    try:
                        instrument_instance = Instrument_Details.objects.get(pk=InstrumentCode)
                        instrument_instance.Status = not instrument_instance.Status
                        instrument_instance.save()
                        return JsonResponse({'success': 'Instrument status updated successfully'})
                    except Instrument_Details.DoesNotExist:
                        return JsonResponse({'error': f"No entry found with InstrumentCode '{InstrumentCode}'."}, status=404)
                
                try:
                    instrument_instance = Instrument_Details.objects.get(pk=InstrumentCode)
                except Instrument_Details.DoesNotExist:
                    return JsonResponse({'error': f"No entry found with InstrumentCode '{InstrumentCode}'."}, status=404)
                if Instrument_Details.objects.filter(Instrument_Name=InstrumentName).exists():
                     return JsonResponse({'warn': f"The InstrumentName '{InstrumentName}' already exists."})  
                instrument_instance.Instrument_Name = InstrumentName
                instrument_instance.created_by = created_by
                instrument_instance.save()
                return JsonResponse({'success': 'Instrument updated successfully'})
            else:
                if Instrument_Details.objects.filter(Instrument_Name=InstrumentName).exists():
                    return JsonResponse({'warn': f"The InstrumentName '{InstrumentName}' already exists."})
                
                Instrument_Instance = Instrument_Details(
                    Instrument_Name=InstrumentName,
                    created_by=created_by,
                )
                Instrument_Instance.save()
                return JsonResponse({'success': 'Instrument added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    elif request.method == 'GET':
        try:
            instrument_names = Instrument_Details.objects.all()
            instrument_data = []
            indexx = 1  # Initialize the index starting from 1

            for instrument in instrument_names:
                instrument_data.append({
                    'ind': indexx,
                    'id': instrument.pk,
                    'InstrumentName': instrument.Instrument_Name,
                    'Status': 'Active' if instrument.Status else 'Inactive',
                    'created_by': instrument.created_by
                })
                indexx += 1

            return JsonResponse(instrument_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

        

@csrf_exempt
@require_http_methods(["GET"])
def Instruiment_Names_link(request):
    try:
        InstrumentName = request.GET.get("InstrumentName", None) 
        print("InstrumentName",InstrumentName)# Get the TestName from the query parameters
        if InstrumentName:
            
            InstrumentNames = Instrument_Details.objects.filter(Status="True", Instrument_Name__startswith=InstrumentName)[:10]
            print('InstrumentNames :',InstrumentNames)
        else:
            InstrumentNames = Instrument_Details.objects.filter(Status="True")[:10]
        
        instrument_data = [
            {
                'id': instrument.InstrumentCode,
                'InstrumentName': instrument.Instrument_Name,
                 
            } for instrument in InstrumentNames
        ]
        
        return JsonResponse(instrument_data, safe=False)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)







#-------------------------------------------- Trayinsert,get,update----------------------------------------
@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Instrument_Tray_Names_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("data", data)
            TrayCode = data.get("TrayCode", None)
            TrayName = data.get("TrayName", "")
            TrayQuantity = Decimal(data.get('TrayQuantity', '0'))
            Statusedit = data.get('Statusedit', False)
            Statusedits = data.get('Statusedits', False)
            created_by = data.get('created_by', '')
            TrayNamess = data.get('TrayNamess', [])

            if TrayCode:
                if Statusedit:
                    try:
                        tray_instance = Instrument_TrayNames.objects.get(pk=TrayCode)
                        tray_instance.Status = not tray_instance.Status
                        tray_instance.save()
                        return JsonResponse({'success': 'Tray status updated successfully'})
                    except Instrument_TrayNames.DoesNotExist:
                        return JsonResponse({'error': f"No entry found with TrayCode '{TrayCode}'."}, status=404)

                try:
                    tray_instance = Instrument_TrayNames.objects.get(pk=TrayCode)
                except Instrument_TrayNames.DoesNotExist:
                    return JsonResponse({'error': f"No entry found with TrayCode '{TrayCode}'."}, status=404)
                
                tray_instance.TrayName = TrayName
                tray_instance.TrayQuantity = TrayQuantity
                tray_instance.created_by = created_by
                tray_instance.save()

                # Update Instruments linked to the tray
                tray_instance.trayinstrumentlink_set.all().delete()  # Clear existing links
                
                for tray in TrayNamess:
                        try:
                            instrument = Instrument_Details.objects.get(InstrumentCode=tray['InstrumentCode'])
                            
                            link = TrayInstrumentLink(
                                tray=tray_instance,
                                instrument=instrument,
                                Previous_Quantity=Decimal(tray.get('Previous_Quantity', '0')),
                                Current_Quantity=Decimal(tray.get('Current_Quantity', '0')),
                                Status=True
                            )
                            link.save()
                        except Instrument_Details.DoesNotExist:
                            return JsonResponse({'error': f"No instrument found with InstrumentCode '{tray['InstrumentCode']}'."}, status=404)

                return JsonResponse({'success': 'Tray updated successfully'})
            else:
                if Instrument_TrayNames.objects.filter(TrayName=TrayName).exists():
                    return JsonResponse({'warn': f"The TrayName '{TrayName}' already exists."})

                tray_instance = Instrument_TrayNames(
                    TrayName=TrayName,
                    TrayQuantity=TrayQuantity,
                    created_by=created_by,
                    Status=True
                )
                tray_instance.save()

                for tray in TrayNamess:
                    try:
                        instrument = Instrument_Details.objects.get(InstrumentCode=tray['InstrumentCode'])
                        link = TrayInstrumentLink(
                            tray=tray_instance,
                            instrument=instrument,
                            Previous_Quantity=Decimal(tray.get('Previous_Quantity', '0')),
                            Current_Quantity=Decimal(tray.get('Current_Quantity', '0')),
                            Status=True
                        )
                        link.save()
                    except Instrument_Details.DoesNotExist:
                        return JsonResponse({'error': f"No instrument found with InstrumentCode '{tray['InstrumentCode']}'."}, status=404)

                return JsonResponse({'success': 'Tray added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            tray_names = Instrument_TrayNames.objects.all()
            index = 0
            tray_data = []

            for tray in tray_names:
                tray_dict = {
                    'TrayCode': tray.Tray_Code,
                    'TrayName': tray.TrayName,
                    'TrayQuantity':tray.TrayQuantity,
                    'Instrument': [
                        {
                            'idx': idx + 1,
                            'InstrumentCode': link.instrument.InstrumentCode,
                            'Instrument_Name': link.instrument.Instrument_Name,
                            'Previous_Quantity': str(link.Previous_Quantity),
                            'Current_Quantity': str(link.Current_Quantity),
                            'Status': 'Active' if link.Status else 'Inactive'
                        } for idx, link in enumerate(tray.trayinstrumentlink_set.all())
                    ],
                    'Status': 'Active' if tray.Status else 'Inactive',
                    'created_by': tray.created_by
                }
                tray_data.append(tray_dict)

            return JsonResponse(tray_data, safe=False)

            
            
  

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
