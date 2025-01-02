from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from flixedREST.models import WatchedMovie, WatchList
from django.db.models import Q, Sum

@api_view(['GET'])
def getTotalWatchTime(request):
    # get the total watch time for all watched movies till date
    totalWatchTime = WatchedMovie.objects.filter(user=request.user).aggregate(Sum('runtime'))
    return Response({'totalWatchTime':totalWatchTime}, status = status.HTTP_200_OK)

@api_view(['GET'])
def getTotalWatchedMoviesCount(request):
    # get count of total movies watched till date 
    watchedMovies = WatchedMovie.objects.filter(user=request.user)
    return Response({'count':len(watchedMovies)}, status = status.HTTP_200_OK)

@api_view(['GET'])
def getWatchListCount(request):
    # get count of all the movies the use wants to watch.
    watchList = WatchList.objects.filter(user=request.user)
    return Response({'count':len(watchList)}, status = status.HTTP_200_OK)

@api_view(['GET'])
def getMostRewatchedMovies(request):
    # get the most rewatched movies with their name and number of times the movie is watched.
    watched_movies = WatchedMovie.objects.filter(user = request.user)
    most_rewatched_movies_dict = {}
    for movie in watched_movies:
        if movie.times_watched > 2:
            most_rewatched_movies_dict[movie.title] = movie.times_watched
    return Response(most_rewatched_movies_dict, status = status.HTTP_200_OK)

@api_view(['GET'])
def getMostWatchedGenresCount(request):
    # get all genres and their counts to make a Pie Chart
    watched_movies = WatchedMovie.objects.filter(user = request.user)
    most_rewatched_genres_dict = {}
    for movie in watched_movies:
        for genre in movie.genre.split(','):
            most_rewatched_genres_dict[genre.strip()] = most_rewatched_genres_dict.get(genre.strip(), 0) + 1
    return Response(most_rewatched_genres_dict, status = status.HTTP_200_OK)