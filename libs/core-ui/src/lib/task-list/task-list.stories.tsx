import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TaskList } from './task-list'

const tasks = [
	{
		id: 0,
		text: 'Blood report graph is showing blank',
		done: false,
	},
	{
		id: 1,
		text: 'Deactivate|| User is not able to deactivate the account',
		done: true,
	},
	{
		id: 2,
		text: 'My profile || User is not able to view the weight and height which are set during signup',
		done: false,
	},
	{
		id: 3,
		text: 'Profile, edit profile and Pop-ups',
		done: true,
	},
	{
		id: 4,
		text: 'Need Apple developer account to share build',
		done: false,
	},
]

const Story: ComponentMeta<typeof TaskList> = {
	component: TaskList,
	title: 'Tasks/TaskList',
}
export default Story

const Template: ComponentStory<typeof TaskList> = args => <TaskList {...args} />

export const Primary = Template.bind({})
Primary.args = {
	tasks,
}
