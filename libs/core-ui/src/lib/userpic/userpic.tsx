import { Box } from '../box'
import { getClassNames, ResponsiveProp } from '../responsive-props'
import styles from './userpic.module.less'

type UserpicSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

const getInitials = (aName?: string) => {
	if (!aName) return ''

	const words = aName.trim().split(' ')
	const [firstInitial, lastInital] = [words[0][0], words[words.length - 1][0]]

	const result =
		firstInitial === lastInital
			? [firstInitial]
			: [firstInitial, lastInital]

	return result.join('').toUpperCase()
}

const emailToColor = (email: string): string => {
	const colors = [
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

	if (!email.includes('@')) return colors[0]

	const seed = email.split('@')[0]

	const hash = seed
		? seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0
		: 0

	return colors[hash % colors.length]
}

export type UserpicProps = {
	size?: ResponsiveProp<UserpicSize>
	imageUrl?: string
	user: { name?: string; email: string }
}

export function Userpic({
	size = 'l',
	user,
	imageUrl,
	...props
}: UserpicProps) {
	const sizeClassName = getClassNames(styles, 'size', size)
	const initials = getInitials(user.name) || getInitials(user.email)
	const backgroundStyle = imageUrl
		? {
				backgroundImage: `url(${imageUrl})`,
				textIndent: '-999px',
		  }
		: {
				backgroundColor: emailToColor(user.email),
		  }

	return (
		<Box
			className={[styles['avatar'], sizeClassName]}
			{...props}
			style={backgroundStyle}
		>
			{initials}
		</Box>
	)
}

export default Userpic
