from .commons import *
import dj_database_url, os

DATABASES = {
    'default': dj_database_url.parse(os.getenv('RENDER_DB'))
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = os.getenv('FLIXED_REACT_URL').split(',') # REACT_HOST

CORS_ORIGIN_WHITELIST = (
       os.getenv("CORS_ORIGIN_WHITELIST"),
)