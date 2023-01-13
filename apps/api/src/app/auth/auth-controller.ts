import { ApiCredentials } from '@bootcamp-nx/api-interfaces'
import { Router } from 'express'
import { ResponseWithMessage } from '../response-types'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import AuthService from './auth-service'
import { ApiCredentialsDTO } from './credentials'

const AuthController = Router()
const AuthRouterPrefix = 'auth'


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

			await authService.SignUp({ username, password })
			const jwtToken = await authService.SignIn({ username, password })

			res.status(201)
				.cookie('refreshToken', jwtToken, {
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

export { AuthController, AuthRouterPrefix }
