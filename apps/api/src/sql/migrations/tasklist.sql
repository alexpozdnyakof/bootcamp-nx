CREATE TABLE IF NOT EXISTS tasklist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created REAL DEFAULT (datetime('now','localtime')),
    updated REAL DEFAULT (datetime('now','localtime'))
)
