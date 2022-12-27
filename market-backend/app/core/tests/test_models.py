from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@gmail.com', password='test123456'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


class ModelTests(TestCase):
    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email successful"""
        email = 'test@app.com'
        password = 'Testpass123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@GMAIL.COM'
        user = get_user_model().objects.create_user(
            email=email,
            password='test12345'
        )

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test@gmail.com')

    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@gmail.com',
            'test12345'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_unit_str(self):
        """Test the unit string representation"""
        unit = models.Unit.objects.create(
            user=sample_user(),
            name='kg'
        )

        self.assertEqual(str(unit), unit.name)
