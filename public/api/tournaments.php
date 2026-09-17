<?php
/**
 * Tournament history endpoint (requires an authenticated session).
 *
 *   GET    /api/tournaments.php            → list of saved tournaments (newest first)
 *   GET    /api/tournaments.php?id=12      → one tournament
 *   POST   /api/tournaments.php            → save a tournament (JSON body = simulation result)
 *   DELETE /api/tournaments.php?id=12      → delete a tournament
 *
 * The legacy query-string form used by earlier versions is still accepted:
 *   ?action=get_tournaments | save_tournament | delete_tournament
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

require_auth();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Map the legacy action names onto HTTP verbs.
if ($action === 'get_tournaments') {
    $method = 'GET';
} elseif ($action === 'save_tournament') {
    $method = 'POST';
} elseif ($action === 'delete_tournament') {
    $method = 'DELETE';
}

switch ($method) {
    case 'GET':
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        $id > 0 ? get_tournament($id) : list_tournaments();

    case 'POST':
        save_tournament(json_body());

    case 'DELETE':
        $body = json_body();
        $id   = (int) ($_GET['id'] ?? $body['id'] ?? 0);
        delete_tournament($id);

    default:
        header('Allow: GET, POST, DELETE');
        json_error('Method not allowed.', 405);
}

// ---------------------------------------------------------------------------

function list_tournaments(): never
{
    $rows = db()->query(
        'SELECT id, creation_date, champion, data FROM tournaments ORDER BY creation_date DESC, id DESC'
    )->fetchAll();

    $out = [];
    foreach ($rows as $row) {
        $data = json_decode($row['data'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            continue; // skip corrupt rows instead of failing the whole list
        }
        $out[] = tournament_row($row, $data);
    }
    json_response($out);
}

function get_tournament(int $id): never
{
    $stmt = db()->prepare('SELECT id, creation_date, champion, data FROM tournaments WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();
    if (!$row) {
        json_error('Tournament not found.', 404);
    }
    json_response(tournament_row($row, json_decode($row['data'], true) ?? []));
}

/**
 * Shape a DB row for the client. `champion` is the full team object
 * ({name, rating, flag}) stored in the JSON payload; the indexed `champion`
 * column is used only as a fallback for rows written by other tools.
 */
function tournament_row(array $row, array $data): array
{
    $champion = $data['champion'] ?? null;
    if ($champion === null && $row['champion'] !== null) {
        $champion = ['name' => $row['champion']];
    }
    return [
        'id'       => (int) $row['id'],
        'date'     => $row['creation_date'],
        'champion' => $champion,
        'data'     => $data,
    ];
}

function save_tournament(array $data): never
{
    if ($data === []) {
        json_error('No tournament data received.', 400);
    }
    if (!isset($data['teams'], $data['groups'], $data['bracket'])) {
        json_error('Payload must contain teams, groups and bracket.', 422);
    }

    $champion = isset($data['champion']['name']) ? (string) $data['champion']['name'] : null;

    try {
        $stmt = db()->prepare(
            'INSERT INTO tournaments (champion, data) VALUES (:champion, :data)'
        );
        $stmt->execute([
            ':champion' => $champion,
            ':data'     => json_encode($data, JSON_UNESCAPED_UNICODE),
        ]);
    } catch (PDOException $e) {
        error_log('save_tournament failed: ' . $e->getMessage());
        json_error('Failed to save tournament.', 500);
    }

    json_response([
        'message'  => 'Tournament saved successfully.',
        'id'       => (int) db()->lastInsertId(),
        'champion' => $champion,
        'date'     => date('Y-m-d H:i:s'),
    ], 201);
}

function delete_tournament(int $id): never
{
    if ($id <= 0) {
        json_error('Tournament ID is required.', 400);
    }

    $stmt = db()->prepare('DELETE FROM tournaments WHERE id = :id');
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount() === 0) {
        json_error('Tournament not found.', 404);
    }
    json_response(['message' => 'Tournament deleted successfully.', 'deleted' => $stmt->rowCount()]);
}
