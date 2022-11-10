import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { ViewTask } from './common-types'
import { TaskListItemHandlers } from './task-list-item'

const tasksData = [
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
	{
		id: 5,
		text: 'ビルドを共有するには Apple 開発者アカウントが必要です',
		done: false,
	},
]

export type TaskListContextState = {
	tasks: Array<ViewTask>
	title: string
	completedCount?: string
	editingTask?: ViewTask['id'] | null
	onCreate?: (text: ViewTask['text']) => void
} & TaskListItemHandlers

type TaskListInnerState = Pick<TaskListContextState, 'tasks' | 'editingTask'>

const TaskListContext = createContext({} as TaskListContextState)

function TaskListProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState<TaskListInnerState>({
		tasks: tasksData,
		editingTask: null,
	})

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
		(id: TaskListInnerState['editingTask']) => {
			setState(({ editingTask, ...s }) => ({
				active: editingTask === id ? editingTask : id,
				...s,
			}))
		},
		[setState]
	)

	const onCancelEdit = useCallback(() => {
		setState(({ editingTask, ...s }) => ({
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
		<TaskListContext.Provider
			value={{
				tasks: state.tasks,
				title: '素晴らしいタスクリスト',
				onComplete,
				onDelete,
				onCreate,
				onStartEdit,
				onCancelEdit,
				onChange,
				completedCount,
				editingTask: state.editingTask,
			}}
		>
			{children}
		</TaskListContext.Provider>
	)
}
const useTaskListState = () => useContext(TaskListContext)

export { useTaskListState, TaskListProvider }
