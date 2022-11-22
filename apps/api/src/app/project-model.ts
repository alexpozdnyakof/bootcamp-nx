import { UniqueId, UpdatedCreatedTime } from './data-unit'
import dbService from './database/database-service'

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
	update(id: UniqueId, value: U): Promise<void>
}

export default function ProjectModel(): DataModel<
	ProjectValueObject,
	ProjectDataObject
> {
	async function get(): Promise<ProjectValueObject[]> {
		const query = 'SELECT * FROM projects'
		try {
			return await dbService.All<ProjectValueObject>(query)
		} catch (e) {
			throw new Error(e)
		}
	}

	async function findById(id: UniqueId): Promise<ProjectValueObject> {
		const query = 'SELECT * FROM projects WHERE id=?'

		try {
			return await dbService.Get<ProjectValueObject>(query, [id])
		} catch (e) {
			throw new Error(e)
		}
	}

	return Object.freeze({
		get,
		findById,
		async create(dto: ProjectDataObject): Promise<void> {
			const query =
				'INSERT INTO projects (title, description) VALUES (?,?)'

			try {
				await dbService.Run(query, [dto.title, dto.description])
			} catch (e) {
				throw new Error(e)
			}
		},

		async delete(id: UniqueId): Promise<void> {
			const query = 'DELETE FROM projects WHERE id=?'

			try {
				await findById(id)
				await dbService.Run(query, [id])
			} catch (e) {
				throw e as Error
			}
		},

		async update(id: UniqueId, dto: ProjectDataObject): Promise<void> {
			const query =
				'UPDATE projects SET title=?, description=? WHERE id=?'

			try {
				await findById(id)
				await dbService.Run(query, [dto.title, dto.description])
			} catch (e) {
				throw e as Error
			}
		},
	})
}
