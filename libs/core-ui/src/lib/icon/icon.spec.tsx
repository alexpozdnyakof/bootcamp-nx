import { screen, render } from '@testing-library/react'

import Icon from './icon'

describe('Icon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Icon>delete</Icon>)
		expect(baseElement).toBeTruthy()
	})

	it('should be medium size by default', () => {
		render(<Icon data-testid='iconElement'>delete</Icon>)

		expect(screen.getByTestId('iconElement')).toHaveClass('Icon_medium')
	})

	it('should set small size', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('Icon_small')

		rerender(
			<Icon data-testid='iconElement' size='small'>
				delete
			</Icon>
		)

		expect(iconElement).toHaveClass('Icon_small')
	})

	it('should set large size', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('Icon_large')

		rerender(
			<Icon data-testid='iconElement' size='large'>
				delete
			</Icon>
		)

		expect(iconElement).toHaveClass('Icon_large')
	})
})
