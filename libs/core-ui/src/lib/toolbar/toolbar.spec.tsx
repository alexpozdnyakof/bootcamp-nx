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

	it('should set height', () => {
		const { rerender } = render(
			<Toolbar data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		const toolbar = screen.getByTestId('toolbar')

		expect(toolbar).not.toHaveClass('size-dense')
		expect(toolbar).not.toHaveClass('size-large')

		rerender(
			<Toolbar size='dense' data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		expect(toolbar).toHaveClass('size-dense')
		expect(toolbar).not.toHaveClass('size-large')

		rerender(
			<Toolbar size='large' data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		expect(toolbar).not.toHaveClass('size-dense')
		expect(toolbar).toHaveClass('size-large')
	})

	it('should set gutters', () => {
		const { rerender } = render(
			<Toolbar data-testid='toolbar'>
				<button>ツールバー</button>
			</Toolbar>
		)
		const toolbar = screen.getByTestId('toolbar')

		expect(toolbar).not.toHaveClass('gutter-xsmall')
		expect(toolbar).not.toHaveClass('gutter-small')
		expect(toolbar).not.toHaveClass('gutter-medium')
		expect(toolbar).not.toHaveClass('gutter-large')
		expect(toolbar).not.toHaveClass('gutter-xlarge')
		expect(toolbar).not.toHaveClass('gutter-xxlarge')

		for (const gutter of [
			'xsmall',
			'small',
			'medium',
			'large',
			'xlarge',
			'xxlarge',
		] as const) {
			rerender(
				<Toolbar data-testid='toolbar' gutter={gutter}>
					<button>ツールバー</button>
				</Toolbar>
			)

			expect(toolbar).toHaveClass(`gutter-${gutter}`)
		}
	})
})
