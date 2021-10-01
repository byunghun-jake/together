from django.db import models


# Create your models here.
class Movie(models.Model):
    movie_id = models.CharField(max_length=10, default='', unique=True)
    original_title = models.CharField(max_length=100)
    overview = models.TextField()
    release_date = models.DateField()
    poster_path = models.CharField(max_length=40)    # https://image.tmdb.org/t/p/original/[poster_path]
    genres = models.ManyToManyField('Genre')        # many to many로 genre와 연결하였다. related_name은 자동으로 'genres'
    providers = models.ManyToManyField('Provider')  # many to many로 provider와 연결하였다. related_name은 자동으로 'provider'


class Genre(models.Model):
    genre_id = models.IntegerField()
    name = models.CharField(max_length=20)
    k_name = models.CharField(max_length=20, default='')


class Review(models.Model):
    user_id = models.CharField(max_length=100)
    movie_id = models.ForeignKey("Movie", related_name="review", on_delete=models.CASCADE, db_column="movie_id")
    rating = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField()


class Provider(models.Model):
    name = models.CharField(max_length=20)
    pricePerDay = models.IntegerField(default=0)
    logo_url = models.CharField(max_length=100, default='')
