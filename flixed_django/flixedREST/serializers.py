from .models import WatchedMovie, WatchList
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """
        Used to load data when user is already logged in
    """
    class Meta:
        model = User
        fields = ('username',)

class UserSerializerWithToken(serializers.ModelSerializer):
    """
        Used to store and return data when user signs up
    """
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email', 'first_name','last_name')

class WatchedMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = WatchedMovie
        fields = '__all__'

class WatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchList
        fields = '__all__'

class IdSerializer(serializers.Serializer):
    """
        Custom serializer which takes only array of id
    """
    ids = serializers.ListField(child=serializers.JSONField())        