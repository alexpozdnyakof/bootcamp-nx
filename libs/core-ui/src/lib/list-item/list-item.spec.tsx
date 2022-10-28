import { render, screen } from '@testing-library/react'
import { Box } from '../box'

import ListItem from './list-item'

describe('ListItem', () => {
	it('should render successfully', () => {
		render(<ListItem data-testid='list' />)

		expect(screen.getByTestId('list')).toBeInTheDocument()
	})

	it('should render children', () => {
		render(
			<ListItem>
				<Box data-testid='children' />
			</ListItem>
		)

		expect(screen.getByTestId('children')).toBeInTheDocument()
	})

	it('should render actions', () => {
		render(
			<ListItem actions={<Box data-testid='deleteAction' />}>
				text
			</ListItem>
		)

		expect(screen.getByTestId('deleteAction')).toBeInTheDocument()
	})
})
