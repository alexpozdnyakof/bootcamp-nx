import { randEmail, randFirstName, randLastName } from '@ngneat/falso'

describe('sign-in and sign-up', () => {
	it('should redirect to sign-in for unauthorized', () => {
		cy.visit('/1')

		cy.url().should('include', '/sign-in')
	})
	it('should not submit invalid form ', () => {
		cy.visit('/sign-in')
		// interceptOnce('get', '/api/sign-in', {})
		cy.get('button').contains('サインイン').click({ force: true })

		cy.get(`input[name="username"]`).should(
			'have.attr',
			'aria-invalid',
			'true'
		)

		cy.get(`#username_message`)
			.should('be.visible')
			.and('contain', 'Заполните это поле.')

		cy.get(`input[name="password"]`).should(
			'have.attr',
			'aria-invalid',
			'true'
		)

		cy.get(`#password_message`)
			.should('be.visible')
			.and('contain', 'Заполните это поле.')
	})

	it('should sign-in and logout', () => {
		cy.visit('/sign-in')
		cy.intercept('/api/auth/sign-in').as('signInResponse')
		cy.get(`input[name="username"]`).type('test@test.com')
		cy.get(`input[name="password"]`).type('password4')

		cy.get(`input[name="username"]`).should('not.have.attr', 'aria-invalid')

		cy.get(`input[name="password"]`).should('not.have.attr', 'aria-invalid')

		cy.get('button').contains('サインイン').click({ force: true })
		cy.wait('@signInResponse')
		cy.url().should('include', '/1')

		cy.get('button').contains('ログアウト').click({ force: true })
		cy.url().should('include', '/sign-in')
	})
	it('should sign-up and logout', () => {
		cy.visit('/sign-up')
		cy.intercept('/api/auth/sign-up').as('signUpResponse')

		cy.get(`input[name="username"]`).type(randEmail())
		cy.get(`input[name="first_name"]`).type(randFirstName())
		cy.get(`input[name="last_name"]`).type(randLastName())
		cy.get(`input[name="birthdate"]`).type('23.01.17')
		cy.get(`input[name="password"]`).type('password4')
		cy.get(`input[name="repeatPassword"]`).type('password4')
		cy.get(`input[name="agreement"]`).check({ force: true })
		cy.get('button').contains('サインアップ').click({ force: true })

		cy.wait('@signUpResponse')
		cy.url().should('include', '/1')

		cy.get('button').contains('ログアウト').click({ force: true })
		cy.url().should('include', '/sign-in')
	})
})
