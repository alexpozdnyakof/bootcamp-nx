describe('tasks: Tasks component', () => {
	beforeEach(() => cy.visit('/iframe.html?id=tasks--primary'))

	it('should render the component', () => {
		cy.get('h1').should('contain', 'Welcome to Tasks!')
	})
})
