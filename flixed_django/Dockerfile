# Stage 1: Base build
FROM python:3.9-slim AS builder

RUN mkdir /django_app

# Set working directory
WORKDIR /django_app

RUN pip install --upgrade pip

# Install dependencies for caching 
COPY ./requirements.txt /django_app/
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production Build
FROM python:3.9-slim

RUN useradd -m -r djangouser && \
    mkdir /django_app && \
    chown -R djangouser /django_app

# copy all the dependencies from base build leaving behind all unnecessary libs
COPY --from=builder /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/

WORKDIR /django_app

# copy application code
COPY --chown=djangouser:djangouser . .

# Switch user to non-root user
USER djangouser

# Expose port
EXPOSE 8000

# Make entry file executable
RUN chmod +x /django_app/entrypoint.docker.sh

# Start the application
CMD ["/django_app/entrypoint.docker.sh"]
