import { ComponentProps, useState } from 'react'
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
	const createTask = (text: string) => ({
		id: state[state.length - 1].id++,
		text,
		done: false,
	})

	return (
		<TaskList
			tasks={state}
			title={title}
			onCreate={text => setState(t => t.concat(createTask(text)))}
			onComplete={id =>
				setState(t =>
					t.map(it => (it.id === id ? { ...it, done: true } : it))
				)
			}
			onDelete={id => setState(t => t.filter(it => it.id !== id))}
		/>
	)
}

Interactive.args = {
	tasks,
	title: 'Awesome task list',
}
