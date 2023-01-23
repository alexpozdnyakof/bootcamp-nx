import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { CookieOptions, Router, Response } from 'express'
import { ResponseWithMessage } from '../response-types'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import { ErrorWithMessage, validateEmail } from '../utils'
import AuthService from './auth-service'
import { ApiCredentialsDTO, ApiSignUpDTO } from './credentials'

function tokenCookie(token: string) {
	return [
		'refreshToken',
		token,
		{
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 2 * 60 * 60 * 1000,
		} satisfies CookieOptions,
	] as const
}

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
				.cookie(...tokenCookie(jwtToken))
				.json({
					code: 200,
					message: 'Authorized',
				})
		} catch (error) {
			console.log(error)
			res.status(401).send({ code: 401, message: error?.message })
		}
	}
)

AuthController.post(
	'/sign-up',
	async (
		req: TypedRequest<{ body: ApiSignUp }>,
		res: TypedResponse<ResponseWithMessage>
	) => {
		try {
			const signUpDTO = ApiSignUpDTO.check(req.body)
			const { password, username } = signUpDTO

			if (!validateEmail(username)) throw new Error('Email is invalid')

			await authService.SignUp(signUpDTO)
			const jwtToken = await authService.SignIn({ username, password })

			res.status(201)
				.cookie(...tokenCookie(jwtToken))
				.json({ code: 201, message: 'Authorized' })
		} catch (error) {
			console.log(error)
			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

AuthController.get('/logout', (req, res) => {
	try {
		if (req.user) {
			res.status(200).clearCookie('refreshToken').send({
				code: 200,
				message: 'Succesfull',
			})
		} else {
			throw Error('Not Authorized')
		}
	} catch (error) {
		const [message, status] = ErrorWithMessage(error)
			? [error.message, 400]
			: ['Server Error', 500]

		res.status(status).send(message)
	}
})

AuthController.get('/user', (req, res) => {
	if (req.user) res.status(200).send(req.user)
	else res.status(401).send({ error: 'Not Authorized' })
})

export { AuthController, AuthRouterPrefix }
