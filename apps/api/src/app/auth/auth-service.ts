import { ApiCredentials } from '@bootcamp-nx/api-interfaces'
import { UserRepo } from '../user'
import { Webtoken, webtoken } from '../utils'
import CredentialsRepo from './credentials.repo'
import { PasswordService } from './password-service'

export default function AuthService() {
	const userRepo = UserRepo()
	const credentialRepo = CredentialsRepo()
	const passwordService = PasswordService()

	return {
		async SignIn({
			username,
			password,
		}: ApiCredentials): Promise<Webtoken> {
			try {
				/** check is user exist */
				const user = await userRepo.FindByUsername(username)
				if (typeof user == 'undefined')
					throw new Error('User Not Found')

				const userCredential = await credentialRepo.FindByUserId(
					user.id
				)
				if (typeof userCredential == 'undefined')
					throw new Error('Credential Not Found')

				await passwordService.verify(userCredential.password, password)

				return webtoken(user)
			} catch (error) {
				throw new Error('')
			}
		},
	}
}
