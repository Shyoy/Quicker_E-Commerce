from api.views import product_list, product_detail, checkout_list,categories_list
from django.urls import path

# from .views import MyTokenObtainPairView
# from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('products',product_list ),
    path('products/check-out', checkout_list ),
    path('products/<int:code>',product_detail ),
    path('categories',categories_list ),
    # path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
