import {
	Button,
	Icon,
	Inline,
	SwitchComplete,
	ListItem,
	EditableText,
	polymorphicComponent,
} from '@bootcamp-nx/core-ui'

import { memo } from 'react'
import { ViewTask } from '../common-types'

export type TaskListItemHandlers = {
	onDelete?: (id: ViewTask['id']) => void
	onComplete?: (id: ViewTask['id']) => void
	onChange?: (id: ViewTask['id'], text: string) => void
}

export type TaskListItemProps = {
	task: ViewTask
	isEditing?: boolean
} & TaskListItemHandlers

const TaskListItem = memo(
	polymorphicComponent<'div', TaskListItemProps>(
		(
			{ task, onDelete, onComplete, isEditing, onChange, ...props },
			ref
		) => {
			if (!task) return null

			return (
				<ListItem
					{...props}
					ref={ref}
					actions={
						<Button
							size='small'
							variant='quaternary'
							onClick={() => onDelete?.(task.id)}
							aria-label={'Delete '.concat(task.text)}
							icon={<Icon size='small'>delete</Icon>}
						/>
					}
					startActions={
						<Icon size='small' tone='secondary'>
							drag_indicator
						</Icon>
					}
					hoverable={!isEditing}
					aria-label={task.text}
				>
					<Inline space='xsmall'>
						<SwitchComplete
							done={task.done}
							aria-label={'Complete '.concat(task.text)}
							onClick={() => onComplete?.(task.id)}
						/>
						<EditableText
							onChange={newText => onChange?.(task.id, newText)}
							aria-label={`Edit ${task.text}`}
						>
							{task.text}
						</EditableText>
					</Inline>
				</ListItem>
			)
		}
	)
)

TaskListItem.displayName = 'TaskListItem'

export default TaskListItem
