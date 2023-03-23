from .models import ProductInventory,Stock
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=ProductInventory)
def create_product_stock(sender, instance, created, **kwargs):
    if created:
        Stock.objects.create(product_inventory=instance)
