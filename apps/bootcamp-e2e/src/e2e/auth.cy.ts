describe('sign-in and sign-up', () => {
	it('should redirect to sign-in for unauthorized', () => {
		cy.visit('/1')

		cy.url().should('include', '/sign-in')
	})
	it('should contain sign in form', () => {
		cy.visit('/sign-in')
		cy.get('form')
			.contains('ブートキャンプにサインインする')
			.should('be.visible')
	})
})
