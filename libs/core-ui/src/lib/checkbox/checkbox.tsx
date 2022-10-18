import { forwardRef, useState } from 'react'
import { Box } from '../box'
import { Text } from '../text'
import styles from './checkbox.module.less'

function CheckboxIcon(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={styles['checkbox_icon']}
			{...props}
		>
			<g fill='#fff' fillRule='evenodd'>
				<path d='M10.346 3.301a.929.929 0 0 1 1.37 0 1.076 1.076 0 0 1 0 1.456l-4.64 4.94a.929.929 0 0 1-1.37 0L3.284 7.123a1.076 1.076 0 0 1 0-1.456.929.929 0 0 1 1.37 0L6.39 7.513l3.955-4.212z' />
			</g>
		</svg>
	)
}

CheckboxIcon.displayName = 'CheckboxIcon'

type CheckboxProps = Omit<
	JSX.IntrinsicElements['input'],
	'type' | 'className' | 'disabled'
> & {
	disabled?: boolean
	label?: React.ReactNode
}
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, disabled, defaultChecked, onChange, ...props }, ref) => {
		const [checkedState, setChecked] = useState(
			props.checked ?? defaultChecked ?? false
		)
		const isChecked = props.checked ?? checkedState

		return (
			<Box
				as='label'
				display='flex'
				alignItems='center'
				className={[
					styles['container'],
					disabled ? styles['disabled'] : null,
					isChecked ? styles['checked'] : null,
				]}
			>
				<input
					{...props}
					ref={ref}
					type='checkbox'
					checked={isChecked}
					disabled={disabled}
					onChange={event => {
						onChange?.(event)
						if (!event.defaultPrevented) {
							setChecked(event.currentTarget.checked)
						}
					}}
					onBlur={event => {
						props?.onBlur?.(event)
					}}
					onKeyUp={event => {
						props?.onKeyUp?.(event)
					}}
				/>
				<Box
					className={[
						styles['checkbox'],
						isChecked ? styles['checkbox__checked'] : null,
					]}
					aria-hidden
				>
					<CheckboxIcon />
				</Box>
				{label ? <Text>{label}</Text> : null}
			</Box>
		)
	}
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
