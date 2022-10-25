import { useState } from 'react'
import Button from '../button/button'
import { Inline } from '../inline'
import { KeyCapturer } from '../key-capturer'
import { KeyboardShortcut } from '../keyboard-shortcut'
import { Stack } from '../stack'
import { Text } from '../text'
import { TextField } from '../text-field'

type TaskFormProps = {
	onCreate: (title: string) => void
}

export function TaskForm({ onCreate }: TaskFormProps) {
	const [task, setTask] = useState<string>('')

  const submitForm = (task: string) => {
		if (!task) return

		return onCreate(task), setTask('')
  }

  return (
		<Stack space='small'>
			<Text size='subtitle' weight='bold'>
				Add new task
			</Text>
			<KeyCapturer onEnter={() => submitForm(task)}>
				<TextField
					aria-label='Create new task'
					onChange={event => setTask(event.currentTarget.value)}
					value={task}
					hint={
						<Text>
							Press <KeyboardShortcut>Enter</KeyboardShortcut> to
							create or <KeyboardShortcut>Esc</KeyboardShortcut>{' '}
							to cancel
						</Text>
					}
				/>
			</KeyCapturer>
			<Inline space='small' align='left'>
				<Button onClick={() => submitForm(task)}>Create task</Button>
				<Button variant='secondary'>Cancel</Button>
			</Inline>
		</Stack>
  )
}

export default TaskForm
