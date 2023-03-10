import uuid
import os

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin
from django.conf import settings


def app_image_file_path(instance, filename):
    """Generate file path for new app image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/app/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address.')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Unit(models.Model):
    """Unit model to define types of measurement units"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Address(models.Model):
    """Address model to get user addresses"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.TextField()

    def __str__(self):
        return self.name


class Category(models.Model):
    """Category model to set category for each product"""
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Product model to define fruit products"""
    category = models.ManyToManyField(Category, related_name='categories')
    unit = models.ForeignKey(Unit, on_delete=models.PROTECT)
    name = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    short_desc = models.CharField(max_length=250, blank=True)
    long_desc = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, upload_to=app_image_file_path)

    def __str__(self):
        return self.name


class ProductPrice(models.Model):
    """Product Price to save history of Products price"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Product{self.product}"


class Order(models.Model):
    """Order model to define an order"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    delivery = models.DateField(blank=True, null=True)
    note = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"Order{self.pk}"


class OrderItem(models.Model):
    """OrderItem model to define the items of each order"""
    order = models.ForeignKey(
        Order,
        related_name='products',
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product}-{self.quantity}"
