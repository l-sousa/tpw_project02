from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_api.models import User
from rest_api.serializers import CustomerSerializer, ManagerSerializer


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

