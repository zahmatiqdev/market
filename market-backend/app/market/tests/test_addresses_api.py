from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Address

from market.serializers import AddressSerializer


ADDRESSES_URL = reverse('market:address-list-create')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicAddressesTests(TestCase):
    """Test the publicly available addresses API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test the login is required for retrieving addresses"""
        res = self.client.get(ADDRESSES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAddressesTests(TestCase):
    """Test the authorized user addresses API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email="test@gmail.com",
            password='test123456'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_create_valid_addresses(self):
        """Test creating valid addresses"""
        payload = {'name': 'Teheran, Iran'}
        res = self.client.post(ADDRESSES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_retrieve_addresses(self):
        """Test retrieving addresses"""
        Address.objects.create(user=self.user, name='Teheran,Iran')
        Address.objects.create(user=self.user, name='Shiras,Iran')

        res = self.client.get(ADDRESSES_URL)

        addresses = Address.objects.all().order_by('-name')
        serializer = AddressSerializer(addresses, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_invalid_addresses(self):
        """Test creating invalid addresses"""
        payload = {'name': ''}
        res = self.client.post(ADDRESSES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
