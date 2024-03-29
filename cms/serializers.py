from django.contrib.auth.models import User
from rest_framework import serializers
from inventory.models import Product, Category, Brand, ProductType, ProductAttribute, Media, ProductAttributeValue, \
    Stock, ProductInventory, ProductAttributeValues, ProductTypeAttribute
from checkout.models import Delivery


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"
        depth = 2


class MediaSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Media
        exclude = ["create_at", "update_at"]


class ProductAttributeValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValues
        fields = "__all__"
        depth = 1


class ProductAttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValue
        fields = "__all__"


class ProductAttributeSerializer(serializers.ModelSerializer):
    values = serializers.SerializerMethodField()

    class Meta:
        model = ProductAttribute
        fields = "__all__"

    def get_values(self, obj):
        values = ProductAttributeValue.objects.filter(product_attribute=obj)
        return ProductAttributeValueSerializer(values, many=True, context=self.context).data


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"


class ProductTypeAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTypeAttribute
        fields = "__all__"
        depth = 2


class ProductInventorySerializer(serializers.ModelSerializer):
    product_type = ProductTypeSerializer()
    media = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()
    attribute_values = ProductAttributeValueSerializer(many=True)

    class Meta:
        model = ProductInventory
        exclude = ["create_at", "update_at", "product"]
        depth = 2

    def get_media(self, obj):
        media = Media.objects.filter(product_inventory=obj)

        return MediaSerializer(media, many=True, context=self.context).data

    def get_stock(self, obj):
        stock = Stock.objects.get(product_inventory=obj)
        return StockSerializer(stock, many=False, context=self.context).data


class ProductInventoryEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInventory
        fields = "__all__"


class ProductsSerializer(serializers.ModelSerializer):
    inventory = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"
        depth = 2

    def get_inventory(self, obj):
        inventory = ProductInventory.objects.get(product=obj)
        return ProductInventorySerializer(inventory, many=False, context=self.context).data


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = "__all__"
