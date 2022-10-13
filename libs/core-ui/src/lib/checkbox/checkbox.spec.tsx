import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Checkbox from './checkbox'

describe('Checkbox', () => {
	it('support externally provided id attribute', () => {
		render(<Checkbox data-testid='checkbox' id='custom' label='Accept' />)
		const checkboxElement = screen.getByTestId('checkbox')

		expect(checkboxElement.id).toBe('custom')
	})

	it('labelled by label string', () => {
		render(<Checkbox data-testid='checkbox' label='Accept' />)
		const checkboxElement = screen.getByTestId('checkbox')

		expect(checkboxElement).toHaveAccessibleName('Accept')
	})

	it('labelled by label react node', () => {
		render(
			<Checkbox
				data-testid='checkbox'
				label={<span data-testid='label'>Accept</span>}
			/>
		)
		const checkboxElement = screen.getByTestId('checkbox')
		const labelElement = screen.getByTestId('label')

		expect(checkboxElement).toHaveAccessibleName('Accept')
		expect(labelElement).toBeInTheDocument()
	})

	it('hidden when hidden truthy', () => {
		const { rerender } = render(
			<Checkbox data-testid='checkbox' label='Accept' hidden />
		)
		const checkboxElement = screen.getByTestId('checkbox')

		expect(checkboxElement).not.toBeVisible()
		expect(
			screen.queryByRole('checkbox', { name: 'Accept' })
		).not.toBeInTheDocument()

		rerender(<Checkbox data-testid='checkbox' label='Accept' />)
		expect(checkboxElement).toBeVisible()
		expect(
			screen.queryByRole('checkbox', { name: 'Accept' })
		).toBeInTheDocument()
	})

	it('toggle checked when user clicked on it', async () => {
		render(<Checkbox label='Accept' />)
		const checkboxElement = screen.getByRole('checkbox', { name: 'Accept' })

		expect(checkboxElement).not.toBeChecked()

		await userEvent.click(checkboxElement)
		expect(checkboxElement).toBeChecked()

		await userEvent.click(checkboxElement)
		expect(checkboxElement).not.toBeChecked()
	})

	it('not toggle checked when disabled', async () => {
		render(<Checkbox label='Accept' disabled />)
		const checkboxElement = screen.getByRole('checkbox', { name: 'Accept' })

		expect(checkboxElement).toBeDisabled()
		expect(checkboxElement).not.toBeChecked()

		await userEvent.click(checkboxElement)
		expect(checkboxElement).not.toBeChecked()
	})

	it('can be checked by default when uncontrolled', async () => {
		render(<Checkbox label='Accept' defaultChecked />)
		const checkboxElement = screen.getByRole('checkbox', { name: 'Accept' })

		expect(checkboxElement).toBeChecked()
		await userEvent.click(checkboxElement)
		expect(checkboxElement).not.toBeChecked()
	})

	it('can be a controlled', async () => {
		const TestCase = () => {
			const [checked, setChecked] = useState(false)
			return (
				<>
					<Checkbox
						label='Accept'
						checked={checked}
						onChange={event =>
							setChecked(event.currentTarget.checked)
						}
					/>
					<div data-testid='value'>{checked ? 'on' : 'off'}</div>
				</>
			)
		}

		render(<TestCase />)
		const checkboxElement = screen.getByRole('checkbox', { name: 'Accept' })
		const valueElement = screen.getByTestId('value')

		expect(checkboxElement).not.toBeChecked()
		expect(valueElement).toHaveTextContent('off')

		await userEvent.click(checkboxElement)
		expect(checkboxElement).toBeChecked()
		expect(valueElement).toHaveTextContent('on')

		await userEvent.click(checkboxElement)
		expect(checkboxElement).not.toBeChecked()
		expect(valueElement).toHaveTextContent('off')
	})
})
