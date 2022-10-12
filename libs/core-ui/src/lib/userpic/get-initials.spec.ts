import getInitials from './get-initials'
describe('get initials', () => {
	it('return an empty string for an empty name', () => {
		const result = getInitials('')
		expect(result).toBe('')
	})
})
