import { useEffect, useRef, useState } from 'react'
import { KeyCapturer } from '../key-capturer'
import { KeyboardShortcut } from '../keyboard-shortcut'
import { Stack } from '../stack'
import { Text } from '../text'
import { TextField } from '../text-field'

type TaskFormProps = {
	onCreate: (title: string) => void
}

export function TaskForm({ onCreate }: TaskFormProps) {
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		ref.current?.focus()
	}, [])

	const [task, setTask] = useState<string>('')

	const submitForm = (task: string) => {
		if (!task) return

		return onCreate(task.trim()), clearForm()
	}

	const clearForm = () => setTask('')

	return (
		<Stack space='small'>
			<KeyCapturer
				onEnter={() => submitForm(task)}
				onEscape={() => clearForm()}
			>
				<TextField
					aria-label='Create new task'
					placeholder='Enter task name'
					onChange={event => setTask(event.currentTarget.value)}
					value={task}
					hint={
						<Text as='span'>
							Press <KeyboardShortcut>Enter</KeyboardShortcut> to
							create or <KeyboardShortcut>Esc</KeyboardShortcut>{' '}
							to cancel
						</Text>
					}
					ref={ref}
				/>
			</KeyCapturer>
		</Stack>
	)
}

export default TaskForm
