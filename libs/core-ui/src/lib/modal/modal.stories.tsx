import { ComponentProps, useState } from 'react'
import { BoxMaxMinWidth } from '../box/box'
import { Button } from '../button'
import { selectWithNone } from '../storybook-helpers'
import { Modal } from './modal'

export default {
	component: Modal,
	title: 'Modal',
}

export function Interactive({
	isOpen: _isOpen,
	width,
}: ComponentProps<typeof Modal>) {
	const [isOpen, setOpen] = useState(_isOpen)
	const toggleModal = () => setOpen(o => !o)
	return (
		<>
			<div id='__anotherRoot__'></div>
			<Button onClick={toggleModal}>モーダルを開く</Button>
			<Modal isOpen={isOpen} onClose={toggleModal} width={width}>
				<h1>モーダルウィンドウ!</h1>
			</Modal>
		</>
	)
}

Interactive.argTypes = {
	isOpen: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
	width: selectWithNone<BoxMaxMinWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'none'
	),
}
