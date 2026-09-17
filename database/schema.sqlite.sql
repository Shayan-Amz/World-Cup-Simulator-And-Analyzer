-- World Cup Tournament Simulator — SQLite schema (local demo / tests)
--
--   sqlite3 database/worldcup.sqlite < database/schema.sqlite.sql
--
-- The API creates this table automatically on first use when DB_DRIVER=sqlite,
-- so running this file by hand is optional.

CREATE TABLE IF NOT EXISTS tournaments (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  creation_date TEXT    NOT NULL DEFAULT (datetime('now')),
  champion      TEXT    NULL,
  data          TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tournaments_creation_date ON tournaments (creation_date);
CREATE INDEX IF NOT EXISTS idx_tournaments_champion ON tournaments (champion);
