import { render } from '@testing-library/react'

import TaskList from './task-list'

describe('TodoList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskList tasks={[]} />)
		expect(baseElement).toBeTruthy()
	})
})
