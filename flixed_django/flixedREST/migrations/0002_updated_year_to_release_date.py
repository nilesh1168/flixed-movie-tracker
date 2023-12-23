# Generated by Django 4.2.3 on 2023-12-23 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flixedREST', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watchedmovie',
            name='year',
        ),
        migrations.RemoveField(
            model_name='watchlist',
            name='year',
        ),
        migrations.AddField(
            model_name='watchedmovie',
            name='release_date',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='watchlist',
            name='release_date',
            field=models.CharField(default=None, max_length=50),
            preserve_default=False,
        ),
    ]
