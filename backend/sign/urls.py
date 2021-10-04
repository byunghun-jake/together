from django.urls import (include, path)
from rest_framework import routers
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    UserDetailsView, PasswordResetView,
    PasswordResetConfirmView
)
from dj_rest_auth.registration.views import RegisterView
from . import views

router = routers.DefaultRouter()
router.register('', views.UserMe)

urlpatterns = [
  # rest-auth 로그인/로그아웃/프로필
  path('login/', LoginView.as_view(), name='rest_login'),
  path('logout/', LogoutView.as_view(), name='rest_logout'),
  path('register/', RegisterView.as_view(), name='rest_register'),
  path('profile/', UserDetailsView.as_view(), name='detail'),
  path('me/', include(router.urls), name='me'),

  # 회원가입, 비밀번호 변경
  path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
  path('password/reset/confirm/uid=<int:uid>&token=<str:token>/', views.passwordResetRedirect, name='password_reset_confirm'),
  path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
  path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
  # google oauth
  path('google/callback/', views.google_callback, name='google_callback'),
  path('google/login/finish/', views.GoogleLogin.as_view(), name='google_login_to_django'),
]
