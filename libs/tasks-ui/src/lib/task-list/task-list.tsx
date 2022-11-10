import {
	Button,
	ListItem,
	List,
	Icon,
	Stack,
	Heading,
	Text,
} from '@bootcamp-nx/core-ui'
import { ComponentProps, memo, MouseEvent } from 'react'
import { TaskForm } from '../task-form'
import Task from '../task/task'

export type ViewTask = {
	done: boolean
	id: number
	text: string
}

type Handlers = {
	onDelete?: (id: ViewTask['id']) => void
	toggleComplete?: (id: ViewTask['id']) => void
	onCreate?: (text: ViewTask['text']) => void
	onEdit?: (id: ViewTask['id']) => void
	onCancelEdit?: () => void
}

type TaskListProps = {
	tasks: Array<ViewTask>
	title: string
	completedCount?: string
	editingTask?: ViewTask['id'] | null
} & Partial<Handlers>

const TaskListItem = memo(
	({
		task,
		onDelete,
		toggleComplete,
		onEdit,
		isEditing,
		onCancelEdit,
	}: { task: ViewTask; isEditing: boolean } & Omit<Handlers, 'onCreate'>) => {
		const handleClick = (event: MouseEvent) => {
			if (event.detail === 2) {
				onEdit?.(task.id)
			}
		}

		const onCreate = (text: string) => {
			console.log({ text })
		}

		return (
			<ListItem
				onClick={handleClick}
				actions={
					<Button
						size='small'
						variant='quaternary'
						onClick={() => onDelete?.(task.id)}
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
					<TaskForm
						onCreate={text => onCreate(text)}
						onCancel={() => onCancelEdit?.()}
						value={task.text}
					/>
				) : (
					<Task
						{...task}
						onClick={() => toggleComplete?.(task.id)}
					></Task>
				)}
			</ListItem>
		)
	}
)

TaskListItem.displayName = 'TaskListItem'

export function TaskList({
	tasks,
	title,
	onDelete,
	toggleComplete,
	onCreate,
	onEdit,
	onCancelEdit,
	editingTask,
	completedCount,
}: TaskListProps) {
	return (
		<Stack space='large'>
			<Stack space='xsmall'>
				{completedCount && (
					<Text size='caption' tone='secondary' weight='bold'>
						{completedCount} タスク完了
					</Text>
				)}
				<Heading level='2' size='larger'>
					{title}
				</Heading>
				<TaskForm onCreate={onCreate} />
			</Stack>
			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onDelete}
						toggleComplete={toggleComplete}
						onEdit={onEdit}
						isEditing={editingTask === task.id}
						onCancelEdit={onCancelEdit}
					/>
				))}
			</List>
		</Stack>
	)
}

export default TaskList

/**
 * This interface forces typescript to differentiate between
 * two IDs which use a different generic type.
 */
//  export interface Id<T> extends String {
//   __idTypeFor?: T;
// }

// // syntactic sugar for importing the specific ID type
// export type PersonId = Id<Person>;

// export interface Person {
//   id: PersonId;

//   address: Address;
// }

// // syntactic sugar for importing the specific ID type
// export type AddressId = Id<Address>;

// export interface Address {
//   id: AddressId;
// }

// const a: Address = { id: 'some-address-id' };
// const p: Person = { id: 'some-person-id', address: a };

// // assign AddressId to PersonId
// p.id = a.id; // TS: Type 'AddressId' is not assignable to type 'PersonId'.


