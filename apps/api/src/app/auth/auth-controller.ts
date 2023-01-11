import { Router } from 'express'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import { User, UserDTO, UserRepo } from '../user'
import { validateEmail, webtoken } from '../utils'
import { PasswordService } from './password-service'

type Credentials = Pick<User, 'username' | 'password'>

const AuthController = Router()
const userRepo = UserRepo()
const AuthRouterPrefix = 'auth'
const passwordService = PasswordService()
AuthController.post(
	'/sign-in',
	async (
		req: TypedRequest<{ body: Credentials }>,
		res: TypedResponse<{ message: string; code: number }>
	) => {
		try {
			const { username, password } = UserDTO.check(req.body)

			const user = await userRepo.FindByUsername(username)
			if (typeof user == 'undefined') throw new Error('User Not Found')

			await passwordService.verify(user.password, password)

			return res
				.status(200)
				.cookie('refreshToken', webtoken(user), {
					httpOnly: true,
					sameSite: 'strict',
				})
				.json({
					code: 200,
					message: 'Authorized',
				})
		} catch (error) {
			console.log(error)
			res.status(403).send({ code: 403, message: error?.message })
		}
	}
)

AuthController.post(
	'/sign-up',
	async (
		req: TypedRequest<{ body: Credentials }>,
		res: TypedResponse<void>
	) => {
		try {
			const { username, password } = UserDTO.check(req.body)

			if (!validateEmail(username)) throw new Error('Email is invalid')

			const user = await userRepo.FindByUsername(username)

			if (typeof user !== 'undefined')
				throw new Error('User with this username already exist')

			const hashedPassword = await passwordService.hash(password)

			const dto = { username, password: hashedPassword }
			const result = await userRepo.Save(dto)

			const newUser = await userRepo.FindById(result.id)

			res.status(201)
				.cookie('refreshToken', webtoken(newUser), {
					httpOnly: true,
					sameSite: 'strict',
				})
				.json()
		} catch (error) {
			console.log(error)
			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

AuthController.get('/logout', (req, res) => {
	res.clearCookie('refreshToken').end()
})

AuthController.get('/user', (req, res) => {
	if (req.user) res.status(200).send(req.user)
	else res.status(401).send({ error: 'Not Authorized' })
})
/**
 * - [+] Store User to database when sign up
 * - [+] Hash password before store
 * - [+] Send token inside http cookie
 * - [+] Hash Password
 * - [+] Sign In
 * - [+] Sign Up
 * - [+] Logout
 * - [ ] Restore password
 */

export { AuthController, AuthRouterPrefix }
