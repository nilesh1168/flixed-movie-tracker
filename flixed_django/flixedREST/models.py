from django.db import models

# Create your models here.
class WatchedMovies(models.Model):
    id = models.CharField(max_length=50,primary_key=True)
    title = models.CharField(max_length=300)
    rating = models.DecimalField(max_digits=2,decimal_places=1)
    genre = models.CharField(max_length=300)
    year = models.IntegerField()
    runtime = models.IntegerField()
    watched_date = models.DateField(auto_now_add = True)
    times_watched = models.IntegerField(default=1)
    language = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Watched Movie"
        verbose_name_plural = "Watched Movies"

    def __str__(self):
        return self.title

class WatchListMovies(models.Model):
    id = models.CharField(max_length=50,primary_key=True)
    title = models.CharField(max_length=300)
    rating = models.DecimalField(max_digits=2,decimal_places=1)
    genre = models.CharField(max_length=300)
    year = models.IntegerField()
    runtime = models.IntegerField()
    language = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Watch List Movie"
        verbose_name_plural = "Watch List Movies"

    def __str__(self):
        return self.title