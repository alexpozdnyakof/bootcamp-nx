import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskListItem from './task-list-item'
describe('Task list item', () => {
	const task = {
		id: 0,
		title: '血液レポートのグラフが空白になっている',
		done: false,
		created: '2022-11-29 15:31:37',
		updated: '2022-11-29 15:31:37',
	}

	it('should not render item without task', () => {
		render(<TaskListItem data-testid='task-list-element' />)
		expect(screen.queryByTestId('task-list-element')).toBeFalsy()
	})
	it('should render task text', () => {
		render(<TaskListItem task={task} />)
		expect(screen.getByText(task.title)).toBeInTheDocument()
	})

	it('should call onDelete callback', async () => {
		const onDelete = jest.fn()
		render(<TaskListItem task={task} onDelete={onDelete} />)

		await userEvent.click(
			screen.getByRole('button', {
				name: 'Delete 血液レポートのグラフが空白になっている',
			})
		)

		expect(onDelete).toHaveBeenCalledWith(task.id)
	})

	it('should call toggleComplete callback for both task states', async () => {
		let onComplete = jest.fn()

		const { rerender } = render(
			<TaskListItem task={task} onComplete={onComplete} />
		)

		const completeButton = screen.getByRole('switch', {
			name: 'Complete 血液レポートのグラフが空白になっている',
		})
		await userEvent.click(completeButton)

		expect(onComplete).toHaveBeenCalledWith(task.id)

		onComplete = jest.fn()

		rerender(
			<TaskListItem
				task={{ ...task, done: true }}
				onComplete={onComplete}
			/>
		)

		expect(onComplete).not.toBeCalled()
		await userEvent.click(completeButton)
		expect(onComplete).toHaveBeenCalledWith(task.id)
	})

	it('should call onChange', async () => {
		const onChange = jest.fn()
		render(
			<TaskListItem task={task} isEditing={true} onChange={onChange} />
		)

		await userEvent.dblClick(
			screen.getByRole('switch', { name: `Edit ${task.title}` })
		)

		await userEvent.type(
			screen.getByDisplayValue(task.title),
			'血液レ{enter}'
		)

		expect(onChange).toHaveBeenCalledWith(
			task.id,
			task.title.concat('血液レ')
		)
	})
})
