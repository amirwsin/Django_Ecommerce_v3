from django.shortcuts import render
from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem, Delivery
from django.contrib.auth.models import User
from .serializers import BasicCartSerializer, BasicDeliverySerializer
from inventory.models import ProductAttributeValue


# Create your views here.

class DeliveryListView(generics.ListAPIView):
    queryset = Delivery.objects.all()
    serializer_class = BasicDeliverySerializer
    permission_classes = [permissions.AllowAny]


class CartView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        user = User.objects.filter(id=pk).first()
        if user:
            userCart = Cart.objects.filter(user=user).first()
            if userCart:
                serializer = BasicCartSerializer(userCart, many=False, context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                userCart = Cart.objects.create(user=user)
                serializer = BasicCartSerializer(userCart, many=False, context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk=None):
        user = User.objects.filter(id=pk).first()
        product = request.data.get("product")
        qty = request.data.get("qty")
        variant = request.data.get("variant")
        prepVariant = []
        for key, value in variant.items():
            prepVariant.append(ProductAttributeValue.objects.get(attribute_value=value, product_attribute__name=key).id)
        cart = Cart.objects.filter(user=user).first()
        cartItem = CartItem.objects.update_or_create(cart=cart, product_id=product["id"])
        cartItem[0].variants.set(prepVariant)
        cartItem[0].qty += qty
        cartItem[0].save()

        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        user = User.objects.filter(id=pk).first()
        product_id = request.data.get("product")
        cartItem = CartItem.objects.filter(cart__user=user, product_id=product_id).first()
        cartItem.delete()
        return Response(status=status.HTTP_200_OK)

    def patch(self, request, pk=None):
        user = User.objects.filter(id=pk).first()
        type = request.data.get("type")
        product_id = request.data.get("product")
        cartItem = CartItem.objects.filter(cart__user=user, product_id=product_id).first()
        if type == "increment":
            cartItem.qty += 1
        elif type == "decrement":
            cartItem.qty -= 1
        cartItem.save()
        return Response(status=status.HTTP_200_OK)
