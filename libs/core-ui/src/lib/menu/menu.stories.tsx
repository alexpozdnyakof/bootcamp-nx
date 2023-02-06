import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { MenuItem } from '../menu-item/menu-item'
import { Menu } from './menu'

const Story: ComponentMeta<typeof Menu> = {
	component: Menu,
	title: 'Menu',
}
export default Story

const Template: ComponentStory<typeof Menu> = args => (
	<Menu>
		<MenuItem>新しいフレッシュホームページの制作過程はこちら</MenuItem>
		<MenuItem>新しいチェックアウト</MenuItem>
		<MenuItem selected>血液レポートのグラフが空白になっている</MenuItem>
		<MenuItem>無効にする|| ユーザーがアカウントを無効にできない</MenuItem>
	</Menu>
)

export const Primary = Template.bind({})
Primary.args = {}
