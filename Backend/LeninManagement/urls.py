from django.urls import path
from .Lenin import *


urlpatterns = [
    path('LeninMaster_Detials_link',LeninMaster_Detials_link,name='LeninMaster_Detials_link'),
    path('Lenin_MinMax_Master_Detials_link',Lenin_MinMax_Master_Detials_link,name='Lenin_MinMax_Master_Detials_link'),
    path('Lenin_Stock_Detials_link',Lenin_Stock_Detials_link,name='Lenin_Stock_Detials_link'),
    path('Lenin_Catg_Master_Detials_link',Lenin_Catg_Master_Detials_link,name='Lenin_Catg_Master_Detials_link'),

]








