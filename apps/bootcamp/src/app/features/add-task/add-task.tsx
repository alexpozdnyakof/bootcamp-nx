import { TaskFormExpandView } from '@bootcamp-nx/tasks-ui'
import { useAppDispatch } from '../../store-hooks'
import { loadTask } from './add-task.actions'

export default function AddTaskFeature({ projectId }: { projectId: number }) {
	const dispatch = useAppDispatch()

	return (
		<TaskFormExpandView
			onSubmit={(title: string) =>
				dispatch(loadTask({ title, projectId }))
			}
		/>
	)
}
