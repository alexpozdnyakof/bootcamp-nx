import { parseCookie } from './parse-cookie'
describe('ParseCookie', () => {
	it('should return object', () => {
		const cookie = 'foo=bar; bar=baz; '

		expect(parseCookie(cookie)).toEqual({ foo: 'bar', bar: 'baz' })
	})
})
