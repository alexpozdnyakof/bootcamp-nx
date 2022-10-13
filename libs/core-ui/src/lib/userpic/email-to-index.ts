export default function emailToIndex(email: string, maxIndex: number): number {
	if (!email.includes('@')) throw new Error('invalid email')
	const seed = email.split('@')[0]

	const hash = seed
		? seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0
		: 0
	return hash % maxIndex
}
