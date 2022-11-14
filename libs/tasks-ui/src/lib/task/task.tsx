import { Inline, SwitchComplete, EditableText } from '@bootcamp-nx/core-ui'

export type TaskProps = {
	done: boolean
	id: number
	text: string
	onClick: () => void
	onChange?: (newText: string) => void
}

export default function Task({ done, id, text, onClick, onChange }: TaskProps) {
	return (
		<Inline space='xsmall'>
			<SwitchComplete
				done={done}
				aria-label={'Complete '.concat(text)}
				onClick={onClick}
			/>
			<EditableText
				onChange={newText => onChange?.(newText)}
				aria-label={`Edit ${text}`}
			>
				{text}
			</EditableText>
		</Inline>
	)
}
