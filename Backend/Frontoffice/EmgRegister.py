

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Emergency_Registration_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            PatientName = data.get('PatientName')
            PatientPhNo = data.get('PhoneNumber')
            Speciality = data.get('Specialty')
            PrimaryDoctor = data.get('PrimaryDoctor')
            RefferalDoctor = data.get('ReferalDoctor')
            created_by = data.get('created_by', '')

            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=PrimaryDoctor)
            Speciality_instance = Speciality_Detials.objects.get(Speciality_Id =Speciality)  
            Department_instance = EmergencyRegister(
                PatientName=PatientName,
                PatientPhone=PatientPhNo,
                Speciality=Speciality_instance,
                PrimaryDoctor=doctor_personal,
                ReferalDoctor=RefferalDoctor,
                created_by=created_by
            )
            Department_instance.save()
            return JsonResponse({'success': 'Emergency Register added successfully'})
       
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
            
   
    elif request.method == 'GET':
        try:
            # Fetch all records from the Location_Detials model
            EmgRegister = EmergencyRegister.objects.all()
            
            # Construct a list of dictionaries containing location data
            Register_data = [
                {
                    'id': Register.EmergencyRegister_Id,
                    'PatientName': Register.PatientName,
                    'PatientPhone': Register.PatientPhone,
                    'Speciality': Register.Speciality.Speciality_Name,
                    'PrimaryDoctor': Register.PrimaryDoctor.ShortName,
                    'ReferalDoctor': Register.ReferalDoctor,
                    'created_by': Register.created_by,
                    'Date' : Register.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time' : Register.created_at.strftime('%H:%M:%S') , # Format time
                } for Register in EmgRegister
            ]

            return JsonResponse(Register_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


