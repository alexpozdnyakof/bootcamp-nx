import { screen, render } from '@testing-library/react'

import Text from './text'

describe('Text', () => {
	it('should not set className via the prop ', () => {
		render(
			<Text
				data-testid='text-element'
				// @ts-expect-error test classnam prop
				className='wrong'
			>
				Text
			</Text>
		)
		expect(screen.getByTestId('text-element')).not.toHaveClass('right')
	})
	it('should render as passed HTMLTAG element', () => {
		render(
			<Text data-testid='text-element' as='nav'>
				Text
			</Text>
		)
		expect(screen.getByTestId('text-element').tagName).toBe('NAV')
	})
	it('renders children as content', () => {
		render(
			<Text data-testid='text-element'>
				Hello <strong>world</strong>
			</Text>
		)
		expect(
			screen.getByTestId('text-element').innerHTML
		).toMatchInlineSnapshot(`"Hello <strong>world</strong>"`)
	})
	it('should adds size appropriate class names', () => {
		const { rerender } = render(
			<Text data-testid='text-element'>Text</Text>
		)
		const textElement = screen.getByTestId('text-element')

		const sizes = ['caption', 'copy', 'subtitle'] as const

		expect(textElement).not.toHaveClass('size-body')
		sizes.forEach(size => {
			expect(textElement).not.toHaveClass('size-'.concat(size))
		})

		sizes.forEach(size => {
			rerender(
				<Text data-testid='text-element' size={size}>
					Text
				</Text>
			)
			expect(textElement).toHaveClass('size-'.concat(size))
		})
	})
	it('should adds weight appropriate class names', () => {
		const { rerender } = render(
			<Text data-testid='text-element'>Text</Text>
		)
		const textElement = screen.getByTestId('text-element')

		const weights = ['semibold', 'bold'] as const

		expect(textElement).not.toHaveClass('weight-regular')
		weights.forEach(weight => {
			expect(textElement).not.toHaveClass('weight-'.concat(weight))
		})

		weights.forEach(weight => {
			rerender(
				<Text data-testid='text-element' weight={weight}>
					Text
				</Text>
			)
			expect(textElement).toHaveClass('weight-'.concat(weight))
		})
	})

	it('should adds tone appropriate class names', () => {
		const { rerender } = render(
			<Text data-testid='text-element'>Text</Text>
		)
		const textElement = screen.getByTestId('text-element')
		expect(textElement).not.toHaveClass('tone-normal')
		expect(textElement).not.toHaveClass('tone-secondary')
		expect(textElement).not.toHaveClass('tone-danger')

		for (const tone of ['secondary', 'danger'] as const) {
			rerender(
				<Text data-testid='text-element' tone={tone}>
					Text
				</Text>
			)
			expect(textElement).toHaveClass('tone-'.concat(tone))
		}
	})

	describe('align property', () => {
		it('adds the appropriate class names', () => {
			const { rerender } = render(
				<Text data-testid='text-element'>Text</Text>
			)
			const textElement = screen.getByTestId('text-element')
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
					<Text data-testid='text-element' align={align}>
						Text
					</Text>
				)
				expect(textElement).toHaveClass('textAlign-'.concat(align))
			}
		})
		it('supports responsive values', () => {
			render(
				<Text
					data-testid='text-element'
					align={{
						mobile: 'start',
						tablet: 'center',
						desktop: 'end',
					}}
				>
					Text
				</Text>
			)
			const textElement = screen.getByTestId('text-element')
			expect(textElement).toHaveClass('textAlign-start')
			expect(textElement).toHaveClass('tablet-textAlign-center')
			expect(textElement).toHaveClass('desktop-textAlign-end')
		})
	})
	describe('lineClamp="…"', () => {
		it('adds the expected class names', () => {
			const { rerender } = render(
				<Text data-testid='text-element'>Text</Text>
			)
			const textElement = screen.getByTestId('text-element')
			expect(textElement.className).not.toMatch(/lineClamp/)

			for (const lineClamp of [1, '1'] as const) {
				rerender(
					<Text data-testid='text-element' lineClamp={lineClamp}>
						Text
					</Text>
				)
				expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
				expect(textElement).not.toHaveClass(`lineClampMultipleLines`)
			}

			for (const lineClamp of [2, 3, 4, 5, '2', '3', '4', '5'] as const) {
				rerender(
					<Text data-testid='text-element' lineClamp={lineClamp}>
						Text
					</Text>
				)
				expect(textElement).toHaveClass(`lineClamp-${lineClamp}`)
				expect(textElement).toHaveClass(`lineClampMultipleLines`)
			}
		})
	})
})
