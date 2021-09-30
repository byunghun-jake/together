from django.urls import (include, path)
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    UserDetailsView, PasswordResetView, PasswordResetConfirmView
)
from dj_rest_auth.registration.views import RegisterView
from .views import passwordResetRedirect
urlpatterns = [
  # rest-auth 로그인/로그아웃/프로필
  path('login/', LoginView.as_view(), name='rest_login'),
  path('logout/', LogoutView.as_view(), name='rest_logout'),
  path('profile/', UserDetailsView.as_view(), name='detail'),

  # 회원가입, 비밀번호 변경
  path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
  path('password/reset/confirm/uid=<int:uid>&token=<str:token>/', passwordResetRedirect, name='password_reset_confirm'),
  path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
  path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
  path('register/', RegisterView.as_view(), name='rest_register'),
]
