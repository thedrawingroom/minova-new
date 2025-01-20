# syntax=docker.io/docker/dockerfile:1.7-labs

FROM webdevops/php-nginx:8.3-alpine AS php

# Set timezone
RUN apk add --no-cache ffmpeg tzdata
ENV TZ=Europe/London

ENV WEB_DOCUMENT_ROOT=/app/public \
    PHP_DISMOD=bz2,ffi,ldap,sysvmsg,sysvsm,sysvshm,shmop,apcu,vips,mongodb,amqp
WORKDIR /app

# Copy overrides
COPY docker/php-nginx /opt/docker

RUN mkdir -p /app/storage/logs/workers
RUN mkdir -p /app/storage/framework/cache/data
RUN mkdir -p /app/storage/framework/sessions
RUN mkdir -p /app/storage/framework/testing
RUN mkdir -p /app/storage/framework/views

# Install composer dependencies
COPY composer.* .
#RUN --mount=type=secret,id=composer_auth,dst=/app/auth.json COMPOSER_ALLOW_SUPERUSER=1 composer install --prefer-dist --no-dev --no-autoloader --no-interaction && rm -rf /root/.composer
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --prefer-dist --no-dev --no-autoloader --no-interaction --no-suggest && rm -rf /root/.composer

# Copy codebase
COPY --exclude=vendor/* . .

RUN git config --global --add safe.directory /app

# Temporarily set Statamic to use static files
RUN cp /app/config/statamic/eloquent-driver.php /app/config/statamic/eloquent-driver.original.php
RUN php -r "file_put_contents('/app/config/statamic/eloquent-driver.php', str_replace('\'driver\' => \'eloquent\'', '\'driver\' => \'file\'', file_get_contents('/app/config/statamic/eloquent-driver.php')));"

# Finish composer
RUN COMPOSER_ALLOW_SUPERUSER=1 composer dump-autoload --no-dev --no-interaction --optimize

# Revert Statamic config
RUN rm -f /app/config/statamic/eloquent-driver.php
RUN mv /app/config/statamic/eloquent-driver.original.php /app/config/statamic/eloquent-driver.php

FROM node:22 AS frontend
WORKDIR /frontend
COPY . .
COPY --from=php /app/vendor /frontend/vendor
RUN yarn
RUN yarn build

FROM php AS php2

# Copy node build output
COPY --from=frontend /frontend/public/build /app/public/build

# Ensure all of our files are owned by the same user and group.
RUN chown -R application:application .
