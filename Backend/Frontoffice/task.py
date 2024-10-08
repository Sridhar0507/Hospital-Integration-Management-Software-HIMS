# tasks.py
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
from .models import Room_Master_Detials
from datetime import datetime,timedelta

def update_booking_status(room_id):
    try:
        print('status changed')
        room_master_ins = Room_Master_Detials.objects.get(pk=room_id)
        if room_master_ins.Booking_Status=='Maintenance':
            room_master_ins.Booking_Status = 'Available'
            room_master_ins.save()
    except Room_Master_Detials.DoesNotExist:
        pass

def schedule_status_update(room_id,dur):
    print('----appsheduler')
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        update_booking_status,
        DateTrigger(run_date=datetime.now() + timedelta(minutes=dur)),
        args=[room_id],
        id=f'update_status_{room_id}',
        replace_existing=True
    )
    scheduler.start()

# def alert_page():
#     print('hii hello')

# def schedule_status_update1(timee):
#     print('----appsheduler')
#     scheduler = BackgroundScheduler()
#     scheduler.add_job(
#         alert_page,
#         DateTrigger(run_date=datetime.now() + timedelta(minutes=timee)),
#         args=[timee],
#         id=f'alert_time_{timee}',
#         replace_existing=True
#     )
#     scheduler.start()

# schedule_status_update1(2)