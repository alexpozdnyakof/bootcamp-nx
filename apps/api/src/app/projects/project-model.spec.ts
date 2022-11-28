import ProjectModel from './project-model'
describe('ProjectModel', () => {
	it('should return all projects', async () => {
		await expect(ProjectModel.GetAll()).resolves.toMatchSnapshot()
	})

	it('should return project with id 1', async () => {
		await expect(ProjectModel.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing project', async () => {
		await expect(ProjectModel.GetOne(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should create new one project', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			const pre = await ProjectModel.GetAll()
			await ProjectModel.Add(dto)
			const past = await ProjectModel.GetAll()

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
		const pre = await ProjectModel.GetAll()
		await ProjectModel.Delete(3)

		const past = await ProjectModel.GetAll()
		expect(past).toHaveLength(pre.length - 1)
		await expect(ProjectModel.GetOne(3)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should rejects when delete non-existing project ', async () => {
		await expect(ProjectModel.Delete(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		let { title, description } = await ProjectModel.GetOne(1)

		expect({ title, description }).not.toEqual(dto)

		await ProjectModel.Update(1, dto)
		;({ title, description } = await ProjectModel.GetOne(1))

		expect({ title, description }).not.toEqual(dto)
	})

	it('should rejects when update non-existing project ', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		await expect(ProjectModel.Update(10, dto)).rejects.toEqual(
			new Error('Not Found')
		)
	})
})
