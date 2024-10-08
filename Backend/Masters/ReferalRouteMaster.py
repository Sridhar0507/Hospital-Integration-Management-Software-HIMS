from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.db.models import Q

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Route_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            RouteId = data.get('RouteId','')
            RouteNo = data.get('RouteNo','')
            RouteName = data.get('RouteName','')
            TahsilName = data.get('TahsilName','')
            VillageName = data.get('VillageName','')
            Location = data.get('Location','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by', '')
            if Location:
                location_instance = Location_Detials.objects.get(Location_Id = Location)
      
            if RouteId:
                if  Statusedit:
                    Route_instance = Route_Master_Detials.objects.get(pk=RouteId)
                    
                    Route_instance.Status = not Route_instance.Status
                    Route_instance.save()
                else:
                    if Route_Master_Detials.objects.filter(
                        Q(Route_No=RouteNo) & Q(location=location_instance) & ~Q(Route_Name=RouteName),
                    
                    ).exists():
                        return JsonResponse({'warn': f"A different RouteName already exists for RouteNo - {RouteNo} in same Location."})
                    
                    # Check if any exact route details already exist with the same RouteNo, RouteName, and Location
                    if Route_Master_Detials.objects.filter(
                        Q(Route_No=RouteNo) | Q(Route_Name=RouteName) & Q(location=location_instance),        
                        Teshil_Name=TahsilName,
                        Village_Name=VillageName,
                    ).exists():
                        return JsonResponse({'warn': f"A same Tahsil and Village Name "})
                        
                    Route_instance = Route_Master_Detials.objects.get(pk=RouteId)
                    Route_instance.Route_No = RouteNo
                    Route_instance.Route_Name = RouteName
                    Route_instance.Teshil_Name = TahsilName
                    Route_instance.Village_Name = VillageName
                    Route_instance.location = location_instance
                    Route_instance.save()
                return JsonResponse({'success': 'Route Details Updated successfully'})
            else:
               # Check if a route with the same RouteNo already exists for the given location but with a different RouteName
                if Route_Master_Detials.objects.filter(
                    Q(Route_No=RouteNo) & Q(location=location_instance) & ~Q(Route_Name=RouteName),
                    
                ).exists():
                    return JsonResponse({'warn': f"A different RouteName already exists for RouteNo - {RouteNo} in same Location."})
                
                 # Check if any exact route details already exist with the same RouteNo, RouteName, and Location
                if Route_Master_Detials.objects.filter(
                    Q(Route_No=RouteNo) | Q(Route_Name=RouteName) & Q(location=location_instance),        
                    Teshil_Name=TahsilName,
                    Village_Name=VillageName,
                ).exists():
                    return JsonResponse({'warn': f"A same Tahsil and Village Name "})
                    
                
                else:
                    Route_instance = Route_Master_Detials(
                        Route_No=RouteNo,
                        Route_Name=RouteName,
                        Teshil_Name=TahsilName,
                        Village_Name=VillageName,
                        location=location_instance,
                        created_by=created_by
                    )
                    Route_instance.save()
                    return JsonResponse({'success': 'Route Details added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the Route_Master_Detials model
            Route_Master = Route_Master_Detials.objects.all()
            
            # Construct a list of dictionaries containing route data
            Route_Master_data = []
            for route in Route_Master:
                route_dict = {
                    'id': route.Route_Id,
                    'RouteNo': route.Route_No,
                    'RouteName': route.Route_Name,
                    'TahsilName': route.Teshil_Name,
                    'VillageName': route.Village_Name,
                    'LocationId': route.location.Location_Id,
                    'LocationName': route.location.Location_Name,
                    'Status': 'Active' if route.Status else 'Inactive',
                    'CreatedBy': route.created_by,
                }
                Route_Master_data.append(route_dict)

            return JsonResponse(Route_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
