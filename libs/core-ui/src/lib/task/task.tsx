import { Box } from '../box'
import styles from './task.module.less'

function CheckboxIcon(props: JSX.IntrinsicElements['svg']) {
	return (
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
}

export type TaskProps = {
	done: boolean
	id: number
	text: string
	onClick: (event?: React.MouseEvent) => any
}

const Toggle = ({ done, onClick }: Pick<TaskProps, 'done' | 'onClick'>) => {
	return (
		<Box
			as='button'
			className={[
				styles['toggle'],
				done ? styles['toggle_icon__done'] : null,
			]}
			borderRadius='standard'
		>
			<CheckboxIcon />
		</Box>
	)
}

export default function Task(props: TaskProps) {
	return <Toggle {...props} />
}
