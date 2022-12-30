from rest_framework import serializers

from core.models import Address, Unit, Category


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
