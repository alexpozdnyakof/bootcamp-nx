/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event/'
import useForm, { required } from './use-form'

describe('UseForm', () => {
	function ComponentUnderTest({
		onSubmit,
	}: {
		onSubmit: (value: any) => void
	}) {
		const { register, handleSumbit, errors } = useForm()

		return (
			<form onSubmit={() => handleSumbit(onSubmit)}>
				<fieldset>
					<label htmlFor='income'>Income</label>
					<input
						id='income'
						type='text'
						{...register('income', [required])}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor='outcome'>Outcome</label>
					<input
						id='outcome'
						type='text'
						{...register('outcome', [required])}
					/>
				</fieldset>
				<button type='submit'>Submit</button>
				<div data-testId='incomeErrors'>
					{JSON.stringify(errors['income'])}
				</div>
				<div data-testId='outcomeErrors'>
					{JSON.stringify(errors['outcome'])}
				</div>
			</form>
		)
	}

	it('should set control names', () => {
		const submitFn = jest.fn()
		render(<ComponentUnderTest onSubmit={submitFn} />)

		const incomeField = screen.getByRole('textbox', { name: 'Income' })
		const outcomeField = screen.getByRole('textbox', { name: 'Outcome' })

		expect(incomeField).toHaveAttribute('name', 'income')
		expect(outcomeField).toHaveAttribute('name', 'outcome')
	})

	it('should pass form value to callback after submit', async () => {
		const submitFn = jest.fn()
		render(<ComponentUnderTest onSubmit={submitFn} />)

		const incomeField = screen.getByRole('textbox', { name: 'Income' })
		const outcomeField = screen.getByRole('textbox', { name: 'Outcome' })

		await userEvent.type(incomeField, 'income text')
		await userEvent.type(outcomeField, 'outcome text')

		const submitBtn = screen.getByRole('button', { name: 'Submit' })
		await userEvent.click(submitBtn)

		expect(submitFn).toHaveBeenCalledWith({
			income: 'income text',
			outcome: 'outcome text',
		})
	})

	it('should not execute submit callback if some form fields invalid', async () => {
		const submitFn = jest.fn()
		render(<ComponentUnderTest onSubmit={submitFn} />)

		const incomeField = screen.getByRole('textbox', { name: 'Income' })
		const outcomeField = screen.getByRole('textbox', { name: 'Outcome' })

		const submitBtn = screen.getByRole('button', { name: 'Submit' })
		await userEvent.click(submitBtn)
		expect(submitFn).not.toHaveBeenCalled()

		// Try with one empty field
		await userEvent.type(incomeField, 'income text')
		expect(submitFn).not.toHaveBeenCalled()

		// Try with filled form
		await userEvent.type(outcomeField, 'outcome text')
		await userEvent.click(submitBtn)
		expect(submitFn).toHaveBeenCalled()
	})
})
