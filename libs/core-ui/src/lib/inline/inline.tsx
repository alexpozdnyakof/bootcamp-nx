import { Box, ReusableBoxProps } from '../box'
import { Space } from '../common-types'
import { polymorphicComponent } from '../polymorphic'
import {
	getClassNames,
	mapResponsiveProp,
	ResponsiveProp,
} from '../responsive-props'
import styles from './inline.module.less'
export type InlineAlign = 'left' | 'center' | 'right'

/* eslint-disable-next-line */
export type InlineProps = {
	space?: ResponsiveProp<Space>
	align?: ResponsiveProp<InlineAlign>
	alignY?: ResponsiveProp<'top' | 'center' | 'bottom'>
} & ReusableBoxProps

const Inline = polymorphicComponent<'div', InlineProps>(
	(
		{ as, space, align = 'left', alignY = 'center', children, ...props },
		ref
	) => {
		return (
			<Box
				{...props}
				ref={ref}
				as={as}
				display='flex'
				flexWrap='wrap'
				className={[getClassNames(styles, 'space', space)]}
				alignItems={mapResponsiveProp(alignY, alignY =>
					alignY === 'top'
						? 'flexStart'
						: alignY === 'bottom'
						? 'flexEnd'
						: 'center'
				)}
				justifyContent={mapResponsiveProp(align, align =>
					align === 'left'
						? 'flexStart'
						: align === 'right'
						? 'flexEnd'
						: 'center'
				)}
			>
				{children}
			</Box>
		)
	}
)

export default Inline
