export default function getInitials(aName?: string) {
	if (!aName) return ''

	const words = aName.trim().split(' ')
	const [firstInitial, lastInital] = [words[0][0], words[words.length - 1][0]]

	const result =
		firstInitial === lastInital
			? [firstInitial]
			: [firstInitial, lastInital]

	return result.join('').toUpperCase()
}
