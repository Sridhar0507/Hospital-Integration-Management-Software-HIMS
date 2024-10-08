from django.db import models
from django.db.models import Max
from Masters.models import *
from datetime import datetime
from django.core.exceptions import ValidationError

# Create your models here.
class EmergencyRegister(models.Model):
    EmergencyRegister_Id = models.IntegerField(primary_key=True)
    PatientName = models.CharField(max_length=50)
    PatientPhone = models.CharField(max_length=50)
    Speciality = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE, related_name='emg_register_specialities',null=True,blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='emg_register_Doctor')
    ReferalDoctor = models.CharField(max_length=50)
    Status = models.CharField(max_length=30, default='Pending')
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'EmergencyRegister'

    
    
    def save(self, *args, **kwargs):
        if not self.EmergencyRegister_Id:  # Check if accountsetting_id is not set
            max_id = EmergencyRegister.objects.aggregate(max_id=Max('EmergencyRegister_Id'))['max_id']
            self.EmergencyRegister_Id = (max_id or 0) + 1
        super(EmergencyRegister, self).save(*args,**kwargs)


# # --------------Appointment Request List

class Appointment_Request_List(models.Model):
    appointment_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=10)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    request_date = models.DateField()
    appointment_type = models.CharField(max_length=10)
    request_time = models.TimeField()
    visit_purpose = models.CharField(max_length=30)
    specialization = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE,related_name='appointment_request_list_specialization',null=True,blank=True)
    doctor_name = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE,related_name='appointment_request_list_doctor_name',null=True,blank=True)
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE)
    status = models.CharField(max_length=30, default='PENDING')
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cancelReason = models.CharField(max_length=200)
    def __str__(self):
        return f"{self.title} {self.first_name} {self.last_name}"
    
    def save(self, *args, **kwargs):
        if not self.appointment_id:  # Check if appointment_id is not set (i.e., new instance)
            max_id = Appointment_Request_List.objects.aggregate(max_id=Max('appointment_id'))['max_id']
            self.appointment_id = (max_id or 0) + 1
        super(Appointment_Request_List, self).save(*args, **kwargs)


class Appointment_ReSchedule_Request(models.Model):
    appointmentId = models.ForeignKey(Appointment_Request_List,on_delete=models.CASCADE,null=True,blank=True)
    RadioOption = models.CharField(max_length=30)
    RequestDate = models.DateField()
    ChangingReason = models.TextField(default='')
    specialization = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE,related_name='appointment_reschedule_list_specialization',null=True,blank=True)
    doctor_name = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE,related_name='appointment_reschedule_list_doctor_name',null=True,blank=True)
    created_by = models.CharField(max_length=30, default='')
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# # --------------patient registration

class Patient_Detials(models.Model):
    PatientId = models.CharField(primary_key=True,max_length=30)
    DuplicateId = models.BooleanField(default=False)
    Patient_profile = models.BinaryField(null=True,blank=True,default=True)
    CasesheetNo = models.CharField(max_length=30,unique=True)
    PhoneNo = models.CharField(max_length=30)
    Title = models.CharField(max_length=30)
    FirstName = models.CharField(max_length=30)
    MiddleName = models.CharField(max_length=30)
    SurName = models.CharField(max_length=30)
    Gender = models.CharField(max_length=30)
    AliasName = models.CharField(max_length=30)
    DOB = models.CharField(max_length=20)
    Age = models.CharField(max_length=20)
    Email = models.CharField(max_length=30)
    BloodGroup = models.CharField(max_length=10)
    Occupation = models.CharField(max_length=30)
    Religion = models.ForeignKey(Religion_Detials, on_delete=models.CASCADE, related_name='Orgional_patientId',null=True,blank=True)
    Nationality = models.CharField(max_length=30)
    UniqueIdType = models.CharField(max_length=30)
    UniqueIdNo = models.CharField(max_length=30)
    DoorNo = models.CharField(max_length=20)
    Street = models.CharField(max_length=30)
    Area = models.CharField(max_length=30)
    City = models.CharField(max_length=30)
    State = models.CharField(max_length=30)
    Country = models.CharField(max_length=30)
    Pincode = models.CharField(max_length=20)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Detials'
    
    
    def save(self, *args, **kwargs):
       

        if not self.PatientId:
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}'
            
            # Find the maximum numeric part from existing PatientId with the same prefix
            max_patient_id = Patient_Detials.objects.aggregate(max_id=Max('PatientId'))['max_id']
            if max_patient_id:
                numeric_part = int(max_patient_id[-4:]) + 1
            else:
                numeric_part = 1
            self.PatientId = f'{prefix}{numeric_part:04}'
       
        super(Patient_Detials, self).save(*args, **kwargs)


class Duplicates_patients(models.Model):
    Orgional_patientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='Orgional_patientId')
    Duplicates_patientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='Duplicates_patientId')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Duplicates_patients'
   


class Patient_Visit_Detials(models.Model):
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='Patient_Visit_patient_detials')
    VisitId = models.IntegerField(default=1)
    RegisterType = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Visit_Detials'
   




from django.db import models
from django.db.models import Max
from datetime import datetime

class Patient_Appointment_Registration_Detials(models.Model):
    Registration_Id = models.CharField(max_length=30, unique=True)
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='appointment_details')
    VisitId = models.IntegerField()
    VisitPurpose = models.CharField(max_length=30)
    Specialization = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE, related_name='appointment_speciality', null=True, blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='appointment_doctor', null=True, blank=True)
    AppointmentId = models.IntegerField()
    ApptoRegId = models.ForeignKey(Appointment_Request_List, on_delete=models.CASCADE, null=True, blank=True)
    AppointmentSlot_by_Specialization = models.IntegerField()
    AppointmentSlot_by_Doctor = models.IntegerField()
    Complaint = models.TextField(default='')
    PatientType = models.CharField(max_length=30)
    PatientCategory = models.CharField(max_length=30)
    InsuranceName = models.CharField(max_length=30)
    InsuranceType = models.CharField(max_length=30)
    ClientName = models.CharField(max_length=30)
    ClientType = models.CharField(max_length=30)
    ClientEmployeeId = models.CharField(max_length=30)
    ClientEmployeeDesignation = models.CharField(max_length=30)
    ClientEmployeeRelation = models.CharField(max_length=30)
    EmployeeId = models.ForeignKey(Employee_Personal_Form_Detials, on_delete=models.CASCADE, related_name='appointment_EmployeeId', null=True, blank=True)
    EmployeeRelation = models.CharField(max_length=30)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='appointment_DoctorId', null=True, blank=True)
    DoctorRelation = models.CharField(max_length=30)
    DonationType = models.CharField(max_length=30)
    IsMLC = models.CharField(max_length=20)
    Flagging = models.CharField(max_length=30)
    IsReferral = models.CharField(max_length=20)
    Status = models.CharField(max_length=20, default='Pending')
    Reason = models.TextField()
    IP_Request_status = models.CharField(max_length=20, default='No')
    Location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Appointment_Registration_Detials'
    
    def save(self, *args, **kwargs):
        # Check if this is a new instance (when self.pk is None)
        if not self.pk:
            current_date = datetime.now().strftime('%Y-%m-%d')
            start_id = 1

            # AppointmentId logic
            max_id_today = Patient_Appointment_Registration_Detials.objects.filter(
                created_at__date=current_date
            ).aggregate(max_id=Max('AppointmentId'))['max_id']
            self.AppointmentId = (max_id_today or 0) + start_id
            
            # AppointmentSlot by specialization logic
            max_spi_slot_today = Patient_Appointment_Registration_Detials.objects.filter(
                created_at__date=current_date,
                Specialization=self.Specialization
            ).aggregate(max_slot=Max('AppointmentSlot_by_Specialization'))['max_slot']
            self.AppointmentSlot_by_Specialization = (max_spi_slot_today or 0) + start_id
            
            # AppointmentSlot by doctor logic
            max_doc_slot_today = Patient_Appointment_Registration_Detials.objects.filter(
                created_at__date=current_date,
                PrimaryDoctor=self.PrimaryDoctor
            ).aggregate(max_slot=Max('AppointmentSlot_by_Doctor'))['max_slot']
            self.AppointmentSlot_by_Doctor = (max_doc_slot_today or 0) + start_id
            
            # Generate Registration_Id
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}OP'
            
            # Find the maximum numeric part from existing PatientId with the same prefix
            max_Registration_Id = Patient_Appointment_Registration_Detials.objects.aggregate(max_id=Max('Registration_Id'))['max_id']
            if max_Registration_Id:
                numeric_part = int(max_Registration_Id[-5:]) + 1
            else:
                numeric_part = 1
            self.Registration_Id = f'{prefix}{numeric_part:05}'
            
        super(Patient_Appointment_Registration_Detials, self).save(*args, **kwargs)

    def __str__(self):
        return self.Registration_Id


class Patient_IP_Registration_Detials(models.Model):
    Registration_Id = models.CharField(primary_key=True,max_length=30)
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE,)
    VisitId = models.IntegerField()
    Specialization = models.ForeignKey(Speciality_Detials,on_delete=models.CASCADE,null=True,blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Primary_doctor_ip_details',null=True,blank=True)
    Complaint = models.TextField(default='')
    PatientType = models.CharField(max_length=30)
    PatientCategory = models.CharField(max_length=30)
    InsuranceName = models.CharField(max_length=30)
    InsuranceType = models.CharField(max_length=30)
    ClientName = models.CharField(max_length=30)
    ClientType = models.CharField(max_length=30)
    ClientEmployeeId = models.CharField(max_length=30)
    ClientEmployeeDesignation = models.CharField(max_length=30)
    ClientEmployeeRelation = models.CharField(max_length=30)
    EmployeeId = models.ForeignKey(Employee_Personal_Form_Detials,on_delete=models.CASCADE,null=True,blank=True)
    EmployeeRelation = models.CharField(max_length=30)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='doctor_ip_details',null=True,blank=True)
    DoctorRelation = models.CharField(max_length=30)
    DonationType = models.CharField(max_length=30)
    IsMLC = models.CharField(max_length=20)
    Flagging = models.CharField(max_length=30)
    IsReferral = models.CharField(max_length=20)
    Status = models.CharField(max_length=20,default='Pending')
    Booking_Status = models.CharField(max_length=30, default='Booked')
    Reason =models.TextField(default='')
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_IP_Registration_Detials'
    def save(self, *args, **kwargs):
        if not self.Registration_Id:
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}IP'
            
            # Find the maximum numeric part from existing PatientId with the same prefix
            max_Registration_Id = Patient_IP_Registration_Detials.objects.aggregate(max_id=Max('Registration_Id'))['max_id']
            if max_Registration_Id:
                numeric_part = int(max_Registration_Id[-5:]) + 1
            else:
                numeric_part = 1
            self.Registration_Id = f'{prefix}{numeric_part:05}'
       
        super(Patient_IP_Registration_Detials, self).save(*args, **kwargs)

   



class Patient_Casuality_Registration_Detials(models.Model):
    Registration_Id = models.CharField(max_length=30,unique=True)
    IsConsciousness = models.BooleanField(default=True) 
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='casuality_appointment_details',null=True,blank=True,default=None)
    VisitId = models.IntegerField(null=True,blank=True)
    Specialization = models.ForeignKey(Speciality_Detials,on_delete=models.CASCADE,related_name='casuality_appointment_speciality',null=True,blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='casuality_appointment_doctor',null=True,blank=True)
    Complaint = models.TextField(default="")
    PatientType = models.CharField(max_length=30)
    PatientCategory = models.CharField(max_length=30)
    InsuranceName = models.CharField(max_length=30)
    InsuranceType = models.CharField(max_length=30)
    ClientName = models.CharField(max_length=30)
    ClientType = models.CharField(max_length=30)
    ClientEmployeeId = models.CharField(max_length=30)
    ClientEmployeeDesignation = models.CharField(max_length=30)
    ClientEmployeeRelation = models.CharField(max_length=30)
    EmployeeId = models.ForeignKey(Employee_Personal_Form_Detials,on_delete=models.CASCADE,related_name='casuality_appointment_EmployeeId',null=True,blank=True)
    EmployeeRelation = models.CharField(max_length=30)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='casuality_appointment_DoctorId',null=True,blank=True)
    DoctorRelation = models.CharField(max_length=30)
    DonationType = models.CharField(max_length=30)
    IsMLC = models.CharField(max_length=20)
    Flagging = models.CharField(max_length=30)
    IsReferral = models.CharField(max_length=20)
    Status = models.CharField(max_length=20,default='Pending')
    Booking_Status = models.CharField(max_length=30, default='Booked')
    Reason =models.CharField(max_length=200)
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Casuality_Registration_Detials'
    def save(self, *args, **kwargs):
       

        if not self.Registration_Id:
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}'
            
            # Find the maximum numeric part from existing PatientId with the same prefix
            max_patient_id = Patient_Casuality_Registration_Detials.objects.aggregate(max_id=Max('Registration_Id'))['max_id']
            if max_patient_id:
                numeric_part = int(max_patient_id[-5:]) + 1
            else:
                numeric_part = 1
            self.Registration_Id = f'{prefix}{numeric_part:05}'
       
        super(Patient_Casuality_Registration_Detials, self).save(*args, **kwargs)
    

class Patient_Admission_Detials(models.Model):
    IsConverted=models.BooleanField(default=False)
    IsCasualityPatient= models.BooleanField(default=False)
    IP_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    OP_Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    AdmissionPurpose = models.CharField(max_length=30,default='')
    DrInchargeAtTimeOfAdmission = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, null=True,blank=True)
    NextToKinName = models.CharField(max_length=30)
    Relation = models.CharField(max_length=30)
    RelativePhoneNo = models.CharField(max_length=30)
    PersonLiableForPayment = models.CharField(max_length=30)
    FamilyHead = models.CharField(max_length=30)
    FamilyHeadName = models.CharField(max_length=30)
    IpKitGiven = models.CharField(max_length=30)    
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Admission_Detials'
    

class Patient_Admission_Room_Detials(models.Model):
    RegisterType= models.CharField(max_length=30)
    IP_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)
    RoomId =models.ForeignKey(Room_Master_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Admitted_Date = models.DateTimeField(null=True,blank=True,default=None)
    Discharge_Date = models.DateTimeField(null=True,blank=True,default=None)
    Status=models.BooleanField(default=False)
    IsStayed=models.BooleanField(default=False)
    CurrentlyStayed=models.BooleanField(default=False)
    Iscanceled=models.BooleanField(default=False)
    created_by = models.CharField(max_length=30)
    Approved_by = models.CharField(max_length=30,default='')
    CancelReason=models.TextField(default='')
    PatientfileRecieved=models.BooleanField(default=False)
    MedicineTransfered=models.BooleanField(default=False)
    AnyMedicalRecordError=models.BooleanField(default=False)
    ConfirmationfromReletives=models.BooleanField(default=False)
    ReletiveName=models.CharField(max_length=30,default="")
    MedRecReason=models.TextField(default='')
    bedtransferReason=models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Admission_Room_Detials'
    def __str__(self):
        return f"{self.RegisterType} - {self.RoomId}"



class Op_to_Ip_Convertion_Table(models.Model):
    id = models.AutoField(primary_key=True)
    Patient_Id = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE)
    Registration_id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    Reason = models.CharField(max_length=400, default= 'None')
    IpNotes = models.CharField(max_length=400, default= 'None')
    Status = models.CharField(max_length=40, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Op_to_Ip_Convertion_Table'
    







class Patient_Diagnosis_Registration_Detials(models.Model):
    Registration_Id = models.CharField(max_length=30,unique=True)
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='Diagnosis_appointment_details')
    VisitId = models.IntegerField(null= True)
    Specialization = models.ForeignKey(Speciality_Detials,on_delete=models.CASCADE,related_name='Diagnosis_appointment_speciality',null=True,blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Diagnosis_appointment_doctor',null=True,blank=True)
    Complaint = models.TextField(default='')
    PatientType = models.CharField(max_length=30)
    PatientCategory = models.CharField(max_length=30)
    InsuranceName = models.CharField(max_length=30)
    InsuranceType = models.CharField(max_length=30)
    ClientName = models.CharField(max_length=30)
    ClientType = models.CharField(max_length=30)
    ClientEmployeeId = models.CharField(max_length=30)
    ClientEmployeeDesignation = models.CharField(max_length=30)
    ClientEmployeeRelation = models.CharField(max_length=30)
    EmployeeId = models.ForeignKey(Employee_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Diagnosis_appointment_EmployeeId',null=True,blank=True)
    EmployeeRelation = models.CharField(max_length=30)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Diagnosis_appointment_DoctorId',null=True,blank=True)
    DoctorRelation = models.CharField(max_length=30)
    DonationType = models.CharField(max_length=30)
    IsMLC = models.CharField(max_length=20)
    Flagging = models.CharField(max_length=30)
    IsReferral = models.CharField(max_length=20)
    Status = models.CharField(max_length=20,default='Pending')
    Reason =models.CharField(max_length=200)
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Diagnosis_Registration_Detials'
    
    def save(self, *args, **kwargs):
       

        if not self.PatientId:
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}'
            
            # Find the maximum numeric part from existing PatientId with the same prefix
            max_patient_id = Patient_Diagnosis_Registration_Detials.objects.aggregate(max_id=Max('Registration_Id'))['max_id']
            if max_patient_id:
                numeric_part = int(max_patient_id[-5:]) + 1
            else:
                numeric_part = 1
            self.PatientId = f'{prefix}{numeric_part:05}'
       
        super(Patient_Diagnosis_Registration_Detials, self).save(*args, **kwargs)

class Patient_Laboratory_Registration_Detials(models.Model):
    Registration_Id = models.CharField(max_length=30,unique=True)
    PatientId = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='Laboratory_appointment_details')
    VisitId = models.IntegerField()
    Specialization = models.ForeignKey(Speciality_Detials,on_delete=models.CASCADE,related_name='laboratory_appointment_speciality',null=True,blank=True)
    PrimaryDoctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='laboratory_appointment_doctor',null=True,blank=True)
    Complaint = models.TextField(default='')
    PatientType = models.CharField(max_length=30)
    PatientCategory = models.CharField(max_length=30)
    InsuranceName = models.CharField(max_length=30)
    InsuranceType = models.CharField(max_length=30)
    ClientName = models.CharField(max_length=30)
    ClientType = models.CharField(max_length=30)
    ClientEmployeeId = models.CharField(max_length=30)
    ClientEmployeeDesignation = models.CharField(max_length=30)
    ClientEmployeeRelation = models.CharField(max_length=30)
    EmployeeId = models.ForeignKey(Employee_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Laboratory_appointment_EmployeeId',null=True,blank=True)
    EmployeeRelation = models.CharField(max_length=30)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Laboratory_appointment_DoctorId',null=True,blank=True)
    DoctorRelation = models.CharField(max_length=30)
    DonationType = models.CharField(max_length=30)
    IsMLC = models.CharField(max_length=20)
    Flagging = models.CharField(max_length=30)
    IsReferral = models.CharField(max_length=20)
    Status = models.CharField(max_length=20,default='Pending')
    Reason =models.CharField(max_length=200)
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Laboratory_Registration_Detials'
    def save(self, *args, **kwargs):
        # Check if Registration_Id is not already set, then generate it
        if not self.Registration_Id:
            # Fetch the hospital details
            hospital_details = Hospital_Detials.objects.first()
            if not hospital_details:
                raise ValueError("No Hospital_Details records found.")
            
            # Generate prefix from hospital name and current date
            clinic_name = hospital_details.Hospital_Name[:3].upper()
            today_date = datetime.now().strftime('%y%m%d')
            prefix = f'{clinic_name}{today_date}LAB'
            
            # Get the maximum existing Registration_Id for this prefix
            max_registration_id = Patient_Laboratory_Registration_Detials.objects.filter(
                Registration_Id__startswith=prefix
            ).aggregate(max_id=Max('Registration_Id'))['max_id']
            
            if max_registration_id:
                # Extract the numeric part from the max Registration_Id
                numeric_part = int(max_registration_id[-5:]) + 1
            else:
                numeric_part = 1
            
            # Assign new Registration_Id
            self.Registration_Id = f'{prefix}{numeric_part:05}'

        # Call the parent class's save method
        super(Patient_Laboratory_Registration_Detials, self).save(*args, **kwargs)





class Patient_Referral_Detials(models.Model):
    ReferralRegisteredBy = models.CharField(max_length=30)
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Laboratory_Register_Id = models.ForeignKey(Patient_Laboratory_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Diagnosis_Register_Id = models.ForeignKey(Patient_Diagnosis_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    ReferralSource = models.CharField(max_length=30)
    ReferredBy = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='referral_doctorname',null=True,blank=True)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Patient_Referral_Detials'


# -------------------------------ForBilling------------------


class OP_Billing_QueueList_Detials(models.Model):
    BillingQueueList_ID=models.AutoField(primary_key=True)
    Billing_Type=models.CharField(max_length=100)
    Registration_Id=models.ForeignKey(Patient_Appointment_Registration_Detials,on_delete=models.CASCADE,related_name='OP_Billing_QueueList_Registration_Id')
    Doctor_Ratecard_Id=models.ForeignKey(Doctor_Ratecard_Master,on_delete=models.CASCADE,related_name='OP_Billing_Doctor_Ratecard_Id')
    Status=models.CharField(max_length=50)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'OP_Billing_QueueList_Detials'

    def __str__(self):
        return self.Billing_Type
    


class General_Billing_Table_Detials(models.Model):
    Billing_Invoice_No=models.CharField(primary_key=True,max_length=30)
    Billing_Date=models.DateField()
    Doctor_Id=models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='Billing_Doctor_Id')
    Patient_Id=models.ForeignKey(Patient_Detials,on_delete=models.CASCADE,related_name='Billing_Patient_Id')
    Register_Id=models.ForeignKey(Patient_Appointment_Registration_Detials,on_delete=models.CASCADE,related_name='Billing_Patient_Id')
    Visit_Id=models.ForeignKey(Patient_Visit_Detials,on_delete=models.CASCADE,related_name='Billing_Visit_Id')
    Billing_Type=models.CharField(max_length=150)
    Select_Discount=models.CharField(max_length=50)
    Discount_Type=models.CharField(max_length=30)
    Discount_Value=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Total_Items=models.IntegerField()
    Total_Qty=models.IntegerField()
    Total_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Total_GSTAmount=models.DecimalField(max_digits=10, decimal_places=2)
    Net_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Round_Off=models.DecimalField(max_digits=10, decimal_places=2)
    Paid_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Balance_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Bill_Status=models.CharField(max_length=20)
    created_by = models.CharField(max_length=100)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class meta:
        db_table='General_Billing_Table_Detials'

    def save(self, *args, **kwargs):
        if not self.Billing_Invoice_No:
            Add_Invoice_Char = 'OPDR/'
            Max_Invoice_No_row = General_Billing_Table_Detials.objects.exclude(created_by='system').aggregate(max_id=Max('Billing_Invoice_No'))['max_id']
            Max_Invoice_No = Max_Invoice_No_row if Max_Invoice_No_row else None
            numeric_part = int(str(Max_Invoice_No)[5:]) + 1 if Max_Invoice_No else 1
            self.Billing_Invoice_No = f'{Add_Invoice_Char}{numeric_part:04}'
        
        super(General_Billing_Table_Detials, self).save(*args, **kwargs)


class General_Billing_Items_Table_Detials(models.Model):
    Items_Id=models.AutoField(primary_key=True)
    Billing_Invoice_No=models.ForeignKey(General_Billing_Table_Detials,on_delete=models.CASCADE,related_name='Items_Table_Billing_Invoice_No')
    Service_Type=models.CharField(max_length=100)
    Service_Code=models.CharField(max_length=30)
    Service_Name=models.CharField(max_length=350)
    Rate=models.DecimalField(max_digits=10, decimal_places=2)
    Charge=models.DecimalField(max_digits=10, decimal_places=2)
    Quantity=models.IntegerField()
    Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Type=models.CharField(max_length=30)
    Discount_Value=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Taxable_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Tax_Percentage=models.IntegerField()
    Tax_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Total_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Item_Status=models.CharField(max_length=30)

    class Meta:
        db_table = 'General_Billing_Items_Table_Detials'

    def __str__(self):
        return self.Service_Name


class Multiple_Payment_Table_Detials(models.Model):
    S_No=models.AutoField(primary_key=True)
    Invoice_No=models.ForeignKey(General_Billing_Table_Detials,on_delete=models.CASCADE,related_name='Multiple_Payment_Billing_Invoice')
    Payment_Type=models.CharField(max_length=70)
    Cart_Type=models.CharField(max_length=30)
    Cheque_No=models.CharField(max_length=20)
    Bank_Name=models.CharField(max_length=50)
    Amount=models.DecimalField(max_digits=10,decimal_places=2)

    class Meta:
        db_table = 'Multiple_Payment_Table_Detials'

    def __str__(self):
        return self.Payment_Type

    


class Handover_detials_Ip(models.Model):
    RegistrationId=models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,related_name='Handover_Ip_register')
    ReasonForAdmission=models.TextField()
    PatientConditionOnAdmission=models.TextField()
    PatientFileGiven=models.BooleanField(default=False)
    AadharGiven=models.BooleanField(default=False)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Handover_detials_Ip'


class Service_Procedure_request_Ip(models.Model):
    MASTER_TYPE_CHOICES = [
        ('Service', 'Service'),
        ('Procedure', 'Procedure'),
    ]

    MasterType = models.CharField(max_length=10, choices=MASTER_TYPE_CHOICES)
    Service_ratecard = models.ForeignKey(Service_Master_Details, on_delete=models.CASCADE, related_name='Service_charges_ip', null=True, blank=True,default=None)
    Procedure_ratecard = models.ForeignKey(Procedure_Master_Details, on_delete=models.CASCADE, related_name='Procedure_charges_ip', null=True, blank=True,default=None)
    RegistrationId=models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,related_name='Service_Procedure_request_Ip')
    RoomId =models.ForeignKey(Room_Master_Detials,on_delete=models.CASCADE,related_name='RoomId_service_procedure',null=True,blank=True)
    Units = models.DecimalField(max_digits=10,decimal_places=2)
    Status = models.BooleanField(default=False)
    created_by = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Service_Procedure_request_Ip' 

   
        
class OPD_Flow(models.Model):
    OPD_Id = models.AutoField(primary_key=True)
    Patient_Id = models.ForeignKey(Patient_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Specialization = models.ForeignKey(Speciality_Detials,on_delete=models.CASCADE,null=True,blank=True)
    DoctorId = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='registration_doctor_name',null=True,blank=True)
    RegisterType = models.CharField(max_length=30)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Registration_Cancel_Reason = models.TextField(default='')
    Appointment_Cancel_Reason = models.TextField(default='')
    Appointment_Reschedule_Reason = models.TextField(default='')
    RegistrationReshedule_Reason = models.TextField(default='')
    AppointmentDoctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='appointment_previous_doctor_name',null=True,blank=True)
    Registration_Status = models.CharField(max_length=40, default='Pending')
    AppointmentType = models.CharField(max_length=40)
    Appointment_Id = models.ForeignKey(Appointment_Request_List,on_delete=models.CASCADE,null=True,blank=True)
    Appointment_Status = models.CharField(max_length=40, default='Pending')
    created_by = models.CharField(max_length=40)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'OPD_Flow'
    
    def save(self, *args, **kwargs):
        if not self.OPD_Id:
            max_id_dict = OPD_Flow.objects.aggregate(max_id=Max('OPD_Id'))
            max_id = max_id_dict.get('max_id', 0)  # Extract max_id from the dict
            self.OPD_Id = (max_id or 0) + 1
        super(OPD_Flow, self).save(*args, **kwargs)

        
# class Appointment_to_Registration(models.Model):
#     ApptoRegId = models.AutoField(primary_key=True)
#     Appointment_Id = models.ForeignKey(Appointment_Request_List,on_delete=models.CASCADE,null=True,blank=True)
#     Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
#     created_by = models.CharField(max_length=40)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     class Meta:
#         db_table = 'Appointment_to_Registration'
#     def save(self, *args, **kwargs):
#         if not self.ApptoRegId:
#             max_id_dict = Appointment_to_Registration.objects.aggregate(max_id=Max('ApptoRegId'))
#             max_id = max_id_dict.get('max_id', 0)  # Extract max_id from the dict
#             self.ApptoRegId = (max_id or 0) + 1
#         super(Appointment_to_Registration, self).save(*args,**kwargs)
    


class Patient_Appointment_Registration_Cancel_Details(models.Model):
    Cancel_Id = models.IntegerField(primary_key=True)
    Registration_Id = models.ForeignKey(
        Patient_Appointment_Registration_Detials, 
        on_delete=models.CASCADE, 
        related_name='cancel_registration_details'
    )
    Cancel_Reason = models.TextField()
    Status = models.CharField(max_length=30, default = 'Cancelled')
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Patient_Appointment_Registration_Cancel_Details'
        
    def save(self, *args, **kwargs):
        if not self.Cancel_Id:
            max_id = Patient_Appointment_Registration_Cancel_Details.objects.aggregate(
                max_id=Max('Cancel_Id')
            )['max_id']
            self.Cancel_Id = (max_id or 0) + 1
        super().save(*args, **kwargs)
    
        
class Patient_Registration_Reshedule_Details(models.Model):
    Reshedule_Id = models.IntegerField(primary_key=True)
    Registration_Id = models.ForeignKey(
        'Patient_Appointment_Registration_Detials', 
        on_delete=models.CASCADE, 
        related_name='reshedule_registration_details'
    )
    ChangingReason = models.TextField(default='')
    specialization = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE,related_name='registration_reschedule_list_specialization',null=True,blank=True)
    doctor_name = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE,related_name='registration_reschedule_list_doctor_name',null=True,blank=True)
    AppointmentDoctor = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE,related_name='registration_reschedule_previous_doctor',null=True,blank=True)
    Status = models.CharField(max_length=30, default = 'Pending')
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 
    
    class Meta:
        db_table = 'Patient_Registration_Reshedule_Details'
    
    def save(self, *args, **kwargs):
        if not self.Reshedule_Id:
            max_id = Patient_Registration_Reshedule_Details.objects.aggregate(
                max_id=Max('Reshedule_Id')
            )['max_id']
            self.Reshedule_Id = (max_id or 0) + 1
        super().save(*args,**kwargs)


# -------------------------------ForBilling------------------
class IP_Billing_QueueList_Detials(models.Model):
    BillingQueueList_ID=models.AutoField(primary_key=True)
    Billing_Type=models.CharField(max_length=100)
    Registration_Id=models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,related_name='IP_Billing_Registration_Id')
    Doctor_Ratecard_Id=models.ForeignKey(Doctor_Ratecard_Master,on_delete=models.CASCADE,related_name='IP_Billing_Queue_Doctor_Ratecard_Id')
    Status=models.CharField(max_length=50)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'IP_Billing_QueueList_Detials'

    def __str__(self):
        return self.Billing_Type
    
class IP_Billing_Add_Services(models.Model):
    BillingDataList_ID = models.ForeignKey(IP_Billing_QueueList_Detials,on_delete= models.CASCADE)
    Service_Type = models.CharField(max_length=30)
    Service_Name = models.CharField(max_length=30)
    Service_Code = models.CharField(max_length=30)
    Charge = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Quantity = models.IntegerField()
    Amount = models.IntegerField()
    Discount_Type = models.CharField(max_length=30)
    Discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Taxable_Amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    GST_Charge = models.CharField(max_length=30)
    NetAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Location =models.ForeignKey(Location_Detials ,on_delete=models.CASCADE,default="",null=True)
    created_by = models.CharField(max_length=30)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class IP_Billing_Table_Detials(models.Model):
    Billing_Invoice_No=models.CharField(primary_key=True,max_length=30)
    Billing_Date=models.DateField()
    Doctor_Id=models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,related_name='IP_Billing_Doctor_Id')
    Patient_Id=models.ForeignKey(Patient_Detials,on_delete=models.CASCADE,related_name='IP_Billing_Patient_Id')
    Register_Id=models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,related_name='IP_Billing_Patient_Id')
    Visit_Id=models.ForeignKey(Patient_Visit_Detials,on_delete=models.CASCADE,related_name='IP_Billing_Visit_Id')
    Billing_Type=models.CharField(max_length=150)
    Select_Discount=models.CharField(max_length=50)
    Discount_Type=models.CharField(max_length=30)
    Discount_Value=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Total_Items=models.IntegerField()
    Total_Qty=models.IntegerField()
    Total_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Total_GSTAmount=models.DecimalField(max_digits=10, decimal_places=2)
    Net_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Round_Off=models.DecimalField(max_digits=10, decimal_places=2)
    Paid_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Balance_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Bill_Status=models.CharField(max_length=20)
    created_by = models.CharField(max_length=100)
    updated_by = models.CharField(max_length=30,default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class meta:
        db_table='IP_Billing_Table_Detials'

    def save(self, *args, **kwargs):
        if not self.Billing_Invoice_No:
            Add_Invoice_Char = 'IPDR/'
            Max_Invoice_No_row = IP_Billing_Table_Detials.objects.exclude(created_by='system').aggregate(max_id=Max('Billing_Invoice_No'))['max_id']
            Max_Invoice_No = Max_Invoice_No_row if Max_Invoice_No_row else None
            numeric_part = int(str(Max_Invoice_No)[5:]) + 1 if Max_Invoice_No else 1
            self.Billing_Invoice_No = f'{Add_Invoice_Char}{numeric_part:04}'
        
        super(IP_Billing_Table_Detials, self).save(*args, **kwargs)



class IP_Billing_Items_Table_Detials(models.Model):
    Items_Id=models.AutoField(primary_key=True)
    Billing_Invoice_No=models.ForeignKey(IP_Billing_Table_Detials,on_delete=models.CASCADE,related_name='Items_Table_IP_Billing_Invoice_No')
    Service_Type=models.CharField(max_length=100)
    Service_Name=models.CharField(max_length=350)
    Rate=models.DecimalField(max_digits=10, decimal_places=2)
    Charge=models.DecimalField(max_digits=10, decimal_places=2)
    Quantity=models.CharField(max_length=30, default="")
    Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Type=models.CharField(max_length=30, null=True,blank=True)
    Discount_Value=models.DecimalField(max_digits=10, decimal_places=2)
    Discount_Amount=models.DecimalField(max_digits=10, decimal_places=2)
    Taxable_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Tax_Percentage=models.IntegerField()
    Tax_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Total_Amount=models.DecimalField(max_digits=10,decimal_places=2)
    Item_Status=models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_Billing_Items_Table_Detials'

    def __str__(self):
        return self.Service_Name


class Multiple_Payment_Table_IP_Detials(models.Model):
    S_No=models.AutoField(primary_key=True)
    Invoice_No=models.ForeignKey(IP_Billing_Table_Detials,on_delete=models.CASCADE,related_name='Multiple_Payment_IP_Billing_Invoice')
    Payment_Type=models.CharField(max_length=70)
    Cart_Type=models.CharField(max_length=30)
    Cheque_No=models.CharField(max_length=20)
    Bank_Name=models.CharField(max_length=50)
    Amount=models.DecimalField(max_digits=10,decimal_places=2)

    class Meta:
        db_table = 'Multiple_Payment_Table_IP_Detials'

    def __str__(self):
        return self.Payment_Type
