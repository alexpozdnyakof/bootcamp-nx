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
					text: '血液レポートのグラフが空白になっている',
					onClick: () => 0,
				}}
			/>
		)

		expect(
			screen.getByRole('button', {
				name: 'Complete 血液レポートのグラフが空白になっている',
			})
		).toBeInTheDocument()
		expect(
			screen.getByText('血液レポートのグラフが空白になっている')
		).toBeInTheDocument()
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
							text: '血液レポートのグラフが空白になっている',
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

		const completeButton = screen.getByRole('button', {
			name: 'Complete 血液レポートのグラフが空白になっている',
		})
		expect(completeButton).not.toHaveClass('toggle__done')

		await userEvent.click(completeButton)

		expect(completeButton).toHaveClass('toggle__done')
	})
})
