import { ReactNode } from 'react'

import { Box } from '../box'
import { Loader } from '../loader'
import { polymorphicComponent } from '../polymorphic'
import styles from './button.module.less'

const preventDefault = (event: React.SyntheticEvent) => {
	event.preventDefault()
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonTone = 'normal' | 'destructive'
type ButtonSize = 'small' | 'normal' | 'large'

type CommonButtonProps = {
	variant: ButtonVariant
	tone?: ButtonTone
	size?: ButtonSize
	disabled?: boolean
	loading?: boolean
}

/* eslint-disable-next-line */
export type ButtonProps = {
	children: NonNullable<ReactNode>
} & CommonButtonProps

const Button = polymorphicComponent<'button', ButtonProps>(
	(
		{
			children,
			variant = 'primary',
			tone = 'normal',
			size = 'normal',
			disabled = false,
			loading = false,
			onClick,
			...props
		},
		ref
	) => {
		const isDisabled = loading || disabled

		return (
			<Box
				{...props}
				as='button'
				aria-disabled={isDisabled}
				onClick={isDisabled ? preventDefault : onClick}
				className={[
					styles['baseButton'],
					styles[`variant-${variant}`],
					styles[`tone-${tone}`],
					styles[`size-${size}`],
					disabled ? styles['disabled'] : null,
				]}
				ref={ref}
			>
				{children ? (
					<span className={styles['label']}>{children}</span>
				) : null}
				{loading && (
					<Box
						display='flex'
						className={styles['endIcon']}
						aria-hidden
					>
						<Loader />
					</Box>
				)}
			</Box>
		)
	}
)

export default Button
