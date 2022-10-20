import { ComponentProps, useState } from 'react'
import { Stack } from '../stack'
import Task from './task'

export default {
	title: 'Tasks/Task',
	component: Task,
}

export function Interactive({ id, text }: ComponentProps<typeof Task>) {
	const [done, setDone] = useState(false)

	return (
		<Task
			id={id}
			text={text}
			done={done}
			onClick={() => setDone(v => !v)}
		/>
	)
}

Interactive.argTypes = {
	id: {
		control: { type: 'number' },
		defaultValue: 0,
	},
	text: {
		control: { type: 'text' },
		defaultValue: 'New task item for you',
	},
	done: {
		control: { type: 'boolean' },
		defaultValue: true,
	},
}

export function States({ id, text }: ComponentProps<typeof Task>) {
	return (
		<Stack space='small'>
			<Task
				key='Done task'
				id={1}
				text='Done task'
				done={true}
				onClick={() => 0}
			/>
			<Task
				key='Undone task'
				id={2}
				text='Undone task'
				done={false}
				onClick={() => 0}
			/>
		</Stack>
	)
}
