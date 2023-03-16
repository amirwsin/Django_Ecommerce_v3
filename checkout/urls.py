from django.urls import path
from .views import CartView, DeliveryListView

app_name = "checkoutApi"

urlpatterns = [
    path("cart/<int:pk>/", CartView.as_view(), name="getUserCart"),
    path("delivery/", DeliveryListView.as_view(), name="deliveryList"),
]
