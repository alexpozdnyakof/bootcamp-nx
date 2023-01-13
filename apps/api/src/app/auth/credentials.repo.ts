import { database } from '../database'
import { Credentials } from './credentials'

export default function CredentialsRepo() {
	const tableName = 'credentials'
	const userRelationTableName = 'userCredential'

	return {
		async Save(dto: Credentials): Promise<{ id: number }> {
			try {
				const [id] = await database(tableName)
					.insert(dto)
					.returning<[{ id: number }]>('id')

				return id
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async AddUserFor(
			dto: Record<'user_id' | 'credential_id', number>
		): Promise<void> {
			try {
				await database(userRelationTableName).insert(dto)
			} catch (error) {
				throw new Error(error?.message)
			}
		},
	}
}
