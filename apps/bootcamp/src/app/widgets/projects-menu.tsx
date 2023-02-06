import { Menu, MenuItem, Text } from '@bootcamp-nx/core-ui'
import { RootState } from '../store'
import { useAppSelector } from '../store-hooks'

type ProjectsMenuProps = {
	activeProjectId?: number
	onSelect?: (selectedId: string) => void
}
export default function ProjectsMenu({
	activeProjectId,
	onSelect,
}: ProjectsMenuProps) {
	const projects = useAppSelector((state: RootState) =>
		Object.entries(state.projects.entities)
	)

	return (
		<Menu>
			{projects.map(([id, project]) => (
				<MenuItem
					key={`${id}`}
					selected={
						activeProjectId !== undefined &&
						activeProjectId === Number(id)
					}
					onClick={() => onSelect?.(id)}
				>
					<Text size='body' lineClamp={1}>
						{project?.title}
					</Text>
				</MenuItem>
			))}
		</Menu>
	)
}
