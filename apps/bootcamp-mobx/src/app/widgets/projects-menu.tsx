import { Box, Menu, MenuItem, Stack, Text, Toolbar } from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { ReactNode, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../stores'

type ProjectsMenuProps = {
	actions?: ReactNode
}
const ProjectsMenu = observer(({ actions }: ProjectsMenuProps) => {
	const { projectStore } = useStore()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		projectStore.fetch()
		if (projectStore.projects[0]) {
			projectStore.selectedId = projectStore.projects[0].id
		}
	}, [projectStore])

	useEffect(() => {
		if (id) {
			projectStore.setSelectedId(Number(id))
		}
	}, [projectStore, id])

	useEffect(() => {
		navigate(`${projectStore.selectedId}`)
	}, [projectStore.selectedId, navigate])

	return (
		<Stack space='small'>
			<Toolbar gutter='medium'>
				<Box flexGrow={1}>
					<Text size='caption' weight='extrabold' tone='secondary'>
						プロジェクト
					</Text>
				</Box>
				<Box marginRight='-xlarge'>{actions}</Box>
			</Toolbar>

			<Menu>
				{projectStore.projects.map(project => (
					<MenuItem
						key={`${project.id}`}
						selected={
							projectStore.selectedId !== null &&
							projectStore.selectedId === Number(project.id)
						}
						onClick={() => projectStore.setSelectedId(project.id)}
					>
						<Text size='copy' lineClamp={1}>
							{project?.title}
						</Text>
					</MenuItem>
				))}
			</Menu>
		</Stack>
	)
})

export default ProjectsMenu
