import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './task-form'

describe('TaskForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskForm onCreate={title => 0} />)
		expect(baseElement).toBeTruthy()
	})

	it('should call onCreate when enter pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onCreate={spy} />)
		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{enter}')

		expect(spy).toHaveBeenCalledWith('task title')
	})

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

	it('should not call onCreate when task title field is empty and button clicked', async () => {
		const spy = jest.fn()
		render(<TaskForm onCreate={spy} />)

		const createButton = screen.getByRole('button', {
			name: 'Create task',
		})
		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		expect(taskField).toHaveValue('')

		await userEvent.click(createButton)
		expect(spy).not.toHaveBeenCalled()
	})
	it('should not call onCreate when task title field is empty and enter pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onCreate={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		expect(taskField).toHaveValue('')

		await userEvent.type(taskField, '{enter}')
		expect(spy).not.toHaveBeenCalled()
	})

	it.todo('should clear input field when cancel clicked')
	it.todo('should clear input field when escape pressed')
	it.todo('should disabled cancle button when field is empty')

	it.todo('should have placeholder text')
	it.todo('should be labelled')
	it.todo('should trim whitespaces')
})
