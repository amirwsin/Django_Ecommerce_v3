from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Wallet


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Wallet.objects.create(user=instance)


@receiver(post_save, sender=User)
def user_group_check_list(sender, instance, created, **kwargs):
    if created:
        if instance.is_staff:
            adminGroup = Group.objects.filter(name="admin")
            if adminGroup:
                adminGroup.first().user_set.add(instance)
        else:
            customerGroup = Group.objects.filter(name="customer")
            if customerGroup:
                customerGroup.first().user_set.add(instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user_wallet.save()
