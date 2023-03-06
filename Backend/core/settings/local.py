from .base import *

DEBUG = True

ALLOWED_HOSTS = []

SECRET_KEY = 'django-insecure-h+r21on2da-i8)jzc^chl=^wprang^uc9r^8o@jc=-rd#on=he'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}