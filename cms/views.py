from rest_framework.response import Response
from rest_framework import status, permissions, generics, viewsets, pagination
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProductsSerializer, MediaSerializer, CategorySerializer
from inventory.models import Product, Category, Media
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


# Create your views here.

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductsView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, pk=None):
        data = request.data
        category = Category.objects.get(name=data["category"])
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=data, context={"request": request})
        if serializer.is_valid():
            serializer.validated_data["category"] = category
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MediaView(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [permissions.IsAuthenticated]


class CategoriesView(viewsets.ModelViewSet):
    queryset = Category.objects.filter(level__gt=0)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = pagination.PageNumberPagination
    page = 100
