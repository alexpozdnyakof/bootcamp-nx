import emailToIndex from './email-to-index'
describe('emailToIndex', () => {
	it('returns an index for a given email', () => {
		const result = emailToIndex('alexpozdnyakof@gmail.com', 13)
		expect(result).toBe(4)
	})

	it('returns same value for same email', () => {
		const result = emailToIndex('alexpozdnyakof@gmail.com', 13)
		const result2 = emailToIndex('alexpozdnyakof@gmail.com', 13)
		expect(result).toBe(result2)
	})

	it('returns 0 if first part of email is empty', () => {
		const result = emailToIndex('@gmail.com', 13)
		expect(result).toBe(0)
	})

	it('throw an error if invalid email passed', () => {
		expect(() => emailToIndex('alexpozdnyakofgmail.com', 13)).toThrowError(
			'invalid email'
		)
	})
})
