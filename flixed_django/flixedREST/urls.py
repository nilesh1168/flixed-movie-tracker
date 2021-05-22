from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [

    path('movies/watched', views.WatchedMovieList.as_view(),name='watched-movie-view'),
    path('movies/watch_list', views.WatchListList.as_view(),name='watchlist-movie-view'),
    path('movies/watch_list/top_five',views.getTopFiveMoviesToWatch,name='top-five-movie-view'),
    path('movies/watch_list/totalcount',views.getWatchListCount,name='watchlist-count-view'),
    path('movies/watched/<int:pk>/', views.WatchedMovieDetail.as_view(),name='watched-movie-detail-view'),
    path('current_user/', views.current_user,name='current-user-view'),
    path('users/', views.UserList.as_view(),name='post-users-view'),
    path('movies/watched/thisweek',views.getWatchedMoviesOfThisWeek,name='watched-movies-this-week-view'),
    path('movies/watched/totaltime',views.getTotalWatchTime,name='total-watch-time-view'),
    path('movies/watched/totalcount',views.getTotalWatchedMoviesCount,name='total-watched-count-view')
    
]
