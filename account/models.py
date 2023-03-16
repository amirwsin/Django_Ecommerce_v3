from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from inventory.models import Product


# Create your models here.


class Wallet(models.Model):
    user = models.OneToOneField(User, related_name="user_wallet", blank=False, unique=True, null=False,
                                help_text=_("format : user that wallet belong to ,unique"),
                                verbose_name=_("user wallet"), on_delete=models.CASCADE)
    amount = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        default=0,
        verbose_name=_("amount of credit"),
        help_text=_("format : maximum amount 9999.99"),
        error_messages={
            "name": {
                "max_length": _("the amount must be between 0 and 9999.99"),
            },
        },
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date wallet last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return f"{self.user} : {self.amount}"


class WishList(models.Model):
    user = models.ForeignKey(User, related_name="user_wishlist", blank=False, unique=False, null=False,
                             verbose_name=_("user wishlist"), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="user_wishlist_product", blank=False, null=False, unique=False,
                                verbose_name=_("user wishlist product"), on_delete=models.CASCADE)
    create_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("date wishlist created"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return f"{self.user} : {self.product.name}"


class Address(models.Model):
    user = models.ForeignKey(User, related_name="user_address", blank=False, unique=False, null=False,
                             verbose_name=_("user address"), on_delete=models.CASCADE)
    contact_name = models.CharField(max_length=255, blank=False, null=False, verbose_name=_("contact person name"),
                                    help_text=_("format : max-255"))
    street = models.TextField()
    apartment = models.TextField()
    city = models.CharField(max_length=255, blank=False, null=False, verbose_name=_(" city & state name"),
                            help_text=_("format : max-255"))
    zip_code = models.CharField(max_length=15, blank=True, null=True, verbose_name=_("zip code"))
    contact_phone = models.CharField(max_length=15, blank=True, null=True,
                                     verbose_name=_("contact person mobile number"))
    is_default = models.BooleanField(default=False, verbose_name=_("default address"),
                                     help_text=_("format : true = default address for orders"))

    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date address created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date address last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return self.user.username
