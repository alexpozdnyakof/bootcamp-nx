import { AbstractStore } from './data-unit'

const DATABASE: AbstractStore = [
	{
		id: 1,
		parentId: 0,
		properties: {
			title: '基本的なブートキャンプ プロジェクト',
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'project',
		children: [2],
	},
	{
		id: 2,
		parentId: 1,
		properties: {
			title: '素晴らしいタスクリスト',
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task_list',
		children: [3, 4, 5, 6, 7],
	},
	{
		id: 3,
		parentId: 2,
		properties: {
			text: 'プロフィール、プロフィールの編集、ポップアップ',
			done: false,
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task',
		children: [],
	},
	{
		id: 4,
		parentId: 2,
		properties: {
			text: '無効にする|| ユーザーがアカウントを無効にできない',
			done: true,
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task',
		children: [],
	},
	{
		id: 5,
		parentId: 2,
		properties: {
			text: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
			done: true,
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task',
		children: [],
	},
	{
		id: 6,
		parentId: 2,
		properties: {
			text: 'プロフィール、プロフィールの編集、ポップアップ',
			done: true,
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task',
		children: [],
	},
	{
		id: 7,
		parentId: 2,
		properties: {
			text: 'ビルドを共有するには Apple 開発者アカウントが必要です',
			done: false,
			created: Date.now(),
			updated: Date.now(),
		},
		type: 'task',
		children: [],
	},
]

export default DATABASE
