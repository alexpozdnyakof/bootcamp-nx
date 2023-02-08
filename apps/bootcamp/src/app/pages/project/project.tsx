import { ApiProject, ApiTask } from '@bootcamp-nx/api-interfaces'
import { Box, Drawer, Stack } from '@bootcamp-nx/core-ui'
import { useCallback, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AddProject } from '../../features/add-project'
import { projectSlice, taskSlice } from '../../slices'
import { useAppDispatch } from '../../store-hooks'
import { ProjectsMenu } from '../../widgets'
import ProjectSummary from './project-summary'
import { ProjectTasks } from './project-tasks'

export default function ProjectPage() {
	const [tasks, projects, projectId] = useLoaderData() as [
		Array<ApiTask>,
		Array<ApiProject>,
		number
	]

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSelectProject = useCallback(
		(selectedId: string) => {
			navigate(`/${selectedId}`)
		},
		[navigate]
	)

	useEffect(() => {
		dispatch(taskSlice.actions.setAll(tasks))
		dispatch(projectSlice.actions.setAll(projects))
		dispatch(projectSlice.actions.setActive({ id: projectId }))
	}, [dispatch, projects, tasks, projectId])

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
