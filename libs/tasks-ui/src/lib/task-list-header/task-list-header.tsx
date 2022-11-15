import {
	Stack,
	Inline,
	EditableText,
	Button,
	Icon,
	Text,
} from '@bootcamp-nx/core-ui'
import { PropsWithChildren } from 'react'

const ListStatus = ({ children }: PropsWithChildren) => {
	if (!children) return null

	return (
		<Text size='caption' tone='secondary' weight='bold'>
			{children} タスク完了
		</Text>
	)
}

interface TaskListHeaderProps {
	completed?: string
	onTitleChange?: (newTitle: string) => void
	children: string
}

export function TaskListHeader({
	completed,
	onTitleChange,
	children,
}: TaskListHeaderProps) {
	const title = children.slice()

	return (
		<Stack>
			<ListStatus>{completed}</ListStatus>
			<Inline width='full' alignY='center'>
				<EditableText
					size='subtitle'
					weight='bold'
					onChange={onTitleChange}
				>
					{title}
				</EditableText>

				<Button
					size='small'
					variant='quaternary'
					icon={<Icon size='small'>more_horiz</Icon>}
				/>
			</Inline>
		</Stack>
	)
}

export default TaskListHeader
