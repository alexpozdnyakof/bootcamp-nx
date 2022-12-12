import { render } from '@testing-library/react'

import TaskList from './task-list'

describe('TaskList', () => {
	xit('should render successfully', () => {
		const { baseElement } = render(<TaskList />)
		expect(baseElement).toBeTruthy()
	})
})
