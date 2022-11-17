import * as fs from 'fs'
import { Database } from 'sqlite3'

const database = new Database('database.sqlite', err => {
	if (err) throw new Error(err.message)
})

function migrate() {
	console.log({ __dirname })

	database.exec(
		'CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200) NOT NULL,description TEXT NULL)'
	)
}

function addMigrationData() {
	console.log({ __dirname })
	database.exec(
		`INSERT OR REPLACE INTO projects VALUES (1, 'ホームページのリニューアル', '新しいフレッシュホームページの制作過程はこちら'), (2, 'チェックアウトフォームのリファクタリング', '新しいチェックアウト フォームでユーザー エクスペリエンスを向上'), (3, '実験プロジェクト', null)`
	)
}

export { database, migrate, addMigrationData }

// 	'CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200) NOT NULL,description TEXT NULL)'
// `INSERT OR REPLACE INTO projects VALUES (1, 'ホームページのリニューアル', '新しいフレッシュホームページの制作過程はこちら'), (2, 'チェックアウトフォームのリファクタリング', '新しいチェックアウト フォームでユーザー エクスペリエンスを向上'), (3, '実験プロジェクト', null)`
