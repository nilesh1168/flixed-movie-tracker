# Generated by Django 3.1.6 on 2021-09-12 11:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flixedREST', '0011_db_testing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watchedmovie',
            name='user',
        ),
        migrations.DeleteModel(
            name='Watch_List',
        ),
        migrations.DeleteModel(
            name='WatchedMovie',
        ),
    ]
