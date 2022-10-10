import { Space } from './common-types'
import { ResponsiveProp } from './responsive-props'
import { render, screen } from '@testing-library/react'
import { test, describe, expect, it } from '@jest/globals'

type WithSpace = { space?: ResponsiveProp<Space>; 'data-testid'?: string }

const spaces: Array<Space> = [
	'xsmall',
	'small',
	'medium',
	'large',
	'xlarge',
	'xxlarge',
]

const testCases = spaces.map(space => [space])

const getSpaceClassNames = ({ classList }: HTMLElement) =>
	Array.from(classList).filter(className => className.includes('space-'))

function runSpaceTests<Props extends WithSpace>(
	Component: React.ComponentType<Props>
) {
	const renderTestCase = (space: ResponsiveProp<Space>) => (
		// TODO: its cannot typing right because Component may not be extended withSpace
		// @ts-expect-error check this out
		render(<Component data-testid='subject' space={space} />),
		screen.getByTestId('subject')
	)

	describe('space', () => {
		test.each(testCases)(
			'it applies the styles needed for space="%s"',
			space => {
				const subject = renderTestCase(space)
				expect(getSpaceClassNames(subject)).toEqual([
					'space-'.concat(space),
				])
			}
		)

		it('allow to specify different spacing rules for different screen sizes', () => {
			const subject = renderTestCase({
				mobile: 'small',
				tablet: 'medium',
				desktop: 'large',
			})
			expect(getSpaceClassNames(subject)).toEqual([
				'space-small',
				'tablet-space-medium',
				'desktop-space-large',
			])
		})
	})
}

export { runSpaceTests }
