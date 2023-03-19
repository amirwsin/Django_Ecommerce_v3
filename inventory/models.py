from django.db import models
from mptt.models import TreeForeignKey, MPTTModel, TreeManyToManyField
from django.utils.translation import gettext_lazy as _


# Create your models here.

class Category(MPTTModel):
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        unique=False,
        verbose_name=_("category name"),
        help_text=_("format : required , max-255")
    )
    slug = models.SlugField(
        max_length=300,
        blank=False,
        null=False,
        unique=False,
        verbose_name=_("category safe url"),
        help_text=_("format : required , letters, numbers , underscore or hyphens"),
    )
    image = models.ImageField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("category image"),
        upload_to="images/categories/",
        default="images/categories/default.png",
        help_text=_("format : required , default-default.png"),
    )
    is_active = models.BooleanField(default=True)
    parent = TreeForeignKey(
        "self",
        on_delete=models.SET_NULL,
        related_name="children",
        null=True,
        blank=True,
        unique=False,
        verbose_name=_("parent of category"),
        help_text=_("format : not required")
    )

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name = _("product category")
        verbose_name_plural = _("product categories")

    def __str__(self):
        return self.name


class Product(models.Model):
    web_id = models.CharField(
        max_length=50,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("product website ID"),
        help_text=_("format : required , unique")
    )
    slug = models.SlugField(
        max_length=255,
        blank=False,
        null=False,
        unique=False,
        verbose_name=_("product safe url"),
        help_text=_("format : required , letters, numbers , underscore or hyphens"),
    )
    name = models.CharField(
        max_length=255,
        unique=False,
        blank=False,
        null=False,
        verbose_name=_("product name"),
        help_text=_("format : required , max-255")
    )
    description = models.TextField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product description"),
        help_text=_("format : required"),
    )
    category = TreeForeignKey(Category,on_delete=models.SET_NULL,null=True,blank=True)
    is_active = models.BooleanField(
        unique=False,
        null=False,
        blank=False,
        default=True,
        verbose_name=_("product visibility"),
        help_text=_("format : true=product visible")
    )
    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date product created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date product last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class ProductAttribute(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("product attribute name"),
        help_text=_("format : required , unique , max-255")
    )
    description = models.TextField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product attribute description"),
        help_text=_("format : required"),
    )

    def __str__(self):
        return self.name


class ProductType(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("type of product"),
        help_text=_("format: required, unique,max-255")
    )

    product_type_attribute = models.ManyToManyField(
        ProductAttribute,
        related_name="product_type_attribute",
        through="ProductTypeAttribute",
    )

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("brand name"),
        help_text=_("format: required, unique,max-255")
    )

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


class ProductAttributeValue(models.Model):
    product_attribute = models.ForeignKey(
        ProductAttribute,
        related_name="product_attribute",
        on_delete=models.CASCADE
    )
    attribute_value = models.CharField(
        max_length=255,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("attribute value"),
        help_text=_("format : text or numbers , required , max-255")
    )

    def __str__(self):
        return f"{self.product_attribute.name} : {self.attribute_value}"


class ProductInventory(models.Model):
    sku = models.CharField(
        max_length=20,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("stock keeping unit"),
        help_text=_("format : required , unique, max-20"),
    )
    upc = models.CharField(
        max_length=12,
        unique=True,
        null=False,
        blank=False,
        verbose_name=_("universal product code"),
        help_text=_("format : required , unique , max-12")
    )
    product_type = models.ForeignKey(
        ProductType, related_name="product_type", on_delete=models.SET_NULL, null=True, blank=True,
    )
    product = models.OneToOneField(
        Product, related_name="product", on_delete=models.CASCADE, null=True, blank=True,
    )
    brand = models.ForeignKey(
        Brand, related_name="brand", on_delete=models.SET_NULL, null=True, blank=True,
    )
    attribute_values = models.ManyToManyField(
        ProductAttributeValue,
        related_name="product_attribute_values",
        through="ProductAttributeValues",
    )
    is_active = models.BooleanField(
        unique=False,
        null=False,
        blank=False,
        default=True,
        verbose_name=_("product visibility"),
        help_text=_("format : true=product visible")
    )
    is_default = models.BooleanField(
        null=False,
        blank=False,
        default=True,
        verbose_name=_("default selection"),
        help_text=_("format : true=subproduct visible")
    )
    retail_price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("recommended retail price"),
        help_text=_("format : maximum price 999.99"),
        error_messages={
            "name": {
                "max_length": _("the price must be between 0 and 999.99"),
            },
        },
    )
    store_price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("regular store price"),
        help_text=_("format : maximum price 999.99"),
        error_messages={
            "name": {
                "max_length": _("the price must be between 0 and 999.99"),
            },
        },
    )
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
    weight = models.FloatField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product weight")
    )

    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date product created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date product last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    def __str__(self):
        return f"{self.id} : {self.product.name}"


class Media(models.Model):
    product_inventory = models.ForeignKey(
        ProductInventory,
        on_delete=models.CASCADE,
        related_name="media_product_inventory"
    )

    image = models.ImageField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product image"),
        upload_to="images/products/",
        default="images/products/default.png",
        help_text=_("format : required , default-default.png"),
    )

    alt_text = models.CharField(
        max_length=255,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("alternative text"),
        help_text=_("format : required , max-255"),
    )
    is_feature = models.BooleanField(
        default=False,
        verbose_name=_("product default image"),
        help_text=_("format : default=false , true = default image")
    )
    create_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date product created"),
        help_text=_("format : y-m-d H:M:S")
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date product last updated"),
        help_text=_("format : y-m-d H:M:S")
    )

    class Meta:
        verbose_name = _("product image")
        verbose_name_plural = _("product images")


class Stock(models.Model):
    product_inventory = models.OneToOneField(
        ProductInventory,
        on_delete=models.CASCADE,
        related_name="product_inventory"
    )
    last_checked = models.DateTimeField(
        unique=False,
        null=True,
        blank=True,
        verbose_name=_("inventory stock check date"),
        help_text=_("format : y-d-m H:N:S , null-true , blank-true")
    )
    units = models.IntegerField(
        default=0,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("units/qty of stock"),
        help_text=_("format : required , default-0")
    )
    units_sold = models.IntegerField(
        default=0,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("units sold to date"),
        help_text=_("format : required , default-0")
    )


class ProductAttributeValues(models.Model):
    attributevalues = models.ForeignKey(
        "ProductAttributeValue",
        related_name="attributevaluess",
        on_delete=models.CASCADE
    )
    productinventory = models.ForeignKey(
        ProductInventory,
        related_name="productattributevaluess",
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (("attributevalues", "productinventory"),)

    def __str__(self):
        return f"{self.productinventory.id} - {self.productinventory.product.name} - {self.attributevalues.product_attribute} : {self.attributevalues.attribute_value} "


class ProductTypeAttribute(models.Model):
    product_attribute = models.ForeignKey(
        ProductAttribute,
        related_name="productattribute",
        on_delete=models.CASCADE
    )
    product_type = models.ForeignKey(
        ProductType,
        related_name="producttype",
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (("product_attribute", "product_type"),)
