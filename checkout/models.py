from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from inventory.models import Product, ProductAttributeValue
from account.models import Address

# Create your models here.

STATUS_CHOICES = (
    ('UNCONFIRMED','UnConfirmed'),
    ("PENDING", "Pending"),
    ("FAILED", "Failed"),
    ("PROCESSING", "Processing"),
    ("COMPLETED", "Completed"),
)

STATUS_PAYMENT_CHOICES = (
    ("PENDING", "Pending"),
    ("UNCOMPLETED", "UnCompleted"),
    ("COMPLETED", "Completed"),
)


class Cart(models.Model):
    user = models.OneToOneField(User, blank=False, null=False, related_name="user_cart",
                                verbose_name=_("user cart"), on_delete=models.CASCADE)
    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date order created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date order last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return self.user.username

    def get_price(self):
        items = CartItem.objects.filter(cart_id=self.id)
        price = 0
        for x in items:
            price += x.product.product.sale_price * x.qty
        return price


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, blank=False, null=False, unique=False, related_name="cart_item",
                             verbose_name=_("cart item"), on_delete=models.CASCADE)

    product = models.ForeignKey(Product, related_name="cart_item_product", verbose_name=_("cart item product"),
                                on_delete=models.CASCADE, blank=False, null=False, unique=False)
    variants = models.ManyToManyField(ProductAttributeValue, blank=False,
                                      verbose_name=_("product variants"),
                                      help_text=_("format : selected variants for cart"))
    qty = models.IntegerField(default=1, verbose_name=_("quantity of product"), blank=False, null=False)
    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date order created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date order last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return str(self.cart)


class Delivery(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, verbose_name=_("delivery name"),
                            help_text=_("format : max-255"))

    image = models.ImageField(
        unique=False,
        null=True,
        blank=True,
        verbose_name=_("delivery image"),
        upload_to="images/delivery/",
        default="images/delivery/default.png",
        help_text=_("format : required , default-default.png"),
    )

    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("price of delivery"),
        help_text=_("format : maximum amount 99999.99"),
        error_messages={
            "name": {
                "max_length": _("the amount must be between 0 and 99999.99"),
            },
        },
    )
    max_weight = models.FloatField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("maximum weight")
    )
    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date payment created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date payment last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, blank=False, unique=False, null=False, related_name="user_order",
                             verbose_name=_("user order"),
                             on_delete=models.CASCADE)

    address = models.ForeignKey(Address, blank=True, null=True, related_name="address_order",
                                verbose_name=_("delivery address"),
                                on_delete=models.SET_NULL)
    delivery = models.ForeignKey(Delivery, blank=True, null=True, related_name="delivery_order",
                                 verbose_name=_("delivery method"),
                                 on_delete=models.SET_NULL)

    status = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("order status"),
                              choices=STATUS_CHOICES, default="UNCONFIRMED",
                              help_text=_(
                                  "format : Pending = Order received, no payment initiated , Failed = Payment failed or was declined (unpaid) , Processing =  Payment received (paid) and stock has been reduced; order is awaiting fulfillment , Completed = Order fulfilled and complete"))

    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date order created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date order last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return f"{self.id} : {self.user} - {self.status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="order_item", on_delete=models.CASCADE, verbose_name=_("order"),
                              blank=False, null=False, unique=False)
    product = models.ForeignKey(Product, related_name="order_item_product", verbose_name=_("order item product"),
                                on_delete=models.CASCADE, blank=False, null=False, unique=False)
    sale_price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("sale price"),
        help_text=_("format : maximum price 999.99"),
        error_messages={
            "name": {
                "max_length": _("the price must be between 0 and 999.99"),
            },
        },
    )
    variants = models.ManyToManyField(ProductAttributeValue, blank=False,
                                      verbose_name=_("product variants"),
                                      help_text=_("format : selected variants for order"))
    qty = models.IntegerField(default=1, verbose_name=_("quantity of product"), blank=False, null=False)

    def __str__(self):
        return f"{self.order} : {self.product}"


class OrderPayment(models.Model):
    order = models.ForeignKey(Order, related_name="order_item_payment", on_delete=models.CASCADE,
                              verbose_name=_("order"),
                              blank=False, null=False, unique=False)
    user = models.ForeignKey(User, blank=True, unique=False, null=True, related_name="user_history_payment",
                             verbose_name=_("user order"),
                             on_delete=models.CASCADE)
    payment_intent = models.CharField(max_length=255, null=True, blank=True, unique=True)
    client_secret = models.CharField(max_length=255, null=True, blank=True, unique=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    amount = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("amount have to pay"),
        help_text=_("format : maximum amount 99999.99"),
        error_messages={
            "name": {
                "max_length": _("the amount must be between 0 and 99999.99"),
            },
        },
    )
    status = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("payment status"),
                              choices=STATUS_PAYMENT_CHOICES, default="PENDING",
                              help_text=_(
                                  "format : Pending = waiting for payment , UnCompleted = payed a specific amount or half , Completed = payment fullfilled and complete"))

    gateway = models.CharField(max_length=255, null=False, blank=False, verbose_name=_("payment method"),
                               help_text=_("format : credit,debit,mastercard,paypal...etc"))

    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date payment created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date payment last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return f"{self.user} : {self.payment_intent}"
