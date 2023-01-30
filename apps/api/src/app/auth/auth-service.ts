import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { hash, verify } from 'argon2'
import { UserRepo } from '../user'
import { Webtoken, webtoken } from '../utils'
import CredentialsRepo from './credentials.repo'
export default function AuthService() {
	const userRepo = UserRepo()
	const credentialRepo = CredentialsRepo()

	return {
		async SignIn({
			username,
			password,
		}: ApiCredentials): Promise<Webtoken> {
			const user = await userRepo.FindByUsername(username)
			if (typeof user == 'undefined') throw new Error('User Not Found')

			const userCredential = await credentialRepo.FindByUserId(user.id)
			if (typeof userCredential == 'undefined')
				throw new Error('Credential Not Found')

			if (await verify(userCredential.password, password)) {
				return webtoken(user)
			} else {
				throw new Error(`Password didn't match`)
			}
		},
		async SignUp({ password, ...userDTO }: ApiSignUp): Promise<void> {
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
		},
	}
}
