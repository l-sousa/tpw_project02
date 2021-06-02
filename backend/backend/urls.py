"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from rest_api import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # web services
    path('ws/product', views.get_product),
    path('ws/products', views.get_products),
    path('ws/productcre', views.create_product),
    path('ws/productupd', views.update_product),
    path('ws/productdel/<int:id>', views.del_product),

    path('ws/category', views.get_category),
    path('ws/categories', views.get_categories),
    path('ws/categorycre', views.create_category),
    path('ws/categoryupd', views.update_category),
    path('ws/categorydel/<int:id>', views.del_category),


]
