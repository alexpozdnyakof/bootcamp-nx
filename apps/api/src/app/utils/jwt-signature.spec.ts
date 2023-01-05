import { jwtSignature } from './jwt-signature'
describe('JWT Signature', () => {
	it('should return same string for same head and body', () => {
		const [head, body, secret] = ['23', '17', 'secret']
		expect(jwtSignature(head, body, secret)).toBe(
			jwtSignature(head, body, secret)
		)
	})
})
