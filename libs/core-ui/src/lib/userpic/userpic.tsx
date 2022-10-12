import { Box } from '../box'
import { getClassNames, ResponsiveProp } from '../responsive-props'
import styles from './userpic.module.less'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const USERPIC_COLORS = [
	'#fcc652',
	'#e9952c',
	'#e16b2d',
	'#d84b40',
	'#e8435a',
	'#e5198a',
	'#ad3889',
	'#86389c',
	'#a8a8a8',
	'#98be2f',
	'#5d9d50',
	'#5f9f85',
	'#5bbcb6',
	'#32a3bf',
	'#2bafeb',
	'#2d88c3',
	'#3863cc',
	'#5e5e5e',
]

type UserpicSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

export type UserpicProps = {
	size?: ResponsiveProp<UserpicSize>
	userpicUrl?: string
	user?: { name?: string; email: string }
}

export function Userpic({ size = 'l', ...props }: UserpicProps) {
	const sizeClassName = getClassNames(styles, 'size', size)
	return <Box className={[styles['avatar'], sizeClassName]} {...props}></Box>
}

export default Userpic
