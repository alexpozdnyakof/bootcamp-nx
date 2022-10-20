import { ComponentStory, ComponentMeta } from '@storybook/react'
import { KeyboardShorcut } from './keyboard-shortcut'

const Story: ComponentMeta<typeof KeyboardShorcut> = {
	component: KeyboardShorcut,
	title: 'KeyboardShorcut',
}
export default Story

const Template: ComponentStory<typeof KeyboardShorcut> = args => (
	<KeyboardShorcut {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
	children: ['Cmd + Alt + Shift + e', 'q'],
}
