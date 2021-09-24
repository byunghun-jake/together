import sign.views
from django.urls import (include, path)
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    UserDetailsView,
)
from dj_rest_auth.registration.views import RegisterView

urlpatterns = [
  # rest-auth 로그인/로그아웃/프로필
  path('login/', LoginView.as_view(), name='rest_login'),
  path('logout/', LogoutView.as_view(), name='rest_logout'),
  path('profile/', UserDetailsView.as_view(), name='detail'),

  # 회원가입, 비밀번호 변경
  path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
  path('register/', RegisterView.as_view(), name='rest_register'),
  
]