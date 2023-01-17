from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Category, Unit


PRODUCTS_LIST_URL = reverse('market:product-list')
PRODUCTS_CREATE_URL = reverse('market:product-create')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def create_unit(user, name):
    """Create a sample unit"""
    return Unit.objects.create(user=user, name=name)


def create_category(name):
    """Create a sample category"""
    return Category.objects.create(name=name)


class PublicProductsAPITests(TestCase):
    """Test the publicly available products API"""

    def setUp(self):
        self.client = APIClient()

    def test_retrieving_products_successful(self):
        """Test retrieving products for all user & visitor"""
        res = self.client.get(PRODUCTS_LIST_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_login_required(self):
        """Test the login is required for creating products"""
        payload = {}
        res = self.client.get(PRODUCTS_CREATE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateProductsAPITests(TestCase):
    """Test the authorized user products API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='test@gmail.com',
            password='test12345'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_create_valid_products(self):
        """Test creating valid products"""
        cate1 = create_category('Fruit')
        cate2 = create_category('Vegetables')

        unit = create_unit(user=self.user, name='Kg')

        payload = {
            "category": [cate1, cate2],
            "unit": unit,
            "name": "Tomato",
            "price": "112.00",
            "short_desc": "short text",
            "long_desc": "long"
        }
        res = self.client.post(PRODUCTS_CREATE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
