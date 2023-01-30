export function validateEmail(email: string): boolean {
	const regex = new RegExp(
		"^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(?:)$"
	)
	return regex.test(email)
}
