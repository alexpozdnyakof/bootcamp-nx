import {
	Button,
	ExpandView,
	Heading,
	Inline,
	List,
	ListItem,
	Stack,
	Text,
} from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AddTodo, DeleteTodo, EditableTodoTitle, ToggleTodo } from '../features'
import { useStore } from '../stores'

const ProjectHeader = observer(() => {
	const { projectStore } = useStore()

	return (
		<Stack>
			<Heading level={1}>{projectStore.activeProject?.title}</Heading>
			<Text size='copy' tone='secondary' style={{ maxWidth: '80ch' }}>
				{projectStore.activeProject?.description}
			</Text>
		</Stack>
	)
})

const TodoList = observer(({ projectId }: { projectId: number }) => {
	const { todoStore } = useStore()

	useEffect(() => {
		todoStore.fetch(projectId)
	}, [todoStore, projectId])

	return (
		<List>
			{todoStore.todos.map(todo => (
				<ListItem
					key={`todo-${todo.id}`}
					actions={
						<DeleteTodo
							id={todo.id}
							aria-label={'Delete '.concat(todo.title)}
						/>
					}
				>
					<Inline space='small'>
						<ToggleTodo
							id={todo.id}
							title={todo.title}
							done={todo.done}
						/>
						<EditableTodoTitle title={todo.title} id={todo.id} />
					</Inline>
				</ListItem>
			))}
		</List>
	)
})

export default function ProjectViewPage() {
	const { id } = useParams()

	return (
		<Stack space='large' width='full'>
			<ProjectHeader />
			<AddTodo projectId={Number(id)} />

			<Stack space='large'>
				<TodoList projectId={Number(id)} />
			</Stack>
		</Stack>
	)
}
