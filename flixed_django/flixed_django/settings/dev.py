from .commons import *
from dotenv import load_dotenv
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# load dev env variables
load_dotenv(BASE_DIR / 'django.env.dev')

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = os.getenv('FLIXED_DRF_URL').split(',') # REACT_HOST

CORS_ORIGIN_WHITELIST = tuple(
       os.getenv("CORS_ORIGIN_WHITELIST").split(',')
)

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split(',')

DATABASES = {
    'default': {

        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': os.getenv('DJANGO_DB_NAME'),

        'USER': os.getenv('DJANGO_DB_USERNAME'),

        'PASSWORD': os.getenv('DJANGO_DB_PWD'),

        'HOST': os.getenv('DJANGO_DB_HOST'),

        'PORT': os.getenv('DJANGO_DB_PORT'),

    }
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True