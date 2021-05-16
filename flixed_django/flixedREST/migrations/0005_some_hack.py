# Generated by Django 3.1.6 on 2021-05-16 06:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('flixedREST', '0004_renamed_watch_list'),
    ]

    operations = [
        migrations.CreateModel(
            name='WatchedMovie',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('genre', models.CharField(max_length=300)),
                ('year', models.IntegerField()),
                ('runtime', models.IntegerField()),
                ('watched_date', models.DateField(auto_now_add=True)),
                ('times_watched', models.IntegerField(default=1)),
                ('language', models.CharField(max_length=100)),
                ('user', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='watched_movies', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Watched Movie',
                'verbose_name_plural': 'Watched Movies',
            },
        ),
        migrations.DeleteModel(
            name='WatchedMovies',
        ),
        migrations.AlterModelOptions(
            name='watchlist',
            options={'verbose_name': 'Watch List', 'verbose_name_plural': 'Watch List'},
        ),
        migrations.AddField(
            model_name='watchlist',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='watch_list', to=settings.AUTH_USER_MODEL),
        ),
    ]
