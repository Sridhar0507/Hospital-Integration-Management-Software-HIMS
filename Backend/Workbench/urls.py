from django.urls import path
from .Gynecology import *
from .Neurology import *
from .IFCard import *
from .OP_Sheet import *
from .ANC_Card import *
from .Opthalmology import *
from .PastHistory import *
from .GeneralEvaluation import *
from .Prescription import *

urlpatterns = [
    path('Workbench_Gynecology_Details',Workbench_Gynecology_Details,name='Workbench_Gynecology_Details'),
    path('Workbench_Neurology_Details',Workbench_Neurology_Details,name='Workbench_Neurology_Details'),
    path('Workbench_IFCard_Details',Workbench_IFCard_Details,name='Workbench_IFCard_Details'),
    path('Workbench_OP_Sheet_Details',Workbench_OP_Sheet_Details,name='Workbench_OP_Sheet_Details'),
    path('Workbench_ANC_Card_Details',Workbench_ANC_Card_Details,name='Workbench_ANC_Card_Details'),
    # path('Workbench_Opthalmology_Details',Workbench_Opthalmology_Details,name='Workbench_Opthalmology_Details'),
    # path('Workbench_Annotation_Details',Workbench_Annotation_Details,name='Workbench_Annotation_Details'),
    path('Workbench_PastHistory_Details',Workbench_PastHistory_Details,name='Workbench_PastHistory_Details'),
    path('Workbench_GeneralEvaluation_Details',Workbench_GeneralEvaluation_Details,name='Workbench_GeneralEvaluation_Details'),
    path('Workbench_Prescription_Details',Workbench_Prescription_Details,name='Workbench_Prescription_Details'),
    path('Medical_Stock_InsetLink_for_Prescription',Medical_Stock_InsetLink_for_Prescription,name='Medical_Stock_InsetLink_for_Prescription'),
    path('Doctor_previous_prescripion_details', Doctor_previous_prescripion_details, name='Doctor_previous_prescripion_details'),
]



