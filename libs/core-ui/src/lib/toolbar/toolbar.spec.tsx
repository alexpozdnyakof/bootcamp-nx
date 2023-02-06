import { screen, render } from '@testing-library/react'

import Toolbar from './toolbar'

describe('Toolbar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<Toolbar>
				<button>ツールバー</button>
			</Toolbar>
		)
		expect(baseElement).toBeTruthy()
	})

	it('should set medium height', () => {
		const { rerender } = render(
			<Toolbar data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		const toolbar = screen.getByTestId('toolbar')

		expect(toolbar).not.toHaveClass('toolbar_dense')

		rerender(
			<Toolbar dense data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		expect(toolbar).toHaveClass('toolbar_dense')
	})
})
