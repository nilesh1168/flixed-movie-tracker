from django.shortcuts import render
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from .models import Movie, Watched_Movie, To_Watch_Movie
from .serializers import IdSerializer, UserSerializer, UserSerializerWithToken, Movie_Serializer, Watched_Movie_Serializer, To_Watch_Movie_Serializer
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
    user = User.objects.filter(username = request.user).first()
    watchList = user.watchlist.order_by('-movie__rating')[:5]
    serializer = To_Watch_Movie_Serializer(watchList,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getWatchListCount(request):
    user = User.objects.filter(username = request.user).first()
    watchList = user.watchlist.all()
    return Response(len(watchList))

@api_view(['GET'])
def getWatchedMoviesOfThisWeek(request):
    watchedList = Watched_Movie.objects.filter(user=request.user).filter(Q(date_watched__lte = datetime.today()),Q(date_watched__gte = datetime.now()-timedelta(days=7)))
    serializer = Watched_Movie_Serializer(watchedList,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTotalWatchTime(request):
    user = User.objects.filter(username = request.user).first()
    totalWatchTime = user.watched_movies.aggregate(total_watch_time=Sum('movie__runtime'))
    return Response(totalWatchTime)

@api_view(['GET'])
def getTotalWatchedMoviesCount(request):
    user = User.objects.filter(username = request.user).first()
    watchedMovies = user.watched_movies.all()
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


# class WatchedMovieDetail(APIView):
#     """
#         This view class is to perform operations on
#         SINGLE movie of WatchedMovies i.e selective operation 
#     """
#     def get_Movie(self,id):
#         """
#             return movie with given 'id'
#         """
#         try:
#             return WatchedMovie.objects.get(id=id)
#         except WatchedMovie.DoesNotExist:
#             raise Http404
            
#     def put(self,request,id):
#         """
#             Update the number of times movie is watched
#         """
#         watchedMovie = self.get_Movie(id)
#         serializer = WatchedMovieSerializer(watchedMovie, data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)       
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self,request,id):
#         """
#             Delete single watched movie
#         """
#         movie = self.get_Movie(id)
#         movie.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# class WatchListList(APIView):
#     """
#         This view class is to perform operations on
#         WHOLE list of WatchListMovies i.e Aggregate operation 
#     """
#     def get_Movie(self,id):
#         """
#             return movie with given 'id'
#         """
#         try:
#             return Watch_List.objects.get(id=id)
#         except Watch_List.DoesNotExist:
#             raise Http404

#     def get(self,request):
#         """
#             List the Watch List. Returning top 5 
#         """
#         watchList = Watch_List.objects.filter(user=request.user)
#         serializer = WatchListSerializer(watchList,many=True)
#         return Response(serializer.data)

#     def post(self,request):
#         """
#             Add movie to Watch List
#         """
#         request.data['user'] = request.user.id
#         serializer = WatchListSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    

#     def patch(self,request):
#         """
#             Move movie from watchlist to watched
#         """
#         serializer = IdSerializer(data=request.data)
#         if serializer.is_valid():
#             for delMovie in serializer.data['ids']:
#                 movie = self.get_Movie(delMovie['id'])
#                 watchListSerializer = WatchListSerializer(movie)
#                 watchedMovieSerializer = WatchedMovieSerializer(data=watchListSerializer.data) 
#                 if watchedMovieSerializer.is_valid():
#                     watchedMovieSerializer.save()
#                     movie.delete()
#                 else:
#                     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
#         else:
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)    
#         return Response(status=status.HTTP_200_OK)

#     def delete(self,request):
#         """
#             Delete selected movies from watchlist
#         """
#         serializer = IdSerializer(data=request.data)
#         if serializer.is_valid():
#             for delMovie in serializer.data['ids']:
#                 movie = self.get_Movie(delMovie['id'])
#                 movie.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)        

class Watched_Movie_List(APIView):
    def get(self,request):
        user = User.objects.filter(username=request.user).first()
        print(user)
        watched_movies = user.watched_movies.all()
        watched_movie_serializer = Watched_Movie_Serializer(watched_movies,many=True)
        print(watched_movie_serializer.data)
        return Response(watched_movie_serializer.data,status=status.HTTP_200_OK)

    def post(self,request):
        # print(request.user)
        # print(request.data)
        # print(request.auth)
        # print(request.authenticators)
        # print(request.method)
        user = User.objects.filter(username=request.user).first()
        movie_serializer = Movie_Serializer(data=request.data)
        # save movie in db
        if movie_serializer.is_valid():
            movie_serializer.save()
            movie = Movie.objects.filter(id=request.data['id']).first()
            watched_movie = Watched_Movie(user = user, movie = movie)
            try:
                watched_movie.save()
            except Exception as e:
                print(e)
            return Response(data={"message":"Added movie to watched!"}, status=status.HTTP_201_CREATED)
        else:
            # get the existing movie
            print(movie_serializer.errors)
            for key in movie_serializer.errors:
                if key == 'id' and len(movie_serializer.errors)==1:
                    for error in movie_serializer.errors[key]:
                        if error.casefold().__eq__("movie with this id already exists.".casefold()):
                            movie = Movie.objects.filter(id=request.data['id']).first()
                            watched_movie = Watched_Movie.objects.filter(user = user,movie=movie).first()
                            if watched_movie is not None:
                                times_watched = watched_movie.getTimesWatched() + 1
                                watched_movie.setTimesWatched(times_watched)
                            else:
                                Watched_Movie.objects.create(user=user, movie=movie)
                                return Response(data={"message":"Added movie to watched!"}, status=status.HTTP_201_CREATED)
                            watched_movie.save()
                            return Response(data={"message":"Movie already exists, increased the count of times_watched"},status=status.HTTP_202_ACCEPTED)
                else:
                    return Response(data=movie_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class Watch_List_List(APIView):
    
    def get(self,request):    
        user = User.objects.filter(username=request.user).first()
        watchlist = user.watchlist.all()
        watchlist_serializer = To_Watch_Movie_Serializer(watchlist,many=True)
        return Response(data = watchlist_serializer.data, status = status.HTTP_200_OK)

    def post(self,request):
        user = User.objects.filter(username=request.user).first()
        movie_serializer = Movie_Serializer(data=request.data)
        # save movie in db
        if movie_serializer.is_valid():
            movie_serializer.save()
            movie = Movie.objects.filter(id=request.data['id']).first()
            to_watch_movie = To_Watch_Movie(user = user, movie = movie)
            try:
                to_watch_movie.save()
            except Exception as e:
                print(e)
            return Response(data={"message":"Added movie to Watchlist!"}, status=status.HTTP_201_CREATED)
        else:
            for key in movie_serializer.errors:
                if key == 'id' and len(movie_serializer.errors)==1:
                    movie = Movie.objects.filter(id=request.data['id']).first()
                    to_watch_movie = To_Watch_Movie.objects.filter(user = request.user, movie = movie).first()
                    print(to_watch_movie)
                    if to_watch_movie is None:
                        watched_movie = Watched_Movie.objects.filter(user = user, movie = movie)
                        print(watched_movie)
                        if len(watched_movie) != 0:
                            return Response(data = {"message":"Movie already watched!"}, status = status.HTTP_302_FOUND)    
                        else:
                            To_Watch_Movie.objects.create(user = user, movie = movie)
                            return Response(data = {"message":"Added movie to WatchList!"}, status = status.HTTP_201_CREATED)
                    return Response(data = {"message":"Movie already added to WatchList!"}, status = status.HTTP_302_FOUND)
                else:
                    return Response(data=movie_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def patch(self,request):
        print(request.user)
        print(request.data)
        user = User.objects.filter(username = request.user).first()
        id_list = [x['id'] for x in request.data['ids']]
        movies_to_move=[]
        print(id_list)
        for id in id_list:
            watchlist_movie = user.watchlist.get(movie=id)
            if watchlist_movie is not None:
                print(watchlist_movie)
                movies_to_move.append(watchlist_movie)
                watchlist_movie.delete()    
        for to_watch in movies_to_move:
            movie_to_add = Watched_Movie(user = request.user, movie = to_watch.movie)
            print(movie_to_add)
            movie_to_add.save()
        return Response(data={"message":"Added movie to Watchedlist!"}, status=status.HTTP_201_CREATED)    
    
    def delete(self,request):
        print(request.user)
        print(request.data)
        user = User.objects.filter(username = request.user).first()
        id_list = [x['id'] for x in request.data['ids']]
        print(id_list)
        for id in id_list:
            watchlist_movie = user.watchlist.get(movie=id)
            if watchlist_movie is not None:
                print(watchlist_movie)
                watchlist_movie.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT)
