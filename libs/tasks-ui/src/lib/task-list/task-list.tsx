import { Button, Icon, Inline, List, Stack, Text } from '@bootcamp-nx/core-ui'
import { useState } from 'react'
import { TaskForm } from '../task-form'
import { useTaskListState } from '../task-list-context'
import { TaskListItem } from '../task-list-item'

enum TaskListMode {
	CreatingTask,
	Idle,
}
export function TaskList() {
	const [mode, setMode] = useState<TaskListMode>(TaskListMode.Idle)

	const {
		tasks,
		title,
		onDelete,
		onComplete,
		onCreate,
		onChange,
		completedCount,
	} = useTaskListState()

	const isIdle = () => mode === TaskListMode.Idle
	const setIdle = () => setMode(TaskListMode.Idle)
	const setCreating = () => setMode(TaskListMode.CreatingTask)

	return (
		<Stack space='large'>
			<Stack space='small'>
				<Stack>
					{completedCount && (
						<Text size='caption' tone='secondary' weight='bold'>
							{completedCount} タスク完了
						</Text>
					)}
					<Inline width='full' alignY='center'>
						<Text size='subtitle' weight='bold'>
							{title}
						</Text>
						<Button
							size='small'
							variant='quaternary'
							icon={<Icon size='small'>more_horiz</Icon>}
						/>
					</Inline>
				</Stack>
				{!isIdle() && (
					<TaskForm onSubmit={onCreate} onClear={setIdle} />
				)}
				{isIdle() && (
					<Button onClick={setCreating}>タスクを作成</Button>
				)}
			</Stack>

			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onDelete}
						onComplete={onComplete}
						onChange={onChange}
					/>
				))}
			</List>
		</Stack>
	)
}

export default TaskList
