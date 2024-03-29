import { forwardRef } from 'react'
import { BaseField, FieldComponentProps } from '../base-field'
import { Box } from '../box'
import styles from './select-field.module.less'

type SelectFieldProps = FieldComponentProps<HTMLSelectElement>

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
	(
		{
			id,
			label,
			secondaryLabel,
			auxiliaryLabel,
			hint,
			message,
			tone,
			maxWidth,
			children,
			hidden,
			'aria-describedby': ariaDescribedBy,
			name,
			...props
		},
		ref
	) => {
		return (
			<BaseField
				id={id}
				label={label}
				secondaryLabel={secondaryLabel}
				auxiliaryLabel={auxiliaryLabel}
				hint={hint}
				message={message}
				tone={tone}
				maxWidth={maxWidth}
				hidden={hidden}
				aria-describedby={ariaDescribedBy}
				name={name}
			>
				{extraProps => (
					<Box
						className={[
							styles['selectWrapper'],
							tone === 'error' ? styles['error'] : null,
						]}
					>
						<select
							name={name}
							{...props}
							{...extraProps}
							ref={ref}
						>
							{children}
						</select>
						<SelectChevron aria-hidden />
					</Box>
				)}
			</BaseField>
		)
	}
)

function SelectChevron(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg width='16' height='16' fill='none' {...props}>
			<path
				d='M11.646 5.646a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L8 9.293l3.646-3.647z'
				fill='currentColor'
			/>
		</svg>
	)
}

export default SelectField
