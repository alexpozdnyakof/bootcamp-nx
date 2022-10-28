import { ReactElement } from 'react'
import { ReusableBoxProps } from '../box'
import { polymorphicComponent } from '../polymorphic'
import { Stack } from '../stack'

type ListProps = {
	children: ReactElement | Array<ReactElement>
} & ReusableBoxProps

const List = polymorphicComponent<'div', ListProps>(
	({ children, ...props }, ref) => {
		return (
			<Stack ref={ref} {...props}>
				{children}
			</Stack>
		)
	}
)

export default List
