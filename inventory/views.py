from rest_framework.response import Response
from .models import ProductInventory, Category, Brand, Product
from .serializers import BasicProductInventorySerializer, BasicCategoriesSerializer, BasicBrandsSerializer, \
    BasicProductSerializer
from rest_framework import status, permissions, pagination, generics


class BasicProductView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all().prefetch_related()
    serializer_class = BasicProductSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        query = self.queryset.all()
        if category:
            query = query.filter(category__slug=category)
        return query


class BasicProductBySlugView(generics.RetrieveAPIView):
    queryset = Product.objects.prefetch_related()
    serializer_class = BasicProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class BasicCategoriesView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = BasicCategoriesSerializer



class BasicBrandsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brand.objects.all()
    serializer_class = BasicBrandsSerializer
