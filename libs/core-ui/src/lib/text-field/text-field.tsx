import { forwardRef } from 'react'
import BaseField, { FieldComponentProps } from '../base-field/base-field'
import { Box } from '../box'
import styles from './text-field.module.less'

type FieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

export type TextFieldProps = { type?: FieldType } & Omit<
	FieldComponentProps<HTMLInputElement>,
	'type'
>

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(
		{
			id,
			label,
			secondaryLabel,
			auxiliaryLabel,
			hint,
			type = 'text',
			maxWidth,
			hidden,
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
				maxWidth={maxWidth}
				hidden={hidden}
			>
				{extra => (
					<Box className={styles['inputWrapper']}>
						<input
							{...props}
							{...extra}
							type={type}
							ref={ref}
						></input>
					</Box>
				)}
			</BaseField>
		)
	}
)

export default TextField
