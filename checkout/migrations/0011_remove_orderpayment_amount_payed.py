# Generated by Django 4.1.5 on 2023-03-30 18:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0010_alter_order_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderpayment',
            name='amount_payed',
        ),
    ]
