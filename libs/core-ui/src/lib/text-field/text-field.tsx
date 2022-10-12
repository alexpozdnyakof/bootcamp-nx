import { forwardRef } from 'react'
import BaseField, {
	FieldComponentProps,
	FieldVariantProps,
} from '../base-field/base-field'
import { Box } from '../box'
import styles from './text-field.module.less'

type FieldType = 'email' | 'search' | 'tel' | 'text' | 'url'

export type TextFieldProps = { type?: FieldType } & Omit<
	FieldComponentProps<HTMLInputElement>,
	'type'
> &
	FieldVariantProps

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
			message,
			tone,
			variant = 'default',
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
				variant={variant}
				tone={tone}
				message={message}
			>
				{extra => (
					<Box
						className={[
							styles['inputWrapper'],
							tone === 'error' ? styles['error'] : null,
							variant === 'bordered' ? styles['bordered'] : null,
						]}
					>
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
