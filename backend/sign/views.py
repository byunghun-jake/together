import requests
import hashlib, os
from django.shortcuts import redirect, render
from django.shortcuts import render
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.http import JsonResponse
from json.decoder import JSONDecodeError
from rest_framework import status, viewsets
from rest_framework.response import Response
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.github import views as github_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount
from .serializers import UserSerializer
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt

FRONT_BASE_URL = "http://localhost:8080"
BASE_URL = "http://localhost:8000"
GOOGLE_CALLBACK_URI = f"{FRONT_BASE_URL}/auth/google/callback"
KAKAO_CALLBACK_URI = f"{FRONT_BASE_URL}/auth/kakao/callback"
GITHUB_CALLBACK_URI = f"{FRONT_BASE_URL}/auth/github/callback"

# Hash value for protect from xsrf attack
# Temporary, not in use while refactoring
state = hashlib.sha256(os.urandom(1024)).hexdigest()

class UserMe(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  def get_queryset(self):
    user = self.request.user
    return User.objects.get_queryset().filter(username=user)


def passwordResetRedirect(request, uid, token):
    return redirect(f"{FRONT_BASE_URL}/auth/reset-password-confirm/{uid}/token/{token}")


@csrf_exempt
def google_callback(request):
    client_id = getattr(settings, "SOCIAL_AUTH_GOOGLE_CLIENT_ID")
    client_secret = getattr(settings, "SOCIAL_AUTH_GOOGLE_SECRET")
    code = request.POST.get('code')
    """
    Request Access Token
    """
    token_res = requests.post(
        f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_CALLBACK_URI}"
    )
    token_json = token_res.json()
    error = token_json.get('error')
    if error:
        raise JSONDecodeError(error)

    access_token = token_json.get('access_token')
    id_token = token_json.get('id_token')
    """
    Email Request
    """
    email_res = requests.get(
        f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")
    if email_res.status_code != 200:
        return JsonResponse({'Google_Callback_Error': 'invalid email'}, status=status.HTTP_400_BAD_REQUEST)
    email_res_json = email_res.json()
    email = email_res_json.get('email')
    """
    Signup or Signin Request
    """
    try:
        user = User.objects.get(email=email)
        # 기존에 가입된 유저의 provider가 google이 맞다면 로그인, 아니면 에러
        social_user = SocialAccount.objects.get(user=user)
        # SNS 로그인 유저가 아닌 경우
        if social_user is None:
            return JsonResponse({'Google_Callback_Error': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        # 다른 SNS로 가입된 유저
        if social_user.provider != 'google':
            return JsonResponse({'Google_Callback_Error': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # Google로 가입된 유저
        data = {'access_token': access_token, 'code': code, 'id_token': id_token }
        accept = requests.post(f"{BASE_URL}/account/google/login/finish/", data=json.dumps(data), headers={'Content-Type': 'application/json'})
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'Google_Callback_Error': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        return JsonResponse(accept_json)
    except User.DoesNotExist:
        # 기존에 가입되지 않았던 유저라면 새로 가입
        data = {'access_token': access_token, 'code': code, 'id_token': id_token }
        accept = requests.post(f"{BASE_URL}/account/google/login/finish/", data=json.dumps(data), headers={'Content-Type': 'application/json'})
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'Google_Callback_Error': 'failed to signup'}, status=accept_status)
        accept_json = accept.json()
        return JsonResponse(accept_json)


class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URI
    client_class = OAuth2Client
