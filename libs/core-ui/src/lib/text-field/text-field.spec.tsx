import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import TextField from './text-field'

describe('TextField', () => {
	it('should set externally provided id attribute', () => {
		render(<TextField data-testid='text-field' id='custom-id' />)
		expect(screen.getByTestId('text-field').id).toBe('custom-id')
	})

	it('is labelled by its label and secondary label', () => {
		const { rerender } = render(
			<TextField data-testid='text-field' label='Phone' />
		)
		expect(screen.getByTestId('text-field')).toHaveAccessibleName('Phone')

		rerender(
			<TextField
				data-testid='text-field'
				label='Phone'
				secondaryLabel='home'
			/>
		)
		expect(screen.getByTestId('text-field')).toHaveAccessibleName(
			'Phone (home)'
		)
	})

	it('renders its auxiliary label', () => {
		render(
			<TextField
				label='VAT-ID'
				auxiliaryLabel={<a href='/help'>Whatʼs this?</a>}
			/>
		)
		expect(
			screen.getByRole('link', { name: 'Whatʼs this?' })
		).toBeInTheDocument()
	})

	it('can have a placeholder text', () => {
		render(
			<TextField
				label='Email'
				data-testid='text-field'
				placeholder='Enter your email address'
			/>
		)
		expect(screen.getByTestId('text-field')).toBe(
			screen.getByPlaceholderText('Enter your email address')
		)
	})

	it('supports providing an alternative type', () => {
		render(<TextField label='Email' type='email' />)
		expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
			'type',
			'email'
		)
	})

	it('is hidden when hidden={true}', () => {
		const { rerender } = render(
			<TextField
				data-testid='text-field'
				label='Whatʼs your name?'
				hint='We need it for billing purposes'
				hidden
			/>
		)

		const inputField = screen.getByTestId('text-field')
		const hintElement = screen.getByText(/we need it for billing purposes/i)

		// check that it is rendered but not visible
		expect(inputField).not.toBeVisible()
		expect(
			screen.queryByRole('textbox', { name: 'Whatʼs your name?' })
		).not.toBeInTheDocument()
		expect(screen.getByText(/your name/i)).toBeInTheDocument()
		expect(hintElement).not.toBeVisible()

		// check that it becomes visible when hidden is removed
		rerender(
			<TextField
				data-testid='text-field'
				label='Whatʼs your name?'
				hint='We need it for billing purposes'
			/>
		)
		expect(inputField).toBeVisible()
		expect(
			screen.getByRole('textbox', { name: 'Whatʼs your name?' })
		).toBeInTheDocument()
		expect(screen.getByText(/your name/i)).toBeInTheDocument()
		expect(hintElement).toBeVisible()
	})

	it('forwards to the input element any extra props provided to it', () => {
		render(
			<TextField
				label='Visual label'
				aria-label='Non-visual label'
				data-testid='text-field'
				data-something='whatever'
			/>
		)
		const inputElement = screen.getByTestId('text-field')
		expect(inputElement.tagName).toBe('INPUT')
		expect(inputElement).toHaveAttribute('aria-label', 'Non-visual label')
		expect(inputElement).toHaveAttribute('data-testid', 'text-field')
		expect(inputElement).toHaveAttribute('data-something', 'whatever')
	})

	it('allows to type text into it', async () => {
		render(<TextField label='Whatʼs your job title?' />)
		const inputElement = screen.getByRole('textbox', {
			name: 'Whatʼs your job title?',
		}) as HTMLInputElement

		expect(inputElement).toHaveValue('')
		await userEvent.type(inputElement, 'Software developer')

		expect(inputElement).toHaveValue('Software developer')
	})

	it('can be disabled', () => {
		render(<TextField label='Whatʼs your job title?' disabled />)
		const inputElement = screen.getByRole('textbox', {
			name: 'Whatʼs your job title?',
		})

		expect(inputElement).toBeDisabled()
		expect(inputElement).toHaveValue('')

		userEvent.type(inputElement, 'Software developer')
		expect(inputElement).toHaveValue('')
	})

	it('can be readonly', async () => {
		render(<TextField label='Whatʼs your job title?' readOnly />)
		const inputElement = screen.getByRole('textbox', {
			name: 'Whatʼs your job title?',
		})

		expect(inputElement).not.toBeDisabled()
		expect(inputElement).toHaveValue('')

		await userEvent.type(inputElement, 'Software developer')
		expect(inputElement).toHaveValue('')
	})

	it('can be controlled field', async () => {
		const TestCase = () => {
			const [value, setValue] = useState('')
			return (
				<>
					<TextField
						label='Whatʼs your job title?'
						value={value}
						onChange={event => setValue(event.currentTarget.value)}
					/>
					<div data-testid='value'>{value}</div>
				</>
			)
		}
		render(<TestCase />)

		const inputElement = screen.getByRole('textbox', {
			name: 'Whatʼs your job title?',
		})
		expect(inputElement).toHaveValue('')

		await userEvent.type(inputElement, 'Software developer')

		expect(inputElement).toHaveValue('Software developer')
		expect(screen.getByTestId('value')).toHaveTextContent(
			'Software developer'
		)
	})
})
