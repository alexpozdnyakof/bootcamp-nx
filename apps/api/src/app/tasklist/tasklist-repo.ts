import { database } from '../database'
import { TaskList, TaskListDTO } from './tasklist'

function IceFactory<T extends { [key: string]: unknown }>(
	aObject: T
): Readonly<T> {
	return Object.freeze({ ...aObject })
}

export function TaskListRepo() {
	const tableName = 'tasklist'

	return IceFactory({
		async GetLinkedToProject(id: UniqueId) {
			return (
				await database
					.select<Array<{ tasklist_id: number }>>('tasklist_id')
					.from('tasklistProject')
					.where('tasklistProject.project_id', id)
			).map(list => list?.tasklist_id)
		},
		async GetAll(): Promise<TaskList[]> {
			try {
				return await database.select().from(tableName)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<TaskList> {
			try {
				return await database
					.select<TaskList>()
					.where('id', id)
					.from(tableName)
					.first()
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: TaskListDTO): Promise<void> {
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

		async Update(id: UniqueId, dto: TaskListDTO): Promise<void> {
			try {
				await database(tableName).where('id', id).update(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskListRepo()
