from django.db import models
from Frontoffice.models import *



class IP_Vital_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Vitals_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='Casuality_Vitals_Registration_Id',null=True,blank=True)
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
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_Vital_Details'


class IP_VitalsChart(models.Model):
    Id = models.AutoField(primary_key=True)
    Vitals = models.CharField(max_length=225, blank=True, null= True)
    Age = models.CharField(max_length=225, blank=True, null= True)
    MinHigh = models.CharField(max_length=225, blank=True, null= True)
    MinMedium = models.CharField(max_length=225, blank=True, null= True)
    MinLow = models.CharField(max_length=225, blank=True, null= True)
    Normal = models.CharField(max_length=225, blank=True, null= True)
    MaxLow = models.CharField(max_length=225, blank=True, null= True)
    MaxMedium = models.CharField(max_length=225, blank=True, null= True)
    MaxHigh = models.CharField(max_length=225, blank=True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_VitalsChart'

 
class IPD_Handover_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Admission_Registration_Id')
    ReasonForAdmission = models.TextField()
    PatientConditionOnAdmission = models.TextField()
    DoctorIncharge = models.CharField(max_length=30, blank=True, null= True)
    NurseIncharge = models.CharField(max_length=30, blank=True, null= True)
    ReceptionInchargeName = models.CharField(max_length=30, blank=True, null= True)
    PatientFile = models.CharField(max_length=30, blank=True, null= True)
    AadharCardNo = models.CharField(max_length=30, blank=True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IPD_Handover_Details'


class IP_SurgicalHistory_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_SurgicalHistory_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_SurgicalHistory_Casuality_Registration_Id',null=True,blank=True)
    SurgicalProcedure = models.CharField(max_length=100,blank=True,null=True)
    DateOfSurgery = models.CharField(max_length=100,blank=True,null=True)
    PostOpDate = models.CharField(max_length=100,blank=True,null=True)
    MajorSurgicalEvents = models.CharField(max_length=100,blank=True,null=True)
    BloodProductsTransfusedDuringSurgery = models.CharField(max_length=100,blank=True,null=True)
    NoOfBags = models.CharField(max_length=100,blank=True,null=True)
    AnyAdverseReactions = models.CharField(max_length=100,blank=True,null=True)
    Remarks = models.TextField()
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_SurgicalHistory_Details'



class IP_Intake_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='Ip_Registration_Id_intake',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='Casuality_Registration_Id_intake',null=True,blank=True)
    IntakeType = models.CharField(max_length=100, blank=True, null=True)
    IntakeMode = models.CharField(max_length=100, blank=True, null=True)
    Site = models.CharField(max_length=100, blank=True, null=True)
    Measurement = models.CharField(max_length=50, blank=True, null=True)
    MeasurementType = models.CharField(max_length=50, blank=True, null=True)
    Duration = models.CharField(max_length=50, blank=True, null=True)
    DurationType = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.TextField(blank=True, null=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_Intake_Details'


class IP_Output_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='Ip_Registration_Id_Output',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='Casuality_Registration_Id_Output',null=True,blank=True)
    OutputType = models.CharField(max_length=50, blank=True, null=True)
    Measurement = models.CharField(max_length=50, blank=True, null=True)
    MeasurementType = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.TextField(blank=True, null=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_Output_Details'


class IP_Balance_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='Ip_Registration_Id_Balance',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='Casuality_Registration_Id_Balance',null=True,blank=True)
    totalInputDay = models.CharField(max_length=50, blank=True, null=True)
    totalOutputDay = models.CharField(max_length=50, blank=True, null=True)
    balance = models.CharField(max_length=50, blank=True, null=True)
    balanceType = models.CharField(max_length=50, blank=True, null=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_Balance_Details'


class IP_ProgressNotes_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_ProgressNotes_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_ProgressNotes_Casuality_Registration_Id',null=True,blank=True)
    ProgressNotes = models.TextField()
    TreatmentNotes = models.TextField()
    AdverseEvents = models.CharField(max_length=10,blank=True,null=True)
    colorFlag = models.CharField(max_length=10,blank=True,null=True)
    Type = models.CharField(max_length=10,blank=True,null=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_ProgressNotes_Details'



class IP_Assesment_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='Casuality_Id',null=True,blank=True)
    Presenting_Complaints = models.CharField(max_length=500)
    DetailsPresenting_Complaints = models.CharField(max_length=500)
    History_Of = models.CharField(max_length=500)
    PatientStatus_AtAdmission = models.CharField(max_length=500)
    MedicalHistory_Checkbox = models.CharField(max_length=500)
    MedicalHistory_Others = models.CharField(max_length=500)
    SocialHistory_Checkbox = models.CharField(max_length=500)
    FamilyHistory_Checkbox = models.CharField(max_length=500)
    FamilyHistory_Others = models.CharField(max_length=500)
    RelationShip = models.CharField(max_length=20)
    SurgicalHistory_Checkbox = models.CharField(max_length=500)
    SurgicalHistory_Others = models.CharField(max_length=500)
    Listnames_Anddates = models.CharField(max_length=200)
    womenMen_Checkbox = models.CharField(max_length=200)
    men_Checkbox = models.CharField(max_length=200)
    Dateoflast_colonoscopy = models.CharField(max_length=50)
    Lmp = models.CharField(max_length=50)
    NoOf_Pregnancies = models.CharField(max_length=10)
    NoOf_Deliveries = models.CharField(max_length=10)
    Vaginal = models.CharField(max_length=50)
    Csection = models.CharField(max_length=50)
    MisCarriage = models.CharField(max_length=10)
    Vip_Abortions = models.CharField(max_length=10)
    Allergies = models.CharField(max_length=500)
    Temperature = models.CharField(max_length=10)
    Pulse_Rate = models.CharField(max_length=10)
    SPO2 = models.CharField(max_length=10)
    Heart_Rate = models.CharField(max_length=10)
    RR = models.CharField(max_length=10)
    BP = models.CharField(max_length=10)
    Height = models.CharField(max_length=10)
    Weight = models.CharField(max_length=10)
    BMI = models.CharField(max_length=10)
    WC = models.CharField(max_length=10)
    HC = models.CharField(max_length=10)
    BSL = models.CharField(max_length=10)
    CVS = models.CharField(max_length=200)
    Pupil = models.CharField(max_length=200)
    UlRt = models.CharField(max_length=10)
    UlLt = models.CharField(max_length=10)
    LlRt = models.CharField(max_length=10)
    LlLt = models.CharField(max_length=10)
    Rt = models.CharField(max_length=10)
    Lt = models.CharField(max_length=10)
    RS = models.CharField(max_length=200)
    PA = models.CharField(max_length=200)
    CNS = models.CharField(max_length=200)
    Local_Examination = models.CharField(max_length=200)
    LocalOthers = models.CharField(max_length=200)
    Provisional_Diagnosis = models.CharField(max_length=500)
    isSameAsProvisional = models.CharField(max_length=10)
    Final_Diagnosis = models.CharField(max_length=500)
    Treatment_Given = models.CharField(max_length=500) 
    Created_by = models.CharField(max_length=50)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        db_table = "IP_Assesment_Details"
    
  




class IP_Mlc_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Mlc_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Mlc_Casuality_Registration_Id',null=True,blank=True)
    Mlc_No = models.CharField(max_length=20)
    Mlc_InfoDate = models.CharField(max_length=20)
    Mlc_InfoTime = models.CharField(max_length=20)
    Informed_By = models.CharField(max_length=20)
    Mlc_SendTime = models.CharField(max_length=20)
    Mlc_Reason = models.CharField(max_length=500)
    Mlc_Type = models.CharField(max_length=50)
    PoliceStation_Name = models.CharField(max_length=50)
    Consultant_Name = models.CharField(max_length=20)
    Rmo_Name = models.CharField(max_length=20)
    MlcCopy_ReceiveTime = models.CharField(max_length=20)
    ReceivedBy_Sister = models.CharField(max_length=20)
    Reception_StaffName = models.CharField(max_length=20)
    Incharge_Name = models.CharField(max_length=20)
    Mlc_Remarks = models.CharField(max_length=200)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = "IP_Mlc_Details"
    
   




class IP_Dama_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Dama_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Dama_Casuality_Registration_Id',null=True,blank=True)
    Type = models.CharField(max_length=20)
    Reasons = models.CharField(max_length=200,blank=True,null=True)
    DamaDate = models.DateField()
    Time = models.TimeField()
    Remarks = models.TextField()
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = "IP_Dama_Details"
    
   




class IP_PreOpChecklist_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Preop_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Preop_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    Date = models.CharField(max_length=20)
    Time = models.CharField(max_length=20)
    OperativeArea = models.CharField(max_length=20)
    OperativeAreaRemarks = models.CharField(max_length=200)
    Operativeinspected = models.CharField(max_length=20)
    OperativeinspectedRemarks = models.CharField(max_length=200)
    JewelleryRemoved = models.CharField(max_length=20)
    JewelleryRemovedRemarks = models.CharField(max_length=200)
    JewelleryTied = models.CharField(max_length=20)
    JewelleryTiesRemarks = models.CharField(max_length=200)
    NasogastricTube = models.CharField(max_length=20)
    NasogastricTubeRemarks = models.CharField(max_length=200)
    Falsetooth = models.CharField(max_length=20)
    FalsetoothRemarks = models.CharField(max_length=200)
    ColouredNail = models.CharField(max_length=20)
    ColouredNailRemarks = models.CharField(max_length=200)
    HairPrepared = models.CharField(max_length=20)
    HairPreparedRemarks = models.CharField(max_length=200)
    VoidedOrCatheroized = models.CharField(max_length=20,blank=True,null=True)
    VoidedOrCatheroizedRemarks = models.CharField(max_length=200)
    VoidedAmount = models.CharField(max_length=200)
    VoidedTime = models.CharField(max_length=20)
    VaginalDouche = models.CharField(max_length=20)
    VaginalDoucheRemarks = models.CharField(max_length=200)
    Allergies = models.CharField(max_length=20)
    AllergiesRemarks = models.CharField(max_length=200)
    BathTaken = models.CharField(max_length=20)
    BathTakenRemarks = models.CharField(max_length=200)
    BloodRequirement = models.CharField(max_length=20)
    BloodRequirementRemarks = models.CharField(max_length=200)
    ConsentForm = models.CharField(max_length=20)
    ConsentFormRemarks = models.CharField(max_length=200)
    MorningTPR = models.CharField(max_length=20)
    MorningTPRRemarks = models.CharField(max_length=200)
    MorningSample = models.CharField(max_length=20)
    MorningSampleRemarks = models.CharField(max_length=200)
    XRayFilms = models.CharField(max_length=20)
    XRayFilmsRemarks = models.CharField(max_length=200)
    PreanaestheticMedication = models.CharField(max_length=20)
    PreanaestheticMedicationRemarks = models.CharField(max_length=200)
    SideRails = models.CharField(max_length=20)
    SideRailsRemarks = models.CharField(max_length=200)
    PulseRate = models.CharField(max_length=200)
    RespRate = models.CharField(max_length=200)
    IdentificationWristlet = models.CharField(max_length=20)
    IdentificationWristletRemarks = models.CharField(max_length=200)
    SpecialDrug = models.CharField(max_length=200)
    DutySisterName = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)


    class Meta:
        db_table = "IP_PreOpChecklist_Details"  

    

class IP_PreOpInstructions_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_PreOpIns_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_PreOpIns_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    Date = models.CharField(max_length=20)
    Time = models.CharField(max_length=20)
    AnnotatedImage = models.BinaryField(null=True,blank=True)
    ScalpHair = models.CharField(max_length=200)
    Nails = models.CharField(max_length=200)
    Givemouth = models.CharField(max_length=200)
    Vaginal = models.CharField(max_length=200)
    Bowel = models.CharField(max_length=200)
    Enema = models.CharField(max_length=200)
    secTextArea = models.CharField(max_length=200)
    urinaryCatheter = models.CharField(max_length=200)
    nasogastricTube = models.CharField(max_length=200)
    ThirdTextArea = models.CharField(max_length=200)
    nilOrallyAfter = models.CharField(max_length=200)
    ivDripAt = models.CharField(max_length=200)
    ivSiteList = models.CharField(max_length=200)
    ivLocation = models.CharField(max_length=200)
    SixTextArea = models.CharField(max_length=200)
    SevenTextArea = models.CharField(max_length=200)
    DutySisterName = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = "IP_PreOpInstructions_Details"
    

    

    


class IP_ConsernForms_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Consern_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Consern_Casuality_Registration_Id',null=True,blank=True)    
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    Date = models.DateField()
    Time = models.TimeField()
    Department = models.CharField(max_length=50,blank=True,null=True)
    ConsernFormName = models.CharField(max_length=100,blank=True,null=True)
    ChooseDocument = models.BinaryField(blank=True,null=True)
    ChkBox = models.CharField(max_length=10,blank=True,null=True)
    SisterName = models.CharField(max_length=50,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_ConsernForms_Details'
        
        
        

class IP_VentilatorSettings_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Ventilator_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Ventilator_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    Mode = models.CharField(max_length=50,blank=True,null=True)
    BreathsPerMin = models.IntegerField()
    PressSupport = models.IntegerField()
    PeakPress = models.IntegerField()
    Peep = models.IntegerField()
    MeanPress = models.IntegerField()
    MV = models.IntegerField()
    ITV = models.IntegerField()
    ETV = models.IntegerField()
    F2O2 = models.FloatField()
    VentilatorAssociatedPneumonia = models.CharField(max_length=50,blank=True,null=True)
    Status = models.CharField(max_length=50,blank=True,null=True)
    Remarks = models.CharField(max_length=500,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_VentilatorSettings_Details'



class IP_BloodLines_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_BloodLines_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_BloodLines_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    BlType = models.CharField(max_length=50,blank=True,null=True)
    IVsite = models.CharField(max_length=50,blank=True,null=True)
    IAsite = models.CharField(max_length=50,blank=True,null=True)
    Condition = models.CharField(max_length=50,blank=True,null=True)
    Status = models.CharField(max_length=50,blank=True,null=True)
    CentralLineInfection = models.CharField(max_length=50,blank=True,null=True)
    Remarks = models.CharField(max_length=500,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)
    class Meta:
        db_table = 'IP_BloodLines_Details'




class IP_UrinaryCathetor_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Urinary_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Urinary_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    CathetorFunction = models.CharField(max_length=50, blank=True, null=True)
    UrineQuality = models.CharField(max_length=50, blank=True, null=True)
    CatheterSite = models.CharField(max_length=50, blank=True, null=True)
    UrinaryCatheterSize = models.CharField(max_length=50, blank=True, null=True)
    Status = models.CharField(max_length=50, blank=True, null=True)
    Uti = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_UrinaryCathetor_Details'



class IP_BloodTransfusedRecord_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_BlTrans_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_BlTrans_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    SourcedFrom = models.CharField(max_length=50, blank=True, null=True)
    GetAddress = models.CharField(max_length=500, blank=True, null=True)
    BloodGroup = models.CharField(max_length=50, blank=True, null=True)
    Type = models.CharField(max_length=50, blank=True, null=True)
    CompatabilityCheckDone = models.CharField(max_length=50, blank=True, null=True)
    PackNo = models.CharField(max_length=50, blank=True, null=True)
    ExpiryDate = models.DateField()
    ExpiryStartTime = models.TimeField()
    ExpiryEndTime = models.TimeField()
    AnyAdverseReactions = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_BloodTransfusedRecord_Details'




class IP_DrainageTubes_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Ip_Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Drainage_Ip_Registration_Id',null=True,blank=True)
    Casuality_Registration_Id = models.ForeignKey(Patient_Casuality_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Drainage_Casuality_Registration_Id',null=True,blank=True)
    DepartmentType = models.CharField(max_length=30,blank=True,null=True)
    Status = models.CharField(max_length=50, blank=True, null=True)
    Site = models.CharField(max_length=50, blank=True, null=True)
    LocationLR = models.CharField(max_length=50, blank=True, null=True)
    Quality = models.CharField(max_length=50, blank=True, null=True)
    DrainageTubeSize = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_DrainageTubes_Details'




class IP_SurgicalSite_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='SurgicalSite_details')
    Skin = models.CharField(max_length=50, blank=True, null=True)
    Wound = models.CharField(max_length=50, blank=True, null=True)
    Dressing = models.CharField(max_length=50, blank=True, null=True)
    SurgicalSiteInfection = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_SurgicalSite_Details'



class IP_BedsoreManagement_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='BedsoreManagement_details')
    Site = models.CharField(max_length=50, blank=True, null=True)
    LocationLR = models.CharField(max_length=50, blank=True, null=True)
    Area = models.CharField(max_length=50, blank=True, null=True)
    Dressing = models.CharField(max_length=50, blank=True, null=True)
    Condition = models.CharField(max_length=50, blank=True, null=True)
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_BedsoreManagement_Details'




class IP_PatientCare_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='PatientCare_details')
    PatientCareParameter = models.CharField(max_length=50, blank=True, null=True)
    Time = models.TimeField()
    Remarks = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_PatientCare_Details'



class IP_InchargeAndRefer_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='InchargeAndRefer_details_Registration_Id',null=True,blank=True,default=None)
    Doctor_Id = models.ForeignKey(Doctor_ProfessForm_Detials, on_delete=models.CASCADE, related_name='InchargeAndRefer_details_Doctor_Id',null=True,blank=True,default=None)
    Reason = models.CharField(max_length=500, blank=True, null=True)
    Type = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_InchargeAndRefer_Details'
        
        
class IP_DischargeRequest_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    Doctor_Id = models.ForeignKey(Doctor_ProfessForm_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    SisterIncharge = models.CharField(max_length=50,null=True,blank=True)
    Reason = models.TextField()
    Remarks = models.TextField()
    Lab=models.BooleanField(default=False)
    LabStatus= models.CharField(default='Pending',max_length=20)
    LabDateTime = models.DateTimeField(null=True,blank=True)
    Radiology=models.BooleanField(default=False)
    RadiologyStatus= models.CharField(default='Pending',max_length=20)
    RadiologyDateTime = models.DateTimeField(null=True,blank=True)
    Billing=models.BooleanField(default=False)
    BillingStatus= models.CharField(default='Pending',max_length=20)
    BillingDateTime = models.DateTimeField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_DischargeRequest_Details'


class IP_DischargeCancel_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    Doctor_Id = models.ForeignKey(Doctor_ProfessForm_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    SisterIncharge = models.CharField(max_length=50,null=True,blank=True)
    Reason = models.TextField()
    Remarks = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

    class Meta:
        db_table = 'IP_DischargeCancel_Details'

        
class IP_Discharge_Checklist(models.Model):
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='DischargeChecklist_details_Registration_Id',null=True,blank=True,default=None)
    EEG = models.CharField(max_length=30)
    ECG = models.CharField(max_length=30)
    Xray = models.CharField(max_length=30)
    CT = models.CharField(max_length=30)
    MRI = models.CharField(max_length=30)
    USG = models.CharField(max_length=30)
    LabReport = models.CharField(max_length=30)
    MedicalInstrument = models.CharField(max_length=30)
    OPDFile = models.CharField(max_length=30)
    OtherReports = models.CharField(max_length=30)
    IPDBillCleared = models.CharField(max_length=30)
    DisChargeSummary = models.CharField(max_length=30)
    GatePass = models.CharField(max_length=30)
    ICRemarks = models.TextField()
    MedicineTray = models.CharField(max_length=30)
    WaterJug = models.CharField(max_length=30)
    Glass = models.CharField(max_length=30)
    GoodNight = models.CharField(max_length=30)
    Blanket = models.CharField(max_length=30)
    UrinePot = models.CharField(max_length=30)
    TVRemote = models.CharField(max_length=30)
    Others = models.CharField(max_length=30)
    MaterialRemarks = models.TextField()
    PatientSignature = models.BinaryField(null=True, blank=True)
    RelativeSignature = models.BinaryField(null=True, blank=True)
    RelativeName = models.CharField(max_length=30)
    SisterIncharge = models.CharField(max_length= 30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)

class IP_Discharge_Clearance(models.Model):
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='Discharge_Clearance_details_Registration_Id',null=True,blank=True,default=None)
    IDBandOff = models.CharField(max_length=30)
    IVCannulaOff = models.CharField(max_length=30)
    FoleysCathete = models.CharField(max_length=30)
    MedInstruction = models.CharField(max_length=30)
    WoundDressing = models.CharField(max_length=30)
    DischargeSummary = models.CharField(max_length=30)
    AttenderVisitiorPass = models.CharField(max_length=30)
    Exitpassgiven = models.CharField(max_length=30)
    Remarks = models.CharField(max_length=30)
    DischargeClearanceBy = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)


class IP_Physical_Discharge(models.Model):
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='Physical_Discharge_details_Registration_Id',null=True,blank=True,default=None)
    DrugReturned = models.CharField(max_length=30)
    Dischargechecklistdone = models.CharField(max_length=30)
    NursingClearanceDone = models.CharField(max_length=30)
    DiagnosticBillClearanceDone = models.CharField(max_length=30)
    IPDBillClearanceDone = models.CharField(max_length=30)
    SisterIncharge = models.CharField(max_length=30)
    Remarks = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30)



class IP_Billing_Entry(models.Model):
    BillingDataList_ID = models.ForeignKey(IP_Billing_QueueList_Detials,on_delete= models.CASCADE,null=True,blank=True,default=None)
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Billing_details_Registration_Id',null=True,blank=True,default=None)
    ServiceType = models.CharField(max_length=30, default='')
    Physician_Type = models.CharField(max_length=30,null=True,blank=True)
    Physician =  models.ForeignKey(Doctor_ProfessForm_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    Service = models.ForeignKey(Service_Master_Details, on_delete=models.CASCADE, related_name='IP_Billing_details_Service',null=True,blank=True,default=None)
    Procedure = models.ForeignKey(Procedure_Master_Details, on_delete=models.CASCADE,null=True,blank=True,default=None)
    ServiceStatus = models.CharField(max_length=30,default='Completed')
    Units = models.CharField(max_length=30,null=True,blank=True)
    DrugName = models.CharField(max_length=30,null=True,blank=True)
    DrugStatus = models.CharField(max_length=30,default='Pending')
    RadiologyTest = models.CharField(max_length=30,null=True,blank=True)
    RadiologySatus = models.CharField(max_length=30, default='Pending')
    LabTest = models.CharField(max_length=30,null=True,blank=True)
    LabTestStatus = models.CharField(max_length=30,default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30,default='')

class IP_Consultation(models.Model):
    Registration_Id = models.ForeignKey(Patient_IP_Registration_Detials, on_delete=models.CASCADE, related_name='IP_Consultation_details_Registration_Id',null=True,blank=True,default=None)
    ServiceType = models.CharField(max_length=30, default='Consultation')
    Physician_Type = models.CharField(max_length=30,null=True,blank=True)
    Physician =  models.ForeignKey(Doctor_ProfessForm_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    Units = models.CharField(max_length=30,null=True,blank=True)
    Status = models.CharField(max_length=30,default='UnPaid')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Created_by = models.CharField(max_length=30,default='')



