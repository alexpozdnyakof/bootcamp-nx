import { Database } from 'sqlite3'

const dbFileName =
	process.env.NODE_ENV === 'test' ? `database-test` : `database`

const database = new Database(`${__dirname}/${dbFileName}.sqlite`, err => {
	if (err) throw new Error(err.message)
})

function migrate() {
	console.log({ __dirname })

	database.exec(
		'CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200) NOT NULL,description TEXT NULL)'
	)

	if (process.env.NODE_ENV === 'test') {
		console.log('test')
		addMigrationData()
	}
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
