import { List, ListItem, Stack, Text } from '@bootcamp-nx/core-ui'
import { RootState } from '../store'
import { useAppSelector } from '../store-hooks'

export default function SideMenu() {
	const projects = useAppSelector((state: RootState) =>
		Object.entries(state.projects.entities)
	)

	return (
		<Stack space='small'>
			<Text size='subtitle' weight='bold'>
				プロジェクト
			</Text>
			<List>
				{projects.map(([id, entity]) => (
					<ListItem key={`${entity?.type}-${id}`}>
						<Text size='body'>{entity?.title}</Text>
					</ListItem>
				))}
			</List>
		</Stack>
	)
}
