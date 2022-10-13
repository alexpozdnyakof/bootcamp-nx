import { forwardRef, useState } from 'react'
import { Box } from '../box'
import { Text } from '../text'
import styles from './checkbox.module.less'

type IconProps = React.SVGProps<SVGSVGElement> & {
	checked?: boolean
	disabled?: boolean
}

const CheckboxIcon = ({ checked, disabled, ...props }: IconProps) => {
	const getPath = () => {
		const svgPath = {
			checked:
				'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm-2.457 4.293l-5.293 5.293-1.793-1.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z',
			unchecked:
				'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm0 1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z',
			filled: 'M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z',
		} as const
		if (checked) return svgPath.checked
		if (disabled) return svgPath.filled
		return svgPath.unchecked
	}

	const path = getPath()

	return (
		<svg width='24px' height='24px' viewBox='0 0 24 24' {...props}>
			<path fill='currentColor' fillRule='nonzero' d={path} />
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
				<CheckboxIcon
					checked={isChecked}
					disabled={disabled}
					aria-hidden
				/>
				{label ? <Text>{label}</Text> : null}
			</Box>
		)
	}
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
