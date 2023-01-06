/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event/'
import useForm from './use-form'

describe('UseForm', () => {
	function ComponentUnderTest({
		onSubmit,
	}: {
		onSubmit: (value: any) => void
	}) {
		const { register, handleSumbit } = useForm()

		return (
			<form onSubmit={() => handleSumbit(onSubmit)}>
				<fieldset>
					<label htmlFor='income'>Income</label>
					<input id='income' type='text' {...register('income')} />
				</fieldset>
				<fieldset>
					<label htmlFor='outcome'>Outcome</label>
					<input id='outcome' type='text' {...register('outcome')} />
				</fieldset>
				<button type='submit'>Submit</button>
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
})
