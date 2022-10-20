import { render } from '@testing-library/react'

import KeyboardShorcut from './keyboard-shorcut'

describe('KeyboardShorcut', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<KeyboardShorcut />)
		expect(baseElement).toBeTruthy()
	})
})
