import { database } from '../database'
import { Credential, CredentialRow } from './credentials'

export default function CredentialsRepo() {
	const tableName = 'credential'
	const userRelationTableName = 'userCredential'

	return {
		async Save(dto: Credential): Promise<{ id: UniqueId }> {
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
			dto: Record<'user_id' | 'credential_id', UniqueId>
		): Promise<void> {
			try {
				await database(userRelationTableName).insert(dto)
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async FindByUserId(userId: UniqueId): Promise<CredentialRow> {
			try {
				return await database
					.select<CredentialRow>('credential.*')
					.from(userRelationTableName)
					.join(
						tableName,
						`${tableName}.id`,
						`${userRelationTableName}.credential_id`
					)
					.where(`${userRelationTableName}.user_id`, userId)
					.first()
			} catch (error) {
				throw new Error(error?.message)
			}
		},
	}
}