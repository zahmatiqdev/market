from rest_framework import serializers

from core.models import Address


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ('id', 'name',)
        read_only_fields = ('id',)

    def validate_name(self, attrs):
        if attrs == '' or attrs is None:
            raise serializers.ValidationError('name field is required.')
        return attrs
