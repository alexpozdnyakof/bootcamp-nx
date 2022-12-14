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
	onCreate?: (text: ViewTask['title']) => void
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
			const createTask = (title: ViewTask['title']) => ({
				id: state.tasks[state.tasks.length - 1].id++,
				title,
				done: false,
				created: Date.now().toString(),
				updated: Date.now().toString(),
			})

			setState(({ tasks, ...s }) => ({
				tasks: tasks.concat(createTask(text)),
				...s,
			}))
		},
		[setState, state]
	)

	const onChange = useCallback(
		(id: ViewTask['id'], title: string) => {
			setState(({ tasks, ...s }) => ({
				tasks: tasks.map(it =>
					it.id === id ? { ...it, title: title } : it
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
