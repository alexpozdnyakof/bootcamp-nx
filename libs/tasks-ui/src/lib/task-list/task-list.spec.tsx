import { screen, render } from '@testing-library/react'
import TaskList from './task-list'
import { TaskListProvider } from '../task-list-context'
import { TASKS_DATA } from './tasks-data'
import userEvent from '@testing-library/user-event'

describe('Task list', () => {
	const taskListTitle = '素晴らしいタスクリスト'
	const ComponentUnderTest = () => (
		<TaskListProvider tasks={TASKS_DATA} title={taskListTitle}>
			<TaskList />
		</TaskListProvider>
	)
	it('should render successfully', () => {
		const { baseElement } = render(<ComponentUnderTest />)
		expect(baseElement).toBeTruthy()
	})

	it('should render title', () => {
		render(<ComponentUnderTest />)

		expect(screen.getByText(taskListTitle)).toBeInTheDocument()
	})

	it('should render all tasks', () => {
		render(<ComponentUnderTest />)

		expect(screen.getAllByRole('listitem')).toHaveLength(TASKS_DATA.length)
		TASKS_DATA.forEach(({ text }) =>
			expect(screen.getByText(text)).toBeInTheDocument()
		)
	})

	it('should render completed count status', async () => {
		render(<ComponentUnderTest />)

		expect(screen.getByText('2/5 タスク完了')).toBeInTheDocument()
	})

	it('should complete task', async () => {
		render(<ComponentUnderTest />)
		const completeButton = screen.getByRole('checkbox', {
			name: 'Complete 血液レポートのグラフが空白になっている',
		})

		expect(completeButton).not.toBeChecked()

		await userEvent.click(completeButton)

		expect(completeButton).toBeChecked()
	})

	it('should recalculate completed count status', async () => {
		render(<ComponentUnderTest />)

		await userEvent.click(
			screen.getByRole('checkbox', {
				name: 'Complete 血液レポートのグラフが空白になっている',
			})
		)

		expect(screen.getByText('3/5 タスク完了')).toBeInTheDocument()
	})

	it('should delete task', async () => {
		render(<ComponentUnderTest />)

		expect(screen.getAllByRole('listitem')).toHaveLength(TASKS_DATA.length)
		expect(screen.getByText(TASKS_DATA[0].text)).toBeInTheDocument()

		await userEvent.click(
			screen.getByRole('button', {
				name: `Delete ${TASKS_DATA[0].text}`,
			})
		)

		expect(screen.getAllByRole('listitem')).toHaveLength(
			TASKS_DATA.length - 1
		)

		expect(screen.queryByText(TASKS_DATA[0].text)).not.toBeInTheDocument()
	})

	it('should create new task', async () => {
		render(<ComponentUnderTest />)
		expect(screen.getAllByRole('listitem')).toHaveLength(TASKS_DATA.length)

		const newTaskText = '新しいホームページを作成する'
		expect(screen.queryByText(newTaskText)).not.toBeInTheDocument()

		const newTaskForm = screen.getByRole('textbox', {
			name: 'Create new task',
		})

		await userEvent.type(newTaskForm, `${newTaskText}{enter}`)

		expect(screen.getAllByRole('listitem')).toHaveLength(
			TASKS_DATA.length + 1
		)
		expect(screen.queryByText(newTaskText)).toBeInTheDocument()
	})

	it('should show and hide task editing form', async () => {
		render(<ComponentUnderTest />)

		expect(
			screen.queryByDisplayValue(TASKS_DATA[0].text)
		).not.toBeInTheDocument()

		await userEvent.dblClick(
			screen.getByRole('listitem', { name: TASKS_DATA[0].text })
		)

		expect(
			screen.queryByDisplayValue(TASKS_DATA[0].text)
		).toBeInTheDocument()

		await userEvent.type(
			screen.getByDisplayValue(TASKS_DATA[0].text),
			'{esc}'
		)

		expect(
			screen.queryByDisplayValue(TASKS_DATA[0].text)
		).not.toBeInTheDocument()
	})

	it('should change task text', async () => {
		render(<ComponentUnderTest />)

		const taskBeforeEditing = screen.queryByText(TASKS_DATA[0].text)

		expect(taskBeforeEditing).toBeInTheDocument()
		expect(
			screen.queryByText(TASKS_DATA[0].text.concat('血液'))
		).not.toBeInTheDocument()

		await userEvent.dblClick(
			screen.getByRole('listitem', { name: TASKS_DATA[0].text })
		)

		await userEvent.type(
			screen.getByDisplayValue(TASKS_DATA[0].text),
			'血液{enter}'
		)

		expect(taskBeforeEditing).not.toBeInTheDocument()

		expect(
			screen.queryByText(TASKS_DATA[0].text.concat('血液'))
		).toBeInTheDocument()

		expect(taskBeforeEditing).not.toBeInTheDocument()
	})
})
