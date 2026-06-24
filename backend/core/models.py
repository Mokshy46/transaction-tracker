from django.db import models
import uuid

class User(models.Model):
    name = models.CharField(max_length=225)
    
    def __str__(self):
        return self.name        
    
    
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_id = models.UUIDField(unique=True)
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.name} - {self.amount}"
    
    
class UserStats(models.Model):
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    total_amount = models.IntegerField(default=0)
    total_transactions = models.IntegerField(default=0)
    