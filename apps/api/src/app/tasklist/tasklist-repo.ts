import { database } from '../database'
import { TaskListRow, TaskListValue } from './tasklist'

function IceFactory<T extends { [key: string]: unknown }>(
	aObject: T
): Readonly<T> {
	return Object.freeze({ ...aObject })
}

export function TaskListRepo() {
	const tableName = 'tasklist'

	return IceFactory({
		async GetLinkedToProject(id: UniqueId): Promise<TaskListRow[]> {
			return await database
				.select<Array<TaskListRow>>('tasklist.*')
				.from('tasklistProject')
				.join('tasklist', 'tasklist.id', 'tasklistProject.tasklist_id')
				.where('tasklistProject.project_id', id)
		},
		async GetOne(id: UniqueId): Promise<TaskListRow> {
			try {
				return await database
					.select<TaskListRow>()
					.where('id', id)
					.from(tableName)
					.first()
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: TaskListValue): Promise<void> {
			try {
				await database(tableName).insert(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			try {
				await database.del().where({ id }).from(tableName)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Update(id: UniqueId, dto: TaskListValue): Promise<void> {
			try {
				await database(tableName).where('id', id).update(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskListRepo()
