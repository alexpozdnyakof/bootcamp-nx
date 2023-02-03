import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Box } from '../box'
import { Menu } from './menu'
import { MenuItem } from '../menu-item/menu-item'

const Story: ComponentMeta<typeof Menu> = {
	component: Menu,
	title: 'Menu',
}
export default Story

const items = [
	'新しいフレッシュホームページの制作過程はこちら',
	'新しいチェックアウト',
	'血液レポートのグラフが空白になっている',
	'無効にする|| ユーザーがアカウントを無効にできない',
]
const Template: ComponentStory<typeof Menu> = args => (
	<Menu>
		{items.map(item => (
			<MenuItem>{item}</MenuItem>
		))}
	</Menu>
)

export const Primary = Template.bind({})
Primary.args = {}
