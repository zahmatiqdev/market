from rest_framework import serializers

from core.models import Address, Unit, Category, Product


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
