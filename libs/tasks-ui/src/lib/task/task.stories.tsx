import { Stack } from '@bootcamp-nx/core-ui'
import { ComponentProps, useState } from 'react'

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
		defaultValue: '血液レポートのグラフが空白になっている',
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
				text='完了したタスク'
				done={true}
				onClick={() => 0}
			/>
			<Task
				key='Undone task'
				id={2}
				text='進行中のタスク'
				done={false}
				onClick={() => 0}
			/>
		</Stack>
	)
}
