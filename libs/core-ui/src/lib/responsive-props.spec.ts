import { getClassNames } from './responsive-props'
describe('getClassnames', () => {
	const styles = {
		'position-absolute': 'default',
		'tablet-position-absolute': 'tablet',
		'desktop-position-absolute': 'desktop',
	}

	it('should return null for empty', () => {
		expect(getClassNames(styles, 'position', undefined)).toBeNull()
	})
	it('should return one element array for string', () => {
		expect(getClassNames(styles, 'position', 'absolute')).toEqual([
			'default',
		])
	})
	it('should return array with classes for all dimensions', () => {
		expect(
			getClassNames(styles, 'position', {
				mobile: 'absolute',
				tablet: 'absolute',
				desktop: 'absolute',
			})
		).toEqual(['default', 'tablet', 'desktop'])
	})
})
