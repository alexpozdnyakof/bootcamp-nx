import { ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from './data-access-bootcamp'

describe('dataAccessBootcamp', () => {
	const bootcampApi = ApiBootcamp()

	const API_TASK_DTO: ApiTaskDTO = {
		title: '血液',
		done: false,
		project_id: 1,
	}

	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(),
				text: () => Promise.resolve(),
			} as unknown as Response)
		)
	})
	it('should fetch all projects', async () => {
		await bootcampApi.Projects()
		expect(global.fetch).toHaveBeenCalledWith(
			'/api/project',
			expect.any(Object)
		)
	})

	it('should fetch project with id', async () => {
		await bootcampApi.Project(5)
		expect(global.fetch).toHaveBeenCalledWith(
			'/api/project/5',
			expect.any(Object)
		)
	})
	it('should fetch save task', async () => {
		await bootcampApi.SaveTask(API_TASK_DTO)
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/task`,
			expect.objectContaining({ method: 'POST' })
		)
	})

	it('should update task', async () => {
		await bootcampApi.UpdateTask(17, API_TASK_DTO)
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/task/17`,
			expect.objectContaining({ method: 'PUT' })
		)
	})

	it('should delete task', async () => {
		await bootcampApi.DeleteTask(17)
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/task/17`,
			expect.objectContaining({ method: 'DELETE' })
		)
	})

	it('should sign in', async () => {
		await bootcampApi.SignIn({ username: 'xae', password: '2317' })
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/auth/sign-in`,
			expect.objectContaining({ method: 'POST' })
		)
	})

	it('should sign up', async () => {
		await bootcampApi.SignUp({
			username: 'test4@gmail.com',
			password: 'password1',
			first_name: 'alex',
			last_name: 'pozdnyakof',
			birthdate: new Date().toISOString(),
		})
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/auth/sign-up`,
			expect.objectContaining({ method: 'POST' })
		)
	})

	it('should fetch current user', async () => {
		await bootcampApi.CurrentUser()
		expect(global.fetch).toHaveBeenCalledWith(
			`/api/user`,
			expect.any(Object)
		)
	})

	it('should  fetch logout', async () => {
		await bootcampApi.Logout()
		expect(global.fetch).toHaveBeenCalledWith(
			'/api/auth/logout',
			expect.any(Object)
		)
	})
	it('should search with params', async () => {
		await bootcampApi.Search({ title: '123' })
		expect(global.fetch).toHaveBeenCalledWith(
			'/api/search?title=123',
			expect.any(Object)
		)
	})
})
