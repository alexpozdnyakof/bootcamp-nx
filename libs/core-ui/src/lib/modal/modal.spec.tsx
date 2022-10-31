import { screen, render } from '@testing-library/react'

import Modal from './modal'

describe('Modal', () => {
	it('should render when modal open', () => {
		render(<Modal isOpen={false} data-testid='modalElement' />)
		expect(screen.queryByTestId('modalElement')).not.toBeInTheDocument()
	})

	it('should not render when modal not open', () => {
		render(<Modal isOpen={true} data-testid='modalElement' />)
		expect(screen.queryByTestId('modalElement')).toBeInTheDocument()
	})
})
