import { Row } from '../database'

export type User = {
	username: string
	first_name: string
	last_name: string
	birthdate: string
}

export type UserRow = Row<User>
