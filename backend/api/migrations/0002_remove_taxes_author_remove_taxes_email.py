# Generated by Django 5.0.6 on 2024-06-21 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='taxes',
            name='author',
        ),
        migrations.RemoveField(
            model_name='taxes',
            name='email',
        ),
    ]