import { ComponentProps, useState } from 'react'
import { BoxMaxMinWidth } from '../box/box'
import { Button } from '../button'
import { selectWithNone } from '../storybook-helpers'
import { Modal } from './modal'

export default {
	component: Modal,
	title: 'Modal',
}

export function Interactive({ width }: ComponentProps<typeof Modal>) {
	const [isOpen, setOpen] = useState<boolean>(false)
	const toggleModal = () => setOpen(o => !o)
	return (
		<>
			<div id='__anotherRoot__'></div>
			<Button onClick={toggleModal}>モーダルを開く</Button>
			{isOpen && (
				<Modal onClose={toggleModal} width={width}>
					<h1>モーダルウィンドウ!</h1>
				</Modal>
			)}
		</>
	)
}

Interactive.argTypes = {
	width: selectWithNone<BoxMaxMinWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'none'
	),
}
