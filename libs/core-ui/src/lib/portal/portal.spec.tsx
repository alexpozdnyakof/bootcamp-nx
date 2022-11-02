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
		let { baseElement } = render(
			<>
				<div id='customRoot'></div>
				<div id='anotherRoot'></div>
			</>
		)
		const queryBaseElement = (selector: string) =>
			baseElement.querySelector(selector) as Element

		const customRoot = queryBaseElement('#customRoot')
		const anotherRoot = queryBaseElement('#anotherRoot')

		expect(customRoot).toBeInstanceOf(HTMLElement)
		expect(anotherRoot).toBeInstanceOf(HTMLElement)

		registerPortalRoot(customRoot, 'customRoot')
		registerPortalRoot(anotherRoot, 'anotherRoot')
		;({ baseElement } = render(
			<>
				<Portal>default</Portal>
				<Portal containerName='customRoot'>custom</Portal>
				<Portal containerName='anotherRoot'>another</Portal>
			</>
		))

		const generatedDefaultRoot = queryBaseElement('#__portalRoot__')

		expect(generatedDefaultRoot?.textContent?.trim()).toEqual('default')
		expect(customRoot?.textContent?.trim()).toEqual('custom')
		expect(anotherRoot?.textContent?.trim()).toEqual('another')

		baseElement.innerHTML = ''
	})
})
