# Generated by Django 5.0.6 on 2024-10-07 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Frontoffice', '0005_alter_ip_billing_table_detials_register_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ip_billing_items_table_detials',
            name='Service_Code',
        ),
    ]
