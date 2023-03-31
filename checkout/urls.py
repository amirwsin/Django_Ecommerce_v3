from django.urls import path
from .views import CartView, DeliveryListView, StripePaymentView, StripeWebHook, OrderListView,OrderDetailView

app_name = "checkoutApi"

urlpatterns = [
    path("cart/<int:pk>/", CartView.as_view(), name="getUserCart"),
    path("delivery/", DeliveryListView.as_view(), name="deliveryList"),
    path("orders/", OrderListView.as_view(), name="OrderList"),
    path("orders/<int:pk>/", OrderDetailView.as_view(), name="OrderById"),
    path("payment/", StripePaymentView.as_view()),
    path("webhook", StripeWebHook, )
]
