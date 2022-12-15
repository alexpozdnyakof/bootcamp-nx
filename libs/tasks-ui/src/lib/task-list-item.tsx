import { ApiTask } from '@bootcamp-nx/api-interfaces'
import {
	Button,
	Icon,
	Inline,
	SwitchComplete,
	ListItem,
	EditableText,
	polymorphicComponent,
} from '@bootcamp-nx/core-ui'

import { memo, useState } from 'react'
import { ViewTask } from './common-types'

export type TaskListItemHandlers = {
	onDelete?: (id: ViewTask['id']) => void
	onComplete?: (id: ViewTask['id']) => void
	onChange?: (id: ViewTask['id'], text: string) => void
}

export type TaskListItemProps = {
	task: Required<ApiTask>
	isEditing?: boolean
} & TaskListItemHandlers

export const TaskListItem = memo(
	polymorphicComponent<'div', TaskListItemProps>(
		(
			{ task, onDelete, onComplete, isEditing, onChange, ...props },
			ref
		) => {
			if (!task) return null

			// eslint-disable-next-line react-hooks/rules-of-hooks
			const [isEdit, setEdit] = useState<boolean>(false)

			return (
				<ListItem
					{...props}
					selected={isEdit}
					ref={ref}
					actions={
						<Button
							size='small'
							variant='quaternary'
							onClick={() => onDelete?.(task.id)}
							aria-label={'Delete '.concat(task.title)}
							icon={<Icon size='small'>delete</Icon>}
						/>
					}
					startActions={
						<Icon size='small' tone='secondary'>
							drag_indicator
						</Icon>
					}
					hoverable={!isEditing}
					aria-label={task.title}
				>
					<Inline space='xsmall'>
						<SwitchComplete
							disabled={isEdit}
							done={task.done}
							aria-label={'Complete '.concat(task.title)}
							onClick={() => onComplete?.(task.id)}
						/>
						<EditableText
							onChange={newText => onChange?.(task.id, newText)}
							aria-label={`Edit ${task.title}`}
							onStartEdit={() => setEdit(true)}
							onCancelEdit={() => setEdit(false)}
						>
							{task.title}
						</EditableText>
					</Inline>
				</ListItem>
			)
		}
	)
)

TaskListItem.displayName = 'TaskListItem'
export default TaskListItem
