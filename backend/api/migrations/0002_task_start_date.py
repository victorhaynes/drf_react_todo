# Generated by Django 4.2.4 on 2023-08-22 19:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='start_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
