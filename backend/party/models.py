from django.db import models
from django.conf import settings


class Party(models.Model):
  SERVICE_CHOICES = (
    ('Netflix', 'Netflix'),
    ('Wavve', 'Wavve'),
    ('Watcha', 'Watcha'),
  )
  party_idx = models.AutoField(primary_key=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  service = models.CharField(max_length=30, choices=SERVICE_CHOICES) # 서비스 선택
  title = models.CharField(max_length=100) # 제목
  personnel = models.IntegerField() # 모집 인원
  email = models.EmailField() # 서비스 계정
  password = models.CharField(max_length=100) # 비밀번호
  party_start_date = models.DateTimeField(auto_now_add=True) # 시작일
  party_end_date = models.DateTimeField() # 종료일
  price = models.PositiveIntegerField() # 하루 당 이용 요금
  rule_age = models.BooleanField(default=False) # 19세 이상
  rule_assign = models.BooleanField(default=False) # 계정 양도
  rule_share = models.BooleanField(default=False) # 계정 공유
  rull_refund = models.BooleanField(default=False) # 환불
  detail_content = models.TextField() # 상세 내용
  

  def __str__(self):
    return self.title

class PartyDetail(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  party_idx = models.ForeignKey(Party, on_delete=models.CASCADE)
  user_class = models.CharField(max_length=100) # 유저 계급(파티장, 파티원)
