import { EditableText } from './editable-text'

export default {
	component: EditableText,
	title: 'Editable Text',
}

export function Interactive() {
	return <EditableText value='素晴らしいタスクリスト' />
}
