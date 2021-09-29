# Generated by Django 3.2.7 on 2021-09-28 06:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rec_movie', '0004_alter_movie_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='movie_id',
            field=models.ForeignKey(db_column='movie_id', on_delete=django.db.models.deletion.CASCADE, related_name='review', to='rec_movie.movie'),
        ),
        migrations.DeleteModel(
            name='MovieReview',
        ),
    ]