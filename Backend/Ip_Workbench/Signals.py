from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import *


@receiver(post_migrate) 
def create_default_vitalChart(sender, **kwargs):
    if sender.name == 'Ip_Workbench':
        default_VitalChart = [
            {'Vitals': 'Respiratory Rate', 'Age': 'child < 4 months', 'MinHigh': '<20', 'MinMedium': '', 'MinLow': '20-29', 'Normal': '30-39', 'MaxLow': '40-54', 'MaxMedium': '', 'MaxHigh': '>54', 'created_by': 'system'},
            {'Vitals': 'Respiratory Rate', 'Age': '4 months - 2 years', 'MinHigh': '<15', 'MinMedium': '', 'MinLow': '15-24', 'Normal': '25-34', 'MaxLow': '35-55', 'MaxMedium': '', 'MaxHigh': '>55', 'created_by': 'system'},
            {'Vitals': 'Respiratory Rate', 'Age': '2-5 years', 'MinHigh': '<10', 'MinMedium': '', 'MinLow': '10-19', 'Normal': '20-29', 'MaxLow': '30-45', 'MaxMedium': '', 'MaxHigh': '>45', 'created_by': 'system'},
            {'Vitals': 'Respiratory Rate', 'Age': '5-12 years', 'MinHigh': '<10', 'MinMedium': '', 'MinLow': '10-19', 'Normal': '20-29', 'MaxLow': '30-45', 'MaxMedium': '', 'MaxHigh': '>45', 'created_by': 'system'},
            {'Vitals': 'Respiratory Rate', 'Age': '12-16 years', 'MinHigh': '<10', 'MinMedium': '', 'MinLow': '10-14', 'Normal': '15-24', 'MaxLow': '25-45', 'MaxMedium': '', 'MaxHigh': '>45', 'created_by': 'system'},
            {'Vitals': 'Respiratory Rate', 'Age': 'Adult >16 years', 'MinHigh': '<=8', 'MinMedium': '', 'MinLow': '9-11', 'Normal': '12-20', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '>=25', 'created_by': 'system'},
            
            {'Vitals': 'SpO2', 'Age': 'Child < 4 months', 'MinHigh': '<92', 'MinMedium': '', 'MinLow': '92-94', 'Normal': '>=95', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'SpO2', 'Age': '4 months - 2 years', 'MinHigh': '<92', 'MinMedium': '', 'MinLow': '92-94', 'Normal': '>=95', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'SpO2', 'Age': '2-5 years', 'MinHigh': '<92', 'MinMedium': '', 'MinLow': '92-94', 'Normal': '>=95', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'SpO2', 'Age': '5-12 years', 'MinHigh': '<92', 'MinMedium': '', 'MinLow': '92-94', 'Normal': '>=95', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'SpO2', 'Age': '12-16 Years', 'MinHigh': '<92', 'MinMedium': '', 'MinLow': '92-94', 'Normal': '>=95', 'MaxLow': '', 'MaxMedium': '21-24', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'SpO2', 'Age': 'Adult >16 years', 'MinHigh': '<=91', 'MinMedium': '92-93', 'MinLow': '94-95', 'Normal': '>=96', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            
            {'Vitals': 'Supplemental Oxygen', 'Age': 'Adult >16 years', 'MinHigh': '', 'MinMedium': 'Yes', 'MinLow': '', 'Normal': 'No', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            
            {'Vitals': 'Temperature (Frahrenheit)', 'Age': 'Adult >16 years', 'MinHigh': '<95', 'MinMedium': '', 'MinLow': '95-96.7', 'Normal': '96.8-100.3', 'MaxLow': '100.4-102.2', 'MaxMedium': '>102.2', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Temperature (Celcius)', 'Age': 'Adult >16 years', 'MinHigh': '<=35', 'MinMedium': '', 'MinLow': '35.1-36', 'Normal': '36.1-38', 'MaxLow': '38.1-39', 'MaxMedium': '>=39', 'MaxHigh': '', 'created_by': 'system'},
           
            {'Vitals': 'Heart Rate (per min)', 'Age': 'Child < 4 months', 'MinHigh': '<80', 'MinMedium': '', 'MinLow': '80-109', 'Normal': '110-159', 'MaxLow': '160-190', 'MaxMedium': '', 'MaxHigh': '>190', 'created_by': 'system'},
            {'Vitals': 'Heart Rate (per min)', 'Age': '4 months - 2 years', 'MinHigh': '<80', 'MinMedium': '', 'MinLow': '80-99', 'Normal': '100-149', 'MaxLow': '150-180', 'MaxMedium': '', 'MaxHigh': '>180', 'created_by': 'system'},
            {'Vitals': 'Heart Rate (per min)', 'Age': '2-5 years', 'MinHigh': '<60', 'MinMedium': '', 'MinLow': '60-79', 'Normal': '80-119', 'MaxLow': '120-150', 'MaxMedium': '', 'MaxHigh': '>150', 'created_by': 'system'},
            {'Vitals': 'Heart Rate (per min)', 'Age': '5-12 years', 'MinHigh': '<60', 'MinMedium': '', 'MinLow': '60-69', 'Normal': '70-119', 'MaxLow': '120-150', 'MaxMedium': '', 'MaxHigh': '>150', 'created_by': 'system'},
            {'Vitals': 'Heart Rate (per min)', 'Age': '12-16 Years', 'MinHigh': '<60', 'MinMedium': '', 'MinLow': '60-69', 'Normal': '70-99', 'MaxLow': '100-150', 'MaxMedium': '', 'MaxHigh': '>150', 'created_by': 'system'},
            {'Vitals': 'Heart Rate (per min)', 'Age': 'Adult >16 years', 'MinHigh': '<=40', 'MinMedium': '', 'MinLow': '41-50', 'Normal': '51-90', 'MaxLow': '91-110', 'MaxMedium': '111-130', 'MaxHigh': '>=131', 'created_by': 'system'},
            
            {'Vitals': 'Level of Consiousness', 'Age': 'Child < 4 months', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': 'Responsive to Voice,Responsive to Pain', 'MaxHigh': 'Unresponsive', 'created_by': 'system'},
            {'Vitals': 'Level of Consiousness', 'Age': '4 months - 2 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': 'Responsive to Voice,Responsive to Pain', 'MaxHigh': 'Unresponsive', 'created_by': 'system'},
            {'Vitals': 'Level of Consiousness', 'Age': '2-5 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': 'Responsive to Voice,Responsive to Pain', 'MaxHigh': 'Unresponsive', 'created_by': 'system'},
            {'Vitals': 'Level of Consiousness', 'Age': '5-12 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': 'Responsive to Voice,Responsive to Pain', 'MaxHigh': 'Unresponsive', 'created_by': 'system'},
            {'Vitals': 'Level of Consiousness', 'Age': '12-16 Years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': 'Responsive to Voice,Responsive to Pain', 'MaxHigh': 'Unresponsive', 'created_by': 'system'},    
            {'Vitals': 'Level of Consiousness', 'Age': 'Adult >16 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'Alert', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': 'Responsive to Voice,Responsive to Pain,Unresponsive', 'created_by': 'system'},
            
            {'Vitals': 'Capillary Refill Time', 'Age': 'Child < 4 months', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'under 2 seconds', 'MaxLow': '3 to 4 seconds', 'MaxMedium': '', 'MaxHigh': ' greaterthan 4 seconds', 'created_by': 'system'},
            {'Vitals': 'Capillary Refill Time', 'Age': '4 months - 2 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'under 2 seconds', 'MaxLow': '3 to 4 seconds', 'MaxMedium': '', 'MaxHigh': 'greaterthan 4 seconds', 'created_by': 'system'},
            {'Vitals': 'Capillary Refill Time', 'Age': '2-5 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'under 2 seconds', 'MaxLow': '3 to 4 seconds', 'MaxMedium': '', 'MaxHigh': 'greaterthan 4 seconds', 'created_by': 'system'},
            {'Vitals': 'Capillary Refill Time', 'Age': '5-12 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'under 2 seconds', 'MaxLow': '3 to 4 seconds', 'MaxMedium': '', 'MaxHigh': 'greaterthan 4 seconds', 'created_by': 'system'},
            {'Vitals': 'Capillary Refill Time', 'Age': '12-16 Years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': 'under 2 seconds', 'MaxLow': '3 to 4 seconds', 'MaxMedium': '', 'MaxHigh': 'greaterthan 4 seconds', 'created_by': 'system'},
            
            {'Vitals': 'Systolic BP', 'Age': 'Child < 4 months', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': '60-80', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Systolic BP', 'Age': '4 months - 2 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': '70-89', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Systolic BP', 'Age': '2-5 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': '90-129', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Systolic BP', 'Age': '5-12 years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': '90-129', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Systolic BP', 'Age': '12-16 Years', 'MinHigh': '', 'MinMedium': '', 'MinLow': '', 'Normal': '90-129', 'MaxLow': '', 'MaxMedium': '', 'MaxHigh': '', 'created_by': 'system'},
            {'Vitals': 'Systolic BP', 'Age': 'Adult >16 years', 'MinHigh': '<=90', 'MinMedium': '91-100', 'MinLow': '101-110', 'Normal': '111-219', 'MaxLow': '38.1-39', 'MaxMedium': '>=39', 'MaxHigh': '', 'created_by': 'system'},
            
            
        ]

        for vital_chart in default_VitalChart:
            IP_VitalsChart.objects.create(
                Vitals=vital_chart['Vitals'],
                Age=vital_chart['Age'],
                MinHigh=vital_chart['MinHigh'],
                MinMedium=vital_chart['MinMedium'],
                MinLow=vital_chart['MinLow'],
                Normal=vital_chart['Normal'],
                MaxLow=vital_chart['MaxLow'],
                MaxMedium=vital_chart['MaxMedium'],
                MaxHigh=vital_chart['MaxHigh'],
                Created_by=vital_chart['created_by'],
            )















