from django.urls import path

from user import views


app_name = 'user'

urlpatterns = [
    path('signup/', views.CreateUserView.as_view(), name='signup'),
    path('signin/', views.CreateTokenView.as_view(), name='signin'),
    path('account/', views.ManageUserView.as_view(), name='account'),
]
