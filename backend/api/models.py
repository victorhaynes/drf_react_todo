from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}: {self.description}"
    
    def days_remaining(self):
        if self.start_date and self.end_date:
            days_left = self.end_date - self.start_date
            return f"There are {days_left} days remaining for this task."
        else:
            return f"Please ensure that the start and end dates are populated."
        

# class User(AbstractUser):
#     usernname = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     email = models.CharField(max_length=355, unique=True)

#     # # to override 'username' necessity we can make username = None
#     # # and set USERNAME_FIELD = 'name_of_replacement'
#     # usernname = None
#     # USERNAME_FIELD = 'email'

#     REQUIRED_FIELDS = []

