import { Inline, Box, Text } from '@bootcamp-nx/core-ui'
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
	onClick: (id: number) => void
}

export default function Task({ done, id, text, onClick }: TaskProps) {
	return (
		<Inline space='small' style={{ whiteSpace: 'nowrap' }}>
			<Box
				as='button'
				className={[
					styles['toggle'],
					done ? styles['toggle__done'] : null,
				]}
				onClick={() => onClick(id)}
				aria-label={'Complete '.concat(text)}
				aria-checked={done ? 'true' : 'false'}
				role='checkbox'
			>
				<CheckboxIcon />
			</Box>
			<Text>{text}</Text>
		</Inline>
	)
}
