from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Category

from market.serializers import CategorySerializer


Categories_URL = reverse('market:category-list-create')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicCategoriesAPITests(TestCase):
    """Test the publicly available categories API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test the login is required for retrieving categories"""
        res = self.client.get(Categories_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateCategoriesAPITests(TestCase):
    """Test the authorized user categories API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="test@gmail.com",
            password='test123456'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_create_valid_categories(self):
        """Test creating valid categories"""
        payload = {'name': 'Fruit'}
        res = self.client.post(Categories_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_retrieve_categories(self):
        """Test retrieving categories"""
        Category.objects.create(name='Vegetables')
        Category.objects.create(name='Fruit')

        res = self.client.get(Categories_URL)

        categories = Category.objects.all().order_by('-name')
        serializer = CategorySerializer(categories, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_invalid_categories(self):
        """Test creating invalid categories"""
        payload = {'name': ''}
        res = self.client.post(Categories_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
