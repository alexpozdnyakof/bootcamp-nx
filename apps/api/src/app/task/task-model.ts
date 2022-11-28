import { DataModel } from '../database'
import { Task, TaskDTO } from './task'

function TaskModel() {
	const tableName = 'task'
	const dataModel = DataModel<
		Omit<TaskDTO, 'done'> & { done: number },
		Omit<Task, 'done'> & { done: number }
	>(tableName)

	// const withBooleanDone = (task: (Omit<Task, 'done'>  | Omit<TaskDTO, 'done'>) & { done: number }) => {
	//   Object.assign(task, { done: Boolean(task.done) })
	// }

	const withBooleanDone = <T extends { done: number }>(
		t: T
	): Omit<T, 'done'> & { done: boolean } => {
		return Object.assign(t, { done: Boolean(t.done) })
	}

	return Object.freeze({
		async GetAll(): Promise<Task[]> {
			try {
				const tasks = await dataModel.Get()
				const result = tasks.map(task => withBooleanDone(task))
				return result
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<Task> {
			try {
				const task = await dataModel.FindById(id)
				return withBooleanDone(task)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: TaskDTO): Promise<void> {
			try {
				await dataModel.Insert(
					Object.assign(dto, { done: Number(dto.done) })
				)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			try {
				await dataModel.Delete(id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Update(id: UniqueId, dto: TaskDTO): Promise<void> {
			try {
				await dataModel.Update(
					id,
					Object.assign(dto, { done: Number(dto.done) })
				)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskModel()
