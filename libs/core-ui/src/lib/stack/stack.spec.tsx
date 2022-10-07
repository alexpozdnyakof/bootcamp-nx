import { screen, render } from '@testing-library/react'

import Stack from './stack'

describe('Stack', () => {
	it('should not set className from same name prop', () => {
		const { baseElement } = render(
			<Stack
				data-testid='stack'
				// @ts-expect-error test unavialable prop
				className='wrong'
			/>
		)
		expect(baseElement).toBeTruthy()
	})
	it('can be rendered as passed HTMLTAG element', () => {
		render(<Stack data-testid='stack' as='nav' />)
		expect(screen.getByTestId('stack').tagName).toBe('NAV')
	})
	it('renders its children as its content', () => {
		render(
			<Stack data-testid='stack'>
				<div>one</div>
				<div>two</div>
			</Stack>
		)
		expect(screen.getByTestId('stack').innerHTML).toMatchInlineSnapshot(
			`"<div>one</div><div>two</div>"`
		)
	})
	it('applies some extra class names corresponding to other layout-related props', () => {
		render(
			<Stack
				data-testid='stack'
				maxWidth='large'
				minWidth='small'
				padding='medium'
				border='primary'
				borderRadius='standard'
				background='highlight'
			/>
		)
		expect(screen.getByTestId('stack')).toHaveClass(
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
		it('allows to align its children to the start, center or end', () => {
			// no explicit alignment
			const { rerender } = render(<Stack data-testid='stack' />)
			expect(screen.getByTestId('stack')).not.toHaveClass('display-flex')
			expect(screen.getByTestId('stack')).not.toHaveClass(
				'flexDirection-column'
			)
			expect(screen.getByTestId('stack')).not.toHaveClass(
				'alignItems-center'
			)

			// aligned to the start (same as when there's no explicit alignment)
			rerender(<Stack data-testid='stack' align='start' />)
			expect(screen.getByTestId('stack')).not.toHaveClass('display-flex')
			expect(screen.getByTestId('stack')).not.toHaveClass(
				'flexDirection-column'
			)
			expect(screen.getByTestId('stack')).not.toHaveClass(
				'alignItems-center'
			)

			// aligned to the center
			rerender(<Stack data-testid='stack' align='center' />)
			expect(screen.getByTestId('stack')).toHaveClass('display-flex')
			expect(screen.getByTestId('stack')).toHaveClass(
				'flexDirection-column'
			)
			expect(screen.getByTestId('stack')).toHaveClass('alignItems-center')

			// aligned to the right
			rerender(<Stack data-testid='stack' align='end' />)
			expect(screen.getByTestId('stack')).toHaveClass('display-flex')
			expect(screen.getByTestId('stack')).toHaveClass(
				'flexDirection-column'
			)
			expect(screen.getByTestId('stack')).toHaveClass(
				'alignItems-flexEnd'
			)
		})

		it('supports specifying alignment based on viewport size', () => {
			render(
				<Stack
					data-testid='stack'
					align={{
						mobile: 'start',
						tablet: 'center',
						desktop: 'end',
					}}
				/>
			)
			expect(screen.getByTestId('stack')).toHaveClass('display-flex')
			expect(screen.getByTestId('stack')).toHaveClass(
				'flexDirection-column'
			)
			expect(screen.getByTestId('stack')).toHaveClass(
				'alignItems-flexStart'
			)
			expect(screen.getByTestId('stack')).toHaveClass(
				'tablet-alignItems-center'
			)
			expect(screen.getByTestId('stack')).toHaveClass(
				'desktop-alignItems-flexEnd'
			)
		})
	})
})
