from django.db import models
from django.contrib.auth.models import User

class Taxes(models.Model):
    username = models.CharField(max_length=100)
    employment_info = models.TextField(null=True, blank=True)
    expenses = models.TextField(null=True, blank=True)
    add_taxes = models.BooleanField(default=False)
    house_number = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    married_status = models.CharField(max_length=20, null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.username