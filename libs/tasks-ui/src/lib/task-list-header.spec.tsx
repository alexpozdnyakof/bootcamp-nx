import { render } from '@testing-library/react'

import TaskListHeader from './task-list-header'

describe('TaskListHeader', () => {
	xit('should render successfully', () => {
		const { baseElement } = render(<TaskListHeader>title</TaskListHeader>)
		expect(baseElement).toBeTruthy()
	})
})
