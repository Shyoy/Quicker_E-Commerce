from django.forms import HiddenInput
from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Customer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
 
#         # Add custom claims
#         token['username'] = user.username
#         # ...
 
#         return token

class CustomerSerializer(serializers.Serializer):
    
    email = serializers.EmailField(max_length=50)
    password = serializers.CharField(write_only=True, max_length=18)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)

    def save(self, *args, **kwargs):
        user = User(username=self.email, email=self.email,password=self.password)
        user = user.save()
        customer = User(user=self.user,
                         first_name=self.first_name,
                         last_name=self.last_name)
        customer.save()