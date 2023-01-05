import { webtoken } from './webtoken'

describe('WebToken', () => {
	const env = process.env

	beforeAll(() => {
		process.env.SECRET_KEY = '123qwe123'
	})

	afterAll(() => {
		jest.resetModules()
		process.env = env
	})

	it('should create token', () => {
		const token = webtoken({ id: 1 })

		const [head, body, signature] = token.split('.')
		expect(head).toBeDefined()
		expect(body).toBeDefined()
		expect(signature).toBeDefined()
	})
})
