import { Row } from '../database'
import { Record, String } from 'runtypes'

export const ApiCredentialsDTO = Record({
	username: String,
	password: String,
})

export type Credential = {
	password: string
}

export type CredentialRow = Row<Credential>
