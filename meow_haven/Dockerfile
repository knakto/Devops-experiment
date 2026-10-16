
FROM nginx:stable-alpine3.24-perl AS deploy

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY / /usr/share/nginx/html

EXPOSE 80
