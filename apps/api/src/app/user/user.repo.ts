import { database } from '../database'
import { User, UserRow } from './user'

const USERS = [
	{
		id: 1,
		username: 'user1',
		password: 'password1',
	},
	{
		id: 2,
		username: 'user2',
		password: 'password2',
	},
	{
		id: 3,
		username: 'user3',
		password: 'password3',
	},
]

export default function UserRepo() {
	const tableName = 'user'

	return {
		async Save(
			dto: Pick<User, 'username' | 'password'>
		): Promise<{ id: number }> {
			try {
				const result = await database(tableName)
					.insert(dto)
					.returning<[{ id: number }]>('id')
				const [id] = result
				return id
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async FindById(id: UniqueId): Promise<UserRow> {
			try {
				const result = await database
					.select<UserRow>()
					.where({ id })
					.from(tableName)
					.first()

				if (typeof result === 'undefined') {
					throw new Error('Not Found')
				}

				return result
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async FindByUsername(username: string): Promise<UserRow | undefined> {
			try {
				const result = await database
					.select<UserRow>()
					.where({ username })
					.from(tableName)
					.first()

				return result
			} catch (error) {
				throw new Error(error?.message)
			}
		},
		async findByCredentials({
			username,
			password,
		}: Pick<User, 'username' | 'password'>): Promise<
			User & { id: number }
		> {
			const byLogin = USERS.find(user => user.username == username)
			if (!byLogin) throw new Error('User by login not found')
			if (byLogin.password !== password)
				throw new Error('Password is incorrect')

			return byLogin
		},
	}
}
