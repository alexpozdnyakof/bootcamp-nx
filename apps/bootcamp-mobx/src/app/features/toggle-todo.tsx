import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { SwitchComplete } from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores'

const ToggleTodo = observer(
	({ done, id, title }: Pick<ApiTask, 'title' | 'id' | 'done'>) => {
		const { todoStore } = useStore()

		return (
			<SwitchComplete
				done={done}
				aria-label={'Complete '.concat(title)}
				onClick={() => todoStore.toggle(id)}
			/>
		)
	}
)

export default ToggleTodo
