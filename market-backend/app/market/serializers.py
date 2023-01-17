from rest_framework import serializers

from core.models import Address, Unit, Category, \
                        Product, OrderItem, Order


class AddressSerializer(serializers.ModelSerializer):
    """Serializer for address objects"""

    class Meta:
        model = Address
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, attrs):
        if attrs == '' or attrs is None:
            raise serializers.ValidationError('name field is required.')
        return attrs


class UnitSerializer(serializers.ModelSerializer):
    """Serializer for unit objects"""

    class Meta:
        model = Unit
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, attrs):
        if attrs == '' or attrs is None:
            raise serializers.ValidationError('name field is required.')
        if Unit.objects.filter(name=attrs).exists():
            raise serializers.ValidationError('this name is exist.')
        return attrs


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category objects"""

    class Meta:
        model = Category
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, attrs):
        if attrs == '' or attrs is None:
            raise serializers.ValidationError('name field is required.')
        if Category.objects.filter(name=attrs).exists():
            raise serializers.ValidationError('this name is exist.')
        return attrs


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for Product objects"""
    category = serializers.SlugRelatedField(
        many=True,
        queryset=Category.objects.all(),
        slug_field='name'
    )
    unit = serializers.SlugRelatedField(
        queryset=Unit.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Product
        fields = (
            'id', 'category', 'unit', 'name', 'price',
            'short_desc', 'long_desc', 'image',
        )
        read_only_field = ('id',)


class OrderItemSerializer(serializers.ModelSerializer):
    """Serializer for OrderItem object."""

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializerCreate(serializers.ModelSerializer):
    """Serializer for Order object"""
    products = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['delivery', 'note', 'address', 'products', 'price']
        read_only_field = ('user', 'id',)

    def create(self, validated_data):
        products_data = validated_data.pop('products')
        order = Order.objects.create(**validated_data)
        for product_data in products_data:
            OrderItem.objects.create(order=order, **product_data)
        return order
