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
}

export default function ProjectModel(): Partial<
	DataModel<ProjectValueObject, ProjectDataObject>
> {
	return {
		async get() {
			const query = 'SELECT * FROM projects'

			return new Promise((resolve, reject) => {
				database.all(query, (err, rows: Array<ProjectValueObject>) => {
					if (err) reject(err)
					resolve(rows)
				})
			})
		},
		async findById(id: UniqueId) {
			const query = 'SELECT * FROM projects WHERE id=?'

			return new Promise((resolve, reject) => {
				database.get(query, [id], (err, row: ProjectValueObject) => {
					if (err) reject(err)
					resolve(row)
				})
			})
		},
		async create(dto: ProjectDataObject) {
			const query = 'INSERT INTO projects (title, description)'
			return new Promise((resolve, reject) => {
				database.run(query, [dto.title, dto.description], err => {
					if (err) reject(err)
					resolve()
				})
			})
		},
	}
}
