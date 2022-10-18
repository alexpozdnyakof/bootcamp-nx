import { render } from '@testing-library/react'

import Task from './task'

describe('Task', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Task
				{...{
					done: false,
					id: 1,
					text: 'New Todo',
					onClick: () => 0,
				}}
			/>
		)
		expect(baseElement).toBeTruthy()
	})

	it.todo('should show icon when completed')
	it.todo('should render task text')
	it.todo('should call onClick handler')
})
