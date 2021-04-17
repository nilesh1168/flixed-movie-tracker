from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [

    path('movies/watched', views.WatchedMoviesList.as_view()),
    path('movies/watched/<int:pk>/', views.WatchedMovieDetail.as_view()),
    path('movies/watch_list', views.WatchListMoviesList.as_view()),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view())
]
