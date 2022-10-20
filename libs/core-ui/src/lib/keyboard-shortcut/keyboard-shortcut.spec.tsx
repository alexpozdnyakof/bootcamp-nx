import { screen, render } from '@testing-library/react'

import KeyboardShorcut from './keyboard-shortcut'

describe('KeyboardShorcut', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<KeyboardShorcut>cmd</KeyboardShorcut>)
		expect(baseElement).toBeTruthy()
	})
	it('should render multiple keys', () => {
		render(<KeyboardShorcut>{['cmd', 'shift']}</KeyboardShorcut>)

		expect(screen.getByText('cmd')).toBeInTheDocument()
		expect(screen.getByText('shift')).toBeInTheDocument()
	})
	it('should render every shortcut in own kbd element', () => {
		render(
			<KeyboardShorcut>{['Cmd + Alt + Shift + e', 'q']}</KeyboardShorcut>
		)

		expect(screen.getByText('Cmd')).toBeInTheDocument()
		expect(screen.getByText('Alt')).toBeInTheDocument()
		expect(screen.getByText('Shift')).toBeInTheDocument()
		expect(screen.getByText('e')).toBeInTheDocument()
		expect(screen.getByText('q')).toBeInTheDocument()
	})
})
