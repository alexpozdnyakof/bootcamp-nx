import { Menu, MenuItem, Text } from '@bootcamp-nx/core-ui'
import { Link } from 'react-router-dom'
import { RootState } from '../store'
import { useAppSelector } from '../store-hooks'

export default function SideMenu() {
	const projects = useAppSelector((state: RootState) =>
		Object.entries(state.projects.entities)
	)

	return (
		<Menu>
			{projects.map(([id, project]) => (
				<Link to={`/${id}`} key={`${id}`}>
					<MenuItem>
						<Text size='body' lineClamp={1}>
							{project?.title}
						</Text>
					</MenuItem>
				</Link>
			))}
		</Menu>
	)
}
