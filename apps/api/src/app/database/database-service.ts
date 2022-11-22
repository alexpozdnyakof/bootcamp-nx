import database from './database'

type DbResult<T> = {
	status: 'success' | 'failed'
	result: T
}

export function DatabaseService() {
	return Object.freeze({
		async All<T>(
			query: string,
			params?: Array<string | number | boolean>
		): Promise<T> {
			return new Promise((resolve, reject) => {
				database.all(query, params ?? [], (err, result: T) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
		async Get<T>(
			query: string,
			params?: Array<string | number | boolean>
		): Promise<T> {
			return new Promise((resolve, reject) => {
				database.get(query, params ?? [], (err, result: T) => {
					if (err) reject(err)
					resolve(result)
				})
			})
		},
		async Run<T>(
			query: string,
			params?: Array<string | number | boolean>
		): Promise<T> {
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
