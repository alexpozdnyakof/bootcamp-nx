import { ComponentProps, useCallback, useState } from 'react'
import { TaskList } from './task-list'

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

export function Interactive({ tasks, title }: ComponentProps<typeof TaskList>) {
	const [state, setState] = useState(tasks)
	const onComplete = useCallback(
		(id: number) => {
			setState(t =>
				t.map(it => (it.id === id ? { ...it, done: !it.done } : it))
			)
		},
		[setState]
	)

	const onDelete = useCallback(
		(id: number) => {
			setState(t => t.filter(it => it.id !== id))
		},
		[setState]
	)

	const onCreate = useCallback(
		(text: string) => {
			const createTask = (text: string) => ({
				id: state[state.length - 1].id++,
				text,
				done: false,
			})
			setState(t => t.concat(createTask(text)))
		},
		[setState, state]
	)

	return (
		<TaskList
			tasks={state}
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
