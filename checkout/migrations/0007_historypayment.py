# Generated by Django 4.1.5 on 2023-03-30 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checkout', '0006_order_address_order_delivery'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoryPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_intent', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('client_secret', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('amount', models.IntegerField(verbose_name='amount have to pay')),
                ('currency', models.CharField(blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, choices=[('PENDING', 'Pending'), ('UNCOMPLETED', 'UnCompleted'), ('COMPLETED', 'Completed')], default='PENDING', max_length=255, null=True, verbose_name='payment status')),
                ('create_at', models.DateTimeField(auto_now_add=True, help_text='format : y-m-d H:M:S', verbose_name='date payment created')),
                ('update_at', models.DateTimeField(auto_now=True, help_text='format : y-m-d H:M:S', verbose_name='date payment last updated')),
            ],
        ),
    ]
