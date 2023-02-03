import { render } from '@testing-library/react'
import MenuItem from '../menu-item/menu-item'

import Menu from './menu'
const items = ['x0', 'x1', 'x2', 'x3']
describe('Menu', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Menu>
				{items.map(item => (
					<MenuItem>{item}</MenuItem>
				))}
			</Menu>
		)
		expect(baseElement).toBeTruthy()
	})
})
