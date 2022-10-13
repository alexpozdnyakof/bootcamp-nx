import { forwardRef, useState } from 'react'
import BaseField, { FieldVariantProps } from '../base-field/base-field'
import { useUniqueId } from '../common-helpers'
import { TextFieldProps } from '../text-field/text-field'
import styles from './password-field.module.less'
import textFieldStyles from '../text-field/text-field.module.less'
import { Box } from '../box'

function PasswordVisibleIcon(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			{...props}
		>
			<g fill='none' fillRule='evenodd' stroke='gray'>
				<path d='M21.358 12C17.825 7.65 14.692 5.5 12 5.5c-2.624 0-5.67 2.043-9.097 6.181a.5.5 0 0 0 0 .638C6.331 16.457 9.376 18.5 12 18.5c2.692 0 5.825-2.15 9.358-6.5z' />
				<circle cx='12' cy='12' r='3.5' />
			</g>
		</svg>
	)
}

function PasswordHiddenIcon(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			{...props}
		>
			<g fill='gray' fillRule='evenodd' transform='translate(2 4)'>
				<path
					fillRule='nonzero'
					d='M13.047 2.888C11.962 2.294 10.944 2 10 2 7.56 2 4.63 3.966 1.288 8c1.133 1.368 2.218 2.497 3.253 3.394l-.708.708c-1.068-.93-2.173-2.085-3.315-3.464a1 1 0 0 1 0-1.276C4.031 3.121 7.192 1 10 1c1.196 0 2.456.385 3.78 1.154l-.733.734zm-6.02 10.263C8.084 13.72 9.076 14 10 14c2.443 0 5.373-1.969 8.712-6-1.11-1.34-2.176-2.453-3.193-3.341l.708-.709C17.437 5.013 18.695 6.363 20 8c-3.721 4.667-7.054 7-10 7-1.175 0-2.411-.371-3.709-1.113l.735-.736z'
				/>
				<path
					fillRule='nonzero'
					d='M8.478 11.7l.79-.79a3 3 0 0 0 3.642-3.642l.79-.79A4 4 0 0 1 8.477 11.7zM6.334 9.602a4 4 0 0 1 5.268-5.268l-.78.78A3.002 3.002 0 0 0 7.113 8.82l-.78.78z'
				/>
				<rect
					width='21'
					height='1'
					x='-.722'
					y='7.778'
					rx='.5'
					transform='rotate(-45 9.778 8.278)'
				/>
			</g>
		</svg>
	)
}

type PasswordFieldProps = Omit<TextFieldProps, 'type'> & FieldVariantProps

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
	(
		{
			variant = 'default',
			label,
			secondaryLabel,
			auxiliaryLabel,
			hint,
			message,
			tone,
			maxWidth,
			hidden,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref
	) => {
		const id = useUniqueId(props.id)
		const [isPasswordVisible, setPasswordVisible] = useState(false)

		const togglePasswordVisibility = () => {
			setPasswordVisible(v => !v)
		}
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
				maxWidth={maxWidth}
				hidden={hidden}
				aria-describedby={ariaDescribedBy}
			>
				{extraProps => (
					<Box
						display='flex'
						alignItems='center'
						className={[
							styles['inputWrapper'],
							textFieldStyles['inputWrapper'],
							tone === 'error' ? textFieldStyles['error'] : null,
							variant === 'bordered'
								? textFieldStyles['bordered']
								: null,
						]}
					>
						<input
							{...props}
							{...extraProps}
							ref={ref}
							type={isPasswordVisible ? 'text' : 'password'}
						/>
						<button
							type='button'
							onClick={togglePasswordVisibility}
							aria-label='Toggle password visibility'
							tabIndex={-1}
						>
							{isPasswordVisible ? (
								<PasswordVisibleIcon aria-hidden />
							) : (
								<PasswordHiddenIcon aria-hidden />
							)}
						</button>
					</Box>
				)}
			</BaseField>
		)
	}
)

export default PasswordField
