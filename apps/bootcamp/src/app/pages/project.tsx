import { Box } from '@bootcamp-nx/core-ui'
import { useParams } from 'react-router-dom'
import { Project } from '../features/project/project'
import { TaskListFeature } from '../features/task-list/task-list'

export default function ProjectPage() {
	const params = useParams<{ id: string }>()
	const id = Number(params.id)

	return (
		<Box width='full'>
			<Project id={id} />
			<TaskListFeature projectId={params.id!} />
		</Box>
	)
}
