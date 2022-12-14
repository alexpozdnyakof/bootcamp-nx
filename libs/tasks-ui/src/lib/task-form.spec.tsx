import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TaskForm from './task-form'

describe('TaskForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskForm />)
		expect(baseElement).toBeTruthy()
	})

	it('should call onCreate when enter pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onSubmit={spy} />)
		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{enter}')

		expect(spy).toHaveBeenCalledWith('task title')
	})
	it('should not call onCreate when task title field is empty and enter pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onSubmit={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		expect(taskField).toHaveValue('')

		await userEvent.type(taskField, '{enter}')
		expect(spy).not.toHaveBeenCalled()
	})

	it('should clear field after submit', async () => {
		render(<TaskForm onSubmit={() => 0} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{enter}')

		expect(taskField).toHaveValue('')
	})

	it('should clear field when escape pressed', async () => {
		render(<TaskForm onSubmit={() => 0} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, 'task title{esc}')

		expect(taskField).toHaveValue('')
	})
	it('should trim whitespaces when form submitted', async () => {
		const spy = jest.fn()
		render(<TaskForm onSubmit={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, ' task title {enter}')

		expect(spy).toHaveBeenCalledWith('task title')
	})

	it('should have placeholder text', () => {
		render(<TaskForm />)

		expect(
			screen.getByRole('textbox', {
				name: 'Create new task',
			})
		).toBe(screen.getByPlaceholderText('?????????????????????'))
	})
	it('should be focused text field after init', () => {
		render(<TaskForm />)

		expect(
			screen.getByRole('textbox', {
				name: 'Create new task',
			})
		).toHaveFocus()
	})

	it('should set field value', () => {
		render(<TaskForm value='?????????????????????????????????????????????????????????' />)

		expect(
			screen.getByRole('textbox', {
				name: 'Create new task',
			})
		).toHaveValue('?????????????????????????????????????????????????????????')
	})

	it('should call onCancel when esc pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onClear={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, '{esc}')
		expect(spy).toHaveBeenCalled()
	})

	it('should call onSubmit when button pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onSubmit={spy} />)

		const taskField = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(taskField, '??????')

		await userEvent.click(screen.getByRole('button', { name: '??????' }))

		expect(spy).toHaveBeenCalled()
	})

	it('should call onCancel when button pressed', async () => {
		const spy = jest.fn()
		render(<TaskForm onClear={spy} />)

		await userEvent.click(
			screen.getByRole('button', { name: '???????????????' })
		)
		expect(spy).toHaveBeenCalled()
	})
})
