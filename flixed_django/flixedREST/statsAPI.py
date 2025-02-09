from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from flixedREST.models import WatchedMovie, WatchList
from .serializers import WatchedMovieSerializer
from django.db.models import Q, Sum, Count, F
from django.db.models.functions import TruncMonth
import calendar

@api_view(['GET'])
def getTotalWatchTime(request):
    # get the total watch time for all watched movies till date
    totalWatchTime = WatchedMovie.objects.filter(user=request.user).aggregate(total_runtime=Sum(F('runtime') * F('times_watched')))
    return Response({'totalWatchTime':totalWatchTime['total_runtime']}, status = status.HTTP_200_OK)

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
    most_rewatched_movies = []
    for movie in watched_movies:
        if movie.times_watched > 2:
            most_rewatched_movies.append(WatchedMovieSerializer(movie).data) 
    return Response({'most_rewatched_movies':most_rewatched_movies}, status = status.HTTP_200_OK)

@api_view(['GET'])
def getMostWatchedGenresCount(request):
    # get all genres and their counts to make a Pie Chart
    watched_movies = WatchedMovie.objects.filter(user = request.user)
    most_watched_genres_dict = {}
    for movie in watched_movies:
        for genre in movie.genre.split(','):
            most_watched_genres_dict[genre.strip()] = most_watched_genres_dict.get(genre.strip(), 0) + 1
    return Response(most_watched_genres_dict, status = status.HTTP_200_OK)

@api_view(['GET'])
def getMonthlyWatchedMoviesByYear(request, year):
    # get all watched movies by month and year
    queryset = (
        WatchedMovie.objects.filter(user=request.user, watched_date__year=year)
        .annotate(month=TruncMonth('watched_date'))
        .values('month')
        .annotate(movies_watched=Count('id'))
        .order_by('month')
    )

    # Convert the result into the desired format, excluding months with zero movies
    result = {calendar.month_abbr[entry['month'].month]: entry['movies_watched'] for entry in queryset if entry['movies_watched'] > 0}

    return Response(result, status= status.HTTP_200_OK)