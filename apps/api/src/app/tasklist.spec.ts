import * as request from 'supertest'
import * as express from 'express'
import router from './tasklist.routes'
describe('Tasklist', () => {
	const app = express()
	app.use('/', router)
	it('should return gived id', async () => {
		const response = await request(app).get('/10')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({ id: '10' })
	})
})
