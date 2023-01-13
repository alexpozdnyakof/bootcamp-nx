import { Row } from '../database'

export type User = {
	username: string
}

export type UserRow = Row<User>
