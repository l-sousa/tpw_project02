from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return str(self.name)


class Brand(models.Model):
    name = models.CharField(max_length=70)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return str(self.name)


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    category = models.ManyToManyField(Category)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    quantity = models.DecimalField(max_digits=3, default=0, decimal_places=0)
    image = models.URLField()

    def __str__(self):
        return str(self.name)


class Order(models.Model):
    # client = models.ForeignKey(Client, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product)
    is_complete = models.BooleanField(default=False)

    def total(self):
        return sum([p.price for p in self.products.all()])
