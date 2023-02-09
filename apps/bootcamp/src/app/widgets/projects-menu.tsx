import { Box, Menu, MenuItem, Stack, Text, Toolbar } from '@bootcamp-nx/core-ui'
import { ReactNode } from 'react'
import { RootState } from '../store'
import { useAppSelector } from '../store-hooks'

type ProjectsMenuProps = {
	onSelect?: (selectedId: string) => void
	actions?: ReactNode
}
export default function ProjectsMenu({ onSelect, actions }: ProjectsMenuProps) {
	const projects = useAppSelector((state: RootState) =>
		Object.entries(state.projects.entities)
	)

	const selectedId = useAppSelector(
		(state: RootState) => state.projects.activeId
	)

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
				{projects.map(([id, project]) => (
					<MenuItem
						key={`${id}`}
						selected={
							selectedId !== undefined &&
							selectedId === Number(id)
						}
						onClick={() => onSelect?.(id)}
					>
						<Text size='copy' lineClamp={1}>
							{project?.title}
						</Text>
					</MenuItem>
				))}
			</Menu>
		</Stack>
	)
}
