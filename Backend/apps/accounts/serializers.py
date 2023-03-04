from django.forms import HiddenInput
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from apps.accounts.models import Customer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

## Validators For Serializers
def username_password_close(username:str, password:str):
    """username and password are too similar check"""
    ALLOWED_AMOUNT = 5
    same_count = sum([1 for x in zip(username, password) if x[0]==x[1]])
    if ALLOWED_AMOUNT < same_count:
        raise serializers.ValidationError('Username and Password are too similar')

def email_validate(value:str):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    if not re.fullmatch(regex, value):
        raise serializers.ValidationError('Not a valid email address')
        
def password_validate(value:str): 
    regex = re.compile(r'^(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
    if not re.fullmatch(regex, value):
        raise serializers.ValidationError('Not a valid password')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # token['username'] = user.username
        token['full_name'] = user.first_name + ' ' + user.last_name
        return token


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name','username','password']
        # read_only_fields = ['account_name']
        extra_kwargs = {
            'username': {'validators': [email_validate]},# username is and Email
            'password': {'validators': [password_validate],'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
            }
        write_only_fields = ['password']
    def validate(self, attrs):
        
        username_password_close(attrs['username'], attrs['password'])
        return super().validate(attrs) 

    # def save(self,*args,**kwargs):
    #     super().save(*args,**kwargs)
        
    def create(self, validated_data):
        try:
            user = User.objects.create_user(email=validated_data['username'], **validated_data)
            Customer.objects.create(user=user,
                    first_name=validated_data['first_name'],
                    last_name=validated_data['last_name'])
            return user
        except Exception as e:
            raise serializers.ValidationError(e)
            
    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.created = validated_data.get('created', instance.created)
    #     return instance


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