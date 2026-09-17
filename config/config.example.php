<?php
/**
 * Application configuration — copy to config.php and adjust.
 *
 *   cp config/config.example.php config/config.php
 *
 * config.php is git-ignored so credentials never end up in the repository.
 * Every value can also be supplied through an environment variable, which is
 * what docker-compose.yml does.
 */

return [
    'db' => [
        // 'mysql' (production / XAMPP) or 'sqlite' (zero-setup local demo & tests)
        'driver'   => getenv('DB_DRIVER') ?: 'mysql',

        // MySQL / MariaDB
        'host'     => getenv('DB_HOST') ?: '127.0.0.1',
        'port'     => (int) (getenv('DB_PORT') ?: 3306),
        'name'     => getenv('DB_NAME') ?: 'worldcup_db',
        'user'     => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASSWORD') ?: '',

        // SQLite (used when driver = sqlite)
        'sqlite_path' => getenv('DB_SQLITE_PATH') ?: __DIR__ . '/../database/worldcup.sqlite',
    ],

    'auth' => [
        'username' => getenv('ADMIN_USERNAME') ?: 'admin',
        // Generate a hash with:  php -r "echo password_hash('your-password', PASSWORD_DEFAULT), PHP_EOL;"
        // The default below is the hash of "admin123" — change it before deploying anywhere public.
        'password_hash' => getenv('ADMIN_PASSWORD_HASH')
            ?: '$2y$10$099ot0Oiyy4VqP4007lIMO4164tsfbM9nz5pJIxmB58VkLLjCZO7G',
    ],
];
