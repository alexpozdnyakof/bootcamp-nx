import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MenuItem from './menu-item'

describe('MenuItem', () => {
	it('should render successfully', () => {
		render(<MenuItem aria-label='液'>液</MenuItem>)
		expect(screen.getByRole('menuitem', { name: '液' })).toBeTruthy()
	})

	it('should set selected', () => {
		const { rerender } = render(<MenuItem aria-label='液'>液</MenuItem>)
		const menuItemElement = screen.getByRole('menuitem', { name: '液' })
		expect(menuItemElement).not.toHaveClass('menu-item_selected')

		rerender(
			<MenuItem aria-label='液' selected>
				液
			</MenuItem>
		)
		expect(menuItemElement).toHaveClass('menu-item_selected')
	})

	it('should run callback when clicked', async () => {
		const onClick = jest.fn()
		render(
			<MenuItem aria-label='液' onClick={onClick}>
				液
			</MenuItem>
		)

		await userEvent.click(screen.getByRole('menuitem', { name: '液' }))
		expect(onClick).toHaveBeenCalled()
	})
})
