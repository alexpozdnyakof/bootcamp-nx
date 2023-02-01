import { Box, Heading, Text } from '@bootcamp-nx/core-ui'
import { useAppSelector } from '../../store-hooks'

export default function ProjectSummary() {
	const project = useAppSelector(state => {
		const { activeId, entities } = state.projects
		return activeId ? entities[activeId] : null
	})
	if (!project) return null

	return (
		<Box>
			<Heading level={1}>{project?.title}</Heading>
			<Text>{project?.description}</Text>
		</Box>
	)
}
