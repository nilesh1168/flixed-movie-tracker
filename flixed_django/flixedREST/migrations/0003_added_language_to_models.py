# Generated by Django 3.1.6 on 2021-02-05 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flixedREST', '0002_auto_20210203_0630'),
    ]

    operations = [
        migrations.AddField(
            model_name='watchedmovies',
            name='language',
            field=models.CharField(default=False, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='watchlistmovies',
            name='language',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]