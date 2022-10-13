import getInitials from './get-initials'
describe('get initials', () => {
	it('return an empty string for an empty name', () => {
		const result = getInitials('')
		expect(result).toBe('')
	})

	it('returns uppercased initials for two names', () => {
		const result = getInitials('alex pozdnyakof')
		expect(result).toBe('AP')
	})

	it('returns first and last name initials for more than two names', () => {
		const result = getInitials('alex is cool pozdnyakof')
		expect(result).toBe('AP')
	})

	it('returns first initial for a single name', () => {
		const result = getInitials('alex')
		expect(result).toBe('A')
	})

	it('returns only first initial if first and second initals are the same', () => {
		const result = getInitials('alex abramov')
		expect(result).toBe('A')
	})
})
