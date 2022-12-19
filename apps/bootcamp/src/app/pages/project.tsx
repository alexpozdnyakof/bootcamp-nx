/* eslint-disable react/jsx-props-no-spreading */
import { Box, Stack } from '@bootcamp-nx/core-ui'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from '../features/project/project'
import { TaskList } from '../features/task-list/task-list'
import { useAppDispatch, useAppSelector } from '../store-hooks'
import selectTaskLists from './project.selector'
import { addTask, load } from './project.slice'

export default function ProjectPage() {
	const params = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
	const lists = useAppSelector(selectTaskLists)
	useEffect(() => {
		dispatch(load({ id: Number(params.id) }))
	}, [dispatch, params])

	const onCreate = (title: string) =>
		dispatch(addTask({ title, done: false }))

	return (
		<Box width='full'>
			<Stack space='xlarge'>
				<Project />
				{lists.map(list => (
					<TaskList
						key={`list-${list.id}`}
						{...list}
						onCreate={onCreate}
					/>
				))}
			</Stack>
		</Box>
	)
}
