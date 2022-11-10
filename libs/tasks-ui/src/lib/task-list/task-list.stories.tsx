import { Box } from '@bootcamp-nx/core-ui'
import { ComponentProps, useCallback, useMemo, useState } from 'react'
import { ViewTask } from '../common-types'
import { TaskList } from './task-list'
import { TaskListProvider } from '../task-list-context'

const tasks = [
	{
		id: 0,
		text: '血液レポートのグラフが空白になっている',
		done: false,
	},
	{
		id: 1,
		text: '無効にする|| ユーザーがアカウントを無効にできない',
		done: true,
	},
	{
		id: 2,
		text: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
		done: false,
	},
	{
		id: 3,
		text: 'プロフィール、プロフィールの編集、ポップアップ',
		done: true,
	},
	{
		id: 4,
		text: 'ビルドを共有するには Apple 開発者アカウントが必要です',
		done: false,
	},
]

export default {
	component: TaskList,
	title: 'Tasks/TaskList',
}

type TaskListState = {
	tasks: Array<ViewTask>
	active: ViewTask['id'] | null
}

/**
 * TODO: Lifting state
 * 1. create task from form
 * 2. delete task
 * 3. start task editing
 * 4. end task editing
 * 5. change task text
 * 6. change task status
 * @param param0
 * @returns
 */

export function Interactive({ tasks, title }: ComponentProps<typeof TaskList>) {
	return (
		<Box marginLeft='xlarge'>
			<TaskListProvider>
				<TaskList />
			</TaskListProvider>
		</Box>
	)
}

Interactive.args = {
	tasks,
	title: '素晴らしいタスクリスト',
}
