from rest_framework import serializers

from rest_api.models import Customer, Manager, User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def save(self):
        user = User(username=self.validated_data['username'],
                    is_manager=self.validated_data['is_manager'],
                    is_customer=self.validated_data['is_customer']
                    )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user',)


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('user',)
