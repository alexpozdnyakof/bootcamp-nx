import { ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { json } from 'body-parser'
import express from 'express'
import request from 'supertest'
import { database } from '../database'
import { TaskController } from './task-controller'
describe('TaskController', () => {
	const App = express()
	App.use(json())
	App.use('/', TaskController)

	const TASK_DTO: ApiTaskDTO = {
		title: '新しい計画',
		done: false,
	}

	async function makeTaskMigrations() {
		await database.migrate.up({
			name: '20221129145851_create_task_table.js',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.js',
		})
		await database.seed.run({ specific: '03-task.js' })
	}

	beforeAll(async () => {
		await makeTaskMigrations()
	})

	it('should find task by id', async () => {
		const response = await request(App).get('/1')
		expect(response.status).toBe(200)
		expect(response.body).toMatchSnapshot()
	})

	it('should create task', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send(TASK_DTO)
		expect(response.status).toBe(201)

		const id = response.body.data.id
		expect(id).toBeDefined()

		const { title, done } = (await request(App).get(`/${id}`)).body
		expect({ title, done }).toEqual(TASK_DTO)
	})

	it('should delete task', async () => {
		const response = await request(App).delete('/1')
		expect(response.status).toBe(204)
	})

	it('should update task', async () => {
		const response = await request(App).put('/2').send(TASK_DTO)
		expect(response.status).toBe(204)

		const { title, done } = (await request(App).get('/2')).body
		expect({ title, done }).toEqual(TASK_DTO)
	})
})
