from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from Masters.models import * 
from Inventory.models import *
from django.db.models import Q
import pandas as pd
from io import BytesIO
from PIL import Image
import base64
from PyPDF2 import PdfReader, PdfWriter
import magic






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
@require_http_methods(["GET"])
def ClinicAddress_Link(request):
    if request.method == 'GET':
        try:
            clinics = Clinic_Detials.objects.all()
            
            
            clinic_data = []
            for clinic in clinics:
                merged_address = f"{clinic.Clinic_DoorNo}, {clinic.Clinic_Street}, {clinic.Clinic_Area}, {clinic.Clinic_City}, {clinic.Clinic_State}, {clinic.Clinic_Country}, {clinic.Clinic_Pincode}, {clinic.Clinic_PhoneNo}"
                
                clinic_dict = {
                    'id': clinic.Clinic_Id,
                    'location': clinic.Location.Location_Id,
                    'locationName': clinic.Location.Location_Name,
                    'created_by': clinic.created_by,
                    'Mail': clinic.Clinic_Mail,
                    'PhoneNo': clinic.Clinic_PhoneNo,
                    'LandlineNo': clinic.Clinic_LandlineNo,
                    'GSTNo': clinic.Clinic_GstNo,
                    'Address': merged_address, 
                }
                
                clinic_data.append(clinic_dict)
            
            return JsonResponse(clinic_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)



# -------------------------------------------------------------

@csrf_exempt
@require_http_methods(["POST","OPTIONS","GET"])
def PurchaseOrder_Link(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # print('dataaaaaa',data)

            SupplierId=data.get('SupplierId')
            OrderDate=data.get('OrderDate')
            DeliveryDate=data.get('DeliveryDate')
            BillingLocation=data.get('BillingLocation')
            ShippingLocation=data.get('ShippingLocation')
            TotalOrderValue=data.get('TotalOrderValue')
            Create_by=data.get('Create_by')
            SelectItemlist=data.get('SelectItemlist')
            PurchaseOrderNumber=data.get('PurchaseOrderNumber')

            EditStatus=data.get('EditStatus')


            if SupplierId:
                Supplier_Instance=Supplier_Master_Details.objects.get(pk=SupplierId)
            if BillingLocation:
                BillingLocation_instance=Location_Detials.objects.get(pk=BillingLocation)
                BillingLocation_Address_instance=Clinic_Detials.objects.get(Location__Location_Id=BillingLocation)
            if ShippingLocation:
                ShippingLocation_instance=Location_Detials.objects.get(pk=ShippingLocation)
                ShippingLocation_Address_instance=Clinic_Detials.objects.get(Location__Location_Id=ShippingLocation)

            if EditStatus:
                PO_Edit_instance=Purchase_Order_Details.objects.get(pk=PurchaseOrderNumber)
                PO_Edit_instance.PO_Status=EditStatus
                PO_Edit_instance.save()

                Purchase_Order_Items = Purchase_Order_Item_Details.objects.filter(PurchaseOrder=PO_Edit_instance)
    
                for item in Purchase_Order_Items:
                    item.Item_Status = EditStatus
                    item.save() 

                return JsonResponse ({'success': 'Purchase Order Approved successfully'})      


            elif PurchaseOrderNumber:
                PO_Edit_instance=Purchase_Order_Details.objects.get(pk=PurchaseOrderNumber)
                PO_Edit_instance.Supplier_Id=Supplier_Instance
                PO_Edit_instance.Order_Date=OrderDate
                PO_Edit_instance.Delivery_Date=DeliveryDate
                PO_Edit_instance.Billing_Location=BillingLocation_instance
                PO_Edit_instance.Billing_Address=BillingLocation_Address_instance
                PO_Edit_instance.Shipping_Location=ShippingLocation_instance
                PO_Edit_instance.Shipping_Address=ShippingLocation_Address_instance
                PO_Edit_instance.Total_Order_Value=TotalOrderValue
                PO_Edit_instance.Create_by=Create_by
                PO_Edit_instance.save()

                Purchase_Order_Item_Details.objects.filter(PurchaseOrder__PurchaseOrder_Number=PurchaseOrderNumber).delete()
                
                for row in SelectItemlist:
                    ItemCode=row.get('ItemCode')
                    Supplier_Product_instance=Supplier_Product_Details.objects.get(Product_Supplier_Name=Supplier_Instance,Supplier_Product_Name__Item_Id=ItemCode)

                    Purchase_Order_Item_Details.objects.create(
                        PurchaseOrder=PO_Edit_instance,
                        PO_Item_Id=Supplier_Product_instance,
                        PO_Order_Qty=row.get('PurchaseQty'),
                        TotalAmount=row.get('TotalAmount'),
                        Balance_Qty=row.get('PurchaseQty'),
                        Create_by=Create_by,
                    )
                return JsonResponse ({'success': 'Purchase Order Detials Update successfully'})      

            else:

                Purchase_Order_istance=Purchase_Order_Details.objects.create(
                    Supplier_Id=Supplier_Instance,
                    Order_Date=OrderDate,
                    Delivery_Date=DeliveryDate,
                    Billing_Location=BillingLocation_instance,
                    Billing_Address=BillingLocation_Address_instance,
                    Shipping_Location=ShippingLocation_instance,
                    Shipping_Address=ShippingLocation_Address_instance,
                    Total_Order_Value=TotalOrderValue,
                    Create_by=Create_by,
                    )
                
                for row in SelectItemlist:
                    ItemCode=row.get('ItemCode')
                    Supplier_Product_instance=Supplier_Product_Details.objects.get(Product_Supplier_Name=Supplier_Instance,Supplier_Product_Name__Item_Id=ItemCode)

                    Purchase_Order_Item_Details.objects.create(
                        PurchaseOrder=Purchase_Order_istance,
                        PO_Item_Id=Supplier_Product_instance,
                        PO_Order_Qty=row.get('PurchaseQty'),
                        TotalAmount=row.get('TotalAmount'),
                        Balance_Qty=row.get('PurchaseQty'),
                        Create_by=Create_by,
                    )


                return JsonResponse ({'success': 'Purchase Order Detials added successfully'})      
        
        except Exception as e:
            print(f'An error occurred:{str(e)}')
            return JsonResponse (f'An error occurred:{str(e)}')

    elif request.method == "GET":
        try:
            
            Purchase_Order_instance=Purchase_Order_Details.objects.all()

            PO_Array=[]

            for row in Purchase_Order_instance:

                PO_dic={
                    'id':row.PurchaseOrder_Number,
                    'SupplierId':row.Supplier_Id.Supplier_Id,
                    'SupplierName':row.Supplier_Id.Supplier_Name,
                    'SupplierMailId':row.Supplier_Id.Email_Address,
                    'SupplierContactNumber':row.Supplier_Id.Contact_Number,
                    'SupplierContactPersion':row.Supplier_Id.Contact_Persion,
                    'OrderDate':row.Order_Date,
                    'DeliveryDate':row.Delivery_Date,
                    'BillingLocation':row.Billing_Location.Location_Id,
                    'Use_BillingLocation':row.Billing_Location.Location_Name,
                    'ShippingLocation':row.Shipping_Location.Location_Id,
                    'Use_ShippingLocation':row.Shipping_Location.Location_Name,
                    'TotalOrderValue':row.Total_Order_Value,
                    'PO_Status':row.PO_Status,
                }

                Item_instance=Purchase_Order_Item_Details.objects.filter(PurchaseOrder__PurchaseOrder_Number=row.PurchaseOrder_Number)
                
                Item_Array=[]

                for item in Item_instance:

                    item_dic={
                        'id':item.PO_Item_Number,
                        'ItemCode':item.PO_Item_Id.Supplier_Product_Name.Item_Id,
                        'ItemName':item.PO_Item_Id.Supplier_Product_Name.Item_Name,
                        'GenericName':item.PO_Item_Id.Supplier_Product_Name.Generic_Name,
                        'CompanyName':item.PO_Item_Id.Supplier_Product_Name.CompanyName,
                        'ProductCategories':item.PO_Item_Id.Supplier_Product_Name.Product_Category.ProductCategory_Name,
                        'SubCategory':item.PO_Item_Id.Supplier_Product_Name.Product_SubCategory.SubCategoryName,
                        'Strength':item.PO_Item_Id.Supplier_Product_Name.Strength,
                        'UOM':item.PO_Item_Id.Supplier_Product_Name.UOM,
                        'HSNCode':item.PO_Item_Id.Supplier_Product_Name.HSN_Code,
                        'PurchasePack':item.PO_Item_Id.Minimum_Purchase_Pack.ProductType_Name,
                        'MinimumPurchaseQty':item.PO_Item_Id.Minimum_Purchase_Qty,
                        'MRP':item.PO_Item_Id.MRP,
                        'PurchaseRateBeforeGST':item.PO_Item_Id.PurchaseRateBeforeGST,
                        'GST':item.PO_Item_Id.GST,
                        'PurchaseRateAfterGST':item.PO_Item_Id.PurchaseRateAfterGST,
                        'PurchaseQty':item.PO_Order_Qty,
                        'TotalAmount':item.TotalAmount,
                        'Item_Status':item.Item_Status,
                        'Reason':item.Reason,                        
                        'Received_Qty':item.Received_Qty,
                        'Balance_Qty':item.Balance_Qty,
                    }

                    Item_Array.append(item_dic)

                PO_dic['Item_Details']=Item_Array


                PO_Array.append(PO_dic)

            return JsonResponse(PO_Array,safe=False)        
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse (f'An error occurred: {str(e)}')



# ------------------


@csrf_exempt
@require_http_methods(["GET"])
def PurchaseOrder_Report_Details(request):
    if request.method == 'GET':
        try:
            StatusCheck = request.GET.get('StatusCheck')
            DateType = request.GET.get('DateType')
            CurrentDate = request.GET.get('CurrentDate')
            FromDate = request.GET.get('FromDate')
            ToDate = request.GET.get('ToDate')
            SupplierId = request.GET.get('SupplierId')
            BillingLocation = request.GET.get('BillingLocation')
            ShippingLocation = request.GET.get('ShippingLocation')

            
            # Debugging output
            # print('StatusCheck:', StatusCheck)
            # print('DateType:', DateType)
            # print('CurrentDate:', CurrentDate)
            # print('FromDate:', FromDate)
            # print('ToDate:', ToDate)
            # print('SupplierId:', SupplierId)
            # print('BillingLocation:', BillingLocation)
            # print('ShippingLocation:', ShippingLocation)

            Purchase_Order_instance = Purchase_Order_Details.objects.all()

            
            if StatusCheck:
                Purchase_Order_instance = Purchase_Order_instance.filter(PO_Status=StatusCheck)
            
            if SupplierId:
                Purchase_Order_instance = Purchase_Order_instance.filter(Supplier_Id=SupplierId)
            
            if BillingLocation:                
                    Purchase_Order_instance = Purchase_Order_instance.filter(Billing_Location__Location_Id=BillingLocation)
            
            if ShippingLocation:                
                    Purchase_Order_instance = Purchase_Order_instance.filter(Shipping_Location__Location_Id=ShippingLocation)
            
            if DateType == 'CurrentDate' and CurrentDate:                
                    Purchase_Order_instance = Purchase_Order_instance.filter(Order_Date=CurrentDate)
            
            if DateType == 'Customize' and FromDate and ToDate:
                Purchase_Order_instance = Purchase_Order_instance.filter(
                    Q(Order_Date__range=[FromDate, ToDate]) | Q(Order_Date__range=[FromDate, ToDate])
            )

            PO_Array = []

            for row in Purchase_Order_instance:
                PO_dic = {
                    'id': row.PurchaseOrder_Number,
                    'SupplierId': row.Supplier_Id.Supplier_Id,
                    'SupplierName': row.Supplier_Id.Supplier_Name,
                    'SupplierMailId': row.Supplier_Id.Email_Address,
                    'SupplierContactNumber': row.Supplier_Id.Contact_Number,
                    'SupplierContactPersion': row.Supplier_Id.Contact_Persion,
                    'OrderDate': row.Order_Date,
                    'DeliveryDate': row.Delivery_Date,
                    'BillingLocation': row.Billing_Location.Location_Id,
                    'Use_BillingLocation': row.Billing_Location.Location_Name,
                    'ShippingLocation': row.Shipping_Location.Location_Id,
                    'Use_ShippingLocation': row.Shipping_Location.Location_Name,
                    'TotalOrderValue': row.Total_Order_Value,
                    'PO_Status': row.PO_Status,

                }

                Item_instance = Purchase_Order_Item_Details.objects.filter(PurchaseOrder__PurchaseOrder_Number=row.PurchaseOrder_Number)
                
                Item_Array = []
                for item in Item_instance:
                    item_dic = {
                        'id': item.PO_Item_Number,
                        'ItemCode': item.PO_Item_Id.Supplier_Product_Name.Item_Id,
                        'ItemName': item.PO_Item_Id.Supplier_Product_Name.Item_Name,
                        'GenericName': item.PO_Item_Id.Supplier_Product_Name.Generic_Name,
                        'CompanyName': item.PO_Item_Id.Supplier_Product_Name.CompanyName,
                        'ProductCategories': item.PO_Item_Id.Supplier_Product_Name.Product_Category.ProductCategory_Name,
                        'SubCategory': item.PO_Item_Id.Supplier_Product_Name.Product_SubCategory.SubCategoryName,
                        'Strength': item.PO_Item_Id.Supplier_Product_Name.Strength,
                        'UOM': item.PO_Item_Id.Supplier_Product_Name.UOM,
                        'HSNCode': item.PO_Item_Id.Supplier_Product_Name.HSN_Code,
                        'PurchasePack': item.PO_Item_Id.Minimum_Purchase_Pack.ProductType_Name,
                        'MinimumPurchaseQty': item.PO_Item_Id.Minimum_Purchase_Qty,
                        'MRP': item.PO_Item_Id.MRP,
                        'PurchaseRateBeforeGST': item.PO_Item_Id.PurchaseRateBeforeGST,
                        'GST': item.PO_Item_Id.GST,
                        'PurchaseRateAfterGST': item.PO_Item_Id.PurchaseRateAfterGST,
                        'PurchaseQty': item.PO_Order_Qty,
                        'TotalAmount': item.TotalAmount,
                        'Item_Status': item.Item_Status,
                        'Reason': item.Reason,                                    
                        'Received_Qty':item.Received_Qty,
                        'Balance_Qty':item.Balance_Qty,
                    }
                    Item_Array.append(item_dic)

                PO_dic['Item_Details'] = Item_Array
                PO_Array.append(PO_dic)

            PO_Array.reverse()

            return JsonResponse(PO_Array, safe=False)
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)
        

from datetime import datetime

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def GRN_Data_Insert_Link(request):
    if request.method == "POST":
        try:
            GRNState = json.loads(request.POST.get('GRNState'))
            GRNItemlist = json.loads(request.POST.get('GRNItemlist'))
            Amountstate = json.loads(request.POST.get('Amountstate'))
            BillDiscountMethod = request.POST.get('BillDiscountMethod')
            Created_by = request.POST.get('Created_by')

            file_attachment = request.POST.get('SupplierBillfile')
            print('convertFile',file_attachment,type(file_attachment))

            convertFile = None
            if file_attachment:
                convertFile = validate_and_process_file(file_attachment)

            print('convertFile',convertFile,type(convertFile))

            # Example of how to access values from the parsed GRNState dictionary
            PONumber = GRNState.get('PONumber')
            if PONumber:
                Purchase_Order_instance=Purchase_Order_Details.objects.get(pk=PONumber)

            SupplierCode = GRNState.get('SupplierCode')

            if SupplierCode:
                Supplier_Master_instance=Supplier_Master_Details.objects.get(pk=SupplierCode)
            
            GRNLocation=GRNState.get('GRNLocation')
            if GRNLocation:
                Location_Detials_Instance=Location_Detials.objects.get(pk=GRNLocation)
            
            Supplier_BillDate=GRNState.get('SupplierBillDate')
            Supplier_BillDueDate=GRNState.get('SupplierBillDueDate')

            print('Supplier_BillDate',Supplier_BillDate,type(Supplier_BillDate))
            print('Supplier_BillDueDate',Supplier_BillDueDate,type(Supplier_BillDate))

            Supplier_BillDate = datetime.strptime(Supplier_BillDate, '%Y-%m-%d').date()

            Supplier_BillDueDate = datetime.strptime(Supplier_BillDueDate, '%Y-%m-%d').date()

            Grn_Instance=GRN_Entry_Details.objects.create(
                PO_Number=Purchase_Order_instance,
                Supplier_Id=Supplier_Master_instance,  
                Supplier_BillNumber=GRNState.get('SupplierBillNumber'),
                Supplier_BillDate=Supplier_BillDate,
                Supplier_BillDueDate=Supplier_BillDueDate,
                Supplier_BillAmount=GRNState.get('SupplierBillAmount'),
                GRNLocation=Location_Detials_Instance,
                ReceivingPersion=GRNState.get('ReceivingPersonName'),
                GRNFile_Attachment=convertFile if convertFile else None,
                TaxableTotalAmount=Amountstate.get('TaxableTotal'),
                TaxTotalAmount=Amountstate.get('TaxTotal'),
                TotalAmount=Amountstate.get('TotalAmount'),
                TotalDiscountMethod=Amountstate.get('TotalDiscountMethod'),
                TotalDiscountType=Amountstate.get('TotalDiscountType'),
                TotalDiscountValue=int(Amountstate.get('TotalDiscount', 0) or 0),
                FinalTaxableTotal=Amountstate.get('FinalTaxableTotal'),
                FinalTaxTotal=Amountstate.get('FinalTaxTotal'),
                FinalTotalAmount=Amountstate.get('FinalTotalAmount'),
                RountOff=Amountstate.get('RoundOff'),
                NetAmount=Amountstate.get('NetAmount'),
                BillDiscountMethod=BillDiscountMethod,
                Create_by=Created_by
            )


            for item in GRNItemlist:

                Medical_ProductMaster_insta=Medical_ProductMaster_Details.objects.get(pk=item['ItemCode'])
                
                
                GRN_Items_Entry_Details.objects.create(
                    GRN_Number_id=Grn_Instance, 
                    GRN_Item_Id=Medical_ProductMaster_insta,
                    Pack_MRP=item['PackMRP'],
                    GRN_Rate_Per_Pack_Taxable=item['PurchaseRatePerPackTaxable'],
                    Tax_Type=item['TaxType'],
                    Tax_Percentage=item['TaxPercentage'],
                    GRN_Rate_Per_Pack=item['PurchaseRatePerPack'],
                    Order_Qty=item['OrderQty'],
                    Bill_Qty=item['BillQty'],
                    Received_Qty=item['ReceivedQty'],
                    Pending_Qty=item['PendingQty'],
                    Total_Sellable_Qty=item['TotalSellableQty'],
                    Sellable_Qty_MRP=item['SellableQtyMRP'],
                    Pack_Total_Taxable_Amount=item['TotalPackTaxableAmount'],
                    Total_Tax_Amount=item['TotalTaxAmount'],
                    Pack_Total_Amount=item['TotalPackAmount'],
                    BatchNo=item['BatchNo'],
                    Manufacture_Date=item.get('ManufactureDate', None),
                    Expiry_Date=item.get('ExpiryDate', None),
                    Discount_Method=item.get('DiscountMethod', ''),
                    Discount_Type=item.get('DiscountType', ''),
                    Discount_Value=int(item.get('Discount', 0) or 0),
                    FinalTotalPackTaxableAmount=item['FinalTotalPackTaxableAmount'],
                    FinalTotalTaxAmount=item['FinalTotalTaxAmount'],
                    FinalTotalPackAmount=item['FinalTotalPackAmount']
                )
            Purchase_Order_instance.PO_Status ='GRN Compleated'
            Purchase_Order_instance.save()

            return JsonResponse({'success': 'GRN Save successfully'})
        
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)


