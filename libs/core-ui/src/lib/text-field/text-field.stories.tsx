import React from 'react'
import { BoxMaxWidth } from '../box'
import { PartialProps, selectWithNone } from '../storybook-helpers'
import TextField from './text-field'

export default {
	title: 'Design system/TextField',
	component: TextField,
	parameters: {
		badges: ['accessible'],
	},
}

const preventDefault = (event: React.SyntheticEvent) => {
	event.preventDefault()
}

export function InteractivePropsStory({
	label,
	auxiliaryLabel,
	...props
}: PartialProps<typeof TextField>) {
	return (
		<TextField
			{...props}
			label={label}
			auxiliaryLabel={
				auxiliaryLabel ? (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a href='#' onClick={preventDefault}>
						{auxiliaryLabel}
					</a>
				) : undefined
			}
		/>
	)
}

InteractivePropsStory.argTypes = {
	label: {
		control: { type: 'text' },
		defaultValue: 'Your name',
	},
	secondaryLabel: {
		control: { type: 'text' },
		defaultValue: 'optional',
	},
	auxiliaryLabel: {
		control: { type: 'text' },
		defaultValue: 'Need help?',
	},
	hint: {
		control: { type: 'text' },
		defaultValue:
			'We need your name for billing and shipping purposes. Make sure to enter it correctly.',
	},
	placeholder: {
		control: { type: 'text' },
		defaultValue: 'Enter your name as it appears in your ID',
	},
	maxWidth: selectWithNone<BoxMaxWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'small'
	),
	disabled: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
}
