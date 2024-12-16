from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from .models import WatchList, WatchedMovie
from .serializers import WatchListSerializer, WatchedMovieSerializer, IdSerializer, UserSerializer, UserSerializerWithToken
from datetime import datetime, timedelta
from django.db.models import Q, Sum
from .utils import Util
from .config import Configuration
from django.shortcuts import get_object_or_404
import requests
from rest_framework.pagination import PageNumberPagination

def get_Movie(id):
    """
        return movie with given 'id'
    """
    try:
        return WatchedMovie.objects.get(id=id)
    except WatchedMovie.DoesNotExist:
        raise Http404


@api_view(['GET'])
def TMDBConfigs(request):
    """
    Returns the configurations of TMDB API
    """
    return Response(data = Configuration.getTMDBConfigurations(), status = status.HTTP_200_OK)

@api_view(['GET'])
def searchMovieOrTV(request):
    """
    Search for Movie or TV. Get id of desired movie and call movie api or tv api
    """
    # send request to TMDB api, get data, post it to front end with pagination details
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + Util.TMDB_API_AUTH_ACCESS
    }
    url = Util.TMDB_URL + "search/multi"
    response = requests.get(url = url, headers = headers,params = request.query_params)
    if response.ok != True:
        return Response(data = response.json(), status = response.status_code)
    filtered_response = response.json()
    results = []
    new_result_count = 0
    new_page_count = 1
    # pre process only for Movies
    for result in filtered_response['results']:
        if result['media_type'] == 'movie':
            results.append(result)
            new_result_count+=1
        if new_result_count > 20:
            new_page_count+=1    
    filtered_response['results'] = results
    filtered_response['total_results'] = new_result_count
    filtered_response['total_pages'] = new_page_count
    return Response(data = filtered_response, status = response.status_code)


@api_view(['GET'])
def searchMovie(request):
    """
        Only get movies from the TMDB API. by calling search/movie
    """
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + Util.TMDB_API_AUTH_ACCESS
    }
    url = Util.TMDB_URL + "search/movie"
    response = requests.get(url = url, headers = headers,params = request.query_params)
    if response.ok != True:
        return Response(data = response.json(), status = response.status_code)
    return Response(data = response.json(), status = response.status_code)


@api_view(['GET'])
def searchTVShow(request):
    """
        Only get TV shows from the TMDB API. by calling search/tv
    """
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + Util.TMDB_API_AUTH_ACCESS
    }
    url = Util.TMDB_URL + "search/tv"
    response = requests.get(url = url, headers = headers,params = request.query_params)
    if response.ok != True:
        return Response(data = response.json(), status = response.status_code)
    return Response(data = response.json(), status = response.status_code)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(data = serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def getTopFiveMoviesToWatch(request):
    watchList = WatchList.objects.filter(user=request.user).order_by('-rating')[:5]
    serializer = WatchListSerializer(watchList,many=True)
    return Response(data = serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def getWatchedMoviesOfThisWeek(request):
    watchedList = WatchedMovie.objects.filter(user=request.user).filter(Q(watched_date__lte = datetime.today()),Q(watched_date__gte = datetime.now()-timedelta(days=6)))
    serializer = WatchedMovieSerializer(watchedList,many=True)
    return Response(data = serializer.data, status = status.HTTP_200_OK) 

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data, status=status.HTTP_201_CREATED)
        return Response(data = serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WatchedMovieList(APIView, PageNumberPagination):
    """
        This view class is to perform operations on
        WHOLE list of WatchedMovies i.e Aggregate operation 
    """

    def get(self, request):
        """
            List all watched movies
        """
        watchedMovies = WatchedMovie.objects.filter(user=request.user)
        results = self.paginate_queryset(watchedMovies, request, view = self)
        serializer = WatchedMovieSerializer(results,many=True)
        # return Response(data = serializer.data, status = status.HTTP_200_OK)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """
            Add movie as watched. get the details of selected movie from /movie TMDB api use the imdb_id attribute to get rating from
            omdb api. once you have all the details create the object and add it to watched movie DB. Need to get genres as well
        """
        response = Util.getMovieDetailsById(request.data)
        rating = Util.getIMDBRatingFromOMDB(response.data['imdb_id'])
        response.data['rating'] = rating
        response.data['user'] = request.user.id
        serializer = WatchedMovieSerializer(data=response.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data,status=status.HTTP_201_CREATED)
        else:
            # increase the watch count and return the message
            for error in serializer.errors['id']:
                if(error.code == "unique"):
                    watchedMovie = get_Movie(request.data['id'])
                    serializer = WatchedMovieSerializer(watchedMovie, data = {'times_watched': watchedMovie.times_watched + 1}, partial = True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(data = serializer.data,status=status.HTTP_204_NO_CONTENT)
                    
        return Response(data = serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)        

    def delete(self, request):
        """
            Delete all movies / Empty watched movies
        """
        movies = WatchedMovie.objects.all()
        movies.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WatchedMovieDetail(APIView):
    """
        This view class is to perform operations on
        SINGLE movie of WatchedMovies i.e selective operation 
    """
    def get(self, request, id):
        movie = get_object_or_404(WatchedMovie, pk = id)
        serializer = WatchedMovieSerializer(movie)
        return Response(data = serializer.data, status = status.HTTP_200_OK)

            
    def put(self, request ,id):
        """
            Update the number of times movie is watched
        """
        watchedMovie = get_Movie(id)
        serializer = WatchedMovieSerializer(watchedMovie, data = {'times_watched': watchedMovie.times_watched + 1}, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data, status = status.HTTP_200_OK)       
        return Response(data = serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self,request,id):
        """
            Delete single watched movie
        """
        movie = get_Movie(id)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WatchListList(APIView):
    """
        This view class is to perform operations on
        WHOLE list of WatchListMovies i.e Aggregate operation 
    """
    def get_Movie(self,id):
        """
            return movie with given 'id'
        """
        try:
            return WatchList.objects.get(id=id)
        except WatchList.DoesNotExist:
            raise Http404

    def get(self,request):
        """
            List the Watch List. Returning top 5 
        """
        watchList = WatchList.objects.filter(user=request.user)
        serializer = WatchListSerializer(watchList,many=True)
        return Response(data = serializer.data, status = status.HTTP_200_OK)

    def post(self,request):
        """
            Add movie to Watch List, get details of movie by id from TMDB, from imdb_id, get the rating from OMDB. finally add
            into watch list
        """
        response = Util.getMovieDetailsById(request.data)
        rating = Util.getIMDBRatingFromOMDB(response.data['imdb_id'])
        response.data['rating'] = rating
        response.data['user'] = request.user.id
        serializer = WatchListSerializer(data=response.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data,status=status.HTTP_201_CREATED)
        return Response(data = serializer.errors,status=status.HTTP_200_OK)    

    def patch(self,request):
        """
            Move movie from watchlist to watched
        """
        serializer = IdSerializer(data=request.data)
        if serializer.is_valid():
            for delMovie in serializer.data['ids']:
                movie = self.get_Movie(delMovie['id'])
                watchListSerializer = WatchListSerializer(movie)
                watchedMovieSerializer = WatchedMovieSerializer(data=watchListSerializer.data) 
                if watchedMovieSerializer.is_valid():
                    watchedMovieSerializer.save()
                    movie.delete()
                else:
                    return Response(data = watchedMovieSerializer.errors,status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response(data = serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
        return Response(status=status.HTTP_200_OK)

    def delete(self,request):
        """
            Delete selected movies from watchlist
        """
        serializer = IdSerializer(data=request.data)
        if serializer.is_valid():
            for delMovie in serializer.data['ids']:
                movie = self.get_Movie(delMovie['id'])
                movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
                
                