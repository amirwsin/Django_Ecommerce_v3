# Generated by Django 4.1.5 on 2023-03-20 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_alter_product_options_remove_product_category_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productinventory',
            name='attribute_values',
            field=models.ManyToManyField(blank=True, null=True, related_name='product_attribute_values', through='inventory.ProductAttributeValues', to='inventory.productattributevalue'),
        ),
    ]
