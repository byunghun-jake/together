from django.shortcuts import render
from .serializers import (
  PartySerializer, PartyCreateSerializer, 
  PaymentsUserSerializer
)
from .models import Party
from rest_framework.response import Response
from rest_framework import serializers, status
from django.shortcuts import get_object_or_404
from rest_framework import generics

class PartyView(generics.GenericAPIView):
  queryset = Party.objects.all()
  serializer_class = PartySerializer

  def get_object(self):
    return get_object_or_404(Party)

  def get(self, request):
    partys = Party.objects.all()
    serializer = PartySerializer(partys, many=True)
    return Response(serializer.data)
 
  def post(self, request):
    user = request.user
    serializer = PartyCreateSerializer(data=request.data)
    if serializer.is_valid():
      party = serializer.save(host=user)
      party.payments.add(user)
      new = PartySerializer(party)
      return Response(new.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartyDetailView(generics.GenericAPIView):
  queryset = Party.objects.all()
  serializer_class = PartySerializer

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
  
class PartyJoinView(generics.GenericAPIView):
  queryset = Party.objects.all()
  serializer_class = PaymentsUserSerializer

  def get_object(self, party_idx):
    return get_object_or_404(Party,pk=party_idx)

  def post(self, request, party_idx, format=None):
    party = self.get_object(party_idx)
    user = request.user
    if party.payments.filter(pk=user.pk).exists():
      return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
      party.payments.add(user)
      party.save()
    new = PartySerializer(party)
    return Response(new.data, status=status.HTTP_201_CREATED)


