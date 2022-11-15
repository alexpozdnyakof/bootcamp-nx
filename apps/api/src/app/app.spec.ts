import * as request from 'supertest'
import app from './app'

describe('app', () => {
	it('should return welcome api message', async () => {
		const response: request.Response = await request(app).get('/api')
		expect(response.status).toBe(200)

		expect(response.body).toEqual({ message: 'Welcome to api!' })
	})

	it('should return task id', async () => {
		const response: request.Response = await request(app).get('/tasklist/3')
		expect(response.status).toBe(200)

		expect(response.body).toEqual({ id: '3' })
	})
})
