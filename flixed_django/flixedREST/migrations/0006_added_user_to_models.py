# Generated by Django 3.1.6 on 2021-05-16 06:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('flixedREST', '0005_some_hack'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchedmovie',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watched_movies', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='watchlist',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='watch_list', to=settings.AUTH_USER_MODEL),
        ),
    ]
