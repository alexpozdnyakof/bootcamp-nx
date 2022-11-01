import { screen, render } from '@testing-library/react'

import Portal from './portal'

describe('Portal', () => {
	it('should render in default container', () => {
		render(
			<div data-testid='renderRoot'>
				<div id='__portalRoot__'></div>
				<Portal>123test123</Portal>
			</div>
		)
		const renderRoot = screen.getByTestId('renderRoot')
		const portalRoot = renderRoot?.querySelector('#__portalRoot__')

		expect(portalRoot).toBeInstanceOf(HTMLElement)
		expect(portalRoot?.textContent?.trim()).toEqual('123test123')
	})

	it('should create default container if not exist', () => {
		const { baseElement } = render(<Portal>123test123</Portal>)

		const portalRoot = baseElement.querySelector('#__portalRoot__')

		expect(portalRoot).toBeInstanceOf(HTMLElement)
		expect(portalRoot?.textContent?.trim()).toEqual('123test123')
	})
})
