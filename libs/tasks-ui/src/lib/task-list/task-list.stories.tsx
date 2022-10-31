import { ComponentProps, useCallback, useState } from 'react'
import { TaskList, ViewTask } from './task-list'

const tasks = [
	{
		id: 0,
		text: 'Blood report graph is showing blank',
		done: false,
	},
	{
		id: 1,
		text: 'Deactivate|| User is not able to deactivate the account',
		done: true,
	},
	{
		id: 2,
		text: 'My profile || User is not able to view the weight and height which are set during signup',
		done: false,
	},
	{
		id: 3,
		text: 'Profile, edit profile and Pop-ups',
		done: true,
	},
	{
		id: 4,
		text: 'Need Apple developer account to share build',
		done: false,
	},
]

export default {
	component: TaskList,
	title: 'Tasks/TaskList',
}

type TaskListState = {
	tasks: Array<ViewTask>
	active: ViewTask['id'] | null
}

export function Interactive({ tasks, title }: ComponentProps<typeof TaskList>) {
	const [state, setState] = useState<TaskListState>({ tasks, active: null })

	const onComplete = useCallback(
		(id: number) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.map(it =>
					it.id === id ? { ...it, done: !it.done } : it
				),
				...s,
			}))
		},
		[setState]
	)

	const onDelete = useCallback(
		(id: number) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.filter(it => it.id !== id),
				...s,
			}))
		},
		[setState]
	)

	const onCreate = useCallback(
		(text: string) => {
			const createTask = (text: string) => ({
				id: state.tasks[state.tasks.length - 1].id++,
				text,
				done: false,
			})
			setState(({ tasks, ...s }) => ({
				tasks: tasks.concat(createTask(text)),
				...s,
			}))
		},
		[setState, state]
	)

	const setActive = (idOrNull: TaskListState['active']) => {
		setState(({ active, ...s }) => ({
			active: active === idOrNull ? active : idOrNull,
			...s,
		}))
	}

	return (
		<TaskList
			tasks={state.tasks}
			title={title}
			onCreate={onCreate}
			toggleComplete={onComplete}
			onDelete={onDelete}
		/>
	)
}

Interactive.args = {
	tasks,
	title: 'Awesome task list',
}
