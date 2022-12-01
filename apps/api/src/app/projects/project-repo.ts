import { database } from '../database'
import { ProjectValue, ProjectRow } from './project'

function ProjectModel() {
	const tableName = 'project'

	async function isExist(id: UniqueId) {
		const result = await database
			.select<ProjectRow>()
			.where('id', id)
			.from(tableName)
			.first()

		if (typeof result === 'undefined') throw new Error('Not Found')

		return true
	}

	return Object.freeze({
		async GetAll(): Promise<ProjectRow[]> {
			try {
				const result = await database
					.select<Array<ProjectRow>>()
					.from(tableName)

				return result
			} catch (e) {
				const err = e
				throw new Error(err?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<ProjectRow> {
			try {
				const result = await database
					.select<ProjectRow>()
					.where({ id })
					.from(tableName)
					.first()

				if (typeof result === 'undefined') {
					throw new Error('Not Found')
				}

				const project = Object.assign(result)
				return project
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: ProjectValue): Promise<void> {
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

		async Update(id: UniqueId, dto: ProjectValue): Promise<void> {
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
