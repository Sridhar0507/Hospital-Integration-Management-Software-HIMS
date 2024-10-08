from django.apps import AppConfig


class OutpatientConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'OutPatient'
    def ready(self):
        import OutPatient.Signal
        print("OutPatient signals module imported successfully.")
    
    
