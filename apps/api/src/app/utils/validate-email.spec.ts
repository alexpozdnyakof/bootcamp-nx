import { validateEmail } from './validate-email'
describe('Validate Email', () => {
	it('should return true for valid email', () => {
		expect(validateEmail('test@mail.com')).toBeTruthy()
	})

	it('should return false for email without @', () => {
		expect(validateEmail('testmail.com')).toBeFalsy()
	})

	it('should return false for email with invalid domain', () => {
		expect(validateEmail('test@mail.kek')).toBeFalsy()
	})

	it('should return false for email with invalid host', () => {
		expect(validateEmail('[]0-@mail.com')).toBeFalsy()
	})
})
