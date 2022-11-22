import ProjectModel from './project-model'
describe('ProjectModel', () => {
	const projectModel = ProjectModel()

	it('should return all projects', async () => {
		await expect(projectModel.get()).resolves.toMatchSnapshot()
	})

	it('should return project with id 1', async () => {
		await expect(projectModel.findById(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing project', async () => {
		await expect(projectModel.findById(10)).rejects.toBe('Not Found')
	})

	it('should create new one project', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			const pre = await projectModel.get()
			await projectModel.create(dto)
			const past = await projectModel.get()

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

	it('should delete project with id 3', async () => {
		const pre = await projectModel.get()
		await projectModel.delete(3)

		const past = await projectModel.get()
		expect(past).toHaveLength(pre.length - 1)
		await expect(projectModel.findById(3)).rejects.toBe('Not Found')
	})

	it('should rejects when delete non-existing project ', async () => {
		await expect(projectModel.delete(10)).rejects.toEqual('Not Found')
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		let { title, description } = await projectModel.findById(1)

		expect({ title, description }).not.toEqual(dto)

		await projectModel.update(1, dto)
		;({ title, description } = await projectModel.findById(1))

		expect({ title, description }).not.toEqual(dto)
	})

	it('should rejects when update non-existing project ', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		await expect(projectModel.update(10, dto)).rejects.toEqual('Not Found')
	})
})
