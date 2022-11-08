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

		expect(customRoot.querySelector('[role="dialog"]')).toEqual(
			baseElement.querySelector('[role="dialog"]')
		)
	})

	it('should render a modal of the given width', () => {
		const { rerender } = render(
			<Modal isOpen={true}>モーダルウィンドウ!</Modal>
		)

		const dialogElement = screen.getByRole('dialog')

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(
			<Modal isOpen={true} width='xsmall'>
				モーダルウィンドウ!
			</Modal>
		)

		expect(dialogElement).toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(
			<Modal isOpen={true} width='small'>
				モーダルウィンドウ!
			</Modal>
		)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(
			<Modal isOpen={true} width='medium'>
				モーダルウィンドウ!
			</Modal>
		)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(
			<Modal isOpen={true} width='large'>
				モーダルウィンドウ!
			</Modal>
		)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(
			<Modal isOpen={true} width='xlarge'>
				モーダルウィンドウ!
			</Modal>
		)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).toHaveClass('width-xlarge')
	})
})
