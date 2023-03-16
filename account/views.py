from django.contrib.auth.models import User
from drf_social_oauth2.views import AccessToken
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Address
from .serializers import BasicUserSerializer, CreateUserSerializer, UpdateUserSerializer, BasicAddressSerializer


# Create your views here.

class LoginUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, token):
        token_table = AccessToken.objects.filter(token=token)
        if token_table:
            user = User.objects.get(pk=token_table.first().user.pk)
            if user:
                serializer = BasicUserSerializer(user, context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CreateUser(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User
    permission_classes = [permissions.AllowAny]


class UpdateUser(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class UserAddress(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        query = Address.objects.filter(user_id=pk)
        serializer = BasicAddressSerializer(query, many=True, read_only=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk=None, **kwargs, ):
        data = request.data.get("data")
        serializer = BasicAddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        query = Address.objects.get(id=pk)
        data = request.data.get("data")
        serializer = BasicAddressSerializer(query, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        query = Address.objects.get(id=pk)
        query2 = Address.objects.filter(user=query.user).filter(is_default=True).first()
        if query2:
            query2.is_default = False
            query2.save()
        query.is_default = True
        query.save()
        serializer = BasicAddressSerializer(query, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        query = Address.objects.get(id=pk)
        query.delete()
        return Response(status=status.HTTP_200_OK)
