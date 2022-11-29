import { Database } from 'sqlite3'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'path'

function InitSqlite() {
	const isTest = process.env.NODE_ENV === 'test'
	const dbpath = isTest ? ':memory:' : join(__dirname, '/database.sqlite')

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

	const database = new Database(dbpath, err => {
		if (err) throw new Error(err.message)
	})

	migrate(database)
	if (process.env.NODE_ENV === 'test') {
		seed(database)
	}

	return database
}

type Params = Array<string | number | boolean>

function DatabaseService() {
	const Database = InitSqlite()
	function handleNotFound<T>(result: T | undefined): Promise<T> {
		return new Promise((resolve, reject) => {
			if (typeof result == 'undefined') {
				reject('Not Found')
			}
			resolve(result)
		})
	}

	async function Get<T>(query: string, params: Params): Promise<T> {
		return new Promise((resolve, reject) => {
			Database.get(query, params, (err, result: T) => {
				if (err) reject(err)
				resolve(result)
			})
		}).then(
			result => handleNotFound<T>(result as T),
			reason => Promise.reject(reason)
		)
	}

	return Object.freeze({
		async All<T>(query: string, params?: Params): Promise<Array<T>> {
			return new Promise((resolve, reject) => {
				Database.all(query, params ?? [], (err, result: Array<T>) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
		Get,
		async Run<T = undefined>(query: string, params?: Params): Promise<T> {
			return new Promise((resolve, reject) => {
				Database.run(query, params ?? [], (err, result: T) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
	})
}

export default DatabaseService()
