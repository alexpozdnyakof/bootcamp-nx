import { database } from '../database'
import { Project, ProjectDTO } from './project'

function ProjectModel() {
	const tableName = 'project'

	async function isExist(id: UniqueId) {
		const result = await database
			.select<Project>()
			.where('id', id)
			.from(tableName)
			.first()

		if (typeof result === 'undefined') throw new Error('Not Found')

		return true
	}

	return Object.freeze({
		async GetAll(): Promise<Project[]> {
			try {
				return await database.select().from(tableName)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<Project> {
			try {
				const result = await database
					.select<Project>()
					.where({ id })
					.from(tableName)
					.first()

				if (typeof result === 'undefined') {
					throw new Error('Not Found')
				}

				return result
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: ProjectDTO): Promise<void> {
			try {
				await database(tableName).insert(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			try {
				await isExist(id)
				await database.del().where({ id }).from(tableName)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Update(id: UniqueId, dto: ProjectDTO): Promise<void> {
			try {
				await isExist(id)
				await database(tableName).where({ id }).update(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default ProjectModel()
