import { DataModel, UniqueId, UpdatedCreatedTime } from '../database'

export type Value = {
	id: number
	title: string
	description: string | null
} & UpdatedCreatedTime

export type DTO = {
	title: string
	description: string | null
}

export default function ProjectModel() {
	const tableName = 'projects'
	const dataModel = DataModel<DTO, Value>(tableName)

	return Object.freeze({
		async GetAll(): Promise<Value[]> {
			try {
				return await dataModel.Get()
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<Value> {
			try {
				return await dataModel.FindById(id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: DTO): Promise<void> {
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

		async Update(id: UniqueId, dto: DTO): Promise<void> {
			try {
				await dataModel.Update(id, dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}
