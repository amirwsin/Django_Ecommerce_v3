import json

from rest_framework.response import Response
from rest_framework import status, permissions, generics, viewsets, pagination
from django.contrib.auth.models import User
from .serializers import UserSerializer, ProductsSerializer, MediaSerializer, CategorySerializer, ProductTypeSerializer, \
    BrandsSerializer, ProductAttributeValuesSerializer, ProductAttributeValueSerializer, ProductInventoryEditSerializer, \
    StockSerializer, ProductTypeAttributeSerializer, ProductAttributeSerializer
from inventory.models import Product, Category, Media, ProductType, Brand, ProductAttributeValues, ProductInventory, \
    ProductAttributeValue, Stock, ProductTypeAttribute, ProductAttribute
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


# Create your views here.

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.order_by("-id")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class ProductInventoryView(viewsets.ModelViewSet):
    queryset = ProductInventory.objects.all()
    serializer_class = ProductInventoryEditSerializer
    permission_classes = [permissions.IsAdminUser]

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
    permission_classes = [permissions.IsAdminUser]


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

    def create(self, request, *args, **kwargs):
        data = request.data
        category = Category.objects.filter(name=data["category"])
        inventoryData = data["inventory"]
        attributes = inventoryData["attribute_values"]
        if data:
            serializer = self.serializer_class(data=data, context={"request": request})
            if serializer.is_valid():
                if category:
                    serializer.validated_data["category"] = category.first()
                result = serializer.save()
                inventoryData["product"] = result.id
                inventorySerializer = ProductInventoryEditSerializer(data=inventoryData, context={"request": request})
                if inventorySerializer.is_valid():
                    invResult = inventorySerializer.save()
                    for item in attributes:
                        ProductAttributeValues.objects.create(productinventory_id=invResult.id,
                                                              attributevalues_id=item)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MediaView(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [permissions.IsAdminUser]


class CategoriesView(viewsets.ModelViewSet):
    queryset = Category.objects.filter(level=0)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000


class ProductTypesView(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000

    def create(self, request, *args, **kwargs):
        data = request.data
        attributes = data["product_type_attribute"]
        attributesList = ProductAttribute.objects.filter(pk__in=attributes)
        if attributesList:
            serializer = self.serializer_class(data=data, context={"request": request})
            if serializer.is_valid():
                result = serializer.save()
                result.product_type_attribute.set(attributesList)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("attributes required", status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        data = request.data
        attributes = data["product_type_attribute"]
        obj = self.queryset.filter(pk=data["id"]).first()
        attributesList = ProductAttribute.objects.filter(pk__in=attributes)
        if attributesList:
            if obj:
                obj.name = data["name"]
                obj.product_type_attribute.set(attributesList)
                obj.save()
                return Response(self.serializer_class(obj).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("attributes required", status=status.HTTP_400_BAD_REQUEST)


class BrandsView(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandsSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000


class ProductTypeAttributeView(viewsets.ModelViewSet):
    queryset = ProductTypeAttribute.objects.all()
    serializer_class = ProductTypeAttributeSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000


class ProductAttributeValueView(viewsets.ModelViewSet):
    queryset = ProductAttributeValue.objects.order_by("-id")
    serializer_class = ProductAttributeValueSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000
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
    permission_classes = [permissions.IsAdminUser]
    pagination_class = pagination.PageNumberPagination
    pagination.PageNumberPagination.page_size = 1000
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
    permission_classes = [permissions.IsAdminUser]


class ProductAttributeView(viewsets.ModelViewSet):
    queryset = ProductAttribute.objects.order_by("-id")
    serializer_class = ProductAttributeSerializer
    permission_classes = [permissions.IsAdminUser]

    def create(self, request, *args, **kwargs):
        data = request.data
        values = data["values"]
        serializer = self.serializer_class(data=data, context={"request": request})
        if serializer.is_valid():
            result = serializer.save()
            for value in values:
                if value["id"]:
                    if value["attribute_value"]:
                        pass
                    else:
                        ProductAttributeValue.objects.get(pk=value["id"]).delete()
                else:
                    if value["attribute_value"]:
                        ProductAttributeValue.objects.create(product_attribute=result,
                                                             attribute_value=value["attribute_value"])
                    else:
                        pass
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        data = request.data
        obj = self.queryset.filter(pk=data["id"]).first()
        values = data["values"]
        if obj:
            serializer = self.serializer_class(obj, data=data, context={"request": request})
            if serializer.is_valid():
                result = serializer.save()
                for value in values:
                    if value["id"]:
                        if value["attribute_value"]:
                            pass
                        else:
                            ProductAttributeValue.objects.get(pk=value["id"]).delete()
                    else:
                        if value["attribute_value"]:
                            ProductAttributeValue.objects.create(product_attribute=result,
                                                                 attribute_value=value["attribute_value"])
                        else:
                            pass
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
