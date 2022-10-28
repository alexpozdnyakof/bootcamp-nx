import { Icon } from './icon'

export default {
	component: Icon,
	title: 'Icon',
}

export function Overview({ icon }: { icon: string }) {
	return <Icon>{icon}</Icon>
}

Overview.argTypes = {
	icon: {
		control: { type: 'string' },
		defaultValue: 'delete',
	},
}
