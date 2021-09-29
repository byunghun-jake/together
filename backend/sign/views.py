from django.shortcuts import redirect, render
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404


def login(request):
    print('여기로요청')
    return render(request, 'login.html')

def detail(request, pk):
  User = get_user_model()
  user = get_object_or_404(User, pk=pk)
  context = {
    'user': user
  }
  return render(request, 'detail.html', context)

def passwordReset(request):
  return redirect(f'http://localhost:8080/auth/reset-password/')

def passwordResetConfirm(request, uid, token):
  return redirect(f'http://localhost:8080/auth/change-password/{uid}/token/{token}/')
