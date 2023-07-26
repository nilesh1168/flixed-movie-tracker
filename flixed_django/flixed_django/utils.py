from flixedREST.serializers import UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token


# def my_jwt_response_handler(token, user=None, request=None):
#     return {
#         'token': token,
#         'user': UserSerializer(user, context={'request': request}).data
#     }