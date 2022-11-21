import ProjectModel from './project-model'
describe('ProjectModel', () => {
	const projectModel = ProjectModel()

	it('should return all projects', async () => {
		await expect(projectModel.get()).resolves.toMatchSnapshot()
	})
	it('should return project with id 1', async () => {
		await expect(projectModel.findById(1)).resolves.toMatchSnapshot()
	})
})
