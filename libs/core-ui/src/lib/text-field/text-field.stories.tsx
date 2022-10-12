import React from 'react'
import { BoxMaxWidth } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
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
	maxWidth: selectWithNone<BoxMaxWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'small'
	),
	disabled: {
		control: { type: 'boolean' },
		defaultValue: false,
	},
}

export function MessageToneStory() {
	return (
		<Stack space='xxlarge'>
			<TextField
				label='Verification code'
				message='Verifying code…'
				tone='loading'
				disabled
				maxWidth='small'
			/>
			<TextField
				label='Verification code'
				message='Invalid code. Please, try again.'
				tone='error'
				maxWidth='small'
			/>
			<TextField
				label='Verification code'
				message='Code verification successful!'
				tone='success'
				maxWidth='small'
			/>
			<TextField
				label='Verification code'
				message='Message with neutral tone (used as description, but still prefer the hint prop for that)'
				hint='This is the primary description of the field, provided by the hint prop'
				tone='neutral'
				maxWidth='small'
			/>
		</Stack>
	)
}

export function WithoutLabelStory() {
	return (
		<Stack space='xlarge' maxWidth='small'>
			<Stack as='label' htmlFor='custom-textarea' space='small'>
				<Text size='subtitle'>Custom label is up here</Text>
				<Text size='caption' tone='secondary' aria-hidden>
					<em>(click me to focus the input element)</em>
				</Text>
			</Stack>
			<TextField
				label={null}
				id='custom-textarea'
				aria-describedby='custom-description'
				placeholder='Text field without a built-in label'
			/>
			<Stack space='small' id='custom-description'>
				<Text size='body'>Custom description is down here</Text>
				<Text size='caption' tone='secondary' aria-hidden>
					<em>
						(inspect the input element accessibility properties if
						you are curious)
					</em>
				</Text>
			</Stack>
		</Stack>
	)
}