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


STRIPE_SECRET_KEY='sk_test_51MrHupIOqCK98Pr5qzuQ2eAh5r7ksf2LPgMnKkDZBJLQznuRaxFWOzRYlA2RMLWLhII34v0pmOZvQZUIlro5sgrf00CNyBJpG8'

FRONTEND_URL= 'http://127.0.0.1:5173'