import { useEffect, useRef } from 'react'
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

	const submitForm = () => {
		const value = ref.current?.value
		if (!value) return

		return onCreate(value.trim()), clearForm()
	}

	const clearForm = () => {
		if (ref.current) {
			ref.current.value = ''
		}
	}

	return (
		<Stack space='small'>
			<KeyCapturer
				onEnter={() => submitForm()}
				onEscape={() => clearForm()}
			>
				<TextField
					aria-label='Create new task'
					placeholder='Enter task name'
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
