import { Record, String } from 'runtypes'
import { Row } from '../database'

export type User = {
	username: string
	password: string
}

export const UserDTO = Record({
	username: String,
	password: String,
})

export type UserRow = Row<User>
