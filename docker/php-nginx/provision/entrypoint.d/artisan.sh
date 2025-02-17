#!/bin/bash

set -e

# Get env vars in the Dockerfile to show up in the SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "Starting SSH ..."
service ssh start

mkdir -p /app/storage/logs/workers
mkdir -p /app/storage/framework/cache/data
mkdir -p /app/storage/framework/sessions
mkdir -p /app/storage/framework/testing
mkdir -p /app/storage/framework/views

/usr/local/bin/php artisan optimize:clear
/usr/local/bin/php artisan optimize

/usr/local/bin/php artisan statamic:stache:warm
/usr/local/bin/php artisan statamic:search:update --all
/usr/local/bin/php artisan statamic:static:clear
# /usr/local/bin/php artisan statamic:static:warm
/usr/local/bin/php artisan statamic:assets:generate-presets --queue
/usr/local/bin/php artisan storage:link

chown -R application:application /app
