import { Box, Heading, Text } from '@bootcamp-nx/core-ui'
import { useAppSelector } from '../../store-hooks'
import selectProject from './project.selector'

/* eslint-disable-next-line */
export interface ProjectProps {
	id: number
}

export function Project() {
	const project = useAppSelector(selectProject)

	return (
		<Box>
			<Heading level={1}>{project.title}</Heading>
			<Text>{project.description}</Text>
			<Text>{project.updated}</Text>
		</Box>
	)
}

export default Project
