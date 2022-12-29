from rest_framework import serializers

from core.models import Address, Unit


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
        return attrs
