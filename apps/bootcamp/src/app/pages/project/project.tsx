import { ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { Box, Stack } from '@bootcamp-nx/core-ui'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { projectSlice, sectionSlice, taskSlice } from '../../slices'
import { useAppDispatch } from '../../store-hooks'
import { SideMenu } from '../../widgets'
import ProjectSummary from './project-summary'
import { ProjectTasks } from './project-tasks'
import styles from './project.module.css'

export default function ProjectPage() {
	const [tasks, sections, projectId] = useLoaderData() as [
		Array<Required<ApiTask>>,
		Array<ApiTaskList>,
		number
	]

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(taskSlice.actions.setAll(tasks))
		dispatch(sectionSlice.actions.setAll(sections))
		dispatch(projectSlice.actions.setActive({ id: projectId }))
	}, [dispatch, sections, tasks, projectId])

	return (
		<Box className={styles['app-layout']}>
			<Box className={styles['app-menu']}>
				<Box style={{ height: '24px' }} />
				<SideMenu />
			</Box>
			<Box>
				<Box className={styles['app-layout-content']}>
					<Box className={styles['app-tasklists']}>
						<Box width='full'>
							<Stack space='xlarge'>
								<ProjectSummary />
								<Stack space='large'>
									<ProjectTasks />
								</Stack>
							</Stack>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
