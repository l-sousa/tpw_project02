from rest_api.models import *
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def save(self):
        user = User(username=self.validated_data['username'],
                    is_manager=self.validated_data['is_manager'],
                    is_customer=self.validated_data['is_customer']
                    )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user',)


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('user',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'category')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'category',
                  'brand', 'price', 'quantity', 'image')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # fields = ('id', 'client', 'order_date', 'products', 'is_complete')
        fields = ('id', 'order_date', 'products', 'is_complete')
