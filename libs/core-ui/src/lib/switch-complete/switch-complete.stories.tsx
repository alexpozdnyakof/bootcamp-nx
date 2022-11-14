import { useState } from 'react'
import { PartialProps } from '../storybook-helpers'
import SwitchComplete from './switch-complete'

export default {
	component: SwitchComplete,
	title: 'SwitchComplete',
}

export function Interactive({ disabled }: PartialProps<typeof SwitchComplete>) {
	const [done, setDone] = useState<boolean>(false)
	return (
		<SwitchComplete
			done={done}
			onClick={() => setDone(d => !d)}
			disabled={disabled}
		/>
	)
}

Interactive.argTypes = {
	disabled: { control: 'boolean' },
	defaultValue: false,
}
