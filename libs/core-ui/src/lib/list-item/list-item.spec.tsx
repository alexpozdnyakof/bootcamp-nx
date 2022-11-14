import { render, screen } from '@testing-library/react'
import { Box } from '../box'

import ListItem from './list-item'

describe('ListItem', () => {
	it('should render successfully', () => {
		render(<ListItem />)

		expect(screen.getByRole('listitem')).toBeInTheDocument()
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
			<ListItem
				actions={<Box data-testid='deleteAction' />}
				startActions={<Box data-testid='dragAction' />}
			>
				text
			</ListItem>
		)

		expect(screen.getByTestId('deleteAction')).toBeInTheDocument()
		expect(screen.getByTestId('dragAction')).toBeInTheDocument()
	})

	it('should can be not hoverable', () => {
		render(<ListItem hoverable={false}>text</ListItem>)

		expect(screen.getByRole('listitem')).not.toHaveClass(
			'listItem_hoverable'
		)
	})

	it('should can be selected', () => {
		render(<ListItem selected={true}>text</ListItem>)

		expect(screen.getByRole('listitem')).toHaveClass('listItem_selected')
	})
})
