from rest_framework import serializers
from .models import Cart, CartItem, Delivery
from account.serializers import BasicUserSerializer
from inventory.serializers import BasicProductSerializer


class BasicDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = "__all__"


class BasicCartItemSerializer(serializers.ModelSerializer):
    product = BasicProductSerializer()

    class Meta:
        model = CartItem
        fields = "__all__"


class BasicCartSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = "__all__"

    def get_items(self, obj):
        items = CartItem.objects.filter(cart=obj)
        return BasicCartItemSerializer(items, many=True, context=self.context).data
