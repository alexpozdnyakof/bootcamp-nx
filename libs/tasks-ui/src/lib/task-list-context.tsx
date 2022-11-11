import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { ViewTask } from './common-types'
import { TaskListItemHandlers } from './task-list-item'

export type TaskListContextState = {
	tasks: Array<ViewTask>
	title: string
	completedCount?: string
	editingTask?: ViewTask['id'] | null
	onCreate?: (text: ViewTask['text']) => void
} & TaskListItemHandlers

type TaskListInnerState = Pick<TaskListContextState, 'tasks' | 'editingTask'>

const TaskListContext = createContext({} as TaskListContextState)

type TaskListProviderProps = {
	children: ReactNode
	tasks: TaskListContextState['tasks']
} & Pick<TaskListContextState, 'tasks' | 'title'>

function TaskListProvider({ children, tasks, title }: TaskListProviderProps) {
	const [state, setState] = useState<TaskListInnerState>({
		tasks,
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
			console.log('onStartEdit')
			setState(({ editingTask, ...s }) => ({
				editingTask: editingTask === id ? editingTask : id,
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
				title,
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
