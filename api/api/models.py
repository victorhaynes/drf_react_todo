from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    start_date = models.DateTimeField.auto_now_add=True
    end_date = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField

    def __str__(self):
        return f"{self.title}: {self.description}"