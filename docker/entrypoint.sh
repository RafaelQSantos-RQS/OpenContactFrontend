#!/bin/sh

envsubst '${API_SERVICE_URL},${API_SERVICE_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
