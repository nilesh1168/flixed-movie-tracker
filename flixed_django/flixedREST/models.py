from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
class Movie(models.Model):
    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies" 
        
    id = models.CharField(max_length=50,primary_key=True,null=False)
    title = models.CharField(max_length=300,null=False)
    rating = models.DecimalField(max_digits=2,decimal_places=1,null=False)
    genre = models.CharField(max_length=300,null=False)
    year = models.IntegerField()
    runtime = models.IntegerField(null=False)
    language = models.CharField(max_length=100)

    def getTitle(self):
        return self.title

    def setTitle(self,title):
        self.title = title

    def getRating(self):
        return self.rating

    def setRating(self,rating):
        self.rating = rating

    def getGenre(self):
        return self.genre

    def setGenre(self, genre):
        self.genre = genre

    def getYear(self):
        return self.year

    def setYear(self, year):
        self.year = year 

    def getRuntime(self):
        return self.runtime

    def setRuntime(self, runtime):
        self.runtime = runtime

    def getLanguage(self):
        return self.language

    def setLanguage(self, language):
        self.language = language

    def __str__(self):
        return self.title

class Watched_Movie(models.Model):
    class Meta:
        verbose_name = "Watched Movie"
        verbose_name_plural = "Watched Movies"

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="watched_movies")
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE,related_name="watched_movies")
    times_watched = models.IntegerField(default=1)
    date_watched = models.DateField(default=datetime.date.today)

    def getUser(self):
        return self.user
    
    def setUser(self,user):
        self.user = user

    def getMovie(self):
        return self.movie

    def setMovie(self,movie):
        self.movie = movie

    def getTimesWatched(self):
        return self.times_watched

    def setTimesWatched(self,times_watched):
        self.times_watched = times_watched

    def getDateWatched(self):
        return self.date_watched    
    
    def setDateWatched(self,date_watched):
        self.date_watched = date_watched

    def __str__(self):
        return self.movie.title +" : "+ self.user.username

class To_Watch_Movie(models.Model):
    class Meta:
        verbose_name = "To Watch Movie"
        verbose_name_plural = "Watchlist"

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="watchlist")
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE,related_name="watchlist")

    def getUser(self):
        return self.user

    def setUser(self,user):
        self.user = user

    def getMovie(self):
        return self.movie

    def setMovie(self,movie):
        self.movie = movie        

    def __str__(self):
        return self.movie.title +" : "+ self.user.username