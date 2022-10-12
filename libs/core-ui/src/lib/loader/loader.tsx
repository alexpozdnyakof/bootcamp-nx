import { Box } from '../box'
import { Spinner } from '../spinner'

type SpinnerSize = 'small' | 'medium' | 'large'

export type LoaderProps = {
	/**
	 * @default 'small'
	 */
	size?: SpinnerSize
	'aria-describedby'?: string
} & Omit<
	JSX.IntrinsicElements['div'],
	| 'className'
	| 'aria-describedby'
	| 'aria-label'
	| 'aria-labelledby'
	| 'role'
	| 'size'
> &
	(
		| {
				/** Defines a string value that labels the current loading component for assistive technologies. */
				'aria-label': string
				'aria-labelledby'?: never
		  }
		| {
				/** Identifies the element (or elements) that labels the current loading component for assistive technologies. */
				'aria-labelledby': string
				'aria-label'?: never
		  }
	)

const sizeMapping: Record<SpinnerSize, number> = {
	small: 24,
	medium: 36,
	large: 48,
}

function Loader({ size = 'small', ...props }: Partial<LoaderProps>) {
	const numericSize = sizeMapping[size] ?? sizeMapping.small
	const ariaLabel = props['aria-label']
		? props['aria-label']
		: !props['aria-labelledby']
		? 'Loading…'
		: undefined

	return (
		<Box
			{...props}
			aria-label={ariaLabel}
			display='flex'
			alignItems='center'
			justifyContent='center'
			role='progressbar'
		>
			<Spinner size={numericSize} />
		</Box>
	)
}

export default Loader
