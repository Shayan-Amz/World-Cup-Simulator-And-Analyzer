<?php
/**
 * Authentication endpoint.
 *
 *   POST /api/auth.php?action=login    {"username": "...", "password": "..."}
 *   POST /api/auth.php?action=logout
 *   GET  /api/auth.php?action=status   → {"authenticated": true|false}
 *
 * Credentials are verified server-side against the bcrypt hash in the config;
 * a successful login is remembered in a PHP session (HttpOnly cookie).
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

start_session();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ([$method, $action]) {
    case ['GET', 'status']:
        json_response(['authenticated' => is_authenticated()]);

    case ['POST', 'login']:
        $body     = json_body();
        $username = trim((string) ($body['username'] ?? ''));
        $password = (string) ($body['password'] ?? '');

        if ($username === '' || $password === '') {
            json_error('Username and password are required.', 400);
        }

        $auth = app_config()['auth'];
        $ok   = hash_equals($auth['username'], $username)
             && password_verify($password, $auth['password_hash']);

        if (!$ok) {
            // small constant delay to blunt brute-force attempts
            usleep(300_000);
            json_error('Invalid username or password.', 401);
        }

        session_regenerate_id(true);
        $_SESSION['authenticated'] = true;
        $_SESSION['username']      = $username;
        json_response(['message' => 'Login successful.', 'username' => $username]);

    case ['POST', 'logout']:
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
        }
        session_destroy();
        json_response(['message' => 'Logged out.']);

    default:
        json_error('Unknown action or method.', $method === 'GET' || $method === 'POST' ? 400 : 405);
}
