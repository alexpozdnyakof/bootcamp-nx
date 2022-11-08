import { Box } from '@bootcamp-nx/core-ui'
import { ComponentProps, useCallback, useState } from 'react'
import { TaskList, ViewTask } from './task-list'

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

export function Interactive({ tasks, title }: ComponentProps<typeof TaskList>) {
	const [state, setState] = useState<TaskListState>({ tasks, active: null })

	const onComplete = useCallback(
		(id: number) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.map(it =>
					it.id === id ? { ...it, done: !it.done } : it
				),
				...s,
			}))
		},
		[setState]
	)

	const onDelete = useCallback(
		(id: number) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.filter(it => it.id !== id),
				...s,
			}))
		},
		[setState]
	)

	const onCreate = useCallback(
		(text: string) => {
			const createTask = (text: string) => ({
				id: state.tasks[state.tasks.length - 1].id++,
				text,
				done: false,
			})
			setState(({ tasks, ...s }) => ({
				tasks: tasks.concat(createTask(text)),
				...s,
			}))
		},
		[setState, state]
	)

	const onEdit = useCallback(
		(idOrNull: TaskListState['active']) => {
			setState(({ active, ...s }) => ({
				active: active === idOrNull ? active : idOrNull,
				...s,
			}))
		},
		[setState]
	)

	return (
		<Box marginLeft='xlarge'>
			<TaskList
				tasks={state.tasks}
				title={title}
				onCreate={onCreate}
				toggleComplete={onComplete}
				onDelete={onDelete}
				onEdit={onEdit}
				editingTask={state.active}
			/>
		</Box>
	)
}

Interactive.args = {
	tasks,
	title: '素晴らしいタスクリスト',
}
