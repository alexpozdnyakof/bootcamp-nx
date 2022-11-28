import { DataModel } from '../database'
import { TaskList, TaskListDTO } from './tasklist'

function IceFactory<T extends { [key: string]: unknown }>(
	aObject: T
): Readonly<T> {
	return Object.freeze({ ...aObject })
}

export function TaskListModel() {
	const tableName = 'tasklist'
	const dataModel = DataModel<TaskListDTO, TaskList>(tableName)

	return IceFactory({
		async GetAll(): Promise<TaskList[]> {
			try {
				return await dataModel.Get()
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<TaskList> {
			try {
				return await dataModel.FindById(id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: TaskListDTO): Promise<void> {
			try {
				await dataModel.Insert(dto)
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

		async Update(id: UniqueId, dto: TaskListDTO): Promise<void> {
			try {
				await dataModel.Update(id, dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default TaskListModel()
