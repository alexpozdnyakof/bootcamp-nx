import * as express from 'express'
import * as request from 'supertest'
import { json } from 'body-parser'
import { ProjectRouter } from './project-routes'
describe('ProjectRouter', () => {
	const App = express()
	App.use(json())
	App.use('/', ProjectRouter)

	it('should return all projects', async () => {
		const response = await request(App).get('/')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should return project with id 1', async () => {
		const response = await request(App).get('/1')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should return 404 when get non-existing project', async () => {
		const response = await request(App).get('/10')
		expect(response.status).toBe(404)
		expect(response.body).toEqual({ message: 'Not Found' })
	})

	it('should create new one project', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send({
				title: '新しい計画',
				description: '簡単な説明',
			})

		expect(response.status).toBe(200)
	})

	it('should not create invalid project', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send({
				message: '簡単な説明',
			})

		expect(response.status).toBe(400)
		expect(response.body).toMatchSnapshot()
	})

	it('should delete exist project', async () => {
		const response = await request(App).delete('/3')
		expect(response.status).toBe(200)
	})

	it('should rejects when delete non-existing project ', async () => {
		const response = await request(App).delete('/10')
		expect(response.status).toBe(404)
		expect(response.body).toEqual({ message: 'Not Found' })
	})

	it('should return 200 when update exist entity', async () => {
		const response = await request(App).put('/1').send({
			title: '新しい計画',
			description: '簡単な説明',
		})

		expect(response.status).toBe(200)
	})

	it('should return 404 when update non-existing project ', async () => {
		const response = await request(App).put('/10').send({
			title: '新しい計画',
			description: '簡単な説明',
		})

		expect(response.status).toBe(404)
		expect(response.body).toEqual({ message: 'Not Found' })
	})

	it('should return 400 for project invalid update', async () => {
		const response = await request(App).put('/10').send({
			message: '簡単な説明',
		})

		expect(response.status).toBe(400)
		expect(response.body).toMatchSnapshot()
	})
})
