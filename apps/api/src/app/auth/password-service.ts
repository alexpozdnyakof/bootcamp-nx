import { hash, verify } from 'argon2'

export function PasswordService() {
	return {
		async hash(password: string) {
			try {
				return await hash(password)
			} catch (error) {
				throw new Error(error.message)
			}
		},
		async verify(hash: string, password: string) {
			try {
				const passwordVerified = await verify(hash, password)
				if (!passwordVerified) {
					throw new Error('Wrong password')
				}
			} catch (error) {
				throw new Error(error.message)
			}
		},
	}
}
