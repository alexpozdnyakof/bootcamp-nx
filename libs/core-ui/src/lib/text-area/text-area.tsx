import { forwardRef } from 'react'
import { FieldComponentProps } from '../base-field'
import BaseField, { FieldVariantProps } from '../base-field/base-field'
import { Box } from '../box'
import styles from './text-area.module.less'

type TextareaProps = FieldComponentProps<HTMLTextAreaElement> &
	FieldVariantProps & { rows?: number }

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			variant = 'default',
			id,
			label,
			secondaryLabel,
			auxiliaryLabel,
			hint,
			message,
			tone,
			maxWidth,
			hidden,
			name,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref
	) => {
		return (
			<BaseField
				variant={variant}
				id={id}
				label={label}
				secondaryLabel={secondaryLabel}
				auxiliaryLabel={auxiliaryLabel}
				hint={hint}
				message={message}
				tone={tone}
				hidden={hidden}
				aria-describedby={ariaDescribedBy}
				className={[
					styles['textAreaContainer'],
					tone === 'error' ? styles['error'] : null,
					variant === 'bordered' ? styles['bordered'] : null,
				]}
				maxWidth={maxWidth}
				name={name}
			>
				{extra => (
					<Box width='full' display='flex'>
						<textarea {...props} {...extra} name={name} ref={ref} />
					</Box>
				)}
			</BaseField>
		)
	}
)

export default TextArea
