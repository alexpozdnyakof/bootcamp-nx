import styles from './keyboard-shortcut.module.less'

/* eslint-disable-next-line */
type KeyboardShorcutProps = {
	children: string | Array<string>
}


function parseToKeys(aString: string) {
	const _withModifier = /\b(mod|cmd|ctrl|control|alt|shift)\b/i.test(aString)

	return aString
		.split(/\s*\+\s*/)
		.map(singleKey => formatSingleKey(singleKey))

	function formatSingleKey(aString: string) {
		const capitalize = (aString: string) =>
			aString.charAt(0).toUpperCase() + aString.slice(1).toLowerCase()

		const isSpecial = (aString: string) =>
			/^(mod|cmd|ctrl|control|alt|shift|space)$/i.test(aString)

		if (isSpecial(aString)) return capitalize(aString)

		if (_withModifier && aString.length === 1) return aString.toUpperCase()

		return aString
	}
}

export function KeyboardShorcut({ children }: KeyboardShorcutProps) {
	const shortcuts = typeof children == 'string' ? [children] : children

	return (
		<>
			{shortcuts.map(shortcut =>
				parseToKeys(shortcut).map((sym, i) => (
					<kbd className={styles['shortcut']} key={`${sym}-${i}`}>
						{sym}
					</kbd>
				))
			)}
		</>
	)
}

export default KeyboardShorcut
