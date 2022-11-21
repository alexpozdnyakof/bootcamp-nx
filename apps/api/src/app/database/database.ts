import { Database } from 'sqlite3'

import * as fs from 'fs'
import * as path from 'path'

function init(dbpath: string) {
	const database = new Database(dbpath, err => {
		if (err) throw new Error(err.message)
	})

	return database
}

type MigrationOptions = {
	withSeeds?: boolean
}

function makeMigration(
	dbInstance: Database,
	{ withSeeds = false }: MigrationOptions
) {
	const getSQLString = (fileName: string): string => {
		const sqlDirectory =
			process.env.NODE_ENV === 'test' ? '../../sql' : '/sql'
		return fs
			.readFileSync(
				path.join(__dirname, sqlDirectory, `/${fileName}.sql`)
			)
			.toString()
	}

	dbInstance.exec(getSQLString('projects'))
	if (withSeeds) dbInstance.exec(getSQLString('projects-seed'))
}

export function initDatabase() {
	const isTest = process.env.NODE_ENV === 'test'
	const dbpath = isTest
		? ':memory:'
		: path.join(__dirname, '/database.sqlite')

	const database = init(dbpath)
	makeMigration(database, { withSeeds: isTest })
	return database
}

const database = initDatabase()

export default database
