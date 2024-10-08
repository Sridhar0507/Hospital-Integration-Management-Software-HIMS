# models.py
from django.db import models
from django.db.models import Max
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

#   Locations 
class Location_Detials(models.Model):
    Location_Id = models.AutoField(primary_key=True)
    Location_Name = models.CharField(max_length=30)
    Bed_Count = models.IntegerField()
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Location_Detials'

    
    
class Hospital_Detials(models.Model):
    Hospital_Id = models.AutoField(primary_key=True)
    Hospital_Name = models.CharField(max_length=30)
    Hospital_Logo = models.BinaryField()
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Hospital_Detials'
        
    def clean(self):
        super().clean()
        errors = []

        # Validate length of all CharField fields
        char_fields = ['Hospital_Name', 'created_by']
        for field in char_fields:
            value = getattr(self, field, '')
            max_length = self._meta.get_field(field).max_length
            if len(value) > max_length:
                errors.append(f"{field} cannot be more than {max_length} characters.") 

        # If there are errors, raise a ValidationError with all errors
        if errors:
            raise ValidationError({'error':errors})

    
    
class Clinic_Detials(models.Model):
    Clinic_Id = models.AutoField(primary_key=True)
    Clinic_Mail = models.CharField(max_length=30)
    Clinic_PhoneNo = models.CharField(max_length=30)
    Clinic_LandlineNo = models.CharField(max_length=30)
    Clinic_GstNo = models.CharField(max_length=30)
    Clinic_DoorNo = models.CharField(max_length=30)
    Clinic_Street = models.CharField(max_length=30)
    Clinic_Area = models.CharField(max_length=30)
    Clinic_City = models.CharField(max_length=30)
    Clinic_State = models.CharField(max_length=30)
    Clinic_Country = models.CharField(max_length=30)
    Clinic_Pincode = models.CharField(max_length=30)
    created_by = models.CharField(max_length=30)
    Location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE,related_name='Clinic_location',null=True,blank=True,default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Clinic_Detials'
    
    
        
# Flagg color

class Flaggcolor_Detials(models.Model):
    Flagg_Id = models.AutoField(primary_key=True)
    Flagg_Name = models.CharField(max_length=70)
    Flagg_Color = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Flaggcolor_Detials'

    

        
#   Departments
class Department_Detials(models.Model):
    Department_Id = models.AutoField(primary_key=True)
    Department_Name = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Department_Detials'



class Designation_Detials(models.Model):
    Designation_Id = models.AutoField(primary_key=True)
    Designation_Name = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Designation_Detials'

   
    def __str__(self):
        return self.Designation_Name

class ConsentName_Detials(models.Model):
    ConsentName_Id = models.AutoField(primary_key=True)
    DepartmentName = models.ForeignKey(Department_Detials, on_delete=models.CASCADE, related_name='Consent')
    ConsentName = models.CharField(max_length=300)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ConsentName_Detials'
        
        
class Category_Detials(models.Model):
    Category_Id = models.AutoField(primary_key=True)
    Designation_Name = models.ForeignKey(Designation_Detials, on_delete=models.CASCADE, related_name='categories')
    Category_Name = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Category_Detials'
    
    




class Speciality_Detials(models.Model):
    Speciality_Id = models.AutoField(primary_key=True)
    Designation_Name = models.ForeignKey(Designation_Detials, on_delete=models.CASCADE, related_name='specialities')
    Speciality_Name = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Speciality_Detials'
        
    

# Religion

class Religion_Detials(models.Model):
    Religion_Id = models.AutoField(primary_key=True)
    Religion_Name = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'Religion_Detials'
    
    

# referal doctor

class Route_Master_Detials(models.Model):
    Route_Id = models.AutoField(primary_key=True)
    Route_No = models.CharField(max_length=30)
    Route_Name = models.CharField(max_length=30)
    Teshil_Name = models.CharField(max_length=30)
    Village_Name = models.CharField(max_length=30)
    created_by = models.CharField(max_length=30)
    location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE)
    Status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Route_Master_Detials'

    def str(self):
        return self.Route_No

   
  
# ----------------------------------------- Building Masters   ------------------------------------------------------------------



# building master
class  Building_Master_Detials(models.Model):
    Building_Id = models.AutoField(primary_key=True)
    Building_Name = models.CharField(max_length=30)
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='Building_location')
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Building_Master_Detials5'
        
    def str(self):
        return self.Building_Name



# blockMaster
class  Block_Master_Detials(models.Model):
    Block_Id = models.AutoField(primary_key=True)
    Block_Name = models.CharField(max_length=30)
    Building_Name = models.ForeignKey(Building_Master_Detials,on_delete=models.CASCADE,related_name='Block_Building_name')
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='Block_location')
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Block_Master_Detials'
        
    def str(self):
        return self.Block_Name
    

# Floor Master
class  Floor_Master_Detials(models.Model):
    Floor_Id = models.AutoField(primary_key=True)
    Floor_Name = models.CharField(max_length=30)
    Building_Name = models.ForeignKey(Building_Master_Detials,on_delete=models.CASCADE,related_name='Floor_Building_name')
    Block_Name = models.ForeignKey(Block_Master_Detials,on_delete=models.CASCADE,related_name='Floor_block_name')
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='Floor_location')
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Floor_Master_Detials'
        
    def str(self):
        return self.Floor_Name


# floor master
# ----------------------------------------- Room Masters   ------------------------------------------------------------------

# Ward Type

class WardType_Master_Detials(models.Model):
    Ward_Id = models.AutoField(primary_key=True)
    Ward_Name = models.CharField(max_length=30)
    Building_Name = models.ForeignKey(Building_Master_Detials,on_delete=models.CASCADE,related_name='ward_Building_name')
    Block_Name = models.ForeignKey(Block_Master_Detials,on_delete=models.CASCADE,related_name='ward_Block_name')
    Floor_Name = models.ForeignKey(Floor_Master_Detials,on_delete=models.CASCADE,related_name='ward_Floor_name')
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='ward_location_name')
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'WardType_Master_Detials'
        
    def str(self):
        return self.Ward_Name



# Room Type

class RoomType_Master_Detials(models.Model):
    Room_Id = models.AutoField(primary_key=True)
    Room_Name = models.CharField(max_length=30)
    Building_Name = models.ForeignKey(Building_Master_Detials,on_delete=models.CASCADE,related_name='room_Building_name')
    Block_Name = models.ForeignKey(Block_Master_Detials,on_delete=models.CASCADE,related_name='room_Block_name')
    Floor_Name = models.ForeignKey(Floor_Master_Detials,on_delete=models.CASCADE,related_name='room_Floor_name')
    Ward_Name = models.ForeignKey(WardType_Master_Detials, on_delete=models.CASCADE, related_name='room_ward_name')
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='room_location_name')
    Prev_Charge = models.DecimalField(max_digits=10, decimal_places=3,default=0)
    Current_Charge = models.DecimalField(max_digits=10, decimal_places=3)
    GST_Charge = models.CharField(max_length=30)
    Total_Prev_Charge = models.DecimalField(max_digits=10, decimal_places=3,default=0)
    Total_Current_Charge = models.DecimalField(max_digits=10, decimal_places=3)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'RoomType_Master_Detials'
        
    def str(self):
        return self.Room_Name

 

# Room Master

class Room_Master_Detials(models.Model):
    Room_Id = models.AutoField(primary_key=True)
    Building_Name = models.ForeignKey(Building_Master_Detials,on_delete=models.CASCADE,related_name='room_master_Building_name')
    Block_Name = models.ForeignKey(Block_Master_Detials,on_delete=models.CASCADE,related_name='room_master_Block_name')
    Floor_Name = models.ForeignKey(Floor_Master_Detials,on_delete=models.CASCADE,related_name='room_master_Floor_name')
    Ward_Name = models.ForeignKey(WardType_Master_Detials, on_delete=models.CASCADE, related_name='room_master_ward_name')
    Room_Name = models.ForeignKey(RoomType_Master_Detials, on_delete=models.CASCADE, related_name='room_master_room_name')
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='room_master_location_name')
    Room_No = models.CharField(max_length=30)
    Bed_No = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    Booking_Status = models.CharField(max_length=30,default='Available')
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Room_Master_Detials'

    def _str_(self):
        return self.Bed_No

   




#-------------------Doctor Master----------------------


# Doctor Personal Form

class Doctor_Personal_Form_Detials(models.Model):
    Doctor_ID = models.CharField(primary_key=True,max_length=30)
    DoctorType = models.CharField(max_length=30)
    Tittle = models.CharField(max_length=5)
    First_Name = models.CharField(max_length=30)
    Middle_Name = models.CharField(max_length=30)
    Last_Name = models.CharField(max_length=30)
    Gender = models.CharField(max_length=30)
    ShortName = models.CharField(max_length=30)
    DOB = models.CharField(max_length=30)
    Age = models.CharField(max_length=30)
    Duration = models.CharField(max_length=30)
    Marital_Status = models.CharField(max_length=30)
    Anniversary_Date = models.CharField(max_length=30)
    Spouse_Name = models.CharField(max_length=30)
    Nationality = models.CharField(max_length=30)
    E_mail = models.CharField(max_length=30)
    Contact_Number = models.CharField(max_length=15)
    Alternate_Number = models.CharField(max_length=15)
    Emergency_No1 = models.CharField(max_length=15)
    Emergency_No2 = models.CharField(max_length=15)
    Current_Address = models.CharField(max_length=500)
    Permanent_Address = models.CharField(max_length=500)
    Languages_Spoken = models.CharField(max_length=30)
    Mode_of_Communication = models.CharField(max_length=30)
    Emergency_Availablity = models.CharField(max_length=10)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_Personal_Form_Detials'
        
    def _str_(self):
        return self.Doctor_ID

    def save(self, *args, **kwargs):
        if not self.Doctor_ID:  # Generate Mlc_Id if not set
            # Get the hospital name (clinic_name)
            clinic_name = Hospital_Detials.objects.first().Hospital_Name[:3].upper()
            
            # Fetch the maximum Mlc_Id
            max_Doctor_ID_row = Doctor_Personal_Form_Detials.objects.exclude(created_by="system").aggregate(max_id=Max('Doctor_ID'))['max_id']
            max_Doctor_ID = max_Doctor_ID_row if max_Doctor_ID_row else None

            # Calculate the numerical part
            numeric_part = int(str(max_Doctor_ID)[6:]) + 1 if max_Doctor_ID else 1

            # Construct the next Mlc_Id
            self.Doctor_ID = f'{clinic_name}DOC{numeric_part:04}'

        super(Doctor_Personal_Form_Detials, self).save(*args, **kwargs)


#-------------------DoctorProfessForm---------------------

#-------------------DoctorProfessForm---------------------



class Doctor_ProfessForm_Detials(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Qualification = models.CharField(max_length=30)
    RouteId=models.ForeignKey(Route_Master_Detials, on_delete=models.CASCADE, related_name='doctor_Route_details',null=True,blank=True)
    VisitingDoctorType = models.CharField(max_length=30)
    Department = models.ManyToManyField(Department_Detials,related_name='doctor_profess_form_details')
    Designation = models.ForeignKey(Designation_Detials, on_delete=models.CASCADE, related_name='doctor_profess_form_designations',null=True,blank=True)
    Specialization = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE, related_name='doctor_profess_form_specialities',null=True,blank=True)
    Category = models.ForeignKey(Category_Detials, on_delete=models.CASCADE, related_name='doctor_profess_form_categories',null=True,blank=True)
    MCI_Number = models.CharField(max_length=30)
    State_RegistrationNumber = models.CharField(max_length=30)
    License_ExpiryDate = models.CharField(max_length=30)
    Yearsof_Experience = models.CharField(max_length=30)
    Date_OfJoining = models.CharField(max_length=30,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_ProfessForm_Detials'
        
    def _str_(self):
        return str(self.Doctor_ID)
    
#-------------------DoctorInsuranceForm---------------------


class Doctor_InsuranceForm_Detials(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Insurance_DetailsFile = models.BinaryField(null=True, blank=True)    
    Insurance_RenewalDate = models.CharField(max_length=30)
    Malpractice_Insurance_ProviderName = models.CharField(max_length=30)
    Policy_Number = models.CharField(max_length=30)
    Coverage_Amount = models.CharField(max_length=30)
    Expiry_Date = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_InsuranceForm_Detials'
        
    def _str_(self):
        return self.Doctor_ID



#-------------------DoctorDocumentsForm---------------------


class Doctor_DocumentsForm_Detials(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Photo = models.BinaryField(null=True, blank=True)
    Signature = models.BinaryField(null=True, blank=True)
    Agreement_File = models.BinaryField(null=True, blank=True)
    AdhaarCard = models.BinaryField(null=True, blank=True)
    PanCard = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_DocumentsForm_Detials'
        
    def _str_(self):
        return self.Doctor_ID


#-------------------DoctorBankForm---------------------


class Doctor_BankForm_Detials(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Account_Number = models.CharField(max_length=30)
    Bank_Name = models.CharField(max_length=30)
    Branch_Name = models.CharField(max_length=30)
    IFSC_Code = models.CharField(max_length=30)
    Pancard_Number = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_BankForm_Detials'
        
    def _str_(self):
        return self.Doctor_ID

#-------------------DoctorContractForm---------------------


class Doctor_ContractForm_Detials(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Previous_EmployeementHistory = models.CharField(max_length=30)
    Comission = models.CharField(max_length=30)
    Contract_StartDate = models.CharField(max_length=30)
    Contract_EndDate = models.CharField(max_length=30)
    Contract_RenewalTerms = models.CharField(max_length=500)
    Remarks = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_ContractForm_Detials'
        
    def _str_(self):
        return self.Doctor_ID
#-------------------DoctorScheduleForm---------------------

class Doctor_Schedule_Details(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Day = models.CharField(max_length=30)
    Location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE,null=True)
    LocationName = models.CharField(max_length=30,null=True,blank=True)
    IsWorking = models.CharField(max_length=30)
    Shift = models.CharField(max_length=30,default='Single')
    Starting_Time = models.TimeField(null=True,blank=True)
    End_Time = models.TimeField(blank=True, null=True)
    Starting_Time_F = models.TimeField(blank=True,null=True)
    End_Time_F = models.TimeField(blank=True,null=True)
    Starting_Time_A = models.TimeField(blank=True,null=True)
    End_Time_A = models.TimeField(blank=True,null=True)
    Working_Hours_F = models.CharField(max_length=30,null=True) 
    Working_Hours_A = models.CharField(max_length=30,null=True) 
    Working_Hours_S = models.CharField(max_length=30,null=True) 
    Total_Working_Hours_S = models.CharField(max_length=30, null=True,blank=True)
    Total_Working_Hours = models.CharField(max_length=30, null=True,blank=True)  
    Status = models.CharField(max_length=30,default='Active')     
    class Meta:
        db_table = 'Doctor_Schedule_Details'
    
    def _str_(self):
        return self.Doctor_ID
    

    


#  employee register 
class Employee_Personal_Form_Detials(models.Model):
    Employee_ID = models.CharField(primary_key=True, max_length=30)
    Tittle = models.CharField(max_length=5)
    First_Name = models.CharField(max_length=30)
    Middle_Name = models.CharField(max_length=30)
    Last_Name = models.CharField(max_length=30)
    Gender = models.CharField(max_length=30)
    DOB = models.CharField(max_length=30)
    Age = models.CharField(max_length=30)
    Marital_Status = models.CharField(max_length=30)
    Anniversary_Date = models.CharField(max_length=30)
    Spouse_Name = models.CharField(max_length=30)
    Nationality = models.CharField(max_length=30)
    E_mail = models.CharField(max_length=30)
    Contact_Number = models.CharField(max_length=15)
    Alternate_Number = models.CharField(max_length=15)
    Emergency_No1 = models.CharField(max_length=15)
    Emergency_No2 = models.CharField(max_length=15)
    Current_Address = models.CharField(max_length=500)
    Permanent_Address = models.CharField(max_length=500)
    Languages_Spoken = models.CharField(max_length=30)
    Mode_of_Communication = models.CharField(max_length=30)
    Emergency_Availablity = models.CharField(max_length=10)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Employee_Personal_Form_Detials'
        
    def __str__(self):
        return self.Employee_ID




# role management and user register 


class Role_Master(models.Model):
    Role_Id = models.AutoField(primary_key=True)
    Role_Name = models.CharField(max_length=50)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Role_Master'

    def __str__(self):
        return self.Role_Name

    
  


        
# UserRegister_Master_Details

class UserRegister_Master_Details(models.Model):
    User_Id = models.AutoField(primary_key=True)
    auth_user_id = models.OneToOneField(User,on_delete=models.CASCADE, related_name='user_details', null=True, blank=True)
    EmployeeType = models.CharField(max_length=50)
    Doctor_Id = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    Employee_Id = models.ForeignKey(Employee_Personal_Form_Detials, on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    Locations = models.ManyToManyField('Location_Detials', related_name='users')
    role = models.ForeignKey(Role_Master, on_delete=models.CASCADE, related_name='users')
    Access = models.CharField(max_length=1000)
    SubAccess = models.CharField(max_length=1000)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'UserRegister_Master_Details'

    def _str_(self):
        return self.auth_user_id.username if self.auth_user_id else "No Username"
   
    
class UserLoginSession(models.Model):
    user = models.ForeignKey(UserRegister_Master_Details, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    device_name = models.CharField(max_length=255, null=True, blank=True) 
    device_id = models.CharField(max_length=80)
    Status = models.BooleanField(default=True)
    api_key = models.CharField(max_length=255, null=True, blank=True)  # To store the API key
    api_password = models.CharField(max_length=255, null=True, blank=True)  # To store the API 
    plain_password=models.CharField(max_length=255, null=True, blank=True)

    
    class Meta:
        db_table = 'UserLoginSession'

    def _str_(self):
        return f"{self.user.auth_user_id.username} (User {self.user.User_Id}) logged in at {self.login_time} from {self.device_name}"


class Insurance_Master_Detials(models.Model):
    Insurance_Id = models.AutoField(primary_key=True)
    Insurance_Name = models.CharField(max_length=50)
    Type = models.CharField(max_length=50)
    TPA_Name = models.CharField(max_length=50)
    Policy_Type = models.CharField(max_length=50)
    Payer_Zone = models.CharField(max_length=50)
    PayerMember_Id = models.CharField(max_length=50)
    ContactPerson = models.CharField(max_length=50)
    MailId = models.CharField(max_length=50)
    PhoneNumber = models.CharField(max_length=50)
    TreatmentList = models.BinaryField(null=True, blank=True)
    OtherDocuments = models.BinaryField(null=True, blank=True)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Insurance_Master_Detials'

    def __str__(self):
        return self.Insurance_Name


class Client_Master_Detials(models.Model):
    Client_Id = models.AutoField(primary_key=True)
    Client_Name = models.CharField(max_length=50)
    ContactPerson = models.CharField(max_length=50)
    MailId = models.CharField(max_length=50)
    PhoneNumber = models.CharField(max_length=50)
    Address = models.TextField(default='')
    TreatmentList = models.BinaryField(null=True, blank=True)
    OtherDocuments = models.BinaryField(null=True, blank=True)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Client_Master_Detials'

    def __str__(self):
        return self.Client_Name




class Donation_Master_Detials(models.Model):
    Donation_Id = models.AutoField(primary_key=True)
    Donation_Name = models.CharField(max_length=50)
    Type = models.CharField(max_length=50 ,default='')
    ContactPerson = models.CharField(max_length=50)
    Designation = models.CharField(max_length=50)
    PancardNo = models.CharField(max_length=50)
    CIN = models.CharField(max_length=50)
    TAN = models.CharField(max_length=50)
    MailId = models.CharField(max_length=50)
    PhoneNumber = models.CharField(max_length=50)
    Address = models.TextField()
    Document1 = models.BinaryField(null=True, blank=True)
    Document2 = models.BinaryField(null=True, blank=True)
    Document3 = models.BinaryField(null=True, blank=True)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Donation_Master_Detials'

    def __str__(self):
        return self.Donation_Name




#    Ratecard Masters----------------------


class Doctor_Ratecard_Master(models.Model):
    RateCard_Id = models.AutoField(primary_key=True)
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    General_Prev_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    General_Prev_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    General_Prev_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Doctor_Ratecard_Master'

    def __str__(self):
        return self.Doctor_ID.Doctor_ID


class RoomTypeFee(models.Model):
    doctor_ratecard = models.ForeignKey(Doctor_Ratecard_Master, on_delete=models.CASCADE, related_name='room_fees')
    room_type = models.ForeignKey(RoomType_Master_Detials, on_delete=models.CASCADE)
    General_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('doctor_ratecard', 'room_type')
        db_table = 'room_type_fee'

    def __str__(self):
        return f"{self.doctor_ratecard.Doctor_ID} - {self.room_type.Room_Name} Fee"


class InsuranceFee(models.Model):
    doctor_ratecard = models.ForeignKey(Doctor_Ratecard_Master, on_delete=models.CASCADE, related_name='insurance_fees')
    insurance = models.ForeignKey(Insurance_Master_Detials, on_delete=models.CASCADE)
    Prev_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Prev_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Prev_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('doctor_ratecard', 'insurance')
        db_table = 'insurance_fee'

    def __str__(self):
        return f"{self.doctor_ratecard.Doctor_ID} - {self.insurance.Insurance_Name} Fee"


class ClientFee(models.Model):
    doctor_ratecard = models.ForeignKey(Doctor_Ratecard_Master, on_delete=models.CASCADE, related_name='client_fees')
    client = models.ForeignKey(Client_Master_Detials, on_delete=models.CASCADE)
    Prev_Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Consultation_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Prev_Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Follow_Up_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Prev_Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Emg_Consulting_Fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('doctor_ratecard', 'client')
        db_table = 'client_fee'

    def __str__(self):
        return f"{self.doctor_ratecard.Doctor_ID} - {self.client.Client_Name} Fee"


class InsuranceRoomTypeFee(models.Model):
    doctor_ratecard = models.ForeignKey(Doctor_Ratecard_Master, on_delete=models.CASCADE, related_name='doctor_insurance_RoomType_Fee')
    room_type_fee = models.ForeignKey(RoomTypeFee, on_delete=models.CASCADE, related_name='insurance_fees')
    insurance = models.ForeignKey(Insurance_Master_Detials, on_delete=models.CASCADE)
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('room_type_fee', 'insurance','doctor_ratecard')
        db_table = 'insurance_room_type_fee'

    def __str__(self):
        return f"{self.room_type_fee.doctor_ratecard.Doctor_ID} - {self.room_type_fee.room_type.Room_Name} - {self.insurance.Insurance_Name} Fee"


class ClientRoomTypeFee(models.Model):
    doctor_ratecard = models.ForeignKey(Doctor_Ratecard_Master, on_delete=models.CASCADE, related_name='doctor_client_RoomType_Fee')
    room_type_fee = models.ForeignKey(RoomTypeFee, on_delete=models.CASCADE, related_name='client_fees')
    client = models.ForeignKey(Client_Master_Detials, on_delete=models.CASCADE)
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('room_type_fee', 'client','doctor_ratecard')
        db_table = 'client_room_type_fee'

    def __str__(self):
        return f"{self.room_type_fee.doctor_ratecard.Doctor_ID} - {self.room_type_fee.room_type.Room_Name} - {self.client.Client_Name} Fee"




# ---------------------- service Procedure master ---------------


class Service_Master_Details(models.Model):
    Service_Id = models.AutoField(primary_key=True)
    Service_Name = models.CharField(max_length=100)
    Service_Type = models.CharField(max_length=100,default='Quantity')
    Department = models.CharField(max_length=20,default='OP')
    IsGst = models.CharField(max_length=10)
    GstValue = models.CharField(max_length=50)
    Amount = models.DecimalField(max_digits=10,decimal_places=3,default=0)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Service_Master_Details'

    def __str__(self):
        return self.Service_Name


class Procedure_Master_Details(models.Model):
    Procedure_Id = models.AutoField(primary_key=True)
    Procedure_Name = models.CharField(max_length=100)
    Amount = models.DecimalField(max_digits=10,decimal_places=3,default=0)
    Type = models.CharField(max_length=30,default='Interventional')
    IsGst = models.CharField(max_length=10)
    GstValue = models.CharField(max_length=20)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Procedure_Master_Details'

    def __str__(self):
        return self.Procedure_Name


class Service_Procedure_Charges(models.Model):
    MASTER_TYPE_CHOICES = [
        ('Service', 'Service'),
        ('Procedure', 'Procedure'),
    ]

    MasterType = models.CharField(max_length=10, choices=MASTER_TYPE_CHOICES)
    Service_ratecard = models.ForeignKey(Service_Master_Details, on_delete=models.CASCADE, related_name='Service_charges', null=True, blank=True)
    Procedure_ratecard = models.ForeignKey(Procedure_Master_Details, on_delete=models.CASCADE, related_name='Procedure_charges', null=True, blank=True)
    Location = models.ForeignKey('Location_Detials', on_delete=models.CASCADE)
   
    class Meta:
        unique_together = ('MasterType', 'Service_ratecard', 'Procedure_ratecard', 'Location')
        db_table = 'Service_Procedure_Charges'

    def __str__(self):
        if self.MasterType == 'Service' and self.Service_ratecard:
            return f"Service: {self.Service_ratecard.Service_Name} - Location: {self.Location}"
        elif self.MasterType == 'Procedure' and self.Procedure_ratecard:
            return f"Procedure: {self.Procedure_ratecard.Procedure_Name} - Location: {self.Location}"
        return f"Service/Procedure - Location: {self.Location}"


class Service_Procedure_Rate_Charges(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='Service_Procedure_rates_charges')
    General_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        db_table = 'Service_Procedure_Rate_Charges'

   


class Service_Procedure_RoomTypeFee(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='Service_Procedure_room_type_fees')
    room_type = models.ForeignKey(RoomType_Master_Detials, on_delete=models.CASCADE,related_name='Service_Procedure_room_type_fees_room_type')
    General_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    General_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)
    Special_Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    Special_fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('Service_Procedure_ratecard', 'room_type')
        db_table = 'Service_Procedure_RoomTypeFee'

    

class Service_Procedure_InsuranceFee(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='insurance_fees')
    insurance = models.ForeignKey(Insurance_Master_Detials, on_delete=models.CASCADE,related_name='insurance_fees_insurance')
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('Service_Procedure_ratecard', 'insurance')
        db_table = 'Service_Procedure_InsuranceFee'

    
class Service_Procedure_ClientFee(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='client_fees')
    client = models.ForeignKey(Client_Master_Detials, on_delete=models.CASCADE,related_name='client_fees_client')
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('Service_Procedure_ratecard', 'client')
        db_table = 'Service_Procedure_ClientFee'

    
class Service_Procedure_InsuranceRoomTypeFee(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='insurance_room_type_fees')
    room_type_fee = models.ForeignKey(RoomType_Master_Detials, on_delete=models.CASCADE,related_name='insurance_room_type_fees_room_type_fee')
    insurance = models.ForeignKey(Insurance_Master_Detials, on_delete=models.CASCADE,related_name='insurance_room_type_fees_insurance')
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('Service_Procedure_ratecard', 'room_type_fee', 'insurance')
        db_table = 'Service_Procedure_InsuranceRoomTypeFee'

   

class Service_Procedure_ClientRoomTypeFee(models.Model):
    Service_Procedure_ratecard = models.ForeignKey(Service_Procedure_Charges, on_delete=models.CASCADE, related_name='client_room_type_fees')
    room_type_fee = models.ForeignKey(RoomType_Master_Detials, on_delete=models.CASCADE,related_name='client_room_type_fees_room_type_fee')
    client = models.ForeignKey(Client_Master_Detials, on_delete=models.CASCADE,related_name='client_room_type_fees_client')
    Prev_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=300)

    class Meta:
        unique_together = ('Service_Procedure_ratecard', 'room_type_fee', 'client')
        db_table = 'Service_Procedure_ClientRoomTypeFee'

    
#   Radiology


class RadiologyNames_Details(models.Model):
    Radiology_Id = models.IntegerField(primary_key=True)
    Radiology_Name = models.CharField(max_length=30)
    created_by = models.CharField(max_length=30)
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='Radiology_location',null=True)
    Status = models.BooleanField(default=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'RadiologyNames_Details'

    def save(self, *args, **kwargs):
        if not self.Radiology_Id:  # Check if Radiology_Id is not set
            max_id = RadiologyNames_Details.objects.aggregate(max_id=Max('Radiology_Id'))['max_id']
            self.Radiology_Id = (max_id or 0) + 1
        super(RadiologyNames_Details, self).save(*args, **kwargs)



class TestName_Details(models.Model):
    Test_Code = models.CharField(primary_key=True, max_length=30)  # Changed to CharField to store generated ID
    Radiology_Id = models.ForeignKey(RadiologyNames_Details, on_delete=models.CASCADE, related_name='testnames')
    Test_Name = models.CharField(max_length=30)
    IsSub_Test = models.CharField(max_length=20)
    Prev_Amount = models.DecimalField(max_digits=10, decimal_places=3,default=0)
    Amount = models.DecimalField(max_digits=10, decimal_places=3)
    Prev_BookingFees = models.DecimalField(max_digits=10, decimal_places=3)
    BookingFees = models.DecimalField(max_digits=10, decimal_places=3)
    Report_file = models.BinaryField(null=True, blank=True)
    Status = models.CharField(max_length=30)
    created_by = models.CharField(max_length=30)
    location = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'TestName_Details'

    def save(self, *args, **kwargs):
        if not self.Test_Code:  # Generate Mlc_Id if not set
            # Get the hospital name (clinic_name)
          
            
            # Fetch the maximum Mlc_Id
            max_Doctor_ID_row = TestName_Details.objects.aggregate(max_id=Max('Test_Code'))['max_id']
            max_Doctor_ID = max_Doctor_ID_row if max_Doctor_ID_row else None

            # Calculate the numerical part
            numeric_part = int(str(max_Doctor_ID)[7:]) + 1 if max_Doctor_ID else 1

            # Construct the next Mlc_Id
            self.Test_Code = f'TSTCODE{numeric_part:04}'

        super(TestName_Details, self).save(*args, **kwargs)

    def str(self):
        return self.Test_Name 
    


# Subtest-------------------------
class SubTest_Details(models.Model):
    SubTest_Code = models.CharField(primary_key=True, max_length=30)  # Changed to CharField to store generated ID
    Test_Code = models.ForeignKey(TestName_Details, on_delete=models.CASCADE,null=True,blank=True)
    SubTestName = models.CharField(max_length=20)
    Prev_Amount = models.DecimalField(max_digits=10, decimal_places=3,default=0)
    Amount = models.DecimalField(max_digits=10, decimal_places=3)
    Prev_BookingFees = models.DecimalField(max_digits=10, decimal_places=3)
    BookingFees = models.DecimalField(max_digits=10, decimal_places=3)
    Report_file = models.BinaryField(null=True, blank=True)
    Status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'SubTest_Details'

    def save(self, *args, **kwargs):
        if not self.SubTest_Code:  # Generate Mlc_Id if not set
            # Get the hospital name (clinic_name)
           
            
            # Fetch the maximum Mlc_Id
            max_Doctor_ID_row = SubTest_Details.objects.aggregate(max_id=Max('SubTest_Code'))['max_id']
            max_Doctor_ID = max_Doctor_ID_row if max_Doctor_ID_row else None

            # Calculate the numerical part
            numeric_part = int(str(max_Doctor_ID)[7:]) + 1 if max_Doctor_ID else 1

            # Construct the next Mlc_Id
            self.SubTest_Code = f'STSCODE{numeric_part:04}'

        super(SubTest_Details, self).save(*args, **kwargs)

    def str(self):
        return self.Sub_TestName  
#LabMaster


class External_LabDetails(models.Model):
    External_Id = models.IntegerField(primary_key=True)  # Corrected from 'IntergerField'
    LabName = models.CharField(max_length=50)
    PhoneNo = models.CharField(max_length=30)  # Corrected from 'InterFiels'
    Address = models.TextField()
    Pincode = models.CharField(max_length=30)
    RegisterNo = models.CharField(max_length=40)
    Email = models.CharField(max_length=40)  # Corrected from 'CharFiels'
    Lablocation = models.CharField(max_length=30)
    location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE,related_name='external_location',null=True)  # Corrected from 'Foreinkey'
    created_by = models.CharField(max_length=30)
    Status = models.CharField(max_length=30,default="Active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'External_LabDetails'

    def save(self, *args, **kwargs):
        if not self.External_Id:
            max_id = External_LabDetails.objects.aggregate(max_id=Max('External_Id'))['max_id']
            self.External_Id = (max_id or 0) + 1
        super(External_LabDetails, self).save(*args, **kwargs)


class LabTestName_Details(models.Model):
    TestCode = models.CharField(max_length=50, primary_key=True)  # Custom TestCode
    Test_Name = models.CharField(max_length=50)
    Prev_Amount = models.DecimalField(max_digits=10, decimal_places=3, default=0)
    Amount = models.DecimalField(max_digits=10, decimal_places=3)
    Types = models.CharField(max_length=30,default="")
    created_by = models.CharField(max_length=30)
    location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE,related_name='testlocation',null=True)
    Status = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'LabTestName_Details'

    def save(self, *args, **kwargs):
        if not self.TestCode:
            # Fetch the maximum TestCode
            max_TestCode_row = LabTestName_Details.objects.aggregate(max_id=Max('TestCode'))['max_id']
            max_TestCode = max_TestCode_row if max_TestCode_row else None

            # Calculate the numerical part from the existing code
            numeric_part = int(max_TestCode[7:]) + 1 if max_TestCode else 1

            # Construct the next TestCode
            self.TestCode = f'STSCODE{numeric_part:04}'

        super(LabTestName_Details, self).save(*args, **kwargs)

    def _str_(self):
        return self.Test_Name

class External_LabAmount_Details(models.Model):
    OutSource_Id = models.IntegerField(primary_key=True)
    Test_Name = models.ForeignKey(LabTestName_Details, on_delete=models.CASCADE, related_name='outsource', null=True)
    OutSourceLabName = models.ForeignKey(External_LabDetails, on_delete=models.CASCADE, related_name='outsource_location', null=True)
    OutSourcePrev_Amount = models.DecimalField(max_digits=10, decimal_places=3, default=0)
    OutSourceLabAmount = models.DecimalField(max_digits=10, decimal_places=3) 
    created_by = models.CharField(max_length=30)
    Status = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        db_table = 'External_LabAmount_Details'

    def save(self, *args, **kwargs):
        if not self.OutSource_Id:
            max_id = External_LabAmount_Details.objects.aggregate(max_id=Max('OutSource_Id'))['max_id']
            self.OutSource_Id = (max_id or 0) + 1
        super(External_LabAmount_Details, self).save(*args,**kwargs)


class BookingFees_Details(models.Model):
    Basic_FeesId = models.CharField(primary_key=True, max_length=30)  # Primary key for booking fees
    Radiology_Id = models.ForeignKey('RadiologyNames_Details', on_delete=models.CASCADE, related_name='bookingfees')
    From = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    To = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    Amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    Status = models.BooleanField(default=True) 
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'BookingFees_Details'
    
   

    def save(self, *args, **kwargs):
        if not self.Basic_FeesId:
            max_id = BookingFees_Details.objects.aggregate(max_id=Max('Basic_FeesId'))['max_id']
            if max_id:
                next_id = int(max_id[2:]) + 1
            else:
                next_id = 1
            self.Basic_FeesId = f"BF{next_id:04d}"
        super().save(*args, **kwargs)


class TestName_Favourites(models.Model):
    Favourite_Code = models.AutoField(primary_key=True)
    FavouriteName = models.CharField(max_length=50)
    TestName = models.ManyToManyField(LabTestName_Details, related_name='testNames')
    SumOfAmount = models.DecimalField(max_digits=10, decimal_places=3)
    Previous_Amount = models.DecimalField(max_digits=10, decimal_places=3, default=0)
    Current_Amount = models.DecimalField(max_digits=10, decimal_places=3)
    created_by = models.CharField(max_length=30)
    Status = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'TestName_Favourites'

    def save(self, *args, **kwargs):
        if not self.Favourite_Code:
            max_code_row = TestName_Favourites.objects.aggregate(max_id=Max('Favourite_Code'))['max_id']
            max_code = max_code_row if max_code_row else 0
            self.Favourite_Code = max_code + 1
        super(TestName_Favourites, self).save(*args, **kwargs)

    def str(self):
        return self.FavouriteName
    
# instrument
from django.db import models
from django.db.models import Max

class Instrument_Details(models.Model):
    InstrumentCode = models.CharField(max_length=50, primary_key=True)  # Changed to CharField to accommodate custom code
    Instrument_Name = models.CharField(max_length=50)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Instrument_Details'

    def save(self, *args, **kwargs):
        if not self.InstrumentCode:
            max_code_row = Instrument_Details.objects.aggregate(max_id=Max('InstrumentCode'))['max_id']
            max_code = int(max_code_row[4:]) if max_code_row else 0  # Assuming 'INST' prefix
            self.InstrumentCode = f"INST{max_code + 1:04}"
        super(Instrument_Details, self).save(*args, **kwargs)

    def str(self):
        return self.Instrument_Name



class Instrument_TrayNames(models.Model):
    Tray_Code = models.AutoField(primary_key=True)
    TrayName = models.CharField(max_length=50)
    TrayQuantity = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    created_by = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    Instrument = models.ManyToManyField(
        Instrument_Details,
        through='TrayInstrumentLink',
        related_name='trays'
    )

    class Meta:
        db_table = 'Instrument_TrayNames'

    def save(self, *args, **kwargs):
        if not self.Tray_Code:
            max_code_row = Instrument_TrayNames.objects.aggregate(max_id=Max('Tray_Code'))['max_id']
            max_code = max_code_row if max_code_row else 0
            self.Tray_Code = max_code + 1
        super(Instrument_TrayNames, self).save(*args, **kwargs)

    def _str_(self):
        return self.TrayName

class TrayInstrumentLink(models.Model):
    tray = models.ForeignKey(Instrument_TrayNames, on_delete=models.CASCADE)
    instrument = models.ForeignKey(Instrument_Details, on_delete=models.CASCADE)
    Previous_Quantity = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    Current_Quantity = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    Status = models.BooleanField(default=True)

    class Meta:
        db_table = 'TrayInstrumentLink'
        unique_together = ('tray', 'instrument')
    
# ------------------------------------------------------------------------------------------------------------

class Doctor_Calender_Modal_Edit(models.Model):
    Doctor_ID = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE, db_column='Doctor_ID')
    Day = models.CharField(max_length=30)
    Date = models.CharField(max_length=30)
    Location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE,null=True)
    RadioOption = models.CharField(max_length=30,default='Shift')
    Shift = models.CharField(max_length=30,default='Single')
    Starting_Time = models.TimeField(null=True,blank=True)
    End_Time = models.TimeField(blank=True, null=True)
    Starting_Time_F = models.TimeField(blank=True,null=True)
    End_Time_F = models.TimeField(blank=True,null=True)
    Starting_Time_A = models.TimeField(blank=True,null=True)
    End_Time_A = models.TimeField(blank=True,null=True)
    Working_Hours_F = models.CharField(max_length=30,null=True) 
    Working_Hours_A = models.CharField(max_length=30,null=True) 
    Working_Hours_S = models.CharField(max_length=30,null=True) 
    Total_Working_Hours_S = models.CharField(max_length=30, null=True,blank=True)
    Total_Working_Hours = models.CharField(max_length=30, null=True,blank=True)     
    LeaveRemarks = models.CharField(max_length=30,null=True)  
    class Meta:
        db_table = 'Doctor_Calender_Modal_Edit'   
    def _str_(self):
        return self.Doctor_ID
    

class DutyRousterMaster(models.Model):
    Location = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,null=True)
    ShiftName = models.CharField(max_length=30)
    ShiftStartTime = models.TimeField()
    ShiftEndTime = models.TimeField()
    Status = models.BooleanField(default=True)
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'DutyRousterMaster'   
    def _str_(self):
        return self.ShiftName


# -------------------------------------INVENTORY


# Rack master

class  Rack_Master_Detials(models.Model):
    Rack_Id = models.AutoField(primary_key=True)
    Rack_Name = models.CharField(max_length=50)
    Location_Name = models.ForeignKey(Location_Detials,on_delete=models.CASCADE,related_name='Rack_Master_Location')
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Rack_Master_Detials'
        
    def str(self):
        return self.Rack_Name


class Shelf_Master_Detials(models.Model):
    Shelf_Id=models.AutoField(primary_key=True)
    Shelf_Name=models.CharField(max_length=70)
    Rack_Name=models.ForeignKey(Rack_Master_Detials,on_delete=models.CASCADE,related_name='Shelf_Rack_Name')
    Status=models.BooleanField(default=True)
    created_by=models.CharField(max_length=70)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class  Meta:
        db_table = 'Shelf_Master_Detials'
    
    def str(self):
        return(self.Shelf_Name)
    

class Tray_Master_Details(models.Model):
    Tray_Id=models.AutoField(primary_key=True)
    Tray_Name=models.CharField(max_length=70)
    Shelf_Name=models.ForeignKey(Shelf_Master_Detials,on_delete=models.CASCADE,related_name='Tray_Shelf_Name')
    Rack_Name=models.ForeignKey(Rack_Master_Detials,on_delete=models.CASCADE,related_name='Tray_Rack_Name')
    Status=models.BooleanField(default=True)
    Booking_Status=models.CharField(max_length=30,default='Available')
    created_by=models.CharField(max_length=70)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Tray_Master_Details'
    def __str__(self):
        return(self.Tray_Name)
    

class Medical_ProductCategory_Details(models.Model):
    ProductCategory_Id=models.AutoField(primary_key=True)
    ProductCategory_Name=models.CharField(max_length=70)
    Status=models.BooleanField(default=True)
    Created_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Medical_ProductCategory_Details'
    
    def __str__(self):
        return(self.ProductCategory_Name)

class Medical_SubCategory_Detailes(models.Model):
    SubCategory_Id=models.AutoField(primary_key=True)
    ProductCategoryId=models.ForeignKey(Medical_ProductCategory_Details,on_delete=models.CASCADE,related_name='ProductCategoryId')
    SubCategoryName=models.CharField(max_length=150)
    Status=models.BooleanField(default=True)
    Created_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Medical_SubCategory_Detailes'
    def __str__(self):
        return(self.SubCategoryName)
        

class Drug_Group_Master_Details(models.Model):
    DrugGroup_Id=models.AutoField(primary_key=True)
    DrugGroup_Name=models.CharField(max_length=100)
    Status=models.BooleanField(default=True)
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Drug_Group_Master_Details'
    def __str__(self):
        return(self.DrugGroup_Name)
    

# -------------------------------------------------------------------------------



class Medical_Stock_FileUpload(models.Model):
    Product_Id=models.IntegerField(primary_key=True)
    Product_Name=models.CharField(max_length=200)
    Generic_Name=models.CharField(max_length=200)
    Item_Type = models.CharField(max_length=65, default="")
    Dosage = models.CharField(max_length=25, default="")
    Available_Qantity=models.IntegerField()

    class Meta:
        db_table='Medical_Stock_FileUpload'
    
    def __str__(self):
        return(self.Product_Name)
    


class ProductType_Master_Details(models.Model):
    ProductType_Id=models.AutoField(primary_key=True)
    ProductType_Name=models.CharField(max_length=100)
    Status=models.BooleanField(default=True)
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ProductType_Master_Details'
    def __str__(self):
        return(self.DrugGroup_Name)
    




class Medical_ProductMaster_Details(models.Model):

    Item_Id=models.CharField(primary_key=True,max_length=30)
    Item_Name=models.CharField(max_length=200)
    Generic_Name=models.CharField(max_length=200)
    CompanyName=models.CharField(max_length=200)    
    Product_Category=models.ForeignKey(Medical_ProductCategory_Details,on_delete=models.CASCADE,related_name='Medical_Master_Product_Category')
    Product_SubCategory=models.ForeignKey(Medical_SubCategory_Detailes,on_delete=models.CASCADE,related_name='Medical_Master_Product_SubCategory')
    Strength=models.IntegerField() 
    UOM=models.CharField(max_length=20)
    HSN_Code=models.CharField(max_length=15)
    Drug_Group=models.ForeignKey(Drug_Group_Master_Details,on_delete=models.CASCADE,related_name='Medical_Master_Drug_Group')
    PackingType=models.ForeignKey(ProductType_Master_Details,on_delete=models.CASCADE,related_name='PackingType')
    PackingQty=models.IntegerField()    
    LeastSellablePack=models.ForeignKey(ProductType_Master_Details,on_delete=models.CASCADE,related_name='LeastSellablePack')
    LeastSellableQty=models.IntegerField()
    Minimum_Qantity=models.IntegerField(default=0)
    Maximum_Qantity=models.IntegerField(default=0)
    Remarks=models.CharField(max_length=250)
    IsDistribution=models.BooleanField(default=True)
    InActive=models.BooleanField(default=True)
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Medical_ProductMaster_Details'

    def __str__(self):
        return (self.Item_Name)
   

    
    def save(self, *args, **kwargs):
        if not self.Item_Id:  

            Item_Key_name ="MEDI"
            
            max_Item_Id_row = Medical_ProductMaster_Details.objects.exclude(Create_by="system").aggregate(max_id=Max('Item_Id'))['max_id']
            max_Item_Id = max_Item_Id_row if max_Item_Id_row else None

            numeric_part = int(str(max_Item_Id)[4:]) + 1 if max_Item_Id else 1

            self.Item_Id = f'{Item_Key_name}{numeric_part:04}'

        super(Medical_ProductMaster_Details, self).save(*args, **kwargs)


class Tray_management_Details(models.Model):
    Tray_Management_Id=models.AutoField(primary_key=True)
    Tray_Name=models.ForeignKey(Tray_Master_Details,on_delete=models.CASCADE,related_name='Tray_management_Name')
    Item_Name=models.ForeignKey(Medical_ProductMaster_Details,on_delete=models.CASCADE,related_name='Tray_management_ItemName')
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        db_table='Tray_management_Details'
    
    



class Prev_Tray_management_Details(models.Model):
    Prev_Tray_Management_Id=models.AutoField(primary_key=True)
    Prev_Tray_Name=models.ForeignKey(Tray_Master_Details,on_delete=models.CASCADE,related_name='Tray_management_Prev_Tray_Name')
    Prev_Item_Name=models.ForeignKey(Medical_ProductMaster_Details,on_delete=models.CASCADE,related_name='Tray_management_Prev_Item_Name')
    Create_by=models.CharField(max_length=70)
    Created_at=models.DateTimeField(auto_now_add=True)
    Updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        db_table='Prev_Tray_management_Details'


class Supplier_Master_Details(models.Model): 

    Supplier_Id=models.CharField(primary_key=True,max_length=20)
    Supplier_Name=models.CharField(max_length=255)
    Supplier_Type=models.CharField(max_length=50)
    Contact_Persion=models.CharField(max_length=200)
    Contact_Number=models.CharField(max_length=10)
    Email_Address=models.CharField(max_length=100)
    Address=models.TextField()
    Registration_Number=models.CharField(max_length=30)
    GST_Number=models.CharField(max_length=20)
    PAN_Number=models.CharField(max_length=20)
    Payment_Terms=models.IntegerField()
    Credit_Limit=models.IntegerField()
    LeadTime=models.IntegerField()
    Preferred_Supplier=models.BooleanField(default=False)
    InActive=models.BooleanField(default=False)
    Notes=models.TextField()
    Payment_Mode=models.CharField(max_length=20)
    File_Attachment=models.BinaryField(null=True, blank=True)
    Create_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    Update_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='Supplier_Master_Details'
    
    def __str__(self):
        return (self.Supplier_Name)


    def save(self,*args,**kwargs):
        if not self.Supplier_Id:

            Supplier_Key_name='SUPP'

            max_Supplier_id_row=Supplier_Master_Details.objects.exclude(Create_by="system").aggregate(max_id=Max('Supplier_Id'))['max_id']

            max_Supplier_id=max_Supplier_id_row if max_Supplier_id_row else None

            numeric_part = int(str(max_Supplier_id)[4:]) + 1 if max_Supplier_id else 1

            self.Supplier_Id=f'{Supplier_Key_name}{numeric_part:04}'
        
        super(Supplier_Master_Details,self).save(*args, **kwargs)


    
class Supplier_Bank_Details(models.Model):
    Supplier_Bank_id=models.AutoField(primary_key=True)
    Supplier_Name=models.ForeignKey(Supplier_Master_Details,on_delete=models.CASCADE,related_name='Bank_Supp_name')
    Bank_Name=models.CharField(max_length=100)
    Account_Number=models.CharField(max_length=50)
    IFSCCode=models.CharField(max_length=30)
    BankBranch=models.CharField(max_length=100)
    create_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    Update_at=models.DateTimeField(auto_now=True)

    class Meta :
        db_table='Supplier_Bank_Details'
    def __str__(self):
        return (self.Bank_Name)
    
    
class Supplier_Product_Details(models.Model):
    S_No=models.AutoField(primary_key=True)
    Product_Supplier_Name=models.ForeignKey(Supplier_Master_Details,on_delete=models.CASCADE,related_name='Prod_Supp_name')
    Supplier_Product_Name=models.ForeignKey(Medical_ProductMaster_Details,on_delete=models.CASCADE,related_name='Prodct_Supp_mas')
    Minimum_Purchase_Pack=models.ForeignKey(ProductType_Master_Details,on_delete=models.CASCADE,related_name='Supp_ProdType')
    Minimum_Purchase_Qty=models.IntegerField()
    Prev_PurchaseRateBeforeGST=models.DecimalField(max_digits=10, decimal_places=2,default=0)
    PurchaseRateBeforeGST=models.DecimalField(max_digits=10, decimal_places=2)
    Prev_GST=models.IntegerField(default=0)
    GST=models.IntegerField()
    Prev_PurchaseRateAfterGST=models.DecimalField(max_digits=10, decimal_places=2,default=0)
    PurchaseRateAfterGST=models.DecimalField(max_digits=10, decimal_places=2)
    Prev_MRP=models.DecimalField(max_digits=10, decimal_places=2,default=0)
    MRP=models.DecimalField(max_digits=10, decimal_places=2)
    Purchase_Product_Status=models.BooleanField(default=False)
    Create_by=models.CharField(max_length=100)
    Created_at=models.DateTimeField(auto_now_add=True)
    Update_at=models.DateTimeField(auto_now=True)

    class Meta:
        db_table='Supplier_Product_Details'
    





class SurgeryName_Details(models.Model):
    Surgery_Id = models.IntegerField(primary_key=True)
    Location_Name = models.ForeignKey(Location_Detials, on_delete=models.CASCADE, related_name='surgery_location', null=True)
    Speciality_Name = models.ForeignKey(Speciality_Detials, on_delete=models.CASCADE, related_name='surgery_speciality', null=True)
    Surgery_Name = models.CharField(max_length=40)
    Duration_Hours = models.DecimalField(max_digits=5, decimal_places=2)  # Define decimal precision
    Estimate_Cost = models.DecimalField(max_digits=10, decimal_places=2)  # Define decimal precision
    Anesthesia_Type = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'SurgeryName_Details'

    def save(self, *args, **kwargs):
        if not self.Surgery_Id:
            max_id = SurgeryName_Details.objects.aggregate(max_id=Max('Surgery_Id'))['max_id']
            self.Surgery_Id = (max_id or 0) + 1
        super(SurgeryName_Details, self).save(*args, **kwargs)

    def _str_(self):
        return self.Surgery_Name





class pharmacy_stock_location_information(models.Model):
    S_No = models.AutoField(primary_key=True)
    Issue_InvoiceNo = models.CharField(max_length=30)
    Item_Code = models.CharField(max_length=30)
    Item_Name = models.CharField(max_length=70)
    Generic_Name = models.CharField(max_length=50)
    Strength = models.CharField(max_length=25)
    UOM = models.CharField(max_length=25)
    Pack_type = models.CharField(max_length=25)
    Pack_Quantity = models.IntegerField()  # Removed max_length
    HSN_Code = models.CharField(max_length=25)
    Batch_No = models.CharField(max_length=25)
    ManufactureDate = models.DateField(null=True, blank=True)
    ExpiryDate = models.DateField(null=True, blank=True)
    ExpiryStatus = models.CharField(max_length=25)
    TotalQuantity = models.BigIntegerField()  # Removed max_length
    SoldQuantity = models.BigIntegerField()  # Removed max_length
    AvailableQuantity = models.BigIntegerField()  # Removed max_length
    MRP_Per_Quantity = models.DecimalField(max_digits=10, decimal_places=2)
    Selling_Rate = models.DecimalField(max_digits=10, decimal_places=2)
    Tax_Percentage = models.IntegerField()  # Removed max_length
    Taxable_Selling_Rate = models.DecimalField(max_digits=10, decimal_places=2)
    Created_By = models.CharField(max_length=150)
    Location = models.CharField(max_length=75)
    ProductCategory = models.CharField(max_length=50)
    ProductCategoryType = models.CharField(max_length=50)
    UpdatedAt = models.DateTimeField(auto_now_add=True)
    CreatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pharmacy_stock_location_information'

    def _str_(self):
        return str(self.S_No)
    
    
class Frequency_Master_Drug(models.Model):
    FrequencyId = models.AutoField(primary_key=True)
    FrequencyName = models.CharField(max_length=40)
    FrequencyType = models.CharField(max_length=55)
    Frequency = models.CharField(max_length=30)
    FrequencyTime = models.CharField(max_length=50)
    Status = models.CharField(max_length=30)
    # Location = models.ForeignKey(max_length=34)

    class Meta:
        db_table='Frequency_Master_Drug'
    def save(self, *args, **kwargs):
        if not self.FrequencyId:
            max_code_row = Frequency_Master_Drug.objects.aggregate(max_id=Max('FrequencyId'))['max_id']
            max_code = max_code_row if max_code_row else 0
            self.FrequencyId = max_code + 1
        super(Frequency_Master_Drug, self).save(*args, **kwargs)

        
class credentialapi(models.Model):
    api_id = models.AutoField(primary_key=True)  # Auto-incrementing field
    token_id = models.CharField(max_length=255, unique=True)
    password_hash = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'credentialapi'
    def _str_(self):
        return self.token_id
    
class appexpiry(models.Model):
    s_no =models.AutoField(primary_key=True)
    user = models.ForeignKey(UserRegister_Master_Details, on_delete=models.CASCADE,blank=True)
    subscriptiontype=models.CharField(max_length=50)
    duration=models.BigIntegerField()
    appstart_date = models.DateField()
    app_end_date = models.DateField()
    status=models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'appexpiry'
    def _str_(self):
        return self.status

