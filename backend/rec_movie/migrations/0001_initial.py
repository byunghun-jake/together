from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_id', models.IntegerField()),
                ('genre_name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie_id', models.CharField(default='', max_length=10, unique=True)),
                ('original_title', models.CharField(max_length=100)),
                ('overview', models.TextField()),
                ('release_date', models.DateField()),
                ('poster_path', models.CharField(max_length=40)),
                ('genres', models.ManyToManyField(to='rec_movie.Genre')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=100)),
                ('rating', models.IntegerField()),
                ('movie_id', models.ForeignKey(db_column='movie_id', on_delete=django.db.models.deletion.CASCADE, related_name='review', to='rec_movie.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provider_name', models.CharField(max_length=20)),
                ('movie_id', models.ForeignKey(db_column='movie_id', default='', on_delete=django.db.models.deletion.CASCADE, related_name='provider', to='rec_movie.movie')),
            ],
        ),
    ]
