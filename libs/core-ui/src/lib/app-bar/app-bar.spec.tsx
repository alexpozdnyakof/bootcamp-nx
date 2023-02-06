import { screen, render } from '@testing-library/react'

import AppBar from './app-bar'

describe('AppBar', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<AppBar>見出し</AppBar>)
		expect(baseElement).toBeTruthy()
	})
	it('should add position', () => {
		render(<AppBar>見出し</AppBar>)
	})

	it('should add position class name', () => {
		const { rerender } = render(
			<AppBar aria-label='app-bar'>見出し</AppBar>
		)

		const appBarElement = screen.getByRole('banner')
		expect(appBarElement).not.toHaveClass('position-relative')
		expect(appBarElement).not.toHaveClass('position-absolute')
		expect(appBarElement).not.toHaveClass('position-fixed')
		expect(appBarElement).not.toHaveClass('position-sticky')

		rerender(<AppBar position='absolute'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`position-absolute`)

		rerender(<AppBar position='relative'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`position-relative`)

		rerender(<AppBar position='sticky'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`position-sticky`)

		rerender(<AppBar position='fixed'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`position-fixed`)
	})

	it('should add background', () => {
		const { rerender } = render(
			<AppBar aria-label='app-bar'>見出し</AppBar>
		)
		const appBarElement = screen.getByRole('banner')
		expect(appBarElement).not.toHaveClass('bg-default')
		expect(appBarElement).not.toHaveClass('bg-aside')
		expect(appBarElement).not.toHaveClass('bg-action')
		expect(appBarElement).not.toHaveClass('bg-highlight')
		expect(appBarElement).not.toHaveClass('bg-selected')

		rerender(<AppBar background='action'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-action`)

		rerender(<AppBar background='default'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-default`)

		rerender(<AppBar background='aside'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-aside`)

		rerender(<AppBar background='action'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-action`)

		rerender(<AppBar background='highlight'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-highlight`)

		rerender(<AppBar background='selected'>見出し</AppBar>)
		expect(appBarElement).toHaveClass(`bg-selected`)
	})
})
