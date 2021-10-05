from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
  def create_user(self, username, email, nick_name, phone_number, password=None):
    if not username:
      raise ValueError('user name')
    if not email:
      raise ValueError('user email')
    user = self.model(
      username=username,
      email=self.normalize_email(email),
      nick_name=nick_name,
      phone_number=phone_number,
    )
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def create_superuser(self, username, email, nick_name, phone_number, password):
    user = self.create_user(
      username=username,
      email=self.normalize_email(email),
      nick_name=nick_name,
      phone_number=phone_number,
      password=password
    )
    user.is_admin = True
    user.save(using=self._db)
    return user

class User(AbstractBaseUser):
  username = models.CharField(max_length=100)
  email = models.EmailField(max_length=255, unique=True)
  nick_name = models.CharField(max_length=100)
  phone_number = models.CharField(max_length=20)
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  
  objects = UserManager()

  USERNAME_FIELD  = 'email'
  REQUIRED_FIELDS = ['username','nick_name', 'phone_number']

  def __str__(self):
    return self.username

  def has_perm(self, perm, obj=None):
    return True

  def has_module_perms(self, app_label):
    return True

  @property
  def is_staff(self):
    return self.is_admin
