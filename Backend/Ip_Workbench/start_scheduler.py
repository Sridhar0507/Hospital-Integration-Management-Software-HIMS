from django.core.management.base import BaseCommand
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, time
from django.utils import timezone
from .models import IP_Intake_Details, IP_Output_Details, IP_Balance_Details, Patient_IP_Registration_Detials
import threading

# Functions for calculating input/output
def calculate_total_input(patient, start_time):
    try:
        print(f"Calculating total input for patient {patient.pk}")
        intake_records = IP_Intake_Details.objects.filter(
            Registration_Id=patient,
            created_at__gte=start_time
        )
        total_input = sum(float(record.Measurement) for record in intake_records if record.Measurement.replace('.', '', 1).isdigit())
        print(f"Total input for patient {patient.pk}: {total_input}")
        return total_input
    except Exception as e:
        print(f"Error calculating total input for patient {patient.pk}: {e}")
        return 0

def calculate_total_output(patient, start_time):
    try:
        print(f"Calculating total output for patient {patient.pk}")
        output_records = IP_Output_Details.objects.filter(
            Registration_Id=patient,
            created_at__gte=start_time
        )
        total_output = sum(float(record.Measurement) for record in output_records if record.Measurement.replace('.', '', 1).isdigit())
        print(f"Total output for patient {patient.pk}: {total_output}")
        return total_output
    except Exception as e:
        print(f"Error calculating total output for patient {patient.pk}: {e}")
        return 0

def determine_balance_type(balance):
    return 'Positive' if balance >= 0 else 'Negative'

# Main job function to save balance details
def save_balance_details():
    now = datetime.now()
    one_day_ago = now - timedelta(days=1)

    print('Starting to save balance details')
    try:
        patients = Patient_IP_Registration_Detials.objects.all()
        print(f"Found {patients.count()} patients")
        for patient in patients:
            print(f"Processing patient {patient.pk}")
            totalInputDay = calculate_total_input(patient, one_day_ago)
            totalOutputDay = calculate_total_output(patient, one_day_ago)
            balance = totalInputDay - totalOutputDay
            balanceType = determine_balance_type(balance)
            
            # Create and save balance instance
            Balance_instance = IP_Balance_Details(
                Registration_Id=patient,
                totalInputDay=totalInputDay,
                totalOutputDay=totalOutputDay,
                balance=balance,
                balanceType=balanceType,
                Created_by='system',
            )
            Balance_instance.save()
            print(f"Saved balance for patient {patient.pk}: {balance}, Type: {balanceType}")
        
        print('Balance details saved successfully')

        # Stop the scheduler once the task is completed
        print("Stopping the scheduler after job completion...")
        # scheduler.shutdown(wait=False)
    
    except Exception as e:
        print(f"Error saving balance details: {e}")

def start_scheduler():
    global scheduler
    scheduler = BackgroundScheduler()

    now = datetime.now()
    next_run_time = datetime.combine(now, time(0, 0))

    if next_run_time < now:
        next_run_time += timedelta(days=1)

    scheduler.add_job(save_balance_details, 'date', run_date=next_run_time)
    print(f'Scheduled job to save balance details at {next_run_time}')

    scheduler.start()
    print('Scheduler started successfully')

# Django management command
# class Command(BaseCommand):
#     help = 'Starts the scheduler for saving balance details at a specific time'

#     def handle(self, *args, **kwargs):
#         # Start the scheduler in a separate thread to allow the server to keep running
#         scheduler_thread = threading.Thread(target=start_scheduler)
#         scheduler_thread.start()

#         # Notify that the scheduler has started
#         self.stdout.write(self.style.SUCCESS('Scheduler started successfully'))

#         # Keep the main thread alive until the scheduler finishes
#         scheduler_thread.join()  # This will keep the command running until the thread completes
#         self.stdout.write(self.style.SUCCESS('Scheduler completed and stopped'))



# class Command(BaseCommand):
#     help = 'Starts the scheduler for saving balance details'

#     def handle(self, *args, **kwargs):
#         # Start the scheduler in a separate thread
#         scheduler_thread = threading.Thread(target=start_scheduler)
#         scheduler_thread.daemon = True
#         scheduler_thread.start()

#         # Notify that the scheduler has started
#         self.stdout.write(self.style.SUCCESS('Scheduler started successfully'))
       





# def start_scheduler():
#     scheduler = BackgroundScheduler()

#     cron_trigger = CronTrigger(hour='12', minute='18')

#     # Add job to the scheduler
#     scheduler.add_job(IP_Balance_Details_Link, cron_trigger,id='balance_job')
#     print('Scheduled job to save balance details daily at 12:18')

#     # Start the scheduler
#     scheduler.start()
#     print('Scheduler started successfully')

#     # Keep the script running to allow scheduler to keep working
#     try:
#         while True:
#             time.sleep(60)  # Sleep to prevent CPU spinning
#     except (KeyboardInterrupt, SystemExit):
#         scheduler.shutdown()
#         print('Scheduler stopped')

# class Command(BaseCommand):
#     help = 'Starts the scheduler for saving balance details'

#     def handle(self, *args, **kwargs):
#         start_scheduler()
#         self.stdout.write(self.style.SUCCESS('Scheduler started successfully'))









# def start_scheduler():
#     scheduler = BackgroundScheduler()

#     cron_trigger = CronTrigger(hour='12', minute='32')

#     # Add job to the scheduler
#     scheduler.add_job(IP_Balance_Details_Link, cron_trigger)
#     print('Scheduled job to save balance details daily at 11:30')

#     # Start the scheduler
#     scheduler.start()
#     print('Scheduler started successfully')

#     # Keep the script running to allow scheduler to keep working
#     try:
#         while True:
#             time.sleep(60)  # Sleep to prevent CPU spinning
#     except (KeyboardInterrupt, SystemExit):
#         scheduler.shutdown()
#         print('Scheduler stopped')

# class Command(BaseCommand):
#     help = 'Starts the scheduler for saving balance details'

#     def handle(self, *args, **kwargs):
#         start_scheduler()
#         self.stdout.write(self.style.SUCCESS('Scheduler started successfully'))













