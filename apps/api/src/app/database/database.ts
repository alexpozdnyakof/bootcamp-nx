import { Database } from 'sqlite3'

import * as fs from 'fs'
import * as path from 'path'

const dbpath =
	process.env.NODE_ENV === 'test'
		? ':memory:'
		: path.join(__dirname, '/database.sqlite')

const database = new Database(dbpath, err => {
	if (err) throw new Error(err.message)
})

const getSQLString = (fileName: string): string => {
	const sqlDirectory = process.env.NODE_ENV === 'test' ? '../../sql' : '/sql'
	return fs
		.readFileSync(path.join(__dirname, sqlDirectory, `/${fileName}.sql`))
		.toString()
}

function migrate() {
	database.exec(getSQLString('projects'))
}

function seeds() {
	database.exec(getSQLString('projects-seed'))
}

export { database, migrate, seeds }
