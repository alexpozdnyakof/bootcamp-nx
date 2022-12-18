import { database } from '../database'
import { TaskRow, TaskValue } from './task'

export function TaskRepo() {
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
		async GetOne(id: UniqueId): Promise<TaskRow> {
			try {
				const result = await database
					.select<TaskRow>()
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
		async Add(
			dto: Omit<TaskValue, 'done'> & { done: boolean }
		): Promise<{ id: number }> {
			try {
				const result = await database(tableName)
					.insert({
						...dto,
						done: Number(dto.done),
					})
					.returning<[{ id: number }]>('id')
				return result[0]
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
