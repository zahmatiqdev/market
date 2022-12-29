from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Unit

from market.serializers import UnitSerializer


UNITS_URL = reverse('market:unit-list-create')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUnitsAPITests(TestCase):
    """Test the publicly available units API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test the login is required for retrieving units"""
        res = self.client.get(UNITS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUnitsAPITests(TestCase):
    """Test the authorized user units API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='test@gmail.com',
            password='test12345'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_create_valid_units(self):
        """Test creating valid units"""
        payload = {'name': 'kg'}
        res = self.client.post(UNITS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_retrieve_units(self):
        """Test retrieving units"""
        Unit.objects.create(user=self.user, name='kg')
        Unit.objects.create(user=self.user, name='gram')

        res = self.client.get(UNITS_URL)

        units = Unit.objects.all().order_by('-name')
        serializer = UnitSerializer(units, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_invalid_units(self):
        """Test creating invalid units"""
        payload = {'name': ''}
        res = self.client.post(UNITS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
