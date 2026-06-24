from django.urls import path
from .views import UserListCreateAPIView, TransactionCreateAPIView,UserSummaryAPIView,RankUsersListAPIView


urlpatterns = [
    path('user/', UserListCreateAPIView.as_view(), name='user'),
    path('transaction/', TransactionCreateAPIView.as_view(), name='transaction'),
    path('summary/<int:user_id>/', UserSummaryAPIView.as_view(), name='stats'),
    path('ranking/', RankUsersListAPIView.as_view(), name='rank')
]
