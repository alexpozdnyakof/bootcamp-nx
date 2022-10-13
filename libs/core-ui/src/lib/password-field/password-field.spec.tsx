import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import PasswordField from './password-field'

describe('PasswordField', () => {
	it('supports externally provided id attr', () => {
		render(
			<PasswordField
				data-testid='password-field'
				id='custom'
				label='Password'
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement.id).toBe('custom')
	})

	it('is labelled by main and secondary labels', () => {
		const { rerender } = render(
			<PasswordField data-testid='password-field' label='Password' />
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleName('Password')

		rerender(
			<PasswordField
				data-testid='password-field'
				label='Password'
				secondaryLabel='main'
			/>
		)

		expect(passwordFieldElement).toHaveAccessibleName('Password (main)')
	})

	it('can be labelled by aria-label', () => {
		render(
			<PasswordField data-testid='password-field' aria-label='Password' />
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleName('Password')
	})

	it('can be labelled by aria-labelledby', () => {
		render(
			<>
				<PasswordField
					data-testid='password-field'
					label='Password'
					aria-labelledby='custom-label'
				/>
				<div id='custom-label'>Your new password</div>
			</>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleName('Your new password')
	})

	it('can be described by its hint when provided', () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='Password'
				hint='Your new password'
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleDescription(
			'Your new password'
		)
	})

	it('can be labelled by aria-labelledby', () => {
		render(
			<>
				<PasswordField
					data-testid='password-field'
					label='Password'
					aria-describedby='custom-hint'
				/>
				<div id='custom-hint'>Your new password</div>
			</>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleDescription(
			'Your new password'
		)
	})

	it('is marked as invalid when error tone setted', () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='Password'
				tone='error'
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toBeInvalid()
	})

	it('adds the mesage as part of the description, whenever the tone is not error', () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='Password'
				hint='type your new password'
				message='matches password'
				tone='success'
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleDescription(
			'matches password type your new password'
		)
	})

	it('renders its auxiliary label', () => {
		render(
			<PasswordField
				label='Password'
				auxiliaryLabel={<a href='/help'>Whats this</a>}
			/>
		)

		expect(
			screen.getByRole('link', { name: 'Whats this' })
		).toBeInTheDocument()
	})

	it('does not use the auxiliary label for semantics labelling purposes', () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='Password'
				auxiliaryLabel={<a href='/help'>Whats this</a>}
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAccessibleName('Password')
		expect(passwordFieldElement).not.toHaveAccessibleDescription()
	})

	it('can have a placeholder text', () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='Password'
				placeholder='new password'
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toBe(
			screen.getByPlaceholderText('new password')
		)
	})

	it('render an input with type password and does not allow providing an alternative type', () => {
		const { rerender } = render(
			<PasswordField data-testid='password-field' label='Password' />
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveAttribute('type', 'password')

		rerender(
			<PasswordField
				data-testid='password-field'
				label='Password'
				// @ts-expect-error test unavaliable prop
				type='text'
			/>
		)
		expect(passwordFieldElement).toHaveAttribute('type', 'password')
	})

	it('allows to toggle visibility of the password value', async () => {
		render(<PasswordField data-testid='password-field' label='Password' />)

		const passwordFieldElement = screen.getByTestId('password-field')
		const toggleButton = screen.getByRole('button', {
			name: 'Toggle password visibility',
		})

		expect(passwordFieldElement).toHaveAttribute('type', 'password')

		await userEvent.click(toggleButton)
		expect(passwordFieldElement).toHaveAttribute('type', 'text')

		await userEvent.click(toggleButton)
		expect(passwordFieldElement).toHaveAttribute('type', 'password')
	})

	it('is hiden when hidden prop provided', () => {
		const { rerender } = render(
			<PasswordField
				data-testid='password-field'
				label='New Password'
				hint='Must be at least 8 characters long'
				hidden
			/>
		)

		const passwordFieldElement = screen.getByTestId('password-field')
		const hintElement = screen.getByText(
			'Must be at least 8 characters long'
		)

		expect(passwordFieldElement).not.toBeVisible()
		expect(hintElement).not.toBeVisible()

		rerender(
			<PasswordField
				data-testid='password-field'
				label='New Password'
				hint='Must be at least 8 characters long'
			/>
		)

		expect(passwordFieldElement).toBeVisible()
		expect(hintElement).toBeVisible()
	})

	it('allows to type text into it', async () => {
		render(
			<PasswordField data-testid='password-field' label='New Password' />
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toHaveValue('')
		await userEvent.type(passwordFieldElement, '0x3cfdde8')
		expect(passwordFieldElement).toHaveValue('0x3cfdde8')
	})

	it('can be disabled', async () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='New Password'
				disabled
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).toBeDisabled()
		expect(passwordFieldElement).toHaveValue('')
		await userEvent.type(passwordFieldElement, '0x3cfdde8')
		expect(passwordFieldElement).toHaveValue('')
	})

	it('can be readonly', async () => {
		render(
			<PasswordField
				data-testid='password-field'
				label='New Password'
				readOnly
			/>
		)
		const passwordFieldElement = screen.getByTestId('password-field')
		expect(passwordFieldElement).not.toBeDisabled()
		expect(passwordFieldElement).toHaveValue('')
		await userEvent.type(passwordFieldElement, '0x3cfdde8')
		expect(passwordFieldElement).toHaveValue('')
	})

	it('can be a controlled input field', async () => {
		const TestCase = () => {
			const [value, setValue] = useState('')
			return (
				<>
					<PasswordField
						data-testid='password-field'
						label='New Password'
						value={value}
						onChange={event => setValue(event.currentTarget.value)}
					/>
					<div data-testid='value'>{value}</div>
				</>
			)
		}

		render(<TestCase />)
		const inputElement = screen.getByTestId('password-field')
		expect(inputElement).toHaveValue('')
		await userEvent.type(inputElement, '0x3cfdde8')
		expect(inputElement).toHaveValue('0x3cfdde8')
		expect(screen.getByTestId('value')).toHaveTextContent('0x3cfdde8')
	})
})
