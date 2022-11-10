import { Box } from '@bootcamp-nx/core-ui'
import { ComponentProps, useCallback, useMemo, useState } from 'react'
import { ViewTask } from '../common-types'
import { TaskList } from './task-list'

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
	const [state, setState] = useState<TaskListState>({ tasks, active: null })

	const onComplete = useCallback(
		(id: ViewTask['id']) => {
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
		(id: ViewTask['id']) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.filter(it => it.id !== id),
				...s,
			}))
		},
		[setState]
	)

	const onCreate = useCallback(
		(text: string) => {
			const createTask = (text: ViewTask['text']) => ({
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

	const onStartEdit = useCallback(
		(id: TaskListState['active']) => {
			setState(({ active, ...s }) => ({
				active: active === id ? active : id,
				...s,
			}))
		},
		[setState]
	)

	const onCancelEdit = useCallback(() => {
		setState(({ active, ...s }) => ({
			active: null,
			...s,
		}))
	}, [setState])

	const onChange = useCallback(
		(id: ViewTask['id'], text: string) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.map(it =>
					it.id === id ? { ...it, text: text } : it
				),
				...s,
			}))
		},
		[setState]
	)

	const completedCount = useMemo(
		() =>
			state.tasks
				.reduce(
					(acc, curr) => {
						const [completed, total] = acc
						return [
							curr.done ? completed + 1 : completed,
							total + 1,
						]
					},
					[0, 0]
				)
				.join('/'),
		[state.tasks]
	)

	return (
		<Box marginLeft='xlarge'>
			<TaskList
				tasks={state.tasks}
				title={title}
				onCreate={onCreate}
				onComplete={onComplete}
				onDelete={onDelete}
				onStartEdit={onStartEdit}
				onCancelEdit={onCancelEdit}
				onChange={onChange}
				editingTask={state.active}
				completedCount={completedCount}
			/>
		</Box>
	)
}

Interactive.args = {
	tasks,
	title: '素晴らしいタスクリスト',
}
