describe('user', () => {
	beforeEach(() => {
		cy.login()
	})

	it('should return user', () => {
		cy.request('GET', `${Cypress.env('apiUrl')}/project`).then(response => {
			expect(response.status).to.eq(200)
			expect(response.body.data).to.eq(Cypress.env('testUsername'))
		})
	})
})
