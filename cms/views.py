from rest_framework.response import Response
from rest_framework import status, permissions, generics, viewsets, pagination
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProductsSerializer, MediaSerializer, CategorySerializer, ProductTypeSerializer, \
    BrandsSerializer, ProductAttributeValuesSerializer, ProductAttributeValueSerializer, ProductInventoryEditSerializer,StockSerializer
from inventory.models import Product, Category, Media, ProductType, Brand, ProductAttributeValues, ProductInventory, \
    ProductAttributeValue,Stock
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


# Create your views here.

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductInventoryView(viewsets.ModelViewSet):
    queryset = ProductInventory.objects.all()
    serializer_class = ProductInventoryEditSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        data = request.data
        if data:
            proInventory = self.queryset.filter(id=data.get("id")).first()
            if proInventory:
                attributes = data.get("attribute_values")
                serializer = self.serializer_class(instance=proInventory, data=data)
                if serializer.is_valid():
                    serializer.save()
                    oldValues = ProductAttributeValues.objects.filter(productinventory_id=proInventory.id)
                    for item in oldValues:
                        if item.attributevalues.id in attributes:
                            attributes.remove(item.attributevalues.id)
                        else:
                            item.delete()
                    for item in attributes:
                        ProductAttributeValues.objects.create(productinventory_id=proInventory.id,
                                                              attributevalues_id=item)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProductsView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, pk=None):
        data = request.data
        category = Category.objects.filter(name=data["category"])
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=data, context={"request": request})
        if serializer.is_valid():
            if category:
                serializer.validated_data["category"] = category.first()
            else:
                serializer.validated_data["category"] = None
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


class ProductTypesView(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = pagination.PageNumberPagination
    page = 100


class BrandsView(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandsSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = pagination.PageNumberPagination
    page = 100


class ProductAttributeValueView(viewsets.ModelViewSet):
    queryset = ProductAttributeValue.objects.order_by("-id")
    serializer_class = ProductAttributeValueSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = pagination.PageNumberPagination
    page = 100
    lookup_field = ("product_type")

    def retrieve(self, request, product_type=None, *args, **kwargs):
        attributes = self.queryset.filter(product_attribute__product_type_attribute__id=product_type)
        if attributes:
            serializer = self.serializer_class(attributes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ProductAttributeValuesView(viewsets.ModelViewSet):
    queryset = ProductAttributeValues.objects.order_by("-id")
    serializer_class = ProductAttributeValuesSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = pagination.PageNumberPagination
    page = 100
    lookup_field = ("productinventory")

    def retrieve(self, request, productinventory=None, *args, **kwargs):
        inventory = ProductInventory.objects.filter(pk=productinventory)
        if inventory:
            attributes = self.queryset.filter(productinventory=inventory.first())
            serializer = self.serializer_class(attributes, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class StockView(viewsets.ModelViewSet):
    queryset = Stock.objects.order_by("-id")
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticated]