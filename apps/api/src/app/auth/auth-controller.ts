import { ApiCredentials } from '@bootcamp-nx/api-interfaces'
import { Router } from 'express'
import { ResponseWithMessage } from '../response-types'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import { UserRepo } from '../user'
import { validateEmail, webtoken } from '../utils'
import AuthService from './auth-service'
import { ApiCredentialsDTO } from './credentials'
import CredentialsRepo from './credentials.repo'
import { PasswordService } from './password-service'

const AuthController = Router()
const userRepo = UserRepo()
const credentialRepo = CredentialsRepo()
const AuthRouterPrefix = 'auth'
const passwordService = PasswordService()
const authService = AuthService()
AuthController.post(
	'/sign-in',
	async (
		req: TypedRequest<{ body: ApiCredentials }>,
		res: TypedResponse<ResponseWithMessage>
	) => {
		try {
			const { username, password } = ApiCredentialsDTO.check(req.body)
			const jwtToken = await authService.SignIn({ username, password })

			return res
				.status(200)
				.cookie('refreshToken', jwtToken, {
					httpOnly: true,
					sameSite: 'strict',
				})
				.json({
					code: 200,
					message: 'Authorized',
				})
		} catch (error) {
			res.status(401).send({ code: 401, message: error?.message })
		}
	}
)

AuthController.post(
	'/sign-up',
	async (
		req: TypedRequest<{ body: ApiCredentials }>,
		res: TypedResponse<ResponseWithMessage>
	) => {
		try {
			const { username, password } = ApiCredentialsDTO.check(req.body)

			/**  check is user valid and not exist **/
			if (!validateEmail(username)) throw new Error('Email is invalid')
			const user = await userRepo.FindByUsername(username)
			if (typeof user !== 'undefined')
				throw new Error('User with this username already exist')
			const { id: user_id } = await userRepo.Save({ username })

			/**  process password and save credentials **/
			const hashedPassword = await passwordService.hash(password)
			const { id: credential_id } = await credentialRepo.Save({
				password: hashedPassword,
			})

			await credentialRepo.AddUserFor({ user_id, credential_id })
			const newUser = await userRepo.FindById(user_id)

			res.status(201)
				.cookie('refreshToken', webtoken(newUser), {
					httpOnly: true,
					sameSite: 'strict',
				})
				.json({ code: 201, message: 'Authorized' })
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
