#!/bin/bash

# Set environment variables
export OMDB_API_KEY=$OMDB_API_KEY
export TMDB_API_AUTH_ACCESS=$TMDB_API_AUTH_ACCESS
export TMDB_API_KEY=$TMDB_API_KEY

# Ensure the log directory exists
mkdir -p /Users/nilesh/Work/flixed-movie-tracker/logs

# Start Gunicorn
/Users/nilesh/Work/django-env/bin/gunicorn -c /Users/nilesh/Work/flixed-movie-tracker/flixed_django/gunicorn_config.py flixed_django.wsgi