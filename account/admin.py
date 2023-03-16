from django.contrib import admin
from .models import Address, Wallet, WishList

# Register your models here.

admin.site.register(Wallet)
admin.site.register(WishList)
admin.site.register(Address)
