from .commons import *
import dj_database_url, os
from dotenv import load_dotenv
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# load prod env variables
load_dotenv(BASE_DIR / 'django.env.prod')

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = os.getenv('FLIXED_DRF_URL').split(',') # REACT_HOST

CORS_ORIGIN_WHITELIST = tuple(
       os.getenv("CORS_ORIGIN_WHITELIST").split(',')
)

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS").split(',')

DATABASES = {
    'default': dj_database_url.parse(os.getenv('RENDER_DB'))
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False