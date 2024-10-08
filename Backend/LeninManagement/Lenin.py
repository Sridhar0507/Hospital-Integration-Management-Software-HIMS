import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from Masters.models import *
from django.db.models import Q





@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Lenin_Catg_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            catgId = data.get('catgId', '')
            LeninCategory = data.get('LeninCategory', '')
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            if catgId:
                try:
                    Lenin_instance = Lenin_Catg_Master_Details.objects.get(pk=catgId)
                    if Statusedit:
                        Lenin_instance.Status = not Lenin_instance.Status
                    else:
                        if Lenin_Catg_Master_Details.objects.filter(LeninCategory=LeninCategory ).exists():
                            return JsonResponse({'warn': 'The catgId, LeninCategory are already present.'})
                        Lenin_instance.LeninCategory = LeninCategory
                    Lenin_instance.save()
                    return JsonResponse({'success': 'Lenin Catg Details Updated successfully'})
                except Lenin_Catg_Master_Details.DoesNotExist:
                    return JsonResponse({'error': 'Lenin Catg Details not found'}, status=404)
            else:
                if Lenin_Catg_Master_Details.objects.filter(LeninCategory=LeninCategory).exists():
                    return JsonResponse({'warn': 'The Lenin Catg Details are already present.'})
                Lenin_instance = Lenin_Catg_Master_Details(LeninCategory=LeninCategory, created_by=created_by)
                Lenin_instance.save()
                return JsonResponse({'success': 'Lenin Catg Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            Lenin_Master = Lenin_Catg_Master_Details.objects.all()
            Lenin_Master_data = [
                {
                    'catgId': Lenin.catgId,
                    'LeninCategory': Lenin.LeninCategory,
                    'Status': 'Active' if Lenin.Status else 'Inactive',
                    'created_by': Lenin.created_by,
                }
                for Lenin in Lenin_Master
            ]
            return JsonResponse(Lenin_Master_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def LeninMaster_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            LeninCode = data.get('LeninCode', '')
            LeninCategory_id = data.get('LeninCategory', '')  # Use a distinct name to avoid confusion
            LeninType = data.get('LeninType', '')
            LeninSize = data.get('LeninSize', '')
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            print(data,'data')


            if LeninCategory_id:
                try:
                    LeninCategory_instance = Lenin_Catg_Master_Details.objects.get(pk=LeninCategory_id)
                except Lenin_Catg_Master_Details.DoesNotExist:
                    return JsonResponse({'error': 'Lenin Category not found'}, status=404)

            if LeninCode:
                try:
                    Lenin_instance = LeninMaster_Details.objects.get(pk=LeninCode)
                    if Statusedit:
                        Lenin_instance.Status = not Lenin_instance.Status
                    else:
                        if LeninMaster_Details.objects.filter(LeninCategory=LeninCategory_instance, LeninType=LeninType, LeninSize=LeninSize).exists():
                            return JsonResponse({'warn': 'The LeninCode, LeninCategory, LeninType, LeninSize are already present.'})
                        Lenin_instance.LeninCategory = LeninCategory_instance
                        Lenin_instance.LeninType = LeninType
                        Lenin_instance.LeninSize = LeninSize
                    Lenin_instance.save()
                    return JsonResponse({'success': 'Lenin Details Updated successfully'})
                except LeninMaster_Details.DoesNotExist:
                    return JsonResponse({'error': 'Lenin Details not found'}, status=404)
            else:
                if LeninMaster_Details.objects.filter(LeninCategory=LeninCategory_instance, LeninType=LeninType, LeninSize=LeninSize).exists():
                    return JsonResponse({'warn': 'The Lenin Details are already present.'})
                Lenin_instance = LeninMaster_Details(LeninCategory=LeninCategory_instance, LeninType=LeninType, LeninSize=LeninSize, created_by=created_by)
                Lenin_instance.save()
                return JsonResponse({'success': 'Lenin Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            Lenin_Master = LeninMaster_Details.objects.all()
            Lenin_Master_data = [
                {
                    'LeninCode': Lenin.LeninCode,
                    'CatgId': Lenin.LeninCategory.pk,
                    'LeninCategory': Lenin.LeninCategory.LeninCategory,
                    'LeninType': Lenin.LeninType,
                    'LeninSize': Lenin.LeninSize,
                    'Status': 'Active' if Lenin.Status else 'Inactive',
                    'created_by': Lenin.created_by,
                }
                for Lenin in Lenin_Master
            ]
            return JsonResponse(Lenin_Master_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)




@csrf_exempt
@require_http_methods(["POST", "GET"])
def Lenin_MinMax_Master_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Id = data.get('Id', '')
            Location = data.get('Location', '')
            Department = data.get('Department', '')
            LeninCategory = data.get('LeninCategory', '')
            LeninType = data.get('LeninType', '')
            PrevMin = data.get('PrevMin', 0)
            CurrMin = data.get('Min', 0)
            PrevMax = data.get('PrevMax', 0)
            CurrMax = data.get('Max', 0)
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            # Fetch related instances
            Location_instance = Location_Detials.objects.get(pk=Location) if Location else None
            Department_instance = Department_Detials.objects.get(pk=Department) if Department else None
            LeninType_instance = LeninMaster_Details.objects.get(pk=LeninType) if LeninType else None
            LeninCategory_instance = Lenin_Catg_Master_Details.objects.get(pk=LeninCategory) if LeninCategory else None

            if Id:
                try:
                    Lenin_instance = Dept_Wise_Lenin_min_max_Details.objects.get(pk=Id)
                    if Statusedit:
                        Lenin_instance.Status = not Lenin_instance.Status
                        Lenin_instance.save()
                        return JsonResponse({'success': 'Lenin status updated successfully'})
                    
                    # Check for existing entries with the same LeninType
                    if Dept_Wise_Lenin_min_max_Details.objects.filter(
                        Q(Location=Location_instance) &
                        Q(Department=Department_instance) &
                        Q(LeninCategory=LeninCategory_instance) &
                        Q(LeninType=LeninType_instance)
                    ).exclude(pk=Id).exists():
                        return JsonResponse({'warn': 'The same LeninType already exists.'})
                    
                    # Update the existing entry
                    Lenin_instance.Location = Location_instance
                    Lenin_instance.Department = Department_instance
                    Lenin_instance.LeninCategory = LeninCategory_instance
                    Lenin_instance.LeninType = LeninType_instance
                    Lenin_instance.Prev_Minimum_count = Lenin_instance.Curr_Minimum_count
                    Lenin_instance.Curr_Minimum_count = CurrMin
                    Lenin_instance.Prev_Maximum_count = Lenin_instance.Curr_Maximum_count
                    Lenin_instance.Curr_Maximum_count = CurrMax
                    Lenin_instance.save()
                    return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details updated successfully'})
                except Dept_Wise_Lenin_min_max_Details.DoesNotExist:
                    return JsonResponse({'error': 'Lenin MinMax Details not found'})
            else:
                # Check for existing entries with the same LeninType
                if Dept_Wise_Lenin_min_max_Details.objects.filter(
                    Q(Location=Location_instance) &
                    Q(Department=Department_instance) &
                    Q(LeninCategory=LeninCategory_instance) &
                    Q(LeninType=LeninType_instance)
                ).exists():
                    return JsonResponse({'warn': 'The same LeninType already exists.'})

                # Create new entry
                Dept_Wise_Lenin_min_max_Details.objects.create(
                    Location=Location_instance,
                    Department=Department_instance,
                    LeninCategory=LeninCategory_instance,
                    LeninType=LeninType_instance,
                    Prev_Minimum_count=PrevMin or 0,
                    Curr_Minimum_count=CurrMin,
                    Prev_Maximum_count=PrevMax or 0,
                    Curr_Maximum_count=CurrMax,
                    created_by=created_by
                )
                return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    
    elif request.method == 'GET':
        try:
            Lenin_Master = Dept_Wise_Lenin_min_max_Details.objects.all()
            Lenin_Master_data = [
                {
                    'id': Lenin.Id,
                    'LocationId': Lenin.Location.pk,
                    'LocationName': Lenin.Location.Location_Name,
                    'DepartmentId': Lenin.Department.pk,
                    'DepartmentName': Lenin.Department.Department_Name,
                    'LeninTypeId': Lenin.LeninType.pk,
                    'catgId': Lenin.LeninCategory.pk,
                    'LeninCategory': Lenin.LeninCategory.LeninCategory,
                    'LeninType': Lenin.LeninType.LeninType,
                    'LeninSize': Lenin.LeninType.LeninSize,
                    'PrevMin': Lenin.Prev_Minimum_count,
                    'Min': Lenin.Curr_Minimum_count,
                    'PrevMax': Lenin.Prev_Maximum_count,
                    'Max': Lenin.Curr_Maximum_count,
                    'Status': 'Active' if Lenin.Status else 'Inactive',
                    'created_by': Lenin.created_by,
                }
                for Lenin in Lenin_Master
            ]
            return JsonResponse(Lenin_Master_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)


# @csrf_exempt
# @require_http_methods(["POST", "GET"])
# def Lenin_MinMax_Master_Detials_link(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             Id = data.get('Id', '')
#             Location = data.get('Location', '')
#             Department = data.get('Department', '')
#             LeninCategory = data.get('LeninCategory', '')
#             LeninType = data.get('LeninType', '')
#             PrevMin = data.get('PrevMin', 0)
#             CurrMin = data.get('Min', 0)
#             PrevMax = data.get('PrevMax', 0)
#             CurrMax = data.get('Max', 0)
#             Statusedit = data.get('Statusedit', False)
#             created_by = data.get('created_by', '')

#             # Fetch related instances
#             Location_instance = Location_Detials.objects.get(pk=Location) if Location else None
#             Department_instance = Department_Detials.objects.get(pk=Department) if Department else None
#             LeninType_instance = LeninMaster_Details.objects.get(pk=LeninType) if LeninType else None
#             LeninCategory_instance = Lenin_Catg_Master_Details.objects.get(pk=LeninCategory) if LeninCategory else None

#             if Id:
#                 try:
#                     Lenin_instance = Dept_Wise_Lenin_min_max_Details.objects.get(pk=Id)
#                     if Statusedit:
#                         Lenin_instance.Status = not Lenin_instance.Status
#                         Lenin_instance.save()
#                         return JsonResponse({'success': 'Lenin status updated successfully'})
                    
                    
#                     if Dept_Wise_Lenin_min_max_Details.objects.filter(
#                             Q(Location=Location_instance)&
#                             Q(Department=Department_instance)&
#                             Q(LeninCategory=LeninCategory_instance)&
#                             Q(LeninType=LeninType_instance)&
#                             ~Q(Curr_Minimum_count=CurrMin)&
#                             ~Q(Curr_Maximum_count=CurrMax),
#                     ).exclude(pk=Id).exists():
#                             return JsonResponse({'warn': 'The Location, Department, LeninCategory, LeninType, Min, and Max are already present.'})
                    
#                     Lenin_instance.Location = Location_instance
#                     Lenin_instance.Department = Department_instance
#                     Lenin_instance.LeninCategory = LeninCategory_instance
#                     Lenin_instance.LeninType = LeninType_instance
#                     Lenin_instance.Prev_Minimum_count = Lenin_instance.Curr_Minimum_count
#                     Lenin_instance.Curr_Minimum_count = CurrMin
#                     Lenin_instance.Prev_Maximum_count = Lenin_instance.Curr_Maximum_count
#                     Lenin_instance.Curr_Maximum_count = CurrMax
#                     Lenin_instance.save()
#                     return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details updated successfully'})
#                 except Dept_Wise_Lenin_min_max_Details.DoesNotExist:
#                     return JsonResponse({'error': 'Lenin MinMax Details not found'})
#             else:
#                 if Dept_Wise_Lenin_min_max_Details.objects.filter(
#                     Q(Location=Location_instance)&
#                     Q(Department=Department_instance)&
#                     Q(LeninCategory=LeninCategory_instance)&
#                     Q(LeninType=LeninType_instance)&
#                     ~Q(Curr_Minimum_count=CurrMin)&
#                     ~Q(Curr_Maximum_count=CurrMax),
                        
#                 ).exists():
#                     return JsonResponse({'warn': 'The Lenin Dept Wise Min and Max Details are already present.'})

#                 Dept_Wise_Lenin_min_max_Details.objects.create(
#                     Location=Location_instance,
#                     Department=Department_instance,
#                     LeninCategory=LeninCategory_instance,
#                     LeninType=LeninType_instance,
#                     Prev_Minimum_count=PrevMin or 0,
#                     Curr_Minimum_count=CurrMin,
#                     Prev_Maximum_count=PrevMax or 0,
#                     Curr_Maximum_count=CurrMax,
#                     created_by=created_by
#                 )
#                 return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details added successfully'})
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    
#     elif request.method == 'GET':
#         try:
#             Lenin_Master = Dept_Wise_Lenin_min_max_Details.objects.all()
#             Lenin_Master_data = [
#                 {
#                     'id': Lenin.Id,
#                     'LocationId': Lenin.Location.pk,
#                     'LocationName': Lenin.Location.Location_Name,
#                     'DepartmentId': Lenin.Department.pk,
#                     'DepartmentName': Lenin.Department.Department_Name,
#                     'LeninTypeId': Lenin.LeninType.pk,
#                     'CatgId': Lenin.LeninCategory.pk,
#                     'LeninCategory': Lenin.LeninCategory.LeninCategory,
#                     'LeninType': Lenin.LeninType.LeninType,
#                     'LeninSize': Lenin.LeninType.LeninSize,
#                     'PrevMin': Lenin.Prev_Minimum_count,
#                     'Min': Lenin.Curr_Minimum_count,
#                     'PrevMax': Lenin.Prev_Maximum_count,
#                     'Max': Lenin.Curr_Maximum_count,
#                     'Status': 'Active' if Lenin.Status else 'Inactive',
#                     'created_by': Lenin.created_by,
#                 }
#                 for Lenin in Lenin_Master
#             ]
#             return JsonResponse(Lenin_Master_data, safe=False)
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)



# @csrf_exempt
# @require_http_methods(["POST", "GET"])
# def Lenin_MinMax_Master_Detials_link(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print(data,'data')
#             Id = data.get('Id', '')
#             Location = data.get('Location', '')
#             Department = data.get('Department', '')
#             LeninCategory = data.get('LeninCategory', '')
#             LeninType = data.get('LeninType', '')
#             PrevMin = data.get('PrevMin', 0)
#             CurrMin = data.get('Min', 0)
#             PrevMax = data.get('PrevMax', 0)
#             CurrMax = data.get('Max', 0)
#             Statusedit = data.get('Statusedit', False)
#             created_by = data.get('created_by', '')

#             # Fetch related instances
#             Location_instance = Location_Detials.objects.get(pk=Location) if Location else None
#             Department_instance = Department_Detials.objects.get(pk=Department) if Department else None
#             LeninType_instance = LeninMaster_Details.objects.get(pk=LeninType) if LeninType else None
#             LeninCategory_instance = Lenin_Catg_Master_Details.objects.get(pk=LeninCategory) if LeninCategory else None

#             if Id:
#                 try:
#                     Lenin_instance = Dept_Wise_Lenin_min_max_Details.objects.get(pk=Id)
#                     if Statusedit:
#                         Lenin_instance.Status = not Lenin_instance.Status
#                     else:
#                         if Dept_Wise_Lenin_min_max_Details.objects.filter(
#                                 Location=Location_instance,
#                                 Department=Department_instance,
#                                 LeninCategory=LeninCategory_instance,
#                                 LeninType=LeninType_instance,
#                                 Curr_Minimum_count=CurrMin,
#                                 Curr_Maximum_count=CurrMax
#                             ).exists():
#                             return JsonResponse({'warn': 'The Location, Department, LeninCategory, LeninType, Min, and Max are already present.'})
#                         else:
#                             Lenin_instance.Location = Location_instance
#                             Lenin_instance.Department = Department_instance
#                             Lenin_instance.LeninCategory = LeninCategory_instance
#                             Lenin_instance.LeninType = LeninType_instance
#                             Lenin_instance.Prev_Minimum_count = Lenin_instance.Curr_Minimum_count
#                             Lenin_instance.Curr_Minimum_count = CurrMin
#                             Lenin_instance.Prev_Maximum_count = Lenin_instance.Curr_Maximum_count
#                             Lenin_instance.Curr_Maximum_count = CurrMax
#                     Lenin_instance.save()
#                     return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details updated successfully'})
#                 except Dept_Wise_Lenin_min_max_Details.DoesNotExist:
#                     return JsonResponse({'error': 'Lenin MinMax Details not found'})
#             else:
#                 if Dept_Wise_Lenin_min_max_Details.objects.filter(
#                         Q(Location=Location_instance) &
#                        Q(Department=Department_instance) &
#                         Q(LeninCategory=LeninCategory_instance) &
#                         ~Q(Curr_Minimum_count=CurrMin) &
#                         ~Q(Curr_Maximum_count=CurrMax)&
#                         ~Q(LeninType=LeninType_instance),

#                 ).exclude(Id=Id).exists():
#                     return JsonResponse({'warn': 'The Lenin Dept Wise Min and Max Details are already present.'})
#                 Dept_Wise_Lenin_min_max_Details.objects.create(
#                     Location=Location_instance,
#                     Department=Department_instance,
#                     LeninCategory=LeninCategory_instance,
#                     LeninType=LeninType_instance,
#                     Prev_Minimum_count=PrevMin or 0,
#                     Curr_Minimum_count=CurrMin,
#                     Prev_Maximum_count=PrevMax or 0,
#                     Curr_Maximum_count=CurrMax,
#                     created_by=created_by
#                 )
#                 return JsonResponse({'success': 'Lenin Dept Wise Min and Max Details added successfully'})
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)
    
#     elif request.method == 'GET':
#         try:
#             Lenin_Master = Dept_Wise_Lenin_min_max_Details.objects.all()
#             Lenin_Master_data = [
#                 {
#                     'id': Lenin.Id,
#                     'LocationId': Lenin.Location.pk,
#                     'LocationName': Lenin.Location.Location_Name,
#                     'DepartmentId': Lenin.Department.pk,
#                     'DepartmentName': Lenin.Department.Department_Name,
#                     'LeninTypeId': Lenin.LeninType.pk,
#                     'CatgId': Lenin.LeninCategory.pk,
#                     'LeninCategory': Lenin.LeninCategory.LeninCategory,
#                     'LeninType': Lenin.LeninType.LeninType,
#                     'LeninSize': Lenin.LeninType.LeninSize,
#                     'PrevMin': Lenin.Prev_Minimum_count,
#                     'Min': Lenin.Curr_Minimum_count,
#                     'PrevMax': Lenin.Prev_Maximum_count,
#                     'Max': Lenin.Curr_Maximum_count,
#                     'Status': 'Active' if Lenin.Status else 'Inactive',
#                     'created_by': Lenin.created_by,
#                 }
#                 for Lenin in Lenin_Master
#             ]
#             return JsonResponse(Lenin_Master_data, safe=False)
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Lenin_Stock_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            StockId = data.get('StockId', '')
            LeninCategory = data.get('LeninCategory', '')
            LeninType = data.get('LeninType', '')
            # LeninSize = data.get('LeninSize', '')
            Quantity = data.get('Quantity', '')
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')

            LeninCategory_instance = Lenin_Catg_Master_Details.objects.get(pk=LeninCategory) if LeninCategory else None
            LeninType_instance = LeninMaster_Details.objects.get(pk=LeninType) if LeninType else None

            if StockId:
                try:
                    Lenin_instance = Lenin_Stock_Details.objects.get(pk=StockId)
                    if Statusedit:
                        Lenin_instance.Status = not Lenin_instance.Status
                    else:
                        if Lenin_Stock_Details.objects.filter(LeninCategory=LeninCategory, LeninType=LeninType).exists():
                            return JsonResponse({'warn': 'The LeninCode, LeninCategory, LeninType are already present.'})
                        Lenin_instance.LeninCategory = LeninCategory_instance
                        Lenin_instance.LeninType = LeninType_instance
                        Lenin_instance.Quantity = Quantity
                    Lenin_instance.save()
                    return JsonResponse({'success': 'Lenin stock Details Updated successfully'})
                except Lenin_Stock_Details.DoesNotExist:
                    return JsonResponse({'error': 'Lenin Details not found'}, status=404)
            else:
                if Lenin_Stock_Details.objects.filter(LeninCategory=LeninCategory_instance, LeninType=LeninType_instance,Quantity=Quantity).exists():
                    return JsonResponse({'warn': 'The Lenin Details are already present.'})
                Lenin_instance = Lenin_Stock_Details(LeninCategory=LeninCategory_instance, LeninType=LeninType_instance,Quantity=Quantity, created_by=created_by)
                Lenin_instance.save()
                return JsonResponse({'success': 'Lenin stock Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            Lenin_Master = Lenin_Stock_Details.objects.all()
            Lenin_Master_data = [
                {
                    'StockId': Lenin.StockId,
                    'catgId': Lenin.LeninCategory.pk,
                    'LeninCategory': Lenin.LeninCategory.LeninCategory,
                    'LeninTypeId': Lenin.LeninType.pk,
                    'LeninType': Lenin.LeninType.LeninType,
                    'LeninSize': Lenin.LeninType.LeninSize,
                    'Quantity': Lenin.Quantity,
                    'Status': 'Active' if Lenin.Status else 'Inactive',
                    'created_by': Lenin.created_by,
                }
                for Lenin in Lenin_Master
            ]
            return JsonResponse(Lenin_Master_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)




























