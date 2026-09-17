-- World Cup Tournament Simulator — MySQL / MariaDB schema
--
--   mysql -u root -p < database/schema.sql
--
-- A tournament is stored as one row: the full simulation result (teams, groups,
-- standings, every match and the bracket) is kept as a JSON document, while the
-- champion is denormalised into its own column so the history list can be built
-- without decoding every document.

CREATE DATABASE IF NOT EXISTS worldcup_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE worldcup_db;

CREATE TABLE IF NOT EXISTS tournaments (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  creation_date DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  champion      VARCHAR(100)  NULL,
  data          JSON          NOT NULL,
  PRIMARY KEY (id),
  KEY idx_tournaments_creation_date (creation_date),
  KEY idx_tournaments_champion (champion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
