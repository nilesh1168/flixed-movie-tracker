import multiprocessing
import os

bind = "127.0.0.1:8000"  # Replace with your desired IP and port
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "gthread"
threads = 2
timeout = 60
# Access log - records incoming HTTP requests
accesslog = "/Users/nilesh/Work/flixed-movie-tracker/logs/gunicorn.access.log"
# Error log - records Gunicorn server goings-on
errorlog = "/Users/nilesh/Work/flixed-movie-tracker/logs/gunicorn.error.log"
# Whether to send Django output to the error log 
capture_output = True
# How verbose the Gunicorn error logs should be 
loglevel = "info"