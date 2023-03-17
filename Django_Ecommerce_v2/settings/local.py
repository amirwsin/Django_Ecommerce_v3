from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR.parent / 'db.sqlite3',
    }
}

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR.parent / "staticfiles",
]

MEDIA_URL = '/media/'

STATIC_ROOT = BASE_DIR.parent / 'static'
MEDIA_ROOT = BASE_DIR.parent / 'media'