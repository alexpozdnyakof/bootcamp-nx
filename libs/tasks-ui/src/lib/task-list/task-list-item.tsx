import {
	Box,
	Button,
	Icon,
	ListItem,
	polymorphicComponent,
	useOutsideClick,
} from '@bootcamp-nx/core-ui'

import { memo, MouseEvent, useRef } from 'react'
import { TaskForm } from '../task-form'
import Task from '../task/task'
import { ViewTask } from './view-task'

export type TaskListItemHandlers = {
	onDelete?: (id: ViewTask['id']) => void
	onComplete?: (id: ViewTask['id']) => void
	onStartEdit?: (id: ViewTask['id']) => void
	onCancelEdit?: () => void
	onChange?: (id: ViewTask['id'], text: string) => void
}

export type TaskListItemProps = {
	task: ViewTask
	isEditing?: boolean
} & TaskListItemHandlers

const TaskListItem = memo(
	polymorphicComponent<'div', TaskListItemProps>(
		(
			{
				task,
				onDelete,
				onComplete,
				onStartEdit,
				isEditing,
				onCancelEdit,
				onChange,
				...props
			},
			ref
		) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const formRef = useRef(null)
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useOutsideClick(formRef, () => onCancelEdit?.())

			if (!task) return null
			const handleDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
				if (event.detail === 2) {
					onStartEdit?.(task.id)
				}
			}

			return (
				<ListItem
					{...props}
					ref={ref}
					onClick={handleDoubleClick}
					actions={
						<Button
							size='small'
							variant='quaternary'
							onClick={() => onDelete?.(task.id)}
							aria-label='delete'
						>
							<Icon size='small'>delete</Icon>
						</Button>
					}
					startActions={
						<Icon size='small' tone='secondary'>
							drag_indicator
						</Icon>
					}
					hoverable={!isEditing}
				>
					{isEditing ? (
						<Box ref={formRef}>
							<TaskForm
								onCreate={text => onChange?.(task.id, text)}
								onCancel={() => onCancelEdit?.()}
								value={task.text}
							/>
						</Box>
					) : (
						<Task
							{...task}
							onClick={() => onComplete?.(task.id)}
						></Task>
					)}
				</ListItem>
			)
		}
	)
)

TaskListItem.displayName = 'TaskListItem'

export default TaskListItem
