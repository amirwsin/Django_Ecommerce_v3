from django.urls import path
from .views import UsersView
from rest_framework.routers import SimpleRouter

app_name = 'cmsApi'

router = SimpleRouter()
router.register(r'users', UsersView)
#
# urlpatterns = [
#     path('users/', UsersView.as_view(), name="userApi")
# ]

urlpatterns = router.urls
