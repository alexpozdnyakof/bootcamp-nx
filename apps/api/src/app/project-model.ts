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

export default function ProjectModel(): DataModel<
	ProjectValueObject,
	ProjectDataObject
> {
	async function get(): Promise<Array<ProjectValueObject>> {
		const query = 'SELECT * FROM projects'

		return new Promise((resolve, reject) => {
			database.all(query, (err, rows: Array<ProjectValueObject>) => {
				if (err) reject(err)
				resolve(rows)
			})
		})
	}

	async function findById(id: UniqueId): Promise<ProjectValueObject> {
		const query = 'SELECT * FROM projects WHERE id=?'

		return new Promise((resolve, reject) => {
			database.get(query, [id], (err, row: ProjectValueObject) => {
				if (err) reject(err)
				if (typeof row == 'undefined') reject('Not found')
				resolve(row)
			})
		})
	}

	return Object.freeze({
		get,
		findById,
		async create(dto: ProjectDataObject): Promise<void> {
			const query =
				'INSERT INTO projects (title, description) VALUES (?,?)'
			return new Promise((resolve, reject) => {
				database.run(query, [dto.title, dto.description], err => {
					if (err) reject(err)
					resolve()
				})
			})
		},
		async delete(id: UniqueId): Promise<void> {
			const query = 'DELETE FROM projects WHERE id=?'
			return findById(id).then(
				() =>
					new Promise((resolve, reject) => {
						database.run(query, [id], err => {
							if (err) reject(err)
							resolve()
						})
					}),
				reason => Promise.reject(new Error(reason))
			)
		},
		async update(id: UniqueId, dto: ProjectDataObject): Promise<void> {
			const query =
				'UPDATE projects SET title=?, description=? WHERE id=?'

			return findById(id).then(
				() =>
					new Promise((resolve, reject) => {
						database.run(
							query,
							[dto.title, dto.description],
							err => {
								if (err) reject(err)
								resolve()
							}
						)
					}),
				reason => Promise.reject(new Error(reason))
			)
		},
	})
}
