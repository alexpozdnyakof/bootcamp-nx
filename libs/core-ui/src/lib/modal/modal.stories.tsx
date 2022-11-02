import { ComponentProps, useState } from 'react'
import { Button } from '../button'
import { Modal } from './modal'

export default {
	component: Modal,
	title: 'Modal',
}

export function Interactive({ isOpen: _isOpen }: ComponentProps<typeof Modal>) {
	const [isOpen, setOpen] = useState(_isOpen)
	const toggleModal = () => setOpen(o => !o)
	return (
		<>
			<div id='__anotherRoot__'></div>
			<Button onClick={toggleModal}>モーダルを開く</Button>
			<Modal isOpen={isOpen} onClose={toggleModal}>
				モーダルウィンドウ!
			</Modal>
		</>
	)
}

Interactive.argTypes = {
	isOpen: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
}
