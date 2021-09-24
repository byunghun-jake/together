from django.db import transaction
from .models import CustomUser
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer
from rest_auth.serializers import LoginSerializer

class CustomRegisterSerializer(RegisterSerializer):
  phone_number = serializers.CharField(max_length=30)
  nickname = serializers.CharField(max_length=100)

  @transaction.atomic
  def save(self, request):
    user = super().save(request)
    user.phone_number = self.data.get('phone_number')
    user.nickname = self.data.get('nickname')
    user.save()
    return user

class CustomUserDetailSerializer(UserDetailsSerializer):
  
  class Meta:
    model = CustomUser
    fields = (
      'pk',
      'email',
      'nickname',
      'username',
      'phone_number',
    )
    read_only_fields = ('pk', 'email','username',)
