from django.contrib import admin

# Register your models here.
from .models import WatchListMovies
from .models import WatchedMovies

admin.site.register(WatchListMovies)
admin.site.register(WatchedMovies)
