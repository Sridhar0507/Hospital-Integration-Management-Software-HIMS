from django.db import models
from django.db.models import Max
from django.contrib.postgres.fields import ArrayField  
from django.core.files.base import ContentFile

from Frontoffice.models import *



class Workbench_Gynecology(models.Model):
    Id = models.IntegerField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    OH = models.TextField()
    MH = models.TextField()
    EXAMI = models.TextField()
    PS = models.TextField()
    PV = models.TextField()
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_Gynecology'

    
    
    def save(self, *args, **kwargs):
        if not self.Id:  # Check if accountsetting_id is not set
            max_id = Workbench_Gynecology.objects.aggregate(max_id=Max('Id'))['max_id']
            self.Id = (max_id or 0) + 1
        super(Workbench_Gynecology, self).save(*args,**kwargs)




class Workbench_Neurology(models.Model):
    Id = models.IntegerField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    # PatientId = models.CharField(max_length=30)
    # PatientName = models.CharField(max_length=30)
    History = models.TextField()
    PastInvestigations = models.TextField()
    Examination = models.TextField()
    GeneralExam = models.TextField()
    Vision = models.TextField()
    Fundus = models.TextField()
    Fields = models.TextField()
    EOM = models.TextField()
    Pupils = models.TextField()
    Nerves = models.TextField()
    LowerCranialNerves = models.TextField()
    SensoryExam = models.TextField()
    InvoluntaryMovements = models.TextField()
    FN = models.TextField()
    Dysdiadoko = models.TextField()
    Tandem = models.TextField()
    Gait = models.TextField()
    Power = models.TextField()
    Neck = models.TextField()

    # ShoulderR = models.CharField(max_length=30)
    ShoulderRF = models.CharField(max_length=30,blank=True,null=True)
    ShoulderRE = models.CharField(max_length=30,blank=True,null=True)
    ShoulderRAbd = models.CharField(max_length=30,blank=True,null=True)
    ShoulderRAdd = models.CharField(max_length=30,blank=True,null=True)
    
    # HipR = models.CharField(max_length=30)
    HipRF = models.CharField(max_length=30,blank=True,null=True)
    HipRE = models.CharField(max_length=30,blank=True,null=True)
    HipRAbd = models.CharField(max_length=30,blank=True,null=True)
    HipRAdd = models.CharField(max_length=30,blank=True,null=True)
   
    # ElbowR = models.CharField(max_length=30)
    ElbowRF = models.CharField(max_length=30,blank=True,null=True)
    ElbowRE = models.CharField(max_length=30,blank=True,null=True)

    # KneeR = models.CharField(max_length=30)
    KneeRF = models.CharField(max_length=30,blank=True,null=True)
    KneeRE = models.CharField(max_length=30,blank=True,null=True)

    # WristR = models.CharField(max_length=30)
    WristRF = models.CharField(max_length=30,blank=True,null=True)
    WristRE = models.CharField(max_length=30,blank=True,null=True)

    # HandR = models.CharField(max_length=30)
    HandRI = models.CharField(max_length=30,blank=True,null=True)
    HandRE = models.CharField(max_length=30,blank=True,null=True)

    # AnkleR = models.CharField(max_length=30)
    AnkleRDF = models.CharField(max_length=30,blank=True,null=True)
    AnkleRPF = models.CharField(max_length=30,blank=True,null=True)
    AnkleRI = models.CharField(max_length=30,blank=True,null=True)
    AnkleRE = models.CharField(max_length=30,blank=True,null=True)

    
    # ShoulderL = models.CharField(max_length=30)
    ShoulderLF = models.CharField(max_length=30,blank=True,null=True)
    ShoulderLE = models.CharField(max_length=30,blank=True,null=True)
    ShoulderLAbd = models.CharField(max_length=30,blank=True,null=True)
    ShoulderLAdd = models.CharField(max_length=30,blank=True,null=True)
    
    
    # HipL = models.CharField(max_length=30)
    HipLF = models.CharField(max_length=30,blank=True,null=True)
    HipLE = models.CharField(max_length=30,blank=True,null=True)
    HipLAbd = models.CharField(max_length=30,blank=True,null=True)
    HipLAdd = models.CharField(max_length=30,blank=True,null=True)
   
    # ElbowL = models.CharField(max_length=30)
    ElbowLF = models.CharField(max_length=30,blank=True,null=True)
    ElbowLE = models.CharField(max_length=30,blank=True,null=True)

    # KneeL = models.CharField(max_length=30)
    KneeLF = models.CharField(max_length=30,blank=True,null=True)
    KneeLE = models.CharField(max_length=30,blank=True,null=True)

    # WristL = models.CharField(max_length=30)
    WristLF = models.CharField(max_length=30,blank=True,null=True)
    WristLE = models.CharField(max_length=30,blank=True,null=True)

    # HandL = models.CharField(max_length=30)
    HandLI = models.CharField(max_length=30,blank=True,null=True)
    HandLE = models.CharField(max_length=30,blank=True,null=True)

    # AnkleL = models.CharField(max_length=30)
    AnkleLDF = models.CharField(max_length=30,blank=True,null=True)
    AnkleLPF = models.CharField(max_length=30,blank=True,null=True)
    AnkleLI = models.CharField(max_length=30,blank=True,null=True)
    AnkleLE = models.CharField(max_length=30,blank=True,null=True)

    RB1 = models.CharField(max_length=30)
    RT1 = models.CharField(max_length=30)
    RS1 = models.CharField(max_length=30)
    RK1 = models.CharField(max_length=30)
    RA1 = models.CharField(max_length=30)
    RPlantars1 = models.CharField(max_length=30)
    RAbdominals1 = models.CharField(max_length=30)
    RAbdominals2 = models.CharField(max_length=30)
    RCr1 = models.CharField(max_length=30)
    LB1 = models.CharField(max_length=30)
    LT1 = models.CharField(max_length=30)
    LS1 = models.CharField(max_length=30)
    LK1 = models.CharField(max_length=30)
    LA1 = models.CharField(max_length=30)
    LPlantars1 = models.CharField(max_length=30)
    LAbdominals1 = models.CharField(max_length=30)
    LAbdominals2 = models.CharField(max_length=30)
    LCr1 = models.CharField(max_length=30)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_Neurology'

    
    
    def save(self, *args, **kwargs):
        if not self.Id:  # Check if accountsetting_id is not set
            max_id = Workbench_Neurology.objects.aggregate(max_id=Max('Id'))['max_id']
            self.Id = (max_id or 0) + 1
        super(Workbench_Neurology, self).save(*args,**kwargs)



class Workbench_OP_Sheet(models.Model):
    Id = models.IntegerField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    PresentComplaints = models.TextField()
    PastHistory = models.TextField()
    Allergies = models.TextField()
    Diagnosis = models.TextField()
    Treatment = models.TextField()
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_OP_Sheet'

    
    
    def save(self, *args, **kwargs):
        if not self.Id:  # Check if accountsetting_id is not set
            max_id = Workbench_OP_Sheet.objects.aggregate(max_id=Max('Id'))['max_id']
            self.Id = (max_id or 0) + 1
        super(Workbench_OP_Sheet, self).save(*args,**kwargs)




class Workbench_IFCard(models.Model):
    Id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    HusbandName = models.CharField(max_length=30)
    Husbandage = models.CharField(max_length=30)
    BloodGroupHusband = models.CharField(max_length=30)
    DurationRelation = models.CharField(max_length=30)
    PhoneNumber = models.CharField(max_length=30)
    Address = models.TextField()
    AttemptingPregnancy = models.TextField()
    MenstrualHistory = models.TextField()
    NoOfDays = models.CharField(max_length=30)
    Dysmenorrhea = models.CharField(max_length=30)
    MCB = models.CharField(max_length=30)
    LMPs = models.JSONField(default=list)  # Use JSONField for lists of dates
    SexualHistory = models.TextField()
    DurationIC = models.CharField(max_length=50)
    VisitAboard = models.CharField(max_length=50)
    MedicalHistory = models.TextField()
    ObstlHistory = models.TextField()
    SurgicalHistory = models.TextField()
    AddDate = models.CharField(max_length=500)
    AddImpression = models.TextField()
    USGDate = models.CharField(max_length=500)
    USGImpression = models.TextField()
    Hb = models.CharField(max_length=30)
    TLC = models.CharField(max_length=30)
    BSL = models.CharField(max_length=30)
    Prolactin = models.CharField(max_length=30)
    FSH = models.CharField(max_length=30)
    E2 = models.CharField(max_length=30)
    HIV = models.CharField(max_length=30)
    Urine = models.CharField(max_length=30)
    AMH = models.CharField(max_length=30)
    TSH = models.CharField(max_length=30)
    LH = models.CharField(max_length=30)
    T3 = models.CharField(max_length=30)
    T4 = models.CharField(max_length=30)
    HCG = models.CharField(max_length=30)
    rows = models.JSONField(default=list)  # Use JSONField for rows
    drainsData3 = models.JSONField(default=list)  # Use JSONField for drainsData3
    selectedRows = models.JSONField(default=list)  # Use JSONField for selectedRows
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_IFCard'



class Workbench_ANC_Card(models.Model):
    Id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    HusbandName = models.CharField(max_length=30)  
    MenstrualLMP = models.CharField(max_length=30)
    MenstrualEDD = models.CharField(max_length=30)
    CorrectedbyUSG = models.CharField(max_length=30) #-----part-1
    # DrainsData1 = models.JSONField(default=list)  # Use JSONField for drainsData3
    HighRiskFactors = models.CharField(max_length=500,blank=True,null=True)  # Use JSONField for drainsData3
    SurgicalHistory = models.TextField() 
    Family_History = models.CharField(max_length=500,blank=True,null=True) #-----part-2
    Allergies = models.TextField()
    BloodGroupHusband = models.CharField(max_length=30) #-----part-3
    # DrainsData2 = models.JSONField(default=list)  #-----part-4
    # CheckboxState = models.JSONField(default=dict)  #-----part-5
    BSL = models.BooleanField(default=False)
    HIV = models.BooleanField(default=False)
    Urea = models.BooleanField(default=False)
    BTCT = models.BooleanField(default=False)
    OGCT = models.BooleanField(default=False)
    VDRL = models.BooleanField(default=False)
    AuAg = models.BooleanField(default=False)
    Creatrine = models.BooleanField(default=False)
    WBC = models.BooleanField(default=False)
    anyotherinves = models.BooleanField(default=False)

    BSLText = models.TextField()
    HIVText = models.TextField()
    UreaText = models.TextField()
    BTCTText = models.TextField()
    OGCTText = models.TextField()
    VDRLText = models.TextField()
    AuAgText = models.TextField()
    CreatrineText = models.TextField()
    WBCText = models.TextField()
    AnyotherinvesText = models.TextField() #-----part-6
    CVS_Text = models.TextField()
    RS_Text = models.TextField()
    Breast_Text = models.TextField()#-----part-7
    # RadioBtns = models.JSONField(default=dict) #-----part-8
    TT1Text = models.TextField()
    TT2Text = models.TextField()
    TT3Text = models.TextField()
    Betnesol_Text = models.TextField()
    FolicAcidText = models.TextField()
    CalciumText = models.TextField()
    FTNDLSCSText = models.TextField()
    FTNDTLText = models.TextField()
    PostDeliveryText = models.TextField()#-----part-9
    TT1 = models.CharField(max_length=30,blank=True,null=True) #radiobtn
    TT2 = models.CharField(max_length=30,blank=True,null=True)
    TT3 = models.CharField(max_length=30,blank=True,null=True)
    Betnesol = models.CharField(max_length=30,blank=True,null=True)
    FolicAcid = models.CharField(max_length=30,blank=True,null=True)
    Calcium = models.CharField(max_length=30,blank=True,null=True)
    FTNDLSCS = models.CharField(max_length=30,blank=True,null=True)
    FTNDTL = models.CharField(max_length=30,blank=True,null=True)
    PostDelivery = models.CharField(max_length=30,blank=True,null=True)#-----radiobtn-9
    ObstHistory = models.CharField(max_length=50,blank=True,null=True)#-----part-9
    DeliveryResult = models.TextField()#-----part-9
    AncCardNo = models.CharField(max_length=30,null=True,blank=True)
    MctsNo = models.CharField(max_length=30,null=True,blank=True)
    DeliveryDate = models.CharField(max_length=30,null=True,blank=True)
    # DrainsData3 = models.JSONField(default=list) #-----part-10
    # Rows = models.JSONField(default=list) #-----part-11
    selectedRows = models.JSONField(default=list)  # Use JSONField for selectedRows
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_ANC_Card'


class Workbench_ANC_Table1(models.Model):
    # T1Id = models.AutoField(primary_key=True)
    AncId = models.ForeignKey(Workbench_ANC_Card, on_delete=models.CASCADE, related_name='Table1_id')
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='Table1_RegId')
    AgeSex = models.CharField(max_length=100, blank=True, null=True)
    Type = models.CharField(max_length=100, blank=True, null=True)
    Immunized = models.CharField(max_length=100, blank=True, null=True)
    Problems = models.CharField(max_length=100, blank=True, null=True)
    
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_ANC_Table1'


class Workbench_ANC_Table2(models.Model):
    # T2Id = models.AutoField(primary_key=True)
    AncId = models.ForeignKey(Workbench_ANC_Card, on_delete=models.CASCADE, related_name='Table2_id')
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='Table2_RegId')
    Date1 = models.CharField(max_length=30,blank=True, null=True)
    Hb = models.CharField(max_length=100, blank=True, null=True)
    Urine = models.CharField(max_length=100, blank=True, null=True)
    
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_ANC_Table2'


class Workbench_ANC_Table3(models.Model):
    # T3Id = models.AutoField(primary_key=True)
    AncId = models.ForeignKey(Workbench_ANC_Card, on_delete=models.CASCADE, related_name='Table3_id')
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='Table3_RegId')
    DateforDelivery = models.CharField(max_length=30,blank=True, null=True)
    WeightDelivery = models.CharField(max_length=30,null=True, blank=True)
    BPDelivery = models.CharField(max_length=30,null=True, blank=True)
    ComplaintsDelivery = models.CharField(max_length=100, blank=True, null=True)
    AmenorrheaDelivery = models.CharField(max_length=30,blank=True, null=True)
    PallorDelivery = models.CharField(max_length=100, blank=True, null=True)
    PresentationDelivery = models.CharField(max_length=100, blank=True, null=True)
    PVAnyOtherDelivery = models.CharField(max_length=100, blank=True, null=True)
    AdviceDelivery = models.CharField(max_length=100, blank=True, null=True)
    
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_ANC_Table3'


class Workbench_ANC_Table4(models.Model):
    # T4Id = models.AutoField(primary_key=True)
    AncId = models.ForeignKey(Workbench_ANC_Card, on_delete=models.CASCADE, related_name='Table4_id')
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='Table4_RegId')
    Date2 = models.CharField(max_length=30,blank=True, null=True)
    Amenorrhea = models.CharField(max_length=100, blank=True, null=True)
    Presentation = models.CharField(max_length=100, blank=True, null=True)
    BpdGs = models.CharField(max_length=100, blank=True, null=True)
    HC = models.CharField(max_length=100, blank=True, null=True)
    AC = models.CharField(max_length=100, blank=True, null=True)
    FlCrl = models.CharField(max_length=100, blank=True, null=True)
    GestationalAge = models.CharField(max_length=100, blank=True, null=True)
    Liquor = models.CharField(max_length=100, blank=True, null=True)
    Placenta = models.CharField(max_length=100, blank=True, null=True)
    Anomalies = models.CharField(max_length=100, blank=True, null=True)
    FoetalWeight = models.CharField(max_length=100, blank=True, null=True)
    CervicalLength = models.CharField(max_length=100, blank=True, null=True)
    Remark = models.CharField(max_length=100, blank=True, null=True)
    
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_ANC_Table4'

 

class Workbench_GeneralEvaluation(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    CheifComplaint = models.TextField()
    History = models.TextField()
    Examine = models.TextField()
    Diagnosis = models.TextField()
    ChooseDocument = models.BinaryField(blank=True,null=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_GeneralEvaluation'

class Workbench_Prescription(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    Doctor_Id = models.ForeignKey(Doctor_Personal_Form_Detials, on_delete=models.CASCADE,null=True,blank=True,default=None)
    GenericName = models.CharField(max_length=100,null=True,blank=True)
    ItemName = models.CharField(max_length=100,null=True,blank=True)
    Itemtype = models.CharField(max_length=100,null=True,blank=True)
    Dose = models.CharField(max_length=100,null=True,blank=True)
    Route = models.CharField(max_length=100,null=True,blank=True)
    Frequency = models.CharField(max_length=100,null=True,blank=True)
    DurationNumber = models.IntegerField()
    DurationUnit = models.CharField(max_length=100,null=True,blank=True)
    Qty = models.CharField(max_length=100,null=True,blank=True)
    Instruction = models.TextField()
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_Prescription'

   




class Workbench_PastHistory(models.Model):
    Id = models.AutoField(primary_key=True)
    Registration_Id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE)
    Illnessordiseases = models.CharField(max_length=10,blank=True,null=True)
    IllnessordiseasesText = models.TextField()
    Surgerybefore = models.CharField(max_length=10,blank=True,null=True)
    SurgerybeforeText = models.TextField()
    Pressureorheartdiseases = models.CharField(max_length=10,blank=True,null=True)
    PressureorheartdiseasesText = models.TextField()
    Stomachacidityproblem = models.CharField(max_length=10,blank=True,null=True)
    StomachacidityproblemText = models.TextField()
    Allergicmedicine = models.CharField(max_length=10,blank=True,null=True)
    AllergicmedicineText = models.TextField()
    Drinkalcohol = models.CharField(max_length=10,blank=True,null=True)
    DrinkalcoholText = models.TextField()
    Smoke = models.CharField(max_length=10,blank=True,null=True)
    SmokeText = models.TextField()
    DiabetesorAsthmadisease = models.CharField(max_length=10,blank=True,null=True)
    DiabetesorAsthmadiseaseText = models.TextField()
    Localanesthesiabefore = models.CharField(max_length=10,blank=True,null=True)
    LocalanesthesiabeforeText = models.TextField()
    Healthproblems = models.CharField(max_length=10,blank=True,null=True)
    HealthproblemsText = models.TextField()
    Regularbasis = models.CharField(max_length=10,blank=True,null=True)
    RegularbasisText = models.TextField()
    Allergicfood = models.CharField(max_length=10,blank=True,null=True)
    AllergicfoodText = models.TextField()
    Operativeinstuctions = models.CharField(max_length=10,blank=True,null=True)
    OperativeinstuctionsText = models.TextField()
    Other = models.TextField()    
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Workbench_PastHistory'




# class Op_to_Ip_Convertion_Table(models.Model):
#     id = models.AutoField(primary_key=True)
#     Patient_Id = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='frontoffice_op_to_ip_convertion')
#     Registration_id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='frontoffice_op_to_ip_registration')
#     created_by = models.CharField(max_length=30)
#     Reason = models.CharField(max_length=400)
#     IpNotes = models.CharField(max_length=400)
#     Status = models.CharField(max_length=40, default=None)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'Op_to_Ip_Convertion_Table'





# class Op_to_Ip_Convertion_Table(models.Model):
#     id = models.AutoField(primary_key=True)
#     Patient_Id = models.ForeignKey(Patient_Detials, on_delete=models.CASCADE, related_name='workbench_op_to_ip_convertion')
#     Registration_id = models.ForeignKey(Patient_Appointment_Registration_Detials, on_delete=models.CASCADE, related_name='workbench_op_to_ip_registration')
#     created_by = models.CharField(max_length=30)
#     Reason = models.CharField(max_length=400)
#     IpNotes = models.CharField(max_length=400)
#     Status = models.CharField(max_length=40, default=None)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     class Meta:
#         db_table = 'Op_to_Ip_Convertion_Table'













