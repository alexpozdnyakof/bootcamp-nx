import { ApiTask } from '@bootcamp-nx/api-interfaces'
import {
	Box,
	Button,
	Drawer,
	ExpandView,
	Heading,
	Inline,
	List,
	ListItem,
	Stack,
	Text,
} from '@bootcamp-nx/core-ui'
import { useCallback, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { AddProject } from '../features/add-project'
import { AddTaskFeature } from '../features/add-task'
import { DeleteTask } from '../features/delete-task'
import { EditableTaskTitle } from '../features/editable-task-title'
import { ToggleTask } from '../features/toggle-task'
import projectSlice, { fetchProjects } from '../slices/project.slice'
import { fetchProjectTasks, selectTasks } from '../slices/task.slice'
import { useAppDispatch, useAppSelector } from '../store-hooks'
import { ProjectsMenu } from '../widgets'

function ExpandableTaskForm({ projectId }: { projectId: number }) {
	return (
		<ExpandView>
			{(toggleExpand, expanded) => (
				<>
					{!expanded && (
						<Button onClick={toggleExpand} variant='tertiary'>
							タスクを作成
						</Button>
					)}
					{expanded && (
						<AddTaskFeature
							projectId={Number(projectId)}
							onClear={toggleExpand}
						/>
					)}
				</>
			)}
		</ExpandView>
	)
}

function TaskList({ tasks }: { tasks: Array<ApiTask> }) {
	return (
		<List>
			{tasks.map(task => (
				<ListItem
					key={`task-${task.id}`}
					actions={
						<DeleteTask
							id={task.id}
							aria-label={'Delete '.concat(task.title)}
						/>
					}
				>
					<Inline space='small'>
						<ToggleTask
							id={task.id}
							title={task.title}
							done={task.done}
						/>
						<EditableTaskTitle title={task.title} id={task.id} />
					</Inline>
				</ListItem>
			))}
		</List>
	)
}

export function ProjectView() {
	const dispatch = useAppDispatch()
	const { id } = useParams()

	const projectId = Number(id)

	const project = useAppSelector(state => state.projects.entities[projectId])
	const tasks = useAppSelector(selectTasks)

	useEffect(() => {
		dispatch(fetchProjectTasks(Number(projectId)))
	}, [dispatch, projectId])

	return (
		<Stack space='large'>
			<Stack>
				<Heading level={1}>{project?.title}</Heading>
				<Text>{project?.description}</Text>
			</Stack>
			<Stack space='large'>
				<ExpandableTaskForm projectId={projectId} />
				<TaskList tasks={tasks} />
			</Stack>
		</Stack>
	)
}

export default function ProjectPage() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const selectedId = useAppSelector(
		(state: RootState) => state.projects.activeId
	)

	const onSelectProject = useCallback(
		(id: string) =>
			dispatch(projectSlice.actions.setActive({ id: Number(id) })),
		[dispatch]
	)

	useEffect(() => {
		navigate(`${selectedId}`)
	}, [navigate, selectedId])

	useEffect(() => {
		dispatch(fetchProjects())
	}, [dispatch])

	return (
		<>
			<Drawer>
				<Box style={{ height: '64px' }} />
				<ProjectsMenu
					actions={<AddProject />}
					onSelect={onSelectProject}
				/>
			</Drawer>

			<Box width='full' display='flex' paddingX='large'>
				<Box
					minWidth='large'
					width='full'
					style={{
						margin: '0 auto',
						padding: '32px 56px 0',

						maxWidth: '80%',
					}}
				>
					<Box style={{ height: '48px' }} />

					<Box width='full'>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</>
	)
}
