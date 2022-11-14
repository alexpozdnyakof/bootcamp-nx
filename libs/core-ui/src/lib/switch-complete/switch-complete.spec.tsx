import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SwitchComplete from './switch-complete'

describe('SwitchComplete', () => {
	it('should render successfully', () => {
		render(<SwitchComplete aria-label='液' />)
		expect(screen.getByRole('switch', { name: '液' })).toBeTruthy()
	})

	it('should be checked', () => {
		const { rerender } = render(<SwitchComplete aria-label='液' />)
		expect(screen.getByRole('switch', { name: '液' })).not.toBeChecked()

		rerender(<SwitchComplete aria-label='液' done />)
		expect(screen.getByRole('switch', { name: '液' })).toBeChecked()
	})

	it('should call onChange callback', async () => {
		const onClick = jest.fn()
		render(<SwitchComplete aria-label='液' onClick={onClick} />)
		await userEvent.click(screen.getByRole('switch', { name: '液' }))

		expect(onClick).toBeCalled()
	})

	it('should can be disablable', () => {
		const { rerender } = render(<SwitchComplete aria-label='液' />)
		expect(screen.getByRole('switch', { name: '液' })).not.toBeDisabled()

		rerender(<SwitchComplete aria-label='液' disabled />)
		expect(screen.getByRole('switch', { name: '液' })).toBeDisabled()
	})
})
