from api.views import product_list, product_detail, checkout_list,categories_list, register
from django.urls import path

from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    ## Products
    path('products',product_list ),
    path('products/check-out', checkout_list ),
    path('products/<int:code>',product_detail ),
    path('products/categories',categories_list ),

    ## Accounts
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', register, name='register'),

]
