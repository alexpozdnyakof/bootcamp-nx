import { UniqueId } from './data-unit'
import { DbService } from './database'

export interface DataModel<
	DTO extends { [key: string]: unknown },
	Value extends { [key: string]: unknown }
> {
	Get(): Promise<Array<Value>>
	FindById(id: UniqueId): Promise<Value>
	Delete(id: UniqueId): Promise<void>
	Insert(dto: DTO): Promise<void>
	Update(id: UniqueId, dto: DTO): Promise<void>
}

export default function DataModel<
	DTO extends { [key: string]: string | number | boolean },
	Value extends { [key: string]: unknown }
>(tableName: string): DataModel<DTO, Value> {
	async function FindById(id: UniqueId): Promise<Value> {
		const query = `SELECT * FROM ${tableName} WHERE id=?`

		try {
			return await DbService.Get<Value>(query, [id])
		} catch (e) {
			throw new Error(e)
		}
	}

	return Object.freeze({
		async Get(): Promise<Array<Value>> {
			const query = `SELECT * FROM ${tableName}`
			try {
				return await DbService.All<Value>(query)
			} catch (e) {
				throw new Error(e)
			}
		},
		FindById,
		async Insert(dto: DTO): Promise<void> {
			const rows = Object.keys(dto)
			const placeholder = rows.map(() => '?')
			const values = Object.values(dto)

			const query = `INSERT INTO ${tableName} (${rows.join(
				','
			)}) VALUES (${placeholder.join(',')})`

			try {
				await DbService.Run(query, values)
			} catch (e) {
				throw new Error(e)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			const query = `DELETE FROM ${tableName} WHERE id=?`

			try {
				await FindById(id)
				await DbService.Run(query, [id])
			} catch (e) {
				throw e as Error
			}
		},

		async Update(id: UniqueId, dto: DTO): Promise<void> {
			const valuesPlaceholder = Object.keys(dto)
				.map(key => `${key}=?`)
				.join(',')
			const query = `UPDATE ${tableName} SET ${valuesPlaceholder} WHERE id=?`

			try {
				await FindById(id)
				await DbService.Run(query, Object.values(dto))
			} catch (e) {
				throw e as Error
			}
		},
	})
}
