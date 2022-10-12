import { screen, render } from '@testing-library/react'

import Userpic from './userpic'

describe('Userpic', () => {
	it('supports responsive values', () => {
		render(
			<Userpic
				data-testid='userpic'
				size={{
					mobile: 's',
					desktop: 'xl',
					tablet: 'xxl',
				}}
			/>
		)
		const avatar = screen.getByTestId('userpic')
		expect(avatar).toHaveClass('size-s')
		expect(avatar).toHaveClass('desktop-size-xl')
		expect(avatar).toHaveClass('tablet-size-xxl')
	})
})
