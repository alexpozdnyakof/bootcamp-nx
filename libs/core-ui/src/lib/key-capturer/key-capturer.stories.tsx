import { ComponentStory, ComponentMeta } from '@storybook/react'
import { KeyCapturer } from './key-capturer'

const Story: ComponentMeta<typeof KeyCapturer> = {
	component: KeyCapturer,
	title: 'KeyCapturer',
}
export default Story

const Template: ComponentStory<typeof KeyCapturer> = args => (
	<KeyCapturer {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
