import { ComponentProps } from 'react'
import Task from './task'

export default {
	title: 'Features/Task',
	component: Task,
}

export function InteractivePropsStory({
	id,
	text,
	done,
}: ComponentProps<typeof Task>) {
	return <Task id={id} text={text} done={done} onClick={() => 0} />
}

InteractivePropsStory.argTypes = {
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
