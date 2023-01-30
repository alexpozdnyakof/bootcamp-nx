import { database } from '../database'
import { User, UserRow } from './user'
export default function UserRepo() {
	const tableName = 'user'

	return {
		async Save(dto: User): Promise<{ id: number }> {
			const result = await database(tableName)
				.insert(dto)
				.returning<[{ id: number }]>('id')
			const [id] = result
			return id
		},
		async FindById(id: UniqueId): Promise<UserRow> {
			const result = await database
				.select<UserRow>()
				.where({ id })
				.from(tableName)
				.first()

			if (typeof result === 'undefined') {
				throw new Error('Not Found')
			}

			return result
		},
		async FindByUsername(username: string): Promise<UserRow | undefined> {
			const result = await database
				.select<UserRow>()
				.where({ username })
				.from(tableName)
				.first()

			return result
		},
	}
}

const tableName = 'user'

export async function FindUserById(id: UniqueId): Promise<UserRow> {
	const result = await database
		.select<UserRow>()
		.where({ id })
		.from(tableName)
		.first()

	if (typeof result === 'undefined') {
		throw new Error('Not Found')
	}

	return result
}
