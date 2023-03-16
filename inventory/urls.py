from django.urls import path
from .views import BasicProductView, BasicCategoriesView,BasicBrandsView,BasicProductBySlugView

app_name = 'inventoryApi'

urlpatterns = [
    path("products", BasicProductView.as_view(), name="products"),
    path("products/<slug:slug>/", BasicProductBySlugView.as_view(), name="productBySlug"),
    path("categories/", BasicCategoriesView.as_view(), name="categories"),
    path("brands/", BasicBrandsView.as_view(), name="brands"),
]
