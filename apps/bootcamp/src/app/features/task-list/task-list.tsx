import { Stack } from '@bootcamp-nx/core-ui'
import { TaskList, TaskListProvider } from '@bootcamp-nx/tasks-ui'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store-hooks'
import { load } from './task-list.slice'

export const TASKS_DATA = [
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
/* eslint-disable-next-line */
export interface TaskListProps {
	projectId: string
}

export function TaskListFeature({ projectId }: TaskListProps) {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(load({ id: projectId }))
	}, [dispatch, projectId])

	return (
		<Stack space='xlarge'>
			<TaskListProvider tasks={TASKS_DATA} title='素晴らしいタスクリスト'>
				<TaskList />
			</TaskListProvider>
			<TaskListProvider tasks={TASKS_DATA} title='素晴らしいタスクリスト'>
				<TaskList />
			</TaskListProvider>
		</Stack>
	)
}

export default TaskList
