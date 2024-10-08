from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_PastHistory_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Extract and validate data
            illnessordiseases = data.get('illnessordiseases', '')
            illnessordiseasesText = data.get('illnessordiseasesText', '')
            surgerybefore = data.get('surgerybefore', '')
            surgerybeforeText = data.get('surgerybeforeText', '')
            pressureorheartdiseases = data.get('pressureorheartdiseases', '')
            pressureorheartdiseasesText = data.get('pressureorheartdiseasesText', '')
            stomachacidityproblem = data.get('stomachacidityproblem', '')
            stomachacidityproblemText = data.get('stomachacidityproblemText', '')
            allergicmedicine = data.get('allergicmedicine', '')
            allergicmedicineText = data.get('allergicmedicineText', '')
            drinkalcohol = data.get('drinkalcohol', '')
            drinkalcoholText = data.get('drinkalcoholText', '')
            smoke = data.get('smoke', '')
            smokeText = data.get('smokeText', '')
            diabetesorAsthmadisease = data.get('diabetesorAsthmadisease', '')
            diabetesorAsthmadiseaseText = data.get('diabetesorAsthmadiseaseText', '')
            localanesthesiabefore = data.get('localanesthesiabefore', '')
            localanesthesiabeforeText = data.get('localanesthesiabeforeText', '')
            healthproblems = data.get('healthproblems', '')
            healthproblemsText = data.get('healthproblemsText', '')
            regularbasis = data.get('regularbasis', '')
            regularbasisText = data.get('regularbasisText', '')
            allergicfood = data.get('allergicfood', '')
            allergicfoodText = data.get('allergicfoodText', '')
            operativeinstuctions = data.get('operativeinstuctions', '')
            operativeinstuctionsText = data.get('operativeinstuctionsText', '')
            other = data.get('Other', '')
            
            registration_id = data.get('RegistrationId', '')
            created_by = data.get('created_by', '')
            
            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            past_history_instance = Workbench_PastHistory(
                Registration_Id=registration_ins,
                Illnessordiseases=illnessordiseases,
                IllnessordiseasesText=illnessordiseasesText,
                Surgerybefore=surgerybefore,
                SurgerybeforeText=surgerybeforeText,
                Pressureorheartdiseases=pressureorheartdiseases,
                PressureorheartdiseasesText=pressureorheartdiseasesText,
                Stomachacidityproblem=stomachacidityproblem,
                StomachacidityproblemText=stomachacidityproblemText,
                Allergicmedicine=allergicmedicine,
                AllergicmedicineText=allergicmedicineText,
                Drinkalcohol=drinkalcohol,
                DrinkalcoholText=drinkalcoholText,
                Smoke=smoke,
                SmokeText=smokeText,
                DiabetesorAsthmadisease=diabetesorAsthmadisease,
                DiabetesorAsthmadiseaseText=diabetesorAsthmadiseaseText,
                Localanesthesiabefore=localanesthesiabefore,
                LocalanesthesiabeforeText=localanesthesiabeforeText,
                Healthproblems=healthproblems,
                HealthproblemsText=healthproblemsText,
                Regularbasis=regularbasis,
                RegularbasisText=regularbasisText,
                Allergicfood=allergicfood,
                AllergicfoodText=allergicfoodText,
                Operativeinstuctions=operativeinstuctions,
                OperativeinstuctionsText=operativeinstuctionsText,
                Other=other,
                created_by=created_by
            )
            past_history_instance.save()
            return JsonResponse({'success': 'PastHistory details added successfully'})
       
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
            
    elif request.method == 'GET':
        try:
            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)
            
            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            patient_history_datas = Workbench_PastHistory.objects.filter(Registration_Id=registration_ins)

            data = []
            for past_history in patient_history_datas:
                data.append({
                    'id': past_history.Id,
                    'RegistrationId': past_history.Registration_Id.pk,
                    'VisitId': past_history.Registration_Id.VisitId,
                    'PrimaryDoctorId': past_history.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': past_history.Registration_Id.PrimaryDoctor.ShortName,
                    'illnessordiseases': past_history.Illnessordiseases,
                    'illnessordiseasesText': past_history.IllnessordiseasesText,
                    'surgerybefore': past_history.Surgerybefore,
                    'surgerybeforeText': past_history.SurgerybeforeText,
                    'pressureorheartdiseases': past_history.Pressureorheartdiseases,
                    'pressureorheartdiseasesText': past_history.PressureorheartdiseasesText,
                    'stomachacidityproblem': past_history.Stomachacidityproblem,
                    'stomachacidityproblemText': past_history.StomachacidityproblemText,
                    'allergicmedicine': past_history.Allergicmedicine,
                    'allergicmedicineText': past_history.AllergicmedicineText,
                    'drinkalcohol': past_history.Drinkalcohol,
                    'drinkalcoholText': past_history.DrinkalcoholText,
                    'smoke': past_history.Smoke,
                    'smokeText': past_history.SmokeText,
                    'diabetesorAsthmadisease': past_history.DiabetesorAsthmadisease,
                    'diabetesorAsthmadiseaseText': past_history.DiabetesorAsthmadiseaseText,
                    'localanesthesiabefore': past_history.Localanesthesiabefore,
                    'localanesthesiabeforeText': past_history.LocalanesthesiabeforeText,
                    'healthproblems': past_history.Healthproblems,
                    'healthproblemsText': past_history.HealthproblemsText,
                    'regularbasis': past_history.Regularbasis,
                    'regularbasisText': past_history.RegularbasisText,
                    'allergicfood': past_history.Allergicfood,
                    'allergicfoodText': past_history.AllergicfoodText,
                    'operativeinstuctions': past_history.Operativeinstuctions,
                    'operativeinstuctionsText': past_history.OperativeinstuctionsText,
                    'other': past_history.Other,
                    'created_by': past_history.created_by,
                    'Date': past_history.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time': past_history.created_at.strftime('%H:%M:%S'),  # Format time
                })

            return JsonResponse(data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'},status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
    


