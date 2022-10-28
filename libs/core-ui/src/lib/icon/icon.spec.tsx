import { screen, render } from '@testing-library/react'
import Icon from './icon'

describe('Icon', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Icon>delete</Icon>)
		expect(baseElement).toBeTruthy()
	})

	it('should be medium size by default', () => {
		render(<Icon data-testid='iconElement'>delete</Icon>)

		expect(screen.getByTestId('iconElement')).toHaveClass('size-medium')
	})

	it('should set small size', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('size-small')

		rerender(
			<Icon data-testid='iconElement' size='small'>
				delete
			</Icon>
		)

		expect(iconElement).toHaveClass('size-small')
	})

	it('should set large size', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('size-large')

		rerender(
			<Icon data-testid='iconElement' size='large'>
				delete
			</Icon>
		)

		expect(iconElement).toHaveClass('size-large')
	})

	it('should set normal tone by default', () => {
		render(<Icon data-testid='iconElement'>delete</Icon>)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('tone-secondary')
		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).toHaveClass('tone-normal')
	})

	it('should set secondary tone', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).not.toHaveClass('tone-secondary')

		rerender(
			<Icon data-testid='iconElement' tone='secondary'>
				delete
			</Icon>
		)

		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).toHaveClass('tone-secondary')
	})

	it('should set positive tone', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).not.toHaveClass('tone-secondary')

		rerender(
			<Icon data-testid='iconElement' tone='positive'>
				delete
			</Icon>
		)

		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).toHaveClass('tone-positive')
		expect(iconElement).not.toHaveClass('tone-secondary')
	})

	it('should set positive tone', () => {
		const { rerender } = render(
			<Icon data-testid='iconElement'>delete</Icon>
		)
		const iconElement = screen.getByTestId('iconElement')

		expect(iconElement).not.toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).not.toHaveClass('tone-secondary')

		rerender(
			<Icon data-testid='iconElement' tone='danger'>
				delete
			</Icon>
		)

		expect(iconElement).toHaveClass('tone-danger')
		expect(iconElement).not.toHaveClass('tone-positive')
		expect(iconElement).not.toHaveClass('tone-secondary')
	})
})
