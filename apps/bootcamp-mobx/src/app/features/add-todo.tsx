import {
	Box,
	Button,
	Inline,
	KeyboardShortcut,
	KeyCapturer,
	Stack,
	Text,
	TextField,
	Toolbar,
} from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useStore } from '../stores'

const AddTaskFeature = observer(
	({ projectId, onClear }: { projectId: number; onClear?: () => void }) => {
		const { todoStore } = useStore()
		const ref = useRef<HTMLInputElement>(null)

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
			todoStore.add({ title, done: false, project_id: projectId })
			cancelForm()
		}

		return (
			<Toolbar>
				<KeyCapturer onEnter={submitForm} onEscape={cancelForm}>
					<TextField
						type='text'
						autoComplete='off'
						aria-label='Create new task'
						placeholder='タスク名を入力'
						ref={ref}
					/>
				</KeyCapturer>
				<Box marginLeft='medium'>
					<Inline space='small'>
						<Button onClick={submitForm}>作成</Button>
						<Button variant='secondary' onClick={cancelForm}>
							キャンセル
						</Button>
					</Inline>
				</Box>
			</Toolbar>
		)
	}
)

export default AddTaskFeature
