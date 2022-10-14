import { render } from '@testing-library/react'

import Textarea from './text-area'

describe('Textarea', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Textarea />)
		expect(baseElement).toBeTruthy()
	})
})
