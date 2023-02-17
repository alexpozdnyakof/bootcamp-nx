import {
	ApiTask,
	ApiTaskDTO,
	ResponseWithData,
} from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { makeAutoObservable } from 'mobx'

export function createTodoStore(todos: Array<ApiTask> = []) {
	const api = ApiBootcamp()
	const store = {
		todos,
		*add(todo: ApiTaskDTO) {
			try {
				const response: ResponseWithData<{ id: number }> =
					yield api.SaveTask(todo)
				const { data }: ResponseWithData<ApiTask> = yield api.GetTask(
					response.data.id
				)
				this.todos.push(data)
			} catch (error) {
				console.error(error)
			}
		},
		*delete(id: number) {
			try {
				yield api.DeleteTask(id)
				this.todos = this.todos.filter(todo => todo.id !== id)
			} catch (error) {
				console.error({ error })
			}
		},
		toggle(id: number) {
			const todo = this.todos.find(todo => todo.id === id)
			if (todo) {
				const newTodo = { ...todo, done: !todo.done }
				this.update(newTodo)
			}
		},
		changeTitle({ id, title }: { id: number; title: string }) {
			const todo = this.todos.find(todo => todo.id === id)

			if (todo) {
				const newTodo = { ...todo, title }
				this.update(newTodo)
			}
		},
		*fetch(projectId: number) {
			try {
				const response: ResponseWithData<Array<ApiTask>> =
					yield api.ProjectTasks(projectId)
				this.todos = response.data
			} catch (error) {
				console.error(error)
			}
		},
		*update(todo: ApiTask) {
			try {
				console.log({ todo })
				yield api.UpdateTask(todo.id, {
					title: todo.title,
					done: todo.done,
					project_id: todo.project_id,
				})

				const response: ResponseWithData<ApiTask> = yield api.GetTask(
					todo.id
				)
				this.todos = this.todos.map(t =>
					t.id === todo.id ? response.data : t
				)
			} catch (error) {
				console.log(error)
			}
		},
	}

	makeAutoObservable(store)

	return store
}
