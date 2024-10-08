from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from Masters.models import *
import pandas as pd
from io import BytesIO
from PIL import Image
import base64
from PyPDF2 import PdfReader, PdfWriter
import magic



# -----------------------------------------------------------------------------------


@csrf_exempt   
@require_http_methods(["POST","OPTIONS","GET"])
def Rack_Detials_link(request):
    if request.method == 'POST':
         try:
            data=json.loads(request.body)
            # print("data",data)

            RackID=data.get("RackID",'')
            RackName=data.get('RackName')
            Location=data.get('Location')
            created_by=data.get('created_by')
            Statusedit=data.get('Statusedit',False)
            
            if Location:
                Location_instance = Location_Detials.objects.get(Location_Id = Location)
            
            if RackID:
                if Statusedit:
                    Rack_instance = Rack_Master_Detials.objects.get(pk=RackID)
                    Rack_instance.Status = not Rack_instance.Status
                    Rack_instance.save()
                    
                    return JsonResponse({'success': 'Rack Detials Updated successfully'})
                    

                else:
                    if not RackName  or not Location:
                        return JsonResponse({'warn': 'RackName and Location are mandatory fields'})
                
                    if Rack_Master_Detials.objects.filter(Rack_Name=RackName).exclude(pk=RackID).exists():
                        return JsonResponse ({'Warn':f"The Rack Detials are already present in the name of {RackName} and {Location_instance.Location_Name} "})

                    else:
                        Rack_instance=Rack_Master_Detials.objects.get(pk=RackID)
                        Rack_instance.Rack_Name=RackName
                        Rack_instance.Location_Name=Location_instance
                        Rack_instance.save()

                        return JsonResponse({'success': 'Rack Detials Updated successfully'})
            
            else:
                if not RackName  or not Location:
                    return JsonResponse({'warn': 'RackName and Location are mandatory fields'})

                if Rack_Master_Detials.objects.filter(Rack_Name=RackName, Location_Name=Location_instance).exists():
                    return JsonResponse({'warn': f"The Rack Detials are already present in the name of {RackName} and {Location_instance.Location_Name} "})
                else:
                    Rack_instance=Rack_Master_Detials(
                        Rack_Name=RackName,
                        Location_Name=Location_instance,
                        created_by=created_by
                    )
                    Rack_instance.save()
                    return JsonResponse ({'success': 'Rack Detials added successfully'})


         except Exception as e :
             print(f"An error occurred: {str(e)}")
             return JsonResponse ({'error':'An internal server error occurred'},status=500)

    elif request.method == 'GET':
        try:
            Rack_Master=Rack_Master_Detials.objects.all()

            Rack_Master_Array = []

            for row in Rack_Master :
                Rack_Master_dic={
                    "id":row.Rack_Id,
                    "RackName":row.Rack_Name,
                    "Location":row.Location_Name.Location_Name,
                    'Location_Id': row.Location_Name.Location_Id,
                    "Status":row.Status,
                }
                
                Rack_Master_Array.append(Rack_Master_dic)
            
            return JsonResponse (Rack_Master_Array,safe=False)

        except Exception as e :
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)    


# -----------------------------------------------------------------------------------


@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def Shelf_Detials_link(request):
    if request.method=='POST':
        try:
            data = json.loads(request.body)
            # print("data",data)
            ShelfID=data.get('ShelfID','')
            RackName=data.get('RackName')
            ShelfName=data.get('ShelfName')
            created_by=data.get('created_by')
            Location=data.get('Location')
            Statusedit=data.get('Statusedit',False)

            print(ShelfID,Statusedit,'===')


            
            if RackName :
                RackDetials_Instance=Rack_Master_Detials.objects.get(pk=RackName)

            if ShelfID:
                if Statusedit:
                    Shelf_instance=Shelf_Master_Detials.objects.get(pk=ShelfID)
                    Shelf_instance.Status=not Shelf_instance.Status
                    Shelf_instance.save()

                    return JsonResponse({'success': 'Shelf Detials Updated successfully'})
                
                    
            
                else:
                  if not RackName or not ShelfName or not Location:
                        return JsonResponse({'warn': 'RackName, ShelfName, and Location are mandatory fields'})
                  if Shelf_Master_Detials.objects.filter(Shelf_Name=ShelfName).exclude(pk=ShelfID).exists():
                        return JsonResponse ({'Warn':f"The Shelf Detials are already present in the name of {RackName} and {ShelfName} "})
                  
                  else:
                      Shelf_instance=Shelf_Master_Detials.objects.get(pk=ShelfID)
                      Shelf_instance.Shelf_Name=ShelfName
                      Shelf_instance.Rack_Name=RackDetials_Instance
                      Shelf_instance.save()
                  
                      return JsonResponse({'success': 'Shelf Detials Updated successfully'})


                
            else:
                if not RackName or not ShelfName or not Location:
                    return JsonResponse({'warn': 'RackName, ShelfName, and Location are mandatory fields'})

                if Shelf_Master_Detials.objects.filter(Shelf_Name=ShelfName,Rack_Name__Rack_Id=RackName,Rack_Name__Location_Name__Location_Id=Location).exists():
                        return JsonResponse({'warn': f"The Shelf Detials are already present in the name of {ShelfName} and {RackName} "})
                else:
                    Shelf_instance=Shelf_Master_Detials(
                        Shelf_Name=ShelfName,
                        Rack_Name=RackDetials_Instance,
                        created_by=created_by

                    )
                    Shelf_instance.save()
                    
                return JsonResponse ({'Success':'Shelf Detials Added Successfully'})


        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse ({'error':'An internal server error Occurred'},status=500)
    elif request.method == "GET":
        try:
            Shelf_Master=Shelf_Master_Detials.objects.all()

            shelf_Master_Array =[]

            for row in Shelf_Master:
                Shelf_dict={
                    'id':row.Shelf_Id,
                    'Shelf_Name':row.Shelf_Name,
                    'Rack_Name':row.Rack_Name.Rack_Name,
                    'Rack_Id':row.Rack_Name.Rack_Id,
                    'Location_Name':row.Rack_Name.Location_Name.Location_Name,
                    'Location_Id':row.Rack_Name.Location_Name.Location_Id,
                    "Status":row.Status,
                }
                shelf_Master_Array.append(Shelf_dict)
            
            return JsonResponse (shelf_Master_Array,safe=False)
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error': 'An internal server error occurred'}, status=500)



# -----------------------------------------------------------------------------------

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Tray_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)

            TrayID = data.get("TrayID", '')
            RackName = data.get("RackName")
            ShelfName = data.get("ShelfName")
            TrayName = data.get("TrayName")
            Location = data.get('Location')
            created_by = data.get('created_by')
            Statusedit=data.get('Statusedit',False)

            

            if RackName:
                Rack_instance = Rack_Master_Detials.objects.get(pk=RackName)

            if ShelfName:
                Shelf_instance = Shelf_Master_Detials.objects.get(pk=ShelfName)


            if TrayID:
                if Statusedit:
                    Tray_instance=Tray_Master_Details.objects.get(pk=TrayID)
                    Tray_instance.Status=  not Tray_instance.Status
                    Tray_instance.save()
                    
                    return JsonResponse({'success': 'Tray Detials Updated successfully'})

                else:
                    if not RackName or not ShelfName or not TrayName or not Location:
                        return JsonResponse({'warn': 'RackName, ShelfName, TrayName, and Location are mandatory fields'})
                    if Tray_Master_Details.objects.filter(Tray_Name=TrayName).exclude(pk=TrayID).exists():
                        return JsonResponse ({'Warn':f"The Tray Detials are already present in the name of {TrayName} and {ShelfName} "})
                    else:
                        Tray_instance=Tray_Master_Details.objects.get(pk=TrayID)
                        Tray_instance.Tray_Name=TrayName
                        Tray_instance.Shelf_Name=Shelf_instance
                        Tray_instance.Rack_Name=Rack_instance                        
                        Tray_instance.created_by=created_by
                        Tray_instance.save()

                    return JsonResponse({'success': 'Tray Detials Updated successfully'})
            
            else:       
                if not RackName or not ShelfName or not TrayName or not Location:
                    return JsonResponse({'warn': 'RackName, ShelfName, TrayName, and Location are mandatory fields'})

                if Tray_Master_Details.objects.filter(
                    Tray_Name=TrayName,
                    Shelf_Name__Shelf_Id=ShelfName,
                    Rack_Name__Rack_Id=RackName,
                    Rack_Name__Location_Name__Location_Id=Location
                ).exists():
                    return JsonResponse({
                        'warn': f"The Tray Detials are already present in the name of {ShelfName},{RackName} and {TrayName}"
                    })

                Tray_instance = Tray_Master_Details(
                    Tray_Name=TrayName,
                    Shelf_Name=Shelf_instance,
                    Rack_Name=Rack_instance,
                    created_by=created_by
                )
                Tray_instance.save()

                return JsonResponse({'success': 'Tray details saved successfully'})

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == "GET":
        try:
            Tray_Master=Tray_Master_Details.objects.all()

            Tray_Master_Array =[]

            for row in Tray_Master:
                Tray_dict={
                    'id':row.Tray_Id,
                    'Tray_Name':row.Tray_Name,
                    'Shelf_Id':row.Shelf_Name.Shelf_Id,
                    'Shelf_Name':row.Shelf_Name.Shelf_Name,
                    'Rack_Name':row.Rack_Name.Rack_Name,
                    'Rack_Id':row.Rack_Name.Rack_Id,
                    'Location_Name':row.Rack_Name.Location_Name.Location_Name,
                    'Location_Id':row.Rack_Name.Location_Name.Location_Id,
                    "Status":row.Status,
                    'BookingStatus':row.Booking_Status
                }
                Tray_Master_Array.append(Tray_dict)
            
            return JsonResponse (Tray_Master_Array,safe=False)
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error': 'An internal server error occurred'}, status=500)


# =============================================================

@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def ProductCategory_Master_link (request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print('data',data)

            ProductCategoryId=data.get('ProductCategoryId','')
            ProductCategoryName=data.get('ProductCategoryName')
            created_by=data.get('created_by')
            Statusedit=data.get('Statusedit')
            
            if ProductCategoryId:
                if Statusedit:
                    ProductCategory_instance=Medical_ProductCategory_Details.objects.get(pk=ProductCategoryId)
                    ProductCategory_instance.Status= not ProductCategory_instance.Status
                    ProductCategory_instance.save()
                    
                    return JsonResponse ({'success': 'Product Category Updated successfully'})
                else:
                    if not ProductCategoryName:
                        return JsonResponse({'warn': 'Category Name are mandatory fields'})
                    
                    if Medical_ProductCategory_Details.objects.filter(ProductCategory_Name=ProductCategoryName).exclude(pk=ProductCategoryId).exists():
                        return JsonResponse ({'Warn':f"The Product Category are already present in the name of {ProductCategoryName}"})

                    ProductCategory_instance=Medical_ProductCategory_Details.objects.get(pk=ProductCategoryId)
                    ProductCategory_instance.ProductCategory_Name=ProductCategoryName
                    ProductCategory_instance.save()

                    return JsonResponse ({'success': 'Product Category Updated successfully'})


            else:

                if not ProductCategoryName:
                    return JsonResponse({'warn': 'Category Name are mandatory fields'})
                if Medical_ProductCategory_Details.objects.filter(ProductCategory_Name=ProductCategoryName).exists():
                    return JsonResponse({'warn': f"The Category Name are already present in the name of {ProductCategoryName}"})
                else:
                    ProductCategory_instance=Medical_ProductCategory_Details(
                    ProductCategory_Name=ProductCategoryName,
                    Created_by=created_by
                    )
                    ProductCategory_instance.save()

                    return JsonResponse ({'success': 'Product Category saved successfully'})

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error': 'An internal server error occurred'},status=500)
    elif request.method == 'GET':
        try:
            Medical_ProductCategory_instance=Medical_ProductCategory_Details.objects.all()

            Category_Array=[]

            for row in Medical_ProductCategory_instance:
                Category_dic={
                    'id':row.ProductCategory_Id,
                    'ProductCategoryName':row.ProductCategory_Name,
                    'Status':row.Status
                }
                Category_Array.append(Category_dic)

            return JsonResponse (Category_Array,safe=False)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error':'An internal server error occurred'},status=500)


@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def SubCategory_Master_link (request):
    if request.method == 'POST':
        try:
            data=json.loads(request.body)
            print('data',data)

            SubCategoryId=data.get('SubCategoryId','')
            ProductCategoryId=data.get('ProductCategoryId')
            SubCategoryName=data.get('SubCategoryName')
            created_by=data.get('created_by')
            Statusedit=data.get('Statusedit')

            if SubCategoryId:
                if Statusedit:
                    SubCategory_Instance=Medical_SubCategory_Detailes.objects.get(pk=SubCategoryId)
                    SubCategory_Instance.Status=not SubCategory_Instance.Status
                    SubCategory_Instance.save()

                    return JsonResponse ({'success': 'SubCategory Updated successfully'})
                else:
                    if not ProductCategoryId:
                        return JsonResponse({'warn': 'Product Category Name are mandatory fields'})
                    if not SubCategoryName:
                        return JsonResponse({'warn': 'SubCategory Name are mandatory fields'})
                    if ProductCategoryId:
                        ProductCat_instance=Medical_ProductCategory_Details.objects.get(pk=ProductCategoryId)
                    if Medical_SubCategory_Detailes.objects.filter(ProductCategoryId=ProductCat_instance,SubCategoryName=SubCategoryName).exclude(pk=SubCategoryId).exists():
                        return JsonResponse ({'Warn':f"The Product Category are already present in the name of {SubCategoryName}"})
                    
                    SubCategory_Instance=Medical_SubCategory_Detailes.objects.get(pk=SubCategoryId)
                    SubCategory_Instance.ProductCategoryId=ProductCat_instance
                    SubCategory_Instance.SubCategoryName=SubCategoryName
                    SubCategory_Instance.save()

                    return JsonResponse ({'success': 'SubCategory Updated successfully'})


                    



            else:
                if not ProductCategoryId:
                    return JsonResponse({'warn': 'Product Category Name are mandatory fields'})
                if not SubCategoryName:
                    return JsonResponse({'warn': 'SubCategory Name are mandatory fields'})
                if ProductCategoryId:
                    ProductCat_instance=Medical_ProductCategory_Details.objects.get(pk=ProductCategoryId)
                if Medical_SubCategory_Detailes.objects.filter(ProductCategoryId=ProductCat_instance,SubCategoryName=SubCategoryName).exists():
                        return JsonResponse({'warn': f"The Category Name are already present in the name of {SubCategoryName}"})
                else:
                    SubCategory_Instance=Medical_SubCategory_Detailes(
                        ProductCategoryId=ProductCat_instance,
                        SubCategoryName=SubCategoryName,
                        Created_by=created_by
                    )
                    SubCategory_Instance.save()

                    return JsonResponse ({'success': 'SubCategory saved successfully'})

        except Exception as e:
            print(f'An error occurred :{str(e)}')
            return JsonResponse (f'error:{str(e)}')

    elif request.method == 'GET':
        try:
            SubCategory_instance=Medical_SubCategory_Detailes.objects.all()
            SubCategoryArray=[]

            for row in SubCategory_instance:
                Cat_dic={
                    'id':row.SubCategory_Id,
                    'ProductCategoryId':row.ProductCategoryId.ProductCategory_Id,
                    'ProductCategory_Name':row.ProductCategoryId.ProductCategory_Name,
                    'SubCategoryName':row.SubCategoryName,
                    'Status':row.Status,
                }
                SubCategoryArray.append(Cat_dic)

            return JsonResponse(SubCategoryArray,safe=False)
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error': 'An internal server error occurred'},status=500)


@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def Drug_Group_link (request):
    if request.method == 'POST':
        try:
            data=json.loads(request.body)

            print("data",data)

            DrugGroupID=data.get('DrugGroupID')
            DrugGroupName=data.get('DrugGroupName')
            created_by=data.get('created_by')
            Statusedit=data.get('Statusedit')

            if DrugGroupID:
                if Statusedit:
                    Drug_Group_Master_instance=Drug_Group_Master_Details.objects.get(pk=DrugGroupID)
                    Drug_Group_Master_instance.Status=not Drug_Group_Master_instance.Status
                    Drug_Group_Master_instance.save()

                    return JsonResponse ({'success': 'Drug Group Updated successfully'})
                else:
                    if not DrugGroupName:
                        return JsonResponse({'warn': 'Drug Group Name are mandatory fields'})
                    if Drug_Group_Master_Details.objects.filter(DrugGroup_Name=DrugGroupName).exclude(pk=DrugGroupID).exists():
                        return JsonResponse({'warn':f"The Product Category are already present in the name of {DrugGroupName}" })
                    else:
                        Drug_Group_Master_instance=Drug_Group_Master_Details.objects.get(pk=DrugGroupID)
                        Drug_Group_Master_instance.DrugGroup_Name=DrugGroupName
                        Drug_Group_Master_instance.save()
                        
                        return JsonResponse ({'success': 'Drug Group Updated successfully'})
                        

            else:
                if not DrugGroupName:
                    return JsonResponse ({'warn':'Drug Group Name are mandatory fields'})
                if Drug_Group_Master_Details.objects.filter(DrugGroup_Name=DrugGroupName).exists():
                    return JsonResponse ({'warn': f"The Drug Group Name are already present in the name of {DrugGroupName}"})

                else:
                    DrugGroup_instance=Drug_Group_Master_Details(
                        DrugGroup_Name=DrugGroupName,
                        Create_by=created_by
                    )
                    DrugGroup_instance.save()

                    return JsonResponse ({'success': 'Drug Group Name saved successfully'})
        
        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse ({'error':'An internal server error occurred'},status=500)
    elif request.method == 'GET':
        try:
            Drug_Group_Master_instance=Drug_Group_Master_Details.objects.all()

            Drug_array=[]

            for row in Drug_Group_Master_instance:
                Drug_dic={
                    'id':row.DrugGroup_Id,
                    'DrugGroupName':row.DrugGroup_Name,
                    'Status':row.Status
                }
                Drug_array.append(Drug_dic)
            return JsonResponse (Drug_array,safe=False)
        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse ({'error':'An internal server error occurred'},status=500)



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Medical_ProductMaster_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print('data', data)

            ItemID = data.get('ItemID')
            ItemName = data.get('ItemName')
            GenericName = data.get('GenericName')
            CompanyName = data.get('CompanyName')            
            ProductCategory = data.get('ProductCategory')
            SubCategory = data.get('SubCategory')
            Strength = data.get('Strength')
            UOM = data.get('UOM')
            HSNCode = data.get('HSNCode')
            DrugGroup = data.get('DrugGroup')
            PackingType = data.get('PackingType')
            PackingQty = data.get('PackingQty')
            LeastSellablePack = data.get('LeastSellablePack')
            LeastSellableQty = data.get('LeastSellableQty')
            MinimumQantity = data.get('MinimumQty')
            MaximumQantity = data.get('MaximumQty')
            Remarks = data.get('Remarks')
            IsDistribution = data.get('IsDistribution')
            InActive = data.get('InActive')
            Create_by = data.get('created_by')

            if ProductCategory:
                ProductCategory_instant = Medical_ProductCategory_Details.objects.get(pk=ProductCategory)
            if ProductCategory:
                SubProductCategory_instant = Medical_SubCategory_Detailes.objects.get(pk=SubCategory)
            if DrugGroup:
                DrugGroup_instant = Drug_Group_Master_Details.objects.get(pk=DrugGroup)
            if PackingType:
                PurchasePack_instance=ProductType_Master_Details.objects.get(pk=PackingType)
            if LeastSellablePack:
                LeastSellablePack_instance=ProductType_Master_Details.objects.get(pk=LeastSellablePack)
            
            
            if ItemID:
                product_instance = Medical_ProductMaster_Details.objects.get(pk=ItemID)
                product_instance.Item_Name = ItemName
                product_instance.Generic_Name = GenericName
                product_instance.CompanyName = CompanyName               
                product_instance.Product_Category = ProductCategory_instant
                product_instance.Product_SubCategory = SubProductCategory_instant
                product_instance.Strength = Strength 
                product_instance.UOM = UOM
                product_instance.HSN_Code = HSNCode
                product_instance.Drug_Group = DrugGroup_instant
                product_instance.PackingType = PurchasePack_instance
                product_instance.PackingQty = PackingQty
                product_instance.LeastSellableQty = LeastSellableQty
                product_instance.LeastSellablePack = LeastSellablePack_instance
                product_instance.Minimum_Qantity = MinimumQantity
                product_instance.Maximum_Qantity = MaximumQantity
                product_instance.Remarks = Remarks
                product_instance.IsDistribution = IsDistribution
                product_instance.InActive = InActive
                product_instance.Create_by = Create_by
                product_instance.save()

                return JsonResponse({'message': 'Product master data updated successfully.'}, status=200)
            else:
                # Create new product
                Medical_ProductMaster_instance = Medical_ProductMaster_Details(
                    Item_Name=ItemName,
                    Generic_Name=GenericName,
                    CompanyName=CompanyName,
                    Product_Category=ProductCategory_instant,
                    Product_SubCategory=SubProductCategory_instant,
                    Strength=Strength,
                    UOM=UOM,
                    HSN_Code=HSNCode,
                    Drug_Group=DrugGroup_instant,
                    PackingType=PurchasePack_instance,
                    PackingQty=PackingQty,
                    LeastSellablePack=LeastSellablePack_instance,
                    LeastSellableQty=LeastSellableQty,
                    Minimum_Qantity=MinimumQantity,
                    Maximum_Qantity=MaximumQantity,
                    Remarks=Remarks,
                    IsDistribution=IsDistribution,
                    InActive=InActive,
                    Create_by=Create_by
                )
                Medical_ProductMaster_instance.save()

                return JsonResponse({'message': 'Product master data saved successfully.'}, status=201)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    if request.method == 'GET':
        try:
            ItemCode=request.GET.get('ItemCode')
            print('ItemCode----',ItemCode)   

            if ItemCode:
                
                row = Medical_ProductMaster_Details.objects.get(pk=ItemCode)
           
                medical_dict = {
                    "id": row.Item_Id,
                    "ItemName": row.Item_Name,
                    "GenericName": row.Generic_Name,
                    "CompanyName": row.CompanyName,
                    "ProductCategory": row.Product_Category.ProductCategory_Id,
                    "Use_ProductCategory": row.Product_Category.ProductCategory_Name,
                    "SubCategory": row.Product_SubCategory.SubCategory_Id,
                    "Use_SubCategory": row.Product_SubCategory.SubCategoryName,
                    "Strength": row.Strength,
                    "UOM": row.UOM,
                    "HSNCode": row.HSN_Code,
                    "DrugGroup": row.Drug_Group.DrugGroup_Id,
                    "Use_DrugGroup": row.Drug_Group.DrugGroup_Name,
                    "PackingType": row.PackingType.ProductType_Id,
                    "Use_PackingType": row.PackingType.ProductType_Name,
                    "PackingQty": row.PackingQty,
                    "LeastSellableQty": row.LeastSellableQty,
                    "LeastSellablePack": row.LeastSellablePack.ProductType_Id,
                    "Use_LeastSellablePack": row.LeastSellablePack.ProductType_Name,
                    "MinimumQty": row.Minimum_Qantity,
                    "MaximumQty": row.Maximum_Qantity,                    
                    "Remarks": row.Remarks,
                    "IsDistribution": row.IsDistribution,
                    "InActive": row.InActive,
                    }
                    

                return JsonResponse(medical_dict, safe=False)    
        

            else:          

                Medical_ProductMaster_instance = Medical_ProductMaster_Details.objects.all()
                Medical_productArray = []

                for row in Medical_ProductMaster_instance:
                    medical_dict = {
                        "id": row.Item_Id,
                        "ItemName": row.Item_Name,
                        "GenericName": row.Generic_Name,
                        "CompanyName": row.CompanyName,
                        "ProductCategory": row.Product_Category.ProductCategory_Id,
                        "Use_ProductCategory": row.Product_Category.ProductCategory_Name,
                        "SubCategory": row.Product_SubCategory.SubCategory_Id,
                        "Use_SubCategory": row.Product_SubCategory.SubCategoryName,
                        "Strength": row.Strength,
                        "UOM": row.UOM,
                        "HSNCode": row.HSN_Code,
                        "DrugGroup": row.Drug_Group.DrugGroup_Id,
                        "Use_DrugGroup": row.Drug_Group.DrugGroup_Name,
                        "PackingType": row.PackingType.ProductType_Id,
                        "Use_PackingType": row.PackingType.ProductType_Name,
                        "PackingQty": row.PackingQty,
                        "LeastSellableQty": row.LeastSellableQty,
                        "LeastSellablePack": row.LeastSellablePack.ProductType_Id,
                        "Use_LeastSellablePack": row.LeastSellablePack.ProductType_Name,
                        "MinimumQty": row.Minimum_Qantity,
                        "MaximumQty": row.Maximum_Qantity,                    
                        "Remarks": row.Remarks,
                        "IsDistribution": row.IsDistribution,
                        "InActive": row.InActive,
                    }
                    Medical_productArray.append(medical_dict)

                return JsonResponse(Medical_productArray, safe=False)    
        
        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse({'error':'An internal server error occurred'}, status=500)
    
    return JsonResponse({'message': 'Invalid request method'}, status=405)








@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Medical_Stock_InsetLink(request):
    if request.method == "POST":
        try:
            Getfile = request.FILES.get('file')
            print('file', Getfile)

            if Getfile.name.endswith('.csv'):
                df = pd.read_csv(Getfile)
            else:
                return JsonResponse({
                    'error': 'Unsupported file format. Please upload a CSV or Excel file'
                })

            csv_data = df.to_dict(orient='records')

            Medical_Stock_FileUpload.objects.all().delete()

            for row in csv_data:
                for key in row:
                    if pd.isna(row[key]):
                        if isinstance(row[key], str):
                            row[key] = 'None'
                        elif isinstance(row[key], (int, float)):
                            row[key] = None
        
                Medical_Stock_FileUpload.objects.create(
                    Product_Id=row.get('Product_Id', 'None'),
                    Product_Name=row.get('Product_Name', 'None'),
                    Generic_Name=row.get('Generic_Name', 'None'),
                    Available_Qantity=row.get('Available_Qantity', 0),
                    Item_Type = row.get('Item_Type'),
                    Dosage = row.get('Dosage')
                )

            return JsonResponse({'message': 'File uploaded and data inserted successfully'})

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == "GET":
        try:
            medical_stock_data = Medical_Stock_FileUpload.objects.all()
            data = [
                {
                    'id': item.Product_Id,
                    'Product_Name': item.Product_Name,
                    'Generic_Name': item.Generic_Name,
                    'Item_Type':item.Item_Type,
                    'Dosage':item.Dosage,
                    'Available_Qantity': item.Available_Qantity,
                }
                for item in medical_stock_data
            ]
            return JsonResponse(data, safe=False)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

# ----------------------------------------------------------

@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def ProductType_Master_lik(request):
    if request.method=='POST':
        try:
            data=json.loads(request.body)
            # print('000',data)
            ProductTypeID=data.get('ProductTypeID','')
            ProductTypeName=data.get('ProductTypeName')
            created_by=data.get('created_by')
            Statusedit=data.get('Statusedit')

            if ProductTypeID:
                if Statusedit:
                    ProductType_instance=ProductType_Master_Details.objects.get(pk=ProductTypeID)
                    ProductType_instance.Status= not ProductType_instance.Status
                    ProductType_instance.save()
                    return JsonResponse ({'success': 'ProductType Updated successfully'})
                else:
                    if not ProductTypeName:
                        return JsonResponse({'warn': 'ProductType Name are mandatory fields'})
                    if ProductType_Master_Details.objects.filter(ProductType_Name=ProductTypeName).exclude(pk=ProductTypeID).exists():
                        return JsonResponse ({'Warn':f"The ProductType are already present in the name of {ProductTypeName}"})
                    
                    ProductType_instance=ProductType_Master_Details.objects.get(pk=ProductTypeID)
                    ProductType_instance.ProductType_Name=ProductTypeName
                    ProductType_instance.save()

                    return JsonResponse ({'success': 'ProductType Updated successfully'})

            else:
                if not ProductTypeName:
                    return JsonResponse ({'warn': 'ProductType Name are mandatory fields'})
                if ProductType_Master_Details.objects.filter(ProductType_Name=ProductTypeName).exists():
                    return JsonResponse({'warn': f"The ProductType Name are already present in the name of {ProductTypeName}"})
                else:
                    ProductType_instance=ProductType_Master_Details(
                    ProductType_Name= ProductTypeName,
                    Create_by=created_by
                    )
                    ProductType_instance.save()
                    
                    return JsonResponse({'success': 'ProductType saved successfully'})
                    

        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse(f'An error occurred:{str(e)}')
    elif request.method =='GET':
        try:
            ProductType_instance=ProductType_Master_Details.objects.all()

            ProductType_Array=[]

            for row in ProductType_instance:
                ProductType_dic={
                    'id':row.ProductType_Id,
                    'ProductTypeName':row.ProductType_Name,
                    'Status':row.Status
                }
                ProductType_Array.append(ProductType_dic)

            return JsonResponse(ProductType_Array,safe=False)
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse ({'error':'An internal server error occurred'},status=500)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Difine_Tray_For_Medicen(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            Tray_ID = data.get('TrayName')
            ItemCode = data.get('ItemCode')
            created_by = data.get('created_by')

            ItemConfirmed = data.get('ItemConfirmed')
            EditTrayManaID = data.get('EditTrayManaID')
            EditTrayID = data.get('EditTrayID')

            if Tray_ID:
                Tray_Master_instance = Tray_Master_Details.objects.get(pk=Tray_ID)
            else:
                return JsonResponse({'warn': 'TrayName is a mandatory field'})

            if ItemCode:
                Medical_Product_instance = Medical_ProductMaster_Details.objects.get(pk=ItemCode)
            else:
                return JsonResponse({'warn': 'ItemCode and ItemName are mandatory fields'})

            if ItemConfirmed:
                Edit_Tray_management_instance = Tray_management_Details.objects.get(pk=EditTrayManaID)
                
                EditTray_Master_instance = Tray_Master_Details.objects.get(pk=Edit_Tray_management_instance.Tray_Name.Tray_Id)
                EditMedical_Product_instance = Medical_ProductMaster_Details.objects.get(pk=Edit_Tray_management_instance.Item_Name.Item_Id)
                
                Prev_Tray_management_instance = Prev_Tray_management_Details(
                    Prev_Tray_Name=EditTray_Master_instance,
                    Prev_Item_Name=EditMedical_Product_instance,
                    Create_by=Edit_Tray_management_instance.Create_by,
                )

                Prev_Tray_management_instance.save()

                Edit_Tray_management_instance.delete()

                EditTray_Master_instance.Booking_Status = 'Available'
                EditTray_Master_instance.save()

                Tray_management_instance = Tray_management_Details(
                    Tray_Name=Tray_Master_instance,
                    Item_Name=Medical_Product_instance,
                    Create_by=created_by
                )
                Tray_management_instance.save()

                Tray_Master_instance.Booking_Status = 'Occupied'
                Tray_Master_instance.save()

                return JsonResponse({'Success': 'Saved successfully'})
                
            else:
                Tray_management_instance = Tray_management_Details(
                    Tray_Name=Tray_Master_instance,
                    Item_Name=Medical_Product_instance,
                    Create_by=created_by
                )
                Tray_management_instance.save()

                Tray_Master_instance.Booking_Status = 'Occupied'
                Tray_Master_instance.save()

                return JsonResponse({'Success': 'Saved successfully'})

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, safe=False)

    elif request.method == 'GET':
        try:
            
            Tray_management_instance = Tray_management_Details.objects.all()

            Tray_managementArray = []
            for row in Tray_management_instance:
                Tray_dic = {
                    'id': row.Tray_Management_Id,
                    'TrayID': row.Tray_Name.Tray_Id,
                    'Tray_Name': row.Tray_Name.Tray_Name,
                    'ShelfID': row.Tray_Name.Shelf_Name.Shelf_Id,
                    'Shelf_Name': row.Tray_Name.Shelf_Name.Shelf_Name,
                    'RackID': row.Tray_Name.Rack_Name.Rack_Id,
                    'Rack_Name': row.Tray_Name.Rack_Name.Rack_Name,
                    'ItemCode': row.Item_Name.Item_Id,
                    'ItemName': row.Item_Name.Item_Name,
                    'GenericName': row.Item_Name.Generic_Name,
                    'CompanyName': row.Item_Name.CompanyName,
                    'Strength': row.Item_Name.Strength,
                    'UOM': row.Item_Name.UOM,
                    'HSNCode': row.Item_Name.HSN_Code
                }
                Tray_managementArray.append(Tray_dic)

            return JsonResponse(Tray_managementArray, safe=False)

        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, safe=False)




@csrf_exempt
@require_http_methods(["GET"])
def Tray_Management_List_For_Medicen(request):
    if request.method == "GET":
        try:
            tray_status = request.GET.get('TrayStatus')
            rack_name = request.GET.get('RackName')
            shelf_name = request.GET.get('ShelfName')
            tray_name = request.GET.get('TrayName')
            ItemCode=request.GET.get('ItemCode')
            result_data = []
            
            
            Tray_Master_instance = Tray_Master_Details.objects.all()
            
            if tray_status in ['Available', 'Occupied']:
                Tray_Master_instance = Tray_Master_instance.filter(Booking_Status=tray_status,Status=True)
            if tray_status =='InActive':
                Tray_Master_instance = Tray_Master_instance.filter(Status=False)
            if rack_name:
                Tray_Master_instance = Tray_Master_instance.filter(Rack_Name__Rack_Id=rack_name)
            
            if shelf_name:
                Tray_Master_instance = Tray_Master_instance.filter(Shelf_Name__Shelf_Id=shelf_name)
            
            if tray_name:
                Tray_Master_instance = Tray_Master_instance.filter(Tray_Id=tray_name)

            if ItemCode:
                try:
                    tray_management_instance = Tray_management_Details.objects.get(Item_Name__Item_Id=ItemCode)
                    Tray_Master_instance = Tray_Master_instance.filter(Tray_Id=tray_management_instance.Tray_Name.Tray_Id)
                except Tray_management_Details.DoesNotExist:
                    return JsonResponse(result_data, safe=False)

            
            for row in Tray_Master_instance:
                dic = {
                    'id': row.Tray_Id,
                    'Tray_Name': row.Tray_Name,
                    'Shelf_Id': row.Shelf_Name.Shelf_Id,
                    'Shelf_Name': row.Shelf_Name.Shelf_Name,
                    'Rack_Id': row.Rack_Name.Rack_Id,
                    'Rack_Name': row.Rack_Name.Rack_Name,
                    'Status': row.Status,
                    'Booking_Status': row.Booking_Status,
                }
                if row.Booking_Status == 'Occupied':
                    Tray_management_instance = Tray_management_Details.objects.get(Tray_Name__Tray_Id=row.Tray_Id)
                    dic['Item_Code'] = Tray_management_instance.Item_Name.Item_Id
                    dic['Item_Name'] = Tray_management_instance.Item_Name.Item_Name
                    dic['Tray_Management_Id'] = Tray_management_instance.Tray_Management_Id
                else:
                    dic['Item_Code'] = ''
                    dic['Item_Name'] = ''

                result_data.append(dic)

            return JsonResponse(result_data, safe=False)
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': str(e)}, safe=False, status=500)


# -------------------------------------------


def validate_and_process_file(file):    
        
        def get_file_type(file):
            if file.startswith('data:application/pdf;base64'):
                return 'application/pdf'
            elif file.startswith('data:image/jpeg;base64') or file.startswith('data:image/jpg;base64'):
                return 'image/jpeg'
            elif file.startswith('data:image/png;base64'):
                return 'image/png'
            else:
                return 'unknown'

        def compress_image(image, min_quality=10, step=5):
            output = BytesIO()
            quality = 95
            compressed_data = None
            while quality >= min_quality:
                output.seek(0)
                image.save(output, format='JPEG', quality=quality)
                compressed_data = output.getvalue()
                quality -= step
            output.seek(0)
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        def compress_pdf(file):
            output = BytesIO()
            reader = PdfReader(file)
            writer = PdfWriter()
            for page_num in range(len(reader.pages)):
                writer.add_page(reader.pages[page_num])
            writer.write(output)
            compressed_data = output.getvalue()
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        if file:
            file_data = file.split(',')[1]
            file_content = base64.b64decode(file_data)
            file_size = len(file_content)
            
            max_size_mb = 5

            if file_size > max_size_mb * 1024 * 1024:
                print('maximum mb')
                return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'})

            file_type = get_file_type(file)
            
            if file_type == 'image/jpeg' or file_type == 'image/png':
                try:
                    image = Image.open(BytesIO(file_content))
                    if image.mode in ('RGBA', 'P'):
                        image = image.convert('RGB')
                    compressed_image_data, compressed_size = compress_image(image)
                    return compressed_image_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing image: {str(e)}'})

            elif file_type == 'application/pdf':
                try:
                    compressed_pdf_data, compressed_size = compress_pdf(BytesIO(file_content))

                    return compressed_pdf_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing PDF: {str(e)}'})

            else:
                return JsonResponse({'warn': 'Unsupported file format'})

        return None




@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Supplier_Master_Link(request):
    if request.method == 'POST':
        try:
            
            supplier_master = request.POST.get('SupplierMaster')
            supplier_bank = request.POST.get('SupplierBank')
            select_product_array = request.POST.get('SelectProductArray')
            created_by = request.POST.get('created_by')
            
            
            supplier_master = json.loads(supplier_master)
            supplier_bank = json.loads(supplier_bank)
            select_product_array = json.loads(select_product_array)
            
            
            file_attachment = request.POST.get('FileAttachment')
            

            if file_attachment:
                Supp_file= file_attachment 
                convertFile=validate_and_process_file(Supp_file)
            else:
                convertFile=None

            
            PreferredSupplier= True if supplier_master.get('PreferredSupplier') == True else False
            
            Inactivecheck= True if supplier_master.get('InActive') == True else False

            if supplier_master.get('SupplierId'):

                if Supplier_Master_Details.objects.filter(Supplier_Name=supplier_master.get('SupplierName')).exclude(pk=supplier_master.get('SupplierId')).exists():

                    return JsonResponse({'warn': f"The Supplier Name are already present in the name of {supplier_master.get('SupplierName')}"})
            
                Supplier_Master_insta = Supplier_Master_Details.objects.get(pk=supplier_master.get('SupplierId'))

                Supplier_Master_insta.Supplier_Name = supplier_master.get('SupplierName')
                Supplier_Master_insta.Supplier_Type = supplier_master.get('SupplierType')
                Supplier_Master_insta.Contact_Persion = supplier_master.get('ContactPersion')
                Supplier_Master_insta.Contact_Number = supplier_master.get('ContactNumber')
                Supplier_Master_insta.Email_Address = supplier_master.get('EmailAddress')
                Supplier_Master_insta.Address = supplier_master.get('Address')
                Supplier_Master_insta.Registration_Number = supplier_master.get('RegistrationNumber')
                Supplier_Master_insta.GST_Number = supplier_master.get('GSTNumber')
                Supplier_Master_insta.PAN_Number = supplier_master.get('PANNumber')
                Supplier_Master_insta.Payment_Terms = supplier_master.get('PaymentTerms')
                Supplier_Master_insta.Credit_Limit = supplier_master.get('CreditLimit')
                Supplier_Master_insta.LeadTime = supplier_master.get('LeadTime')
                Supplier_Master_insta.Preferred_Supplier = PreferredSupplier
                Supplier_Master_insta.InActive = Inactivecheck
                Supplier_Master_insta.Notes = supplier_master.get('Notes')
                Supplier_Master_insta.Payment_Mode = supplier_master.get('PaymentMode')
                Supplier_Master_insta.File_Attachment = convertFile
                Supplier_Master_insta.Create_by = created_by

                Supplier_Master_insta.save()

                if supplier_master.get('PaymentMode') =='Online':
                    Supplier_Bank_ins=Supplier_Bank_Details.objects.filter(Supplier_Name__Supplier_Id=supplier_master.get('SupplierId')).first()
                    
                    Supplier_Bank_ins.Supplier_Name= Supplier_Master_insta
                    Supplier_Bank_ins.Bank_Name= supplier_bank.get('BankName')
                    Supplier_Bank_ins.Account_Number= supplier_bank.get('AccountNumber')
                    Supplier_Bank_ins.IFSCCode= supplier_bank.get('IFSCCode')
                    Supplier_Bank_ins.BankBranch=supplier_bank.get('BankBranch')
                    Supplier_Bank_ins.create_by=created_by

                    Supplier_Bank_ins.save()

                # Supplier_Product_Details.objects.filter(Product_Supplier_Name__Supplier_Id=supplier_master.get('SupplierId')).delete()

                for row in select_product_array:
                    SupplierPoductId= row.get('SupplierPoductId')
                    ItemCode=row.get('ItemCode')
                    PackType=int(row.get('MinimumPurchasePack'))

                    print('row----',row)
                    
                    Medical_Product_insta=Medical_ProductMaster_Details.objects.get(pk=ItemCode)
                    ProductType_inst=ProductType_Master_Details.objects.get(pk=PackType)
                    
                    if SupplierPoductId:
                        Supplier_Product_instance=Supplier_Product_Details.objects.get(pk=SupplierPoductId)
                        Supplier_Product_instance.Prev_PurchaseRateBeforeGST=Supplier_Product_instance.PurchaseRateBeforeGST
                        Supplier_Product_instance.Prev_GST=Supplier_Product_instance.GST
                        Supplier_Product_instance.Prev_PurchaseRateAfterGST=Supplier_Product_instance.PurchaseRateAfterGST  
                        Supplier_Product_instance.Minimum_Purchase_Pack=ProductType_inst
                        Supplier_Product_instance.Minimum_Purchase_Qty=row.get('MinimumPurchaseQty')
                        Supplier_Product_instance.PurchaseRateBeforeGST=row.get('PurchaseRateBeforeGST')
                        Supplier_Product_instance.GST=row.get('GST')
                        Supplier_Product_instance.PurchaseRateAfterGST=row.get('PurchaseRateAfterGST')
                        Supplier_Product_instance.MRP=row.get('MRP')
                        Supplier_Product_instance.Create_by=created_by
                        Supplier_Product_instance.Purchase_Product_Status=row.get('InActive') if row.get('InActive') else False
                        Supplier_Product_instance.save()
                    else: 
                        
                        Supplier_Product_Details.objects.create(
                        Product_Supplier_Name=Supplier_Master_insta,
                        Supplier_Product_Name=Medical_Product_insta,
                        Minimum_Purchase_Pack=ProductType_inst,
                        Minimum_Purchase_Qty=row.get('MinimumPurchaseQty'),
                        PurchaseRateBeforeGST=row.get('PurchaseRateBeforeGST'),
                        GST=row.get('GST'),
                        PurchaseRateAfterGST=row.get('PurchaseRateAfterGST'),
                        MRP=row.get('MRP'),
                        Purchase_Product_Status=row.get('InActive') if row.get('InActive') else False,
                        Create_by=created_by
                        )
                return JsonResponse ({'success': 'Supplier Master Updated successfully'})
            else:
                if Supplier_Master_Details.objects.filter(Supplier_Name=supplier_master.get('SupplierName')).exists():
                    return JsonResponse({'warn': f"The Supplier Name are already present in the name of {supplier_master.get('SupplierName')}"})
            
                Supplier_Master_insta=Supplier_Master_Details.objects.create(
                    Supplier_Name=supplier_master.get('SupplierName'),
                    Supplier_Type=supplier_master.get('SupplierType'),
                    Contact_Persion=supplier_master.get('ContactPersion'),
                    Contact_Number=supplier_master.get('ContactNumber'),
                    Email_Address=supplier_master.get('EmailAddress'),
                    Address=supplier_master.get('Address'),
                    Registration_Number=supplier_master.get('RegistrationNumber'),
                    GST_Number=supplier_master.get('GSTNumber'),
                    PAN_Number=supplier_master.get('PANNumber'),
                    Payment_Terms=supplier_master.get('PaymentTerms'),
                    Credit_Limit=supplier_master.get('CreditLimit'),
                    LeadTime=supplier_master.get('LeadTime'),
                    Preferred_Supplier=PreferredSupplier,
                    InActive=Inactivecheck,
                    Notes=supplier_master.get('Notes'),
                    Payment_Mode=supplier_master.get('PaymentMode'),
                    File_Attachment=convertFile,
                    Create_by=created_by,
                )

                # print(Supplier_Master_insta.Supplier_Id)
                if supplier_master.get('PaymentMode') =='Online':
                    Supplier_Bank_Details.objects.create(
                    Supplier_Name= Supplier_Master_insta,
                    Bank_Name= supplier_bank.get('BankName'),
                    Account_Number= supplier_bank.get('AccountNumber'),
                    IFSCCode= supplier_bank.get('IFSCCode'),
                    BankBranch=supplier_bank.get('BankBranch'),
                    create_by=created_by
                    )

                for row in select_product_array:
                    # print(row,'ooooo')
                    ItemCode=row.get('ItemCode')
                    PackType=int(row.get('MinimumPurchasePack'))

                    Medical_Product_insta=Medical_ProductMaster_Details.objects.get(pk=ItemCode)
                    ProductType_inst=ProductType_Master_Details.objects.get(pk=PackType)
                    
                    Supplier_Product_Details.objects.create(
                    Product_Supplier_Name=Supplier_Master_insta,
                    Supplier_Product_Name=Medical_Product_insta,
                    Minimum_Purchase_Pack=ProductType_inst,
                    Minimum_Purchase_Qty=row.get('MinimumPurchaseQty'),
                    PurchaseRateBeforeGST=row.get('PurchaseRateBeforeGST'),
                    GST=row.get('GST'),
                    PurchaseRateAfterGST=row.get('PurchaseRateAfterGST'),
                    MRP=row.get('MRP'),
                    Purchase_Product_Status=row.get('InActive') if row.get('InActive') else False,
                    Create_by=created_by
                    )

                

                return JsonResponse({'success': 'Data received successfully'}, status=200)
        
        except Exception as e:
            print(f'An error Occurred: {str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500, safe=False)

    if request.method == 'GET':
        try:
            SupplierId = request.GET.get('SupplierId')
            print('SupplierId-----',SupplierId)
            if SupplierId:
                Supplier_Master_instance=Supplier_Master_Details.objects.get(pk=SupplierId)
                dic={
                        'id':Supplier_Master_instance.Supplier_Id,
                        'SupplierName':Supplier_Master_instance.Supplier_Name,
                        'SupplierType':Supplier_Master_instance.Supplier_Type,
                        'ContactPersion':Supplier_Master_instance.Contact_Persion,
                        'ContactNumber':Supplier_Master_instance.Contact_Number,
                        'EmailAddress':Supplier_Master_instance.Email_Address,
                        'Address':Supplier_Master_instance.Address,
                        'RegistrationNumber':Supplier_Master_instance.Registration_Number,
                        'GSTNumber':Supplier_Master_instance.GST_Number,
                        'PANNumber':Supplier_Master_instance.PAN_Number,
                        'PaymentTerms':Supplier_Master_instance.Payment_Terms,
                        'CreditLimit':Supplier_Master_instance.Credit_Limit,
                        'LeadTime':Supplier_Master_instance.LeadTime,
                        'PreferredSupplier':Supplier_Master_instance.Preferred_Supplier,
                        'InActive':Supplier_Master_instance.InActive,
                        'Notes':Supplier_Master_instance.Notes,
                        'PaymentMode':Supplier_Master_instance.Payment_Mode,
                    }

                return JsonResponse(dic,safe=False)
            else:
                Supplier_Master_instance=Supplier_Master_Details.objects.all()

                Supplier_Array=[]

                def get_file_image(filedata):
                        mime = magic.Magic()
                        contenttype = mime.from_buffer(filedata).split(',')[0]
                        # print('contenttype :',contenttype)
                        contenttype1 = 'application/pdf'
                        if contenttype == 'application/pdf':
                            contenttype1 = 'application/pdf'
                        elif contenttype == 'JPEG image data':
                            contenttype1 = 'image/jpeg'
                        elif contenttype == 'PNG image data':
                            contenttype1 = 'image/png'
                    
                        
                        return f"data:{contenttype1};base64,{base64.b64encode(filedata).decode('utf-8')}"

                for row in Supplier_Master_instance:
                    dic={
                        'id':row.Supplier_Id,
                        'SupplierName':row.Supplier_Name,
                        'SupplierType':row.Supplier_Type,
                        'ContactPersion':row.Contact_Persion,
                        'ContactNumber':row.Contact_Number,
                        'EmailAddress':row.Email_Address,
                        'Address':row.Address,
                        'RegistrationNumber':row.Registration_Number,
                        'GSTNumber':row.GST_Number,
                        'PANNumber':row.PAN_Number,
                        'PaymentTerms':row.Payment_Terms,
                        'CreditLimit':row.Credit_Limit,
                        'LeadTime':row.LeadTime,
                        'PreferredSupplier':row.Preferred_Supplier,
                        'InActive':row.InActive,
                        'Notes':row.Notes,
                        'PaymentMode':row.Payment_Mode,
                        'FileAttachment':get_file_image(row.File_Attachment) if row.File_Attachment else None,
                    }
                    
                    Supplier_Product_instance=Supplier_Product_Details.objects.filter(Product_Supplier_Name__Supplier_Id=row.Supplier_Id)

                    item_Array=[]

                    for item in Supplier_Product_instance:
                        item_dic={
                            'id':len(item_Array) + 1,
                            'SupplierPoductId':item.S_No,
                            'ItemCode':item.Supplier_Product_Name.Item_Id,
                            'ItemName':item.Supplier_Product_Name.Item_Name,
                            'GenericName':item.Supplier_Product_Name.Generic_Name,
                            'CompanyName':item.Supplier_Product_Name.CompanyName,
                            'ProductCategories':item.Supplier_Product_Name.Product_Category.ProductCategory_Name,
                            'SubCategory':item.Supplier_Product_Name.Product_SubCategory.SubCategoryName,
                            'Strength':item.Supplier_Product_Name.Strength,
                            'UOM':item.Supplier_Product_Name.UOM,
                            'HSNCode':item.Supplier_Product_Name.HSN_Code,
                            'MinimumPurchasePack':item.Minimum_Purchase_Pack.ProductType_Id,
                            'PackName':item.Minimum_Purchase_Pack.ProductType_Name,
                            'MinimumPurchaseQty':item.Minimum_Purchase_Qty,
                            'PurchaseRateBeforeGST':item.PurchaseRateBeforeGST,
                            'GST':item.GST,
                            'PurchaseRateAfterGST':item.PurchaseRateAfterGST,
                            'MRP':item.MRP,
                            'Prev_PurchaseRateBeforeGST':item.Prev_PurchaseRateBeforeGST,
                            'Prev_GST':item.Prev_GST,
                            'Prev_PurchaseRateAfterGST':item.Prev_PurchaseRateAfterGST,
                            'Prev_MRP':item.Prev_MRP,
                            'InActive':item.Purchase_Product_Status,
                        }
                        item_Array.append(item_dic)
                    
                    dic['Item_details']=item_Array

                    if row.Payment_Mode =='Online':

                        Supplier_Bank_instance=Supplier_Bank_Details.objects.filter(Supplier_Name__Supplier_Id=row.Supplier_Id)
                        bank_Array=[]
                        if Supplier_Bank_instance:
                            
                            for Bank in Supplier_Bank_instance:
                                bankdic={
                                    'id':Bank.Supplier_Bank_id,
                                    'BankName':Bank.Bank_Name,
                                    'AccountNumber':Bank.Account_Number,
                                    'IFSCCode':Bank.IFSCCode,
                                    'BankBranch':Bank.BankBranch,
                                }
                                bank_Array.append(bankdic)
                            
                            dic['Bank_Details']=bank_Array
                        else:
                            dic['Bank_Details']=[]
                    else:
                        dic['Bank_Details']=[]


                    Supplier_Array.append(dic)



                return JsonResponse (Supplier_Array,safe=False)
        
        except Exception as e:
            print(f'An error occured:{str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)