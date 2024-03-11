from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "Foodee Admin"
admin.site.site_title = "Foodee Admin Portal"
admin.site.index_title = "Welcome to Foodee Admin!"


urlpatterns = [
    path('jet/', include("jet.urls", "jet")),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    # path('super/defender', include("defender.urls")),
    path('super/', admin.site.urls),
    path("", include("app.urls"))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

handler404 = "app.views.NotFound"
