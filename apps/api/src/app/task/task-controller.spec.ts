import { json } from 'body-parser'
import express from 'express'
import request from 'supertest'
import { database } from '../database'
import { TaskController } from './task-controller'
describe('TaskController', () => {
	const App = express()
	App.use(json())
	App.use('/', TaskController)

	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145851_create_task_table.js',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.js',
		})
		await database.seed.run({ specific: '03-task.js' })
	})

	it('should return task', async () => {
		const response = await request(App).get('/1')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should add new one task', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send({
				title: '新しい計画',
				done: false,
			})

		expect(response.status).toBe(201)
	})

	it('should delete task', async () => {
		const response = await request(App).delete('/1')
		expect(response.status).toBe(204)
	})

	it('should update task', async () => {
		const response = await request(App).put('/2').send({
			title: '新しい計画',
			done: true,
		})

		expect(response.status).toBe(204)
	})
})
