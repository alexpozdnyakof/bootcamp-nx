import classNames from 'classnames'
import { createElement } from 'react'
import { polymorphicComponent } from '../polymorphic'
import { getClassNames, ResponsiveProp } from '../responsive-props'
import styles from './box.module.less'
import paddingStyles from './padding.module.less'
import marginStyles from './margin.module.less'
import widthStyles from './width.module.less'
import { Space, SpaceWithNegatives } from '../common-types'

type ClassName = Parameters<typeof classNames>[number]

export type DividerWeight = 'primary' | 'secondary' | 'tertiary' | 'none'

export interface BoxPaddingProps {
	padding?: ResponsiveProp<Space>
	paddingX?: ResponsiveProp<Space>
	paddingY?: ResponsiveProp<Space>
	paddingTop?: ResponsiveProp<Space>
	paddingRight?: ResponsiveProp<Space>
	paddingBottom?: ResponsiveProp<Space>
	paddingLeft?: ResponsiveProp<Space>
}

export interface BoxMarginProps {
	margin?: ResponsiveProp<SpaceWithNegatives>
	marginX?: ResponsiveProp<SpaceWithNegatives>
	marginY?: ResponsiveProp<SpaceWithNegatives>
	marginTop?: ResponsiveProp<SpaceWithNegatives>
	marginRight?: ResponsiveProp<SpaceWithNegatives>
	marginBottom?: ResponsiveProp<SpaceWithNegatives>
	marginLeft?: ResponsiveProp<SpaceWithNegatives>
}

export type BoxDisplay =
	| 'block'
	| 'flex'
	| 'inline'
	| 'inlineBlock'
	| 'inlineFlex'
	| 'none'
export type BoxFlexDirection = 'column' | 'row'
export type BoxFlexWrap = 'nowrap' | 'wrap'
export type BoxAlignItems = 'center' | 'flexEnd' | 'flexStart' | 'baseline'
export type BoxJustifyContent =
	| 'center'
	| 'flexEnd'
	| 'flexStart'
	| 'spaceAround'
	| 'spaceBetween'
	| 'spaceEvenly'
type BoxOverflow = 'hidden' | 'auto' | 'visible' | 'scroll'

type BoxMaxMinWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type BoxMinWidth = 0 | BoxMaxMinWidth
export type BoxMaxWidth = BoxMaxMinWidth | 'full'
type BoxWidth =
	| 0
	| BoxMaxMinWidth
	| 'full'
	| 'auto'
	| 'maxContent'
	| 'minContent'
	| 'fitContent'

interface BorderProps {
	borderRadius?: 'standard' | 'none' | 'full'
	border?: DividerWeight
}

export interface ReusableBoxProps extends BorderProps, BoxPaddingProps {
	minWidth?: BoxMinWidth
	maxWidth?: BoxMaxWidth
	width?: BoxWidth
	background?: 'action' | 'default' | 'aside' | 'highlight' | 'selected'
	flexGrow?: 0 | 1
	flexShrink?: 0
}

type BoxPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
export type BoxTextAlign = 'start' | 'center' | 'end' | 'justify'

export interface BoxProps extends ReusableBoxProps, BoxMarginProps {
	position?: ResponsiveProp<BoxPosition>
	display?: ResponsiveProp<BoxDisplay>
	flexDirection?: ResponsiveProp<BoxFlexDirection>
	flexWrap?: BoxFlexWrap
	alignItems?: ResponsiveProp<BoxAlignItems>
	justifyContent?: ResponsiveProp<BoxJustifyContent>
	overflow?: BoxOverflow
	height?: 'full'
	textAlign?: ResponsiveProp<BoxTextAlign>
	className: ClassName
}

const Box = polymorphicComponent<'div', BoxProps>(function Box(
	{
		children,
		as: component = 'div',
		className,
		position = 'static',
		display,
		flexDirection = 'row',
		flexWrap,
		flexGrow,
		flexShrink,
		alignItems,
		justifyContent,
		overflow,
		width,
		height,
		background,
		border,
		borderRadius,
		minWidth,
		maxWidth,
		textAlign,
		padding,
		paddingY,
		paddingX,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		margin,
		marginY,
		marginX,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		...props
	},
	ref
) {
	const resolvedPaddingTop = resolve(paddingTop, paddingY, padding)
	const resolvedPaddingRight = resolve(paddingRight, paddingX, padding)
	const resolvedPaddingBottom = resolve(paddingBottom, paddingY, padding)
	const resolvedPaddingLeft = resolve(paddingLeft, paddingX, padding)

	const resolvedMarginTop = resolve(marginTop, marginY, margin)
	const resolvedMarginRight = resolve(marginRight, marginX, margin)
	const resolvedMarginBottom = resolve(marginBottom, marginY, margin)
	const resolvedMarginLeft = resolve(marginLeft, marginX, margin)

	const omitFlex =
		!display ||
		(typeof display === 'string' &&
			display !== 'flex' &&
			display !== 'inlineFlex')

	return createElement(
		component,
		{
			...props,
			className:
				classNames(
					className,
					styles['Box'],
					display ? getClassNames(styles, 'display', display) : null,
					position !== 'static'
						? getClassNames(styles, 'position', position)
						: null,
					minWidth != null
						? getClassNames(
								widthStyles,
								'minWidth',
								String(minWidth)
						  )
						: null,
					getClassNames(widthStyles, 'maxWidth', maxWidth),
					getClassNames(styles, 'textAlign', textAlign),
					// padding
					getClassNames(
						paddingStyles,
						'paddingTop',
						resolvedPaddingTop
					),
					getClassNames(
						paddingStyles,
						'paddingRight',
						resolvedPaddingRight
					),
					getClassNames(
						paddingStyles,
						'paddingBottom',
						resolvedPaddingBottom
					),
					getClassNames(
						paddingStyles,
						'paddingLeft',
						resolvedPaddingLeft
					),
					// margin
					getClassNames(marginStyles, 'marginTop', resolvedMarginTop),
					getClassNames(
						marginStyles,
						'marginRight',
						resolvedMarginRight
					),
					getClassNames(
						marginStyles,
						'marginBottom',
						resolvedMarginBottom
					),
					getClassNames(
						marginStyles,
						'marginLeft',
						resolvedMarginLeft
					),

					// flex props
					omitFlex
						? null
						: getClassNames(styles, 'flexDirection', flexDirection),
					omitFlex
						? null
						: getClassNames(styles, 'flexWrap', flexWrap),
					omitFlex
						? null
						: getClassNames(styles, 'alignItems', alignItems),
					omitFlex
						? null
						: getClassNames(
								styles,
								'justifyContent',
								justifyContent
						  ),
					flexShrink != null
						? getClassNames(
								styles,
								'flexShrink',
								String(flexShrink)
						  )
						: null,
					flexGrow != null
						? getClassNames(styles, 'flexGrow', String(flexGrow))
						: null,
					getClassNames(styles, 'overflow', overflow),
					width != null
						? getClassNames(widthStyles, 'width', String(width))
						: null,
					getClassNames(styles, 'height', height),
					getClassNames(styles, 'bg', background),
					borderRadius !== 'none'
						? getClassNames(styles, 'borderRadius', borderRadius)
						: null,
					border !== 'none'
						? getClassNames(styles, 'border', border)
						: null
				) || undefined,
			ref,
		},
		children
	)
})

export default Box

const resolve = <
	T extends ResponsiveProp<Space> | ResponsiveProp<SpaceWithNegatives>
>(
	x?: T | undefined,
	y?: T | undefined,
	z?: T | undefined
): T => x ?? y ?? (z as T)
