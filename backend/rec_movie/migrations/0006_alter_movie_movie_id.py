# Generated by Django 3.2.7 on 2021-09-28 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rec_movie', '0005_auto_20210928_1537'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='movie_id',
            field=models.CharField(default='', max_length=10, unique=True),
        ),
    ]