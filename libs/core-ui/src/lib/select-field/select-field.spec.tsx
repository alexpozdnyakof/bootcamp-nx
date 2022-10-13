import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Box } from '../box'

import SelectField from './select-field'

describe('SelectField', () => {
	it('supports having an externally provided id attribute', () => {
		render(
			<SelectField data-testid='select-field' id='custom' label='City' />
		)
		const selectElement = screen.getByTestId('select-field')
		expect(selectElement.id).toBe('custom')
	})

	it('is labelled by its label and secondary label', () => {
		const { rerender } = render(
			<SelectField data-testid='select-field' label='City' />
		)
		const selectField = screen.getByTestId('select-field')
		expect(selectField).toHaveAccessibleName('City')

		rerender(
			<SelectField
				data-testid='select-field'
				label='City'
				secondaryLabel='birthplace'
			/>
		)
		expect(selectField).toHaveAccessibleName('City (birthplace)')
	})

	it('described by hint when provided', () => {
		render(
			<SelectField
				data-testid='select-field'
				label='City'
				hint='where are you living'
			/>
		)

		const selectField = screen.getByTestId('select-field')
		expect(selectField).toHaveAccessibleDescription('where are you living')
	})

	it('can be described by something else via aria-describedby', () => {
		render(
			<>
				<SelectField
					data-testid='select-field'
					label='City'
					hint='where are you living'
					aria-describedby='custom-hint'
				/>
				<div id='custom-hint'>
					This is the city where are you living
				</div>
			</>
		)

		const selectField = screen.getByTestId('select-field')
		expect(selectField).toHaveAccessibleDescription(
			'This is the city where are you living'
		)
	})

	it('should marked as invalid when tone is error', () => {
		render(
			<SelectField data-testid='select-field' label='City' tone='error' />
		)
		const selectField = screen.getByTestId('select-field')
		expect(selectField).toBeInvalid()
	})

	it('uses the message as the description, whenever the tone is not error', () => {
		render(
			<SelectField
				data-testid='select-field'
				label='City'
				tone='success'
				message='your city has been saved'
			/>
		)
		const selectField = screen.getByTestId('select-field')
		expect(selectField).toHaveAccessibleDescription(
			'your city has been saved'
		)
	})

	it('renders its auixiliary label', () => {
		render(
			<SelectField
				label='City'
				auxiliaryLabel={<a href='/help'>About city</a>}
			/>
		)
		const auxiliaryLabel = screen.getByRole('link', { name: 'About city' })
		expect(auxiliaryLabel).toBeInTheDocument()
	})

	it('suppports providin an alternative type', () => {
		render(<SelectField label='Email' type='email' />)
		const selectField = screen.getByRole('combobox', { name: 'Email' })
		expect(selectField).toHaveAttribute('type', 'email')
	})

	it('should be hidden when hidden is true', () => {
		const { rerender } = render(
			<SelectField
				data-testid='select-field'
				label='City'
				hint='we need it for billing purposes'
				hidden
			/>
		)

		const selectField = screen.getByTestId('select-field')
		// screen.getByRole('combobox', { name: 'City' })
		const hintElement = screen.getByText('we need it for billing purposes')

		expect(selectField).not.toBeVisible()
		expect(hintElement).not.toBeVisible()
		expect(
			screen.queryByRole('combobox', { name: 'City' })
		).not.toBeInTheDocument()
		expect(screen.getByText('City')).toBeInTheDocument()

		rerender(
			<SelectField
				data-testid='select-field'
				label='City'
				hint='we need it for billing purposes'
			/>
		)
		expect(selectField).toBeVisible()
		expect(hintElement).toBeVisible()
		expect(
			screen.queryByRole('combobox', { name: 'City' })
		).toBeInTheDocument()
		expect(screen.getByText('City')).toBeInTheDocument()
	})
	it('allows to select from the options', async () => {
		render(
			<SelectField
				data-testid='select-field'
				label='City'
				hint='we need it for billing purposes'
			>
				<option value='-'>Select city</option>
				<option value='moscow'>Moscow</option>
				<option value='saint-p'>Saint Petersburg</option>
			</SelectField>
		)

		const selectElement = screen.getByRole('combobox', { name: 'City' })
		expect(selectElement).toHaveValue('-')
		expect(selectElement).toHaveDisplayValue('Select city')

		await userEvent.selectOptions(selectElement, 'moscow')
		expect(selectElement).toHaveValue('moscow')
		expect(selectElement).toHaveDisplayValue('Moscow')

		await userEvent.selectOptions(selectElement, 'saint-p')
		expect(selectElement).toHaveValue('saint-p')
		expect(selectElement).toHaveDisplayValue('Saint Petersburg')
	})

	it('can be disabled', async () => {
		render(
			<SelectField label='City' defaultValue='moscow' disabled>
				<option value='moscow'>Moscow</option>
				<option value='saint-p'>Saint Petersburg</option>
			</SelectField>
		)

		const selectElement = screen.getByRole('combobox', { name: 'City' })
		expect(selectElement).toBeDisabled()
		expect(selectElement).toHaveValue('moscow')
		await userEvent.selectOptions(selectElement, 'saint-p')
		expect(selectElement).toHaveValue('moscow')
	})

	it('can be a controlled select field', async () => {
		const TestCase = () => {
			const [theme, setTheme] = useState('dark')

			return (
				<Box data-testid='container' data-theme={theme}>
					<SelectField
						label='Theme'
						value={theme}
						onChange={event => setTheme(event.currentTarget.value)}
					>
						<option value='light'>Light theme</option>
						<option value='dark'>Dark theme</option>
					</SelectField>
				</Box>
			)
		}

		render(<TestCase />)
		const selectElement = screen.getByRole('combobox', { name: 'Theme' })
		expect(selectElement).toHaveValue('dark')
		expect(screen.getByTestId('container')).toHaveAttribute(
			'data-theme',
			'dark'
		)

		await userEvent.selectOptions(selectElement, 'light')
		expect(selectElement).toHaveValue('light')
		expect(selectElement).toHaveDisplayValue('Light theme')
		expect(screen.getByTestId('container')).toHaveAttribute(
			'data-theme',
			'light'
		)
	})
})
