from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.db.models import Q

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Service_Procedure_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            MasterType = data.get('MasterType','')
            
            Department = data.get('Department','')
            ServiceCode = data.get('ServiceCode','')
            ServiceName = data.get('ServiceName','')
            ServiceType = data.get('ServiceType','')
            Amount = data.get('Amount','')
            
            
            procedureType = data.get('Type','')
            ProcedureCode = data.get('ProcedureCode','')
            ProcedureName = data.get('ProcedureName','')
            
            IsGst = data.get('IsGst','')
            GSTValue = data.get('GSTValue','')
            
            created_by = data.get('created_by', '')
            
       
           
            if MasterType == 'Service':
                if ServiceCode:
                        
                    if Service_Master_Details.objects.filter(Service_Name=ServiceName,Department=Department).exclude(pk=ServiceCode).exists():
                        return JsonResponse({'warn': 'Service Name already exists'})
                    
                    else:
                        Service_instance=Service_Master_Details.objects.get(pk= ServiceCode)
                        Service_instance.Service_Name=ServiceName
                        Service_instance.Service_Type=ServiceType
                        Service_instance.Department=Department
                        Service_instance.IsGst=IsGst
                        Service_instance.Amount=Amount
                        Service_instance.GstValue=GSTValue
                        Service_instance.save()
                        
                        return JsonResponse({'success': 'Service Details Updated Successfully'})
                else:
                    if Service_Master_Details.objects.filter(Service_Name=ServiceName,Department=Department).exists():
                        return JsonResponse({'warn': 'Service Name already exists'})

                    Service_instance = Service_Master_Details.objects.create(
                        Service_Name=ServiceName,
                        Department=Department,
                        Service_Type=ServiceType,
                        IsGst=IsGst,
                        GstValue=GSTValue,
                        Amount=Amount,
                        created_by=created_by
                    )
                    return JsonResponse({'success': 'Service  Details added successfully'})
            else:
                if ProcedureCode:
                     
                    if Procedure_Master_Details.objects.filter(Procedure_Name=ProcedureName,Type=procedureType).exclude(pk=ProcedureCode).exists():
                        return JsonResponse({'warn': 'Procedure Name already exists'})
                    
                    else:
                        Procedure_instance=Procedure_Master_Details.objects.get(pk= ProcedureCode)
                        Procedure_instance.Procedure_Name=ProcedureName
                        Procedure_instance.Type=procedureType
                        Procedure_instance.IsGst=IsGst
                        Procedure_instance.Amount=Amount
                        Procedure_instance.GstValue=GSTValue
                        Procedure_instance.save()
                        
                        return JsonResponse({'success': 'Procedure Details Updated Successfully'})
                else:
                    if Procedure_Master_Details.objects.filter(Procedure_Name=ProcedureName,Type=procedureType).exists():
                        return JsonResponse({'warn': 'Procedure Name already exists'})

                    Procedure_instance = Procedure_Master_Details.objects.create(
                        Procedure_Name=ProcedureName,
                        Type=procedureType,
                        IsGst=IsGst,
                        GstValue=GSTValue,
                        Amount=Amount,
                        created_by=created_by
                    )
                    return JsonResponse({'success': 'Procedure Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            MasterType = request.GET.get('MasterType')
            Type = request.GET.get('Type')
            SearchBy = request.GET.get('SearchBy')
            
            if MasterType == 'Service':
                Service_Procedure_ins = Service_Master_Details.objects.filter(
                     Q(Department__icontains=Type) & (Q(Service_Name__icontains=SearchBy) | Q(Service_Id__icontains=SearchBy))
                )
            else:
                Service_Procedure_ins = Procedure_Master_Details.objects.filter(
                      Q(Type__icontains=Type) & (Q(Procedure_Name__icontains=SearchBy) | Q(Procedure_Id__icontains=SearchBy))
                )


            Service_Procedure_data = []
            for Serpro in Service_Procedure_ins:
                Serpro_dict = {}
                if MasterType == 'Service':
                    Serpro_dict = {
                        'id': Serpro.Service_Id,
                        'ServiceName': Serpro.Service_Name,
                        'ServiceType': Serpro.Service_Type,
                        'Department': Serpro.Department,
                        'IsGst': Serpro.IsGst,
                        'GSTValue': Serpro.GstValue,
                        'Amount': Serpro.Amount,
                        'Status': 'Active' if Serpro.Status else 'Inactive',
                        'CreatedBy': Serpro.created_by,
                    }
                else:
                    Serpro_dict = {
                        'id': Serpro.Procedure_Id,
                        'ProcedureName': Serpro.Procedure_Name,
                        'Type': Serpro.Type,
                        'IsGst': Serpro.IsGst,
                        'GSTValue': Serpro.GstValue,
                        'Amount': Serpro.Amount,
                        'Status': 'Active' if Serpro.Status else 'Inactive',
                        'CreatedBy': Serpro.created_by,
                    }
                Service_Procedure_data.append(Serpro_dict)

            return JsonResponse(Service_Procedure_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
def update_status_Service_Procedure_Detials_link(request):
    try:
        data = json.loads(request.body)
        print(data)
        MasterType = data.get('MasterType', '')

        # Insurance data
        id = data.get('id', '')   
        # Retrieve data from Doctor_Personal_Form_Detials
        if MasterType == 'Service':
            if id:
                
                Service_data = Service_Master_Details.objects.get(pk = id)
                Service_data.Status = not Service_data.Status
                Service_data.save()
                return JsonResponse({'success': 'Service Status Updated successfully'})
            return JsonResponse({'success': 'Service '})
        else:
            if id:
                
                Procedure_data = Procedure_Master_Details.objects.get(pk = id)
                Procedure_data.Status = not Procedure_data.Status
                Procedure_data.save()
                return JsonResponse({'success': 'Procedure Status Updated successfully'})
            return JsonResponse({'success': 'Procedure '})        

        # Return JSON response
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})




def Service_Procedure_Ratecard_details_view_by_id(request):
    try:
        MasterType = request.GET.get('MasterType')
        id = request.GET.get('id')
        
        if not id:
            return JsonResponse({'warn': 'ID is required to fetch the ratecard details'}, safe=False)
        
        if MasterType == 'Service':
            service_procedure_ins = Service_Master_Details.objects.get(pk=id)
            ratecard_ins = Service_Procedure_Charges.objects.filter(MasterType=MasterType, Service_ratecard__pk=id)
        else:
            service_procedure_ins = Procedure_Master_Details.objects.get(pk=id)
            ratecard_ins = Service_Procedure_Charges.objects.filter(MasterType=MasterType, Procedure_ratecard__pk=id)

        doctor_data = {
            'id': service_procedure_ins.pk,
            'Service_procedure_name': service_procedure_ins.Service_Name if MasterType == 'Service' else service_procedure_ins.Procedure_Name,
            'Typess': service_procedure_ins.Department if MasterType == 'Service' else service_procedure_ins.Type,
            'Status': 'Active' if service_procedure_ins.Status else 'Inactive',
            'Roomtypes': [],
            'Ratecarddetials': [],
        }

        for ratecard in ratecard_ins:
            doctor_data['Ratecarddetials'].append(
                {
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': False,
                    'RatecardType': None,
                    'RatecardShow': None,
                    'RatecardName': None,
                    'ratecard_id':None,
                    'locationshow':ratecard.Location.Location_Name,
                    'location_id':ratecard.Location.Location_Id,
                    'location_name':ratecard.Location.Location_Name,

                }
            )
            
            
            General_rates={
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': False,
                    'RatecardType': 'General',
                    'RatecardShow': 'General',
                    'RatecardName': None,
                    'ratecard_id': ratecard.pk,
                    'locationshow': None,
                    'location_id': ratecard.Location.Location_Id,
                    'location_name': ratecard.Location.Location_Name,
                }
            if MasterType=='Service' and doctor_data['Typess'] == 'OP':
                
                service_procedure_rates= Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=ratecard)
                General_rates['prev_fee']=service_procedure_rates.General_Prev_fee
                General_rates['fee']=service_procedure_rates.General_fee
            
            elif MasterType=='Service' and doctor_data['Typess'] == 'IP':
                
                service_procedure_room_rates= Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard)
                for room in service_procedure_room_rates:
                    room_name = room.room_type.Room_Name
                    room_id = room.room_type.Room_Id
                    General_rates[f'{room_name}_{room_id}_prev_fee'] = room.General_Prev_fee
                    General_rates[f'{room_name}_{room_id}_curr_fee'] = room.General_fee
            else:
                service_procedure_rates= Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=ratecard)
                General_rates['prev_fee']=service_procedure_rates.General_Prev_fee
                General_rates['fee']=service_procedure_rates.General_fee
                
                service_procedure_room_rates= Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard)
                for room in service_procedure_room_rates:
                    room_name = room.room_type.Room_Name
                    room_id = room.room_type.Room_Id
                    General_rates[f'{room_name}_{room_id}_prev_fee'] = room.General_Prev_fee
                    General_rates[f'{room_name}_{room_id}_curr_fee'] = room.General_fee
            
            doctor_data['Ratecarddetials'].append(General_rates)
            
            Special_rates={
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': False,
                    'RatecardType': 'Special',
                    'RatecardShow': 'Special',
                    'RatecardName': None,
                    'ratecard_id': ratecard.pk,
                    'locationshow': None,
                    'location_id': ratecard.Location.Location_Id,
                    'location_name': ratecard.Location.Location_Name,
                }
            if MasterType=='Service' and doctor_data['Typess'] == 'OP':
                service_procedure_rates= Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=ratecard)
                Special_rates['prev_fee']=service_procedure_rates.Special_Prev_fee
                Special_rates['fee']=service_procedure_rates.Special_fee
                
            elif MasterType=='Service' and doctor_data['Typess'] == 'IP':
                service_procedure_room_rates= Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard)
                for room in service_procedure_room_rates:
                    room_name = room.room_type.Room_Name
                    room_id = room.room_type.Room_Id
                    Special_rates[f'{room_name}_{room_id}_prev_fee'] = room.Special_Prev_fee
                    Special_rates[f'{room_name}_{room_id}_curr_fee'] = room.Special_fee
            else:
                service_procedure_rates= Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=ratecard)
                Special_rates['prev_fee']=service_procedure_rates.Special_Prev_fee
                Special_rates['fee']=service_procedure_rates.Special_fee
                
                service_procedure_room_rates= Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard)
                for room in service_procedure_room_rates:
                    room_name = room.room_type.Room_Name
                    room_id = room.room_type.Room_Id
                    Special_rates[f'{room_name}_{room_id}_prev_fee'] = room.Special_Prev_fee
                    Special_rates[f'{room_name}_{room_id}_curr_fee'] = room.Special_fee
            
            doctor_data['Ratecarddetials'].append(Special_rates)
            
           
            
            # Client rates
            if Client_Master_Detials.objects.exists():
                doctor_data['Ratecarddetials'].append({
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': True,
                    'RatecardType': 'Client',
                    'RatecardShow': 'Client',
                    'RatecardName': None,
                    'ratecard_id': None,
                    'locationshow': None,
                    'location_id': None,
                    'location_name': None,
                })
                
                
                if MasterType=='Service' and doctor_data['Typess'] == 'OP':
                    service_procedure_client_rate = Service_Procedure_ClientFee.objects.filter(Service_Procedure_ratecard=ratecard)
                    for cli in service_procedure_client_rate:
                        client_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Client',
                            'RatecardShow': None,
                            'ratecard_id': cli.Service_Procedure_ratecard.pk,
                            'RatecardName': cli.client.Client_Name,
                            'Ratecardid': cli.client.Client_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,
                            
                        }
                        client_ratecard['prev_fee']=cli.Prev_fee
                        client_ratecard['fee']=cli.fee 
                        doctor_data['Ratecarddetials'].append(client_ratecard)
                        
                elif MasterType=='Service' and doctor_data['Typess'] == 'IP':
                    for clie in Client_Master_Detials.objects.all():
                        client_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Client',
                            'RatecardShow': None,
                            'ratecard_id': ratecard.pk,
                            'RatecardName': clie.Client_Name,
                            'Ratecardid': clie.Client_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,
                            
                        }
                        service_procedure_roon_client_fee= Service_Procedure_ClientRoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard,client__pk=clie.Client_Id)
                        for room_cli in service_procedure_roon_client_fee:
                            room_name = room_cli.room_type_fee.Room_Name
                            room_id = room_cli.room_type_fee.Room_Id
                            client_ratecard[f'{room_name}_{room_id}_prev_fee'] = room_cli.Prev_fee
                            client_ratecard[f'{room_name}_{room_id}_curr_fee'] = room_cli.fee
                        doctor_data['Ratecarddetials'].append(client_ratecard)
                else:
                    service_procedure_client_rate = Service_Procedure_ClientFee.objects.filter(Service_Procedure_ratecard=ratecard)
                    for cli in service_procedure_client_rate:
                        client_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Client',
                            'RatecardShow': None,
                            'ratecard_id': cli.Service_Procedure_ratecard.pk,
                            'RatecardName': cli.client.Client_Name,
                            'Ratecardid': cli.client.Client_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,
                            
                        }
                        client_ratecard['prev_fee']=cli.Prev_fee
                        client_ratecard['fee']=cli.fee 
                        service_procedure_roon_client_fee= Service_Procedure_ClientRoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard,client__pk=cli.client.Client_Id)
                        for room_cli in service_procedure_roon_client_fee:
                            room_name = room_cli.room_type_fee.Room_Name
                            room_id = room_cli.room_type_fee.Room_Id
                            client_ratecard[f'{room_name}_{room_id}_prev_fee'] = room_cli.Prev_fee
                            client_ratecard[f'{room_name}_{room_id}_curr_fee'] = room_cli.fee    
                        
                        doctor_data['Ratecarddetials'].append(client_ratecard)
           
            # for insurance
            if Insurance_Master_Detials.objects.exists():
                doctor_data['Ratecarddetials'].append({
                    'id': len(doctor_data['Ratecarddetials']) + 1,
                    'isrowgroup': True,
                    'RatecardType': 'Insurance',
                    'RatecardShow': 'Insurance',
                    'RatecardName': None,
                    'ratecard_id': None,
                    'locationshow': None,
                    'location_id': None,
                    'location_name': None,
                })
                
                if MasterType=='Service' and doctor_data['Typess'] == 'OP':
                    service_procedure_insurance_rate = Service_Procedure_InsuranceFee.objects.filter(Service_Procedure_ratecard=ratecard).order_by('insurance__Type', 'insurance__Insurance_Name')
                    for ins in service_procedure_insurance_rate:
                        ins_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Insurance',
                            'RatecardShow': None,
                            'ratecard_id': ins.Service_Procedure_ratecard.pk,
                            'RatecardName': f"{ins.insurance.Insurance_Name} - {ins.insurance.Type}" if ins.insurance.Type=='MAIN' else  f"{ins.insurance.Insurance_Name} - {ins.insurance.Type} - {ins.insurance.TPA_Name}" ,
                            'Ratecardid': ins.insurance.Insurance_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,

                        }
                        ins_ratecard['prev_fee']=ins.Prev_fee
                        ins_ratecard['fee']=ins.fee
                        doctor_data['Ratecarddetials'].append(ins_ratecard)
                    
                elif MasterType=='Service' and doctor_data['Typess'] == 'IP':
                    for ins in Insurance_Master_Detials.objects.all().order_by('Type'):
                        ins_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Insurance',
                            'RatecardShow': None,
                            'ratecard_id': ratecard.pk,
                            'RatecardName': f"{ins.Insurance_Name} - {ins.Type}" if ins.Type=='MAIN' else  f"{ins.Insurance_Name} - {ins.Type} - {ins.TPA_Name}" ,
                            'Ratecardid': ins.Insurance_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,
                            
                        }
                        service_procedure_roon_client_fee= Service_Procedure_InsuranceRoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard,insurance__pk=ins.Insurance_Id).order_by('Type','Insurance_Name')
                        for room_ins in service_procedure_roon_client_fee:
                            room_name = room_ins.room_type_fee.Room_Name
                            room_id = room_ins.room_type_fee.Room_Id
                            ins_ratecard[f'{room_name}_{room_id}_prev_fee'] = room_ins.Prev_fee
                            ins_ratecard[f'{room_name}_{room_id}_curr_fee'] = room_ins.fee
                        doctor_data['Ratecarddetials'].append(ins_ratecard)
                else:
                    service_procedure_insurance_rate = Service_Procedure_InsuranceFee.objects.filter(Service_Procedure_ratecard=ratecard).order_by('insurance__Type', 'insurance__Insurance_Name')
                    for ins in service_procedure_insurance_rate:
                        ins_ratecard = {
                            'id': len(doctor_data['Ratecarddetials']) + 1,
                            'isrowgroup': False,
                            'RatecardType': 'Insurance',
                            'RatecardShow': None,
                            'ratecard_id': ins.Service_Procedure_ratecard.pk,
                            'RatecardName': f"{ins.insurance.Insurance_Name} - {ins.insurance.Type}" if ins.insurance.Type=='MAIN' else  f"{ins.insurance.Insurance_Name} - {ins.insurance.Type} - {ins.insurance.TPA_Name}" ,
                            'Ratecardid': ins.insurance.Insurance_Id,
                            'locationshow': None,
                            'location_id': ratecard.Location.Location_Id,
                            'location_name': ratecard.Location.Location_Name,

                        }
                        ins_ratecard['prev_fee']=ins.Prev_fee
                        ins_ratecard['fee']=ins.fee
                        service_procedure_roon_client_fee= Service_Procedure_InsuranceRoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard,insurance__pk=ins.insurance.Insurance_Id)
                        for room_ins in service_procedure_roon_client_fee:
                            room_name = room_ins.room_type_fee.Room_Name
                            room_id = room_ins.room_type_fee.Room_Id
                            ins_ratecard[f'{room_name}_{room_id}_prev_fee'] = room_ins.Prev_fee
                            ins_ratecard[f'{room_name}_{room_id}_curr_fee'] = room_ins.fee
                        doctor_data['Ratecarddetials'].append(ins_ratecard)
            
            if MasterType=='Service' or doctor_data['Typess'] != 'OP':               
                for room_fee in Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=ratecard):
                        room_name = room_fee.room_type.Room_Name
                        room_id = room_fee.room_type.Room_Id
                        if {'id':room_id,'name':room_name} not in doctor_data['Roomtypes']:
                            doctor_data['Roomtypes'].append({'id':room_id,'name':room_name})        
            
        
        
        return JsonResponse(doctor_data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)})



@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def Service_Procedure_Ratecard_details_update(request):
    try:
        data = json.loads(request.body)
        MasterType = data.get('MasterType')
        RatecardType = data.get('RatecardType')
        SP_ratecard_id = data.get('SP_ratecard_id')
        SP_Ratecardid = data.get('SP_Ratecardid')
        locationid = data.get('location')
        colId = data.get('colId')
        col = data.get('col')
        changedRate = data.get('changedRate')
        
        
        # Check if the Service_Procedure_Charges record exists
        try:
            service_procedure_details = Service_Procedure_Charges.objects.get(pk=SP_ratecard_id)
            
        except Service_Procedure_Charges.DoesNotExist:
            return JsonResponse({'error': 'Service_Procedure_Charges record not found'}, status=404)

        
        if col =='OP':
            service_procedure_OP_rates = Service_Procedure_Rate_Charges.objects.get(Service_Procedure_ratecard=service_procedure_details)
            if RatecardType == 'General':
                service_procedure_OP_rates.General_Prev_fee = service_procedure_OP_rates.General_fee
                service_procedure_OP_rates.General_fee = changedRate
                service_procedure_OP_rates.save()
            elif RatecardType == 'Special':
                service_procedure_OP_rates.Special_Prev_fee = service_procedure_OP_rates.Special_fee
                service_procedure_OP_rates.Special_fee = changedRate
                service_procedure_OP_rates.save()
            elif RatecardType == 'Client':
                service_procedure_client_rate = Service_Procedure_ClientFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,client__pk = SP_Ratecardid)
                service_procedure_client_rate.Prev_fee = service_procedure_client_rate.fee
                service_procedure_client_rate.fee = changedRate
                service_procedure_client_rate.save()
            elif RatecardType == 'Insurance':
                service_procedure_insurance_rate = Service_Procedure_InsuranceFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,insurance__pk=SP_Ratecardid)
                service_procedure_insurance_rate.Prev_fee = service_procedure_insurance_rate.fee
                service_procedure_insurance_rate.fee = changedRate
                service_procedure_insurance_rate.save()
        else:
            if RatecardType == 'General':
                service_procedure_room_charge=Service_Procedure_RoomTypeFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,room_type__pk=colId)
                service_procedure_room_charge.General_Prev_fee = service_procedure_room_charge.General_fee
                service_procedure_room_charge.General_fee = changedRate
                service_procedure_room_charge.save()
            elif RatecardType == 'Special':
                service_procedure_room_charge=Service_Procedure_RoomTypeFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,room_type__pk=colId)
                service_procedure_room_charge.Special_Prev_fee = service_procedure_room_charge.Special_fee
                service_procedure_room_charge.Special_fee = changedRate
                service_procedure_room_charge.save()
            elif RatecardType == 'Client':
                service_procedure_room_client_charge=Service_Procedure_ClientRoomTypeFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,room_type_fee__pk=colId,client__pk=SP_Ratecardid)
                service_procedure_room_client_charge.Prev_fee = service_procedure_room_client_charge.fee
                service_procedure_room_client_charge.fee = changedRate
                service_procedure_room_client_charge.save()
            elif RatecardType == 'Insurance':
                service_procedure_room_ins_charge=Service_Procedure_InsuranceRoomTypeFee.objects.get(Service_Procedure_ratecard__pk=SP_ratecard_id,room_type_fee__pk=colId,insurance__pk=SP_Ratecardid)
                service_procedure_room_ins_charge.Prev_fee = service_procedure_room_ins_charge.fee
                service_procedure_room_ins_charge.fee = changedRate
                service_procedure_room_ins_charge.save()
            
            
       
                
        return JsonResponse({'success': f'{MasterType} ratecard details updated successfully'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)





@csrf_exempt
def get_service_procedure_for_ip(request):
    try:
        
        MasterType = request.GET.get('MasterType', '')

        if MasterType:
            
            # Retrieve data from Doctor_Personal_Form_Detials
            if MasterType == 'Service':
                
                Service_data = Service_Master_Details.objects.filter(Status=True).exclude(Department= 'OP')
                ser_dat = [{'id': service.pk, 'name': service.Service_Name,'Type':service.Service_Type} for service in Service_data]
                return JsonResponse(ser_dat,safe=False)

            else:
                Procedure_data = Procedure_Master_Details.objects.filter(Status=True)
                ser_dat = [{'id': pro.pk, 'name': pro.Procedure_Name,'Type':pro.Type} for pro in Procedure_data]
                return JsonResponse(ser_dat,safe=False)
     
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})
