import * as express from 'express'
import * as request from 'supertest'
import { database, seeds, undoSeeds } from './database/database'
import router from './unit-routes'

describe('Tasklist', () => {
	const app = express()
	app.use('/', router)
	beforeEach(() => {
		seeds()
	})

	afterAll(() => {
		undoSeeds()
		database.close()
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
