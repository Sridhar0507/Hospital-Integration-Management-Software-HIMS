from django.db import models
from django.db.models import Max
from django.core.exceptions import ValidationError
from Masters.models import *


class Purchase_Order_Details(models.Model):
    PurchaseOrder_Number=models.CharField(primary_key=True,max_length=20)
    Supplier_Id=models.ForeignKey(Supplier_Master_Details,on_delete=models.CASCADE,related_name='PO_SupplierID')
    Order_Date=models.DateField()
    Delivery_Date=models.DateField()
    Billing_Location=models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='PO_BillLocation')
    Billing_Address=models.ForeignKey(Clinic_Detials,on_delete=models.CASCADE,related_name='PO_BillAddress')
    Shipping_Location=models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='PO_ShippLocation')
    Shipping_Address=models.ForeignKey(Clinic_Detials,on_delete=models.CASCADE,related_name='PO_ShippAddress')
    Total_Order_Value=models.DecimalField(max_digits=10,decimal_places=2)
    PO_Status=models.CharField(max_length=30,default='Waiting For Approve')
    Create_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    Update_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Purchase_Order_Details'
    
    def __str__(self):
        return (self.PurchaseOrder_Number)

    def save(self,*args,**kwargs):
        if not self.PurchaseOrder_Number:

            PO_key_Name='PUOR'

            max_PO_id_row=Purchase_Order_Details.objects.exclude(Create_by="system").aggregate(max_id=Max('PurchaseOrder_Number'))['max_id']

            max_PO_id=max_PO_id_row if max_PO_id_row else None

            numeric_part=int(str(max_PO_id)[4:]) + 1 if max_PO_id else 1
            
            self.PurchaseOrder_Number=f'{PO_key_Name}{numeric_part:04}'

        super(Purchase_Order_Details,self).save(*args,**kwargs)


class Purchase_Order_Item_Details(models.Model):
        PO_Item_Number=models.AutoField(primary_key=True)
        PurchaseOrder = models.ForeignKey(Purchase_Order_Details, on_delete=models.CASCADE,related_name='ItemTable_PO_Number')
        PO_Item_Id=models.ForeignKey(Supplier_Product_Details,on_delete=models.CASCADE,related_name='PO_Item_ID')
        PO_Order_Qty=models.CharField(max_length=20)
        TotalAmount=models.DecimalField(max_digits=10,decimal_places=2)
        Received_Qty=models.IntegerField(default=0)
        Balance_Qty=models.IntegerField(default=0)
        Item_Status=models.CharField(max_length=20,default='Waiting For Approve')
        Reason=models.TextField()  
        Create_by=models.CharField(max_length=100)
        Created_at=models.DateTimeField(auto_now_add=True)
        Update_at=models.DateTimeField(auto_now=True)

        class Meta:
             db_table='Purchase_Order_Item_Details'



class GRN_Entry_Details(models.Model):
     GRN_Number=models.CharField(primary_key=True,max_length=20)
     PO_Number=models.ForeignKey(Purchase_Order_Details,on_delete=models.CASCADE,related_name='GRN_PO_Number')
     Supplier_Id=models.ForeignKey(Supplier_Master_Details,on_delete=models.CASCADE,related_name='GRN_Supplier')
     Supplier_BillNumber=models.IntegerField()
     Supplier_BillDate=models.DateField()
     Supplier_BillDueDate=models.DateField()
     Supplier_BillAmount=models.DecimalField(max_digits=10,decimal_places=2)
     GRNLocation=models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='GRNLocation')
     ReceivingPersion=models.CharField(max_length=100)
     GRNFile_Attachment = models.BinaryField(default=None, null=True, blank=True)
     TaxableTotalAmount=models.DecimalField(max_digits=10,decimal_places=2)
     TaxTotalAmount=models.DecimalField(max_digits=10,decimal_places=2)
     TotalAmount=models.DecimalField(max_digits=10,decimal_places=2)
     TotalDiscountMethod=models.CharField(max_length=20)
     TotalDiscountType=models.CharField(max_length=20)
     TotalDiscountValue=models.IntegerField()
     FinalTaxableTotal=models.DecimalField(max_digits=10,decimal_places=2)
     FinalTaxTotal=models.DecimalField(max_digits=10,decimal_places=2)
     FinalTotalAmount=models.DecimalField(max_digits=10,decimal_places=2)
     RountOff=models.DecimalField(max_digits=5,decimal_places=2)
     NetAmount=models.DecimalField(max_digits=10,decimal_places=2)
     BillDiscountMethod=models.CharField(max_length=30)
     GRN_Status=models.CharField(max_length=30,default='Waiting For Approve')
     Create_by=models.CharField(max_length=100)
     Created_at=models.DateTimeField(auto_now_add=True)
     Update_at=models.DateTimeField(auto_now=True)

     class Meta:
        db_table = 'GRN_Entry_Details'
       
     def __str__(self):
        return (self.GRN_Number)
     
     def save(self,*args,**kwargs):
         if not self.GRN_Number:
             
             GRN_key_Name='GRNR'

             max_Grn_id_row=GRN_Entry_Details.objects.exclude(Create_by='system').aggregate(max_id=Max('GRN_Number'))['max_id'] 

             max_Grn_id=max_Grn_id_row if max_Grn_id_row else None

             numeric_part=int(str(max_Grn_id)[4:]) +1 if max_Grn_id else 1

             self.GRN_Number=f'{GRN_key_Name}{numeric_part:04}'
        
         super(GRN_Entry_Details,self).save(*args,**kwargs)



class GRN_Items_Entry_Details(models.Model):
    GRN_Item_Number=models.AutoField(primary_key=True)
    GRN_Number=models.ForeignKey(GRN_Entry_Details,on_delete=models.CASCADE,related_name='Grn_Number_ForItems')
    GRN_Item_Id=models.ForeignKey(Medical_ProductMaster_Details,on_delete=models.CASCADE,related_name='GRN_Item_Detailes')
    Pack_MRP=models.DecimalField(max_digits=10,decimal_places=2)
    GRN_Rate_Per_Pack_Taxable=models.DecimalField(max_digits=10,decimal_places=2)
    Tax_Type=models.CharField(max_length=20)
    Tax_Percentage=models.IntegerField()
    GRN_Rate_Per_Pack=models.DecimalField(max_digits=10,decimal_places=2)
    Order_Qty=models.IntegerField()
    Bill_Qty=models.IntegerField()
    Received_Qty=models.IntegerField()
    Pending_Qty=models.IntegerField(default=0)
    Total_Sellable_Qty=models.IntegerField()
    Sellable_Qty_MRP=models.DecimalField(max_digits=10,decimal_places=2)
    Pack_Total_Taxable_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Total_Tax_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Pack_Total_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    BatchNo=models.CharField(max_length=20)
    Manufacture_Date=models.CharField(max_length=20)
    Expiry_Date=models.CharField(max_length=20)
    Discount_Method=models.CharField(max_length=20)
    Discount_Type=models.CharField(max_length=20)
    Discount_Value=models.IntegerField()
    FinalTotalPackTaxableAmount=models.DecimalField(max_digits=10,decimal_places=2)
    FinalTotalTaxAmount=models.DecimalField(max_digits=10,decimal_places=2)
    FinalTotalPackAmount=models.DecimalField(max_digits=10,decimal_places=2)
    Create_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    Update_at=models.DateTimeField(auto_now=True)

    class Meta:
            db_table='GRN_Items_Entry_Details'
