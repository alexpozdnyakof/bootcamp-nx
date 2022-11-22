import database from './database'

type Params = Array<string | number | boolean>

export type DbResult<T = undefined> =
	| {
			status: 'success'
			result: T
	  }
	| {
			status: 'failed'
			result: string
	  }

interface DatabaseService {
	All<T>(query: string, params?: Params): Promise<Array<T>>
	Get<T>(query: string, params: Params): Promise<T>
	Run<T = undefined>(query: string, params?: Params): Promise<T>
}

export function DatabaseService(): DatabaseService {
	const DbResult = <T = undefined>(
		status: DbResult<T>['status'],
		result: T
	): DbResult<T> => {
		if (status == 'success') {
			return {
				status,
				result,
			}
		}
		if (status == 'failed') {
			return {
				status,
				result: result as string,
			}
		}
	}

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
			database.get(query, params, (err, result: T) => {
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
				database.all(query, params ?? [], (err, result: Array<T>) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
		Get,
		async Run<T = undefined>(query: string, params?: Params): Promise<T> {
			return new Promise((resolve, reject) => {
				database.run(query, params ?? [], (err, result: T) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
	})
}

export default DatabaseService()
