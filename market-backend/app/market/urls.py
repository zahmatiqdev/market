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
    path(
        'category/',
        views.CategoryCreateListAPIView.as_view(),
        name='category-list-create'
    ),
    path(
        'category/<int:pk>/',
        views.CategoryDetailAPIView.as_view(),
        name='category-detail'
    ),

    path(
        'product/create/',
        views.ProductCreateAPIView.as_view(),
        name='product-create'
    ),
    path(
        'product/',
        views.ProductListAPIView.as_view(),
        name='product-list'
    ),
    path(
        'product/<int:id>/',
        views.ProductDetailAPIView.as_view(),
        name='product-detail'
    ),
    path(
        'order/create/',
        views.OrderCreateAPIView.as_view(),
        name='order-create'
    ),
    path(
        'order/',
        views.OrderListAPIView.as_view(),
        name='order-list'
    ),
    path(
        'order/<int:id>/',
        views.OrderDetailAPIView.as_view(),
        name='order-detail'
    ),
]
