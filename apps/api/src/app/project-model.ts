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
	delete(id: UniqueId): Promise<1 | Error>
	create(dto: U): Promise<void>
}

export default function ProjectModel(): Partial<
	DataModel<ProjectValueObject, ProjectDataObject>
> {
	const result = {
		async get(): Promise<Array<ProjectValueObject>> {
			const query = 'SELECT * FROM projects'

			return new Promise((resolve, reject) => {
				database.all(query, (err, rows: Array<ProjectValueObject>) => {
					if (err) reject(err)
					resolve(rows)
				})
			})
		},
		async findById(id: UniqueId): Promise<ProjectValueObject> {
			const query = 'SELECT * FROM projects WHERE id=?'

			return new Promise((resolve, reject) => {
				database.get(query, [id], (err, row: ProjectValueObject) => {
					if (err) reject(err)
					if (typeof row == 'undefined') reject('Not found')
					resolve(row)
				})
			})
		},
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
		async delete(id: UniqueId): Promise<1 | Error> {
			const query = 'DELETE FROM projects WHERE id=?'
			try {
				await result.findById(id)
				return new Promise((resolve, reject) => {
					database.run(query, [id], err => {
						if (err) reject(err)
						resolve(1)
					})
				})
			} catch (error) {
				return Promise.reject(new Error(error))
			}
		},
	}

	return result
}
