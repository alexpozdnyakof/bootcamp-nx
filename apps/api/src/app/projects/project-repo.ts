import { database } from '../database'
import { TaskRow } from '../task/task'
import { TaskListRow } from '../tasklist'
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
		async GetSections(id: UniqueId): Promise<any> {
			return await database
		},
		async GetRelatedTasklists(id: UniqueId): Promise<TaskListRow[]> {
			return await database
				.select<Array<TaskListRow>>('tasklist.*')
				.from('tasklistProject')
				.join('tasklist', 'tasklist.id', 'tasklistProject.tasklist_id')
				.where('tasklistProject.project_id', id)
		},
		async GetRelatedTasks(
			id: UniqueId
		): Promise<(TaskRow & { tasklist_id: number })[]> {
			try {
				return await database
					.select<Array<TaskRow & { tasklist_id: number }>>(
						'task.*',
						'taskTasklist.tasklist_id'
					)
					.from('tasklistProject')
					.join(
						'tasklist',
						'tasklist.id',
						'tasklistProject.tasklist_id'
					)
					.join(
						'taskTasklist',
						'taskTasklist.tasklist_id',
						'tasklist.id'
					)
					.join('task', 'task.id', 'taskTasklist.task_id')
					.where('tasklistProject.project_id', id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async GetAll(id: UniqueId): Promise<ProjectRow[]> {
			try {
				const result = await database
					.select<Array<ProjectRow>>()
					.from(tableName)
					.where('owner_id', id)
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

				return result
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
