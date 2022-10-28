import { Box } from '../box'
import { polymorphicComponent } from '../polymorphic'
import styles from './icon.module.less'

type IconProps = {
	children: string
	/**
	 * icon optical size
	 * @default 'medium'
	 */
	size?: 'small' | 'medium' | 'large'
}

const Icon = polymorphicComponent<'span', IconProps>(
	({ children, size: sizeModifier = 'medium', ...props }, ref) => {
		return (
			<Box
				{...props}
				as='span'
				className={[
					'material-symbols-outlined',
					styles['Icon_'.concat(sizeModifier)],
				]}
				ref={ref}
			>
				{children}
			</Box>
		)
	}
)

export default Icon
