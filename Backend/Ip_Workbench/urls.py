from django.urls import path

from .IP_Vitals import *
from .Quelist import *
from .IPD_Handover import *
from .IP_SurgicalHistory import *
from .IP_InputOutputBalance import *
from .IP_ProgressNotes import *
from .IP_Assesment import *
from .IP_Mlc import *
from .IP_Dama import *
from .IP_PreoperativeChecklist import *
from .IP_PreOpInstructions import *
from .IP_ConsernForms import *
from .IP_DrainageTubes import *

from  .IP_VentilatorSettings import *
from  .IP_BloodLines import *
from  .IP_UrinaryCathetor import *
from  .IP_BloodTransfusedRecord import *
from  .IP_SurgicalSite import *
from  .IP_BedsoreManagement import *
from  .IP_PatientCare import *
from  .IP_ReferAndInchargeDoctor import *
from  .IP_DischargeChecklist import *
from  .IP_DischargeRequest import *
from .IP_Biling_Entry import *




urlpatterns=[
   
path('get_IP_workbenchquelist_doctor',get_IP_workbenchquelist_doctor,name='get_IP_workbenchquelist_doctor'),
path('IP_Vitals_Form_Details_Link',IP_Vitals_Form_Details_Link,name='IP_Vitals_Form_Details_Link'),
path('IPD_Handover_Details_Link',IPD_Handover_Details_Link,name='IPD_Handover_Details_Link'),
path('IP_SurgicalHistory_Details_Link',IP_SurgicalHistory_Details_Link,name='IP_SurgicalHistory_Details_Link'),
path('IP_InputOutputBalance_Details_Link',IP_InputOutputBalance_Details_Link,name='IP_InputOutputBalance_Details_Link'),
path('IP_ProgressNotes_Details_Link',IP_ProgressNotes_Details_Link,name='IP_ProgressNotes_Details_Link'),
path('IP_Assesment_details_Link',IP_Assesment_details_Link,name='IP_Assesment_details_Link'),
path('IP_Mlc_Details_Link',IP_Mlc_Details_Link,name='IP_Mlc_Details_Link'),
path('IP_Dama_Details_Link',IP_Dama_Details_Link,name='IP_Dama_Details_Link'),
path('IP_PreOpChecklist_Details_Link',IP_PreOpChecklist_Details_Link,name='IP_PreOpChecklist_Details_Link'),
path('IP_PreOpInstructions_Details_Link',IP_PreOpInstructions_Details_Link,name='IP_PreOpInstructions_Details_Link'),
path('IP_ConsentForm_Details_Link',IP_ConsentForm_Details_Link,name='IP_ConsentForm_Details_Link'),


path('IP_Ventilator_Details_Link',IP_Ventilator_Details_Link,name='IP_Ventilator_Details_Link'),
path('IP_BloodLines_Details_Link',IP_BloodLines_Details_Link,name='IP_BloodLines_Details_Link'),
path('IP_UrinaryCathetor_Details_Link',IP_UrinaryCathetor_Details_Link,name='IP_UrinaryCathetor_Details_Link'),
path('IP_BloodTransfusedRecord_Details_Link',IP_BloodTransfusedRecord_Details_Link,name='IP_BloodTransfusedRecord_Details_Link'),
path('IP_DrainageTubes_Details_Link',IP_DrainageTubes_Details_Link,name='IP_DrainageTubes_Details_Link'),
path('IP_SurgicalSite_Details_Link',IP_SurgicalSite_Details_Link,name='IP_SurgicalSite_Details_Link'),
path('IP_BedsoreManagement_Details_Link',IP_BedsoreManagement_Details_Link,name='IP_BedsoreManagement_Details_Link'),
path('IP_PatientCare_Details_Link',IP_PatientCare_Details_Link,name='IP_PatientCare_Details_Link'),
path('IP_InchargeAndRefer_Details_Link',IP_InchargeAndRefer_Details_Link,name='IP_InchargeAndRefer_Details_Link'),



path('IP_DischargeRequest_Details_Link',IP_DischargeRequest_Details_Link,name='IP_DischargeRequest_Details_Link'),
path('Update_DischargeRequest_Details',Update_DischargeRequest_Details,name='Update_DischargeRequest_Details'),
path('IP_Discharge_Checklist_Link',IP_Discharge_Checklist_Link, name = 'IP_Discharge_Checklist_Link'),
path('IP_Discharge_Clearance_Link',IP_Discharge_Clearance_Link, name = 'IP_Discharge_Clearance_Link'),
path('IP_DischargeCancel_Details_Link',IP_DischargeCancel_Details_Link, name = 'IP_DischargeCancel_Details_Link'),
path('IP_Physical_Discharge_Link',IP_Physical_Discharge_Link, name = 'IP_Physical_Discharge_Link'),


path('IP_Billing_Entry_link',IP_Billing_Entry_link, name = 'IP_Billing_Entry_link'),
path('IP_Consultation_Entry',IP_Consultation_Entry, name = 'IP_Consultation_Entry'),
]









