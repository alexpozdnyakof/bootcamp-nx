import { json } from 'body-parser'
import express from 'express'
import request from 'supertest'
import { database } from '../database'
import { TasklistController } from './tasklist-controller'
describe('TaskListController', () => {
	const App = express()

	const LIST_DTO = { title: '新しい計画', description: '簡単な説明' }

	beforeAll(async () => {
		App.use(json())
		App.use('/', TasklistController)
		await database.migrate.up({
			name: '20221129145937_create_tasklist_table.js',
		})
		await database.migrate.up({
			name: '20221129145851_create_task_table.js',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.js',
		})
		await database.migrate.up({
			name: '20221130102828_create_tasklist_to_project.js',
		})
		await database.seed.run({ specific: '02-tasklist.js' })
		await database.seed.run({ specific: '03-task.js' })
	})

	it('should return all related tasks', async () => {
		const response = await request(App).get('/1/tasks')
		expect(response.status).toBe(200)

		expect(response.body).toMatchSnapshot()
	})
	it('should create tasklist', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send(LIST_DTO)

		expect(response.status).toBe(201)

		const id = response.body.id
		expect(id).toBeDefined()

		const { title, description } = (await request(App).get(`/${id}`)).body
		expect({ title, description }).toEqual(LIST_DTO)
	})

	it('should delete tasklist', async () => {
		const response = await request(App).delete('/3')
		expect(response.status).toBe(204)
	})

	it('should update tasklist', async () => {
		const response = await request(App).put('/1').send(LIST_DTO)
		expect(response.status).toBe(204)

		const { title, description } = (await request(App).get('/1')).body
		expect({ title, description }).toEqual(LIST_DTO)
	})

	it('should add task to tasklist', async () => {
		const beforeTasksInList = (await request(App).get('/1/tasks')).body
		expect(last(beforeTasksInList)).not.toEqual({
			id: 4,
			title: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
			done: false,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		})

		const response = await request(App).post('/1/task').send({
			id: 4,
		})

		expect(response.status).toBe(201)

		const afterTasksInList = (await request(App).get('/1/tasks')).body
		expect(afterTasksInList.length).toBe(beforeTasksInList.length + 1)

		expect(last(afterTasksInList)).toEqual({
			id: 4,
			title: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
			done: false,
			type: 'task',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		})
	})

	it('should return bad request when adding task that already in its list', async () => {
		const response = await request(App).post('/1/task').send({
			id: 4,
		})

		expect(response.status).toBe(400)
		expect(response.body.message).toBe('Task already in this list')
	})

	it('should return bad request when adding task that already in another list', async () => {
		const response = await request(App).post('/1/task').send({
			id: 3,
		})
		expect(response.status).toBe(400)
		expect(response.body.message).toBe('Task already in another list')
	})
})

// ** UTIL ** //
function last<T>(array: Array<T>): T {
	return array[array.length - 1]
}
