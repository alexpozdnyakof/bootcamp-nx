import { screen, render } from '@testing-library/react'
import { runSpaceTests } from '../test-helpers'

import Inline from './inline'

describe('Inline', () => {
	it('can be rendered as any HTML element', () => {
		render(<Inline data-testid='inline' as='nav' />)
		expect(screen.getByTestId('inline').tagName).toBe('NAV')
	})

	it('applies some extra class names corresponding to other layout-related props', () => {
		render(
			<Inline
				data-testid='inline'
				maxWidth='large'
				minWidth='small'
				padding='medium'
				border='primary'
				borderRadius='standard'
				background='highlight'
			/>
		)
		expect(screen.getByTestId('inline')).toHaveClass(
			'Box',
			'minWidth-small',
			'maxWidth-large',
			'paddingTop-medium',
			'paddingRight-medium',
			'paddingBottom-medium',
			'paddingLeft-medium',
			'bg-highlight',
			'borderRadius-standard',
			'border-primary'
		)
	})
	describe('align', () => {
		it('specifies how to align items horizontally', () => {
			// test with no explicit alignment first
			const { rerender } = render(<Inline data-testid='container' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'justifyContent-flexStart'
			)

			// left-aligned horizontally
			rerender(<Inline data-testid='container' align='left' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'justifyContent-flexStart'
			)

			// centered horizontally
			rerender(<Inline data-testid='container' align='center' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'justifyContent-center'
			)

			// right-aligned horizontally
			rerender(<Inline data-testid='container' align='right' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'justifyContent-flexEnd'
			)
		})

		it('supports specifying a responsive value', () => {
			render(
				<Inline
					data-testid='container'
					align={{
						mobile: 'left',
						tablet: 'center',
						desktop: 'right',
					}}
				/>
			)
			expect(screen.getByTestId('container')).toHaveClass(
				'justifyContent-flexStart',
				'tablet-justifyContent-center',
				'desktop-justifyContent-flexEnd'
			)
		})
	})

	describe('alignY', () => {
		it('specifies how to align items vertically', () => {
			// test with no explicit alignment first
			const { rerender } = render(<Inline data-testid='container' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'alignItems-center'
			)

			// top-aligned vertically
			rerender(<Inline data-testid='container' alignY='top' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'alignItems-flexStart'
			)

			// centered vertically
			rerender(<Inline data-testid='container' alignY='center' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'alignItems-center'
			)

			// bottom-aligned vertically
			rerender(<Inline data-testid='container' alignY='bottom' />)
			expect(screen.getByTestId('container')).toHaveClass(
				'alignItems-flexEnd'
			)
		})

		it('supports specifying a responsive value', () => {
			render(
				<Inline
					data-testid='container'
					alignY={{
						mobile: 'top',
						tablet: 'center',
						desktop: 'bottom',
					}}
				/>
			)
			expect(screen.getByTestId('container')).toHaveClass(
				'alignItems-flexStart',
				'tablet-alignItems-center',
				'desktop-alignItems-flexEnd'
			)
		})
	})

	runSpaceTests(Inline)
})
