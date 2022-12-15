import { Stack, List } from '@bootcamp-nx/core-ui'
import {
	TaskList,
	TaskListHeader,
	TaskFormExpandView,
	TaskListItem,
} from '@bootcamp-nx/tasks-ui'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store-hooks'
import { getTasklists, getTasks } from './task-list.selector'
import { load } from './task-list.slice'
/* eslint-disable-next-line */
export interface TaskListProps {
	projectId: string
}

export function TaskListFeature({ projectId }: TaskListProps) {
	const dispatch = useAppDispatch()
	const taskLists = useAppSelector(getTasklists)
	const tasks = useAppSelector(getTasks)

	useEffect(() => {
		dispatch(load({ id: projectId }))
	}, [dispatch, projectId])

	return (
		<Stack space='xlarge'>
			{taskLists.map(list => (
				<Stack space='large' key={`${list.type}-${list.id}`}>
					<Stack space='small'>
						<TaskListHeader completed='0/5'>
							{list.title}
						</TaskListHeader>
						<TaskFormExpandView onSubmit={() => {}} />
					</Stack>
					<List>
						{tasks
							.filter(task => task.tasklist_id === list.id)
							.map(task => (
								<TaskListItem
									key={task.id}
									task={task}
									onDelete={() => {}}
									onComplete={() => {}}
									onChange={() => {}}
								/>
							))}
					</List>
				</Stack>
			))}
		</Stack>
	)
}

export default TaskList
