FROM php:8.3-apache

RUN docker-php-ext-install pdo_mysql

# Document root is public/; config/ and database/ sit one level above it,
# exactly as in the repository (see APP_ROOT in public/api/bootstrap.php).
COPY public/   /var/www/html/
COPY config/   /var/www/config/
COPY database/ /var/www/database/
