from .models import User,UserStats,Transaction
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = User
        fields = "__all__"
        

class TransactionSerializer(serializers.ModelSerializer):
    
    name = serializers.CharField(source = "user.name",read_only = True)    
    
    def validate_amount(self, value):
        
        if value <= 0:
            raise serializers.ValidationError("Invalid Amount Value")
        return value
    
    class Meta:
        model = Transaction
        fields = ['name','user','transaction_id','amount','created_at']
        

class UserStatsSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source = "user.name",read_only = True)
    class Meta:
        model = UserStats
        fields = ['user','name','score','total_amount','total_transactions']        
    