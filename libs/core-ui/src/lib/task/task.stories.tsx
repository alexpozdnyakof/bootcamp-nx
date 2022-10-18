import { ComponentProps, useState } from 'react'
import Task from './task'

export default {
	title: 'Features/Task',
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
