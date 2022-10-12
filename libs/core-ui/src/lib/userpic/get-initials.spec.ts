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

  it('return first and last name initials for more than two names', () => {
		const result = getInitials('alex is cool pozdnyakof')
		expect(result).toBe('AP')
  })
})
