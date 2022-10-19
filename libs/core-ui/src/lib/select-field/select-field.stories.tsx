import { SyntheticEvent } from 'react'
import { BoxMaxWidth } from '../box'
import { Stack } from '../stack'
import { PartialProps, selectWithNone } from '../storybook-helpers'
import SelectField from './select-field'

export default {
	title: 'Controls/SelectField',
	component: SelectField,
	parametrs: {
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
}: PartialProps<typeof SelectField>) {
	return (
		<SelectField
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
			defaultValue='-'
		>
			<option value='-' disabled>
				Select theme
			</option>
			<optgroup label='Light themes'>
				<option value='default'>Default theme</option>
				<option value='bright'>Extra bright</option>
			</optgroup>
			<optgroup label='Dark themes'>
				<option value='contrast'>High contrast</option>
				<option value='dark'>Dark mode</option>
			</optgroup>
		</SelectField>
	)
}

Overview.argTypes = {
	label: {
		control: { type: 'text' },
		defaultValue: 'Theme',
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
			'The theme you select will be applied immediately. If you upgrade to premium you will have more themes to choose from.',
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
	maxWidth: selectWithNone<BoxMaxWidth>(
		['xsmall', 'small', 'medium', 'large', 'xlarge'],
		'small'
	),
}

export function Tone() {
	return (
		<Stack space='xxlarge'>
			<SelectField
				label='Country of residence'
				message='Saving…'
				tone='loading'
				disabled
				maxWidth='small'
			>
				<option value='none' disabled>
					–
				</option>
			</SelectField>

			<SelectField
				label='Country of residence'
				message='Something went wrong. Please, try again.'
				tone='error'
				maxWidth='small'
			>
				<option value='none' disabled>
					–
				</option>
			</SelectField>

			<SelectField
				label='Country of residence'
				message='Saved successfully!'
				tone='success'
				maxWidth='small'
			>
				<option value='none' disabled>
					–
				</option>
			</SelectField>

			<SelectField
				label='Country of residence'
				message='Message with neutral tone (used as description, but still prefer the hint prop for that)'
				hint='This is the primary description of the field, provided by the hint prop'
				tone='neutral'
				maxWidth='small'
			>
				<option value='none' disabled>
					–
				</option>
			</SelectField>
		</Stack>
	)
}
