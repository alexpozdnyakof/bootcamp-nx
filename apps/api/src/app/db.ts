import { TaskDataUnit, TaskListDataUnit } from './data-unit'

const TaskListDataUnit: TaskListDataUnit = {
	id: 2,
	parentId: 1,
	properties: {
		title: '素晴らしいタスクリスト',
		created: Date.now(),
		updated: Date.now(),
	},
	type: 'task_list',
	children: [4, 5, 6, 7],
}

const TaskDataUnit: TaskDataUnit = {
	id: 4,
	parentId: 2,
	properties: {
		text: '素晴らしいタスクリスト',
		done: false,
		created: Date.now(),
		updated: Date.now(),
	},
	type: 'task',
	children: [],
}
