from django.db import models
from django.db.models import Max
from Frontoffice.models import *

class Patient_Vital_Details(models.Model):
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='OP_Vitals_Registration_Id',null=True,blank=True)
    Temperature = models.FloatField(null=True, blank=True)  # Changed to FloatField for numeric data
    Temperature_Status = models.FloatField(null=True, blank=True)
    Pulse_Rate = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    SPO2 = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    SPO2_Status = models.IntegerField(null=True, blank=True)
    Heart_Rate = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    Heart_Rate_Status = models.IntegerField(null=True, blank=True)
    Respiratory_Rate = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    Respiratory_Status = models.IntegerField(null=True, blank=True)
    SupplementalOxygen_Status = models.CharField(max_length=100,null=True, blank=True)
    SBP = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    SBP_Status = models.IntegerField(null=True, blank=True)  
    DBP = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    Height = models.FloatField(null=True, blank=True)  # Changed to FloatField
    Weight = models.FloatField(null=True, blank=True)  # Changed to FloatField
    BMI = models.FloatField(null=True, blank=True)  # Changed to FloatField
    WC = models.FloatField(null=True, blank=True)  # Changed to FloatField
    HC = models.FloatField(null=True, blank=True)  # Changed to FloatField
    BSL = models.FloatField(null=True, blank=True)  # Changed to FloatField
    Painscore = models.IntegerField(null=True, blank=True)  # Changed to IntegerField
    SupplementalOxygen = models.CharField(max_length=100,null=True, blank=True)  # Changed to FloatField
    SupplementalOxygen_Status = models.IntegerField(null=True, blank=True)  
    LevelOfConsiousness = models.CharField(max_length=100, null=True, blank=True)  # Allowed null and blank values
    LevelOfConsiousness_Status = models.IntegerField(null=True, blank=True)  
    CapillaryRefillTime = models.CharField(max_length=100, null=True, blank=True)  # Allowed null and blank values
    CapillaryRefillTime_Status = models.IntegerField(null=True, blank=True)  
    Type = models.CharField(max_length=30, null=True, blank=True)  
    # DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)


    class Meta:
        db_table = 'Patient_Vital_Details'

    
    

class ReferalDoctorDetails(models.Model):
    Refer_Id = models.IntegerField(primary_key=True)
    PatientId = models.CharField(max_length=50)
    VisitId = models.CharField(max_length=50)
    PrimaryDoctorId = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='primary_doctor') 
    ReferDoctorId = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='refer_doctor') 
    ReferDoctorType = models.CharField(max_length=50)
    Remarks = models.CharField(max_length=200, blank=True, null=True)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'ReferalDoctorDetails'
    
    def save(self, *args, **kwargs):
        if not self.Refer_Id:
            # Fetch the maximum Refer_Id in the database
            max_id = ReferalDoctorDetails.objects.aggregate(max_id=Max('Refer_Id'))['max_id']
            self.Refer_Id = (max_id or 0) + 1
        super(ReferalDoctorDetails, self).save(*args,**kwargs)




class Lab_Request_Details(models.Model):
    Request_Id = models.IntegerField(primary_key=True)
    RegisterType = models.CharField(max_length=30,default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Laboratory_Register_Id = models.ForeignKey(Patient_Laboratory_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    TestType = models.CharField(max_length=60)
    IndivitualCode = models.ForeignKey(LabTestName_Details,on_delete=models.CASCADE,null=True,blank=True)
    FavouriteCode = models.ForeignKey(TestName_Favourites,on_delete=models.CASCADE,null=True,blank=True)
    Reason = models.CharField(max_length=80, default="")
    Status = models.CharField(max_length=20, default='Request')
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Lab_Request_Details'
    
    def save(self, *args, **kwargs):
        if not self.Request_Id:
            max_id = Lab_Request_Details.objects.aggregate(max_id=Max('Request_Id'))['max_id']
            self.Request_Id = (max_id or 0) + 1
        
    
        
        super(Lab_Request_Details, self).save(*args,**kwargs)




class Radiology_Request_Details(models.Model):
    Radiology_RequestId = models.AutoField(primary_key=True)
    RegisterType = models.CharField(max_length=30,default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    IsSubTest = models.CharField(max_length=60)
    TestCode = models.CharField(max_length=50)
    SubTestCode = models.CharField(max_length=50)
    Reason = models.CharField(max_length=80, default="")
    Status = models.CharField(max_length=20, default='Request')
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Radiology_Request_Details'
    
    def save(self, *args, **kwargs):
        if not self.Radiology_RequestId:
            max_id = Radiology_Request_Details.objects.aggregate(max_id=Max('Radiology_RequestId'))['max_id']
            self.Radiology_RequestId = (max_id or 0) + 1
        super().save(*args, **kwargs)


class Lab_Request_Selected_Details(models.Model):
    SelectedRequest_Id = models.IntegerField(primary_key=True)
    RegisterType = models.CharField(max_length=30, default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='selected_testname', null=True, blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, null=True, blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, null=True, blank=True)
    Laboratory_Register_Id = models.ForeignKey(Patient_Laboratory_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    TestType = models.CharField(max_length=60)
    IndivitualCode = models.ForeignKey(LabTestName_Details,on_delete=models.CASCADE,null=True,blank=True)
    OutSource_Name = models.ForeignKey(External_LabAmount_Details, on_delete=models.CASCADE,null=True,blank=True)
    Amount = models.IntegerField(default=0)
    Status = models.CharField(max_length=20, default='pending')
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Lab_Request_Selected_Details'

    def save(self, *args, **kwargs):
        if not self.SelectedRequest_Id:
            max_id = Lab_Request_Selected_Details.objects.aggregate(max_id=Max('SelectedRequest_Id'))['max_id']
            self.SelectedRequest_Id = (max_id or 0) + 1
        

        
        if self.RegisterType == "OP":
            registration_id = self.OP_Register_Id
        elif self.RegisterType == "IP":
            registration_id = self.IP_Register_Id
        elif self.RegisterType == "Casuality":
            registration_id = self.Casuality_Register_Id
        elif self.RegisterType == "ExternalLab":
            registration_id = self.Laboratory_Register_Id
        else:
            registration_id = None

        if registration_id:
            related_request = Lab_Request_Details.objects.filter(
                RegisterType=self.RegisterType,
                IndivitualCode=self.IndivitualCode,
                **{
                    'OP_Register_Id': registration_id if self.RegisterType == 'OP' else None,
                    'IP_Register_Id': registration_id if self.RegisterType == 'IP' else None,
                    'Casuality_Register_Id': registration_id if self.RegisterType == 'Casuality' else None,
                    'Laboratory_Register_Id': registration_id if self.RegisterType == 'ExternalLab' else None
                }
            ).first()

            if self.Amount > 0 and (related_request is None or not related_request.Reason):
                super(Lab_Request_Selected_Details, self).save(*args, **kwargs)
        else:
            raise ValueError("Invalid RegisterType or Registration ID not set.")



class Lab_ReportEntry_Details(models.Model):
    report_id = models.AutoField(primary_key=True)
    RegisterType = models.CharField(max_length=30,default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    report_date = models.DateTimeField(auto_now=True)
    report_time = models.TimeField(auto_now=True)
    report_file = models.BinaryField(null=True, blank=True)
    technician_name = models.CharField(max_length=60,default='Pending')
    report_handovered_by = models.CharField(max_length=40,default='Pending')
    report_handovered_to = models.CharField(max_length=40,default='Pending')
    created_by = models.CharField(max_length=40,default='Pending')
    status = models.CharField(max_length=40, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Lab_ReportEntry_Details'
    def save(self, *args, **kwargs):
        # Auto-increment SelectedRequest_Id if not set
        if not self.report_id:
            max_id = Lab_ReportEntry_Details.objects.aggregate(max_id=Max('report_id'))['max_id']
            self.report_id = (max_id or 0) + 1
        super(Lab_ReportEntry_Details, self).save(*args, **kwargs)



class PaidTest_Indivitaul(models.Model):
    reporttest_id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Lab_ReportEntry_Details, on_delete=models.CASCADE, related_name='test_details')
    test_type = models.CharField(max_length=60, default="Indivitual")
    testCode = models.ForeignKey(LabTestName_Details, on_delete=models.CASCADE, related_name='paid_test_details')
    value = models.CharField(max_length=40)
    category_type = models.CharField(max_length=40)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=40, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'PaidTest_Indivitaul'
    def save(self, *args, **kwargs):   
        # Set status based on the value field
        if self.value:
            self.status = 'Completed'
        else:
            self.status = 'Pending'
        
        # Call the superclass save method
        super().save(*args, **kwargs)
        # Auto-increment SelectedRequest_Id if not set
        if not self.reporttest_id:
            max_id = PaidTest_Indivitaul.objects.aggregate(max_id=Max('reporttest_id'))['max_id']
            self.reporttest_id = (max_id or 0) + 1






class PaidTest_Favourites(models.Model):
    reportfav_id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Lab_ReportEntry_Details, on_delete=models.CASCADE, related_name='fav_details')
    favCode = models.ForeignKey(TestName_Favourites, on_delete=models.CASCADE, related_name='paid_fav_details')
    test_type = models.CharField(max_length=60, default="Favourites")
    category_type = models.CharField(max_length=40,default='')
    testCode = models.ForeignKey(LabTestName_Details, on_delete=models.CASCADE, related_name='paid_indivitual_details')
    value = models.CharField(max_length=40,default='')
    description = models.TextField(null=True, blank=True,default='')
    status = models.CharField(max_length=40, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'PaidTest_Favourites'
    def save(self, *args, **kwargs):
        if self.value:
            self.status = 'Completed'
        else:
            self.status = 'Pending'
        super().save(*args, **kwargs)
        # Auto-increment SelectedRequest_Id if not set
        if not self.reportfav_id:
            max_id = PaidTest_Favourites.objects.aggregate(max_id=Max('reportfav_id'))['max_id']
            self.reportfav_id = (max_id or 0) + 1






# class Ip_Drug_Administration(models.Model):
#     Prescription_Id = models.IntegerField(primary_key=True)
#     IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE)
#     Department = models.CharField(max_length=60)
#     DoctorName = models.CharField(max_length=60)
#     GenericName = models.CharField(max_length=60)
#     MedicineCode = models.CharField(max_length=60)
#     MedicineName = models.CharField(max_length=60)
#     Dosage = models.CharField(max_length=60)
#     Route = models.CharField(max_length=60)
#     FrequencyMethod = models.CharField(max_length=60)
#     FrequencyType = models.CharField(max_length=60)
#     Frequency = models.CharField(max_length=60)
#     FrequencyTime = models.TimeField(auto_now=True)
#     Duration = models.CharField(max_length=60)
#     DurationType = models.CharField(max_length=60)
#     Quantity = models.CharField(max_length=60)
#     AdminisDose = models.CharField(max_length=60)
#     Date = models.DateTimeField(auto_now=True)
#     Time = models.CharField(max_length=60)
#     Instruction = models.CharField(max_length=60)
#     Status = models.CharField(max_length=60)
#     CapturedBy = models.CharField(max_length=60)
#     RequestType = models.CharField(max_length=60)
#     RequestQuantity = models.CharField(max_length=60)
#     RequestDate = models.DateField(auto_now=True)
#     BillingMethod = models.CharField(max_length=60)
#     PrescriptionBarcode = models.CharField(max_length=60)
#     Specialization = models.CharField(max_length=60)
#     IssuedType = models.CharField(max_length=60)
#     IssuedBy = models.CharField(max_length=60)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'Ip_Drug_Administration'
#     def save(self, *args, **kwargs):
#         if not self.Prescription_Id:
#             max_id = Ip_Drug_Administration.objects.aggregate(max_id=Max('Prescription_Id'))['max_id']
#             self.Prescription_Id = (max_id or 0) + 1
#         super(Ip_Drug_Administration, self).save(*args, **kwargs)
    
    
    

# class Ip_Nurse_Drug_Completed_Administration(models.Model):
#     Nurse_Prescription_Id = models.IntegerField(primary_key=True)
#     IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE)
#     Department = models.CharField(max_length=60)
#     DoctorName = models.CharField(max_length=60)
#     GenericName = models.CharField(max_length=60)
#     MedicineCode = models.CharField(max_length=60)
#     MedicineName = models.CharField(max_length=60)
#     Dosage = models.CharField(max_length=60)
#     Route = models.CharField(max_length=60)
#     FrequencyIssued = models.CharField(max_length=60)
#     FrequencyMethod = models.CharField(max_length=60)
#     Quantity = models.CharField(max_length=60)
#     Issued_Date = models.DateField(auto_now=True)
#     Complete_Date = models.DateField(auto_now=True)
#     Complete_Time = models.TimeField(auto_now=True)
#     Completed_Remarks = models.CharField(max_length=60)
#     Status = models.CharField(max_length=60)
#     CapturedBy = models.CharField(max_length=60)
#     AdminisDose = models.CharField(max_length=60)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     class Meta:
#         db_table = 'Ip_Nurse_Drug_Completed_Administration'
#     def save(self, *args, **kwargs):
#         if not self.Nurse_Prescription_Id:
#             max_id = Ip_Nurse_Drug_Completed_Administration.objects.aggregate(max_id=Max('Nurse_Prescription_Id')) ['max_id']
#             self.Nurse_Prescription_Id = (max_id or 0) + 1
#         super(Ip_Nurse_Drug_Completed_Administration, self).save(*args, **kwargs)
        
    
    
    
    
    
class Ot_Request(models.Model):
    Request_Id = models.AutoField(primary_key=True) 
    RegisterType = models.CharField(max_length=30,default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Surgery_Name = models.ForeignKey(SurgeryName_Details,on_delete=models.CASCADE,null=True,blank=True)
    Surgery_Date = models.DateTimeField(auto_now=True)
    Surgery_Time = models.TimeField(auto_now=True)
    Remarks =  models.TextField(null=True, blank=True)
    Reason = models.TextField(null=True, blank=True)
    Priority =models.CharField(max_length=40)
    created_by = models.CharField(max_length=40)
    Additional_Doctor = models.ForeignKey(Doctor_Personal_Form_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Status = models.CharField(max_length=40, default='Pending')
    
    class Meta:
        db_table = 'Ot_Request'
    def save(self, *args, **kwargs):
        # Auto-increment SelectedRequest_Id if not set
        if not self.Request_Id:
            max_id = Ot_Request.objects.aggregate(max_id=Max('Request_Id'))['max_id']
            self.Request_Id = (max_id or 0) + 1
        super(Ot_Request, self).save(*args,**kwargs)





class Radiology_Complete_Details(models.Model):
    Radiology_CompleteId = models.IntegerField(primary_key=True)
    RegisterType = models.CharField(max_length=30,default="")
    OP_Register_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True)  
    IP_Register_Id = models.ForeignKey(Patient_IP_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Casuality_Register_Id = models.ForeignKey(Patient_Casuality_Registration_Detials,on_delete=models.CASCADE,null=True,blank=True)
    Radiology_RequestId = models.ForeignKey(Radiology_Request_Details,on_delete=models.CASCADE,null=True,blank=True)
    ReportDate = models.DateTimeField(auto_now=True)
    ReportTime = models.TimeField(auto_now=True)
    RadiologistName = models.CharField(max_length=40)
    Technician_Name = models.CharField(max_length=40)
    Report = models.TextField()
    Report_fileone = models.BinaryField(null=True, blank=True)
    Report_filetwo = models.BinaryField(null=True,blank=True)
    Report_filethree = models.BinaryField(null=True,blank=True)
    Report_HandOverTo = models.CharField(max_length=30)
    RelativeName = models.CharField(max_length=30)
    Createdby = models.CharField(max_length=30)
    Status = models.CharField(max_length=30, default='Completed')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Radiology_Complete_Details'
    
    def save(self, *args, **kwargs):
        if not self.Radiology_CompleteId:
            max_id = Radiology_Complete_Details.objects.aggregate(max_id=Max('Radiology_CompleteId'))['max_id']
            self.Radiology_CompleteId = (max_id or 0) + 1
        super(Radiology_Complete_Details, self).save(*args, **kwargs)










