import { ApiTask } from '@bootcamp-nx/api-interfaces'
import {
	Button,
	ExpandView,
	Inline,
	List,
	ListItem,
	Stack,
} from '@bootcamp-nx/core-ui'
import { AddTaskFeature } from '../../features/add-task'
import { DeleteTask } from '../../features/delete-task'
import { EditableTaskTitle } from '../../features/editable-task-title'
import { ToggleTask } from '../../features/toggle-task'
import { useAppSelector } from '../../store-hooks'

export function ProjectTasks() {
	const tasks = useAppSelector((state: RootState) =>
		Object.entries(state.tasks.entities).map(
			([taskId, task]) =>
				({
					id: Number(taskId),
					...task,
				} as ApiTask)
		)
	)
	const projectId = useAppSelector(
		(state: RootState) => state.projects.activeId
	)

	return (
		<Stack space='large'>
			<ExpandView>
				{(toggleExpand, expanded) => (
					<>
						{!expanded && (
							<Button onClick={toggleExpand}>タスクを作成</Button>
						)}
						{expanded && (
							<AddTaskFeature
								projectId={Number(projectId)}
								onClear={toggleExpand}
							/>
						)}
					</>
				)}
			</ExpandView>
			<List>
				{tasks.map(task => (
					<ListItem
						key={`task-${task.id}`}
						actions={<DeleteTask id={task.id} title={task.title} />}
					>
						<Inline space='small'>
							<ToggleTask
								id={task.id}
								title={task.title}
								done={task.done}
							/>
							<EditableTaskTitle
								title={task.title}
								id={task.id}
							/>
						</Inline>
					</ListItem>
				))}
			</List>
		</Stack>
	)
}
