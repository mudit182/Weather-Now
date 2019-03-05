from django.urls import path
from core import views

urlpatterns = [
    path('', views.sayHi, name='sayHi'),
    # path('migrate', views.migrate, name='migrate')
    path('similar-cities/<str:city>/get', views.getSimilarCities, name='getSimilarCities')   
]