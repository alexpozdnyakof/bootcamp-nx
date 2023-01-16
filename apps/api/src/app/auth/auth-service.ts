import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { UserRepo } from '../user'
import { validateEmail, Webtoken, webtoken } from '../utils'
import CredentialsRepo from './credentials.repo'
import { verify, hash } from 'argon2'
export default function AuthService() {
	const userRepo = UserRepo()
	const credentialRepo = CredentialsRepo()

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

				await verify(userCredential.password, password)

				return webtoken(user)
			} catch (error) {
				throw new Error('')
			}
		},
		async SignUp({ password, ...userDTO }: ApiSignUp): Promise<void> {
			try {
				/**  check is user valid and not exist **/
				const user = await userRepo.FindByUsername(userDTO.username)
				if (typeof user !== 'undefined')
					throw new Error('User with this username already exist')

				const { id: user_id } = await userRepo.Save(userDTO)

				/**  process password and save credentials **/
				const hashedPassword = await hash(password)
				const { id: credential_id } = await credentialRepo.Save({
					password: hashedPassword,
				})

				await credentialRepo.AddUserFor({ user_id, credential_id })
			} catch (error) {
				throw new Error(error?.message)
			}
		},
	}
}
