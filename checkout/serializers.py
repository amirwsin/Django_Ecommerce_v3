from rest_framework import serializers
from .models import Cart, CartItem, Delivery, Order, OrderItem, OrderPayment
from account.serializers import BasicUserSerializer, BasicAddressSerializer
from inventory.serializers import BasicProductSerializer


class BasicDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = "__all__"


class BasicOrderPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderPayment
        fields = "__all__"


class BasicOrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = OrderItem
        fields = "__all__"


class BasicOrderSerializer(serializers.ModelSerializer):
    payment = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    address = BasicAddressSerializer()
    delivery = BasicDeliverySerializer()

    class Meta:
        model = Order
        fields = ["id", "user", "status", "delivery", "address", "payment", "items", "create_at", "update_at"]

    def get_payment(self, obj):
        payment = OrderPayment.objects.get(order=obj)
        return BasicOrderPaymentSerializer(payment, many=False, read_only=True, context=self.context).data

    def get_items(self, obj):
        items = OrderItem.objects.filter(order=obj)
        return BasicOrderItemSerializer(items, many=True, read_only=True, context=self.context).data


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
