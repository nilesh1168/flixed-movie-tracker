from django.test import TestCase, Client
from ..models import WatchList, User
from django.urls import reverse
from rest_framework import status
from ..serializers import WatchListSerializer
from rest_framework_jwt.settings import api_settings
import json

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class WatchListTests(TestCase):
    """
        Test class for WatchList view
    """
    client = Client()
    
    def setUp(self):
        User.objects.create(username="testUser",first_name="John",last_name="Doe",
            email="johndoe23@anywhere.com",password='test123')

        self.user = User.objects.get(username="testUser")
        self.payload = jwt_payload_handler(self.user)
        self.token = jwt_encode_handler(self.payload)


        WatchList.objects.create(id=1,title="Test WatchList Movie1",
            rating=8.7,genre="Development, Application, Web",year=2021,runtime=101,
            language="Python, Java",user=self.user)

        WatchList.objects.create(id=2,title="Test WatchList Movie2",
            rating=7.7,genre="Development, Application",year=2021,runtime=110,
            language="Python, Java",user=self.user)

        WatchList.objects.create(id=4,title="Test WatchList Movie4",
            rating=6.7,genre="Development, Application, Mobile",year=2021,runtime=103,
            language="Python, Java",user=self.user)    

    def test_get_all_watchlist_movies(self):
        response = self.client.get(reverse('watchlist-movie-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        watchlist = WatchList.objects.filter(user = self.user)
        serializer = WatchListSerializer(watchlist,many=True)  
        self.assertEquals(response.data, serializer.data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_create_watchlist_movie(self):
        movie = {
            'id':3,'title':"Watched Movie in POST",
            'rating':8.0,'genre':"Development, Application",'year':2021,
            'runtime':100,'language':"Python, Java"
        }
        response = self.client.post(reverse('watchlist-movie-view'),
            data=json.dumps(movie),content_type="application/json;charset=utf-8",
            HTTP_AUTHORIZATION="JWT "+self.token)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_move_from_watchlist_to_watched_movie(self):
        ids ={
            "ids" : [{'title':"Test WatchList Movie1",'id':1}]
        }
        response = self.client.patch(reverse('watchlist-movie-view'),
            data=json.dumps(ids), content_type="application/json;charset=utf-8",
            HTTP_AUTHORIZATION="JWT "+self.token)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_delete_from_watchlist(self):
        ids ={
            "ids" : [{'title':"Test WatchList Movie1",'id':1}]
        }
        response = self.client.delete(reverse('watchlist-movie-view'),
            data=json.dumps(ids), content_type="application/json;charset=utf-8",
            HTTP_AUTHORIZATION="JWT "+self.token)
        self.assertEquals(response.status_code , status.HTTP_204_NO_CONTENT)

    def test_get_top_five_movies_to_watch(self):
        reponse = self.client.get(reverse('top-five-movie-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        movies = WatchList.objects.filter(user = self.user).order_by('-rating')[:5]
        serializer = WatchListSerializer(movies,many = True)
        self.assertEquals(serializer.data,reponse.data)                                     

    def test_get_watchlist_count(self):
        response = self.client.get(reverse('watchlist-count-view'),
            HTTP_AUTHORIZATION="JWT "+self.token)
        count = len(WatchList.objects.filter(user=self.user))
        self.assertEquals(count,response.data)          