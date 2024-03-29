import {
	Button,
	Inline,
	KeyboardShortcut,
	KeyCapturer,
	Stack,
	Text,
	TextField,
} from '@bootcamp-nx/core-ui'
import { useEffect, useRef } from 'react'
import { useAddTaskMutation } from '../slices/api.slice'

export function AddTaskFeature({
	projectId,
	onClear,
}: {
	projectId: number
	onClear?: () => void
}) {
	// const dispatch = useAppDispatch()
	const ref = useRef<HTMLInputElement>(null)
	const [addTask] = useAddTaskMutation()

	useEffect(() => {
		ref.current?.focus()
	}, [])

	const cancelForm = () => {
		if (ref.current) {
			ref.current.value = ''
		}
		onClear?.()
	}
	const submitForm = () => {
		const title = ref.current?.value
		if (!title) return
		addTask({ title, done: false, project_id: projectId })
		// dispatch(addTaskThunk({ title, projectId }))
		cancelForm()
	}

	return (
		<Stack space='xsmall'>
			<KeyCapturer onEnter={submitForm} onEscape={cancelForm}>
				<TextField
					aria-label='Create new task'
					placeholder='タスク名を入力'
					ref={ref}
					hint={
						<Text as='span' size='caption'>
							押す <KeyboardShortcut>Enter</KeyboardShortcut>{' '}
							作成したり <KeyboardShortcut>Esc</KeyboardShortcut>
							キャンセルします
						</Text>
					}
				/>
			</KeyCapturer>
			<Inline space='small'>
				<Button onClick={submitForm}>作成</Button>
				<Button variant='secondary' onClick={cancelForm}>
					キャンセル
				</Button>
			</Inline>
		</Stack>
	)
}
