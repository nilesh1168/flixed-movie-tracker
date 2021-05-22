from rest_framework_jwt.settings import api_settings
from django.test import TestCase, Client
from django.urls import reverse
from django.db.models import Q, Sum
from rest_framework import status
from ..models import WatchedMovie, User
from ..serializers import WatchedMovieSerializer, WatchListSerializer
from ..views import WatchedMovieList
import json
from datetime import datetime, timedelta 

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class WatchedMoviesViewTests(TestCase):
    """
        Test class for WatchedMovies view
    """
    client = Client()
    
    def setUp(self):
        User.objects.create(username="testUser",first_name="John",last_name="Doe",
            email="johndoe23@anywhere.com",password='test123')

        self.user = User.objects.get(username="testUser")
        self.payload = jwt_payload_handler(self.user)
        self.token = jwt_encode_handler(self.payload)

        WatchedMovie.objects.create(id=1,title="Test Watched Movie1",
            rating=8.0,genre="Development, Application",year=2021,runtime=100,
            watched_date=datetime.today(),language="Python, Java",user=self.user)

        WatchedMovie.objects.create(id=2,title="Test Watched Movie2",
            rating=7.6,genre="Development, Application",year=2021,runtime=100,
            watched_date=datetime.today(),language="Python, Java",user=self.user)


    def test_get_all_watched_movies(self):
        response = self.client.get(reverse('watched-movie-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        watchedMovies = WatchedMovie.objects.filter(user = self.user)
        serializer = WatchedMovieSerializer(watchedMovies,many = True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_watched_movie(self):
        movie = {
            'id':3,'title':"Watched Movie in POST",
            'rating':8.0,'genre':"Development, Application",'year':2021,
            'runtime':100,'watched_date':"2021-05-22",
            'language':"Python, Java"
            }
        response = self.client.post(reverse('watched-movie-view'),
            data=json.dumps(movie),
            content_type="application/json;charset=utf-8",
            HTTP_AUTHORIZATION="JWT "+self.token)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_get_watched_movies_this_week(self):
        response = self.client.get(reverse('watched-movies-this-week-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        watchedMovies = WatchedMovie.objects.filter(Q(watched_date__lte=datetime.today()),Q(watched_date__gte=datetime.now()-timedelta(6)))
        serializer = WatchedMovieSerializer(watchedMovies, many = True)
        self.assertEquals(serializer.data, response.data)

    def test_get_total_watch_time(self):
        response = self.client.get(reverse('total-watch-time-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        totalWatchTime = WatchedMovie.objects.filter(user=self.user).aggregate(Sum('runtime'))
        self.assertEquals(response.data, totalWatchTime)

    def test_get_watchedmovies_count(self):
        response = self.client.get(reverse('total-watched-count-view'),
            HTTP_AUTHORIZATION = "JWT "+self.token)
        count = len(WatchedMovie.objects.filter(user=self.user))
        self.assertEquals(response.data,count)    