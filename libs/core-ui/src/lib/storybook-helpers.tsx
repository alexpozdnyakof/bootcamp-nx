import { Box, BoxProps } from './box'
import { Space } from './common-types'

export function Wrapper({
	title,
	children,
	border = false,
}: {
	title?: React.ReactNode
	children: React.ReactNode
	border?: boolean
}) {
	return (
		<>
			{title ? title : null}
			<Box
				width='full'
				style={border ? { border: '1px dotted black' } : undefined}
			>
				{children}
			</Box>
		</>
	)
}

/**
 * Component for brekpoints presentation
 * @returns
 */
export function ResponsiveWidthRef() {
	return (
		<>
			<div style={{ height: '36px' }} />
			<div style={{ position: 'fixed', top: 0, left: 0 }}>
				<div
					style={{
						width: '992px',
						height: '20px',
						backgroundColor: 'hsl(0, 0%, 5%)',
					}}
				>
					desktop min width
				</div>
				<div
					style={{
						width: '768px',
						height: '20px',
						backgroundColor: 'hsl(0, 0%, 10%)',
					}}
				>
					tablet min width
				</div>
			</div>
		</>
	)
}

export function Placeholder({
	label,
	width = '100%',
	height = '30px',
}: { label?: React.ReactNode } & Pick<
	React.CSSProperties,
	'width' | 'height'
>) {
	return (
		<Box
			background='action'
			border='primary'
			style={{
				width,
				height,
			}}
			display='flex'
			alignItems='center'
			padding='medium'
		>
			{label}
		</Box>
	)
}

export type PartialProps<
	// Parent type of T is the same as React.ComponentProps<T>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = Partial<React.ComponentProps<T>>

export type SelectTypeOptionsProp<T> =
	| Extract<T, PropertyKey>[]
	| readonly Extract<T, PropertyKey>[]

export function select<T extends string | number>(
	options: SelectTypeOptionsProp<T>,
	defaultValue?: T
) {
	return {
		control: {
			type: 'select',
		},
		options,
		defaultValue,
	}
}

export function selectWithNone<T extends string | number>(
	options: SelectTypeOptionsProp<T>,
	defaultValue: T | 'none' = 'none'
) {
	return {
		control: {
			type: 'select',
		},
		options: ['none', ...options],
		defaultValue,
		mapping: {
			none: undefined,
		},
	}
}
export function reusableBoxProps(): Partial<
	Record<keyof BoxProps, ReturnType<typeof selectWithNone>>
> {
	return {
		maxWidth: selectWithNone([
			'xsmall',
			'small',
			'medium',
			'large',
			'xlarge',
			'full',
		]),
		width: selectWithNone([
			'auto',
			'maxContent',
			'minContent',
			'fitContent',
			'xsmall',
			'small',
			'medium',
			'large',
			'xlarge',
			'full',
		]),
		padding: selectSize(),
		paddingX: selectSize(),
		paddingY: selectSize(),
		paddingTop: selectSize(),
		paddingRight: selectSize(),
		paddingBottom: selectSize(),
		paddingLeft: selectSize(),
	}
}
export function selectSize(defaultValue: Space | 'none' = 'none') {
	return selectWithNone<Space>(
		['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
		defaultValue
	)
}

export function selectCount(label: string, defaultValue = 5) {
	return {
		control: {
			type: 'number',
			min: 1,
		},
		name: label,
		defaultValue,
	}
}

export function times(count: number): number[] {
	// eslint-disable-next-line prefer-spread
	return Array.apply(null, Array(count)).map((_x, i) => i)
}

export const disableResponsiveProps = Object.keys(reusableBoxProps()).reduce(
	(accumulator, key) => ({ ...accumulator, [key]: { control: false } }),
	{}
)
