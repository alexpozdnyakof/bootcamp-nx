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

	it('should clear field after submit', async () => {
		render(<TaskForm onCreate={() => 0} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{enter}')

		expect(taskField).toHaveValue('')
	})

	it('should clear field when cancel pressed', async () => {
		render(<TaskForm onCreate={() => 0} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})
		const cancelButton = screen.getByRole('button', { name: 'Cancel' })

		await userEvent.type(taskField, 'task title')

		expect(taskField).toHaveValue('task title')

		await userEvent.click(cancelButton)

		expect(taskField).toHaveValue('')
	})
	it('should clear field when escape pressed', async () => {
		render(<TaskForm onCreate={() => 0} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{esc}')

		expect(taskField).toHaveValue('')
	})
	it('should trim whitespaces when form submitted', async () => {
		const spy = jest.fn()
		render(<TaskForm onCreate={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, ' task title {enter}')

		expect(spy).toHaveBeenCalledWith('task title')
	})

	it('should have placeholder text', () => {
		render(<TaskForm onCreate={() => 0} />)

		expect(
			screen.getByRole('textbox', {
				name: 'Create new task',
			})
		).toBe(screen.getByPlaceholderText('Enter task name'))
	})
	it('should be focused text field after init', () => {
		render(<TaskForm onCreate={() => 0} />)

		expect(
			screen.getByRole('textbox', {
				name: 'Create new task',
			})
		).toHaveFocus()
	})
})
