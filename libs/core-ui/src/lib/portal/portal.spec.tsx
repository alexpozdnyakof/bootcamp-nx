import { render } from '@testing-library/react'

import Portal, { registerPortalRoot } from './portal'

describe('Portal', () => {
	it('should render in default container', () => {
		const { baseElement } = render(
			<div id='renderRoot'>
				<div id='__portalRoot__'></div>
				<Portal>123test123</Portal>
			</div>
		)
		const renderRoot = baseElement.querySelector('#renderRoot')
		const portalRoot = renderRoot?.querySelector('#__portalRoot__')

		expect(portalRoot).toBeInstanceOf(HTMLElement)
		expect(portalRoot?.textContent?.trim()).toEqual('123test123')

		baseElement.innerHTML = ''
	})

	it('should create default container if not exist', () => {
		const { baseElement } = render(<Portal>123test123</Portal>)

		const portalRoot = baseElement.querySelector('#__portalRoot__')

		expect(portalRoot).toBeInstanceOf(HTMLElement)
		expect(portalRoot?.textContent?.trim()).toEqual('123test123')

		baseElement.innerHTML = ''
	})

	it('should render in named container', () => {
		let { baseElement } = render(<div id='__anotherRoot__'></div>)
		const anotherRoot = baseElement.querySelector(
			'#__anotherRoot__'
		) as Element
		expect(anotherRoot).toBeInstanceOf(HTMLElement)

		registerPortalRoot(anotherRoot, '__anotherRoot__')
		;({ baseElement } = render(
			<Portal containerName='__anotherRoot__'>123test123</Portal>
		))

		expect(anotherRoot?.textContent?.trim()).toEqual('123test123')

		baseElement.innerHTML = ''
	})
})
