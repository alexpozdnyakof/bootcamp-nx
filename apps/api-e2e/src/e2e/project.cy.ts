describe('project', () => {
	beforeEach(() => {
		cy.login()
	})

	it('should return projects', () => {
		cy.request('GET', `${Cypress.env('apiUrl')}/project`).then(response => {
			expect(response.status).to.eq(200)
		})
	})
})
