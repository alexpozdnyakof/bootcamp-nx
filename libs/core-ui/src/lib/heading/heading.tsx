import { ForwardedRef, forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { Tone } from '../common-types'
import { getClassNames } from '../responsive-props'
import styles from './heading.module.less'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
type HeadingElement = `h${1 | 2 | 3 | 4 | 5 | 6}`

type OriginalHeadingSupportedProps = Omit<
	JSX.IntrinsicElements[HeadingElement],
	'className' | 'children'
>

export type HeadingProps = {
	children: React.ReactNode
	level: HeadingLevel
	size?: 'smaller' | 'larger' | 'largest'
	tone?: Tone
	align?: BoxProps['textAlign']
} & OriginalHeadingSupportedProps

/**
 * Умеет в размеры, семантику, начертание, тон и обрезку текста
 */

export function Heading(
	{ level, tone, children, size, align, ...props }: HeadingProps,
	ref: ForwardedRef<HTMLHeadingElement>
) {
	const headingElementName = `h${level}` as HeadingElement
	return (
		<Box
			{...props}
			className={[
				styles['heading'],
				getClassNames(styles, 'size', size),
				tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
			]}
			as={headingElementName}
			ref={ref}
			textAlign={align}
		>
			{children}
		</Box>
	)
}

export default forwardRef<HTMLHeadingElement, HeadingProps>(Heading)
