import { render } from '@testing-library/react'

import Userpic from './userpic'

describe('Userpic', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Userpic />)
		expect(baseElement).toBeTruthy()
	})
})
