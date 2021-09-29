from .models import Party, PartyDetail
from rest_framework import serializers

class PartySerializer(serializers.ModelSerializer):
  
  personnel_count = serializers.IntegerField(source='personnel_count.count', read_only=True)

  class Meta:
    model = Party
    fields = '__all__'
   