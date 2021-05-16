from django.contrib import admin

# Register your models here.
from .models import WatchList
from .models import WatchedMovie

admin.site.register(WatchList)
admin.site.register(WatchedMovie)
