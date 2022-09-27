import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CoreUi } from './core-ui'

export default {
	component: CoreUi,
	title: 'CoreUi',
} as ComponentMeta<typeof CoreUi>

const Template: ComponentStory<typeof CoreUi> = args => <CoreUi {...args} />

export const Primary = Template.bind({})
Primary.args = {}
