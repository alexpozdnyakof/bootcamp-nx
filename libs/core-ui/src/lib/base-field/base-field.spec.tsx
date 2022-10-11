import { render } from '@testing-library/react'

import BaseField from './base-field'

describe('BaseField', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<BaseField />)
		expect(baseElement).toBeTruthy()
	})
})
