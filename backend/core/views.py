from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,ListAPIView,CreateAPIView
from rest_framework.views import APIView,Response
from .models import User,UserStats,Transaction
from .serializers import UserSerializer,UserStatsSerializer,TransactionSerializer
from rest_framework import status
from django.db.models import F
from django.db import transaction

class UserListCreateAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class TransactionCreateAPIView(CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    def perform_create(self, serializer):
        
        with transaction.atomic():

            transaction_obj = serializer.save()

            stats, _ = UserStats.objects.get_or_create(
                user=transaction_obj.user
            )

            stats.total_amount += transaction_obj.amount
            stats.total_transactions += 1

            stats.score = (
                stats.total_amount +
                stats.total_transactions * 100
            )

            stats.save()


# THROTTLING TO PREVENT ABUSE

class UserSummaryAPIView(APIView):
  
    def get(self, request, user_id):
        try:
            stats = UserStats.objects.get(user__id= user_id)
            serializer = UserStatsSerializer(stats)
            return Response (serializer.data)
        
        except UserStats.DoesNotExist:
            return Response( {"error": "User stats not found"},
                status=status.HTTP_404_NOT_FOUND
                )            



class RankUsersListAPIView(ListAPIView):
    queryset = UserStats.objects.order_by("-score")
    serializer_class = UserStatsSerializer




