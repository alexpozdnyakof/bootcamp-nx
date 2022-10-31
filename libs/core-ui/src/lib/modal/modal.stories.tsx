import { ComponentProps, useState } from 'react'
import { Button } from '../button'
import { Modal } from './modal'

export default {
	component: Modal,
	title: 'Modal',
}

export function Interactive({ isOpen: _isOpen }: ComponentProps<typeof Modal>) {
	const [isOpen, setOpen] = useState(_isOpen)
	return (
		<>
			<Button onClick={() => setOpen(o => !o)}>Open Modal</Button>
			<Modal isOpen={isOpen} />
		</>
	)
}

Interactive.argTypes = {
	isOpen: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
}
