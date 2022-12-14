import { render, screen } from '@testing-library/react'

import Heading from './heading'

describe('Heading', () => {
	it('does not acknowledge the className prop', () => {
		render(
			<Heading
				level='1'
				data-testid='heading-element'
				// @ts-expect-error for test props passing when ts is not necessary
				className='wrong'
			>
				Heading
			</Heading>
		)
		expect(screen.getByTestId('heading-element')).not.toHaveClass('wrong')
	})

	it('renders the expected heading tag name based on the level', () => {
		const { rerender } = render(
			<Heading data-testid='heading-element' level='1'>
				Heading
			</Heading>
		)
		expect(screen.getByTestId('heading-element').tagName).toBe('H1')

		for (const level of [2, 3, 4, 5, 6] as const) {
			rerender(
				<Heading data-testid='heading-element' level={level}>
					Heading
				</Heading>
			)
			expect(screen.getByTestId('heading-element').tagName).toBe(
				`H${level}`
			)
		}
	})
	it('renders its children as its content', () => {
		render(
			<Heading level='1' data-testid='heading-element'>
				Hello <strong>world</strong>
			</Heading>
		)
		expect(
			screen.getByTestId('heading-element').innerHTML
		).toMatchInlineSnapshot(`"Hello <strong>world</strong>"`)
	})

	describe('size="…"', () => {
		it('adds the appropriate class names', () => {
			const { rerender } = render(
				<Heading level='1' data-testid='heading-element'>
					Heading
				</Heading>
			)
			const textElement = screen.getByTestId('heading-element')
			expect(textElement).not.toHaveClass('size-smaller')
			expect(textElement).not.toHaveClass('size-larger')
			expect(textElement).not.toHaveClass('size-largest')

			for (const size of ['smaller', 'larger', 'largest'] as const) {
				rerender(
					<Heading
						level={1}
						data-testid='heading-element'
						size={size}
					>
						Heading
					</Heading>
				)
				expect(textElement).toHaveClass(`size-${size}`)
			}
		})
	})
	describe('tone="…"', () => {
		it('adds the appropriate class names', () => {
			const { rerender } = render(
				<Heading level='1' data-testid='heading-element' tone='normal'>
					Heading
				</Heading>
			)
			const textElement = screen.getByTestId('heading-element')
			expect(textElement).not.toHaveClass('tone-normal')
			expect(textElement).not.toHaveClass('tone-secondary')
			expect(textElement).not.toHaveClass('tone-danger')
			expect(textElement).not.toHaveClass('tone-positive')

			for (const tone of ['secondary', 'danger', 'positive'] as const) {
				rerender(
					<Heading
						level='1'
						data-testid='heading-element'
						tone={tone}
					>
						Heading
					</Heading>
				)
				expect(textElement).toHaveClass(`tone-${tone}`)
			}
		})
	})
	describe('align="…"', () => {
		it('adds the appropriate class names', () => {
			const { rerender } = render(
				<Heading level='1' data-testid='heading-element'>
					Heading
				</Heading>
			)
			const textElement = screen.getByTestId('heading-element')
			expect(textElement).not.toHaveClass('textAlign-start')
			expect(textElement).not.toHaveClass('textAlign-center')
			expect(textElement).not.toHaveClass('textAlign-end')
			expect(textElement).not.toHaveClass('textAlign-justify')

			for (const align of [
				'start',
				'center',
				'end',
				'justify',
			] as const) {
				rerender(
					<Heading
						level='1'
						data-testid='heading-element'
						align={align}
					>
						Heading
					</Heading>
				)
				expect(textElement).toHaveClass(`textAlign-${align}`)
			}
		})
	})
	it('supports responsive values', () => {
		render(
			<Heading
				level='1'
				data-testid='heading-element'
				align={{
					mobile: 'start',
					tablet: 'center',
					desktop: 'end',
				}}
			>
				Heading
			</Heading>
		)
		const textElement = screen.getByTestId('heading-element')
		expect(textElement).toHaveClass('textAlign-start')
		expect(textElement).toHaveClass('tablet-textAlign-center')
		expect(textElement).toHaveClass('desktop-textAlign-end')
	})
})
