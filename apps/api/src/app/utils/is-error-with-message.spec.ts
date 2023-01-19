import isErrorWithMessage from './is-error-with-message'

describe('isErrorWithMessage', () => {
	it('should return true for native error', () => {
		const nativeError = new Error()
		expect(isErrorWithMessage(nativeError)).toBeTruthy()
	})
	it('should return true for similar struct', () => {
		const mockedError = { message: 'error' }
		expect(isErrorWithMessage(mockedError)).toBeTruthy()
	})
	it('should return false for non-message object', () => {
		const nativeError = { error: 'errror' }
		expect(isErrorWithMessage(nativeError)).toBeFalsy()
	})
	it('should return false for strings', () => {
		expect(isErrorWithMessage('error')).toBeFalsy()
	})
	it('should return false for numbers', () => {
		expect(isErrorWithMessage(123)).toBeFalsy()
	})
	it('should return false for null', () => {
		expect(isErrorWithMessage(null)).toBeFalsy()
	})
})
