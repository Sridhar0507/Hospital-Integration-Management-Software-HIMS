from django.apps import AppConfig


class FrontofficeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Frontoffice'
    def ready(self):
        import Frontoffice.Signals
