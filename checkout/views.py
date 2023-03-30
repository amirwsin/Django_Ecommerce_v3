from django.shortcuts import render, redirect, HttpResponse

from rest_framework import status, permissions, generics, views
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem, Delivery, Order, OrderItem, OrderPayment
from django.contrib.auth.models import User
from .serializers import BasicCartSerializer, BasicDeliverySerializer
from inventory.models import ProductAttributeValue
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from account.models import Address

# Create your views here.


stripe.api_key = settings.STRIPE_SECRET_KEY
endpoint_secret = 'whsec_96a4e0d27b3c38f4ecf5d97657f443fd4b5e95c002a8cfc4a74a294414d5f833'


class StripePaymentView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.get(user__username=request.user)
        cart_items = CartItem.objects.filter(cart=cart)
        price = cart.get_price()
        address = Address.objects.get(pk=request.data["address"])
        delivery = Delivery.objects.get(pk=request.data["delivery"])
        price += delivery.price
        int_price = price * 100
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(int_price),
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            order, created = Order.objects.update_or_create(user=request.user, status="UNCONFIRMED",
                                                            defaults={"address": address, "delivery": delivery})
            for x in cart_items:
                obj, created = OrderItem.objects.update_or_create(order_id=order.id, product=x.product,
                                                                  defaults={"sale_price": x.product.product.sale_price,
                                                                            "qty": x.qty})
                obj.variants.set(x.variants.all())
                obj.save()
            OrderPayment.objects.update_or_create(order_id=order.id, user=request.user,
                                                  defaults={"payment_intent": intent["id"],
                                                            "client_secret": intent['client_secret'],
                                                            "currency": intent["currency"],
                                                            "amount": price,
                                                            "amount_payed": 0,
                                                            "gateway": "stripe"})
            return Response({'clientSecret': intent['client_secret']}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)


@csrf_exempt
def StripeWebHook(request):
    event = None
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    if endpoint_secret:
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return HttpResponse(status=400)

    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
        order = Order.objects.get(order_item_payment__payment_intent=payment_intent['id'],
                                  order_item_payment__client_secret=payment_intent["client_secret"])
        order.status = "PENDING"
        order.save()
        payment = OrderPayment.objects.get(order_id=order.id)
        payment.status = "COMPLETED"
        payment.save()
        CartItem.objects.filter(cart__user_id=order.id).delete()
    elif event['type'] == 'payment_method.attached':
        payment_method = event['data']['object']  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    elif event['type'] == "charge.succeeded":
        print(2)
        pass
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))

    return HttpResponse(status=200)


# class StripeWebHook(views.APIView):
#     permission_classes = [permissions.AllowAny]
#
#     def post(self, request, *args, **kwargs):
#         event = None
#         payload = request.data
#         sig_header = request.headers['STRIPE_SIGNATURE']
#
#         try:
#             event = stripe.Webhook.construct_event(
#                 payload, sig_header, endpoint_secret
#             )
#         except ValueError as e:
#             # Invalid payload
#             raise e
#         except stripe.error.SignatureVerificationError as e:
#             # Invalid signature
#             raise e
#
#         # Handle the event
#         if event['type'] == 'payment_intent.succeeded':
#             payment_intent = event['data']['object']
#             print(payment_intent)
#         # ... handle other event types
#         else:
#             print('Unhandled event type {}'.format(event['type']))
#
#         return Response(status=status.HTTP_200_OK)


class DeliveryListView(generics.ListAPIView):
    queryset = Delivery.objects.all().order_by("-id")
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
