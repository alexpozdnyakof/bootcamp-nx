import {
	KeyCapturer,
	KeyboardShortcut,
	Stack,
	Text,
	TextField,
} from '@bootcamp-nx/core-ui'
import { useEffect, useRef } from 'react'

type TaskFormProps = {
	onSubmit?: (title: string) => void
	onClear?: () => void
	value?: string
}

export function TaskForm({ onSubmit, onClear, value }: TaskFormProps) {
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		ref.current?.focus()
	}, [])

	const submitForm = () => {
		const value = ref.current?.value
		if (!value) return

		return onSubmit?.(value.trim()), clearForm()
	}

	const clearForm = () => {
		if (ref.current) {
			ref.current.value = ''
			onClear?.()
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
					placeholder='タスク名を入力'
					hint={
						<Text as='span' size='caption'>
							押す <KeyboardShortcut>Enter</KeyboardShortcut>{' '}
							作成したり <KeyboardShortcut>Esc</KeyboardShortcut>
							キャンセルします
						</Text>
					}
					ref={ref}
					defaultValue={value}
				/>
			</KeyCapturer>
		</Stack>
	)
}

export default TaskForm
