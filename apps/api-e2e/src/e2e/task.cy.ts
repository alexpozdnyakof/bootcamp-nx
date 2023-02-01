import { randFish } from '@ngneat/falso'

describe('task', () => {
	beforeEach(() => {
		cy.task('db:seed')
		cy.login()
	})

	it('should return related tasks', () => {
		cy.request({
			method: 'GET',
			url: `${Cypress.env('apiUrl')}/project/1/tasks`,
		}).then(response => {
			expect(response.status).to.eq(200)
			response.body.data.forEach(task => expect(task.project_id).to.eq(1))
		})
	})

	it('should return one tasks', () => {
		cy.request({
			method: 'GET',
			url: `${Cypress.env('apiUrl')}/task/1`,
		}).then(response => {
			expect(response.status).to.eq(200)
			response.body.data.forEach(task => expect(task.id).to.eq(1))
		})
	})

	it('should create new task', () => {
		const newTask = {
			title: randFish(),
			done: false,
			project_id: 1,
		}

		cy.request({
			method: 'POST',
			url: `${Cypress.env('apiUrl')}/task`,
			body: newTask,
		}).then(response => {
			expect(response.status).to.eq(201)
		})
	})

	it('should update task', () => {
		const newTask = {
			title: randFish(),
			done: true,
		}

		cy.request({
			method: 'PUT',
			url: `${Cypress.env('apiUrl')}/task/1`,
			body: newTask,
		}).then(response => {
			expect(response.status).to.eq(200)
		})
	})
})
