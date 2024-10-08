from django.apps import AppConfig


class IpWorkbenchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Ip_Workbench'
    def ready(self):
        import Ip_Workbench.Signals
