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
	const taskRelationTableName = 'taskTasklist'

	return IceFactory({
		async IsTaskInList(listId: number, taskId: number): Promise<void> {
			try {
				const result = await database
					.select<{ task_id: number; tasklist_id: number }>()
					.from('taskTasklist')
					.where('taskTasklist.task_id', taskId)
					.first()

				if (typeof result !== 'undefined') {
					const errorMessage =
						result.tasklist_id == listId
							? 'Task already in this list'
							: 'Task already in another list'
					throw new Error(errorMessage)
				}
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async AddTask(listId: number, taskId: number): Promise<void> {
			try {
				return await database(taskRelationTableName).insert({
					tasklist_id: listId,
					task_id: taskId,
				})
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async GetRelatedTasks(id: UniqueId): Promise<TaskRow[]> {
			try {
				return await database
					.select<Array<TaskRow>>('task.*')
					.from('taskTasklist')
					.join('task', 'task.id', 'taskTasklist.task_id')
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
		async Save(dto: TaskListValue): Promise<{ id: number }> {
			try {
				const result = await database(tableName)
					.insert(dto)
					.returning<[{ id: number }]>('id')
				return result[0]
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
