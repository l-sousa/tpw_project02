from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_api.serializers import *
from rest_api.models import *

# Create your views here.

'''
    PRODUCTS
'''
# web service to get a specific product
@api_view(['GET'])
def get_product(request):
    id = int(request.GET['id'])
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

# web service to get a list of products
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        products = products[:num]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# web service to create a product
@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to update a product
@api_view(['PUT'])
def update_product(request):
    id = request.data['id']
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to delete a product
@api_view(['DELETE'])
def del_product(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)