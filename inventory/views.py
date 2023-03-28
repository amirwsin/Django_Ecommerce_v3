from rest_framework.response import Response
from .models import ProductInventory, Category, Brand, Product
from .serializers import BasicProductInventorySerializer, BasicCategoriesSerializer, BasicBrandsSerializer, \
    BasicProductSerializer
from rest_framework import status, permissions, pagination, generics
from django_filters import rest_framework as filters


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="product__sale_price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="product__sale_price", lookup_expr='lte')
    category = filters.BaseInFilter(field_name="category__slug", lookup_expr='in')
    brand = filters.BaseInFilter(field_name="product__brand__name", lookup_expr='in')

    class Meta:
        model = Product
        fields = ['is_recommend', 'is_special']


class BasicProductView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.filter(is_active=True).prefetch_related()
    serializer_class = BasicProductSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ProductFilter

    # Product.objects.filter(category_)


class BasicProductBySlugView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).prefetch_related()
    serializer_class = BasicProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = ("slug")


class BasicCategoriesView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
    serializer_class = BasicCategoriesSerializer


class BasicBrandsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Brand.objects.all()
    serializer_class = BasicBrandsSerializer
