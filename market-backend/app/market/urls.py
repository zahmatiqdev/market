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
    path(
        'unit/',
        views.UnitCreateListAPIView.as_view(),
        name='unit-list-create'
    ),
    path(
        'unit/<int:pk>/',
        views.UnitDetailAPIView.as_view(),
        name='unit-detail'
    ),
]
