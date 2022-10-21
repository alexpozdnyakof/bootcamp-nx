import { screen, render } from '@testing-library/react'

import KeyboardShorcut from './keyboard-shortcut'

describe('KeyboardShorcut', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<KeyboardShorcut>cmd</KeyboardShorcut>)
		expect(baseElement).toBeTruthy()
	})
	it('should render multiple keys', () => {
		render(<KeyboardShorcut>{['cmd', 'shift']}</KeyboardShorcut>)

		expect(screen.getByText('Cmd')).toBeInTheDocument()
		expect(screen.getByText('Shift')).toBeInTheDocument()
	})
	it('should capitalize special keys', () => {
		render(
			<KeyboardShorcut>
				{['mod', 'cmd', 'alt', 'shift', 'ctrl', 'control', 'space']}
			</KeyboardShorcut>
		)
		expect(screen.getByText('Mod')).toBeInTheDocument()
		expect(screen.getByText('Cmd')).toBeInTheDocument()
		expect(screen.getByText('Alt')).toBeInTheDocument()
		expect(screen.getByText('Shift')).toBeInTheDocument()
		expect(screen.getByText('Ctrl')).toBeInTheDocument()
		expect(screen.getByText('Control')).toBeInTheDocument()
		expect(screen.getByText('Space')).toBeInTheDocument()
	})

	it('should capitalize keys with modifiers', () => {
		render(
			<KeyboardShorcut>
				{[
					'mod + z',
					'cmd + x',
					'alt + y',
					'shift + c',
					'ctrl + v',
					'control + b',
				]}
			</KeyboardShorcut>
		)
		expect(screen.getByText('Z')).toBeInTheDocument()
		expect(screen.getByText('X')).toBeInTheDocument()
		expect(screen.getByText('Y')).toBeInTheDocument()
		expect(screen.getByText('C')).toBeInTheDocument()
		expect(screen.getByText('V')).toBeInTheDocument()
		expect(screen.getByText('B')).toBeInTheDocument()
	})
})
