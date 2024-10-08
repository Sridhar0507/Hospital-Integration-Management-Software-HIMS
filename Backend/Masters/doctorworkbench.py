from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from .models import *
import base64
import json
import magic
from django.db.models import Count
from Frontoffice.models import Patient_Appointment_Registration_Detials
import json
from django.utils import timezone
from django.db.models import Q

from Masters.models import * 
from datetime import datetime

from .models import Doctor_Personal_Form_Detials



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def OpDoctor_Details_link(request):
    if request.method == 'GET':
        try:
            # Fetch doctors with DoctorType 'InHouse'
            inhouse_doctors = Doctor_Personal_Form_Detials.objects.filter(DoctorType='InHouse').values('Doctor_ID', 'DoctorType', 'ShortName')
            # Fetch doctors with DoctorType 'Visiting'
            visiting_doctors = Doctor_Personal_Form_Detials.objects.filter(DoctorType='Visiting').values('Doctor_ID', 'DoctorType', 'ShortName')

            # Function to get patient counts for a doctor
            def get_patient_counts(doctor_id):
                registered_count = Patient_Appointment_Registration_Detials.objects.filter(PrimaryDoctor_id=doctor_id, Status='Registered').count()
                consulted_count = Patient_Appointment_Registration_Detials.objects.filter(PrimaryDoctor_id=doctor_id, Status='Completed').count()
                new_consultation_count = Patient_Appointment_Registration_Detials.objects.filter(PrimaryDoctor_id=doctor_id, VisitPurpose='NewConsultation').count()
                followup_count = Patient_Appointment_Registration_Detials.objects.filter(PrimaryDoctor_id=doctor_id, VisitPurpose='FollowUp').count()
                return {
                    'registered_patient_count': registered_count,
                    'consulted_patient_count': consulted_count,
                    'new_consultation_count': new_consultation_count,
                    'followup_count': followup_count
                }

            # Create the response lists
            inhouse_doctors_list = [
                {
                    'Doctor_ID': doc['Doctor_ID'],
                    'DoctorType': doc['DoctorType'],
                    'Full_Name': doc['ShortName'],
                    **get_patient_counts(doc['Doctor_ID'])
                } for doc in inhouse_doctors
            ]

            visiting_doctors_list = [
                {
                    'Doctor_ID': doc['Doctor_ID'],
                    'DoctorType': doc['DoctorType'],
                    'Full_Name': doc['ShortName'],
                    **get_patient_counts(doc['Doctor_ID'])
                } for doc in visiting_doctors
            ]

            return JsonResponse({
                'success': True,
                'inhouse_doctors': inhouse_doctors_list,
                'visiting_doctors': visiting_doctors_list
            })
        except Doctor_Personal_Form_Detials.DoesNotExist:
            return JsonResponse({'error': 'Doctor details not found for the provided doctor type'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)





@csrf_exempt
@require_http_methods(["GET"])
def OpPatients_Details_link(request):
    try:
        doctor_ids = request.GET.get("doctorIds")
        if not doctor_ids:
            return JsonResponse({'error': 'No doctor IDs provided'}, status=400)

        doctor_ids_list = doctor_ids.split(',')
        print("Doctor IDs:", doctor_ids_list)

        # Get current date
        current_date = datetime.now().date()

        # Fetch patient details for each doctor
        patient_details_queryset = Patient_Appointment_Registration_Detials.objects.filter(
            created_at__date=current_date,
            PrimaryDoctor__Doctor_ID__in=doctor_ids_list
        ).select_related('PatientId', 'PrimaryDoctor', 'Specialization')

        # Prepare patient details list
        patient_details = []
        index = 0
        for patient in patient_details_queryset:
            patient_info = {
                'id': index + 1,
                'IsReferral': patient.IsReferral,
                'PatientCategory': patient.PatientCategory,
                'PatientId': patient.PatientId.PatientId,
                'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName or ''} {patient.PatientId.SurName}".strip(),
                'PatientType': patient.PatientType,
                'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
                'Specialization': patient.Specialization.Speciality_Id if patient.Specialization else None,
                'Reason': patient.Reason,
                'Registration_Id': patient.Registration_Id,
                'Status': patient.Status,
                'VisitId': patient.VisitId,
                'VisitPurpose': patient.VisitPurpose,
                'created_at': patient.created_at,
                'created_by': patient.created_by,
                'updated_at': patient.updated_at
            }
            index += 1
            patient_details.append(patient_info)

        # Aggregate total patients per doctor
        doctor_patient_totals_queryset = Patient_Appointment_Registration_Detials.objects.filter(
            created_at__date=current_date,
            PrimaryDoctor__Doctor_ID__in=doctor_ids_list
        ).values('PrimaryDoctor__Doctor_ID').annotate(
            total_patients=Count('PatientId')
        )

        doctor_patient_totals = {detail['PrimaryDoctor__Doctor_ID']: detail['total_patients'] for detail in doctor_patient_totals_queryset}

        # Create response data
        response_data = {
            'doctor_patient_totals': doctor_patient_totals,
            'patients_details': patient_details
        }

        return JsonResponse(response_data, status=200)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)




@csrf_exempt
@require_http_methods(["POST"])
def StatusUpdate_Details_Patient(request):
    try:
        data = json.loads(request.body)
        PatientId = data.get('newPatientId')
        VisitId = data.get('newVisitId')
        Status = data.get('newStatusChange')
        
        if not (PatientId and VisitId and Status):
            return JsonResponse({'error': 'PatientId, VisitId, and Status are required.'}, status=400)

        try:
            patient_instance = Patient_Appointment_Registration_Detials.objects.get(PatientId=PatientId, VisitId=VisitId)
            
            if Status in ['ConsultingTime', 'Completed']:
                patient_instance.Status = Status
                patient_instance.save()
                return JsonResponse({'success': 'Patient status updated successfully'})
            else:
                return JsonResponse({'error': 'Invalid status.'}, status=400)
        
        except Patient_Appointment_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': f"No entry found with PatientId '{PatientId}' and VisitId '{VisitId}'."}, status=404)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON.'}, status=400)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)




@csrf_exempt
@require_http_methods(["GET"])
def Status_Duration_link(request):
    try:
        PatientId = request.GET.get('PatientId')
        VisitId = request.GET.get('VisitId')

        if not (PatientId and VisitId):
            return JsonResponse({'error': 'PatientId and VisitId are required.'}, status=400)

        try:
            patient_instance = Patient_Appointment_Registration_Detials.objects.get(PatientId=PatientId, VisitId=VisitId)
            
            if patient_instance.registered_at and patient_instance.consulted_at:
                duration = patient_instance.consulted_at - patient_instance.registered_at
                duration_seconds = duration.total_seconds()
                
                hours, remainder = divmod(duration_seconds, 3600)
                minutes, seconds = divmod(remainder, 60)
                
                return JsonResponse({
                    'duration': {
                        'hours': int(hours),
                        'minutes': int(minutes),
                        'seconds': int(seconds)
                    }
                })
            else:
                return JsonResponse({'error': 'Duration data not available'}, status=404)
        
        except Patient_Appointment_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': f"No entry found with PatientId '{PatientId}' and VisitId '{VisitId}'."}, status=404)

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    
# Status_Patient_Details_link




@csrf_exempt
@require_http_methods(["GET"])
def Status_Patient_Details_link(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get("DoctorId")
            
            status = request.GET.get("Status")
            current_date = datetime.now().date()
            
            if doctor_id and status:
                # Adjust filtering based on how doctor_id is provided
                patient_details = Patient_Appointment_Registration_Detials.objects.filter(
                    created_at__date=current_date,
                    PrimaryDoctor__Doctor_ID=doctor_id,
                    Status=status
                ).select_related('PatientId', 'PrimaryDoctor', 'Specialization')
                
                status_patient_details = []
                for index, patient in enumerate(patient_details, start=1):
                    patient_info = {
                        'id': index,
                        'IsReferral': patient.IsReferral,
                        'PatientCategory': patient.PatientCategory,
                        'PatientId': patient.PatientId.PatientId,
                        'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName} {patient.PatientId.SurName}",
                        'PatientType': patient.PatientType,
                        'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
                        'Specialization': patient.Specialization.Speciality_Id,
                        'Reason': patient.Reason,
                        'Registration_Id': patient.Registration_Id,
                        'Status': patient.Status,
                        'VisitId': patient.VisitId,
                        'VisitPurpose': patient.VisitPurpose,
                        'created_at': patient.created_at,
                        'created_by': patient.created_by,
                        'updated_at': patient.updated_at
                    }
                    status_patient_details.append(patient_info)
                
                response_data = {
                    'patients_details': status_patient_details
                }
                return JsonResponse(response_data, status=200)
            else:
                return JsonResponse({'error': 'DoctorId and Status are required.'}, status=400)
                
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    

@csrf_exempt
@require_http_methods(["GET"])
def Separated_Patient_Details_link(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get("DoctorId")
            current_date = datetime.now().date()
            
            if doctor_id:
                # Ensure doctor_id is handled correctly
                patient_details = Patient_Appointment_Registration_Detials.objects.filter(
                    created_at__date=current_date,
                    PrimaryDoctor__Doctor_ID=doctor_id
                ).select_related('PatientId', 'PrimaryDoctor', 'Specialization')
                
                status_patient_details = []
                for index, patient in enumerate(patient_details, start=1):
                    patient_info = {
                        'id': index,
                        'IsReferral': patient.IsReferral,
                        'PatientCategory': patient.PatientCategory,
                        'PatientId': patient.PatientId.PatientId,
                        'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName} {patient.PatientId.SurName}",
                        'PatientType': patient.PatientType,
                        'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
                        'Specialization': patient.Specialization.Speciality_Id,
                        'Reason': patient.Reason,
                        'Registration_Id': patient.Registration_Id,
                        'Status': patient.Status,
                        'VisitId': patient.VisitId,
                        'VisitPurpose': patient.VisitPurpose,
                        'created_at': patient.created_at,
                        'created_by': patient.created_by,
                        'updated_at': patient.updated_at
                    }
                    status_patient_details.append(patient_info)
                
                response_data = {
                    'patients_details': status_patient_details
                }
                return JsonResponse(response_data, status=200)
        
            else:
                return JsonResponse({'error': 'DoctorId is required.'}, status=400)
                
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt
@require_http_methods(["GET"])
def VisitPurpose_Patient_Details_link(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get("DoctorId")
            print("doctor_idvisit",doctor_id)
            VisitPurpose = request.GET.get("VisitPurpose")
            print("VisitPurpose",VisitPurpose)
            current_date = datetime.now().date()
            
            if doctor_id and VisitPurpose:
                patient_details = Patient_Appointment_Registration_Detials.objects.filter(
                  created_at__date=current_date,
                  PrimaryDoctor__Doctor_ID=doctor_id,
                  VisitPurpose=VisitPurpose   
                ).select_related('PatientId', 'PrimaryDoctor', 'Specialization')
                
                visit_patient_details = []
                for index, patient in enumerate(patient_details, start=1):
                    patient_info = {
                        'id': index,
                        'IsReferral': patient.IsReferral,
                        'PatientCategory': patient.PatientCategory,
                        'PatientId': patient.PatientId.PatientId,
                        'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName} {patient.PatientId.SurName}",
                        'PatientType': patient.PatientType,
                        'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
                        'Specialization': patient.Specialization.Speciality_Id,
                        'Reason': patient.Reason,
                        'Registration_Id': patient.Registration_Id,
                        'Status': patient.Status,
                        'VisitId': patient.VisitId,
                        'VisitPurpose': patient.VisitPurpose,
                        'created_at': patient.created_at,
                        'created_by': patient.created_by,
                        'updated_at': patient.updated_at
                    }
                    visit_patient_details.append(patient_info)
                
                response_data = {
                    'patients_details': visit_patient_details
                }
                return JsonResponse(response_data, status=200)
            else:
                return JsonResponse({'error': 'DoctorId and VisitPurpose are required.'}, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
     
            
            


@require_http_methods(["GET"])
def inhouse_doctor_details(request):
    try:
        # Get parameters
        Doctortype = request.GET.get("Doctortype")
        print("Doctortype",Doctortype)
        DoctorId = request.GET.get("DoctorID")
        print("DoctorId",DoctorId)

        # Ensure Doctortype is not None
        if not Doctortype:
            return JsonResponse({'error': 'Doctortype is required'}, status=400)

        # Build the filter condition
        filter_condition = Q(DoctorType=Doctortype)
        if DoctorId:
            filter_condition &= ~Q(Doctor_ID=DoctorId)  # Exclude the specific DoctorID

        # Fetch doctors based on the filter condition
        doctor_details = Doctor_Personal_Form_Detials.objects.filter(filter_condition)

        # Prepare response data
        inhouse_doctor_details = []
        for doctor in doctor_details:
            # Get the associated specialty name, if any
            specialization = doctor.doctor_professform_detials_set.first()
            speciality_name = specialization.Specialization.Speciality_Name if specialization else 'N/A'

            doctor_info = {
                'DoctorID': doctor.Doctor_ID,
                'FirstName': doctor.First_Name,
                'MiddleName': doctor.Middle_Name,
                'LastName': doctor.Last_Name,
                'ShortName': doctor.ShortName,
                'SpecialityName': speciality_name,
            }
            inhouse_doctor_details.append(doctor_info)
        
        # Return the response as JSON
        return JsonResponse( inhouse_doctor_details, safe=False)
    
    except Exception as e:
        # Log the exception
        print(f"Error: {e}")
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)  
# @csrf_exempt
# @require_http_methods(["GET"])
# def Status_Patient_Details_link(request):
#     if request.method == 'GET':
#         try:
#             docterid = request.GET.get("DoctorId")
#             print("DoctorIdstatus",docterid)
#             Status = request.GET.get("Status")
#             print("DoctorIdstatus",Status)
#             current_date = datetime.now().date()
            
#             if docterid and Status:
#                 patient_details = Patient_Appointment_Registration_Detials.objects.filter(
#                     created_at=current_date,
#                     PrimaryDoctor=docterid,
#                     Status=Status
#                 )
                
#                 status_patiend_details = []
#                 index = 0
#                 for patient in patient_details:
#                     patient_info = {
#                         'id': index + 1,
#                         'IsReferral': patient.IsReferral,
#                         'PatientCategory': patient.PatientCategory,
#                         'PatientId': patient.PatientId.PatientId,
#                         'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName} {patient.PatientId.SurName}",
#                         'PatientType': patient.PatientType,
#                         'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
#                         'Specialization': patient.Specialization.Speciality_Id,
#                         'Reason': patient.Reason,
#                         'Registration_Id': patient.Registration_Id,
#                         'Status': patient.Status,
#                         'VisitId': patient.VisitId,
#                         'VisitPurpose': patient.VisitPurpose,
#                         'created_at': patient.created_at,
#                         'created_by': patient.created_by,
#                         'updated_at': patient.updated_at
#                     }
#                     index += 1 
#                     status_patiend_details.append(patient_info)
                
#                 response_data = {
#                     'patients_details': status_patiend_details
#                 }
#                 return JsonResponse(response_data, status=200)
#             else:
#                 return JsonResponse({'error': 'DocterId and Status are required.'}, status=400)
                
#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=405)


# @csrf_exempt
# @require_http_methods(["GET"])
# def Separated_Patient_Details_link(request):
#     if request.method == 'GET':
#         try:
#             docterid = request.GET.get("DoctorId")
#             print("DoctorIdstatusdoctor",docterid)
#             current_date = datetime.now().date()
            
#             if docterid :
#                 patient_details = Patient_Appointment_Registration_Detials.objects.filter(
#                     created_at = current_date,
#                     PrimaryDoctor = docterid
#                 )
                
#                 status_patiend_details = []
#                 index = 0
#                 for patient in patient_details:
#                     patient_info = {
#                     'id':index+1,
#                     'IsReferral': patient.IsReferral,
#                     'PatientCategory': patient.PatientCategory,
#                     'PatientId': patient.PatientId.PatientId,
#                     'PatientName': f"{patient.PatientId.FirstName} {patient.PatientId.MiddleName} {patient.PatientId.SurName}",
#                     'PatientType': patient.PatientType,
#                     'PrimaryDoctor': patient.PrimaryDoctor.Doctor_ID,
#                     'Specialization':patient.Specialization.Speciality_Id,
#                     'Reason': patient.Reason,
#                     'Registration_Id': patient.Registration_Id,
#                     'Status': patient.Status,
#                     'VisitId': patient.VisitId,
#                     'VisitPurpose': patient.VisitPurpose,
#                     'created_at': patient.created_at,
#                     'created_by': patient.created_by,
#                     'updated_at': patient.updated_at
#                     }
#                     index += 1 
#                     status_patiend_details.append(patient_info)
                
#                 response_data = {
#                     'patients_details':status_patiend_details
#                 }
#                 return JsonResponse(response_data, status=200)
        
#             else:
#                 return JsonResponse({'error':'DocterId  are required.'},status=400) 
                
        
#         except Exception as e:
#             print(f"An error occured: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'},status=500)
    
#     else:
#         return JsonResponse({'error':'Invalid request method'}, status=405)
