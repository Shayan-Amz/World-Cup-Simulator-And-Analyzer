<?php
/**
 * Shared bootstrap for the API endpoints: configuration, JSON helpers,
 * database connection and session handling.
 */

declare(strict_types=1);

const APP_ROOT = __DIR__ . '/../..';

/** Load config/config.php, falling back to config.example.php (dev only). */
function app_config(): array
{
    static $config = null;
    if ($config === null) {
        $file = file_exists(APP_ROOT . '/config/config.php')
            ? APP_ROOT . '/config/config.php'
            : APP_ROOT . '/config/config.example.php';
        $config = require $file;
    }
    return $config;
}

/** Emit a JSON response and terminate. */
function json_response(mixed $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function json_error(string $message, int $status): never
{
    json_response(['error' => $message], $status);
}

/** Decode the JSON request body; returns [] for an empty body. */
function json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) {
        return [];
    }
    $data = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        json_error('Invalid JSON body: ' . json_last_error_msg(), 400);
    }
    return is_array($data) ? $data : [];
}

/** Lazily open the PDO connection described in the config (MySQL or SQLite). */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $cfg = app_config()['db'];
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        if (($cfg['driver'] ?? 'mysql') === 'sqlite') {
            $path = $cfg['sqlite_path'];
            if (!is_dir(dirname($path))) {
                mkdir(dirname($path), 0775, true);
            }
            $pdo = new PDO('sqlite:' . $path, null, null, $options);
            $pdo->exec(file_get_contents(APP_ROOT . '/database/schema.sqlite.sql'));
        } else {
            $dsn = sprintf(
                'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
                $cfg['host'],
                $cfg['port'],
                $cfg['name']
            );
            $pdo = new PDO($dsn, $cfg['user'], $cfg['password'], $options);
        }
    } catch (PDOException $e) {
        error_log('DB connection failed: ' . $e->getMessage());
        json_error('Database connection failed.', 500);
    }

    return $pdo;
}

/** Start the PHP session with hardened cookie settings. */
function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);
    session_start();
}

function is_authenticated(): bool
{
    start_session();
    return !empty($_SESSION['authenticated']);
}

function require_auth(): void
{
    if (!is_authenticated()) {
        json_error('Authentication required.', 401);
    }
}
