# Generated by Django 4.1.5 on 2023-03-20 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_alter_productinventory_attribute_values'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='last_checked',
            field=models.DateTimeField(auto_now=True, help_text='format : y-d-m H:N:S , null-true , blank-true', null=True, verbose_name='inventory stock check date'),
        ),
    ]
