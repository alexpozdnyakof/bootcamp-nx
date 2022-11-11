import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskListItem from './task-list-item'
describe('Task list item', () => {
	const task = {
		id: 0,
		text: '血液レポートのグラフが空白になっている',
		done: false,
	}

	it('should not render item without task', () => {
		render(<TaskListItem data-testid='task-list-element' />)
		expect(screen.queryByTestId('task-list-element')).toBeFalsy()
	})
	it('should render task text', () => {
		render(<TaskListItem task={task} />)
		expect(screen.getByText(task.text)).toBeInTheDocument()
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

		const completeButton = screen.getByRole('checkbox', {
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

	it('should call onStartEdit callback', async () => {
		const onStartEdit = jest.fn()
		render(
			<TaskListItem
				task={task}
				onStartEdit={onStartEdit}
				data-testid='task-list-element'
			/>
		)

		await userEvent.dblClick(screen.getByTestId('task-list-element'))

		expect(onStartEdit).toHaveBeenCalledWith(task.id)
	})

	it('should show task form when editing', async () => {
		const { rerender } = render(
			<TaskListItem task={task} isEditing={false} />
		)

		expect(
			screen.queryByPlaceholderText('タスク名を入力')
		).not.toBeInTheDocument()

		rerender(<TaskListItem task={task} isEditing={true} />)
		expect(
			screen.queryByPlaceholderText('タスク名を入力')
		).toBeInTheDocument()
	})

	it('should call onCancelEdit', async () => {
		const onCancelEdit = jest.fn()
		render(
			<TaskListItem
				task={task}
				isEditing={true}
				onCancelEdit={onCancelEdit}
			/>
		)

		await userEvent.type(
			screen.getByPlaceholderText('タスク名を入力'),
			'{esc}'
		)

		expect(onCancelEdit).toHaveBeenCalled()
	})

	it('should call onCancelEdit when clicked outside', async () => {
		const onCancelEdit = jest.fn()
		render(
			<>
				<div data-testid='outside-element'></div>
				<TaskListItem
					task={task}
					isEditing={true}
					onCancelEdit={onCancelEdit}
				/>
			</>
		)

		await userEvent.click(screen.getByPlaceholderText('タスク名を入力'))
		expect(onCancelEdit).not.toHaveBeenCalled()

		await userEvent.click(screen.getByTestId('outside-element'))
		expect(onCancelEdit).toBeCalled()
	})

	it('should call onCreate callback', async () => {
		const onChange = jest.fn()
		render(
			<TaskListItem task={task} isEditing={true} onChange={onChange} />
		)

		await userEvent.type(
			screen.getByPlaceholderText('タスク名を入力'),
			'血液レ{enter}'
		)

		expect(onChange).toHaveBeenCalledWith(
			task.id,
			task.text.concat('血液レ')
		)
	})
})
