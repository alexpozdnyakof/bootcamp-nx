import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

import Tooltip from './tooltip'

describe('Tooltip', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Tooltip>
				<Button>私を指して</Button>
			</Tooltip>
		)
		expect(baseElement).toBeTruthy()
	})

	it('should show and hide tooltip for mouse actions', async () => {
		render(
			<Tooltip>
				<Button>私を指して</Button>
			</Tooltip>
		)

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		await userEvent.hover(buttonElement)
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		await userEvent.unhover(buttonElement)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('should show and hide tooltip for keyboard actions', async () => {
		render(
			<Tooltip>
				<Button>私を指して</Button>
			</Tooltip>
		)

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		const buttonElement = screen.getByRole('button', {
			name: '私を指して',
		})

		await userEvent.tab()
		expect(buttonElement).toHaveFocus()
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		await userEvent.tab()
		expect(buttonElement).not.toHaveFocus()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('should not hide or show tooltip when focused button hovered or unhovered', async () => {
		render(
			<Tooltip>
				<Button>私を指して</Button>
			</Tooltip>
		)

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		const buttonElement = screen.getByRole('button', {
			name: '私を指して',
		})

		await userEvent.tab()
		expect(buttonElement).toHaveFocus()
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		// trying to hove focused button
		await userEvent.hover(buttonElement)
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		// trying to unhover focused button
		await userEvent.unhover(buttonElement)
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		// unfocus button
		await userEvent.tab()
		expect(buttonElement).not.toHaveFocus()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		// tryin to hover unfocused button
		await userEvent.hover(buttonElement)
		expect(screen.queryByRole('tooltip')).toBeInTheDocument()

		// tryin to unhover focused button
		await userEvent.unhover(buttonElement)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('should render tooltip in portal', async () => {
		const { baseElement } = render(
			<Tooltip id='tooltip' content='ツールチップへようこそ'>
				<Button>私を指して</Button>
			</Tooltip>
		)

		const portal = baseElement.querySelector('#__portalRoot__')
		expect(portal?.querySelector('#tooltip')).toBeFalsy()
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		await userEvent.hover(buttonElement)

		expect(portal?.querySelector('#tooltip')).toBe(
			screen.getByRole('tooltip')
		)
	})

	it('should render position tooltip near to element', async () => {
		Element.prototype['getBoundingClientRect'] = jest.fn(
			() =>
				({
					x: 120,
					y: 32,
					width: 48,
					height: 32,
				} as DOMRect)
		)

		render(
			<Tooltip>
				<Button
					data-testid='anchor'
					style={{
						width: '48px',
						height: '32px',
						marginLeft: '120px',
						marginTop: '32px',
					}}
				>
					私を指して
				</Button>
			</Tooltip>
		)

		const buttonElement = screen.getByTestId('anchor')

		await userEvent.hover(buttonElement)

		const tooltip = screen.getByRole('tooltip')
		expect(tooltip).toHaveStyle({ top: '64px', left: '120px' })
	})

	it('should render passed content inside tooltip', async () => {
		render(
			<Tooltip content='ツールチップへようこそ'>
				<Button>私を指して</Button>
			</Tooltip>
		)

		const buttonElement = screen.getByRole('button', { name: '私を指して' })
		await userEvent.hover(buttonElement)

		expect(
			screen.getByRole('tooltip', { name: 'ツールチップへようこそ' })
		).toBeInTheDocument()
	})
})
