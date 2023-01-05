import { jwtSignature } from './jwt-signature'

export function webtoken(payload: { [key: string]: unknown }) {
	const head = Buffer.from(
		JSON.stringify({ alg: 'HS256', type: 'jwt' })
	).toString('base64')

	const body = Buffer.from(JSON.stringify(payload)).toString('base64')

	const signature = jwtSignature(head, body, process.env.SECRET_KEY)

	return `${head}.${body}.${signature}`
}
