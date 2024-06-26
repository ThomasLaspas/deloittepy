# Generated by Django 5.0.6 on 2024-06-21 10:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Taxes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('employment_info', models.TextField(blank=True, null=True)),
                ('expenses', models.TextField(blank=True, null=True)),
                ('add_taxes', models.BooleanField(default=False)),
                ('house_number', models.CharField(blank=True, max_length=20, null=True)),
                ('location', models.CharField(blank=True, max_length=100, null=True)),
                ('married_status', models.CharField(blank=True, max_length=20, null=True)),
                ('salary', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
