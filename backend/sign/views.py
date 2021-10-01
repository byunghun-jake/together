from django.shortcuts import redirect, render
from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserMe(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  def get_queryset(self):
    user = self.request.user
    return User.objects.get_queryset().filter(username=user)
 
def passwordResetRedirect(request, uid, token):
  return redirect(f'http://localhost:8080/auth/reset-password-confirm/{uid}/token/{token}/')
