import {
	Button,
	EditableText,
	ExpandView,
	Icon,
	Inline,
	List,
	Stack,
	Text,
} from '@bootcamp-nx/core-ui'
import { TaskForm } from '../task-form'
import { useTaskListState } from '../task-list-context'
import { TaskListItem } from '../task-list-item'

export function TaskList() {
	const {
		tasks,
		title,
		onDelete,
		onComplete,
		onCreate,
		onChange,
		completedCount,
	} = useTaskListState()

	return (
		<Stack space='large'>
			<Stack space='small'>
				{/* Task list header */}
				<Stack>
					{completedCount && (
						<Text size='caption' tone='secondary' weight='bold'>
							{completedCount} タスク完了
						</Text>
					)}
					<Inline width='full' alignY='center'>
						<EditableText
							size='subtitle'
							weight='bold'
							onChange={newValue => 0}
						>
							{title}
						</EditableText>

						<Button
							size='small'
							variant='quaternary'
							icon={<Icon size='small'>more_horiz</Icon>}
						/>
					</Inline>
				</Stack>

				<ExpandView>
					{(toggleExpand, expanded) => (
						<>
							{!expanded && (
								<Button onClick={toggleExpand}>
									タスクを作成
								</Button>
							)}
							{expanded && (
								<TaskForm
									onSubmit={onCreate}
									onClear={toggleExpand}
								/>
							)}
						</>
					)}
				</ExpandView>
			</Stack>

			{/* Tasks */}
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
