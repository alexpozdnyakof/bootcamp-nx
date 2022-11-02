import { screen, render } from '@testing-library/react'

import Modal from './modal'

describe('Modal', () => {
	it('should render when modal open', () => {
		render(
			<Modal isOpen={false} data-testid='modalElement'>
				モーダルウィンドウ!
			</Modal>
		)
		expect(screen.queryByTestId('modalElement')).not.toBeInTheDocument()
	})

	it('should not render when modal not open', () => {
		render(
			<Modal isOpen={true} data-testid='modalElement'>
				モーダルウィンドウ!
			</Modal>
		)
		expect(screen.queryByTestId('modalElement')).toBeInTheDocument()
	})
	it('should render in named container', () => {
		let { baseElement } = render(<div id='customRoot'></div>)

		const customRoot = baseElement.querySelector('#customRoot') as Element
		expect(customRoot).toBeInstanceOf(HTMLElement)
		;({ baseElement } = render(
			<Modal isOpen={true} containerName='customRoot'>
				モーダルウィンドウ!
			</Modal>
		))

		expect(customRoot.textContent?.trim()).toBe('モーダルウィンドウ!')
	})
})
