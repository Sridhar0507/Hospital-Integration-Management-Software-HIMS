from django.urls import path
# from .Lenin import *
from .Reports import *

urlpatterns = [
    path('MisCasePaper_Detials_link',MisCasePaper_Detials_link,name='MisCasePaper_Detials_link'),
    path('MisAncCard_Detials_link',MisAncCard_Detials_link,name='MisAncCard_Detials_link'),
    
]
