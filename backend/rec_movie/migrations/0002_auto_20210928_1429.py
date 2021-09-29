# Generated by Django 3.2.7 on 2021-09-28 05:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rec_movie', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='movieId',
            new_name='movie_id',
        ),
        migrations.RenameField(
            model_name='review',
            old_name='userId',
            new_name='user_id',
        ),
        migrations.AddField(
            model_name='movie',
            name='movie_id',
            field=models.CharField(default='', max_length=10),
        ),
    ]