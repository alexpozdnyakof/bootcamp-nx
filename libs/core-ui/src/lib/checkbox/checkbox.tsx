import { forwardRef } from 'react'
import styles from './checkbox.module.less'

type CheckboxProps = Omit<
	JSX.IntrinsicElements['input'],
	| 'type'
	| 'className'
	| 'disabled'
	| 'aria-controls'
	| 'aria-describedby'
	| 'aria-label'
	| 'aria-labelledby'
> & {
	'aria-checked'?: never
	/** Identifies the set of checkboxes controlled by the mixed checkbox for assistive technologies. */
	'aria-controls'?: string
	/** Identifies the element (or elements) that describes the checkbox for assistive technologies. */
	'aria-describedby'?: string
	/** Defines a string value that labels the current checkbox for assistive technologies. */
	'aria-label'?: string
	/** Identifies the element (or elements) that labels the current checkbox for assistive technologies. */
	'aria-labelledby'?: string
	disabled?: boolean
	label?: React.ReactNode
	indeterminate?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props: CheckboxProps) => {
		return (
			<div className={styles['container']}>
				<h1>Welcome to Checkbox!</h1>
			</div>
		)
	}
)

export default Checkbox
