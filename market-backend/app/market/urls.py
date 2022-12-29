from django.urls import path

from market import views


app_name = 'market'

urlpatterns = [
    path(
        'address/',
        views.AddressCreateListAPIView.as_view(),
        name='address-list-create'
    ),
    path(
        'address/<int:pk>/',
        views.AddressDetailAPIView.as_view(),
        name='address-detail'
    ),
]
