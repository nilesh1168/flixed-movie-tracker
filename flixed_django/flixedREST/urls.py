from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from . import statsAPI

urlpatterns = [

    path('movies/watched', views.WatchedMovieList.as_view(),name='watched-movie-view'),
    path('movies/watch_list', views.WatchListList.as_view(),name='watchlist-movie-view'),
    path('movies/watch_list/top_five',views.getTopFiveMoviesToWatch,name='top-five-movie-view'),
    path('movies/watched/<int:id>/', views.WatchedMovieDetail.as_view(),name='watched-movie-detail-view'),
    path('current_user/', views.current_user,name='current-user-view'),
    path('users/', views.UserList.as_view(),name='post-users-view'),
    path('movies/watched/thisweek',views.getWatchedMoviesOfThisWeek,name='watched-movies-this-week-view'),
    
    path('search',views.searchMovieOrTV,name='seach-movie-or-tv'),
    # path('tmdb_configurations', views.TMDBConfigs, name='tmdb-config'),
    
    path('movies/watch_list/totalcount',statsAPI.getWatchListCount,name='watchlist-count-view'),
    path('movies/watched/totaltime',statsAPI.getTotalWatchTime,name='total-watch-time-view'),
    path('movies/watched/totalcount',statsAPI.getTotalWatchedMoviesCount,name='total-watched-count-view'),
    path('movie/watched/mostwatchedgenres', statsAPI.getMostWatchedGenresCount, name='most-watched-genres-count-view'),
    path('movie/watched/mostwatchedmovies',statsAPI.getMostRewatchedMovies, name='most-rewatched-movies-view')
]



