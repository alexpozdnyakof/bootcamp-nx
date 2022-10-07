import { ForwardedRef, ReactNode } from 'react'
import { Box, BoxProps } from '../box'
import { Tone } from '../common-types'
import { polymorphicComponent } from '../polymorphic'
import { getClassNames } from '../responsive-props'
import styles from './text.module.less'

/* eslint-disable-next-line */
export interface TextProps {
	children: ReactNode
	/**
	 * @default 'body'
	 */
	size?: 'caption' | 'copy' | 'body' | 'subtitle'
	/**
	 * @default 'regular'
	 */
	weight?: 'regular' | 'semibold' | 'bold'
	/**
	 * @default undefined
	 */
	tone?: Tone
	/**
	 * @default undefined
	 */
	lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'
	/**
	 * @default 'start'
	 */
	align?: BoxProps['textAlign']
}

const Text = polymorphicComponent<'div', TextProps>(
	(
		{
			as,
			children,
			size = 'body',
			weight = 'regular',
			tone = 'normal',
			align,
			lineClamp,
			...props
		},
		ref
	) => {
		const lineClampMultipleLines =
			typeof lineClamp === 'string'
				? Number(lineClamp) > 1
				: (lineClamp ?? 1) > 1

		return (
			<Box
				{...props}
				as={as}
				className={[
					styles['text'],
					size !== 'body'
						? getClassNames(styles, 'size', size)
						: null,
					weight !== 'regular'
						? getClassNames(styles, 'weight', weight)
						: null,
					tone !== 'normal'
						? getClassNames(styles, 'tone', tone)
						: null,
					lineClampMultipleLines
						? styles['lineClampMultipleLines']
						: null,
					lineClamp
						? getClassNames(
								styles,
								'lineClamp',
								lineClamp.toString()
						  )
						: null,
				]}
				textAlign={align}
				ref={ref}
			>
				{children}
			</Box>
		)
	}
)

Text.displayName = 'Text'

export default Text
