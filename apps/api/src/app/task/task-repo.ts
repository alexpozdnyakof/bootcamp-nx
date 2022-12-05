import { database } from '../database'
import { TaskRow, TaskValue } from './task'

function TaskFactory(row: TaskRow): Omit<TaskRow, 'done'> & { done: boolean } {
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
		async GetOne(
			id: UniqueId
		): Promise<Omit<TaskRow, 'done'> & { done: boolean }> {
			try {
				const result = await database
					.select<TaskRow>()
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
		async Add(
			dto: Omit<TaskValue, 'done'> & { done: boolean }
		): Promise<void> {
			try {
				await database(tableName).insert({
					...dto,
					done: Number(dto.done),
				})
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

		async Update(
			id: UniqueId,
			dto: Omit<TaskValue, 'done'> & { done: boolean }
		): Promise<void> {
			try {
				await isExist(id)
				await database(tableName)
					.where({ id })
					.update({
						...dto,
						done: Number(dto.done),
					})
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskRepo()
