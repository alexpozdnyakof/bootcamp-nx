import { screen, render } from '@testing-library/react'
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
})
