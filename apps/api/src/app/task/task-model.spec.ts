import TaskModel from './task-model'
describe('TaskModel', () => {
	it('should return all tasks', async () => {
		await expect(TaskModel.GetAll()).resolves.toMatchSnapshot()
	})

	it('should return task with id 1', async () => {
		await expect(TaskModel.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing task', async () => {
		await expect(TaskModel.GetOne(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})
	it('should create new one task', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}
		try {
			const pre = await TaskModel.GetAll()
			await TaskModel.Add(dto)
			const past = await TaskModel.GetAll()

			expect(past).toHaveLength(pre.length + 1)
			expect(past[past.length - 1]).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				done: false,
				title: '新しい計画',
				id: 4,
			})
		} catch (e) {
			console.log(e)
		}
	})
	it('should delete task with id 3', async () => {
		const pre = await TaskModel.GetAll()
		await TaskModel.Delete(3)

		const past = await TaskModel.GetAll()
		expect(past).toHaveLength(pre.length - 1)
		await expect(TaskModel.GetOne(3)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should rejects when delete non-existing task ', async () => {
		await expect(TaskModel.Delete(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			done: true,
		}

		let { title, done } = await TaskModel.GetOne(1)

		expect({ title, done }).not.toEqual(dto)

		await TaskModel.Update(1, dto)
		;({ title, done } = await TaskModel.GetOne(1))

		expect({ title, done }).not.toEqual(dto)
	})

	it('should rejects when update non-existing task ', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}

		await expect(TaskModel.Update(10, dto)).rejects.toEqual(
			new Error('Not Found')
		)
	})
})
