from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_api.serializers import *
from rest_api.models import *
from rest_framework.permissions import AllowAny

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


'''
    CATEGORIES
'''
# web service to get a specific category


@api_view(['GET'])
def get_category(request):
    id = int(request.GET['id'])
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category)
    return Response(serializer.data)

# web service to get a list of categories


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        categories = categories[:num]
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

# web service to create a category


@api_view(['POST'])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to update a category


@api_view(['PUT'])
def update_category(request):
    id = request.data['id']
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to delete a category


@api_view(['DELETE'])
def del_category(request, id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


'''
    BRANDS
'''
# web service to get a specific brand


@api_view(['GET'])
def get_brand(request):
    id = int(request.GET['id'])
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BrandSerializer(brand)
    return Response(serializer.data)

# web service to get a list of brands


@api_view(['GET'])
def get_brands(request):
    brands = Brand.objects.all()
    if 'num' in request.GET:
        num = int(request.GET['num'])
        brands = brands[:num]
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)

# web service to create a brand


@api_view(['POST'])
def create_brand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to update a brand


@api_view(['PUT'])
def update_brand(request):
    id = request.data['id']
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = BrandSerializer(brand, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to delete a brand


@api_view(['DELETE'])
def del_brand(request, id):
    try:
        brand = Brand.objects.get(id=id)
    except Brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    brand.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


'''
    ORDERS
'''
# web service to get a specific order


@api_view(['GET'])
def get_order(request):
    id = int(request.GET['id'])
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data)

# web service to get a list of orders, for a given user


@api_view(['GET'])
def get_userorders(request):
    user_id = int(request.GET['user_id'])
    try:
        orders = Order.objects.get(user_id=user_id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# web service to create a order


@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to update a order


@api_view(['PUT'])
def update_order(request):
    id = request.data['id']
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# web service to delete a order


@api_view(['DELETE'])
def del_order(request, id):
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):

    req_data = request.data
    user = User.objects.create(is_customer=True)
    req_data['user'] = user.pk

    if req_data['user_type'] == "customer":
        serializer = CustomerSerializer(data=req_data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if req_data['user_type'] == "manager":
        serializer = ManagerSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
