
from django.urls import path


from .ICU_DocNurse import *
urlpatterns=[
   
    path('Assessment_Details_Link',Assessment_Details_Link,name='Assessment_Details_Link'),
    path('Mlc_Details_Link',Mlc_Details_Link,name='Mlc_Details_Link'),
    path('Ward_PreOpChecklist_Details_Link',Ward_PreOpChecklist_Details_Link,name='Ward_PreOpChecklist_Details_Link'),
    path('OT_PreOpChecklist_Details_Link',OT_PreOpChecklist_Details_Link,name='OT_PreOpChecklist_Details_Link'),
    path('Ward_PreOpInstructions_Details_Link',Ward_PreOpInstructions_Details_Link,name='Ward_PreOpInstructions_Details_Link'),
    path('Dama_Details_Link',Dama_Details_Link,name='Dama_Details_Link'),

]
