import { Box, Menu, MenuItem, Stack, Text, Toolbar } from '@bootcamp-nx/core-ui'
import { ReactNode } from 'react'
import { RootState } from '../store'
import { useAppSelector } from '../store-hooks'

type ProjectsMenuProps = {
	activeProjectId?: number
	onSelect?: (selectedId: string) => void
	actions?: ReactNode
}
export default function ProjectsMenu({
	activeProjectId,
	onSelect,
	actions,
}: ProjectsMenuProps) {
	const projects = useAppSelector((state: RootState) =>
		Object.entries(state.projects.entities)
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
							activeProjectId !== undefined &&
							activeProjectId === Number(id)
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
