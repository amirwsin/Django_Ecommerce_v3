from django.urls import path
from .views import UsersView, ProductsView
from rest_framework.routers import SimpleRouter

app_name = 'cmsApi'

router = SimpleRouter()
router.register(r'users', UsersView)
router.register(r'products', ProductsView)
#
# urlpatterns = [
#     path('users/', UsersView.as_view(), name="userApi")
# ]

urlpatterns = router.urls
