import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormEvent } from 'react'
import { SubmitFn, useForm } from './use-form'

describe('useForm', () => {
	function ComponentUnderTest({
		submitCallback = state => state,
	}: {
		submitCallback?: SubmitFn<{
			hostname: string | null
			ipaddress: string | null
			optional: string | null
		}>
	}) {
		const { handleSubmit, errors } = useForm({
			hostname: null,
			ipaddress: null,
			optional: null,
		})
		return (
			<>
				<form
					noValidate
					onSubmit={(event: FormEvent) =>
						handleSubmit(submitCallback)(event)
					}
				>
					<input
						data-testid='hostnameField'
						type='text'
						name='hostname'
						required
					/>
					<input
						type='text'
						name='ipaddress'
						data-testid='ipaddressField'
						required
						pattern='^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$'
					/>
					<input
						type='text'
						name='optional'
						data-testid='optionalField'
					/>
					<button type='submit'>サインイン</button>
				</form>
				<div data-testid='hostname'>{errors.hostname}</div>
				<div data-testId='ipaddress'>{errors.ipaddress}</div>
				<div data-testId='optional'>{errors.optional}</div>
			</>
		)
	}

	it('should set form errors for constraint fields after submit', async () => {
		render(<ComponentUnderTest />)

		const hostnameErrors = screen.getByTestId('hostname')
		const ipaddressErrors = screen.getByTestId('ipaddress')

		expect(hostnameErrors.textContent).toBe('')
		expect(ipaddressErrors.textContent).toBe('')

		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(hostnameErrors.textContent).toBe('Constraints not satisfied')
		expect(ipaddressErrors.textContent).toBe('Constraints not satisfied')
	})

	it('should not set errors for fields without constraints', async () => {
		render(<ComponentUnderTest />)

		const optionalErrors = screen.getByTestId('optional')
		expect(optionalErrors.textContent).toBe('')

		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(optionalErrors.textContent).toBe('')
	})

	it('should clear errors for valid field after submit', async () => {
		render(<ComponentUnderTest />)
		const hostnameErrors = screen.getByTestId('hostname')

		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(hostnameErrors.textContent).toBe('Constraints not satisfied')

		await userEvent.type(screen.getByTestId('hostnameField'), 'linux.org')
		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(hostnameErrors.textContent).toBe('')
	})

	it('should not run submit callback for invalid form', async () => {
		const submitCallback = jest.fn()
		render(<ComponentUnderTest submitCallback={submitCallback} />)
		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(submitCallback).not.toHaveBeenCalled()
	})

	it('should run submit callback with form result for valid form', async () => {
		const submitCallback = jest.fn()
		render(<ComponentUnderTest submitCallback={submitCallback} />)
		const hostname = screen.getByTestId('hostnameField')
		const ipaddress = screen.getByTestId('ipaddressField')

		await userEvent.type(hostname, 'linux.org')
		await userEvent.type(ipaddress, '127.0.0.1')
		await userEvent.click(
			screen.getByRole('button', { name: 'サインイン' })
		)

		expect(submitCallback).toHaveBeenCalledTimes(1)
		expect(submitCallback).toHaveBeenCalledWith({
			hostname: 'linux.org',
			ipaddress: '127.0.0.1',
			optional: '',
		})
	})
})
