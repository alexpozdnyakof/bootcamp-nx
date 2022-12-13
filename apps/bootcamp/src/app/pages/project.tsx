import { useParams } from 'react-router-dom'
import { TaskListFeature } from '../features/task-list/task-list'

export default function ProjectPage() {
	const params = useParams<{ id: string }>()
	const id = params.id!

	return <TaskListFeature projectId={id} />
}
