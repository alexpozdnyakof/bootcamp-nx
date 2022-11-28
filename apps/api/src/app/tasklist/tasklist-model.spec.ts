import TaskListModel from './tasklist-model'
describe('TaskListModel', () => {
	it('should return all tasks', async () => {
		await expect(TaskListModel.GetAll()).resolves.toMatchSnapshot()
	})

	it('should return task with id 1', async () => {
		await expect(TaskListModel.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing task', async () => {
		await expect(TaskListModel.GetOne(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should create new one task', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			const pre = await TaskListModel.GetAll()
			await TaskListModel.Add(dto)
			const past = await TaskListModel.GetAll()

			expect(past).toHaveLength(pre.length + 1)
			expect(past[past.length - 1]).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				...dto,
				id: expect.any(Number),
			})
		} catch (e) {
			console.log(e)
		}
	})

	it('should delete task with id 3', async () => {
		const pre = await TaskListModel.GetAll()
		await TaskListModel.Delete(3)

		const past = await TaskListModel.GetAll()
		expect(past).toHaveLength(pre.length - 1)
		await expect(TaskListModel.GetOne(3)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should rejects when delete non-existing task ', async () => {
		await expect(TaskListModel.Delete(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		let { title, description } = await TaskListModel.GetOne(1)

		expect({ title, description }).not.toEqual(dto)

		await TaskListModel.Update(1, dto)
		;({ title, description } = await TaskListModel.GetOne(1))

		expect({ title, description }).not.toEqual(dto)
	})

	it('should rejects when update non-existing task ', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		await expect(TaskListModel.Update(10, dto)).rejects.toEqual(
			new Error('Not Found')
		)
	})
})
