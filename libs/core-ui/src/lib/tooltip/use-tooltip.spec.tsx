import { screen, render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { isValidElement } from 'react'

import { Button } from '../button'

import useTooltip from './use-tooltip'

describe('useTooltip', () => {
	function WithTooltipHook() {
		const { anchor, position } = useTooltip(<Button>私を指して</Button>)

		return (
			<>
				{anchor}
				<div data-testid='position'>{JSON.stringify(position)}</div>
			</>
		)
	}

	it('should return valid anchor', () => {
		const { result } = renderHook(() =>
			useTooltip(<Button>私を指して</Button>)
		)

		expect(isValidElement(result.current.anchor)).toBeTruthy()
	})

	it('should have null position by default', () => {
		render(<WithTooltipHook />)

		expect(screen.getByTestId('position')).toHaveTextContent('null')
	})

	it('should set position when mouseOver', async () => {
		Element.prototype['getBoundingClientRect'] = jest.fn(
			() =>
				({
					x: 120,
					y: 32,
					width: 48,
					height: 32,
				} as DOMRect)
		)

		render(<WithTooltipHook />)

		expect(screen.getByTestId('position')).toHaveTextContent('null')

		const buttonElement = screen.getByRole('button', { name: '私を指して' })
		await userEvent.hover(buttonElement)

		expect(screen.getByTestId('position')).toHaveTextContent(
			'{"x":104,"y":64}'
		)
	})

	it('should set position as null when mouseOut', async () => {
		render(<WithTooltipHook />)

		const positionResult = screen.getByTestId('position')
		expect(positionResult).toHaveTextContent('null')

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		await userEvent.hover(buttonElement)
		expect(positionResult).not.toHaveTextContent('null')

		await userEvent.unhover(buttonElement)
		expect(positionResult).toHaveTextContent('null')
	})

	it('should ignore mouse when anchor element is focused', async () => {
		render(<WithTooltipHook />)

		const positionResult = screen.getByTestId('position')
		expect(positionResult).toHaveTextContent('null')

		const buttonElement = screen.getByRole('button', { name: '私を指して' })

		// lock mouse events trigger state
		await userEvent.tab()
		expect(buttonElement).toHaveFocus()
		expect(positionResult).not.toHaveTextContent('null')

		await userEvent.hover(buttonElement)
		await userEvent.unhover(buttonElement)
		expect(positionResult).not.toHaveTextContent('null')

		// unlock mouse events trigger state
		await userEvent.tab()
		expect(buttonElement).not.toHaveFocus()

		await userEvent.hover(buttonElement)
		expect(positionResult).not.toHaveTextContent('null')

		await userEvent.unhover(buttonElement)
		expect(positionResult).toHaveTextContent('null')
	})
})
