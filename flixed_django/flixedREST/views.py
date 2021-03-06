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

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def getTopFiveMoviesToWatch(request):
    watchList = WatchList.objects.filter(user=request.user).order_by('-rating')[:5]
    serializer = WatchListSerializer(watchList,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getWatchListCount(request):
    watchList = WatchList.objects.filter(user=request.user)
    return Response(len(watchList))

@api_view(['GET'])
def getWatchedMoviesOfThisWeek(request):
    watchedList = WatchedMovie.objects.filter(user=request.user).filter(Q(watched_date__lte = datetime.today()),Q(watched_date__gte = datetime.now()-timedelta(days=6)))
    serializer = WatchedMovieSerializer(watchedList,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTotalWatchTime(request):
    totalWatchTime = WatchedMovie.objects.filter(user=request.user).aggregate(Sum('runtime'))
    return Response(totalWatchTime)

@api_view(['GET'])
def getTotalWatchedMoviesCount(request):
    watchedMovies = WatchedMovie.objects.filter(user=request.user)
    return Response(len(watchedMovies))    

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WatchedMovieList(APIView):
    """
        This view class is to perform operations on
        WHOLE list of WatchedMovies i.e Aggregate operation 
    """

    def get(self,request):
        """
            List all watched movies
        """
        watchedMovies = WatchedMovie.objects.filter(user=request.user)
        serializer = WatchedMovieSerializer(watchedMovies,many=True)
        return Response(serializer.data)

    def post(self,request):
        """
            Add movie as watched
        """
        request.data['user'] = request.user.id
        serializer = WatchedMovieSerializer(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        print(serializer.errors)    
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)        

    def delete(self,request):
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
    def get_Movie(self,id):
        """
            return movie with given 'id'
        """
        try:
            return WatchedMovie.objects.get(id=id)
        except WatchedMovie.DoesNotExist:
            raise Http404
            
    def put(self,request,id):
        """
            Update the number of times movie is watched
        """
        watchedMovie = self.get_Movie(id)
        serializer = WatchedMovieSerializer(watchedMovie, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        """
            Delete single watched movie
        """
        movie = self.get_Movie(id)
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
        return Response(serializer.data)

    def post(self,request):
        """
            Add movie to Watch List
        """
        request.data['user'] = request.user.id
        serializer = WatchListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    

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
                    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
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