import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Button, Icon } from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores'

const DeleteTodo = observer(({ id, ...props }: Pick<ApiTask, 'id'>) => {
	const { todoStore } = useStore()
	return (
		<Button
			size='small'
			variant='quaternary'
			onClick={() => todoStore.delete(id)}
			icon={<Icon size='small'>delete</Icon>}
			{...props}
		/>
	)
})

export default DeleteTodo
