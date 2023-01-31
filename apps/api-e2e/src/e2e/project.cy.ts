import { randFish, randText } from '@ngneat/falso'

describe('project', () => {
	beforeEach(() => {
		cy.task('db:seed')
		cy.login()
	})

	it('should return projects', () => {
		cy.request('GET', `${Cypress.env('apiUrl')}/project`).then(response => {
			expect(response.status).to.eq(200)
		})
	})

	it('should return one project', () => {
		cy.request('GET', `${Cypress.env('apiUrl')}/project/1`).then(
			response => {
				expect(response.status).to.eq(200)
			}
		)
	})

	it('should return 404 for not existing', () =>
		cy
			.request({
				method: 'GET',
				url: `${Cypress.env('apiUrl')}/project/404`,
				failOnStatusCode: false,
			})
			.then(response => {
				expect(response.status).to.eq(404)
			}))

	it('should return related tasks', () => {
		cy.request({
			method: 'GET',
			url: `${Cypress.env('apiUrl')}/project/1/tasks`,
		}).then(response => {
			expect(response.status).to.eq(200)
			response.body.data.forEach(task => expect(task.project_id).to.eq(1))
		})
	})

	it('should create new project', () => {
		const newProject = {
			title: randFish(),
			description: randText(),
		}
		cy.request({
			method: 'POST',
			url: `${Cypress.env('apiUrl')}/project`,
			body: newProject,
		}).then(response => {
			expect(response.status).to.eq(201)
		})
	})
})
