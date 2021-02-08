from .models import WatchedMovies, WatchListMovies
from rest_framework import serializers

class WatchedMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchedMovies
        fields = '__all__'


class WatchListMoviesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchListMovies
        fields = '__all__'

class IdSerializer(serializers.Serializer):
    """
        Custom serializer which takes only array of id
    """
    ids = serializers.ListField(child=serializers.JSONField())        