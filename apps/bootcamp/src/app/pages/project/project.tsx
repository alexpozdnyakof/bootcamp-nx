import { Box, Drawer, Stack } from '@bootcamp-nx/core-ui'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddProject } from '../../features/add-project'
import { projectSlice } from '../../slices'
import { fetchProjects } from '../../slices/project.slice'
import { fetchProjectTasks } from '../../slices/task.slice'
import { useAppDispatch } from '../../store-hooks'
import { ProjectsMenu } from '../../widgets'
import ProjectSummary from './project-summary'
import { ProjectTasks } from './project-tasks'

export default function ProjectPage() {
	const { id } = useParams()
	const projectId = Number(id)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSelectProject = useCallback(
		(selectedId: string) => {
			navigate(`/${selectedId}`)
		},
		[navigate]
	)

	useEffect(() => {
		dispatch(fetchProjects())
		dispatch(fetchProjectTasks(projectId))
		dispatch(projectSlice.actions.setActive({ id: projectId }))
	}, [dispatch, projectId])

	return (
		<>
			<Drawer>
				<Box style={{ height: '64px' }} />
				<ProjectsMenu
					actions={<AddProject />}
					activeProjectId={projectId}
					onSelect={onSelectProject}
				/>
			</Drawer>

			<Box width='full' display='flex' paddingX='large'>
				<Box maxWidth='large' width='full' style={{ margin: '0 auto' }}>
					<Box style={{ height: '48px' }} />

					<Box width='full'>
						<Stack space='large'>
							<ProjectSummary />
							<ProjectTasks />
						</Stack>
					</Box>
				</Box>
			</Box>
		</>
	)
}
