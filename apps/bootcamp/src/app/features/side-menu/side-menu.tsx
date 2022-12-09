import { List, ListItem, Stack, Text } from '@bootcamp-nx/core-ui'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../store-hooks'
import { load } from './side-menu-slice'

export default function SideMenu() {
	const dispatch = useAppDispatch()
	const projects = useAppSelector(
		(state: RootState) => state.sideMenu.projects
	)
	dispatch(load())

	return (
		<Stack space='small'>
			<Text size='subtitle' weight='bold'>
				プロジェクト
			</Text>
			<List>
				{projects.map(project => (
					<ListItem key={`${project.type}-${project.id}`}>
						<Text size='body'>{project.title}</Text>
					</ListItem>
				))}
			</List>
		</Stack>
	)
}
