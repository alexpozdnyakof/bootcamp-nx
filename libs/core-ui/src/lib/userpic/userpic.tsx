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
		'#363457',
		'#735290',
		'#F6511D',
		'#FFB400',
		'#00A6ED',
		'#0D2C54',
		'#391463',
		'#FA7921',
		'#A27035',
		'#1C448E',
		'#6F8695',
		'#FFE381',
		'#A6D9F7',
		'#480355',
		'#982649',
		'#3A0842',
		'#FF1654',
		'#2F4B26',
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
			className={[styles['userpic'], sizeClassName]}
			{...props}
			style={backgroundStyle}
		>
			{initials}
		</Box>
	)
}

export default Userpic
