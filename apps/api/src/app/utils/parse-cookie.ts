export function parseCookie(cookie: string): Record<string, string> {
	return Object.fromEntries(
		cookie.split('; ').map(cookie => cookie.split('='))
	)
}
