import { Request, Response, NextFunction } from 'express'
import { jwtSignature, parseCookie } from '../utils'

export const auth = () => (req: Request, res: Response, next: NextFunction) => {
	try {
		const refreshToken = getRefreshTokenFromCookie(req)
		const [head, body, signature] = refreshToken.split('.')
		const genereatedSignature = jwtSignature(
			head,
			body,
			process.env.SECRET_KEY
		)

		if (signature !== genereatedSignature) throw new Error()
		req.user = JSON.parse(Buffer.from(body, 'base64').toString('utf8'))

		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ code: 401, message: 'Unauthorized' })
	}
}

const getRefreshTokenFromCookie = (req: Request): string => {
	const refreshToken = parseCookie(req.headers.cookie)?.refreshToken
	return refreshToken ? decodeURIComponent(refreshToken) : ''
}
