import { render } from '@testing-library/react'

import TaskForm from './task-form'

describe('TaskForm', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<TaskForm onCreate={title => 0} />)
		expect(baseElement).toBeTruthy()
	})

	it.todo('should call onCreate when enter pressed')
	it.todo('should call onCreate when create button clicked')
	it.todo('should not call onCreate when task title field is empty')
	it.todo('should disable create button when field is empty')
	it.todo('should clear input field when cancel clicked')
	it.todo('should disabled cancle button when field is empty')
})
