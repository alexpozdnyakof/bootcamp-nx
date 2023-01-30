import {
	randEmail,
	randFirstName,
	randLastName,
	randPassword,
	randPastDate,
} from '@ngneat/falso'

describe('auth', () => {
	beforeEach(() => {
		cy.task('db:seed')
	})

	context('sign-up', () => {
		it('should create new user', () => {
			const newUser = {
				username: randEmail(),
				password: randPassword(),
				first_name: randFirstName(),
				last_name: randLastName(),
				birthdate: randPastDate().toISOString(),
			}
			cy.request(
				'POST',
				`${Cypress.env('apiUrl')}/auth/sign-up`,
				newUser
			).then(response => {
				expect(response.status).to.eq(201)
			})

			cy.request('GET', `${Cypress.env('apiUrl')}/auth/user`).then(
				response => {
					expect(response.body.username).to.eq(newUser.username)
				}
			)
		})

		it('should return error if user already exist', () => {
			const newUser = {
				username: Cypress.env('testUsername'),
				password: randPassword(),
				first_name: randFirstName(),
				last_name: randLastName(),
				birthdate: randPastDate().toISOString(),
			}
			cy.request({
				method: 'POST',
				url: `${Cypress.env('apiUrl')}/auth/sign-up`,
				body: newUser,
				failOnStatusCode: false,
			}).then(response => {
				expect(response.status).to.eq(400)
			})
		})

		it('should return error if email invalid', () => {
			const newUser = {
				username: 'testtest.com',
				password: randPassword(),
				first_name: randFirstName(),
				last_name: randLastName(),
				birthdate: randPastDate().toISOString(),
			}

			cy.request({
				method: 'POST',
				url: `${Cypress.env('apiUrl')}/auth/sign-up`,
				body: newUser,
				failOnStatusCode: false,
			}).then(response => {
				expect(response.status).to.eq(400)
			})
		})
	})

	context('sign-in edges', () => {
		it('should return error for non-existing user', () => {
			cy.request({
				method: 'POST',
				url: `${Cypress.env('apiUrl')}/auth/sign-in`,
				body: {
					username: 'nonexistinguser@undefined.com',
					password: Cypress.env('testPassword'),
				},
				failOnStatusCode: false,
			}).then(response => {
				expect(response.status).to.eq(401)
			})
		})

		it('should return error for wrong password', () => {
			cy.request({
				method: 'POST',
				url: `${Cypress.env('apiUrl')}/auth/sign-in`,
				body: {
					username: Cypress.env('testUsername'),
					password: 'wrong-password',
				},
				failOnStatusCode: false,
			}).then(response => {
				expect(response.status).to.eq(401)
			})
		})
	})

	it('should logout', () => {
		cy.login()
		cy.getCookie('refreshToken').should('exist')

		cy.request({
			method: 'GET',
			url: `${Cypress.env('apiUrl')}/auth/logout`,
		}).then(response => {
			expect(response.status).to.eq(200)
			cy.getCookie('refreshToken').should('not.exist')
		})
	})
})
