from rest_framework import serializers  # serializer import
from .models import Movie, Review, Genre, Provider


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class SubMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(read_only=True, many=True)
    providers = ProviderSerializer(read_only=True, many=True)
    recommends = SubMovieSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('genres', 'providers', 'recommends')      # 장르 데이터도 함께 json으로 변환하여 제공한다.



