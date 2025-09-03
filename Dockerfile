# =========================================
# Stage 1: Build the Angular Application
# =========================================
ARG NODE_VERSION=22.19.0-alpine3.22
ARG NGINX_VERSION=1.29.1-alpine3.22

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build -- --configuration production

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginx:${NGINX_VERSION} as runner

COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ARG APP_NAME=cliente-agendas
COPY --from=builder /app/dist/${APP_NAME}/browser /usr/share/nginx/html

EXPOSE 80

CMD ["/entrypoint.sh"]
