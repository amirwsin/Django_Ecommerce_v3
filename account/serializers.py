from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Wallet, WishList, Address


class BasicWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = "__all__"


class BasicWishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = "__all__"


class BasicAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class BasicUserSerializer(serializers.ModelSerializer):
    wallet = serializers.SerializerMethodField()

    class Meta:
        model = User
        # fields = "__all__"
        exclude = ['password']

    def get_wallet(self, obj):
        wallet = Wallet.objects.get(user=obj)
        return BasicWalletSerializer(wallet, many=False, read_only=True, context=self.context).data


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "password", "email"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )

        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name"]
        read_only_fields = ('date_created', 'date_modified', 'username')
