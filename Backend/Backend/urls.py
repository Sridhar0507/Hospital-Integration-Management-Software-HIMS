"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path

from django.conf import settings
from Masters.views import serve_react
urlpatterns = [
    path('admin/', admin.site.urls),
    path('Masters/',include('Masters.urls')),
    path('Frontoffice/',include('Frontoffice.urls')),
    path('IP/',include('IP.urls')),
    path('OP/',include('OutPatient.urls')),
    path('LeninManagement/',include('LeninManagement.urls')),
    path('Workbench/',include('Workbench.urls')),
    path('MisReports/',include('MisReports.urls')),
    path('Ip_Workbench/',include('Ip_Workbench.urls')),
    path('Inventory/',include('Inventory.urls')),
    
    
    
    
    
    # re_path(r"^(?P<path>.*)$", serve_react, {"document_root": settings.REACT_APP_BUILD_PATH}),
    
]
