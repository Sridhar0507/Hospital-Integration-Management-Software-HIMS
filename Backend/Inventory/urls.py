from django.urls import path
from .PurchaseOrder import *



urlpatterns = [
    path('ClinicAddress_Link',ClinicAddress_Link,name='ClinicAddress_Link'),
    path('PurchaseOrder_Link',PurchaseOrder_Link,name='PurchaseOrder_Link'),
    path('PurchaseOrder_Report_Details',PurchaseOrder_Report_Details,name='PurchaseOrder_Report_Details'),
    path('GRN_Data_Insert_Link',GRN_Data_Insert_Link,name='GRN_Data_Insert_Link'),


]


