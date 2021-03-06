# Generated by Django 3.1.6 on 2021-02-03 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WatchedMovies',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('genre', models.CharField(max_length=300)),
                ('year', models.IntegerField()),
                ('runtime', models.IntegerField()),
                ('watched_date', models.DateField(auto_now_add=True)),
                ('times_watched', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Watched Movie',
                'verbose_name_plural': 'Watched Movies',
            },
        ),
        migrations.CreateModel(
            name='WatchListMovies',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('genre', models.CharField(max_length=300)),
                ('year', models.IntegerField()),
                ('runtime', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Watch List Movie',
                'verbose_name_plural': 'Watch List Movies',
            },
        ),
    ]
