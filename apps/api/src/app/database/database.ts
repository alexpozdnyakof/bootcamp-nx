import { Database } from 'sqlite3'

import * as fs from 'fs'
import * as path from 'path'

const dbFileName = process.env.NODE_ENV === 'test' ? `test` : `database`

const database = new Database(`${__dirname}/${dbFileName}.sqlite`, err => {
	if (err) throw new Error(err.message)
})
const sqlUrl =
	process.env.NODE_ENV === 'test'
		? path.join(__dirname, '../../sql')
		: path.join(__dirname, '/sql')

function migrate() {
	console.log({ __dirname })

	database.exec(fs.readFileSync(sqlUrl.concat('/projects.sql')).toString())

	if (process.env.NODE_ENV === 'test') {
		console.log('test')
		seeds()
	}
}

function seeds() {
	console.log({ __dirname })
	database.exec(
		fs.readFileSync(sqlUrl.concat('/projects-migration.sql')).toString()
	)
}

export { database, migrate }

// 'CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(200) NOT NULL,description TEXT NULL)'
// `INSERT OR REPLACE INTO projects VALUES
// (1, 'ホームページのリニューアル',
// '新しいフレッシュホームページの制作過程はこちら'),
// (2, 'チェックアウトフォームのリファクタリング', '新しいチェックアウト フォームでユーザー エクスペリエンスを向上'), (3, '実験プロジェクト', null)`
