import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './task-form'

describe('TaskForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskForm onCreate={title => 0} />)
		expect(baseElement).toBeTruthy()
	})

	it.todo('should call onCreate when enter pressed')
	it('should call onCreate when create button clicked', async () => {
		const spy = jest.fn()
		render(<TaskForm onCreate={spy} />)

		const createButton = screen.getByRole('button', { name: 'Create task' })
		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title')
		await userEvent.click(createButton)

		expect(spy).toHaveBeenCalledWith('task title')
	})
	it.todo('should not call onCreate when task title field is empty')
	it.todo('should disable create button when field is empty')
	it.todo('should clear input field when cancel clicked')
	it.todo('should clear input field when escape pressed')
	it.todo('should disabled cancle button when field is empty')
	it.todo('should have placeholder text')
	it.todo('should be labelled')
})
