from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
from Masters.models import *
from Frontoffice.models import *
from .models import *

@receiver(post_save, sender=ReferalDoctorDetails)
def create_appointment_with_refer_doctor(sender, instance, created, **kwargs):
    if created:
        try:
            patient = Patient_Detials.objects.get(PatientId=instance.PatientId)
            primary_doctor = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=instance.PrimaryDoctorId)
            refer_doctor = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=instance.ReferDoctorId)
            specialization = Doctor_ProfessForm_Detials.objects.get(Doctor_ID=refer_doctor.Doctor_ID).Specialization

            # Assuming there is a way to get the latest Patient_Casuality_Registration_Detials for the patient
            casuality_details = Patient_Appointment_Registration_Detials.objects.filter(PatientId=patient).last()
            
            Patient_Appointment_Registration_Detials.objects.create(
                PatientId=patient,
                VisitId=instance.VisitId,
                VisitPurpose=casuality_details.VisitPurpose,
                PrimaryDoctor=refer_doctor,
                Specialization=specialization,
                Complaint=instance.Remarks,
                PatientType=casuality_details.PatientType,
                PatientCategory=casuality_details.PatientCategory,
                InsuranceName=casuality_details.InsuranceName,
                InsuranceType=casuality_details.InsuranceType,
                ClientName=casuality_details.ClientName,
                ClientType=casuality_details.ClientType,
                ClientEmployeeId=casuality_details.ClientEmployeeId,
                ClientEmployeeDesignation=casuality_details.ClientEmployeeDesignation,
                ClientEmployeeRelation=casuality_details.ClientEmployeeRelation,
                EmployeeId=casuality_details.EmployeeId,
                EmployeeRelation=casuality_details.EmployeeRelation,
                DoctorId=casuality_details.DoctorId,
                DoctorRelation=casuality_details.DoctorRelation,
                DonationType=casuality_details.DonationType,
                IsMLC=casuality_details.IsMLC,
                Flagging=casuality_details.Flagging,
                IsReferral=casuality_details.IsReferral,
                Status='Registered',
                created_by=instance.created_by,
                Reason=casuality_details.Reason,
            )
        except ObjectDoesNotExist as e:
            print(f"Error: {e}")


