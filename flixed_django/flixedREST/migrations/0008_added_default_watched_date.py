# Generated by Django 3.1.6 on 2021-05-29 09:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flixedREST', '0007_added_default_watched_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchedmovie',
            name='watched_date',
            field=models.DateField(default=datetime.datetime.today),
        ),
    ]