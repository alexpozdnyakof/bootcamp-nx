import { SyntheticEvent } from 'react'
import { BoxMaxWidth } from '../box'
import { Stack } from '../stack'
import { PartialProps, selectWithNone } from '../storybook-helpers'
import TextArea from './text-area'

export default {
	title: 'Controls/TextArea',
	component: TextArea,
	parameters: {
		badges: ['accessible'],
	},
}

const preventDefault = (event: SyntheticEvent) => {
	event.preventDefault()
}

export function Overview({
	label,
	auxiliaryLabel,
	...props
}: PartialProps<typeof TextArea>) {
	return (
		<TextArea
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

Overview.argTypes = {
	label: {
		control: { type: 'text' },
		defaultValue: 'User bio',
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
			'You’ll have a better experience in our community if others get to know a little bit about you.',
	},
	message: {
		control: { type: 'text' },
		defaultValue: '',
	},
	tone: {
		options: ['neutral', 'success', 'error', 'loading'],
		control: { type: 'inline-radio' },
		defaultValue: 'neutral',
	},
	variant: {
		options: ['default', 'bordered'],
		control: { type: 'inline-radio' },
		defaultValue: 'default',
	},
	placeholder: {
		control: { type: 'text' },
		defaultValue: 'Tell us something about yourself. Don’t be shy.',
	},
	maxWidth: selectWithNone<BoxMaxWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'],
		'small'
	),
}

export function Tone() {
	return (
		<Stack space='xxlarge'>
			<TextArea
				label='Profile bio'
				message='Saving changes…'
				tone='loading'
				disabled
				maxWidth='small'
			/>
			<TextArea
				label='Profile bio'
				message="Too short. Don't be shy, tell us a bit more."
				tone='error'
				maxWidth='small'
			/>
			<TextArea
				label='Profile bio'
				message='Changes saved successfully!'
				tone='success'
				maxWidth='small'
			/>
			<TextArea
				label='Profile bio'
				message='Message with neutral tone (used as description, but still prefer the hint prop for that)'
				hint='This is the primary description of the field, provided by the hint prop'
				tone='neutral'
				maxWidth='small'
			/>
		</Stack>
	)
}
