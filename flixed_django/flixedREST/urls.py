from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [

    path('movies/watched', views.WatchedMovieList.as_view()),
    path('movies/watch_list', views.WatchListList.as_view()),
    path('movies/watch_list/top_five',views.getTopFiveMoviesToWatch),
    path('movies/watch_list/totalcount',views.getWatchListCount),
    path('movies/watched/<int:pk>/', views.WatchedMovieDetail.as_view()),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('movies/watched/thisweek',views.getWatchedMoviesOfThisWeek),
    path('movies/watched/totaltime',views.getTotalWatchTime),
    path('movies/watched/totalcount',views.getTotalWatchedMoviesCount)
    
]
