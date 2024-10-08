# Generated by Django 5.0.6 on 2024-09-30 18:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Masters', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lenin_Catg_Master_Details',
            fields=[
                ('catgId', models.IntegerField(primary_key=True, serialize=False)),
                ('LeninCategory', models.CharField(max_length=30)),
                ('Status', models.BooleanField(default=True)),
                ('created_by', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Lenin_Catg_Master_Details',
            },
        ),
        migrations.CreateModel(
            name='LeninMaster_Details',
            fields=[
                ('LeninCode', models.IntegerField(primary_key=True, serialize=False)),
                ('LeninType', models.CharField(max_length=30)),
                ('LeninSize', models.CharField(max_length=30)),
                ('Status', models.BooleanField(default=True)),
                ('created_by', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('LeninCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_Category', to='LeninManagement.lenin_catg_master_details')),
            ],
            options={
                'db_table': 'LeninMaster_Details',
            },
        ),
        migrations.CreateModel(
            name='Lenin_Stock_Details',
            fields=[
                ('StockId', models.IntegerField(primary_key=True, serialize=False)),
                ('Quantity', models.CharField(max_length=30)),
                ('Status', models.BooleanField(default=True)),
                ('created_by', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('LeninCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_Stock_Categories', to='LeninManagement.lenin_catg_master_details')),
                ('LeninType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_Stock_Types', to='LeninManagement.leninmaster_details')),
            ],
            options={
                'db_table': 'Lenin_Stock_Details',
            },
        ),
        migrations.CreateModel(
            name='Dept_Wise_Lenin_min_max_Details',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('Prev_Minimum_count', models.IntegerField()),
                ('Curr_Minimum_count', models.IntegerField()),
                ('Prev_Maximum_count', models.IntegerField()),
                ('Curr_Maximum_count', models.IntegerField()),
                ('Status', models.BooleanField(default=True)),
                ('created_by', models.CharField(max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('Department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_departments', to='Masters.department_detials')),
                ('Location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_locations', to='Masters.location_detials')),
                ('LeninCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_Dept_Categories', to='LeninManagement.lenin_catg_master_details')),
                ('LeninType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lenin_types', to='LeninManagement.leninmaster_details')),
            ],
            options={
                'db_table': 'Dept_Wise_Lenin_min_max_Details',
            },
        ),
    ]
