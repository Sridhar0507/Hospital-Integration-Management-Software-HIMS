from django.db.models.signals import post_save, post_delete, post_migrate
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from .models import *
from django.http import JsonResponse
@receiver(post_migrate)
def create_default_superadmin(sender, **kwargs):
    if sender.name == 'Masters':  # Replace with the name of your app
        # Check if the admin user already exists
        if not User.objects.filter(username='host').exists():
            superadmin_role, created = Role_Master.objects.get_or_create(
                Role_Name='host',
                defaults={'created_by': 'system'}
            )
            employee_instance, created = Employee_Personal_Form_Detials.objects.get_or_create(
                Employee_ID='CRTEMPL001',
                defaults={
                    'Tittle': 'Mr',
                    'First_Name': 'Vesoft',
                    'Middle_Name': 'Private',
                    'Last_Name': 'Limited',
                    'Gender': 'Male',
                    'DOB': '1999-01-01',
                    'Age': '25',
                    'Marital_Status': 'Single',
                    'E_mail': 'Vesoft@gmail.com',
                    'Contact_Number': '8657867876',
                    'created_by': 'system'
                }
            )

            # Create a superuser
            superadmin = User.objects.create_superuser(
                username='host',
                first_name='Vesoft',
                last_name='Vesoft',
                email='vesoft@gmail.com',
                password=make_password('host'),  # Password is automatically hashed by create_superuser
                is_staff=True,
                is_active=True,
                date_joined='2024-09-09'
            )

            # Create a user in UserRegister_Master_Details
            useradmin = UserRegister_Master_Details.objects.create(
                auth_user_id=superadmin,  # Correct the field name to match the ForeignKey in your model
                EmployeeType='EMPLOYEE',
                Doctor_Id=None,
                Employee_Id=employee_instance,
                role=superadmin_role,
                Access='Full',
                SubAccess='All',
                created_by='system',
            )

            # Create default locations
            default_locations = [
                {'Location_Name': 'RATNAGIRI', 'Bed_Count': 100, 'Status': True, 'created_by': 'system'},
            ]
            location_instances = [Location_Detials.objects.create(**loc) for loc in default_locations]

            # Associate default locations with the superadmin user
            useradmin.Locations.set(location_instances)
            useradmin.save()
            
            api=credentialapi.objects.create(
                token_id='11b8e78a-77f7-4a11-bf8e-48c783214ded',
                password_hash='3d5d76e8c735de0251ec20c9277cf1faa77c3b04615fabb7f4acdee11134f30e'
            )
            api.save()

            # Create default building, block, floor, and wards
            building_ins = Building_Master_Detials.objects.create(
                Building_Name='BUILDINGA',
                Location_Name=location_instances[0],
                created_by='host'
            )
            block_ins = Block_Master_Detials.objects.create(
                Block_Name='BLOCKA',
                Building_Name=building_ins,
                Location_Name=building_ins.Location_Name,
                created_by='host'
            )
            floor_ins = Floor_Master_Detials.objects.create(
                Floor_Name='FLOOR1',
                Block_Name=block_ins,
                Building_Name=block_ins.Building_Name,
                Location_Name=block_ins.Location_Name,
                created_by='host'
            )
            for ward in ['GENERAL', 'ICU', 'CASUALITY', 'OT']:
                WardType_Master_Detials.objects.create(
                    Location_Name=block_ins.Location_Name,
                    Building_Name=block_ins.Building_Name,
                    Block_Name=block_ins,
                    Floor_Name=floor_ins,
                    Ward_Name=ward,
                    created_by='host'
                )
            for rel in ['HINDU', 'MUSLIM', 'CRISTIAN']:
                Religion_Detials.objects.create(
                    Religion_Name=rel,
                    created_by='host'
                )
            for dep in ['IP', 'OP']:
                Department_Detials.objects.create(
                    Department_Name=dep,
                    created_by='host'
                )
            for des in ['DOCTOR', 'NURSE']:
                designation_ins = Designation_Detials.objects.create(
                    Designation_Name=des,
                    created_by='host'
                )
                if des == 'DOCTOR':
                    for spec in ['CARDIOLOGY', 'NEUROLOGY', 'GYNECOLOGY']:
                        Speciality_Detials.objects.create(
                            Designation_Name=designation_ins,
                            Speciality_Name=spec,
                            created_by='host'
                        )
                    for cat in ['JUNIOR', 'SENIOR', 'JUNIOR-SURGEON', 'SENIOR-SURGEON']:
                        Category_Detials.objects.create(
                            Designation_Name=designation_ins,
                            Category_Name=cat,
                            created_by='host'
                        )
            Flaggcolor_Detials.objects.create(
                Flagg_Name='GENERAL',
                Flagg_Color='#fff',
                created_by='host'
            )
        

@receiver(post_save, sender=Location_Detials)
def add_location_to_superadmin(sender, instance, created, **kwargs):
    if created:
        # Add service and procedure charges for the new location
        for ins in Service_Master_Details.objects.all():
            Service_Procedure_Charges.objects.get_or_create(
                MasterType='Service',
                Service_ratecard=ins,
                Procedure_ratecard=None,
                Location=instance,
            )
        for ins in Procedure_Master_Details.objects.all():
            Service_Procedure_Charges.objects.get_or_create(
                MasterType='Procedure',
                Service_ratecard=None,
                Procedure_ratecard=ins,
                Location=instance,
            )

        # Add the new location to the superadmin
        try:
            superadmin = UserRegister_Master_Details.objects.get(auth_user_id__username='host')
            superadmin.Locations.add(instance)
        except UserRegister_Master_Details.DoesNotExist:
            pass

@receiver(post_save, sender=Doctor_Personal_Form_Detials)
def create_doctor_ratecard(sender, instance, created, **kwargs):
    if created and instance.DoctorType != 'Referral':
        doctor_ratecard = Doctor_Ratecard_Master.objects.create(
            Doctor_ID=instance,
        )
        for room in RoomType_Master_Detials.objects.all():
            room_type_fee, _ = RoomTypeFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                room_type=room,
            )
            for insurance in Insurance_Master_Detials.objects.all():
                InsuranceRoomTypeFee.objects.get_or_create(
                    doctor_ratecard=doctor_ratecard,
                    room_type_fee=room_type_fee,
                    insurance=insurance
                )
            for client in Client_Master_Detials.objects.all():
                ClientRoomTypeFee.objects.get_or_create(
                    doctor_ratecard=doctor_ratecard,
                    room_type_fee=room_type_fee,
                    client=client
                )
        for insurance in Insurance_Master_Detials.objects.all():
            InsuranceFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                insurance=insurance
            )
        for client in Client_Master_Detials.objects.all():
            ClientFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                client=client
            )

@receiver(post_save, sender=RoomType_Master_Detials)
def create_room_type_fee(sender, instance, created, **kwargs):
    if created:
        for doctor_ratecard in Doctor_Ratecard_Master.objects.all():
            room_type_fee, _ = RoomTypeFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                room_type=instance,
            )
            for insurance in Insurance_Master_Detials.objects.all():
                InsuranceRoomTypeFee.objects.get_or_create(
                    doctor_ratecard=doctor_ratecard,
                    room_type_fee=room_type_fee,
                    insurance=insurance
                )
            for client in Client_Master_Detials.objects.all():
                ClientRoomTypeFee.objects.get_or_create(
                    doctor_ratecard=doctor_ratecard,
                    room_type_fee=room_type_fee,
                    client=client
                )
        for ratecard in Service_Procedure_Charges.objects.all():
            if ratecard.MasterType== 'Service':
                if ratecard.Service_ratecard.Department !='OP':
                    room_type_fee, _ = Service_Procedure_RoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        room_type=instance,
                        General_fee=ratecard.Service_ratecard.Amount,
                        Special_fee=ratecard.Service_ratecard.Amount,
                    )
                    for insurance in Insurance_Master_Detials.objects.all():
                        Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=ratecard,
                            room_type_fee=instance,
                            insurance=insurance,
                            fee=ratecard.Service_ratecard.Amount,
                        )
                    for client in Client_Master_Detials.objects.all():
                        Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=ratecard,
                            room_type_fee=instance,
                            client=client,
                            fee=ratecard.Service_ratecard.Amount,
                            
                        )
            else:
                room_type_fee, _ = Service_Procedure_RoomTypeFee.objects.get_or_create(
                    Service_Procedure_ratecard=ratecard,
                    room_type=instance,
                    General_fee=ratecard.Procedure_ratecard.Amount,
                    Special_fee=ratecard.Procedure_ratecard.Amount,
                )
                for insurance in Insurance_Master_Detials.objects.all():
                    Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        room_type_fee=instance,
                        insurance=insurance,
                        fee=ratecard.Procedure_ratecard.Amount,
                    )
                for client in Client_Master_Detials.objects.all():
                    Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        room_type_fee=instance,
                        client=client,
                        fee=ratecard.Procedure_ratecard.Amount,
                        
                    )
                
@receiver(post_save, sender=Insurance_Master_Detials)
def create_insurance_fee(sender, instance, created, **kwargs):
    if created:
        for doctor_ratecard in Doctor_Ratecard_Master.objects.all():
            InsuranceFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                insurance=instance,
            )
        for room_type_fee in RoomTypeFee.objects.all():
            InsuranceRoomTypeFee.objects.get_or_create(
                doctor_ratecard=room_type_fee.doctor_ratecard,
                room_type_fee=room_type_fee,
                insurance=instance
            )
        for ratecard in Service_Procedure_Charges.objects.all():
            if ratecard.MasterType=='Service':
                if ratecard.Service_ratecard.Department != 'IP':
                    Service_Procedure_InsuranceFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        insurance=instance,
                        fee=ratecard.Service_ratecard.Amount,
                    )
                    
                    
            else:
                Service_Procedure_InsuranceFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        insurance=instance,
                        fee=ratecard.Procedure_ratecard.Amount,
                        
                    )
        for room_type_fee in Service_Procedure_RoomTypeFee.objects.all():
            if room_type_fee.Service_Procedure_ratecard.MasterType=='Service':
                if room_type_fee.Service_Procedure_ratecard.Service_ratecard.Department != 'OP':
                    Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=room_type_fee.Service_Procedure_ratecard,
                        room_type_fee=room_type_fee.room_type,
                        insurance=instance,
                        fee=room_type_fee.Service_Procedure_ratecard.Service_ratecard.Amount
                    )
            else:
                Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                    Service_Procedure_ratecard=room_type_fee.Service_Procedure_ratecard,
                    room_type_fee=room_type_fee.room_type,
                    insurance=instance,
                    fee=room_type_fee.Service_Procedure_ratecard.Procedure_ratecard.Amount
                    
                )

@receiver(post_save, sender=Client_Master_Detials)
def create_client_fee(sender, instance, created, **kwargs):
    if created:
        for doctor_ratecard in Doctor_Ratecard_Master.objects.all():
            ClientFee.objects.get_or_create(
                doctor_ratecard=doctor_ratecard,
                client=instance,
            )
        for room_type_fee in RoomTypeFee.objects.all():
            ClientRoomTypeFee.objects.get_or_create(
                doctor_ratecard=room_type_fee.doctor_ratecard,
                room_type_fee=room_type_fee,
                client=instance
            )
        for ratecard in Service_Procedure_Charges.objects.all():
            if ratecard.MasterType=='Service':
                if ratecard.Service_ratecard.Department != 'IP':
                    Service_Procedure_ClientFee.objects.get_or_create(
                        Service_Procedure_ratecard=ratecard,
                        client=instance,
                        fee=ratecard.Service_ratecard.Amount,
                        
                    )
                   
            else:
                Service_Procedure_ClientFee.objects.get_or_create(
                    Service_Procedure_ratecard=ratecard,
                    client=instance,
                    fee=ratecard.Procedure_ratecard.Amount,
                    
                )
        for room_type_fee in Service_Procedure_RoomTypeFee.objects.all():
            if room_type_fee.Service_Procedure_ratecard.MasterType=='Service':
                if room_type_fee.Service_Procedure_ratecard.Service_ratecard.Department != 'OP':
                    Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=room_type_fee.Service_Procedure_ratecard,
                        room_type_fee=room_type_fee.room_type,
                        client=instance,
                        fee=room_type_fee.Service_Procedure_ratecard.Service_ratecard.Amount
                        
                    )
            else:
                Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                    Service_Procedure_ratecard=room_type_fee.Service_Procedure_ratecard,
                    room_type_fee=room_type_fee.room_type,
                    client=instance,
                    fee=room_type_fee.Service_Procedure_ratecard.Procedure_ratecard.Amount
                    
                )

# Service Procedure Master Signals

@receiver(post_save, sender=Service_Master_Details)
def create_service_procedure_charges(sender, instance, created, **kwargs):
    if created:
        locations = Location_Detials.objects.all()
        for location in locations:
            Service_Procedure_Charges.objects.get_or_create(
                MasterType='Service',
                Service_ratecard=instance,
                Procedure_ratecard=None,
                Location=location,
            )

@receiver(post_save, sender=Procedure_Master_Details)
def create_procedure_procedure_charges(sender, instance, created, **kwargs):
    if created:
        locations = Location_Detials.objects.all()
        for location in locations:
            Service_Procedure_Charges.objects.get_or_create(
                MasterType='Procedure',
                Service_ratecard=None,
                Procedure_ratecard=instance,
                Location=location,
            )

@receiver(post_save, sender=Service_Procedure_Charges)
def create_service_procedure_related_fees(sender, instance, created, **kwargs):
    if created:

        if instance.MasterType=='Service':
            if instance.Service_ratecard.Department=='IP':
                for room in RoomType_Master_Detials.objects.all():
                    room_type_fee, _ = Service_Procedure_RoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        room_type=room,
                        General_fee=instance.Service_ratecard.Amount,
                        Special_fee=instance.Service_ratecard.Amount,
                    )
                    for insurance in Insurance_Master_Detials.objects.all():
                        Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=instance,
                            room_type_fee=room,
                            insurance=insurance,
                            fee=instance.Service_ratecard.Amount,
                        )
                    for client in Client_Master_Detials.objects.all():
                        Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=instance,
                            room_type_fee=room,
                            client=client,
                            fee=instance.Service_ratecard.Amount,
                        )
            elif instance.Service_ratecard.Department=='OP':
                Service_Procedure_Rate_Charges.objects.create(
                    Service_Procedure_ratecard=instance,
                    General_fee=instance.Service_ratecard.Amount,
                    Special_fee=instance.Service_ratecard.Amount,
                )
                for insurance in Insurance_Master_Detials.objects.all():
                    Service_Procedure_InsuranceFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        insurance=insurance,
                        fee=instance.Service_ratecard.Amount,
                    )
                for client in Client_Master_Detials.objects.all():
                    Service_Procedure_ClientFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        client=client,
                        fee=instance.Service_ratecard.Amount,
                    )
            else:
                Service_Procedure_Rate_Charges.objects.create(
                    Service_Procedure_ratecard=instance
                )
                for room in RoomType_Master_Detials.objects.all():
                    room_type_fee, _ = Service_Procedure_RoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        room_type=room,
                        General_fee=instance.Service_ratecard.Amount,
                        Special_fee=instance.Service_ratecard.Amount,
                    )
                    for insurance in Insurance_Master_Detials.objects.all():
                        Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=instance,
                            room_type_fee=room,
                            insurance=insurance,
                            fee=instance.Service_ratecard.Amount,
                        )
                    for client in Client_Master_Detials.objects.all():
                        Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                            Service_Procedure_ratecard=instance,
                            room_type_fee=room,
                            client=client,
                            fee=instance.Service_ratecard.Amount,
                        )
                        
                for insurance in Insurance_Master_Detials.objects.all():
                    Service_Procedure_InsuranceFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        insurance=insurance,
                        fee=instance.Service_ratecard.Amount,
                    )
                for client in Client_Master_Detials.objects.all():
                    Service_Procedure_ClientFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        client=client,
                        fee=instance.Service_ratecard.Amount,
                    )
        else:
            Service_Procedure_Rate_Charges.objects.create(
                Service_Procedure_ratecard=instance,
                General_fee=instance.Procedure_ratecard.Amount,
                Special_fee=instance.Procedure_ratecard.Amount,
            )
            for room in RoomType_Master_Detials.objects.all():
                room_type_fee, _ = Service_Procedure_RoomTypeFee.objects.get_or_create(
                    Service_Procedure_ratecard=instance,
                    room_type=room,
                    General_fee=instance.Procedure_ratecard.Amount,
                    Special_fee=instance.Procedure_ratecard.Amount,
                )
                for insurance in Insurance_Master_Detials.objects.all():
                    Service_Procedure_InsuranceRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        room_type_fee=room,
                        insurance=insurance,
                        fee=instance.Procedure_ratecard.Amount,
                    )
                for client in Client_Master_Detials.objects.all():
                    Service_Procedure_ClientRoomTypeFee.objects.get_or_create(
                        Service_Procedure_ratecard=instance,
                        room_type_fee=room,
                        client=client,
                        fee=instance.Procedure_ratecard.Amount,
                    )
                    
            for insurance in Insurance_Master_Detials.objects.all():
                Service_Procedure_InsuranceFee.objects.get_or_create(
                    Service_Procedure_ratecard=instance,
                    insurance=insurance,
                    fee=instance.Procedure_ratecard.Amount,
                )
            for client in Client_Master_Detials.objects.all():
                Service_Procedure_ClientFee.objects.get_or_create(
                    Service_Procedure_ratecard=instance,
                    client=client,
                    fee=instance.Procedure_ratecard.Amount,
                )
       
    # ---------------- update the charge -------


# Signal for updating related records when Service_Master_Details.Amount changes
@receiver(post_save, sender=Service_Master_Details)
def update_service_amount(sender, instance, created, **kwargs):
    if not created:  # Only trigger on updates, not on create
        
        # Find related Service_Procedure_Charges entries and update related tables
        service_procedure_charges = Service_Procedure_Charges.objects.filter(Service_ratecard=instance)
        for sp_charge in service_procedure_charges:

            # Update Service_Procedure_Rate_Charges
            for rate_charge in Service_Procedure_Rate_Charges.objects.filter(Service_Procedure_ratecard=sp_charge):
                rate_charge.General_Prev_fee = rate_charge.General_fee
                rate_charge.Special_Prev_fee = rate_charge.Special_fee
                rate_charge.General_fee = instance.Amount
                rate_charge.Special_fee = instance.Amount
                rate_charge.save()

            # Update Service_Procedure_RoomTypeFee
            for room_type_fee in Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                room_type_fee.General_Prev_fee = room_type_fee.General_fee
                room_type_fee.Special_Prev_fee = room_type_fee.Special_fee
                room_type_fee.General_fee = instance.Amount
                room_type_fee.Special_fee = instance.Amount
                room_type_fee.save()

            # Update Service_Procedure_InsuranceFee
            for insurance_fee in Service_Procedure_InsuranceFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                insurance_fee.Prev_fee = insurance_fee.fee
                insurance_fee.fee = instance.Amount
                insurance_fee.save()

            # Update Service_Procedure_ClientFee
            for client_fee in Service_Procedure_ClientFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                client_fee.Prev_fee = client_fee.fee
                client_fee.fee = instance.Amount
                client_fee.save()

            # Update Service_Procedure_InsuranceRoomTypeFee
            for insurance_room_type_fee in Service_Procedure_InsuranceRoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                insurance_room_type_fee.Prev_fee = insurance_room_type_fee.fee
                insurance_room_type_fee.fee = instance.Amount
                insurance_room_type_fee.save()

            # Update Service_Procedure_ClientRoomTypeFee
            for client_room_type_fee in Service_Procedure_ClientRoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                client_room_type_fee.Prev_fee = client_room_type_fee.fee
                client_room_type_fee.fee = instance.Amount
                client_room_type_fee.save()

# Signal for updating related records when Procedure_Master_Details.Amount changes
@receiver(post_save, sender=Procedure_Master_Details)
def update_procedure_amount(sender, instance, created, **kwargs):
    if not created:  # Only trigger on updates, not on create

        # Find related Service_Procedure_Charges entries and update related tables
        procedure_procedure_charges = Service_Procedure_Charges.objects.filter(Procedure_ratecard=instance)
        for sp_charge in procedure_procedure_charges:

            # Update Service_Procedure_Rate_Charges
            for rate_charge in Service_Procedure_Rate_Charges.objects.filter(Service_Procedure_ratecard=sp_charge):
                rate_charge.General_Prev_fee = rate_charge.General_fee
                rate_charge.Special_Prev_fee = rate_charge.Special_fee
                rate_charge.General_fee = instance.Amount
                rate_charge.Special_fee = instance.Amount
                rate_charge.save()

            # Update Service_Procedure_RoomTypeFee
            for room_type_fee in Service_Procedure_RoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                room_type_fee.General_Prev_fee = room_type_fee.General_fee
                room_type_fee.Special_Prev_fee = room_type_fee.Special_fee
                room_type_fee.General_fee = instance.Amount
                room_type_fee.Special_fee = instance.Amount
                room_type_fee.save()

            # Update Service_Procedure_InsuranceFee
            for insurance_fee in Service_Procedure_InsuranceFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                insurance_fee.Prev_fee = insurance_fee.fee
                insurance_fee.fee = instance.Amount
                insurance_fee.save()

            # Update Service_Procedure_ClientFee
            for client_fee in Service_Procedure_ClientFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                client_fee.Prev_fee = client_fee.fee
                client_fee.fee = instance.Amount
                client_fee.save()

            # Update Service_Procedure_InsuranceRoomTypeFee
            for insurance_room_type_fee in Service_Procedure_InsuranceRoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                insurance_room_type_fee.Prev_fee = insurance_room_type_fee.fee
                insurance_room_type_fee.fee = instance.Amount
                insurance_room_type_fee.save()

            # Update Service_Procedure_ClientRoomTypeFee
            for client_room_type_fee in Service_Procedure_ClientRoomTypeFee.objects.filter(Service_Procedure_ratecard=sp_charge):
                client_room_type_fee.Prev_fee = client_room_type_fee.fee
                client_room_type_fee.fee = instance.Amount
                client_room_type_fee.save()
         
@receiver(post_delete, sender=Location_Detials)
def delete_related_service_procedure_charges(sender, instance, **kwargs):
    Service_Procedure_Charges.objects.filter(Location=instance).delete()

@receiver(post_delete, sender=Doctor_Personal_Form_Detials)
def delete_related_doctor_ratecards(sender, instance, **kwargs):
    Doctor_Ratecard_Master.objects.filter(Doctor_ID=instance).delete()

@receiver(post_delete, sender=RoomType_Master_Detials)
def delete_related_room_type_fees(sender, instance, **kwargs):
    RoomTypeFee.objects.filter(room_type=instance).delete()
    Service_Procedure_RoomTypeFee.objects.filter(room_type=instance).delete()

@receiver(post_delete, sender=Insurance_Master_Detials)
def delete_related_insurance_fees(sender, instance, **kwargs):
    InsuranceFee.objects.filter(insurance=instance).delete()
    InsuranceRoomTypeFee.objects.filter(insurance=instance).delete()
    Service_Procedure_InsuranceFee.objects.filter(insurance=instance).delete()
    Service_Procedure_InsuranceRoomTypeFee.objects.filter(insurance=instance).delete()

@receiver(post_delete, sender=Client_Master_Detials)
def delete_related_client_fees(sender, instance, **kwargs):
    ClientFee.objects.filter(client=instance).delete()
    ClientRoomTypeFee.objects.filter(client=instance).delete()
    Service_Procedure_ClientFee.objects.filter(client=instance).delete()
    Service_Procedure_ClientRoomTypeFee.objects.filter(client=instance).delete()

@receiver(post_delete, sender=Service_Master_Details)
def delete_related_service_procedure_charges(sender, instance, **kwargs):
    Service_Procedure_Charges.objects.filter(Service_ratecard=instance).delete()

@receiver(post_delete, sender=Procedure_Master_Details)
def delete_related_procedure_procedure_charges(sender, instance, **kwargs):
    Service_Procedure_Charges.objects.filter(Procedure_ratecard=instance).delete()





