import {
	KeyCapturer,
	KeyboardShortcut,
	Stack,
	Text,
	TextField,
} from '@bootcamp-nx/core-ui'
import { useEffect, useRef } from 'react'

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
