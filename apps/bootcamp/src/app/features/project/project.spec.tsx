import { render } from '@testing-library/react'

import { Project } from './project'

describe('Project', () => {
	xit('should render successfully', () => {
		const { baseElement } = render(<Project />)
		expect(baseElement).toBeTruthy()
	})
})
