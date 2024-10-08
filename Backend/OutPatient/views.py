
from Frontoffice.models import *
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db.models import  Q
from django.http import JsonResponse
import base64
import magic

def get_file_image(filedata):
    mime = magic.Magic()
    contenttype = mime.from_buffer(filedata).split(',')[0]
    print('contenttype :',contenttype)
    contenttype1 = 'application/pdf'
    if contenttype == 'application/pdf':
        contenttype1 = 'application/pdf'
    elif contenttype == 'JPEG image data':
        contenttype1 = 'image/jpeg'
    elif contenttype == 'PNG image data':
        contenttype1 = 'image/png'
    
    
    return f"data:{contenttype1};base64,{base64.b64encode(filedata).decode('utf-8')}"

# Create your views here.
@csrf_exempt
@require_http_methods(["GET"])
def get_workbenchquelist_doctor(request):
    try:
        RegistrationId = request.GET.get('RegistrationId', '').strip()
        type = request.GET.get('Type', '').strip()

        if not RegistrationId :
            return JsonResponse({'error': 'PatientId and VisitId are required'}, status=400)
        
        if type == 'OP':
            # Query the appointment details
            try:
                patient_instance = Patient_Appointment_Registration_Detials.objects.get(pk = RegistrationId)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

        elif type == 'IP':
            try:
                patient_instance = Patient_IP_Registration_Detials.objects.get(pk = RegistrationId)
            except Patient_IP_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)
        
        elif type == 'Casuality':
            try:
                patient_instance = Patient_Casuality_Registration_Detials.objects.get(pk = RegistrationId)
            except Patient_Casuality_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

        else:
            return JsonResponse({'error': 'Invalid type'}, status=400)
       

        # Serialize the filtered queryset
        OPRegistration_dict = {
            
            'pk':patient_instance.pk,
            'PatientProfile':get_file_image(patient_instance.PatientId.Patient_profile),
            'RegistrationId': patient_instance.Registration_Id,
            'PatientId': patient_instance.PatientId.PatientId,
            'VisitId': patient_instance.VisitId,
            'PatientName': f'{patient_instance.PatientId.Title}.{patient_instance.PatientId.FirstName} {patient_instance.PatientId.MiddleName} {patient_instance.PatientId.SurName}',
            'PhoneNo': patient_instance.PatientId.PhoneNo,
            'Title': patient_instance.PatientId.Title,
            'FirstName': patient_instance.PatientId.FirstName,
            'MiddleName': patient_instance.PatientId.MiddleName,
            'SurName': patient_instance.PatientId.SurName,
            'Gender': patient_instance.PatientId.Gender,
            'AliasName': patient_instance.PatientId.AliasName,
            'DOB': patient_instance.PatientId.DOB,
            'Age': patient_instance.PatientId.Age,
            'Address': f'{patient_instance.PatientId.DoorNo}.{patient_instance.PatientId.Street}.{patient_instance.PatientId.Area}.{patient_instance.PatientId.City}.{patient_instance.PatientId.State}.{patient_instance.PatientId.Country}.{patient_instance.PatientId.Pincode}',
            'BloodGroup': patient_instance.PatientId.BloodGroup,
            # 'VisitPurpose': patient_instance.VisitPurpose if type == 'OP' else None,
            'Specialization': patient_instance.Specialization.Speciality_Id if patient_instance.Specialization else '',
            'DoctorName': patient_instance.PrimaryDoctor.Doctor_ID,
            'DoctorId': patient_instance.PrimaryDoctor.Doctor_ID,
            'CaseSheetNo': patient_instance.PatientId.CasesheetNo,
            'Complaint': patient_instance.Complaint,
            'PatientType': patient_instance.PatientType,
            'PatientCategory': patient_instance.PatientCategory,
            'IsMLC': patient_instance.IsMLC,
            'Flagging': patient_instance.Flagging,
            'CurrDate': patient_instance.PatientId.created_at.strftime('%d-%m-%y') if patient_instance.PatientId.created_at else "",
            'CurrTime': patient_instance.PatientId.created_at.strftime('%I:%M %p') if patient_instance.PatientId.created_at else "",
                    
        }



        return JsonResponse(OPRegistration_dict)
        
        

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
