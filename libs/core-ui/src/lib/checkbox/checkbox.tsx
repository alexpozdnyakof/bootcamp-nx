import { forwardRef, useState } from 'react'
import { Box } from '../box'
import { Text } from '../text'
import styles from './checkbox.module.less'

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
				{label ? <Text>{label}</Text> : null}
			</Box>
		)
	}
)

export default Checkbox
