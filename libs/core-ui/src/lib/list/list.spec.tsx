import { screen, render } from '@testing-library/react'
import { ListItem } from '../list-item'

import List from './list'

const itemsJp = [
	'零一三 二,十,卄',
	'卄, 廾, 廿 四五六',
	'七八九 三十, 卅, 丗',
	'二,十,卄 三 二,十',
	'卄, 廾, 廿 七八九',
	'三十, 卅, 丗',
]

describe('List', () => {
	it('should render successfully', () => {
		render(<List />)
		expect(screen.getByRole('list')).toBeInTheDocument()
	})

	it('should render all items', () => {
		render(
			<List>
				{itemsJp.map(item => (
					<ListItem key={item}>{item}</ListItem>
				))}
			</List>
		)
		itemsJp.forEach(item =>
			expect(screen.getByText(item)).toBeInTheDocument()
		)

		expect(screen.getAllByRole('listitem')).toHaveLength(itemsJp.length)
	})
})
