import { database } from '../database'
import { Task, TaskDTO } from './task'

function TaskFactory(row: Omit<Task, 'done'> & { done: 0 | 1 }): Task {
	return Object.assign(row, { done: Boolean(row.done) })
}
function TaskRepo() {
	const tableName = 'task'

	async function isExist(id: UniqueId) {
		const result = await database
			.select()
			.where('id', id)
			.from(tableName)
			.first()

		if (typeof result === 'undefined') throw new Error('Not Found')

		return true
	}

	return Object.freeze({
		async GetAll(): Promise<Task[]> {
			try {
				return await database.select().from(tableName)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<Task> {
			try {
				const result = await database
					.select<Omit<Task, 'done'> & { done: 0 | 1 }>()
					.where({ id })
					.from(tableName)
					.first()

				if (typeof result === 'undefined') {
					throw new Error('Not Found')
				}

				return TaskFactory(result)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: TaskDTO): Promise<void> {
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

		async Update(id: UniqueId, dto: TaskDTO): Promise<void> {
			try {
				await isExist(id)
				await database(tableName).where({ id }).update(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskRepo()
