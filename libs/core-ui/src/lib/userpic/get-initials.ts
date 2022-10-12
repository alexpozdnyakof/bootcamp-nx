export default function getInitials(aName?: string) {
	if (!aName) return ''

  const words = aName.split(' ')

  return [words[0][0], words[1][0]].join('').toUpperCase()
}
