from django.db.models.signals import post_save, post_delete, post_migrate
from django.dispatch import receiver
from .models import *
from Frontoffice.models import *
from Masters.models import *
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist


@receiver(post_save, sender=Patient_Admission_Room_Detials)
def create_Patient_Admission_Room_Detials(sender, instance, created, **kwargs):
    if created:
        
        roommaster_instance = Room_Master_Detials.objects.get(Room_Id =instance.RoomId.Room_Id)
        roommaster_instance.Booking_Status = 'Booked'
        roommaster_instance.save()
        
from django.db import transaction

@receiver(post_save, sender=Op_to_Ip_Convertion_Table)
def update_app_regis_op_to_ip_on_update(sender, instance, created, **kwargs):
    print('-0-9-9-9-0-0')

    if Patient_Appointment_Registration_Detials.objects.filter(pk=instance.Registration_id.pk).exists():
        app_instance = Patient_Appointment_Registration_Detials.objects.get(pk=instance.Registration_id.pk)
        print(f"Before saving: IP_Request_status = {app_instance.IP_Request_status}")

        if created:
            print('-11', app_instance.Status)
            app_instance.IP_Request_status = 'Requested'
        else:
            print('-00', app_instance.Status)
            app_instance.IP_Request_status = 'Transfered'
            app_instance.Status = 'Completed'

        with transaction.atomic():
            app_instance.save(update_fields=['IP_Request_status','Status'])
            print(f"After saving: IP_Request_status = {app_instance.IP_Request_status}")
            app_instance.refresh_from_db()
            print(f"from db saving: IP_Request_status = {app_instance.IP_Request_status}")

@receiver(post_save, sender=Patient_Appointment_Registration_Detials)
def Create_OP_Billing_Detailes(sender, instance, created, **kwargs):
    print('Signal received for creating OP billing details')
    try:
        if created:
            RegisterInstance = Patient_Appointment_Registration_Detials.objects.get(Registration_Id=instance.Registration_Id)
            print('RegisterInstance', RegisterInstance.PrimaryDoctor.Doctor_ID)
            Doctors_Instance = Doctor_Ratecard_Master.objects.get(Doctor_ID__Doctor_ID=RegisterInstance.PrimaryDoctor.Doctor_ID)

            print('Doctor Ratecard Instance:', Doctors_Instance)
            OP_Billing_QueueList_Detials.objects.create(
                Billing_Type='Consultation',
                Registration_Id=RegisterInstance,
                Doctor_Ratecard_Id=Doctors_Instance,
                Status='Pending',
                created_by=instance.created_by,
                created_at=instance.created_at,
                updated_at=instance.updated_at
            )
        
    except ObjectDoesNotExist as e:
        print(f"Error: {e}")
    except Doctor_Ratecard_Master.DoesNotExist as e:
        print(f"Doctor Ratecard not found: {e}")
        
        
@receiver(post_save, sender=Patient_Appointment_Registration_Detials)
def Create_OPD_Flow_Registration(sender, instance, created, **kwargs):
    print("OPD flow signal triggered")
    if created:
        try:
            # Fetch the patient related to the appointment
            patient = instance.PatientId
            print("Patient fetched:", patient)
            RegisterInstance = Patient_Appointment_Registration_Detials.objects.get(Registration_Id=instance.Registration_Id)
            # Fetch the primary doctor from the appointment details
            primary_doctor = instance.PrimaryDoctor
            print("Primary doctor fetched:", primary_doctor)

            # Fetch the specialization
            specialization = instance.Specialization
            print("Specialization fetched:", specialization)

            # Status initialization
        

            # Debug the types before creating the OPD_Flow record
            print(type(patient), type(specialization), type(primary_doctor), type(instance))

            # Create a new OPD_Flow record
            OPD_Flow.objects.create(
                Patient_Id=patient,  # Directly use the related patient instance
                Specialization=specialization,  # Directly use the related specialization instance
                DoctorId=primary_doctor,  # Directly use the related doctor instance
                RegisterType='Registration',  # Hardcoded value for registration type
                Registration_Id=RegisterInstance,  # Directly use the instance from the signal
                Registration_Status=instance.Status,
                Appointment_Id = instance.ApptoRegId,
                AppointmentType = 'AppointmentType' if instance.ApptoRegId else '',
                Appointment_Status = 'REGISTERED' if instance.ApptoRegId else '',
                created_by=instance.created_by,  # Use data from the instance
                created_at=instance.created_at,  # Use the original created_at from the instance
                updated_at=instance.updated_at  # Use the updated_at from the instance
            )
            print("OPD_Flow record created successfully.")
        except Patient_Detials.DoesNotExist:
            print(f"Error: Patient with ID {instance.PatientId_id} does not exist.")
        except Doctor_Personal_Form_Detials.DoesNotExist:
            print(f"Error: Doctor with ID {instance.PrimaryDoctor_id} does not exist.")
        except Speciality_Detials.DoesNotExist:
            print(f"Error: Specialization with ID {instance.Specialization_id} does not exist.")
        except Exception as e:
            print(f"Generalerror:{e}")


@receiver(post_save, sender=Patient_Appointment_Registration_Cancel_Details)
def create_opd_flow_cancel(sender, instance, created, **kwargs):
    print("OPD Flow Cancel signal triggered")
    if created:
        try:
            # Fetch the related Patient, Doctor, and Specialization details
            patient = instance.Registration_Id.PatientId
            print("Patient fetched:", patient)

            primary_doctor = instance.Registration_Id.PrimaryDoctor
            print("Primary doctor fetched:", primary_doctor)

            specialization = instance.Registration_Id.Specialization
            print("Specialization fetched:", specialization)

            # Check if all required data exists
            if not all([patient, primary_doctor, specialization]):
                print("Missing related data. Patient, doctor, or specialization not found.")
                return

            # Create a new OPD_Flow record
            OPD_Flow.objects.create(
                Patient_Id=patient,  # Use the related patient instance
                Specialization=specialization,  # Use the related specialization instance
                DoctorId=primary_doctor,  # Use the related doctor instance
                RegisterType='Registration',  # Static value
                Registration_Id=instance.Registration_Id,  # Use the Registration object
                Registration_Cancel_Reason=instance.Cancel_Reason,  # Cancel reason from instance
                Registration_Status=instance.Status,  # Status from instance
                Appointment_Id = instance.Registration_Id.ApptoRegId if instance.Registration_Id else '',
                AppointmentType = 'AppointmentType' if instance.Registration_Id.ApptoRegId else '',
                Appointment_Status = 'REGISTERED' if instance.Registration_Id.ApptoRegId else '',
                created_by=instance.created_by,  # Use created_by from instance
                updated_by = instance.updated_by,
                created_at=instance.created_at,  # Preserve created_at timestamp
                updated_at=instance.updated_at  # Preserve updated_at timestamp
            )
            print("OPD_Flow Cancel record created successfully.")
        except Exception as e:
            print(f"Error creating OPD_Flow Cancelrecord:{e}")


@receiver(post_save, sender=Patient_Registration_Reshedule_Details)
def create_opd_flow_reshedule(sender, instance, created, **kwargs):
    print("OPD Flow Reshedule signal triggered")
    if created:
        try:
            # Fetch the related Patient, Doctor, and Specialization details
            patient = instance.Registration_Id.PatientId
            print("Patient fetched:", patient)
            
            Status = "Reshedule"
              
            primary_doctor = instance.Registration_Id.PrimaryDoctor
            print("Primary doctor fetched:", primary_doctor)

            specialization = instance.Registration_Id.Specialization
            print("Specialization fetched:", specialization)

            # Check if all required data exists
            if not all([patient, primary_doctor, specialization]):
                print("Missing related data. Patient, doctor, or specialization not found.")
                return

            # Create a new OPD_Flow record
            OPD_Flow.objects.create(
                Patient_Id=patient,  # Use the related patient instance
                Specialization=specialization,  # Use the related specialization instance
                DoctorId=primary_doctor,  # Use the related doctor instance
                RegisterType='Registration',  # Static value
                Registration_Id=instance.Registration_Id,  # Use the Registration object 
                Registration_Status=Status,  # Status from instance
                AppointmentDoctor = instance.AppointmentDoctor,
                RegistrationReshedule_Reason = instance.ChangingReason,
                Appointment_Id = instance.Registration_Id.ApptoRegId if instance.Registration_Id else '',
                AppointmentType = 'AppointmentType' if instance.Registration_Id.ApptoRegId else '',
                Appointment_Status = 'REGISTERED' if instance.Registration_Id.ApptoRegId else '',
                created_by=instance.created_by,  # Use created_by from instance
                updated_by = instance.updated_by,
                created_at=instance.created_at,  # Preserve created_at timestamp
                updated_at=instance.updated_at  # Preserve updated_at timestamp
            )
            print("OPD_Flow Reshedule record created successfully.")
        except Exception as e:
            print(f"Error creating OPD_Flow Reshedule record: {e}")


# @receiver(post_save, sender=Patient_Registration_Reshedule_Details)
# def create_opd_flow_reshedule(sender, instance, created, **kwargs):
#     print("OPD Flow Reshedule signal triggered")
#     if created:
#         try:
#             patient = instance.Registration_Id.PatientId
#             print("Patient fetched Reshedule:", patient)
            
#             primary_doctor = instance.Registration_Id.PrimaryDoctor
#             print("Primary doctor fetched Reshedule :", primary_doctor)
            
#             Status = "Reshedule"
#             specialization = instance.Registration_Id.Specialization
#             print("Specialization fetched:", specialization)
            
            
#             if not all([patient, primary_doctor, specialization]):
#                 print("Missing related data. Patient, doctor, or specialization not found.")
#                 return
#                # Create a new OPD_Flow record
#             OPD_Flow.objects.create(
#                 Patient_Id=patient,  # Use the related patient instance
#                 Specialization=specialization,  # Use the related specialization instance
#                 DoctorId=primary_doctor,  # Use the related doctor instance
#                 RegisterType='Registration',  # Static value
#                 Registration_Id=instance.Registration_Id,  # Use the Registration object
#                 RegistrationReshedule_Reason=instance.ChangingReason, 
#                 AppointmentDoctor = instance.AppointmentDoctor,# Cancel reason from instance
#                 Appointment_Id = instance.Registration_Id.ApptoRegId if instance.Registration_Id else '',
#                 Appointment_Status = instance.Registration_Id.ApptoRegId.status,
#                 Registration_Status=Status,  # Status from instance
#                 created_by=instance.created_by,  # Use created_by from instance
#                 created_at=instance.created_at,  # Preserve created_at timestamp
#                 updated_at=instance.updated_at  # Preserve updated_at timestamp
#             )
#             print("OPD_Flow Reshedule record created successfully.")
#         except Exception as e:
#             print(f"Error creating OPD_Flow Cancel record: {e}")
        



@receiver(post_save,sender=Appointment_Request_List)
def Create_OPD_flow_Appointment(sender,instance,created, **kwargs):
    print("OPD Appointment flow signal triggered")
    if created:
        try:
            AppointmentInstance = Appointment_Request_List.objects.get(appointment_id = instance.appointment_id)
            if instance.cancelReason in ['', None]:
                
                doctor = instance.doctor_name
                print("Doctor", doctor)
                specialization = instance.specialization
                print("specssss", specialization)

                OPD_Flow.objects.create(
                    Specialization=specialization,
                    DoctorId=doctor,
                    AppointmentType ='AppointmentType',
                    Appointment_Id = AppointmentInstance,
                    Appointment_Status = instance.status,
                    created_by=instance.created_by,  # Use data from the instance
                    created_at=instance.created_at,  # Use the original created_at from the instance
                    updated_at=instance.updated_at  # Use the updated_at from the instance
                )
                print("OPD_Flow App record created successfully.")

        except Doctor_Personal_Form_Detials.DoesNotExist:
            print(f"Error: Doctor with ID {instance.PrimaryDoctor_id} does not exist.")
        except Speciality_Detials.DoesNotExist:
            print(f"Error: Specialization with ID {instance.Specialization_id} does not exist.")
        except Exception as e:
            print(f'GeneralError:{e}')


@receiver(post_save, sender=Appointment_Request_List)
def Cancel_OPD_Flow_Appointment(sender, instance, created, **kwargs):
    print("OPD Flow Cancel App signal triggered")

    # Check if the appointment is being updated (not newly created)
    if not created:
        try:
            # Check if the status is CANCELLED and cancelReason is not empty
            if instance.status == 'CANCELLED' and instance.cancelReason and instance.cancelReason.strip():
                
                doctor = instance.doctor_name
                specialization = instance.specialization
                
                print(f"Doctor: {doctor}")
                print(f"Specialization: {specialization}")
                print(f"Specialization: {instance.updated_by}")
                
                # Create the OPD_Flow record for the cancelled appointment
                OPD_Flow.objects.create(
                    Specialization=specialization,
                    DoctorId=doctor,
                    AppointmentType='AppointmentType',  # Adjust this as necessary
                    Appointment_Id=instance,  # Reference the current instance
                    Appointment_Status=instance.status,
                    Appointment_Cancel_Reason = instance.cancelReason,
                    created_by=instance.created_by,  # Maintain original created_by field
                    updated_by = instance.updated_by if instance.updated_by else '',
                    created_at=instance.created_at,  # Maintain original created_at timestamp
                    updated_at=instance.updated_at   # Maintain the updated_at timestamp
                )
                print("OPD_Flow Cancel App record created successfully.")
                
        except Doctor_Personal_Form_Detials.DoesNotExist:
            print(f"Error: Doctor with ID {instance.PrimaryDoctor_id} does not exist.")
        except Speciality_Detials.DoesNotExist:
            print(f"Error: Specialization with ID {instance.Specialization_id} does not exist.")
        except Exception as e:
            print(f"GeneralError: {e}")

@receiver(post_save, sender = Appointment_ReSchedule_Request)
def Reschedule_OPD_Flow_Appointment(sender, instance,created, **kwargs):
    print("OPD Appointment flow Reschedule signal triggered")
    if created:
        try:
            Appointment_instance = Appointment_ReSchedule_Request(appointmentId = instance.appointmentId)
            doctor = instance.doctor_name
            print("Doctor", doctor)
            specialization = instance.specialization
            print("specssss", specialization)
            
            OPD_Flow.objects.create(
                Specialization=specialization,
                DoctorId=doctor,
                AppointmentType='AppointmentType',  # Adjust this as necessary
                Appointment_Id=  instance.appointmentId,  # Reference the current instance
                Appointment_Status='RE-SCHEDULED',
                Appointment_Reschedule_Reason = instance.ChangingReason,
                created_by=instance.created_by,  # Maintain original created_by field
                updated_by = instance.updated_by if instance.updated_by else '',
                created_at=instance.created_at,  # Maintain original created_at timestamp
                updated_at=instance.updated_at   # Maintain the updated_at timestamp
            )
            print("OPD_Flow Reschedule App record created successfully.")
        
        except Doctor_Personal_Form_Detials.DoesNotExist:
            print(f"Error: Doctor with ID {instance.PrimaryDoctor_id} does not exist.")
        except Speciality_Detials.DoesNotExist:
            print(f"Error: Specialization with ID {instance.Specialization_id} does not exist.")

        except Exception as e:
            print(f'GeneralError:{e}')
            
            

@receiver(post_save, sender=Patient_IP_Registration_Detials)
def Create_IP_Billing_Detailes(sender, instance, created, **kwargs):
    print('Signal received for creating IP billing details')
    try:
        if created:
            RegisterInstance = Patient_IP_Registration_Detials.objects.get(Registration_Id=instance.Registration_Id)
            print('RegisterInstance', RegisterInstance.PrimaryDoctor.Doctor_ID)
            Doctors_Instance = Doctor_Ratecard_Master.objects.get(Doctor_ID__Doctor_ID=RegisterInstance.PrimaryDoctor.Doctor_ID)

            print('Doctor Ratecard Instance:', Doctors_Instance)
            IP_Billing_QueueList_Detials.objects.create(
                Billing_Type='Consultation',
                Registration_Id=RegisterInstance,
                Doctor_Ratecard_Id=Doctors_Instance,
                Status='Pending',
                created_by=instance.created_by,
                created_at=instance.created_at,
                updated_at=instance.updated_at
            )
            print('Sucessfully creating IP billing details')

    except ObjectDoesNotExist as e:
        print(f"Error: {e}")
    except Doctor_Ratecard_Master.DoesNotExist as e:
        print(f"Doctor Ratecard not found: {e}")
