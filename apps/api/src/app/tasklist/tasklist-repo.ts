import { database } from '../database'
import { TaskRow } from '../task/task'
import { TaskListRow, TaskListValue } from './tasklist'

function IceFactory<T extends { [key: string]: unknown }>(
	aObject: T
): Readonly<T> {
	return Object.freeze({ ...aObject })
}

export function TaskListRepo() {
	const tableName = 'tasklist'

	return IceFactory({
		async GetRelatedTasks(id: UniqueId): Promise<TaskRow[]> {
			try {
				return await database
					.select<Array<TaskRow>>('task.*')
					.from('taskTasklist')
					.join('tasklist', 'tasklist.id', 'taskTasklist.tasklist_id')
					.where('taskTasklist.tasklist_id', id)
			} catch (e) {
				throw new Error(e?.message)
			}
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
