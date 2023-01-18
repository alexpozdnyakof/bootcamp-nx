import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormEvent } from 'react'
import useVanillaForm, { SubmitFn } from './use-vanilla-form'

type FormState = {
	hostname: string
	ipaddress: string
	optional: string | undefined
}
function ComponentUnderTest({
	submitCallback = state => state,
}: {
	submitCallback?: SubmitFn<FormState>
}) {
	const { errors, formControl, handleSubmit } = useVanillaForm<FormState>()
	return (
		<>
			<form
				noValidate
				onSubmit={(event: FormEvent) =>
					handleSubmit(submitCallback)(event)
				}
			>
				<input
					{...formControl('hostname', { required: true })}
					data-testid='hostnameField'
					type='text'
				/>
				<input
					type='text'
					{...formControl('ipaddress', {
						required: true,
						pattern:
							'^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)(\\.(?!$)|$)){4}$',
					})}
					data-testid='ipaddressField'
				/>
				<input
					{...formControl('optional')}
					type='text'
					data-testid='optionalField'
				/>
				<button type='submit'>サインイン</button>
			</form>
			<div data-testid='hostname'>{errors.hostname}</div>
			<div data-testid='ipaddress'>{errors.ipaddress}</div>
			<div data-testid='optional'>{errors.optional}</div>
		</>
	)
}

describe('UseVanillaForm', () => {
	it('should set names', () => {
		render(<ComponentUnderTest />)
		const optional = screen.getByTestId('optionalField')
		const ipaddress = screen.getByTestId('ipaddressField')
		const hostname = screen.getByTestId('hostnameField')

		expect(optional).toHaveAttribute('name', 'optional')
		expect(ipaddress).toHaveAttribute('name', 'ipaddress')
		expect(hostname).toHaveAttribute('name', 'hostname')
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
