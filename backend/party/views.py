from django.shortcuts import render
from .serializers import PartySerializer
from .models import Party
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from django.http import Http404, response
from django.shortcuts import get_object_or_404
from rest_framework import generics



class PartyView(generics.GenericAPIView):
  queryset = Party.objects.all()
  serializer_class = PartySerializer

  def get(self, request):
    """
      Party List API

      ---
      # 파티 전체 리스트
      ## Parameters
          - title : 제목
          - personnel : 모집 인원
          - email : 이메일
          - password : 비밀번호
          - party_start_date : 시작일
          - party_end_date : 종료일
          - price : 이용 요금
          - rule_age : 19세 이상
          - rule_assign : 계정 양도
          - rule_share : 계정 공유
          - rule_refund : 환불
          - detail_content : 상세 내용
    """
    partys = Party.objects.all()
    serializer = PartySerializer(partys, many=True)
    return Response(serializer.data) 
  def post(self, request):
    """
       Party Create API

      ---
      # 파티 생성
      ## Parameters
          - title : 제목
          - personnel : 모집 인원
          - email : 이메일
          - password : 비밀번호
          - party_start_date : 시작일
          - party_end_date : 종료일
          - price : 이용 요금
          - rule_age : 19세 이상
          - rule_assign : 계정 양도
          - rule_share : 계정 공유
          - rule_refund : 환불
          - detail_content : 상세 내용
    """
    serializer = PartySerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartyDetailView(APIView):
  def get_object(self, party_idx):
    return get_object_or_404(Party,pk=party_idx)

  def get(self, request, party_idx):
    """
       Party Detail API

      ---
      # 파티 상세 보기
      ## Parameters
          - id : party_idx
    """
    party = self.get_object(party_idx)
    serializer = PartySerializer(party)
    return Response(serializer.data)
  
  def put(self, request, party_idx):
    """
       Party Update API

      ---
      # 파티 수정 하기
      ## Parameters
          -id : party_idx
    """
    party = self.get_object(party_idx)
    serializer = PartySerializer(party, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, party_idx):
    """
       Party Delete API

      ---
      # 파티 삭제 하기
      ## Parameters
          - id : party_idx
    """
    party = self.get_object(party_idx)
    party.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
class PartyJoin:
  def post(self, request, party_idx):
    party = self.get_object(party_idx)
    serializer = PartySerializer(party, data=request.data)
    if serializer.is_vaild():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)




      