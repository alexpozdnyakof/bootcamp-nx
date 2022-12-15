import { Box, Heading, Text } from '@bootcamp-nx/core-ui'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store-hooks'
import styles from './project.module.less'
import selectProject from './project.selector'
import { load } from './project.slice'

/* eslint-disable-next-line */
export interface ProjectProps {
	id: number
}

export function Project({ id }: ProjectProps) {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(load({ id }))
	}, [dispatch, id])

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
