from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class WatchedMovie(models.Model):
    id = models.CharField(max_length=50,primary_key=True)
    title = models.CharField(max_length=300)
    rating = models.DecimalField(max_digits=2,decimal_places=1)
    genre = models.CharField(max_length=300)
    year = models.IntegerField()
    runtime = models.IntegerField(null=False)
    watched_date = models.DateField(auto_now_add = True)
    times_watched = models.IntegerField(default=1)
    language = models.CharField(max_length=100)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="watched_movies")
    
    class Meta:
        verbose_name = "Watched Movie"
        verbose_name_plural = "Watched Movies"

    def __str__(self):
        return self.title

    def getUser(self):
        return self.user    

    def getTimesWatched(self):
        return self.times_watched

        
class WatchList(models.Model):
    id = models.CharField(max_length=50,primary_key=True,null=False)
    title = models.CharField(max_length=300,null=False)
    rating = models.DecimalField(max_digits=2,decimal_places=1,null=False)
    genre = models.CharField(max_length=300,null=False)
    year = models.IntegerField()
    runtime = models.IntegerField(null=False)
    language = models.CharField(max_length=100)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="watch_list",null=False)


    class Meta:
        verbose_name = "Watch List"
        verbose_name_plural = "Watch List"

    def __str__(self):
        return self.title

    def getUser(self):
        return self.user     