# Generated by Django 4.1.5 on 2023-03-27 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0008_product_is_recommend_product_is_special'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(blank=True, help_text='format : required', null=True, verbose_name='product description'),
        ),
    ]
