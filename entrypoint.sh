#!/bin/sh
set -e

NGINX_CONF="/etc/nginx/nginx.conf"

envsubst '${BACKEND_API_URL}' < "$NGINX_CONF" > "$NGINX_CONF.tmp" \
  && mv "$NGINX_CONF.tmp" "$NGINX_CONF"

exec nginx -c "$NGINX_CONF" -g 'daemon off;'
