from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import *
from django.db.models import Count,Q
from django.utils.timezone import now
from datetime import datetime, timedelta



@csrf_exempt
@require_http_methods(["POST", "GET"])
def Appointment_Request_List_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # appointment_id = data.get('appointment_id')
            # Extract and validate data
            appointment_id = data.get('AppointmentID')
            title = data.get('Title')
            first_name = data.get('FirstName')
            middle_name = data.get('MiddleName')
            last_name = data.get('LastName')
            phone_number = data.get('PhoneNumber')
            email = data.get('Email')
            request_date = data.get('RequestDate')
            appointment_type = data.get('AppointmentType')
            request_time = data.get('RequestTime')
            visit_purpose = data.get('VisitPurpose')
            specialization = data.get('Specialization')
            doctor_name = data.get('DoctorName')
            locationid = data.get('Location')
            createdBy = data.get('CreatedBy')
            cancelreason = data.get('CancelReason','')
            
            
            
            
            doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID = doctor_name )
            speciality_instance = Speciality_Detials.objects.get(Speciality_Id = specialization)
            location_instance = Location_Detials.objects.get(Location_Id = locationid)     
            
            if appointment_id:
                # Update existing appointment request
                appointment_instance = Appointment_Request_List.objects.get(pk=appointment_id)

                 # Set instance fields
                appointment_instance.title = title
                appointment_instance.first_name = first_name
                appointment_instance.middle_name = middle_name
                appointment_instance.last_name = last_name
                appointment_instance.phone_number = phone_number
                appointment_instance.email = email
                appointment_instance.request_date = request_date
                appointment_instance.appointment_type = appointment_type
                appointment_instance.request_time = request_time
                appointment_instance.visit_purpose = visit_purpose
                appointment_instance.specialization = speciality_instance
                appointment_instance.doctor_name = doctor_instance
                appointment_instance.status = 'PENDING'
                appointment_instance.Location = location_instance
                appointment_instance.updated_by = createdBy
                appointment_instance.cancelReason = cancelreason
            
                # Save the instance
                appointment_instance.save()
                
                return JsonResponse({'success': 'Appointment request details saved successfully'})

            else:
                # Create new appointment request
                appointment_instance = Appointment_Request_List(
                     # Set instance fields
                    title = title,
                    first_name = first_name,
                    middle_name = middle_name,
                    last_name = last_name,
                    phone_number = phone_number,
                    email = email,
                    request_date = request_date,
                    appointment_type = appointment_type,
                    request_time = request_time,
                    visit_purpose = visit_purpose,
                    specialization = speciality_instance,
                    doctor_name = doctor_instance,
                    status = 'PENDING',
                    Location = location_instance,
                    created_by = createdBy,
                    cancelReason = cancelreason,                 
                )
                
                appointment_instance.save()
                
                return JsonResponse({'success': 'Appointment request details saved successfully'})
        
            
               
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})
        
    elif request.method == 'GET':
        try:
            status = request.GET.get("Status")
            print('daaaaa',status)
            # Fetch all records from the Appointment_Request_List model
            appointment_requests = Appointment_Request_List.objects.filter(status = status)
            
            # Construct a list of dictionaries containing appointment request data
            appointment_request_data = []
            for appointment in appointment_requests:
                
                appointment_dict = {
                    'id': appointment.pk,
                    'Title': appointment.title,
                    'FirstName': appointment.first_name,
                    'MiddleName': appointment.middle_name,
                    'LastName': appointment.last_name,
                    'PhoneNumber': appointment.phone_number,
                    'Email': appointment.email,
                    'RequestDate': appointment.request_date,
                    'AppointmentType': appointment.appointment_type,
                    'RequestTime': appointment.request_time.strftime('%H:%M'),  # Convert time to string format
                    'VisitPurpose': appointment.visit_purpose,
                    'SpecializationName': appointment.specialization.Speciality_Name,
                    'SpecializationId': appointment.specialization.Speciality_Id,
                    'DoctorName': f"{appointment.doctor_name.Tittle}.{appointment.doctor_name.ShortName}",
                    'DoctorID': appointment.doctor_name.Doctor_ID,
                    'Status': appointment.status,
                }
                appointment_request_data.append(appointment_dict)

            return JsonResponse(appointment_request_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})

@csrf_exempt
@require_http_methods(["POST"])
def Appointment_Request_List_Delete_Links(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            appointment_id = data.get('AppointmentID')
            
            print("heloooooooo", data)

            print("Received Data:", data)
            num_deleted, _ = Appointment_Request_List.objects.filter(pk=appointment_id).delete()
                    
            return JsonResponse({'success': 'Apointment deleted successfully'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'})
    
    
def get_today_appointment_count(request):
    today = now().date()
    count = Appointment_Request_List.objects.filter(request_date=today).count()
    return JsonResponse({'count': count})


@csrf_exempt
def Appointment_Request_Cancel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            appointment_id = data.get('AppointmentID')
            cancelreason = data.get('CancelReason')      
            createdBy = data.get('CreatedBy')
            print('creaaaa',createdBy)
      
            if appointment_id and cancelreason:
                # Update existing appointment request
                appointment_instance = Appointment_Request_List.objects.get(pk=appointment_id)

                appointment_instance.status = 'CANCELLED'   
                appointment_instance.cancelReason =cancelreason         
                appointment_instance.updated_by = createdBy
                appointment_instance.save()
                
                return JsonResponse({'success': 'Appointment request details Cancelled successfully'})
                     
        except Exception as e:
            return JsonResponse({"error": str(e)})

# @csrf_exempt
# def Appointment_Reschedule_List(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             rescheduleId = data.get('ReScheduleId', '')
#             radioOption = data.get('RadioOption', '')
#             requestDate = data.get('RequestDate', '')
#             cancelReason = data.get('CancelReason', '')
#             specialization = data.get('Specialization', '')  # Default to an empty string
#             doctorName = data.get('DoctorName', '')  # Default to an empty string
#             locationid = data.get('Location', '')
            
#             print('hiii', data)

#             # Fetch location instance
#             location_instance = Location_Detials.objects.get(Location_Id=locationid)
                
#             # Fetch specialization instance if provided, otherwise set it to None
#             speciality_instance = None
#             if specialization not in [None, '', 'null', 'undefined']:
#                 speciality_instance = Speciality_Detials.objects.get(Speciality_Id=specialization)

#             # Fetch doctor instance if provided, otherwise set it to None
#             doctor_instance = None
#             if doctorName not in [None, '', 'null', 'undefined']:
#                 doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctorName)
#             requestdate_intance = None
#             if requestDate not in [None, '', 'null', 'undefined']:
#                 requestdate_intance = requestDate
        
#             # Create new reschedule instance
#             reschedule_instance = Appointment_ReSchedule_Request(
#                 rescheduleId=rescheduleId,
#                 RadioOption=radioOption,
#                 RequestDate=requestdate_intance,
#                 CancelReason=cancelReason,
#                 specialization=speciality_instance,  # specialization might be None
#                 doctor_name=doctor_instance,  # doctor_name might be None
#                 Location=location_instance,
#             )
#             reschedule_instance.save()

#             return JsonResponse({'success': 'Appointment reschedule request created successfully'})
        
#         except Exception as e:
#             return JsonResponse({"error": str(e)})


@csrf_exempt
def Appointment_Reschedule_List(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Get the ReScheduleId from the request
            appointmentId = data.get('AppointmentId', '')
            radioOption = data.get('RadioOption', '')
            requestDate = data.get('RequestDate', '')
            changingReason = data.get('ChangingReason', '')
            specialization = data.get('Specialization', '')  # Default to an empty string
            doctorName = data.get('DoctorName', '')  # Default to an empty string
            createdby = data.get('CreatedBy', '')
            
                     
            print('hiiiii',data)  
            appointment_instance = Appointment_Request_List.objects.get(pk = appointmentId) 
            # Fetch specialization instance if provided, otherwise set it to None
            speciality_instance = None
            if specialization not in [None, '', 'null', 'undefined']:
                speciality_instance = Speciality_Detials.objects.get(Speciality_Id=specialization)

            # Fetch doctor instance if provided, otherwise set it to None
            doctor_instance = None
            if doctorName not in [None, '', 'null', 'undefined']:
                doctor_instance = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctorName)
            
            # Use Appointment_Request_List data if fields in Appointment_ReSchedule_Request are None or empty
            reschedule_instance = Appointment_ReSchedule_Request(
                appointmentId = appointment_instance,
                RadioOption=radioOption,
                RequestDate=requestDate or appointment_instance.request_date,
                ChangingReason=changingReason ,
                specialization=speciality_instance or appointment_instance.specialization,
                doctor_name=doctor_instance or appointment_instance.doctor_name,
                created_by = createdby,
                updated_by = createdby
            )
            reschedule_instance.save()

            return JsonResponse({'success': 'Appointment reschedule request created successfully'})

        except Appointment_Request_List.DoesNotExist:
            return JsonResponse({"error": "Appointment request not found"})

        except Exception as e:
            return JsonResponse({"error": str(e)})



@csrf_exempt
def get_all_appointments(request):
    if request.method == 'GET':
        try:
            # Get the status from the query parameters
            status_filter = request.GET.get('Status', None)
            
            # Fetch all unique appointment IDs from Appointment_Request_List with optional status filter
            if status_filter:
                appointment_ids = Appointment_Request_List.objects.filter(status=status_filter).values_list('appointment_id', flat=True).distinct()
            else:
                appointment_ids = Appointment_Request_List.objects.values_list('appointment_id', flat=True).distinct()

            # Fetch the latest reschedule request for each appointment ID
            latest_reschedule_requests = (
                Appointment_ReSchedule_Request.objects
                .filter(appointmentId__in=appointment_ids)
                .values('appointmentId')
                .annotate(latest_id=Max('id'))
                .values('appointmentId', 'latest_id')
            )
            
            # Create a dictionary to store the latest reschedule requests
            latest_reschedule_dict = {
                item['appointmentId']: item['latest_id']
                for item in latest_reschedule_requests
            }
            
            # Fetch all latest reschedule requests
            latest_reschedule_requests = (
                Appointment_ReSchedule_Request.objects
                .filter(id__in=latest_reschedule_dict.values())
            )
            
            # Create a dictionary for fast lookup of latest reschedule requests
            latest_reschedule_lookup = {
                req.appointmentId.appointment_id: req
                for req in latest_reschedule_requests
            }
            
            # Prepare the response data
            response_data = []
            
            for appointment in Appointment_Request_List.objects.filter(appointment_id__in=appointment_ids):
                reschedule_instance = latest_reschedule_lookup.get(appointment.appointment_id, None)
                
                appointment_data = {
                    'id': appointment.appointment_id,
                    'Title': appointment.title,
                    'FirstName': appointment.first_name,
                    'MiddleName': appointment.middle_name,
                    'LastName': appointment.last_name,
                    'PhoneNumber': appointment.phone_number,
                    'Email': appointment.email,
                    'RequestDate': appointment.request_date,
                    'AppointmentType': appointment.appointment_type,
                    'RequestTime': appointment.request_time,
                    'VisitPurpose': appointment.visit_purpose,
                    'SpecializationName': appointment.specialization.Speciality_Name if appointment.specialization else '',
                    'SpecializationId': appointment.specialization.Speciality_Id if appointment.specialization else '',
                    'DoctorName': appointment.doctor_name.ShortName if appointment.doctor_name else '',
                    'DoctorID': appointment.doctor_name.Doctor_ID if appointment.doctor_name else '',
                    'location': appointment.Location.Location_Name if appointment.Location else '',
                    'created_by': appointment.created_by,
                    'cancelReason': appointment.cancelReason,
                    'Status': appointment.status,
                    'ReScheduled' : 'No',
                }

                # If there's a latest reschedule request, override relevant fields
                if reschedule_instance:
                    appointment_data.update({
                        'RadioOption': reschedule_instance.RadioOption,
                        'RequestDate': reschedule_instance.RequestDate,
                        'ChangingReason': reschedule_instance.ChangingReason,
                        'SpecializationName': reschedule_instance.specialization.Speciality_Name if reschedule_instance.specialization else '',
                        'DoctorID': reschedule_instance.doctor_name.Doctor_ID if appointment.doctor_name else '',
                        'DoctorName': reschedule_instance.doctor_name.ShortName if reschedule_instance.doctor_name else '',
                        'ReScheduled' : "Yes",
                        'created_by': reschedule_instance.created_by,
                        'updated_by': reschedule_instance.created_by,
                    })
                
                response_data.append(appointment_data)

            return JsonResponse(response_data, safe=False)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


 
@csrf_exempt
def calender_modal_display_data_by_day(request):
    if request.method == 'GET':
        try:
            doctor_id = request.GET.get('DoctorId')
            location_id = request.GET.get('LocationId')
            date = request.GET.get('Date')  # Expected in 'YYYY-MM-DD' format
            
            print("Doctorrrrrr",location_id, date)
            if not doctor_id:
                return JsonResponse({'error': 'DoctorId parameter is missing'}, status=400)
            if not date:
                return JsonResponse({'error': 'Date parameter is missing'}, status=400)
            
            # Fetch doctor details
            doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor_id)
            
            # Parse the date and get the day of the week
            date_obj = datetime.strptime(date, '%Y-%m-%d')
            day_of_week = date_obj.strftime('%A')

            # Fetch schedules based on the doctor_id, location_id, and day of the week
            doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor_id, Day=day_of_week)
            
            if location_id:
                doctor_schedule = doctor_schedule.filter(Location__Location_Id=location_id)
            
            # Check if there's an entry in Doctor_Calender_Modal_Edit for this date
            edit_entry = Doctor_Calender_Modal_Edit.objects.filter(Doctor_ID=doctor_id, Date=date_obj.strftime('%Y-%m-%d'), Location__Location_Id = location_id).last()
            
            schedule_list = []
            if edit_entry:
                # If an entry exists in Doctor_Calender_Modal_Edit, override the schedule details
                if edit_entry.RadioOption == 'Leave':
                    work_status = 'no'
                else:
                    work_status = 'yes'
                
                schedule_list.append({
                    'locationId': edit_entry.Location.Location_Id if edit_entry.Location else "",
                    'days': day_of_week,
                    'shift': edit_entry.Shift,
                    'starting_time': edit_entry.Starting_Time,
                    'ending_time': edit_entry.End_Time,
                    'starting_time_f': edit_entry.Starting_Time_F,
                    'ending_time_f': edit_entry.End_Time_F,
                    'starting_time_a': edit_entry.Starting_Time_A,
                    'ending_time_a': edit_entry.End_Time_A,
                    'working_hours_f': edit_entry.Working_Hours_F,
                    'working_hours_a': edit_entry.Working_Hours_A,
                    'working_hours_s': edit_entry.Working_Hours_S,
                    'total_working_hours': edit_entry.Total_Working_Hours,
                    'total_working_hours_s': edit_entry.Total_Working_Hours_S,
                    'leave_remarks': edit_entry.LeaveRemarks,
                    'working': work_status,
                    'changed': "yes",
                })
            else:
                # If no edit entry exists, use the original schedule data
                for schedule in doctor_schedule:
                    schedule_list.append({
                        'locationId': schedule.Location.Location_Id if schedule.Location else "",
                        'locationName': schedule.LocationName,
                        'days': schedule.Day,
                        'shift': schedule.Shift,
                        'starting_time': schedule.Starting_Time,
                        'ending_time': schedule.End_Time,
                        'starting_time_f': schedule.Starting_Time_F,
                        'ending_time_f': schedule.End_Time_F,
                        'starting_time_a': schedule.Starting_Time_A,
                        'ending_time_a': schedule.End_Time_A,
                        'working_hours_f': schedule.Working_Hours_F,
                        'working_hours_a': schedule.Working_Hours_A,
                        'working_hours_s': schedule.Working_Hours_S,
                        'total_working_hours': schedule.Total_Working_Hours,
                        'total_working_hours_s': schedule.Total_Working_Hours_S,
                        'working': schedule.IsWorking,  
                        'changed' : 'no',
                    })
            
            doctor_details = {
                'schedule': schedule_list,
                'created_at': doctor_personal.created_at,
            }
            return JsonResponse(doctor_details, safe=False)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def get_available_doctor_by_speciality(request):
    if request.method == 'GET':
        try:
            location_id = request.GET.get('LocationId')
            date = request.GET.get('Date')  # Expected in 'YYYY-MM-DD' format
            speciality_id = request.GET.get('Speciality')  # Filter by Speciality

            if not speciality_id:
                return JsonResponse({'error': 'Speciality parameter is missing'}, status=400)
            if not date:
                return JsonResponse({'error': 'Date parameter is missing'}, status=400)

            try:
                speciality = Speciality_Detials.objects.get(pk=speciality_id)
            except Speciality_Detials.DoesNotExist:
                return JsonResponse({'error': 'Speciality not found'}, status=404)

            # Fetch all doctors under the selected Speciality
            doctors = Doctor_ProfessForm_Detials.objects.filter(Specialization=speciality)

            # Parse the date and get the day of the week
            date_obj = datetime.strptime(date, '%Y-%m-%d')
            day_of_week = date_obj.strftime('%A')

            doctor_data = []
            for doctor in doctors:
                try:
                    # Fetch doctor personal details
                    doctor_personal = Doctor_Personal_Form_Detials.objects.get(Doctor_ID=doctor.Doctor_ID.Doctor_ID)
                except Doctor_Personal_Form_Detials.DoesNotExist:
                    continue  # Skip if doctor personal details not found

                # Fetch schedules based on doctor_id, location_id, and day of the week
                doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor.Doctor_ID, Day=day_of_week)

                # Filter schedules by location if location_id is provided
                if location_id:
                    doctor_schedule = doctor_schedule.filter(Location__Location_Id=location_id)

                # Check if there's an entry in Doctor_Calender_Modal_Edit for this date
                edit_entry = Doctor_Calender_Modal_Edit.objects.filter(
                    Doctor_ID=doctor_personal.Doctor_ID,
                    Date=date_obj.strftime('%Y-%m-%d'),
                    Location__Location_Id=location_id
                ).last()

                schedule_list = []
                is_working = False  # Default to False

                # If an edit entry exists, use it to determine if the doctor is working
                if edit_entry:
                    if edit_entry.RadioOption == 'Leave':
                        work_status = 'no'
                    else:
                        work_status = 'yes'
                        is_working = True  # Doctor is marked as working in the edit entry

                    schedule_list.append({
                        'locationId': edit_entry.Location.Location_Id if edit_entry.Location else "",
                        'days': day_of_week,
                        'shift': edit_entry.Shift,
                        'starting_time': edit_entry.Starting_Time,
                        'ending_time': edit_entry.End_Time,
                        'starting_time_f': edit_entry.Starting_Time_F,
                        'ending_time_f': edit_entry.End_Time_F,
                        'starting_time_a': edit_entry.Starting_Time_A,
                        'ending_time_a': edit_entry.End_Time_A,
                        'working_hours_f': edit_entry.Working_Hours_F,
                        'working_hours_a': edit_entry.Working_Hours_A,
                        'working_hours_s': edit_entry.Working_Hours_S,
                        'total_working_hours': edit_entry.Total_Working_Hours,
                        'total_working_hours_s': edit_entry.Total_Working_Hours_S,
                        'leave_remarks': edit_entry.LeaveRemarks,
                        'working': work_status,
                        'changed': "yes",
                    })

                # If no edit entry exists, use the original schedule data
                else:
                    for schedule in doctor_schedule:
                        if schedule.IsWorking:  # Check if the doctor is marked as working in the original schedule
                            is_working = True  # Doctor is working based on the original schedule
                            schedule_list.append({
                                'locationId': schedule.Location.Location_Id if schedule.Location else "",
                                'locationName': schedule.LocationName,
                                'days': schedule.Day,
                                'shift': schedule.Shift,
                                'starting_time': schedule.Starting_Time,
                                'ending_time': schedule.End_Time,
                                'starting_time_f': schedule.Starting_Time_F,
                                'ending_time_f': schedule.End_Time_F,
                                'starting_time_a': schedule.Starting_Time_A,
                                'ending_time_a': schedule.End_Time_A,
                                'working_hours_f': schedule.Working_Hours_F,
                                'working_hours_a': schedule.Working_Hours_A,
                                'working_hours_s': schedule.Working_Hours_S,
                                'total_working_hours': schedule.Total_Working_Hours,
                                'total_working_hours_s': schedule.Total_Working_Hours_S,
                                'working': schedule.IsWorking,  
                                'changed': 'no',
                            })

                # Only add doctor data if the doctor is working on that day
                if is_working:
                    doctor_data.append({
                        'doctor_id': doctor_personal.Doctor_ID,
                        'doctor_name': f'{doctor_personal.Tittle}.{doctor_personal.ShortName}',
                        'schedule': schedule_list,
                        'created_at': doctor_personal.created_at,
                    })

            return JsonResponse(doctor_data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def doctor_available_calender_by_day(request):
    if request.method == 'GET':
        try:
            location_id = request.GET.get('LocationId')
            month = request.GET.get('month')  # e.g., '08' for August
            year = request.GET.get('year')    # e.g., '2024'
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            # Validate month and year
            try:
                month = int(month)
                year = int(year)
                if month < 1 or month > 12:
                    raise ValueError("Month must be between 1 and 12")
            except ValueError as e:
                return JsonResponse({'error': str(e)}, status=400)
            
            # Get the first and last day of the selected month
            first_day = datetime(year, month, 1)
            last_day = (first_day + timedelta(days=31)).replace(day=1) - timedelta(days=1)

            # Generate a list of all days in the month
            all_days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]

            all_doctor_data = []

            doctors = Doctor_Personal_Form_Detials.objects.all()

            for doctor in doctors:
                doctor_id = doctor.Doctor_ID
                
                # Get doctor schedules
                doctor_schedule = Doctor_Schedule_Details.objects.filter(Doctor_ID=doctor_id)
                
                if location_id:
                    doctor_schedule = doctor_schedule.filter(Location__Location_Id=location_id)
                
                # Get data from Doctor_Calender_Modal_Edit table
                doctor_calendar_edit = Doctor_Calender_Modal_Edit.objects.filter(Doctor_ID=doctor_id)

                # Fetch the doctor's specialization
                doctor_prof_details = Doctor_ProfessForm_Detials.objects.filter(Doctor_ID=doctor_id).first()
                specialization_name = doctor_prof_details.Specialization.Speciality_Name if doctor_prof_details and doctor_prof_details.Specialization else 'N/A'
                
                # Create a dictionary to map weekdays to schedules
                schedule_dict = {}
                for schedule in doctor_schedule:
                    weekday = schedule.Day
                    if weekday not in schedule_dict:
                        schedule_dict[weekday] = []
                    
                    schedule_dict[weekday].append({
                        'locationId': schedule.Location.Location_Id if schedule.Location else "",
                        'locationName': schedule.LocationName,
                        'working': schedule.IsWorking,
                        'shift': schedule.Shift,
                        'starting_time': schedule.Starting_Time,
                        'ending_time': schedule.End_Time,
                        'starting_time_f': schedule.Starting_Time_F,
                        'ending_time_f': schedule.End_Time_F,
                        'starting_time_a': schedule.Starting_Time_A,
                        'ending_time_a': schedule.End_Time_A,
                        'working_hours_f': schedule.Working_Hours_F,
                        'working_hours_a': schedule.Working_Hours_A,
                        'working_hours_s': schedule.Working_Hours_S,
                        'total_working_hours': schedule.Total_Working_Hours,
                        'total_working_hours_s': schedule.Total_Working_Hours_S,
                        'changed': "no",
                    })
                
                # Fetch data from Doctor_Calender_Modal_Edit for each day
                calendar_data = []
                for day in all_days:
                    day_str = day.strftime('%Y-%m-%d')  # Convert to string
                    day_of_week = day.strftime('%A')  # Get the day of the week
                    schedules = schedule_dict.get(day_of_week, [])

                    # Check if there's an entry in Doctor_Calender_Modal_Edit for this day
                    edit_entry = doctor_calendar_edit.filter(Date=day_str, Location__Location_Id=location_id).last()
                    if edit_entry:
                        # If an entry exists in the modal edit table, use it to override the schedule
                        if edit_entry.RadioOption == 'Leave':
                            work_status = 'no'
                        else:
                            work_status = 'yes'
                        
                        schedules = [{
                            'locationId': edit_entry.Location.Location_Id if edit_entry.Location else "",
                            'locationName': schedule.LocationName,
                            'working': work_status,
                            'shift': edit_entry.Shift,
                            'starting_time': edit_entry.Starting_Time,
                            'ending_time': edit_entry.End_Time,
                            'starting_time_f': edit_entry.Starting_Time_F,
                            'ending_time_f': edit_entry.End_Time_F,
                            'starting_time_a': edit_entry.Starting_Time_A,
                            'ending_time_a': edit_entry.End_Time_A,
                            'working_hours_f': edit_entry.Working_Hours_F,
                            'working_hours_a': edit_entry.Working_Hours_A,
                            'working_hours_s': edit_entry.Working_Hours_S,
                            'total_working_hours': edit_entry.Total_Working_Hours,
                            'total_working_hours_s': edit_entry.Total_Working_Hours_S,
                            'leave_remarks' : edit_entry.LeaveRemarks,
                            'changed': "yes",
                        }]
                    
                    # Append the data for this day
                    calendar_data.append({
                        'date': day_str,
                        'day_of_week': day_of_week,
                        'schedules': schedules,
                    })

                # Compile the final details for this doctor
                doctor_details = {
                    'doctor_id': doctor_id,
                    'doctor_name': f'{doctor.Tittle}.{doctor.ShortName}',
                    'doctor_specialization': specialization_name,
                    'schedule': calendar_data,
                    'created_at': doctor.created_at,
                }
                all_doctor_data.append(doctor_details)

            return JsonResponse(all_doctor_data, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def daily_appointment_counts_all_doctors(request):
    if request.method == 'GET':
        try:
            location_id = request.GET.get('LocationId')
            month = request.GET.get('month')  # e.g., '08' for August
            year = request.GET.get('year')    # e.g., '2024'
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            # Validate month and year
            try:
                month = int(month)
                year = int(year)
                if month < 1 or month > 12:
                    raise ValueError("Month must be between 1 and 12")
            except ValueError as e:
                return JsonResponse({'error': str(e)}, status=400)
            
            # Get the first and last day of the selected month
            first_day = datetime(year, month, 1)
            last_day = (first_day + timedelta(days=31)).replace(day=1) - timedelta(days=1)

            # Generate a list of all days in the month
            all_days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]

            # Initialize the dictionary to accumulate appointment counts
            daily_appointment_counts_all_doctors = {day.strftime('%Y-%m-%d'): 0 for day in all_days}

            # Fetch all doctors
            doctors = Doctor_Personal_Form_Detials.objects.all()

            for doctor in doctors:
                doctor_id = doctor.Doctor_ID

                # Fetch appointment count for each day for this doctor
                appointments = Appointment_Request_List.objects.filter(
                    doctor_name=doctor,
                    request_date__range=[first_day, last_day]
                ).values('request_date').annotate(appointment_count=Count('appointment_id'))

                appointment_count_dict = {appt['request_date'].strftime('%Y-%m-%d'): appt['appointment_count'] for appt in appointments}

                # Update the cumulative appointment counts for all doctors
                for day_str, count in appointment_count_dict.items():
                    daily_appointment_counts_all_doctors[day_str] += count
                
                

            return JsonResponse(daily_appointment_counts_all_doctors, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def daily_appointment_counts_per_doctor(request):
    if request.method == 'GET':
        try:
            location_id = request.GET.get('LocationId')
            month = request.GET.get('month')  # e.g., '08' for August
            year = request.GET.get('year')    # e.g., '2024'
            
            if not month or not year:
                return JsonResponse({'error': 'Month and year parameters are required'}, status=400)
            
            # Validate month and year
            try:
                month = int(month)
                year = int(year)
                if month < 1 or month > 12:
                    raise ValueError("Month must be between 1 and 12")
            except ValueError as e:
                return JsonResponse({'error': str(e)}, status=400)
            
            # Get the first and last day of the selected month
            first_day = datetime(year, month, 1)
            last_day = (first_day + timedelta(days=31)).replace(day=1) - timedelta(days=1)

            # Generate a list of all days in the month
            all_days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]

            # Initialize the result dictionary
            daily_appointment_counts_per_doctor = []
            doctors = Doctor_Personal_Form_Detials.objects.all()

            for doctor in doctors:
                doctor_id = doctor.Doctor_ID
                
                # Initialize the count dictionary for this doctor
                daily_appointment_counts = {day.strftime('%Y-%m-%d'): 0 for day in all_days}

                # Fetch appointment count for each day for this doctor
                appointments = Appointment_Request_List.objects.filter(
                    doctor_name=doctor,
                    request_date__range=[first_day, last_day]
                ).values('request_date').annotate(appointment_count=Count('appointment_id'))

                appointment_count_dict = {appt['request_date'].strftime('%Y-%m-%d'): appt['appointment_count'] for appt in appointments}

                # Update the daily appointment counts for this doctor
                for day_str, count in appointment_count_dict.items():
                    daily_appointment_counts[day_str] = count

                # Fetch doctor specialization
                doctor_prof_details = Doctor_ProfessForm_Detials.objects.filter(Doctor_ID=doctor_id).first()
                specialization_name = doctor_prof_details.Specialization.Speciality_Name if doctor_prof_details and doctor_prof_details.Specialization else 'N/A'

                # Compile the details for this doctor
                doctor_details = {
                    'doctor_id': doctor_id,
                    'doctor_name': f'{doctor.Tittle}.{doctor.ShortName}',
                    'doctor_specialization': specialization_name,
                    'daily_appointment_counts': daily_appointment_counts
                }
                daily_appointment_counts_per_doctor.append(doctor_details)

            return JsonResponse(daily_appointment_counts_per_doctor, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
