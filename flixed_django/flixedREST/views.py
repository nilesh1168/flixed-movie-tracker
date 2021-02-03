from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WatchListMovies, WatchedMovies
from .serializers import WatchListMoviesSerializer, WatchedMoviesSerializer

# Create your views here.


class WatchedMoviesList(APIView):

    def get(self,request):
        """
            List all watched movies
        """
        watchedMovies = WatchedMovies.objects.all()
        serializer = WatchedMoviesSerializer(watchedMovies, many=True)
        return Response(serializer.data)

    def post(self,request):
        """
            Add movie as watched
        """
        serializer = WatchedMoviesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)        


class WatchedMoviesListDetail(APIView):
    def get_Movie(self,id):
        try:
            return WatchListMovies.objects.get(id=id)
        except WatchListMovies.DoesNotExist:
            raise Http404
            
    def put(self,request,id):
        """
            Update the number of times movie is watched
        """
        watchedMovie = self.get_Movie(id)
        serializer = WatchedMoviesSerializer(watchedMovie, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)       
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WatchListMoviesList(APIView):
    def get(self,request):
        """
            List the Watch List
        """
        watchList = WatchListMovies.objects.all()
        serializer = WatchListMoviesSerializer(watchList,many=True)
        return Response(serializer.data)

    def post(self,request):
        """
            Add movie to Watch List
        """
        serializer = WatchListMoviesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)