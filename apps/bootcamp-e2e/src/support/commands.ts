// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
	interface Chainable {
		login(username: string, password: string): void
	}
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (username: string, password: string) => {
	cy.session(
		[username, password],
		() => {
			cy.visit('/sign-in')
			const log = Cypress.log({
				name: 'login',
				displayName: 'LOGIN',
				message: [`🔐 Authenticating | ${username}`],
				autoEnd: false,
			})
			cy.intercept('POST', '/api/auth/sign-in').as('signIn')

			// log.snapshot('before')
			cy.get(`input[name="username"]`).type(username)
			cy.get(`input[name="password"]`).type(password)

			cy.get('button').contains('サインイン').click({ force: true })
			// cy.wait('@signIn').then((user: any) => {
			//   console.log({user})
			// 	log.set({
			// 		consoleProps() {
			// 			return {
			// 				username,
			// 				password,
			// 				userId:
			// 					user.response.statusCode !== 401 &&
			// 					user.response.body.id,
			// 			}
			// 		},
			// 	})
			// log.snapshot('after')
			// log.end()
			// })

			cy.wait('@signIn')
			cy.url().should('contain', '/1')
		},
		{
			// validate() {
			// 	cy.request('/api/auth/user').its('status').should('eq', 200)
			// },
		}
	)
})

// Cypress.Commands.add("loginStub", (username: string, password: string) => {})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
