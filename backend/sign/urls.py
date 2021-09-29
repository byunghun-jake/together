import sign.views
from django.urls import (include, path)
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    UserDetailsView, PasswordResetView
)
from dj_rest_auth.registration.views import RegisterView
from .views import (
  passwordResetConfirm
)
urlpatterns = [
  # rest-auth 로그인/로그아웃/프로필
  path('login/', LoginView.as_view(), name='rest_login'),
  path('logout/', LogoutView.as_view(), name='rest_logout'),
  path('profile/', UserDetailsView.as_view(), name='detail'),

  # 회원가입, 비밀번호 변경

  path('password/reset/confirm/uid=<int:uid>&token=<str:token>/', passwordResetConfirm, name='password_reset_confirm'),
  path('password/reset/', PasswordResetView.as_view(), name='password_reset'),
  path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
  path('register/', RegisterView.as_view(), name='rest_register'),
]