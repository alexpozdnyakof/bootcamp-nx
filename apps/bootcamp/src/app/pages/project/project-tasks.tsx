import { Inline, List, ListItem, Stack } from '@bootcamp-nx/core-ui'
import { TaskFormExpandView, TaskListHeader } from '@bootcamp-nx/tasks-ui'
import { DeleteTask } from '../../features/delete-task'
import { EditableTaskTitle } from '../../features/editable-task-title'
import { ToggleTask } from '../../features/toggle-task'
import { selectTasksGroupedBySections } from '../../store'
import { useAppSelector } from '../../store-hooks'

export function ProjectTasks() {
	const sections = useAppSelector(selectTasksGroupedBySections)

	return (
		<>
			{sections.map(section => (
				<Stack space='large' key={section.id}>
					<Stack space='small'>
						<TaskListHeader completed='0/5'>
							{section?.title || ''}
						</TaskListHeader>
						<TaskFormExpandView
							onSubmit={(title: string) => title}
						/>
					</Stack>
					<List>
						{section.tasks.map(task => (
							<ListItem
								key={`task-${task.id}`}
								actions={
									<DeleteTask
										id={task.id}
										title={task.title}
									/>
								}
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
			))}
		</>
	)
}
