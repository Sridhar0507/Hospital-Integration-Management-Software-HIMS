


import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from django.db.models import Sum, Q


# ------------------------flaggg

@csrf_exempt   
@require_http_methods(["POST", "OPTIONS", "GET"])
def Flagg_color_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            FlaggId = data.get('FlaggId', '')
            FlaggName = data.get('FlaggName', '')
            FlaggColor = data.get('FlaggColor', '')
            Statusedit = data.get('Statusedit', False)
            created_by = data.get('created_by', '')
      
            if FlaggId:
                if Statusedit:
                    try:
                        Flagg_instance = Flaggcolor_Detials.objects.get(Flagg_Id=FlaggId)
                        Flagg_instance.Status = not Flagg_instance.Status
                        Flagg_instance.save()
                        return JsonResponse({'success': 'Flagg status updated successfully'})
                    except Flaggcolor_Detials.DoesNotExist:
                        return JsonResponse({'error': f"No entry found with FlaggId '{FlaggId}'."}, status=404)
                
              
                 # Update the existing Flaggcolor_Detials object if FlaggId is provided
                try:
                    Flagg_instance = Flaggcolor_Detials.objects.get(Flagg_Id=FlaggId)
                except Flaggcolor_Detials.DoesNotExist:
                    return JsonResponse({'error': f"No entry found with FlaggId '{FlaggId}'."}, status=404)
                    
                # Check if the new FlaggName exists with a different FlaggColor or vice versa
                if Flaggcolor_Detials.objects.filter(
                    (Q(Flagg_Name=FlaggName) & ~Q(Flagg_Color=FlaggColor)) | 
                    (Q(Flagg_Color=FlaggColor) & ~Q(Flagg_Name=FlaggName))
                ).exclude(Flagg_Id=FlaggId).exists():
                    return JsonResponse({'warn': f"A Flagg Name '{FlaggName}' already exists for a different Flagg Color."})
                   
                # Update the Flagg Name and/or Flagg Color
                Flagg_instance.Flagg_Name = FlaggName
                Flagg_instance.Flagg_Color = FlaggColor
                Flagg_instance.save()

                return JsonResponse({'success': 'Flagg updated successfully'})
            else:
                if Flaggcolor_Detials.objects.filter(Q(Flagg_Name=FlaggName) & ~Q(Flagg_Color=FlaggColor)).exists():
                    return JsonResponse({'warn': f"A Flagg Name '{FlaggName}' already exists for the Flagg Color '{FlaggColor}'."})
                    
                # Create a new entry if it does not exist
                Flagg_instance = Flaggcolor_Detials(
                    Flagg_Name=FlaggName,
                    Flagg_Color=FlaggColor,
                    created_by=created_by
                )
                Flagg_instance.save()
                return JsonResponse({'success': 'Flagg added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Flagg_instance = Flaggcolor_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Flagg_instance_data = []
            for flagg in Flagg_instance:
                flagg_dict = {
                    'id': flagg.Flagg_Id,
                    'FlaggName': flagg.Flagg_Name,
                    'FlaggColor': flagg.Flagg_Color,
                    'Status': 'Active' if flagg.Status else "Inactive",
                    'created_by': flagg.created_by,
                }
                Flagg_instance_data.append(flagg_dict)

            return JsonResponse(Flagg_instance_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



#--------------------------------------------Location insert,get,update----------------------------------------






@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Location_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            locationId = data.get('locationId','')
            locationName = data.get('locationName','')
            bedCount = data.get('bedCount','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by', '')
      
            if locationId:
                if Statusedit:
                    Location_instance = Location_Detials.objects.get(pk=locationId)
                    Location_instance.Status = not Location_instance.Status
                    Location_instance.save()
                else:
                    if Location_Detials.objects.filter(Location_Name=locationName).exists():
                        return JsonResponse({'error': 'Location with the same name already exists'})
                    else:
                        
                        # Update existing location
                        Location_instance = Location_Detials.objects.get(pk=locationId)
                        Location_instance.Location_Name = locationName
                        Location_instance.Bed_Count = bedCount

                        Location_instance.save()

                return JsonResponse({'success': 'Location_Name Updated successfully'})
            else:
                # Insert new location
                total_bed_count = Location_Detials.objects.filter(Location_Name='ALL').aggregate(total=Sum('Bed_Count'))['total']
                total_bed_count = total_bed_count if total_bed_count else 500

                created_bed_count = Location_Detials.objects.filter(~Q(Location_Name='ALL')).aggregate(total=Sum('Bed_Count'))['total']
                created_bed_count = created_bed_count if created_bed_count else 0

                created_bed_count_sum = created_bed_count + int(bedCount)

                if total_bed_count >= created_bed_count_sum:
                    if Location_Detials.objects.filter(Location_Name=locationName).exists():
                        return JsonResponse({'error': 'Location with the same name already exists'})

                   

                    Location_instance = Location_Detials(
                        Location_Name=locationName,
                        Bed_Count=bedCount,
                        created_by=created_by
                    )
                    Location_instance.save()

                    return JsonResponse({'success': 'Location added successfully'})
                else:
                    return JsonResponse({'warn': f'Your Registered Bed Count is {total_bed_count}, so please stay below or equal to that'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the Location_Detials model
            locations = Location_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            location_data = [
                {
                    'id': location.Location_Id,
                    'locationName': location.Location_Name,
                    'bedCount': location.Bed_Count,
                    'Status': 'Active' if location.Status else 'Inactive',
                    'created_by': location.created_by
                } for location in locations
            ]

            return JsonResponse(location_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)









#--------------------------------------------Department insert,get,update----------------------------------------




@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Department_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            DepartmentId = data.get('DepartmentId','')
            DepartmentName = data.get('DepartmentName','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
      
            
           
            if DepartmentId:
                if Statusedit:
                    Department_instance = Department_Detials.objects.get(pk=DepartmentId)
                    # Create a new LocationName instance
                    Department_instance.Status= not Department_instance.Status
                    Department_instance.save()
                else:
                    if Department_Detials.objects.filter(Department_Name=DepartmentName).exists():
                        return JsonResponse({'warn': f"The DepartmentName  are already present in the name of {DepartmentName} "})
                    else:
                        Department_instance = Department_Detials.objects.get(pk=DepartmentId)
                        # Create a new LocationName instance
                        Department_instance.Department_Name=DepartmentName
                        Department_instance.save()

                return JsonResponse({'success': 'DepartmentName Updated successfully'})
            else:
                if Department_Detials.objects.filter(Department_Name=DepartmentName).exists():
                    return JsonResponse({'warn': f"The DepartmentName  are already present in the name of {DepartmentName} "})
                else:
                    Department_instance = Department_Detials(
                        Department_Name=DepartmentName,
                        created_by=created_by
                    )
                Department_instance.save()
                return JsonResponse({'success': 'Department added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Department_Master = Department_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Department_Master_data = []
            for Department in Department_Master:
                Department_dict = {
                    'id': Department.Department_Id,
                    'DepartmentName': Department.Department_Name,
                    'Status': 'Active' if Department.Status else 'Inactive',
                    'created_by': Department.created_by,
                    
                }
                Department_Master_data.append(Department_dict)

            return JsonResponse(Department_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)




#-------------------------------------------- Designation insert,get,update----------------------------------------



@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Designation_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            # Extract and validate data
            DesignationId = data.get('DesignationId','')
            # Department = data.get('Department','')
            Designation = data.get('Designation','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            # if Department:
            #     Department_instance = Department_Detials.objects.get(Department_Id=Department)
           
            if DesignationId:
                if Statusedit:
                    Designation_instance = Designation_Detials.objects.get(pk=DesignationId)
                    Designation_instance.Status= not Designation_instance.Status
                    Designation_instance.save()
                else:
                    if Designation_Detials.objects.filter(Designation_Name=Designation).exists():
                        return JsonResponse({'warn': f"The Designation {Designation} already exists."})
                    else:
                        Designation_instance = Designation_Detials.objects.get(pk=DesignationId)
                        # Create a new LocationName instance
                        
                        Designation_instance.Designation_Name=Designation
                        # Designation_instance.Department_Name=Department_instance
                        Designation_instance.save()

                return JsonResponse({'success': ' Updated successfully'})
            else:
                if Designation_Detials.objects.filter(Designation_Name=Designation).exists():
                    return JsonResponse({'warn': f"The  Designation {Designation} already exists."})
                else:
                    Designation_instance = Designation_Detials(
                        
                        Designation_Name=Designation,
                        # Department_Name=Department_instance,
                        created_by=created_by
                    )
                Designation_instance.save()
                return JsonResponse({'success': ' added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Designations = Designation_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Designation_Master_data = []
            for Designation in Designations:
                Designation_dict = {
                    'id': Designation.Designation_Id,
                    'Designation': Designation.Designation_Name,
                    # 'DepartmentId': Designation.Department_Name.Department_Id,
                    # 'Department': Designation.Department_Name.Department_Name,
                    'Status':'Active' if Designation.Status else 'Inactive' ,
                    'created_by': Designation.created_by,
                    
                }
                Designation_Master_data.append(Designation_dict)

            return JsonResponse(Designation_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


#-------------------------------------------- ConsentName insert,get,update----------------------------------------



@csrf_exempt   
@require_http_methods(["POST", "OPTIONS", "GET"])
def ConsentName_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            
            Department = data.get('Department', '')
            ConsentFormsName = data.get('ConsentFormsName', '')
            Statusedit = data.get('Statusedit', False)
            ConsentId = data.get('ConsentId', None)  # Assuming ConsentId is sent from the client side
            created_by = data.get('created_by', '')

            if Department:
                Department_instance = Department_Detials.objects.get(Department_Id=Department)
            else:
                return JsonResponse({'error': 'Department is required'}, status=400)

            if ConsentId:
                Consent_instance = ConsentName_Detials.objects.get(pk=ConsentId)

                if Statusedit:
                    # Toggle the status of the Consent
                    Consent_instance.Status = not Consent_instance.Status
                    Consent_instance.save()
                    return JsonResponse({'success': 'Status updated successfully'})
                else:
                    if ConsentName_Detials.objects.filter(
                            ConsentName=ConsentFormsName, 
                            DepartmentName=Department_instance
                        ).exclude(pk=ConsentId).exists():
                        return JsonResponse({'warn': f"The ConsentFormsName '{ConsentFormsName}' already exists in this department."})
                    else:
                        # Update the existing consent details
                        Consent_instance.DepartmentName = Department_instance
                        Consent_instance.ConsentName = ConsentFormsName
                        Consent_instance.save()
                        return JsonResponse({'success': 'Consent updated successfully'})
            else:
                if ConsentName_Detials.objects.filter(
                        ConsentName=ConsentFormsName, 
                        DepartmentName=Department_instance
                    ).exists():
                    return JsonResponse({'warn': f"The ConsentFormsName '{ConsentFormsName}' already exists in this department."})
                else:
                    # Create a new Consent
                    Consent_instance = ConsentName_Detials(
                        DepartmentName=Department_instance,
                        ConsentName=ConsentFormsName,
                        created_by=created_by
                    )
                    Consent_instance.save()
                    return JsonResponse({'success': 'Consent added successfully'})
        
        except Department_Detials.DoesNotExist:
            return JsonResponse({'error': 'Department not found'}, status=404)
        except ConsentName_Detials.DoesNotExist:
            return JsonResponse({'error': 'Consent not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            # Fetch all records from the ConsentName_Detials model
            ConsentNames = ConsentName_Detials.objects.all()
            
            # Construct a list of dictionaries containing consent data
            Consent_Master_data = []
            for Consent in ConsentNames:
                Consent_dict = {
                    'id': Consent.ConsentName_Id,
                    'DepartmentId': Consent.DepartmentName.Department_Id,
                    'Department': Consent.DepartmentName.Department_Name,
                    'ConsentFormsName': Consent.ConsentName,
                    'Status': 'Active' if Consent.Status else 'Inactive',
                    'created_by': Consent.created_by,
                }
                Consent_Master_data.append(Consent_dict)

            return JsonResponse(Consent_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)


#-------------------------------------------- Category insert,get,update----------------------------------------


@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Category_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            
            # Extract and validate data
            CategoryId = data.get('CategoryId','')
            CategoryName = data.get('CategoryName','')
            Designation = data.get('Designation','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            if Designation:
                Designation_instance = Designation_Detials.objects.get(Designation_Id=Designation)
            
           
            if CategoryId:
                if Statusedit:
                    Category_instance = Category_Detials.objects.get(pk=CategoryId)

                    Category_instance.Status=not Category_instance.Status
                    Category_instance.save()
                else:
                    if Category_Detials.objects.filter(Category_Name=CategoryName,Designation_Name=Designation_instance).exists():
                        return JsonResponse({'warn': f"The CategoryName {CategoryName} with Designation {Designation_instance.Designation_Name} already exists."})
                    else:
                        Category_instance = Category_Detials.objects.get(pk=CategoryId)
                        # Create a new Category instance
                        
                        Category_instance.Designation_Name=Designation_instance
                        Category_instance.Category_Name=CategoryName
                        Category_instance.save()

                return JsonResponse({'success': 'Category Updated successfully'})
            else:
                if Category_Detials.objects.filter(Category_Name=CategoryName,Designation_Name=Designation_instance).exists():
                    return JsonResponse({'warn': f"The CategoryName {CategoryName} with Designation {Designation_instance.Designation_Name} already exists."})
                else:
                    Category_instance = Category_Detials(
                        
                        Designation_Name=Designation_instance,
                        Category_Name=CategoryName,
                        created_by=created_by
                    )
                Category_instance.save()
                return JsonResponse({'success': 'Category added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the Category model
            Categories = Category_Detials.objects.all()
            
            # Construct a list of dictionaries containing Category data
            Category_Master_data = []
            for Category in Categories:
                Category_dict = {
                    'id': Category.Category_Id,
                    'DesignationId': Category.Designation_Name.Designation_Id,
                    'DesignationName': Category.Designation_Name.Designation_Name,
                    'CategoryName': Category.Category_Name,
                    'Status':'Active' if Category.Status else 'Inactive',
                    'created_by': Category.created_by,
                    
                }
                Category_Master_data.append(Category_dict)

            return JsonResponse(Category_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





# ---------------------------------Speciality---------------

@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Speciality_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            
            # Extract and validate data
            SpecialityId = data.get('SpecialityId','')
            SpecialityName = data.get('SpecialityName','')
            Designation = data.get('Designation','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
            if Designation:
                Designation_instance = Designation_Detials.objects.get(Designation_Id =Designation)
           
            if SpecialityId:
                if Statusedit:
                    Speciality_instance = Speciality_Detials.objects.get(pk=SpecialityId)

                    Speciality_instance.Status= not Speciality_instance.Status
                    Speciality_instance.save()
                else:
                    if Speciality_Detials.objects.filter(Speciality_Name=SpecialityName,Designation_Name=Designation_instance).exists():
                        return JsonResponse({'warn': f"The SpecialityName {SpecialityName} with Designation {Designation_instance.Designation_Name} already exists."})
                    else:
                        Speciality_instance = Speciality_Detials.objects.get(pk=SpecialityId)
                        # Create a new Category instance
                        
                        Speciality_instance.Designation_Name=Designation_instance
                        Speciality_instance.Speciality_Name=SpecialityName
                        Speciality_instance.save()

                return JsonResponse({'success': 'Speciality Updated successfully'})
            else:
                if Speciality_Detials.objects.filter(Speciality_Name=SpecialityName,Designation_Name=Designation_instance).exists():
                    return JsonResponse({'warn': f"The SpecialityName {SpecialityName} with Designation {Designation_instance.Designation_Name} already exists."})
                else:
                    Speciality_instance = Speciality_Detials(
                        
                        Designation_Name=Designation_instance,
                        Speciality_Name=SpecialityName,
                        created_by=created_by
                    )
                Speciality_instance.save()
                return JsonResponse({'success': 'Speciality Detials added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the Category model
            Specialities = Speciality_Detials.objects.all()
            
            # Construct a list of dictionaries containing Category data
            Speciality_Master_data = []
            for Speciality in Specialities:
                Speciality_dict = {
                    'id': Speciality.Speciality_Id,
                    'DesignationId': Speciality.Designation_Name.Designation_Id,
                    'DesignationName': Speciality.Designation_Name.Designation_Name,
                    'SpecialityName': Speciality.Speciality_Name,
                    'Status': 'Active' if Speciality.Status else 'Inactive',
                    'created_by': Speciality.created_by,
                    
                }
                Speciality_Master_data.append(Speciality_dict)

            return JsonResponse(Speciality_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)





@csrf_exempt   
@require_http_methods(["POST", "OPTIONS", "GET"])
def Doctors_Speciality_Detials_link(request):
    if request.method == 'GET':
        try:
            # Fetch the 'Doctor' designation
            Designation_instance = Designation_Detials.objects.get(Designation_Name='DOCTOR')
            
            # Fetch all specialties associated with the 'Doctor' designation
            Specialities = Speciality_Detials.objects.filter(Designation_Name=Designation_instance)
    
            # Construct a list of dictionaries containing the data
            Speciality_Master_data = []
            for Speciality in Specialities:
                Speciality_dict = {
                    'id': Speciality.Speciality_Id,
                    'DesignationId': Speciality.Designation_Name.Designation_Id,
                    'DesignationName': Speciality.Designation_Name.Designation_Name,
                    'SpecialityName': Speciality.Speciality_Name,
                    'Status': 'Active' if Speciality.Status else 'Inactive',
                    'created_by': Speciality.created_by,
                }
                Speciality_Master_data.append(Speciality_dict)

            return JsonResponse(Speciality_Master_data, safe=False)

        except Designation_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor designation not found'}, status=404)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)







@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def UserControl_Role_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            RoleId = data.get('RoleId','')
            Role = data.get('Role','')
            Statusedit = data.get('Statusedit',False)
            created_by = data.get('created_by','')
      
            
           
            if RoleId:
                if Statusedit:
                    Role_instance = Role_Master.objects.get(Role_Id=RoleId)

                    Role_instance.Status= not Role_instance.Status
                    Role_instance.save()
                else:
                    if Role_Master.objects.filter(Role_Name=Role).exists():
                        return JsonResponse({'warn': f"The Role Name  are already present in the name of {Role} "})
                    else:
                        Role_instance = Role_Master.objects.get(Role_Id=RoleId)
                        # Create a new LocationName instance
                        Role_instance.Role_Name=Role
                        Role_instance.save()

                return JsonResponse({'success': 'Role Updated successfully'})
            else:
                if Role_Master.objects.filter(Role_Name=Role).exists():
                     return JsonResponse({'warn': f"The Role Name  are already present in the name of {Role} "})
                else:
                    Role_instance = Role_Master(
                        Role_Name=Role,
                        created_by=created_by
                    )
                Role_instance.save()
                return JsonResponse({'success': 'Role added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Roles = Role_Master.objects.exclude(created_by='system')
            
            # Construct a list of dictionaries containing location data
            Role_Master_data = []
            for role in Roles:
                Role_dict = {
                    'id': role.Role_Id,
                    'Role': role.Role_Name,
                    'Status': 'Active' if role.Status else "Inactive",
                    'created_by': role.created_by,
                    
                }
                Role_Master_data.append(Role_dict)

            return JsonResponse(Role_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Relegion_Master_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            RelegionId = data.get('religionId')
            Relegion = data.get('religion')
            Statusedit = data.get('statusEdit',False)
            created_by = data.get('created_by','')
      
            
           
            if RelegionId:
                if Statusedit:
                   Relegion_instance = Religion_Detials.objects.get(Religion_Id=RelegionId)
                   Relegion_instance.Status= not Relegion_instance.Status
                   Relegion_instance.save()
                else:   
                    if Religion_Detials.objects.filter(Religion_Name=Relegion).exists():
                       return JsonResponse({'warn': f"The Relegion already present in the name of {Relegion} "})
                    else:
                
                        Relegion_instance = Religion_Detials.objects.get(Religion_Id=RelegionId)
                        Relegion_instance.Religion_Name=Relegion
                        Relegion_instance.save()

                return JsonResponse({'success': 'Relegion Updated successfully'})
            else:
                if Religion_Detials.objects.filter(Religion_Name=Relegion).exists():
                    return JsonResponse({'warn': f"The Religion_Name  are already present in the name of {Relegion} "})
                else:
                    Religion_instance = Religion_Detials(
                        Religion_Name=Relegion,
                        created_by=created_by
                    )
                Religion_instance.save()
                return JsonResponse({'success': 'Religion added successfully'})
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the LocationName model
            Religions = Religion_Detials.objects.all()
            
            # Construct a list of dictionaries containing location data
            Religions_Master_data = []
            for Religion in Religions:
                Religion_dict = {
                    'id': Religion.Religion_Id,
                    'religion': Religion.Religion_Name,
                    'status': 'Active' if Religion.Status else 'Inactive',
                    'created_by': Religion.created_by,
                    
                }
                Religions_Master_data.append(Religion_dict)

            return JsonResponse(Religions_Master_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})












