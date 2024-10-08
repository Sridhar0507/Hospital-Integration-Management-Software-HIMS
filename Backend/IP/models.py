from django.db import models

from django.db.models import Max
from datetime import datetime
from Masters.models import *





class Assesment_Details(models.Model):
    Assesment_Id = models.AutoField(primary_key=True)
    Patient_Id = models.IntegerField()
    Booking_Id = models.CharField(max_length=100)
    Patient_Name = models.CharField(max_length=50)
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
    
    Location = models.CharField(max_length=100)
    CreatedBy = models.CharField(max_length=50)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        db_table = "Assesment_Details"
    
    def __str__(self):
        return f"{self.Patient_Name} - {self.Booking_Id}"
    

    
    
    def save(self, *args, **kwargs):
        if not self.Assesment_Id:  # Check if accountsetting_id is not set
            max_id = Assesment_Details.objects.aggregate(max_id=Max('Assesment_Id'))['max_id']
            self.Assesment_Id = (max_id or 0) + 1
        super(Assesment_Details, self).save(*args, **kwargs)
    



class Mlc_Details(models.Model):
    Mlc_Id = models.CharField(primary_key=True,max_length=20)
    Patient_Id = models.CharField(max_length=20)
    Booking_Id = models.CharField(max_length=20)
    Patient_Name = models.CharField(max_length=50)
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
    Location = models.CharField(max_length=50)
    CreatedBy = models.CharField(max_length=20)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    Hospital = models.ForeignKey(Hospital_Detials, on_delete=models.CASCADE, null=True, blank=True)  # Example of using HospitalDetails model

    class Meta:
        db_table = "Mlc_Details"
    
    def __str__(self):
        return f"{self.Patient_Name} - {self.Booking_Id}"

   
    def save(self, *args, **kwargs):
        if not self.Mlc_Id:  # Generate Mlc_Id if not set
            # Get the hospital name (clinic_name)
            hospital_details = Hospital_Detials.objects.first()
            if hospital_details:
                clinic_name = hospital_details.Hospital_Name[:3].upper()
            else:
                raise ValueError("Hospital details are not available.")

            # Fetch the current date
            current_date = datetime.now()
            current_year = str(current_date.year)[-2:]
            current_month = str(current_date.month).zfill(2)
            current_day = str(current_date.day).zfill(2)

            # Fetch the maximum Mlc_Id
            max_mlc_id_row = Mlc_Details.objects.aggregate(max_id=Max('Mlc_Id'))['max_id']
            max_mlc_id = max_mlc_id_row if max_mlc_id_row else None

            # Extract the date portion from the max_mlc_id
            max_mlc_date = str(max_mlc_id)[6:12] if max_mlc_id else None

            # Check if the current date is different from the date portion of max_mlc_id
            if max_mlc_date != f"{current_year}{current_month}{current_day}":
                numeric_part = 1  # Reset the numerical part to '00001'
            else:
                # Calculate the numerical part
                numeric_part = int(str(max_mlc_id)[12:]) + 1 if max_mlc_id else 1

            # Construct the next Mlc_Id
            self.Mlc_Id = f'{clinic_name}MLC{current_year}{current_month}{current_day}{numeric_part:03}'

        super(Mlc_Details, self).save(*args, **kwargs)





class Ward_PreOpChecklist_Details(models.Model):
    PreOp_Id = models.AutoField(primary_key=True)
    Patient_Id = models.IntegerField()
    Booking_Id = models.CharField(max_length=100)
    Patient_Name = models.CharField(max_length=50)
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
    VoidedAmount = models.CharField(max_length=20)
    VoidedAmountRemarks = models.CharField(max_length=200)
    VoidedTime = models.CharField(max_length=20)
    VoidedTimeRemarks = models.CharField(max_length=200)
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
    PulseRate = models.CharField(max_length=20)
    PulseRateRemarks = models.CharField(max_length=200)
    RespRate = models.CharField(max_length=20)
    RespRateRemarks = models.CharField(max_length=200)
    IdentificationWristlet = models.CharField(max_length=20)
    IdentificationWristletRemarks = models.CharField(max_length=200)
    SpecialDrug = models.CharField(max_length=200)
    DutySisterName = models.CharField(max_length=200)
    Location = models.CharField(max_length=100)
    CreatedBy = models.CharField(max_length=50)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        db_table = "Ward_PreOpChecklist_Details"
    

    

    
    def save(self, *args, **kwargs):
        if not self.PreOp_Id:  # Check if accountsetting_id is not set
            max_id = Ward_PreOpChecklist_Details.objects.aggregate(max_id=Max('PreOp_Id'))['max_id']
            self.PreOp_Id = (max_id or 0) + 1
        super(Ward_PreOpChecklist_Details, self).save(*args, **kwargs)
    





class OT_PreOpChecklist_Details(models.Model):
    PreOp_Id = models.AutoField(primary_key=True)
    Patient_Id = models.IntegerField()
    Booking_Id = models.CharField(max_length=100)
    Patient_Name = models.CharField(max_length=50)
    Date = models.CharField(max_length=20)
    Time = models.CharField(max_length=20)
    NbmStatus = models.CharField(max_length=20)
    NbmStatusRemarks = models.CharField(max_length=200)
    PulseBp = models.CharField(max_length=20)
    PulseBpRemarks = models.CharField(max_length=200)
    PreoperativeInj = models.CharField(max_length=20)
    PreoperativeInjRemarks = models.CharField(max_length=200)
    CheckVeinflowIv = models.CharField(max_length=20)
    CheckVeinflowIvRemarks = models.CharField(max_length=200)
    InvestigationReport = models.CharField(max_length=20)
    InvestigationReportCheckbox = models.CharField(max_length=200)
    InvestigationReportRemarks = models.CharField(max_length=200)
    PatientConsent = models.CharField(max_length=20)
    PatientConsentRemarks = models.CharField(max_length=200)
    JewellryConsentActualStatus = models.CharField(max_length=20)
    JewellryConsentActualStatusRemarks = models.CharField(max_length=200)
    DentureRemoval = models.CharField(max_length=20)
    DentureRemovalRemarks = models.CharField(max_length=200)
    NailPaint = models.CharField(max_length=20)
    NailPaintRemarks = models.CharField(max_length=200)
    SugarLevel = models.CharField(max_length=20)
    SugarLevelRemarks = models.CharField(max_length=200)
    PatientAllergy = models.CharField(max_length=20)
    PatientAllergyRemarks = models.CharField(max_length=200)
    PatientShave = models.CharField(max_length=20)
    PatientShaveRemarks = models.CharField(max_length=200)
    PatientCatheter = models.CharField(max_length=20)
    PatientCatheterRemarks = models.CharField(max_length=200)
    BpTablet = models.CharField(max_length=20)
    BpTabletRemarks = models.CharField(max_length=200)
    SurgicalSide = models.CharField(max_length=20)
    SurgicalSideRemarks = models.CharField(max_length=200)
    XrayCt = models.CharField(max_length=20)
    XrayCtRemarks = models.CharField(max_length=200)
    TabMisoprost = models.CharField(max_length=20)
    TabMisoprostRemarks = models.CharField(max_length=200)
    Hrct = models.CharField(max_length=20)
    HrctRemarks = models.CharField(max_length=200)
    DutySisterName = models.CharField(max_length=50)
    OtTechName = models.CharField(max_length=50)
    Location = models.CharField(max_length=100)
    CreatedBy = models.CharField(max_length=50)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        db_table = "OT_PreOpChecklist_Details"
    

    

    
    def save(self, *args, **kwargs):
        if not self.PreOp_Id:  # Check if accountsetting_id is not set
            max_id = OT_PreOpChecklist_Details.objects.aggregate(max_id=Max('PreOp_Id'))['max_id']
            self.PreOp_Id = (max_id or 0) + 1
        super(OT_PreOpChecklist_Details, self).save(*args, **kwargs)
    






class OT_PreOpInstructions_Details(models.Model):
    PreOp_Id = models.AutoField(primary_key=True)
    Patient_Id = models.IntegerField()
    Booking_Id = models.CharField(max_length=100)
    Patient_Name = models.CharField(max_length=50)
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
    Location = models.CharField(max_length=100)
    CreatedBy = models.CharField(max_length=50)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        db_table = "OT_PreOpInstructions_Details"
    

    

    
    def save(self, *args, **kwargs):
        if not self.PreOp_Id:  # Check if accountsetting_id is not set
            max_id = OT_PreOpInstructions_Details.objects.aggregate(max_id=Max('PreOp_Id'))['max_id']
            self.PreOp_Id = (max_id or 0) + 1
        super(OT_PreOpInstructions_Details, self).save(*args, **kwargs)
    



class Dama_Details(models.Model):
    Dama_Id = models.CharField(primary_key=True,max_length=20)
    Patient_Id = models.CharField(max_length=20)
    Booking_Id = models.CharField(max_length=20)
    Patient_Name = models.CharField(max_length=50)
   
    BroughtDead = models.CharField(max_length=20)
    BroughtDeadDate = models.CharField(max_length=20)
    BroughtDeadTime = models.CharField(max_length=20)
   
    HigherCenter = models.CharField(max_length=20)
    HigherCenterDate = models.CharField(max_length=20)
    HigherCenterTime = models.CharField(max_length=20)
   
    NonAvailabilityOfConsultant = models.CharField(max_length=20)
    NonAvailabilityOfConsultantDate = models.CharField(max_length=20)
    NonAvailabilityOfConsultantTime = models.CharField(max_length=20)
   
    NonAvailabilityOfIcuBed = models.CharField(max_length=20)
    NonAvailabilityOfIcuBedDate = models.CharField(max_length=20)
    NonAvailabilityOfIcuBedTime = models.CharField(max_length=20)
    
    ToxicPatientsOrRelatives = models.CharField(max_length=20)
    ToxicPatientsOrRelativesDate = models.CharField(max_length=20)
    ToxicPatientsOrRelativesTime = models.CharField(max_length=20)
    
    DrunkPatients = models.CharField(max_length=20)
    DrunkPatientsDate = models.CharField(max_length=20)
    DrunkPatientsTime = models.CharField(max_length=20)
   
    RelativesNotAvailable = models.CharField(max_length=20)
    RelativesNotAvailableDate = models.CharField(max_length=20)
    RelativesNotAvailableTime = models.CharField(max_length=20)
   
    TransferredtoCOVIDcentre = models.CharField(max_length=20)
    TransferredtoCOVIDcentreDate = models.CharField(max_length=20)
    TransferredtoCOVIDcentreTime = models.CharField(max_length=20)
   
    Absconded = models.CharField(max_length=20)
    AbscondedDate = models.CharField(max_length=20)
    AbscondedTime = models.CharField(max_length=20)
   
    DamaNonAffordable = models.CharField(max_length=20)
    DamaNonAffordableDate = models.CharField(max_length=20)
    DamaNonAffordableTime = models.CharField(max_length=20)
   
    DamaRelativesNotWish = models.CharField(max_length=20)
    DamaRelativesNotWishDate = models.CharField(max_length=20)
    DamaRelativesNotWishTime = models.CharField(max_length=20)
   
    DamaInsuranceOrCashless = models.CharField(max_length=20)
    DamaInsuranceOrCashlessDate = models.CharField(max_length=20)
    DamaInsuranceOrCashlessTime = models.CharField(max_length=20)
   
    OtherReasons = models.CharField(max_length=200)
    Location = models.CharField(max_length=50)
    CreatedBy = models.CharField(max_length=20)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    Hospital = models.ForeignKey(Hospital_Detials, on_delete=models.CASCADE, null=True, blank=True)  # Example of using HospitalDetails model

    class Meta:
        db_table = "Dama_Details"
    
    def save(self, *args, **kwargs):
            if not self.Dama_Id:  # Check if accountsetting_id is not set
                max_id = Dama_Details.objects.aggregate(max_id=Max('Dama_Id'))['max_id']
                self.Dama_Id = (max_id or 0) + 1
            super(Dama_Details, self).save(*args, **kwargs)
    



