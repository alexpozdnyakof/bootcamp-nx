import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

import Modal from './modal'

describe('Modal', () => {
	it('should render in named container', () => {
		let { baseElement } = render(<div id='customRoot'></div>)

		const customRoot = baseElement.querySelector('#customRoot') as Element
		expect(customRoot).toBeInstanceOf(HTMLElement)
		;({ baseElement } = render(
			<Modal containerName='customRoot'>モーダルウィンドウ!</Modal>
		))

		expect(customRoot.querySelector('[role="dialog"]')).toEqual(
			baseElement.querySelector('[role="dialog"]')
		)
	})

	it('should render a modal of the given width', () => {
		const { rerender } = render(<Modal>モーダルウィンドウ!</Modal>)

		const dialogElement = screen.getByRole('dialog')

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(<Modal width='xsmall'>モーダルウィンドウ!</Modal>)

		expect(dialogElement).toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(<Modal width='small'>モーダルウィンドウ!</Modal>)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(<Modal width='medium'>モーダルウィンドウ!</Modal>)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(<Modal width='large'>モーダルウィンドウ!</Modal>)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).toHaveClass('width-large')
		expect(dialogElement).not.toHaveClass('width-xlarge')

		rerender(<Modal width='xlarge'>モーダルウィンドウ!</Modal>)

		expect(dialogElement).not.toHaveClass('width-xsmall')
		expect(dialogElement).not.toHaveClass('width-small')
		expect(dialogElement).not.toHaveClass('width-medium')
		expect(dialogElement).not.toHaveClass('width-large')
		expect(dialogElement).toHaveClass('width-xlarge')
	})

	it('should show close button when onClose callback passed', () => {
		const onClose = jest.fn()
		const { rerender } = render(
			<Modal title='モーダルウィンドウ'>モーダルウィンドウ!</Modal>
		)

		const closeButton = screen.queryByRole('button', {
			name: 'Close モーダルウィンドウ modal window',
		})

		expect(closeButton).toBeNull()

		rerender(
			<Modal title='モーダルウィンドウ' onClose={onClose}>
				モーダルウィンドウ!
			</Modal>
		)

		expect(closeButton).toBeDefined()
	})

	it('should call onClose callback', async () => {
		const onClose = jest.fn()
		render(<Modal onClose={onClose}>モーダルウィンドウ!</Modal>)

		await userEvent.click(
			screen.getByRole('button', {
				name: 'Close modal window',
			})
		)

		expect(onClose).toHaveBeenCalled()
	})

	it('should render title', async () => {
		const { rerender } = render(
			<Modal>
				<div />
			</Modal>
		)

		expect(screen.queryByText('モーダルウィンドウ')).not.toBeInTheDocument()

		rerender(
			<Modal title='モーダルウィンドウ'>
				<div />
			</Modal>
		)

		expect(screen.getByText('モーダルウィンドウ')).toBeInTheDocument()
	})

	it('should render buttons toolbar', async () => {
		const { rerender } = render(
			<Modal>
				<div />
			</Modal>
		)

		expect(
			screen.queryByRole('button', { name: 'モ' })
		).not.toBeInTheDocument()

		rerender(
			<Modal buttons={<Button>モ</Button>}>
				<div />
			</Modal>
		)

		expect(screen.queryByRole('button', { name: 'モ' })).toBeInTheDocument()
	})
})
