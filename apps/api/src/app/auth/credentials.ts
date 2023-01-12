import { Record, String } from 'runtypes'

export const ApiCredentialsDTO = Record({
	username: String,
	password: String,
})
