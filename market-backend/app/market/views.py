from rest_framework import mixins, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Address, Unit, Category, Product

from market import serializers


class AddressCreateListAPIView(mixins.CreateModelMixin,
                               generics.ListAPIView):
    """Manage Create & List Address in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Address.objects.all()
    serializer_class = serializers.AddressSerializer

    def get_queryset(self):
        """Returns objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Manage Detail, Update & Delete Address in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Address.objects.all()
    serializer_class = serializers.AddressSerializer

    def get_queryset(self):
        """Returns objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class UnitCreateListAPIView(mixins.CreateModelMixin,
                            generics.ListAPIView):
    """Manage Create & List Unit in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Unit.objects.all()
    serializer_class = serializers.UnitSerializer

    def get_queryset(self):
        """Returns objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UnitDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Manage Detail, Update & Delete Unit in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Unit.objects.all()
    serializer_class = serializers.UnitSerializer

    def get_queryset(self):
        """Returns objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class CategoryCreateListAPIView(mixins.CreateModelMixin,
                                generics.ListAPIView):
    """Manage Create & List Category in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Manage Detail, Update & Delete Category in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer


class ProductCreateAPIView(generics.CreateAPIView):
    """Manage Create Product for Authenticated user in database"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer


class ProductListAPIView(generics.ListAPIView):
    """Manage List Product in database"""

    permission_classes = ()
    authentication_classes = ()
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            qs = qs.filter(name__icontains=query)
        return qs


class ProductDetailAPIView(generics.RetrieveAPIView):
    """Manage Detail Product in database"""

    permission_classes = ()
    authentication_classes = ()
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    lookup_field = 'id'
