from django.urls import path
from .views import UsersView, ProductsView, MediaView,CategoriesView
from rest_framework.routers import SimpleRouter

app_name = 'cmsApi'

router = SimpleRouter()
router.register(r'users', UsersView)
router.register(r'products', ProductsView)
router.register(r'media', MediaView)
router.register(r'categories', CategoriesView)
#
# urlpatterns = [
#     path('users/', UsersView.as_view(), name="userApi")
# ]

urlpatterns = router.urls
