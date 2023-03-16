from rest_framework.response import Response
from rest_framework import status, permissions, generics,viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer


# Create your views here.

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
