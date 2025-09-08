#!/bin/sh
set -e

NGINX_CONF="/etc/nginx/nginx.conf"

# Faz substituição in-place usando um arquivo temporário
envsubst '${BACKEND_API_URL}' < "$NGINX_CONF" > "$NGINX_CONF.tmp" \
  && mv "$NGINX_CONF.tmp" "$NGINX_CONF"

# Start Nginx
exec nginx -c "$NGINX_CONF" -g 'daemon off;'
