from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

urlpatterns = [
    path("", views.index, name="Home"),
    path("make_reservation/", views.make_reservation, name="make_reservation"),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
