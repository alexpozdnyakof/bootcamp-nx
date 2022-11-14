import { Inline, Box, EditableText } from '@bootcamp-nx/core-ui'
import { SwitchComplete } from '../switch-complete'
import styles from './task.module.less'

const CheckboxIcon = (props: JSX.IntrinsicElements['svg']) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className={styles['toggle_icon']}
		{...props}
	>
		<g fill='#fff' fillRule='evenodd'>
			<path d='M10.346 3.301a.929.929 0 0 1 1.37 0 1.076 1.076 0 0 1 0 1.456l-4.64 4.94a.929.929 0 0 1-1.37 0L3.284 7.123a1.076 1.076 0 0 1 0-1.456.929.929 0 0 1 1.37 0L6.39 7.513l3.955-4.212z' />
		</g>
	</svg>
)

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
