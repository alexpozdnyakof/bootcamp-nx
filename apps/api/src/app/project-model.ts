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
	update(id: UniqueId, value: ProjectDataObject): Promise<void>
}

export default function ProjectModel(): DataModel<
	ProjectValueObject,
	ProjectDataObject
> {
	function handleNotFound<T>(result: T | undefined): Promise<T> {
		return new Promise((resolve, reject) => {
			if (typeof result == 'undefined') {
				reject('Not Found')
			}
			resolve(result as T)
		})
	}
	// ************************************************************************ //

	async function get(): Promise<Array<ProjectValueObject>> {
		const query = 'SELECT * FROM projects'
		return dbService.All<Array<ProjectValueObject>>(query)
	}

	async function findById(id: UniqueId): Promise<ProjectValueObject> {
		const query = 'SELECT * FROM projects WHERE id=?'
		return dbService.Get<ProjectValueObject>(query, [id]).then(
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
			return dbService.Run(query, [dto.title, dto.description])
		},
		async delete(id: UniqueId): Promise<void> {
			const query = 'DELETE FROM projects WHERE id=?'

			return findById(id).then(
				() => dbService.Run(query, [id]),
				reason => Promise.reject(reason)
			)
		},
		async update(id: UniqueId, dto: ProjectDataObject): Promise<void> {
			const query =
				'UPDATE projects SET title=?, description=? WHERE id=?'

			return findById(id).then(
				() => dbService.Run(query, [dto.title, dto.description]),
				reason => Promise.reject(reason)
			)
		},
	})
}
