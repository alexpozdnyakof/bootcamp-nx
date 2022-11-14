import { ComponentProps } from 'react'
import { select } from '../storybook-helpers'
import { EditableText } from './editable-text'

export default {
	component: EditableText,
	title: 'Editable Text',
}

export function Interactive(props: ComponentProps<typeof EditableText>) {
	return <EditableText {...props} />
}

Interactive.argTypes = {
	size: {
		control: select(['body', 'subtitle'], 'body'),
	},
	children: {
		control: { type: 'text' },
		defaultValue: '素晴らしいタスクリスト',
	},
}
