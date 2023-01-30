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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		login(username?: string): void
	}
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (username = Cypress.env('testUsername')) => {
	cy.session([username], () => {
		cy.request('POST', `${Cypress.env('apiUrl')}/auth/sign-in`, {
			username,
			password: Cypress.env('testPassword'),
		})

		return cy.getCookie('refreshToken').should('exist')
	})
})
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