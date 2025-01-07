FROM php:8.3-apache

# Update and install system dependencies
RUN apt-get clean && apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpq-dev \
    libsqlite3-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    libcurl4-openssl-dev \
    libzip-dev \
    pkg-config \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pdo_sqlite \
    mbstring \
    curl \
    dom \
    zip

# Enable Apache Rewrite Module
RUN a2enmod rewrite

# Update Apache DocumentRoot to /var/www/html/public
COPY ./apache/000-default.conf /etc/apache2/sites-enabled/000-default.conf

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy application code into the container
COPY ./ /var/www/html

# Configure Git safe directory
RUN git config --global --add safe.directory /var/www/html

# Set proper permissions
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies using Composer
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --prefer-dist --no-dev --ignore-platform-req=ext-zip

# Install frontend dependencies and compile assets
RUN npm install --legacy-peer-deps && npm run build

# Expose the default Apache port
EXPOSE 80

# Start the Apache server
CMD ["apache2-foreground"]
