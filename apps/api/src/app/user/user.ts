import { Row } from '../database'

export type User = {
	username: string
	password: string
}

export type UserRow = Row<User>
