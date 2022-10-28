import { Box } from '../box'
import { Tone } from '../common-types'
import { polymorphicComponent } from '../polymorphic'
import styles from './icon.module.less'

type IconProps = {
	children: string
	/**
	 * icon optical size
	 * @default 'medium'
	 */
	size?: 'small' | 'medium' | 'large'
	tone?: Tone
}

const Icon = polymorphicComponent<'span', IconProps>(
	(
		{
			as = 'span',
			children,
			size: sizeModifier = 'medium',
			tone = 'normal',
			...props
		},
		ref
	) => {
		return (
			<Box
				{...props}
				as={as}
				className={[
					'material-symbols-outlined',
					styles['size-'.concat(sizeModifier)],
					styles['tone-'.concat(tone)],
				]}
				ref={ref}
			>
				{children}
			</Box>
		)
	}
)

export default Icon
