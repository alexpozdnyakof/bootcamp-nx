import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box } from '../box'
import { TaskForm } from './task-form'

const Story: ComponentMeta<typeof TaskForm> = {
	component: TaskForm,
	title: 'Tasks/TaskForm',
}
export default Story

const Template: ComponentStory<typeof TaskForm> = args => (
	<Box maxWidth='medium'>
		<TaskForm {...args} />
	</Box>
)

export const Primary = Template.bind({})
Primary.args = {}