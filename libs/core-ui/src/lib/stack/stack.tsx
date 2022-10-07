import { BoxProps, ReusableBoxProps } from '../box'
import { Box } from '../box'
import { Space } from '../common-types'
import { polymorphicComponent } from '../polymorphic'
import {
	getClassNames,
	mapResponsiveProp,
	ResponsiveProp,
} from '../responsive-props'
import styles from './stack.module.less'

type Align = 'start' | 'center' | 'end'

/* eslint-disable-next-line */
export type StackProps = {
	/** @default unedfined */
	space?: ResponsiveProp<Space>
	/** @default 'start' */
	align?: ResponsiveProp<Align>
} & ReusableBoxProps

const Stack = polymorphicComponent<'div', StackProps>(
	({ as, space, align = 'start', children, ...props }, ref) => {
		const alignProps: Partial<BoxProps> | undefined =
			align === 'start'
				? undefined
				: {
						width: 'full',
						flexDirection: 'column',
						display: 'flex',
						alignItems: mapResponsiveProp(align, align =>
							align === 'start'
								? 'flexStart'
								: align === 'end'
								? 'flexEnd'
								: 'center'
						),
				  }

		return (
			<Box
				{...props}
				{...alignProps}
				className={[getClassNames(styles, 'space', space)]}
				as={as}
				ref={ref}
			>
				{children}
			</Box>
		)
	}
)

Stack.displayName = 'Stack'

export default Stack
