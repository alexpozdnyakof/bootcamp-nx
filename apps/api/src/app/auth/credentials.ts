import { Row } from '../database'
import { Record, String } from 'runtypes'

export const ApiCredentialsDTO = Record({
	username: String,
	password: String,
})

export type Credentials = {
	password: string
}

export type CredentialsRow = Row<Credentials>
