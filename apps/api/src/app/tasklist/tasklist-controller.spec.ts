import { json } from 'body-parser'
import express from 'express'
import request from 'supertest'
import { database } from '../database'
import { TasklistController } from './tasklist-controller'
describe('TaskListController', () => {
	const App = express()
	App.use(json())
	App.use('/', TasklistController)

	beforeAll(async () => {
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
	it('should create new one tasklist', async () => {
		const response = await request(App)
			.post('/')
			.set('Accept', 'application/json')
			.send({ title: '新しい計画', description: '簡単な説明' })

		expect(response.status).toBe(201)
	})

	it('should delete tasklist', async () => {
		const response = await request(App).delete('/3')
		expect(response.status).toBe(204)
	})

	it('should update tasklist', async () => {
		const response = await request(App).put('/1').send({
			title: '新しい計画',
			description: '簡単な説明',
		})

		expect(response.status).toBe(204)
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
})

// ** UTIL ** //
function last<T>(array: Array<T>): T {
	return array[array.length - 1]
}
