from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Count
from django.http import JsonResponse
from .models import *
from Masters.models import *
from Frontoffice.models import Patient_Admission_Room_Detials,Patient_Admission_Detials
from django.shortcuts import get_object_or_404
from django.db.models import  Q

# building----------------
@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Building_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            BuildingId = data.get('BuildingId','')
            BuildingName = data.get('BuildingName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
           
            if BuildingId:
                if Statusedit:
                    Building_instance = Building_Master_Detials.objects.get(pk=BuildingId)
                    # Check if any Room_Master_Detials records have Booking_Status not equal to "Available"
                    non_available_status_exists = Room_Master_Detials.objects.filter(
                        Building_Name=Building_instance
                    ).exclude(Booking_Status='Available').exists()

                    if non_available_status_exists:
                        # Raise a ValidationError if any Booking_Status is not "Available"
                        return JsonResponse ({'warn':"Cannot change the status because some Booking_Status in Room_Master_Detials is not 'Available'."})
                    else:
                        # Toggle the status
                        Building_instance.Status = not Building_instance.Status

                        # If all Booking_Status are 'Available', proceed with the status update
                        Block_Master_Detials.objects.filter(Building_Name=Building_instance).update(Status=Building_instance.Status)
                        Floor_Master_Detials.objects.filter(Building_Name=Building_instance).update(Status=Building_instance.Status)
                        WardType_Master_Detials.objects.filter(Building_Name=Building_instance).update(Status=Building_instance.Status)
                        RoomType_Master_Detials.objects.filter(Building_Name=Building_instance).update(Status=Building_instance.Status)
                        Room_Master_Detials.objects.filter(Building_Name=Building_instance).update(Status=Building_instance.Status)
                        # Save the changes to the database
                        Building_instance.save()

                 
        
                    
                else:
                    if Building_Master_Detials.objects.filter(Building_Name=BuildingName, Location_Name=Location_instance ).exclude(pk = BuildingId).exists():
                        return JsonResponse({'warn': f"The Building Detials are already present in the name of {BuildingName} and {Location_instance.Location_Name} "})
                    else:
                        Building_instance = Building_Master_Detials.objects.get(pk=BuildingId)
                        # Create a new LocationName instance
                        Building_instance.Building_Name=BuildingName
                        Building_instance.Location_Name=Location_instance
                    
                        Building_instance.save()

                return JsonResponse({'success': 'Building Detials Updated successfully'})
            else:
                if Building_Master_Detials.objects.filter(Building_Name=BuildingName, Location_Name=Location_instance ).exists():
                    return JsonResponse({'warn': f"The Building Detials are already present in the name of {BuildingName} and {Location_instance.Location_Name} "})
                else:
                    Building_instance = Building_Master_Detials(
                        Building_Name=BuildingName,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                Building_instance.save()
                return JsonResponse({'success': 'Building Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Building_Master = Building_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Building_Master_data = []
            for Build in Building_Master:
                Build_dict = {
                    'id': Build.Building_Id,
                    'BuildingName': Build.Building_Name,
                    'Location_Name': Build.Location_Name.Location_Name,
                    'Location_Id': Build.Location_Name.Location_Id,
                    'Status': 'Active' if Build.Status else 'Inactive',
                    'created_by': Build.created_by,
                    
                }
                Building_Master_data.append(Build_dict)

            return JsonResponse(Building_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_building_Data_by_location(request):
    try:
        Location=request.GET.get('Location')
        if not Location:
            return JsonResponse({'error':'Location are required'})
        
        loc_ins= Location_Detials.objects.get(Location_Id=Location)
        # Fetch all records from the LocationName model
        if not Building_Master_Detials.objects.filter(Status=True,Location_Name=loc_ins).exists():
            return JsonResponse({'error':'Data not found'})
        
        Building_Master = Building_Master_Detials.objects.filter(Status=True,Location_Name=loc_ins)
        print(Building_Master)
        # Construct a list of dictionaries containing location data
        Building_Master_data = []
        for Build in Building_Master:
            Build_dict = {
                'id': Build.Building_Id,
                'BuildingName': Build.Building_Name,
                
            }
            Building_Master_data.append(Build_dict)

        return JsonResponse(Building_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)


# block-----------

@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Block_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            BlockId = data.get('BlockId','')
            BlockName = data.get('BlockName','')
            BuildingName = data.get('BuildingName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            if BuildingName:
                Building_instance = Building_Master_Detials.objects.get(Building_Id = BuildingName)
                
           
            if BlockId:
                if Statusedit:
                    Block_instance = Block_Master_Detials.objects.get(pk=BlockId)
    
                    # Check if any Room_Master_Detials records have Booking_Status not equal to "Available"
                    non_available_status_exists = Room_Master_Detials.objects.filter(
                        Block_Name=Block_instance
                    ).exclude(Booking_Status='Available').exists()

                    if non_available_status_exists:
                        # Return a warning message if any Booking_Status is not "Available"
                        return JsonResponse({'warn': "Cannot change the status because some Booking_Status in Room_Master_Detials is not 'Available'."})
                    
                    # Check if all parent statuses are True
                    parent_statuses = []
                    
                    if not Block_instance.Building_Name.Status:
                        parent_statuses.append("Building Status")
                    
                    if parent_statuses:
                        # If any parent status is False, return a warning message
                        return JsonResponse({'warn': f"Cannot change the block status because the following parent statuses are not Active: {', '.join(parent_statuses)}."})
                    
                    # Toggle the status
                    Block_instance.Status = not Block_instance.Status
                    
                    # If all Booking_Status are 'Available', proceed with the status update
                    Floor_Master_Detials.objects.filter(Block_Name=Block_instance).update(Status=Block_instance.Status)
                    WardType_Master_Detials.objects.filter(Block_Name=Block_instance).update(Status=Block_instance.Status)
                    RoomType_Master_Detials.objects.filter(Block_Name=Block_instance).update(Status=Block_instance.Status)
                    Room_Master_Detials.objects.filter(Block_Name=Block_instance).update(Status=Block_instance.Status)
                    
                    # Save the changes to the database
                    Block_instance.save()
                    
                    return JsonResponse({'success': "Block status updated successfully."})
                    
        
                else:
                    if Block_Master_Detials.objects.filter(Block_Name=BlockName, Location_Name=Location_instance,Building_Name = Building_instance ).exclude(pk = BlockId).exists():
                        return JsonResponse({'warn': f"The Block Detials are already present in the name of {BlockName} and {Location_instance.Location_Name} and {Building_instance.Building_Name}"})
                    else:
                        Block_instance = Block_Master_Detials.objects.get(pk=BlockId)
                        # Create a new LocationName instance
                        Block_instance.Block_Name=BlockName
                        Block_instance.Location_Name=Location_instance
                        Block_instance.Building_Name = Building_instance
                    
                        Block_instance.save()

                return JsonResponse({'success': 'Block Detials Updated successfully'})
            else:
                if Block_Master_Detials.objects.filter(Block_Name=BlockName, Location_Name=Location_instance,Building_Name = Building_instance ).exists():
                    return JsonResponse({'warn': f"The Block Detials are already present in the name of {BlockName} and {Location_instance.Location_Name} and {Building_instance.Building_Name}"})
                else:
                    Block_instance = Block_Master_Detials(
                        Block_Name=BlockName,
                        Building_Name = Building_instance,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                Block_instance.save()
                return JsonResponse({'success': 'Block Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Block_Master = Block_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Block_Master_data = []
            for Block in Block_Master:
                Block_dict = {
                    'id': Block.Block_Id,
                    'BlockName': Block.Block_Name,
                    'BuildingId': Block.Building_Name.Building_Id,
                    'BuildingName': Block.Building_Name.Building_Name,
                    'Location_Name': Block.Location_Name.Location_Name,
                    'Location_Id': Block.Location_Name.Location_Id,
                    'Status': 'Active' if Block.Status else 'Inactive',
                    'created_by': Block.created_by,
                    
                }
                Block_Master_data.append(Block_dict)

            return JsonResponse(Block_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_block_Data_by_Building(request):
    try:
       
        Building=request.GET.get('Building')
        if not Building:
            return JsonResponse({'error':'Building are required'},status=400)
        
        Building_ins= Building_Master_Detials.objects.get(Building_Id=Building)
        
        if not Block_Master_Detials.objects.filter(Status=True,Building_Name=Building_ins,Location_Name__pk=Building_ins.Location_Name.pk).exists():
            return JsonResponse({'error':'Data Not Found'},status=400)
        # Fetch all records from the LocationName model
        Block_Master = Block_Master_Detials.objects.filter(Status=True,Building_Name=Building_ins,Location_Name__pk=Building_ins.Location_Name.pk)
 
        # Construct a list of dictionaries containing location data
        Block_Master_data = []
        for Block in Block_Master:
            Block_dict = {
                'id': Block.Block_Id,
                'BlockName': Block.Block_Name,
                
            }
            Block_Master_data.append(Block_dict)

        return JsonResponse(Block_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



# floor------------
@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Floor_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            FloorId = data.get('FloorId','')
            FloorName = data.get('FloorName','')
            BlockName = data.get('BlockName','')
            BuildingName = data.get('BuildingName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            
            Location_instance=None
            Building_instance=None
            Block_instance=None
            
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            if BuildingName:
                Building_instance = Building_Master_Detials.objects.get(Building_Id = BuildingName)
                
            if BlockName:
                Block_instance = Block_Master_Detials.objects.get(Block_Id = BlockName)
                
        
            if FloorId:
                if Statusedit:
                    Floor_instance = Floor_Master_Detials.objects.get(pk=FloorId)
    
                    # Check if any Room_Master_Detials records have Booking_Status not equal to "Available"
                    non_available_status_exists = Room_Master_Detials.objects.filter(
                        Floor_Name=Floor_instance
                    ).exclude(Booking_Status='Available').exists()

                    if non_available_status_exists:
                        # Return a warning message if any Booking_Status is not "Available"
                        return JsonResponse({'warn': "Cannot change the status because some Booking_Status in Room_Master_Detials is not 'Available'."})
                    
                    # Check if all parent statuses are True
                    parent_statuses = []
                    
                    if not Floor_instance.Building_Name.Status:
                        parent_statuses.append("Building Status")
                    
                    if not Floor_instance.Block_Name.Status:
                        parent_statuses.append("Block Status")
                    
                    if parent_statuses:
                        # If any parent status is False, return a warning message
                        return JsonResponse({'warn': f"Cannot change the floor status because the following parent statuses are not Active: {', '.join(parent_statuses)}."})
                    
                    # Toggle the status
                    Floor_instance.Status = not Floor_instance.Status
                    
                    # If all Booking_Status are 'Available', proceed with the status update
                    WardType_Master_Detials.objects.filter(Floor_Name=Floor_instance).update(Status=Floor_instance.Status)
                    RoomType_Master_Detials.objects.filter(Floor_Name=Floor_instance).update(Status=Floor_instance.Status)
                    Room_Master_Detials.objects.filter(Floor_Name=Floor_instance).update(Status=Floor_instance.Status)
                    
                    # Save the changes to the database
                    Floor_instance.save()
                    
                    return JsonResponse({'success': "Floor status updated successfully."})
                    
                   
        
                    # Toggle the status
                    
                    
                    # Save the changes to the database
                    
                else:
                    if Floor_Master_Detials.objects.filter(Floor_Name=FloorName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance).exclude(pk= FloorId).exists():
                        return JsonResponse({'warn': f"The Block Detials are already present in the name of {FloorName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name}"})
                    else:
                        Floor_instance = Floor_Master_Detials.objects.get(pk=FloorId)
                        # Create a new LocationName instance
                        Floor_instance.Floor_Name=FloorName
                        Floor_instance.Block_Name=Block_instance
                        Floor_instance.Location_Name=Location_instance
                        Floor_instance.Building_Name = Building_instance
                    
                        Floor_instance.save()

                return JsonResponse({'success': 'Floor Detials Updated successfully'})
            else:
                if Floor_Master_Detials.objects.filter(Floor_Name=FloorName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance).exists():
                    return JsonResponse({'warn': f"The Block Detials are already present in the name of {FloorName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name}"})
                else:
                    Floor_instance = Floor_Master_Detials(
                        Floor_Name=FloorName,
                        Block_Name=Block_instance,
                        Building_Name = Building_instance,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                Floor_instance.save()
                return JsonResponse({'success': 'Floor Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Floor_Master = Floor_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Floor_Master_data = []
            for Floor in Floor_Master:
                Floor_dict = {
                    'id': Floor.Floor_Id,
                    'FloorName': Floor.Floor_Name,
                    'BlockId': Floor.Block_Name.Block_Id,
                    'BlockName': Floor.Block_Name.Block_Name,
                    'BuildingId': Floor.Building_Name.Building_Id,
                    'BuildingName': Floor.Building_Name.Building_Name,
                    'Location_Name': Floor.Location_Name.Location_Name,
                    'Location_Id': Floor.Location_Name.Location_Id,
                    'Status': 'Active' if Floor.Status else 'Inactive',
                    'created_by': Floor.created_by,
                    
                }
                Floor_Master_data.append(Floor_dict)

            return JsonResponse(Floor_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_Floor_Data_by_Building_block_loc(request):
    try:
        Block=request.GET.get('Block')
        if not Block:
            return JsonResponse({'error':'Block are required'})
        
        Block_ins= Block_Master_Detials.objects.get(Block_Id=Block)
        if not Floor_Master_Detials.objects.filter(Status=True,Building_Name=Block_ins.Building_Name,Block_Name=Block_ins,Location_Name=Block_ins.Location_Name).exists():
            return JsonResponse({'error':'Data not found'})
        # Fetch all records from the LocationName model
        Floor_Master = Floor_Master_Detials.objects.filter(Status=True,Building_Name=Block_ins.Building_Name,Block_Name=Block_ins,Location_Name=Block_ins.Location_Name)
 
        # Construct a list of dictionaries containing location data
        Floor_Master_data = []
        for Floor in Floor_Master:
            Floor_dict = {
                'id': Floor.Floor_Id,
                'FloorName': Floor.Floor_Name, 
            }
            Floor_Master_data.append(Floor_dict)

        return JsonResponse(Floor_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)


# ward name
@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Ward_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            WardId = data.get('WardId','')
            WardName = data.get('WardName','')
            FloorName = data.get('FloorName','')
            BlockName = data.get('BlockName','')
            BuildingName = data.get('BuildingName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            
            Location_instance=None
            Building_instance=None
            Block_instance=None
            Floor_instance=None
            
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            
            if BuildingName:
                Building_instance = Building_Master_Detials.objects.get(Building_Id = BuildingName)
                
            if BlockName:
                Block_instance = Block_Master_Detials.objects.get(Block_Id = BlockName)
                
            if FloorName:
                Floor_instance = Floor_Master_Detials.objects.get(Floor_Id = BlockName)
                
        
            if WardId:
                if Statusedit:
                    ward_instance = WardType_Master_Detials.objects.get(pk=WardId)
    
                    # Check if any Room_Master_Detials records have Booking_Status not equal to "Available"
                    non_available_status_exists = Room_Master_Detials.objects.filter(
                        Ward_Name=ward_instance
                    ).exclude(Booking_Status='Available').exists()

                    if non_available_status_exists:
                        # Return a warning message if any Booking_Status is not "Available"
                        return JsonResponse({'warn': "Cannot change the status because some Booking_Status in Room_Master_Detials is not 'Available'."})
                    
                    # Check if all parent statuses are True
                    parent_statuses = []
                    
                    if not ward_instance.Building_Name.Status:
                        parent_statuses.append("Building Status")
                    
                    if not ward_instance.Block_Name.Status:
                        parent_statuses.append("Block Status")
                    
                    if not ward_instance.Floor_Name.Status:
                        parent_statuses.append("Floor Status")
                    
                    if parent_statuses:
                        # If any parent status is False, return a warning message
                        return JsonResponse({'warn': f"Cannot change the ward status because the following parent statuses are not Active: {', '.join(parent_statuses)}."})
                    
                    # If all conditions are met, toggle the ward status
                    ward_instance.Status = not ward_instance.Status
                    
                    # Update related RoomType and Room statuses
                    RoomType_Master_Detials.objects.filter(Ward_Name=ward_instance).update(Status=ward_instance.Status)
                    Room_Master_Detials.objects.filter(Ward_Name=ward_instance).update(Status=ward_instance.Status)
                    
                    # Save the changes to the database
                    ward_instance.save()
                    
                    return JsonResponse({'success': "Ward status updated successfully."})
                    
        
                   
                else:
                    if WardType_Master_Detials.objects.filter(Ward_Name=WardName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance).exclude(pk=WardId).exists():
                        return JsonResponse({'warn': f"The Ward Detials are already present in the name of {WardName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name}"})
                    else:
                        ward_instance = WardType_Master_Detials.objects.get(pk=WardId)
                        # Create a new LocationName instance
                        ward_instance.Ward_Name=WardName
                        ward_instance.Floor_Name=Floor_instance
                        ward_instance.Block_Name=Block_instance
                        ward_instance.Building_Name = Building_instance
                        ward_instance.Location_Name=Location_instance
                    
                        ward_instance.save()

                return JsonResponse({'success': 'Ward Detials Updated successfully'})
            else:
                if WardType_Master_Detials.objects.filter(Ward_Name=WardName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance).exists():
                        return JsonResponse({'warn': f"The Ward Detials are already present in the name of {WardName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name}"})
                else:
                    ward_instance = WardType_Master_Detials(
                        Ward_Name=WardName,
                        Floor_Name=Floor_instance,
                        Block_Name=Block_instance,
                        Building_Name = Building_instance,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                    ward_instance.save()
                    return JsonResponse({'success': 'Ward Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Floor_Master = WardType_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Floor_Master_data = []
            for Floor in Floor_Master:
                Floor_dict = {
                    'id': Floor.Ward_Id,
                    'WardName': Floor.Ward_Name,
                    'FloorId': Floor.Floor_Name.Floor_Id,
                    'FloorName': Floor.Floor_Name.Floor_Name,
                    'BlockId': Floor.Block_Name.Block_Id,
                    'BlockName': Floor.Block_Name.Block_Name,
                    'BuildingId': Floor.Building_Name.Building_Id,
                    'BuildingName': Floor.Building_Name.Building_Name,
                    'Location_Name': Floor.Location_Name.Location_Name,
                    'Location_Id': Floor.Location_Name.Location_Id,
                    'Status': 'Active' if Floor.Status else 'Inactive',
                    'created_by': Floor.created_by,
                    
                }
                Floor_Master_data.append(Floor_dict)

            return JsonResponse(Floor_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


def get_Ward_Data_by_Building_block_Floor_loc(request):
    try:
        Floor = request.GET.get('Floor')
        RegisterType = request.GET.get('RegisterType')
        
        if not Floor:
            return JsonResponse({'error': 'Floor is required'}, status=400)
        
        # Get the Floor instance
        try:
            Floor_ins = Floor_Master_Detials.objects.get(Floor_Id=Floor)
        except Floor_Master_Detials.DoesNotExist:
            return JsonResponse({'error': 'Floor not found'}, status=404)
        
        # Base query for WardType_Master_Details
        ward_query = WardType_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Floor_ins.Building_Name,
            Block_Name=Floor_ins.Block_Name,
            Floor_Name=Floor_ins,
            Location_Name=Floor_ins.Location_Name
        )
        
        # Apply additional filtering based on RegisterType
        if RegisterType == 'IP':
            ward_query = ward_query.exclude(Ward_Name__in=['CASUALITY', 'OT'])
        elif RegisterType == 'Casuality':
            ward_query = ward_query.filter(Ward_Name='Casuality')
        
        # If no Ward records found
        if not ward_query.exists():
            return JsonResponse({'error': 'No Ward data found'}, status=404)
        
        # Construct response data
        Ward_Master_data = [{'id': Ward.Ward_Id, 'WardName': Ward.Ward_Name} for Ward in ward_query]

        return JsonResponse(Ward_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)

# room name master
@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Room_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            RoomId = data.get('RoomId','')
            RoomName = data.get('RoomName')
            WardName = data.get('WardName','')
            FloorName = data.get('FloorName','')
            BlockName = data.get('BlockName','')
            BuildingName = data.get('BuildingName','')
            RoomCharge = float(data.get('RoomCharge','0'))
            GST_val = data.get('GST','Nill')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            
            Location_instance=None
            Building_instance=None
            Block_instance=None
            Floor_instance=None
            Ward_instance=None
            
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            
            if BuildingName:
                Building_instance = Building_Master_Detials.objects.get(Building_Id = BuildingName)
                
            if BlockName:
                Block_instance = Block_Master_Detials.objects.get(Block_Id = BlockName)
                
            if FloorName:
                Floor_instance = Floor_Master_Detials.objects.get(Floor_Id = BlockName)
                
            if WardName:
                Ward_instance = WardType_Master_Detials.objects.get(Ward_Id = WardName)
                
            Total_Current_Charge=0
            if GST_val !='Nill':
                Total_Current_Charge=  RoomCharge + ((RoomCharge * int(GST_val)) / 100) 
            else:
                Total_Current_Charge=RoomCharge
                
            if RoomId:
                if Statusedit:
                   
                    Room_instance = RoomType_Master_Detials.objects.get(pk=RoomId)
                    
                    # Check if any Room_Master_Detials records have Booking_Status not equal to "Available"
                    non_available_status_exists = Room_Master_Detials.objects.filter(
                        Room_Name=Room_instance
                    ).exclude(Booking_Status='Available').exists()

                    if non_available_status_exists:
                        # Return a warning message if any Booking_Status is not "Available"
                        return JsonResponse({'warn': "Cannot change the status because some Booking_Status in Room_Master_Detials is not 'Available'."})
                    
                    # Check if all parent statuses are True
                    parent_statuses = []
                    
                    if not Room_instance.Building_Name.Status:
                        parent_statuses.append("Building Status")
                    
                    if not Room_instance.Block_Name.Status:
                        parent_statuses.append("Block Status")
                    
                    if not Room_instance.Floor_Name.Status:
                        parent_statuses.append("Floor Status")
                    
                    if not Room_instance.Ward_Name.Status:
                        parent_statuses.append("Ward Status")
                    
                    if parent_statuses:
                        # If any parent status is False, return a warning message
                        return JsonResponse({'warn': f"Cannot change the room status because the following parent statuses are not Active: {', '.join(parent_statuses)}."})
                    
                    # If all conditions are met, toggle the room status
                    Room_instance.Status = not Room_instance.Status
                    
                    # Update related Room_Master_Detials statuses
                    Room_Master_Detials.objects.filter(Room_Name=Room_instance).update(Status=Room_instance.Status)
                    
                    # Save the changes to the database
                    Room_instance.save()
                    
                    return JsonResponse({'success': "Room status updated successfully."})
        
                else:
                    if RoomType_Master_Detials.objects.filter(Room_Name=RoomName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance,Ward_Name=Ward_instance,Current_Charge=RoomCharge).exclude(pk = RoomId).exists():
                        return JsonResponse({'warn': f"The Room Detials are already present in the name of {WardName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name}"})
                    else:
                        RoomType_instance = RoomType_Master_Detials.objects.get(pk=RoomId)
                        RoomType_instance.Room_Name = RoomName
                        RoomType_instance.Ward_Name=Ward_instance
                        RoomType_instance.Floor_Name=Floor_instance
                        RoomType_instance.Block_Name=Block_instance
                        RoomType_instance.Building_Name = Building_instance
                        RoomType_instance.Location_Name=Location_instance
                        RoomType_instance.Prev_Charge = RoomType_instance.Current_Charge
                        RoomType_instance.Current_Charge = RoomCharge
                        RoomType_instance.GST_Charge = GST_val
                        RoomType_instance.Total_Prev_Charge = RoomType_instance.Total_Current_Charge
                        RoomType_instance.Total_Current_Charge = Total_Current_Charge
                        
                        RoomType_instance.save()
                        

                return JsonResponse({'success': 'Room Detials Updated successfully'})
            else:
                if RoomType_Master_Detials.objects.filter(Room_Name=RoomName, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance,Ward_Name=Ward_instance).exists():
                        return JsonResponse({'warn': f"The Room Detials are already present in the name of {WardName} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name}"})
                else:
                    RoomType_instance = RoomType_Master_Detials(
                        Ward_Name=Ward_instance,
                        Floor_Name=Floor_instance,
                        Block_Name=Block_instance,
                        Building_Name = Building_instance,
                        Location_Name=Location_instance,
                        Room_Name=RoomName,
                        Current_Charge=RoomCharge,
                        GST_Charge=GST_val,
                        Total_Current_Charge=Total_Current_Charge,
                        created_by=created_by
                    )
                    RoomType_instance.save()
                    return JsonResponse({'success': 'Room Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            RoomType_Master = RoomType_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            RoomType_Master_data = []
            for Roomtype in RoomType_Master:
                Roomtype_dict = {
                    'id': Roomtype.Room_Id,
                    'RoomName': Roomtype.Room_Name,
                    'Prev_Charge': Roomtype.Prev_Charge,
                    'Current_Charge': Roomtype.Current_Charge,
                    'GST_val': Roomtype.GST_Charge,
                    'Total_Prev_Charge': Roomtype.Total_Prev_Charge,
                    'Total_Current_Charge': Roomtype.Total_Current_Charge,
                    'WardId': Roomtype.Ward_Name.Ward_Id,
                    'WardName': Roomtype.Ward_Name.Ward_Name,
                    'FloorId': Roomtype.Floor_Name.Floor_Id,
                    'FloorName': Roomtype.Floor_Name.Floor_Name,
                    'BlockId': Roomtype.Block_Name.Block_Id,
                    'BlockName': Roomtype.Block_Name.Block_Name,
                    'BuildingId': Roomtype.Building_Name.Building_Id,
                    'BuildingName': Roomtype.Building_Name.Building_Name,
                    'Location_Name': Roomtype.Location_Name.Location_Name,
                    'Location_Id': Roomtype.Location_Name.Location_Id,
                    'Status': 'Active' if Roomtype.Status else 'Inactive',
                    'created_by': Roomtype.created_by,
                    
                }
                RoomType_Master_data.append(Roomtype_dict)

            return JsonResponse(RoomType_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_RoomType_Data_by_Building_block_Floor_ward_loc(request):
    try:
        Ward=request.GET.get('Ward')
        RegisterType=request.GET.get('RegisterType')
        
        if not Ward:
            return JsonResponse({'error':'Ward are required'})
        

        Ward_ins= WardType_Master_Detials.objects.get(Ward_Id=Ward)
        
        if not RoomType_Master_Detials.objects.filter(Status=True,Building_Name=Ward_ins.Building_Name,Block_Name=Ward_ins.Block_Name,Floor_Name=Ward_ins.Floor_Name,Ward_Name=Ward_ins,Location_Name=Ward_ins.Location_Name).exists():
            return JsonResponse({'error':'Data not found'})
        
        # Fetch all records from the LocationName model
        RoomType_Master = RoomType_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Ward_ins.Building_Name,
            Block_Name=Ward_ins.Block_Name,
            Floor_Name=Ward_ins.Floor_Name,
            Ward_Name=Ward_ins,
            Location_Name=Ward_ins.Location_Name
            )
        
 
        # Construct a list of dictionaries containing location data
        RoomType_Master_data = []
        for RoomType in RoomType_Master:
            Floor_dict = {
                'id': RoomType.Room_Id,
                'RoomName': RoomType.Room_Name, 
                'BedCharge': RoomType.Current_Charge, 
                'GST': RoomType.GST_Charge, 
                'TotalCharge': RoomType.Total_Current_Charge, 
            }
            RoomType_Master_data.append(Floor_dict)

        return JsonResponse(RoomType_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



# room master master


@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Room_Master_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data,'dataaa')
            # Extract and validate data
            RoomMasterId = data.get('RoomMasterId','')
            RoomNo = data.get('RoomNo')
            BedNo = data.get('BedNo')
            RoomName = data.get('RoomName')
            WardName = data.get('WardName','')
            FloorName = data.get('FloorName','')
            BlockName = data.get('BlockName','')
            BuildingName = data.get('BuildingName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            
            Location_instance=None
            Building_instance=None
            Block_instance=None
            Floor_instance=None
            Ward_instance=None
            room_instance=None
            
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            
            if BuildingName:
                Building_instance = Building_Master_Detials.objects.get(Building_Id = BuildingName)
                
            if BlockName:
                Block_instance = Block_Master_Detials.objects.get(Block_Id = BlockName)
                
            if FloorName:
                Floor_instance = Floor_Master_Detials.objects.get(Floor_Id = BlockName)
                
            if WardName:
                Ward_instance = WardType_Master_Detials.objects.get(Ward_Id = WardName)
                
            if RoomName:
                room_instance = RoomType_Master_Detials.objects.get(Room_Id = RoomName)
                
            
            if RoomMasterId:
                if Statusedit:
                    Room_master_instance = Room_Master_Detials.objects.get(pk=RoomMasterId)
    
                    # Check if any Booking_Status in this room is not 'Available'
                    if Room_master_instance.Booking_Status != 'Available':
                        return JsonResponse({'warn': "Cannot change the status because the Booking_Status in Room_Master_Detials is not 'Available'."})
                    
                    # Check if all parent statuses are True
                    parent_statuses = []
                    
                    if not Room_master_instance.Building_Name.Status:
                        parent_statuses.append("Building Status")
                    
                    if not Room_master_instance.Block_Name.Status:
                        parent_statuses.append("Block Status")
                    
                    if not Room_master_instance.Floor_Name.Status:
                        parent_statuses.append("Floor Status")
                    
                    if not Room_master_instance.Ward_Name.Status:
                        parent_statuses.append("Ward Status")
                    
                    if parent_statuses:
                        return JsonResponse({'warn': f"Cannot change the room status because the following parent statuses are not Active: {', '.join(parent_statuses)}."})
                    
                    # Toggle the status
                    Room_master_instance.Status = not Room_master_instance.Status
                    
                    # Save the changes to the database
                    Room_master_instance.save()
                    
                    return JsonResponse({'success': "Room status updated successfully."})
                else:
                    if Room_Master_Detials.objects.filter(Room_No=RoomNo,Bed_No=BedNo, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance).exclude(pk = RoomMasterId).exists():
                        return JsonResponse({'warn': f"The Room Master Detials are already present in the name of {RoomNo} and {BedNo} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name} and {room_instance.Room_Name}"})
                    else:
                        Room_master_instance = Room_Master_Detials.objects.get(pk=RoomMasterId)
                        Room_master_instance.Room_No = RoomNo
                        Room_master_instance.Bed_No = BedNo
                        Room_master_instance.Room_Name = room_instance
                        Room_master_instance.Ward_Name=Ward_instance
                        Room_master_instance.Floor_Name=Floor_instance
                        Room_master_instance.Block_Name=Block_instance
                        Room_master_instance.Building_Name = Building_instance
                        Room_master_instance.Location_Name=Location_instance
                        
                        Room_master_instance.save()
                        

                return JsonResponse({'success': 'Room Master Detials Updated successfully'})
            else:
                if Room_Master_Detials.objects.filter(Room_No=RoomNo,Bed_No=BedNo, Location_Name=Location_instance,Building_Name = Building_instance ,Block_Name=Block_instance,Floor_Name=Floor_instance).exists():
                    return JsonResponse({'warn': f"The Room Master Detials are already present in the name of {RoomNo} and {BedNo} and {Location_instance.Location_Name} and {Building_instance.Building_Name} and {Block_instance.Block_Name} and {Floor_instance.Floor_Name} and {room_instance.Room_Name}"})
                else:
                    Room_master_instance = Room_Master_Detials(
                        Room_No=RoomNo,
                        Bed_No=BedNo,
                        Room_Name=room_instance,
                        Ward_Name=Ward_instance,
                        Floor_Name=Floor_instance,
                        Block_Name=Block_instance,
                        Building_Name = Building_instance,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                    Room_master_instance.save()
                    return JsonResponse({'success': 'Room Master Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Room_master_instance = Room_Master_Detials.objects.all().order_by(
                '-Location_Name__Location_Name',
                '-Building_Name__Building_Name',
                '-Block_Name__Block_Name',
                '-Floor_Name__Floor_Name',
                '-Ward_Name__Ward_Name',
                '-Room_Name__Room_Name',
                '-Room_No',
                'Bed_No',
                )
            
            # Construct a list of dictionaries containing location data
            Room_Master_data = []
            for Roommaster in Room_master_instance:
                RoomMaster_dict = {
                    'id': Roommaster.Room_Id,
                    'RoomNo': Roommaster.Room_No,
                    'BedNo': Roommaster.Bed_No,
                    'RoomId': Roommaster.Room_Name.Room_Id,
                    'RoomName': Roommaster.Room_Name.Room_Name,
                    'BedCharge': Roommaster.Room_Name.Current_Charge,
                    'GST': Roommaster.Room_Name.GST_Charge,
                    'TotalCharge': Roommaster.Room_Name.Total_Current_Charge,
                    'WardId': Roommaster.Ward_Name.Ward_Id,
                    'WardName': Roommaster.Ward_Name.Ward_Name,
                    'FloorId': Roommaster.Floor_Name.Floor_Id,
                    'FloorName': Roommaster.Floor_Name.Floor_Name,
                    'BlockId': Roommaster.Block_Name.Block_Id,
                    'BlockName': Roommaster.Block_Name.Block_Name,
                    'BuildingId': Roommaster.Building_Name.Building_Id,
                    'BuildingName': Roommaster.Building_Name.Building_Name,
                    'LocationName': Roommaster.Location_Name.Location_Name,
                    'LocationId': Roommaster.Location_Name.Location_Id,
                    'Status': 'Active' if Roommaster.Status else 'Inactive',
                    'created_by': Roommaster.created_by,
                    
                }
                Room_Master_data.append(RoomMaster_dict)

            return JsonResponse(Room_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





def get_RoomNo_Data_by_Building_block_Floor_ward_Room_loc(request):
    try:
        Room = request.GET.get('Room')
        Room_ins =None
        if not Room:
            return JsonResponse({'error':'Room are required'})
        
        Room_ins = RoomType_Master_Detials.objects.get(Room_Id=Room)
        
        if not Room_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Room_ins.Building_Name,
            Block_Name=Room_ins.Block_Name,
            Floor_Name=Room_ins.Floor_Name,
            Ward_Name=Room_ins.Ward_Name,
            Location_Name=Room_ins.Location_Name,
            Room_Name=Room_ins
        ).exists():
            return JsonResponse({'error':'Data not found'})
        
        
        # Fetch all records from the Room_Master_Detials model
        RoomType_Master = Room_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Room_ins.Building_Name,
            Block_Name=Room_ins.Block_Name,
            Floor_Name=Room_ins.Floor_Name,
            Ward_Name=Room_ins.Ward_Name,
            Location_Name=Room_ins.Location_Name,
            Room_Name=Room_ins
        ).values('Room_No').distinct()  # Ensure distinct room numbers

        # Construct a list of dictionaries containing location data
        RoomType_Master_data = []
        index = 0
        for room in RoomType_Master:
            room_dict = {
                'id': index + 1,
                'RoomNo': room['Room_No'], 
            }
            RoomType_Master_data.append(room_dict)
            index += 1

        return JsonResponse(RoomType_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)





def get_BedNo_Data_by_Building_block_Floor_ward_RoomNo_loc(request):
    try:
        Room = request.GET.get('Room')
        RoomNo = request.GET.get('RoomNo')
        
        Room_ins =None
        if not Room and not RoomNo:
            return JsonResponse({'error':'Room are required'})
        
        Room_ins = RoomType_Master_Detials.objects.get(Room_Id=Room)
        
        if not Room_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Room_ins.Building_Name,
            Block_Name=Room_ins.Block_Name,
            Floor_Name=Room_ins.Floor_Name,
            Ward_Name=Room_ins.Ward_Name,
            Location_Name=Room_ins.Location_Name,
            Room_Name=Room_ins,
            Room_No=RoomNo
        ).exists():
            return JsonResponse({'error':'Data not found'})
        
        
        # Fetch all records from the Room_Master_Detials model
        RoomType_Master = Room_Master_Detials.objects.filter(
            Status=True,
            Building_Name=Room_ins.Building_Name,
            Block_Name=Room_ins.Block_Name,
            Floor_Name=Room_ins.Floor_Name,
            Ward_Name=Room_ins.Ward_Name,
            Location_Name=Room_ins.Location_Name,
            Room_Name=Room_ins,
            Room_No=RoomNo,
        ).exclude(Booking_Status = 'Occupied') 
        print('RoomType_Master',RoomType_Master)
       
        RoomType_Master_data = []
        index = 0
        for room in RoomType_Master:
            room_dict = {
                'id': index + 1,
                'BedNo': room.Bed_No, 
                'RoomId':room.Room_Id
            }
            RoomType_Master_data.append(room_dict)
            index += 1

        return JsonResponse(RoomType_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_Room_Master_Data(request):
    try:
        Location = request.GET.get('location')
        status = request.GET.get('status')
        wardtype = request.GET.get('wardtype')
        
        if not Location or not status:
            return JsonResponse({'error': 'Location and status parameter is missing'}, status=400)
        
        Room_master_instances=None
        if status=='Total':
            Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location).order_by('Booking_Status','-Status')
            if wardtype :
                ward, room = wardtype.split(" - ")
                Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location,Ward_Name__Ward_Name=ward,Room_Name__Room_Name=room).order_by('Booking_Status','-Status')
            
        elif status=='InActive':
            Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location,Status=False)
            if wardtype :
                ward, room = wardtype.split(" - ")
                Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location,Ward_Name__Ward_Name=ward,Room_Name__Room_Name=room,Status=False)
            
        else:
            Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location,Status=True,Booking_Status=status)
            if wardtype :
                ward, room = wardtype.split(" - ")
                print( ward, room)
                Room_master_instances = Room_Master_Detials.objects.filter(Location_Name__pk=Location,Ward_Name__Ward_Name=ward,Room_Name__Room_Name=room,Status=True,Booking_Status=status)
            
            
        Room_Master_data = []
        if Room_master_instances:
            for Roommaster in Room_master_instances:
                admission_details = None
                if  Roommaster.Booking_Status in  ['Booked','Occupied','Requested'] :
                  admission_details = Patient_Admission_Room_Detials.objects.filter(
                        RoomId__pk=Roommaster.pk
                    ).filter(
                        Q(IP_Registration_Id__Booking_Status=Roommaster.Booking_Status) if Patient_Admission_Room_Detials.objects.filter(RoomId=Roommaster).values_list('RegisterType', flat=True).order_by('-created_by').first() == 'IP' 
                        else Q(Casuality_Registration_Id__Booking_Status=Roommaster.Booking_Status)
                    ).order_by('-created_by').first()
                    
                patient_data = {}
                if admission_details:
                    if admission_details.IP_Registration_Id:
                        dat = admission_details.IP_Registration_Id
                        # Dynamically determine the correct field to filter by based on the registration type
                        if admission_details.RegisterType == 'IP':
                            admiss_Det = get_object_or_404(Patient_Admission_Detials, IP_Registration_Id=dat)
                       
                        patient_data['IsCasualityPatient'] = admiss_Det.IsCasualityPatient
                        patient_data['Casuality_Registration_Id'] = admiss_Det.Casuality_Registration_Id
                        patient_data['AdmissionPurpose'] = admiss_Det.AdmissionPurpose
                        patient_data['Admitdate'] = admission_details.Admitted_Date
                        patient_data['PatientID'] = dat.PatientId.PatientId if dat.PatientId else None
                        patient_data['Age'] = dat.PatientId.Age if dat.PatientId else None
                        patient_data['PhoneNo'] = dat.PatientId.PhoneNo if dat.PatientId else None
                        patient_data['attenders'] = admiss_Det.NextToKinName
                        patient_data['attenderPhoneNo'] = admiss_Det.RelativePhoneNo
                        patient_data['PatientName'] = f"{dat.PatientId.Title}.{dat.PatientId.FirstName} {dat.PatientId.MiddleName} {dat.PatientId.SurName}" if dat.PatientId else None
                    

                RoomMaster_dict = {
                    'id': Roommaster.Room_Id,
                    'RoomNo': Roommaster.Room_No,
                    'BedNo': Roommaster.Bed_No,
                    'RoomId': Roommaster.Room_Name.Room_Id,
                    'RoomName': Roommaster.Room_Name.Room_Name,
                    'BedCharge': Roommaster.Room_Name.Current_Charge,
                    'GST': Roommaster.Room_Name.GST_Charge,
                    'TotalCharge': Roommaster.Room_Name.Total_Current_Charge,
                    'WardId': Roommaster.Ward_Name.Ward_Id,
                    'WardName': Roommaster.Ward_Name.Ward_Name,
                    'FloorId': Roommaster.Floor_Name.Floor_Id,
                    'FloorName': Roommaster.Floor_Name.Floor_Name,
                    'BlockId': Roommaster.Block_Name.Block_Id,
                    'BlockName': Roommaster.Block_Name.Block_Name,
                    'BuildingId': Roommaster.Building_Name.Building_Id,
                    'BuildingName': Roommaster.Building_Name.Building_Name,
                    'LocationName': Roommaster.Location_Name.Location_Name,
                    'LocationId': Roommaster.Location_Name.Location_Id,
                    'Status': 'Active' if Roommaster.Status else 'Inactive',
                    'BookingStatus': Roommaster.Booking_Status,
                    'created_by': Roommaster.created_by,
                }

                RoomMaster_dict.update(patient_data)
                Room_Master_data.append(RoomMaster_dict)

        return JsonResponse(Room_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
def get_room_count_data_total(request):
    try:
        if request.method == 'GET':
            location = request.GET.get('Location')
            
            if not location:
                return JsonResponse({'error': 'Location is required'}, status=400)
            
            # Default statuses
            default_statuses = ['Available','Requested', 'Booked', 'Occupied', 'Maintenance']
            
            # Initialize a dictionary to hold the total counts and room data
            formatted_data = {
                'totalcount': {
                    'Total': 0,
                    'InActive': 0,
                    **{status: 0 for status in default_statuses}
                },
                'totaldata': []
            }
            
            # Query to get distinct Ward_Type and Room_name
            distinct_ward_rooms = Room_Master_Detials.objects.filter(Location_Name__pk=location).values('Ward_Name__Ward_Name', 'Room_Name__Room_Name').distinct()
            index = 1
            for ward_room in distinct_ward_rooms:
                room_name = f"{ward_room['Ward_Name__Ward_Name']} - {ward_room['Room_Name__Room_Name']}"
                
                # Total count for the room
                total_count = Room_Master_Detials.objects.filter(
                    Location_Name__pk=location,
                    Ward_Name__Ward_Name=ward_room['Ward_Name__Ward_Name'],
                    Room_Name__Room_Name=ward_room['Room_Name__Room_Name'],
                  
                ).count()
                total_inactive_count = Room_Master_Detials.objects.filter(
                    Location_Name__pk=location,
                    Ward_Name__Ward_Name=ward_room['Ward_Name__Ward_Name'],
                    Room_Name__Room_Name=ward_room['Room_Name__Room_Name'],
                    Status=False
                ).count()

                # Initialize room data with default statuses
                room_data = {
                    "id": index,
                    "roomname": room_name,
                    "Total": total_count,
                    'InActive': total_inactive_count,
                    **{status: 0 for status in default_statuses}  # Initialize default statuses
                }

                # Count occurrences of each status for the room
                for status in default_statuses:
                    count_status = Room_Master_Detials.objects.filter(
                        Location_Name__pk=location,
                        Ward_Name__Ward_Name=ward_room['Ward_Name__Ward_Name'],
                        Room_Name__Room_Name=ward_room['Room_Name__Room_Name'],
                        Booking_Status=status,
                        Status=True
                    ).count()
                    room_data[status] = count_status
                    
                    # Update the total counts for the entire location
                    formatted_data['totalcount'][status] += count_status

                # Append the total count for the room to the overall total count
                formatted_data['totalcount']['Total'] += total_count
                formatted_data['totalcount']['InActive'] += total_inactive_count

                # Append formatted room data to the list
                formatted_data['totaldata'].append(room_data)
                index += 1

            return JsonResponse(formatted_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)




def get_Room_Master_Data_for_registration(request):
    try:
        Location = request.GET.get('location')
        RegisterType = request.GET.get('RegisterType')
        Building = request.GET.get('Building')
        Block = request.GET.get('Block',"")
        Floor = request.GET.get('Floor',"")
        Ward = request.GET.get('Ward',"")
        Room = request.GET.get('Room',"")
        
        
        filter_kwargs = {
            'Location_Name__pk': Location,
            'Status': True,
            'Booking_Status': 'Available',
        }

        # Add the non-empty fields to the filter kwargs
        if Building:
            filter_kwargs['Building_Name__pk'] = Building
        if Block:
            filter_kwargs['Block_Name__pk'] = Block
        if Floor:
            filter_kwargs['Floor_Name__pk'] = Floor
        if Ward:
            filter_kwargs['Ward_Name__pk'] = Ward
        if Room:
            filter_kwargs['Room_Name__pk'] = Room
        if RegisterType == 'Casuality':
            filter_kwargs['Ward_Name__Ward_Name'] = 'CASUALITY'
        Room_master_instances = None

        if RegisterType == 'IP':
            Room_master_instances = Room_Master_Detials.objects.filter(**filter_kwargs).exclude(Ward_Name__Ward_Name__in=['CASUALITY', 'OT'])
        else:
            Room_master_instances = Room_Master_Detials.objects.filter(**filter_kwargs)
            
            
        Room_Master_data = []
        
        if Room_master_instances:
            for Roommaster in Room_master_instances:
                

                RoomMaster_dict = {
                    'id': Roommaster.Room_Id,
                    'RoomNo': Roommaster.Room_No,
                    'BedNo': Roommaster.Bed_No,
                    'RoomId': Roommaster.Room_Name.Room_Id,
                    'RoomName': Roommaster.Room_Name.Room_Name,
                    'BedCharge': Roommaster.Room_Name.Current_Charge,
                    'GST': Roommaster.Room_Name.GST_Charge,
                    'TotalCharge': Roommaster.Room_Name.Total_Current_Charge,
                    'WardId': Roommaster.Ward_Name.Ward_Id,
                    'WardName': Roommaster.Ward_Name.Ward_Name,
                    'FloorId': Roommaster.Floor_Name.Floor_Id,
                    'FloorName': Roommaster.Floor_Name.Floor_Name,
                    'BlockId': Roommaster.Block_Name.Block_Id,
                    'BlockName': Roommaster.Block_Name.Block_Name,
                    'BuildingId': Roommaster.Building_Name.Building_Id,
                    'BuildingName': Roommaster.Building_Name.Building_Name,
                    'LocationName': Roommaster.Location_Name.Location_Name,
                    'LocationId': Roommaster.Location_Name.Location_Id,
                    'Status': 'Active' if Roommaster.Status else 'Inactive',
                    'BookingStatus': Roommaster.Booking_Status,
                    'created_by': Roommaster.created_by,
                }

              
                Room_Master_data.append(RoomMaster_dict)

        return JsonResponse(Room_Master_data, safe=False)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



def get_filter_Data_for_registration(request):
    try:
        Location = request.GET.get('location')
        RegisterType = request.GET.get('RegisterType')
        
        data={
            'Building':[],
            'Block':[],
            'Floor':[],
            'Ward':[],
            'Room':[],
        }
        for buil in Building_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True):
            data['Building'].append({'id':buil.pk,'Name':buil.Building_Name})
        for block in Block_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True):
            data['Block'].append({'id':block.pk,'Name':block.Block_Name})
        for floor in Floor_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True):
            data['Floor'].append({'id':floor.pk,'Name':floor.Floor_Name})
        
        if RegisterType=='IP':
            for ward in WardType_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True).exclude(Ward_Name__in=['CASUALITY', 'OT']):
                data['Ward'].append({'id':ward.pk,'Name':ward.Ward_Name})
            for room in RoomType_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True).exclude(Ward_Name__Ward_Name__in=['CASUALITY', 'OT']):
                data['Room'].append({'id':room.pk,'Name':room.Room_Name})
        else:
            for ward in WardType_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True,Ward_Name='CASUALITY'):
                data['Ward'].append({'id':ward.pk,'Name':ward.Ward_Name})
            for room in RoomType_Master_Detials.objects.filter(Location_Name__pk = Location ,Status=True,Ward_Name__Ward_Name='CASUALITY'):
                data['Room'].append({'id':room.pk,'Name':room.Room_Name})

      
        return JsonResponse(data)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)





