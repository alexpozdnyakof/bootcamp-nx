import { Request, Response, NextFunction } from 'express'
import { jwtSignature, parseCookie } from '../utils'

export const auth = () => (req: Request, _: Response, next: NextFunction) => {
	if (req.headers.cookie) {
		const refreshToken = getRefreshTokenFromCookie(req)
		if (refreshToken) {
			const [head, body, signature] = refreshToken.split('.')

			const genereatedSignature = jwtSignature(
				head,
				body,
				process.env.SECRET_KEY
			)

			if (signature === genereatedSignature) {
				req.user = JSON.parse(
					Buffer.from(body, 'base64').toString('utf8')
				)
			}
		}
	}

	next()
}

const getRefreshTokenFromCookie = (req: Request): string => {
	const refreshToken = parseCookie(req.headers.cookie)?.refreshToken
	return refreshToken ? decodeURIComponent(refreshToken) : ''
}
