from rest_framework import serializers
from .models import Product, Category, Brand, ProductInventory, ProductType, ProductAttributeValue, ProductAttribute, \
    Media, Stock


class BasicCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BasicBrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class BasicProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"
        depth = 2


class BasicProductProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = "__all__"


class BasicMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        exclude = ["product_inventory", "create_at", "update_at"]


class BasicProductAttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValue
        fields = "__all__"


class BasicStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        exclude = ["units_sold", "last_checked", "product_inventory"]


class BasicProductInventorySerializer(serializers.ModelSerializer):
    brand = BasicBrandsSerializer()
    product_type = BasicProductTypeSerializer()
    media = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()

    class Meta:
        model = ProductInventory
        exclude = ["retail_price", "store_price", "create_at", "update_at", "product"]
        depth = 2

    def get_media(self, obj):
        media = Media.objects.filter(product_inventory=obj)

        return BasicMediaSerializer(media, many=True, context=self.context).data

    def get_stock(self, obj):
        stock = Stock.objects.get(product_inventory=obj)
        return BasicStockSerializer(stock, many=False, context=self.context).data


class BasicProductSerializer(serializers.ModelSerializer):
    inventory = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"
        depth = 2

    def get_inventory(self, obj):
        inventory = ProductInventory.objects.get(product=obj)
        return BasicProductInventorySerializer(inventory, many=False, context=self.context).data
