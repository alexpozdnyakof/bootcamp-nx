import request from 'supertest'
import app from './app'

describe('app', () => {
	xit('should return welcome api message', async () => {
		const response: request.Response = await request(app).get('/api')
		expect(response.status).toBe(200)

		expect(response.body).toEqual({ message: 'Welcome to api!' })
	})
})
