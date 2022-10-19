import { SyntheticEvent } from 'react'
import { BoxMaxWidth } from '../box'
import { Stack } from '../stack'
import { PartialProps, selectWithNone } from '../storybook-helpers'
import PasswordField from './password-field'

export default {
	title: 'Controls/PasswordField',
	component: PasswordField,
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
}: PartialProps<typeof PasswordField>) {
	return (
		<PasswordField
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
		defaultValue: 'Password',
	},
	secondaryLabel: {
		control: { type: 'text' },
		defaultValue: 'optional',
	},
	auxiliaryLabel: {
		control: { type: 'text' },
		defaultValue: 'Forgot your password?',
	},
	hint: {
		control: { type: 'text' },
		defaultValue:
			'Must be at least 100 characters long, and it should include each letter of the alphabet',
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
		defaultValue: 'Type your password',
	},
	maxWidth: selectWithNone<BoxMaxWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'small'
	),
}

export function Tone() {
	return (
		<Stack space='xxlarge'>
			<PasswordField
				label='Password confirmation'
				message='Comparing to original password…'
				tone='loading'
				disabled
				maxWidth='small'
			/>
			<PasswordField
				label='Password confirmation'
				message='It does not match the original password'
				tone='error'
				maxWidth='small'
			/>
			<PasswordField
				label='Password confirmation'
				message='Matches original password!'
				tone='success'
				maxWidth='small'
			/>
			<PasswordField
				label='Password confirmation'
				message='Message with neutral tone (used as description, but still prefer the hint prop for that)'
				hint='This is the primary description of the field, provided by the hint prop'
				tone='neutral'
				maxWidth='small'
			/>
		</Stack>
	)
}
