import { Database } from 'sqlite3'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'path'

function readSqlDirectory(subdir: string): Array<string> {
	const path = join(
		__dirname,
		process.env.NODE_ENV === 'test' ? '../../sql' : '/sql',
		subdir
	)
	return readdirSync(path).map(fileName =>
		readFileSync(join(path, '/', fileName)).toString()
	)
}

function migrate(dbInstance: Database) {
	const migrations = readSqlDirectory('/migrations')
	migrations.map(sqlString => dbInstance.exec(sqlString))
}

function seed(dbInstance: Database) {
	const seeds = readSqlDirectory('/seeds')
	seeds.map(sqlString => dbInstance.exec(sqlString))
}

export function InitSqlite() {
	const isTest = process.env.NODE_ENV === 'test'
	const dbpath = isTest ? ':memory:' : join(__dirname, '/database.sqlite')

	const database = new Database(dbpath, err => {
		if (err) throw new Error(err.message)
	})

	migrate(database)
	if (process.env.NODE_ENV === 'test') {
		seed(database)
	}

	return database
}

export default InitSqlite()
