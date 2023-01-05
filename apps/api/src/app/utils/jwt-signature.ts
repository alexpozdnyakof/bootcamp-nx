import { createHmac } from 'node:crypto'

export function jwtSignature(head: string, body: string, secret: string) {
	return createHmac('SHA256', secret)
		.update(`${head}.${body}`)
		.digest('base64')
}
