from django.urls import path
from .EmgRegister import *
from .Registration import *
from .AppointmentRequestList import *
from .GeneralBilling import *
from .IP_Billing import *

urlpatterns=[
    path('Emergency_Registration_Details', Emergency_Registration_Details, name='Emergency_Registration_Details'),
    path('Patient_Registration', Patient_Registration, name='Patient_Registration'),
    path('get_Employee_by_PatientCategory', get_Employee_by_PatientCategory, name='get_Employee_by_PatientCategory'),
    path('get_DoctorId_by_PatientCategory', get_DoctorId_by_PatientCategory, name='get_DoctorId_by_PatientCategory'),
    path('get_Patient_Details_by_patientId', get_Patient_Details_by_patientId, name='get_Patient_Details_by_patientId'),
    path('Filter_Patient_by_Multiple_Criteria', Filter_Patient_by_Multiple_Criteria, name='get_DoctorId_by_PFilter_Patient_by_Multiple_CriteriaatientCategory'),
    path('get_patient_appointment_details', get_patient_appointment_details, name='get_patient_appointment_details'),
    path('get_patient_unique_id', get_patient_unique_id, name='get_patient_unique_id'),
    path('get_patient_ip_registration_details', get_patient_ip_registration_details, name='get_patient_ip_registration_details'),
    path('get_ip_registration_before_handover_details', get_ip_registration_before_handover_details, name='get_ip_registration_before_handover_details'),
    path('get_ip_roomdetials_before_handover_details', get_ip_roomdetials_before_handover_details, name='get_ip_roomdetials_before_handover_details'),
    path('post_ip_roomdetials_before_handover_details', post_ip_roomdetials_before_handover_details, name='post_ip_roomdetials_before_handover_details'),
    path('post_ip_handover_details', post_ip_handover_details, name='post_ip_handover_details'),
    path('post_ip_submit_handover_or_cancel_details', post_ip_submit_handover_or_cancel_details, name='post_ip_submit_handover_or_cancel_details'),
    path('get_ip_roomdetials_for_bedtransfer_details', get_ip_roomdetials_for_bedtransfer_details, name='get_ip_roomdetials_for_bedtransfer_details'),
    path('insert_op_ip_convertion', insert_op_ip_convertion, name='insert_op_ip_convertion'),
    path('post_ip_bed_transfer_details', post_ip_bed_transfer_details, name='post_ip_bed_transfer_details'),
    path('bed_transfer_approve_cancel_details', bed_transfer_approve_cancel_details, name='bed_transfer_approve_cancel_details'),
    path('service_procedure_request', service_procedure_request, name='service_procedure_request'),
    path('get_ip_billing_datasss', get_ip_billing_datasss, name='get_ip_billing_datasss'),
    
    
    
    path('get_patient_casuality_details', get_patient_casuality_details, name='get_patient_casuality_details'),
    path('get_patient_diagnosis_details', get_patient_diagnosis_details, name='get_patient_diagnosis_details'),
    path('get_patient_laboratory_details', get_patient_laboratory_details, name='get_patient_laboratory_details'),
    path('get_Registration_edit_details', get_Registration_edit_details, name='get_Registration_edit_details'),
    path('get_patient_visit_details', get_patient_visit_details, name='get_patient_visit_details'),



    path('Appointment_Request_List_Link', Appointment_Request_List_Link, name='Appointment_Request_List_link'),
    path('Appointment_Request_Cancel', Appointment_Request_Cancel, name='Appointment_Request_Cancel'),
    path('Appointment_Reschedule_List', Appointment_Reschedule_List, name='Appointment_Reschedule_List'),
    path('get_all_appointments', get_all_appointments, name='get_all_appointments'),
    path('Appointment_Request_List_Delete_Links', Appointment_Request_List_Delete_Links, name='Appointment_Request_List_Delete_Links'),
    path('appointment_request_count_today/', get_today_appointment_count, name='appointment_request_count_today'),
    path('calender_modal_display_data_by_day', calender_modal_display_data_by_day, name='calender_modal_display_data_by_day'),
    path('get_available_doctor_by_speciality', get_available_doctor_by_speciality, name='get_available_doctor_by_speciality'),
    path('doctor_available_calender_by_day', doctor_available_calender_by_day, name='doctor_available_calender_by_day'),
    path('daily_appointment_counts_all_doctors', daily_appointment_counts_all_doctors, name='daily_appointment_counts_all_doctors'),
    path('daily_appointment_counts_per_doctor', daily_appointment_counts_per_doctor, name='daily_appointment_counts_per_doctor'),
   
       
    path('Get_OP_Billing_Details', Get_OP_Billing_Details, name='Get_OP_Billing_Details'),
    path('Get_OP_Billing_Details_SingleId', Get_OP_Billing_Details_SingleId, name='Get_OP_Billing_Details_SingleId'),

    path('GeneralBilling_Link', GeneralBilling_Link, name='GeneralBilling_Link'),
    path('get_merged_service_data', get_merged_service_data, name='get_merged_service_data'),
    path('get_latest_appointment_for_patient', get_latest_appointment_for_patient, name='get_latest_appointment_for_patient'),
    path('Filter_Patient_data_For_Billing', Filter_Patient_data_For_Billing, name='Filter_Patient_data_For_Billing'),


    path('get_patient_appointment_details_specifydoctor',get_patient_appointment_details_specifydoctor,name='get_patient_appointment_details_specifydoctor'),
    path('Register_Request_Cancel',Register_Request_Cancel,name='Register_Request_Cancel'),
    path('get_patient_appointment_details_withoutcancelled',get_patient_appointment_details_withoutcancelled,name='get_patient_appointment_details_withoutcancelled'),
    path('Registration_Reshedule_Details',Registration_Reshedule_Details,name='Registration_Reshedule_Details'),
    
    
    path('get_unique_id_no_validation',get_unique_id_no_validation,name='get_unique_id_no_validation'),


    path('Get_IP_Billing_Details', Get_IP_Billing_Details, name='Get_IP_Billing_Details'),
    path('Get_IP_Billing_Details_SingleId', Get_IP_Billing_Details_SingleId, name='Get_IP_Billing_Details_SingleId'),
    path('IP_Billing_Service_List', IP_Billing_Service_List, name='IP_Billing_Service_List'),
    path('IPBilling_Link', IPBilling_Link, name='IPBilling_Link'),



 #  For  Pharmacy Billing Op
    path(
        "get_prescription",
        get_prescription,
        name="get_prescription",
    ),
    path(
        "get_prescriptionqueue",
        get_prescriptionqueue,
        name="get_prescriptionqueue",
    ),
    
    path(
        "get_personal_info",
        get_personal_info,
        name="get_personal_info",
    ),
    
     path(
        "get_name",
        get_name,
        name="get_name",
    ),

    
     path(
        "get_quick_list",
        get_quick_list,
        name="get_quick_list",
    ),
     
     
    
    ]
