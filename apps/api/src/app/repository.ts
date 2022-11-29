import { DatabaseService } from './database'


export default function BaseRepository<
	DTO extends { [key: string]: string | number | boolean },
	Value extends { [key: string]: unknown }
>(tableName: string, Database: DatabaseService) {
	async function GetOne(id: UniqueId): Promise<Value> {
		const query = `SELECT * FROM ${tableName} WHERE id=?`

		try {
			return await Database.Get<Value>(query, [id])
		} catch (e) {
			throw new Error(e)
		}
	}

	return Object.freeze({
		async GetAll(): Promise<Array<Value>> {
			const query = `SELECT * FROM ${tableName}`
			try {
				return await Database.All<Value>(query)
			} catch (e) {
				throw new Error(e)
			}
		},
		GetOne,
		async Add(dto: DTO): Promise<void> {
			const rows = Object.keys(dto)
			const placeholder = rows.map(() => '?')
			const values = Object.values(dto)

			const query = `INSERT INTO ${tableName} (${rows.join(
				','
			)}) VALUES (${placeholder.join(',')})`

			try {
				await Database.Run(query, values)
			} catch (e) {
				throw new Error(e)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			const query = `DELETE FROM ${tableName} WHERE id=?`

			try {
				await GetOne(id)
				await Database.Run(query, [id])
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
				await GetOne(id)
				await Database.Run(query, Object.values(dto))
			} catch (e) {
				throw e as Error
			}
		},
	})
}
