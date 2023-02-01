import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { PrismaClient } from '@prisma/client'
import { hash, verify } from 'argon2'
import { Webtoken, webtoken } from '../utils'
export default function AuthService() {
	const prisma = new PrismaClient()

	return {
		async SignIn({
			username,
			password,
		}: ApiCredentials): Promise<Webtoken> {
			const user = await prisma.user.findUnique({
				where: { username },
			})

			console.log(user)
			if (typeof user == 'undefined') throw new Error('User Not Found')

			const userCredential = await prisma.credential.findUnique({
				where: { user_id: user.id },
			})

			if (await verify(userCredential.password, password)) {
				return webtoken(user)
			} else {
				throw new Error(`Password didn't match`)
			}
		},
		async SignUp({ password, ...userDTO }: ApiSignUp): Promise<void> {
			const existUser = await prisma.user.findUnique({
				where: { username: userDTO.username },
			})

			if (existUser !== null)
				throw new Error('User with this username already exist')

			const hashed = await hash(password)

			await prisma.user.create({
				data: {
					...userDTO,
					credential: {
						create: {
							password: hashed,
						},
					},
				},
			})
		},
	}
}
