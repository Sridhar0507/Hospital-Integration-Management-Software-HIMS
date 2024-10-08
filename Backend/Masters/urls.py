from django.urls import path
from .RoomMasters import *
from .ClinicMasters import *
from .ReferalRouteMaster import *
from .DoctorMaster import *
from .BasicMaster import *
from .UserRegisterMaster import *
from .InsuranceClientMaster import *
from .Login import *
from .ServiceProcedureMaster import *
from .RadiologyMaster import *
from .LabMaster import *
from .InstrumentMaster import *
from .doctorworkbench import *
from .RackMaster import*
from .DutyRouster import*
from .SurgeryMaster import *
# from .Frequencymaster import *
from .apprenewal import *

urlpatterns=[
    path('Hospital_Detials_link',Hospital_Detials_link,name='Hospital_Detials_link'),
    path('Clinic_Detials_link', Clinic_Detials_link, name='Clinic_Detials_link'),
    path('get_clinic_detials_by_loc_id', get_clinic_detials_by_loc_id, name='get_clinic_detials_by_loc_id'),
    path('Location_Detials_link',Location_Detials_link, name='Location_Detials_link'),
    path('Department_Detials_link',Department_Detials_link, name='Department_Detials_link'),
    path('Designation_Detials_link',Designation_Detials_link, name='Designation_Detials_link'),
    path('Category_Detials_link',Category_Detials_link, name='Category_Detials_link'),
    path('Speciality_Detials_link',Speciality_Detials_link, name='Speciality_Detials_link'),
    path('UserRegister_Detials_link',UserRegister_Detials_link, name='UserRegister_Detials_link'),
    path('update_status_User_Detials_link',update_status_User_Detials_link, name='update_status_User_Detials_link'),
    path('Get_User_Detialsby_id',Get_User_Detialsby_id, name='Get_User_Detialsby_id'),
    path('UserControl_Role_link',UserControl_Role_link, name='UserControl_Role_link'),
    path('Flagg_color_Detials_link',Flagg_color_Detials_link, name='Flagg_color_Detials_link'),
    path('Relegion_Master_link',Relegion_Master_link, name='Relegion_Master_link'),
    path('ConsentName_Detials_link',ConsentName_Detials_link, name='ConsentName_Detials_link'),
    path('Doctors_Speciality_Detials_link',Doctors_Speciality_Detials_link, name='Doctors_Speciality_Detials_link'),
    

    path('get_Location_data_for_login', get_Location_data_for_login, name='get_Location_data_for_login'),
    path('login_logic', login_logic, name='login_logic'),
    path('location_Change', location_Change, name='location_Change'),
    path('Building_Master_Detials_link', Building_Master_Detials_link, name='Building_Master_Detials_link'),
    path('get_building_Data_by_location', get_building_Data_by_location, name='get_building_Data_by_location'),
    path('Block_Master_Detials_link', Block_Master_Detials_link, name='Block_Master_Detials_link'),
    path('get_block_Data_by_Building', get_block_Data_by_Building, name='get_block_Data_by_Building'),
    path('Floor_Master_Detials_link', Floor_Master_Detials_link, name='Floor_Master_Detials_link'),
    path('get_Floor_Data_by_Building_block_loc', get_Floor_Data_by_Building_block_loc, name='get_Floor_Data_by_Building_block_loc'),
    path('Ward_Master_Detials_link', Ward_Master_Detials_link, name='Ward_Master_Detials_link'),
    path('get_Ward_Data_by_Building_block_Floor_loc', get_Ward_Data_by_Building_block_Floor_loc, name='get_Ward_Data_by_Building_block_Floor_loc'),
    path('Room_Master_Detials_link', Room_Master_Detials_link, name='Room_Master_Detials_link'),
    path('get_RoomType_Data_by_Building_block_Floor_ward_loc', get_RoomType_Data_by_Building_block_Floor_ward_loc, name='get_RoomType_Data_by_Building_block_Floor_ward_loc'),
    path('Room_Master_Master_Detials_link', Room_Master_Master_Detials_link, name='Room_Master_Master_Detials_link'),
    path('get_RoomNo_Data_by_Building_block_Floor_ward_Room_loc', get_RoomNo_Data_by_Building_block_Floor_ward_Room_loc, name='get_RoomNo_Data_by_Building_block_Floor_ward_Room_loc'),
    path('get_BedNo_Data_by_Building_block_Floor_ward_RoomNo_loc', get_BedNo_Data_by_Building_block_Floor_ward_RoomNo_loc, name='get_BedNo_Data_by_Building_block_Floor_ward_RoomNo_loc'),
    path('get_room_count_data_total', get_room_count_data_total, name='get_room_count_data_total'),
    path('get_Room_Master_Data', get_Room_Master_Data, name='get_Room_Master_Data'),
    path('get_Room_Master_Data_for_registration', get_Room_Master_Data_for_registration, name='get_Room_Master_Data_for_registration'),
    path('get_filter_Data_for_registration', get_filter_Data_for_registration, name='get_filter_Data_for_registration'),
    
    
    
    path('Route_Master_Detials_link', Route_Master_Detials_link, name='Route_Master_Detials_link'),
    path('Doctor_Detials_link', Doctor_Detials_link, name='Doctor_Detials_link'),
    path('get_Doctor_Detials_link', get_Doctor_Detials_link, name='get_Doctor_Detials_link'),
    path('update_status_Doctor_Detials_link', update_status_Doctor_Detials_link, name='update_status_Doctor_Detials_link'),
    path('get_Doctor_Ratecard_link', get_Doctor_Ratecard_link, name='get_Doctor_Ratecard_link'),
    path('doctor_Ratecard_details_view_by_doctor_id', doctor_Ratecard_details_view_by_doctor_id, name='doctor_Ratecard_details_view_by_doctor_id'),
    path('doctor_Ratecard_details_update', doctor_Ratecard_details_update, name='doctor_Ratecard_details_update'),
    path('get_User_Doctor_Detials', get_User_Doctor_Detials, name='get_User_Doctor_Detials'),
    path('get_referral_doctor_Name_Detials', get_referral_doctor_Name_Detials, name='get_referral_doctor_Name_Detials'),
    path('get_Doctor_by_Speciality_Detials', get_Doctor_by_Speciality_Detials, name='get_Doctor_by_Speciality_Detials'),
    path('get_route_details', get_route_details, name= 'get_route_details'),
    path('get_All_doctor_Name_Detials', get_All_doctor_Name_Detials, name='get_All_doctor_Name_Detials'),
    path('Insurance_Client_Master_Detials_link', Insurance_Client_Master_Detials_link, name='Insurance_Client_Master_Detials_link'),
    path('update_status_Insurance_Client_Detials_link', update_status_Insurance_Client_Detials_link, name='update_status_Insurance_Client_Detials_link'),
    path('get_insurance_client_name', get_insurance_client_name, name='get_insurance_client_name'),
    path('get_insurance_data_registration', get_insurance_data_registration, name='get_insurance_data_registration'),
    path('get_client_data_registration', get_client_data_registration, name='get_client_data_registration'),
    path('get_donation_data_registration', get_donation_data_registration, name='get_donation_data_registration'),
    path('Service_Procedure_Master_Detials_link', Service_Procedure_Master_Detials_link, name='Service_Procedure_Master_Detials_link'),
    path('update_status_Service_Procedure_Detials_link', update_status_Service_Procedure_Detials_link, name='update_status_Service_Procedure_Detials_link'),
    path('Service_Procedure_Ratecard_details_view_by_id', Service_Procedure_Ratecard_details_view_by_id, name='Service_Procedure_Ratecard_details_view_by_id'),
    path('Service_Procedure_Ratecard_details_update', Service_Procedure_Ratecard_details_update, name='Service_Procedure_Ratecard_details_update'),
    path('get_service_procedure_for_ip', get_service_procedure_for_ip, name='get_service_procedure_for_ip'),
  
  
  
    path('doctor_calender_details_view_by_doctor_id', doctor_calender_details_view_by_doctor_id, name='doctor_calender_details_view_by_doctor_id'),
    path('doctor_calender_details_view_by_day', doctor_calender_details_view_by_day, name='doctor_calender_details_view_by_day'),
    path('doctor_calender_details_view_by_doctorId_locationId', doctor_calender_details_view_by_doctorId_locationId, name='doctor_calender_details_view_by_doctorId_locationId'),
    path('calender_modal_display_data_by_day', calender_modal_display_data_by_day, name='calender_modal_display_data_by_day'),
    path('calender_modal_display_edit_by_day', calender_modal_display_edit_by_day, name='calender_modal_display_edit_by_day'),
    path('calender_modal_display_edit_by_mutiple_day', calender_modal_display_edit_by_mutiple_day, name='calender_modal_display_edit_by_mutiple_day'),
    path('Appointment_Request_List_Links', Appointment_Request_List_Links, name='Appointment_Request_List_Links'),
    path('Appointment_Request_List_Delete_Links', Appointment_Request_List_Delete_Links, name='Appointment_Request_List_Delete_Links'),

    
    
    path('Radiology_Names_link',Radiology_Names_link,name='Radiology_Names_link'),
    path('Radiology_details_link',Radiology_details_link,name='Radiology_details_link'),
    path('Radiology_details_link_view',Radiology_details_link_view,name='Radiology_details_link_view'),
    path('inhouse_doctor_details',inhouse_doctor_details,name="inhouse_doctor_details"),
    
    path('Lab_Test_Name_link',Lab_Test_Name_link,name="Lab_Test_Name_link"),
    path('Test_Names_link',Test_Names_link,name="Test_Names_link"),
    path('Favourite_TestNames_Details',Favourite_TestNames_Details,name="Favourite_TestNames_Details"),
    path('Favourites_Names_link',Favourites_Names_link,name="Favourites_Names_link"),
    path('Test_Names_link_LabTest',Test_Names_link_LabTest,name='Test_Names_link_LabTest'),
    path('External_LabDetails_Link',External_LabDetails_Link,name='External_LabDetails_Link'),
    path('Active_LabDetails_Link',Active_LabDetails_Link,name='Active_LabDetails_Link'),
    
    
    path('Instrument_Name_link',Instrument_Name_link,name="Instrument_Name_link"),
    path('Instruiment_Names_link',Instruiment_Names_link,name="Instruiment_Names_link"),
    path('Instrument_Tray_Names_link',Instrument_Tray_Names_link,name="Instrument_Tray_Names_link"),
    path('OpDoctor_Details_link',OpDoctor_Details_link,name="OpDoctor_Details_link"),
    path('OpPatients_Details_link',OpPatients_Details_link,name="OpPatients_Details_link"),
    path('StatusUpdate_Details_Patient',StatusUpdate_Details_Patient,name="StatusUpdate_Details_Patient"),
    path('Status_Duration_link',Status_Duration_link,name="Status_Duration_link"),
    path('Status_Patient_Details_link',Status_Patient_Details_link,name="Status_Patient_Details_link"),
    path('Separated_Patient_Details_link',Separated_Patient_Details_link,name="Separated_Patient_Details_link"),
    path('VisitPurpose_Patient_Details_link',VisitPurpose_Patient_Details_link,name="VisitPurpose_Patient_Details_link"),
    path('inhouse_doctor_details',inhouse_doctor_details,name="inhouse_doctor_details"),
    
    
     path('Rack_Detials_link', Rack_Detials_link, name='Rack_Detials_link'),
    path('Shelf_Detials_link',Shelf_Detials_link,name="Shelf_Detials_link"),
    path('Tray_Detials_link',Tray_Detials_link,name="Tray_Detials_link"),
    path('ProductCategory_Master_link',ProductCategory_Master_link,name='ProductCategory_Master_link'),
    path('SubCategory_Master_link',SubCategory_Master_link,name='SubCategory_Master_link'),
    path('Drug_Group_link',Drug_Group_link,name='Drug_Group_link'),
    path('Medical_ProductMaster_link',Medical_ProductMaster_link,name='Medical_ProductMaster_link'),
    path('Medical_Stock_InsetLink',Medical_Stock_InsetLink,name='Medical_Stock_InsetLink'),
    path('ProductType_Master_lik',ProductType_Master_lik,name='ProductType_Master_lik'),
    path('Difine_Tray_For_Medicen',Difine_Tray_For_Medicen,name='Difine_Tray_For_Medicen'),
    path('Tray_Management_List_For_Medicen',Tray_Management_List_For_Medicen,name='Tray_Management_List_For_Medicen'),
    path('Supplier_Master_Link',Supplier_Master_Link,name='Supplier_Master_Link'),
    
    
    path('Duty_rouster_master_link',Duty_rouster_master_link,name='Duty_rouster_master_link'),
    # path('insert_frequency_masters', insert_frequency_masters, name='insert_frequency_masters'),
    
    

    path('Surgery_Names_link',Surgery_Names_link,name='Surgery_Names_link'),
    path('Surgeryname_Speciality_link',Surgeryname_Speciality_link,name='Surgeryname_Speciality_link'),
    path('Surgeryname_Speciality_Doctor_link',Surgeryname_Speciality_Doctor_link,name='Surgeryname_Speciality_Doctor_link'),
    
    path('get_All_DoctorNames',get_All_DoctorNames,name='get_All_DoctorNames'),
    
    path('get_data',get_data,name='get_data'),
    path('update_session',update_session,name='update_session'),
    path('send_otp',send_otp,name='send_otp'),
    path('save_new_password',save_new_password,name='save_new_password'),
    path('getemail_for_user',getemail_for_user,name='getemail_for_user'),
    path('subscribeapp',subscribeapp,name='subscribeapp'),
    path('marquerun',marquerun,name='marquerun'),
    
    
    path('get_DoctorSchedule_details',get_DoctorSchedule_details,name='get_DoctorSchedule_details'),

    path('Radiology_Department_TestNames',Radiology_Department_TestNames,name='Radiology_Department_TestNames'),
    path('Radiology_TestName_SubTestNames',Radiology_TestName_SubTestNames,name='Radiology_TestName_SubTestNames')


]