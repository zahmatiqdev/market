from datetime import date

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@gmail.com', password='test123456'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


def sample_unit(user, name):
    """Create a sample unit without fix data"""
    return models.Unit.objects.create(user=user, name=name)


def sample_category(name):
    """Create a sample category"""
    return models.Category.objects.create(name=name)


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

    def test_address_str(self):
        """Test the address string representation"""
        address = models.Address.objects.create(
            user=sample_user(),
            name='Teheran, Iran'
        )

        self.assertEqual(str(address), address.name)

    def test_category_str(self):
        """Test the category string representation"""
        category = models.Category.objects.create(
            name='Asian Product'
        )

        self.assertEqual(str(category), category.name)

    def test_product_item(self):
        """Test the product item to representation"""
        user = sample_user()
        product = models.Product.objects.create(
            unit=sample_unit(user=user, name='Piece'),
            name='Tee',
            price=11,
            short_desc='1 Pack',
            long_desc='this is long description',
            image=''
        )
        category_1 = sample_category('Asian Product')
        category_2 = sample_category('Euro Product')

        product.category.set([category_1, category_2])

        self.assertEqual(product.category.count(), 2)
        self.assertEqual(str(product), product.name)

    def test_oder_str(self):
        """Test the order to create one order"""
        user = sample_user()
        address = models.Address.objects.create(
            user=user,
            name='Teheran, Iran'
        )
        models.Order.objects.create(
            user=user,
            address=address,
            delivery=date(year=2022, month=2, day=1),
            note='high quality'
        )

        current_oder = models.Order.objects.filter(
            note='high quality'
        ).exists()
        self.assertTrue(current_oder)
