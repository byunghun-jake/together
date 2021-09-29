from django.db import models


# Create your models here.
class Movie(models.Model):
    movie_id = models.CharField(max_length=10, default='', unique=True)
    original_title = models.CharField(max_length=100)
    # provider = models.CharField(max_length=20)
    overview = models.TextField()
    release_date = models.DateField()
    poster_path = models.CharField(max_length=40)    # https://image.tmdb.org/t/p/original/[poster_path]
    genres = models.ManyToManyField('Genre')


class Genre(models.Model):
    genre_id = models.IntegerField()
    genre_name = models.CharField(max_length=20)


class Review(models.Model):
    user_id = models.CharField(max_length=100)
    movie_id = models.ForeignKey("Movie", related_name="review", on_delete=models.CASCADE, db_column="movie_id")
    rating = models.IntegerField()


class Provider(models.Model):
    movie_id = models.ForeignKey("Movie", related_name="provider", on_delete=models.CASCADE, db_column="movie_id", default='')
    provider_name = models.CharField(max_length=20)
