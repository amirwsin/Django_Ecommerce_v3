from django.contrib import admin
from .models import Category, Product, Brand, ProductType, ProductInventory, ProductAttribute, ProductAttributeValue, \
    ProductAttributeValues, ProductTypeAttribute, Media, Stock
from mptt.admin import MPTTModelAdmin
import nested_admin


# Register your models here.


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute


class ProductAttributeValueInline(admin.TabularInline):
    model = ProductAttributeValue


@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    inlines = [
        ProductAttributeValueInline
    ]


class ProductTypeAttributeInline(admin.TabularInline):
    model = ProductTypeAttribute


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    inlines = [ProductTypeAttributeInline]


class ProductStockInline(nested_admin.NestedStackedInline):
    model = Stock


class MediaInline(nested_admin.NestedTabularInline):
    model = Media


class ProductAttributeValuesInline(nested_admin.NestedTabularInline):
    model = ProductAttributeValues


class ProductInventoryLinkInline(nested_admin.NestedStackedInline):
    model = ProductInventory
    inlines = [ProductAttributeValuesInline,MediaInline, ProductStockInline]


@admin.register(Product)
class ProductAdmin(nested_admin.NestedModelAdmin):
    inlines = [ProductInventoryLinkInline]


admin.site.register(Brand)
# admin.site.register(ProductAttributeValues)
admin.site.register(Category, MPTTModelAdmin)
