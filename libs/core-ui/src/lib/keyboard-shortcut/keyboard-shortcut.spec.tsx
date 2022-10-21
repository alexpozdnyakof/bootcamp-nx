import { screen, render } from '@testing-library/react'

import KeyboardShortcut from './keyboard-shortcut'

describe('KeyboardShorcut', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<KeyboardShortcut>cmd</KeyboardShortcut>)
		expect(baseElement).toBeTruthy()
	})
	it('should render multiple keys', () => {
		render(<KeyboardShortcut>{['cmd + e', 'shift', 'q']}</KeyboardShortcut>)

		expect(screen.getByText('Cmd')).toBeInTheDocument()
		expect(screen.getByText('Shift')).toBeInTheDocument()
		expect(screen.getByText('E')).toBeInTheDocument()
		expect(screen.getByText('q')).toBeInTheDocument()
	})
	it('should capitalize special keys', () => {
		render(
			<KeyboardShortcut>
				{['mod', 'cmd', 'alt', 'shift', 'ctrl', 'control', 'space']}
			</KeyboardShortcut>
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
			<KeyboardShortcut>
				{[
					'mod + z',
					'cmd + x',
					'alt + y',
					'shift + c',
					'ctrl + v',
					'control + b',
				]}
			</KeyboardShortcut>
		)
		expect(screen.getByText('Z')).toBeInTheDocument()
		expect(screen.getByText('X')).toBeInTheDocument()
		expect(screen.getByText('Y')).toBeInTheDocument()
		expect(screen.getByText('C')).toBeInTheDocument()
		expect(screen.getByText('V')).toBeInTheDocument()
		expect(screen.getByText('B')).toBeInTheDocument()
	})
	it('should translate special keys for mac', () => {
		render(
			<KeyboardShortcut isMac={true}>
				{['mod', 'cmd', 'alt', 'shift', 'ctrl', 'control', 'space']}
			</KeyboardShortcut>
		)
		expect(screen.getAllByText('⌘')).toHaveLength(2)
		expect(screen.getByText('⌥')).toBeInTheDocument()
		expect(screen.getByText('⇧')).toBeInTheDocument()
		expect(screen.getAllByText('⌃')).toHaveLength(2)
		expect(screen.getByText('␣')).toBeInTheDocument()
	})
})
