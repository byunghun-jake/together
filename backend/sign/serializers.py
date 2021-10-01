from django.db import transaction
from django.db.models import fields
from .models import User
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import (
  UserDetailsSerializer, LoginSerializer
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = '__all__'

class UserLoginSerializer(LoginSerializer):

  class Meta:
    model = User
    fields = ['email', 'password',]


class UserRegisterSerializer(RegisterSerializer):
  phone_number = serializers.CharField(max_length=20)
  nick_name = serializers.CharField(max_length=100)
  password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

  class Meta:
    model = User
    fields = ['username', 'email', 'password', 'password2', 'phone_number', 'nick_name',]
    extra_kwarge= {
      'password': {
        'write_only': True
      }
    }
  def save(self, request):
    user = User(
      username = self.validated_data['username'],
      email = self.validated_data['email'],
      nick_name = self.validated_data['nick_name'],
      phone_number = self.validated_data['phone_number'],
    )
    password1 = self.validated_data['password1']
    password2 = self.validated_data['password2']

    if password1 != password2:
      raise serializers.ValidationError({'password': 'Passwords must match.'})
    user.set_password(password1)
    user.save()
    return user


class UserDetailSerializer(UserDetailsSerializer):
  
  class Meta:
    model = User
    fields = (
      'id',
      'email',
      'nick_name',
      'username',
      'phone_number',
    )
    read_only_fields = ('id', 'email','username',)

