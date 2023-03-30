from django.urls import path
from .views import CartView, DeliveryListView, StripePaymentView,StripeWebHook

app_name = "checkoutApi"

urlpatterns = [
    path("cart/<int:pk>/", CartView.as_view(), name="getUserCart"),
    path("delivery/", DeliveryListView.as_view(), name="deliveryList"),
    path("payment/", StripePaymentView.as_view()),
    path("webhook", StripeWebHook,)
]
