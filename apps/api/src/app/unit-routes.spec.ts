import * as request from 'supertest'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import router from './unit-routes'
import { database } from './database/database'
describe('Tasklist', () => {
	const app = express()
	app.use('/', router)

	afterAll(() => {
		database.close()
		fs.unlinkSync(path.join(__dirname, '/database/test.sqlite'))
	})
	it('should return all projects', async () => {
		const response = await request(app).get('/projects')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should return unit id', async () => {
		const response = await request(app).get('/unit/3')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({ id: 3 })
	})

	it('should return unit id', async () => {
		const response = await request(app).patch('/unit/3')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({ id: 3 })
	})

	it('should return unit id', async () => {
		const response = await request(app).delete('/unit/3')
		expect(response.status).toBe(200)
		expect(response.body).toEqual({ id: 3 })
	})
})
