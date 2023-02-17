import { Box, Drawer } from '@bootcamp-nx/core-ui'
import { Outlet } from 'react-router-dom'
import { AddProject } from '../features'
import { ProjectsMenu } from '../widgets'

export default function ProjectsPage() {
	return (
		<>
			<Drawer>
				<Box style={{ height: '64px' }} />
				<ProjectsMenu actions={<AddProject />} />
			</Drawer>

			<Box width='full' display='flex' paddingX='large'>
				<Box
					minWidth='large'
					width='full'
					style={{
						margin: '0 auto',
						padding: '32px 56px 0',
					}}
				>
					<Box style={{ height: '48px' }} />

					<Box width='medium' style={{ margin: '0 auto' }}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</>
	)
}
