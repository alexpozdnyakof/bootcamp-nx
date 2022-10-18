import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Task from './task'

describe('Task', () => {
	it('should render successfully', () => {
		render(
			<Task
				{...{
					done: false,
					id: 1,
					text: 'New Todo',
					onClick: () => 0,
				}}
			/>
		)

		expect(
			screen.getByRole('button', { name: 'Complete' })
		).toBeInTheDocument()
		expect(screen.getByText('New Todo')).toBeInTheDocument()
	})

	it('should be controlled component', async () => {
		const TestCase = () => {
			const [complete, setComplete] = useState(false)
			return (
				<>
					<Task
						{...{
							done: complete,
							id: 1,
							text: 'New Todo',
							onClick: () => setComplete(v => !v),
						}}
					/>

					<div data-testid='value'>
						{complete ? 'complete' : 'not complete'}
					</div>
				</>
			)
		}
		render(<TestCase />)

		const completeButton = screen.getByRole('button', { name: 'Complete' })
		expect(completeButton).not.toHaveClass('toggle__done')

		await userEvent.click(completeButton)

		expect(completeButton).toHaveClass('toggle__done')
	})
})
