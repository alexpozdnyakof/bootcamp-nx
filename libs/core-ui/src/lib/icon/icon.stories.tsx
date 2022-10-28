import { PartialProps } from '../storybook-helpers'
import Icon from './icon'

export default {
	component: Icon,
	title: 'Icon',
}

export function Overview({
	icon,
	size,
	tone,
}: { icon: string } & PartialProps<typeof Icon>) {
	return (
		<Icon size={size} tone={tone}>
			{icon}
		</Icon>
	)
}

Overview.argTypes = {
	icon: {
		control: { type: 'text' },
		defaultValue: 'delete',
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
		defaultValue: 'medium',
	},
	tone: {
		control: { type: 'select' },
		options: ['normal', 'secondary', 'positive', 'danger'],
		defaultValue: 'normal',
	},
}
