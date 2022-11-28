CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    done BOOLEAN NOT NULL CHECK (done IN (0, 1)),
    created REAL DEFAULT (datetime('now','localtime')),
    updated REAL DEFAULT (datetime('now','localtime'))
)
