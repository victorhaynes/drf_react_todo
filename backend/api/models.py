from django.db import models
from django.utils import timezone
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.title}: {self.description}"
    
    def days_remaining(self):
        if self.start_date and self.end_date and not self.completed:
            time_left = str(self.end_date - timezone.now()).split(",")
            days = time_left[0].strip()
            hr_min_sec = time_left[1].strip().split(".")[0]
            return f"There are {days} (and {hr_min_sec} hr:min:sec(s)) remaining for this task."
            return type(str(days_left))
        elif self.completed:
            return "This task is marked completed."
        else:
            return "Please ensure that the start and end dates are populated."

    def overdue(self):
        if self.end_date < timezone.now() and not self.completed:
            return True
        else:
            return False

    ## Need validation to ensure that end date is after start date

# class User(AbstractUser):
#     usernname = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     email = models.CharField(max_length=355, unique=True)

#     # # to override 'username' necessity we can make username = None
#     # # and set USERNAME_FIELD = 'name_of_replacement'
#     # usernname = None
#     # USERNAME_FIELD = 'email'

#     REQUIRED_FIELDS = []

