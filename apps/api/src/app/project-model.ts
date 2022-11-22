import e = require('express')
import { UniqueId, UpdatedCreatedTime } from './data-unit'
import database from './database/database'

export type ProjectValueObject = {
	id: number
	title: string
	description: string | null
} & UpdatedCreatedTime

export type ProjectDataObject = {
	title: string
	description: string | null
}

/**
 * Abstraction over database
 */
export interface DataModel<
	T extends { [key: string]: unknown },
	U extends { [key: string]: unknown }
> {
	get(): Promise<Array<T>>
	findById(id: UniqueId): Promise<T>
	delete(id: UniqueId): Promise<void>
	create(dto: U): Promise<void>
	update(id: UniqueId, value: ProjectDataObject): Promise<void>
}


type DbResult<T> = {
	status: 'success' | 'failed'
	result: T
}

export default function ProjectModel(): DataModel<
	ProjectValueObject,
	ProjectDataObject
> {
	async function dbAll<T>(
		query: string,
		params?: Array<string | number | boolean>
	): Promise<T> {
		return new Promise((resolve, reject) => {
			database.all(query, params ?? [], (err, result: T) => {
				if (err) reject(err)
				resolve(result)
			})
		})
	}

	async function dbGet<T>(
		query: string,
		params?: Array<string | number | boolean>
	): Promise<T> {
		return new Promise((resolve, reject) => {
			database.get(query, params ?? [], (err, result: T) => {
				if (err) reject(err)
				resolve(result)
			})
		})
	}

	async function dbRun<T>(
		query: string,
		params?: Array<string | number | boolean>
	): Promise<T> {
		return new Promise((resolve, reject) => {
			database.run(query, params ?? [], (err, result: T) => {
				if (err) reject(err)
				resolve(result)
			})
		})
	}

	function handleNotFound<T>(result: T | undefined): Promise<T> {
		return new Promise((resolve, reject) => {
			if (typeof result == 'undefined') {
				reject('Not Found')
			}
			resolve(result as T)
		})
	}

	async function get(): Promise<Array<ProjectValueObject>> {
		const query = 'SELECT * FROM projects'
		return dbAll<Array<ProjectValueObject>>(query)
	}

	async function findById(id: UniqueId): Promise<ProjectValueObject> {
		const query = 'SELECT * FROM projects WHERE id=?'
		return dbGet<ProjectValueObject>(query, [id]).then(
			result => handleNotFound<ProjectValueObject>(result),
			reason => Promise.reject(reason)
		)
	}

	return Object.freeze({
		get,
		findById,
		async create(dto: ProjectDataObject): Promise<void> {
			const query =
				'INSERT INTO projects (title, description) VALUES (?,?)'
			return dbRun(query, [dto.title, dto.description])
		},
		async delete(id: UniqueId): Promise<void> {
			const query = 'DELETE FROM projects WHERE id=?'

			return findById(id).then(
				() => dbRun(query, [id]),
				reason => Promise.reject(reason)
			)
		},
		async update(id: UniqueId, dto: ProjectDataObject): Promise<void> {
			const query =
				'UPDATE projects SET title=?, description=? WHERE id=?'

			return findById(id).then(
				() => dbRun(query, [dto.title, dto.description]),
				reason => Promise.reject(reason)
			)
		},
	})
}
