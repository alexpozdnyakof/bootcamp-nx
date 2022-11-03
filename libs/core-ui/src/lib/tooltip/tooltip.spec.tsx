import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Box } from '../box'
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

	xit('should show tooltip', async () => {
		render(
			<Tooltip data-testid='tooltip'>
				<Button>私を指して</Button>
			</Tooltip>
		)

		const tooltip = screen.getByTestId('tooltip')
		expect(tooltip).not.toBeInTheDocument()

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		await userEvent.hover(buttonElement)
		expect(tooltip).toBeInTheDocument()

		await userEvent.unhover(buttonElement)
		expect(tooltip).not.toBeInTheDocument()
	})

	it('should render tooltip in portal', async () => {
		const { baseElement } = render(
			<Tooltip data-testid='tooltip'>
				<Button>私を指して</Button>
			</Tooltip>
		)

		const portal = baseElement.querySelector('#__portalRoot__')

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		await userEvent.hover(buttonElement)
		expect(portal?.textContent?.trim()).toBe('Welcome to Tooltip!')
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
			<Tooltip data-testid='tooltip'>
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

		const tooltip = screen.getByTestId('tooltip')
		expect(tooltip).toHaveStyle({ top: '64px', left: '120px' })
	})
})
