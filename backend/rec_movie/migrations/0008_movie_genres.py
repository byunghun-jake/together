# Generated by Django 3.2.7 on 2021-09-29 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rec_movie', '0007_auto_20210929_1138'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='genres',
            field=models.ManyToManyField(to='rec_movie.Genre'),
        ),
    ]