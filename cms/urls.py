from django.urls import path
from .views import UsersView, ProductsView, MediaView, CategoriesView, ProductTypesView, BrandsView, \
    ProductAttributeValuesView, ProductAttributeValueView, ProductInventoryView, StockView, ProductTypeAttributeView, \
    ProductAttributeView
from rest_framework.routers import SimpleRouter

app_name = 'cmsApi'

router = SimpleRouter()
router.register(r'users', UsersView)
router.register(r'products', ProductsView)
router.register(r'product_inventory', ProductInventoryView)
router.register(r'media', MediaView)
router.register(r'categories', CategoriesView)
router.register(r'product_types', ProductTypesView)
router.register(r'product_attribute', ProductAttributeView)
router.register(r'brands', BrandsView)
router.register(r'product_attribute_values', ProductAttributeValuesView)
router.register(r'product_attribute_value', ProductAttributeValueView)
router.register(r'stock', StockView)

urlpatterns = router.urls
