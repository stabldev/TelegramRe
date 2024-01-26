from django.contrib import admin
from django.urls import include, path

# media
from django.conf import settings
from django.conf.urls.static import static

# fmt: off
urlpatterns = [
    path("api/", include([
        path("v1/", include([
            path("chat/", include("apps.chat.urls")),
            path("user/", include("apps.user.urls")),
        ])),
    ])),
    path("admin/", admin.site.urls),
]
# fmt: on

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
