import express from 'express'
import request from 'supertest'
import { json } from 'body-parser'
import { ProjectController } from './project-controller'
import { database } from '../database'
describe('ProjectController', () => {
	const App = express()
	App.use(json())
	App.use('/', ProjectController)

	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145930_create_project_table.js',
		})
		await database.migrate.up({
			name: '20221129145937_create_tasklist_table.js',
		})
		await database.migrate.up({
			name: '20221130102828_create_tasklist_to_project.js',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.js',
		})
		await database.migrate.up({
			name: '20221129145851_create_task_table.js',
		})
		await database.seed.run({ specific: '01-project.js' })
		await database.seed.run({ specific: '02-tasklist.js' })
		await database.seed.run({ specific: '03-task.js' })
	})

	it('should return all projects', async () => {
		const response = await request(App).get('/')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should return all related tasklists', async () => {
		const response = await request(App).get('/1/tasklists')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should return all related tasks', async () => {
		const response = await request(App).get('/1/tasks')
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
				title: '???????????????',
				description: '???????????????',
			})

		expect(response.status).toBe(201)
	})

	it('should not create invalid project', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send({
				message: '???????????????',
			})

		expect(response.status).toBe(400)
		expect(response.body).toMatchSnapshot()
	})

	it('should delete exist project', async () => {
		const response = await request(App).delete('/3')
		expect(response.status).toBe(200)
	})

	it('should update project', async () => {
		const response = await request(App).put('/1').send({
			title: '???????????????',
			description: '???????????????',
		})
		expect(response.status).toBe(201)
	})

	it('should return 404 when update non-existing project ', async () => {
		const response = await request(App).put('/10').send({
			title: '???????????????',
			description: '???????????????',
		})

		expect(response.status).toBe(400)
		expect(response.body).toEqual({ message: 'Not Found' })
	})

	it('should return 400 for project invalid update', async () => {
		const response = await request(App).put('/10').send({
			message: '???????????????',
		})

		expect(response.status).toBe(400)
		expect(response.body).toMatchSnapshot()
	})
})
