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

if not DEBUG:
    # Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    # Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
    # and renames the files with unique names for each version to support long-term caching
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'