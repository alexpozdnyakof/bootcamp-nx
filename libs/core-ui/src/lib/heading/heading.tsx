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

/* eslint-disable-next-line */
export type HeadingProps = {
	children: React.ReactNode
	/**
	 * The semantic level of the heading.
	 */
	level: HeadingLevel
	/**
	 * The weight of the heading. Used to de-emphasize the heading visually when using 'light'.
	 *
	 * @default 'regular'
	 */
	weight?: 'regular' | 'light'
	/**
	 * Shifts the default heading visual text size up or down, depending on the original size
	 * imposed by the `level`. The heading continues to be semantically at the given level.
	 *
	 * By default, no value is applied, and the default size from the level is applied. The values
	 * have the following effect:
	 *
	 * - 'smaller' shifts the default level size down in the font-size scale (it tends to make the
	 * level look visually as if it were of the immediately lower level).
	 * - 'larger' has the opposite effect than 'smaller' shifting the visual font size up in the
	 * scale.
	 * - 'largest' can be thought of as applying 'larger' twice.
	 *
	 * @see level
	 * @default undefined
	 */
	size?: 'smaller' | 'larger' | 'largest'
	/**
	 * The tone (semantic color) of the heading.
	 *
	 * @default 'normal'
	 */
	tone?: Tone
	/**
	 * Used to truncate the heading to a given number of lines.
	 *
	 * It will add an ellipsis (`…`) to the text at the end of the last line, only if the text was
	 * truncated. If the text fits without it being truncated, no ellipsis is added.
	 *
	 * By default, the text is not truncated at all, no matter how many lines it takes to render it.
	 *
	 * @default undefined
	 */
	lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
	/**
	 * How to align the heading text horizontally.
	 *
	 * @default 'start'
	 */
	align?: BoxProps['textAlign']
} & OriginalHeadingSupportedProps

/**
 * Умеет в размеры, семантику, начертание, тон и обрезку текста
 */

export function Heading(
	{
		level,
		weight,
		tone,
		lineClamp,
		children,
		size,
		align,
		...props
	}: HeadingProps,
	ref: ForwardedRef<HTMLHeadingElement>
) {
	const headingElementName = `h${level}` as HeadingElement
	const lineClampMultipleLines =
		typeof lineClamp === 'string'
			? parseInt(lineClamp, 10) > 1
			: (lineClamp || 0) > 1

	return (
		<Box
			{...props}
			className={[
				styles['heading'],
				getClassNames(styles, 'size', size),
				tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
				weight !== 'regular'
					? getClassNames(styles, 'weight', weight)
					: null,
				lineClamp
					? getClassNames(styles, 'lineClamp', lineClamp.toString())
					: null,
				lineClampMultipleLines
					? styles['lineClampMultipleLines']
					: null,
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
