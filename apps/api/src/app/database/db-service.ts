import { Database } from 'sqlite3'
import { InitSqlite } from './db-init'

type Params = Array<string | number | boolean>
interface DatabaseService {
	All<T>(query: string, params?: Params): Promise<Array<T>>
	Get<T>(query: string, params: Params): Promise<T>
	Run<T = undefined>(query: string, params?: Params): Promise<T>
}

export function DatabaseService(Database: Database): DatabaseService {
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

export default DatabaseService(InitSqlite())
