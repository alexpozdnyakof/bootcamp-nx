/* eslint-disable react/jsx-props-no-spreading */
import { Box, Stack } from '@bootcamp-nx/core-ui'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from '../features/project/project'
import { TaskList } from '../features/task-list/task-list'
import { useAppDispatch, useAppSelector } from '../store-hooks'
import selectTaskLists from './project.selector'
import {
	addTask,
	changeTaskStatus,
	changeTaskTitle,
	deleteTask,
	load,
} from './project.slice'

export default function ProjectPage() {
	const params = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
	const lists = useAppSelector(selectTaskLists)
	useEffect(() => {
		dispatch(load({ id: Number(params.id) }))
	}, [dispatch, params])

	const onCreate = (listId: number, title: string) =>
		dispatch(addTask({ listId, dto: { title, done: false } }))

	const onComplete = useCallback(
		(id: number) => {
			dispatch(changeTaskStatus({ id }))
		},
		[dispatch]
	)

	const onDelete = useCallback(
		(id: number) => {
			dispatch(deleteTask({ id }))
		},
		[dispatch]
	)

	const onChangeTaskTitle = useCallback(
		(id: number, title: string) => {
			dispatch(changeTaskTitle({ id, title }))
		},
		[dispatch]
	)

	return (
		<Box width='full'>
			<Stack space='xlarge'>
				<Project />
				{lists.map(list => (
					<TaskList
						key={`list-${list.id}`}
						{...list}
						onCreate={(title: string) => onCreate(list.id, title)}
						onTaskComplete={onComplete}
						onTaskDelete={onDelete}
						onChangeTaskTitle={onChangeTaskTitle}
					/>
				))}
			</Stack>
		</Box>
	)
}
