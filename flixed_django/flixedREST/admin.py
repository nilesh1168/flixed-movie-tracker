from django.contrib import admin

# Register your models here.
from .models import Movie, Watched_Movie, To_Watch_Movie

admin.site.register(Movie)
admin.site.register(Watched_Movie)
admin.site.register(To_Watch_Movie)


