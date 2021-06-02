from rest_api.models import Category, Brand, Product, Order
from rest_framework import serializers

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
        fields = ('id', 'name', 'description', 'category', 'brand', 'price', 'quantity', 'image')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        # fields = ('id', 'client', 'order_date', 'products', 'is_complete')
        fields = ('id', 'order_date', 'products', 'is_complete')