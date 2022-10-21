import styles from './keyboard-shortcut.module.less'

/* eslint-disable-next-line */
type KeyboardShorcutProps = {
	children: string | Array<string>
}

const isSpecial = (aString: string) =>
	/^(mod|cmd|ctrl|control|alt|shift|space|super)$/i.test(aString)

const capitalize = (aString: string) =>
	aString.charAt(0).toUpperCase() + aString.slice(1).toLowerCase()

function parseToKeys(aString: string) {
	return aString
		.split(/\s*\+\s*/)
		.map(shortcut =>
			isSpecial(shortcut) ? capitalize(shortcut) : shortcut
		)
}

export function KeyboardShorcut({ children }: KeyboardShorcutProps) {
	const shortcuts = typeof children == 'string' ? [children] : children

	return (
		<>
			{shortcuts.map(shortcut =>
				parseToKeys(shortcut).map(sym => (
					<kbd className={styles['shortcut']}>{sym}</kbd>
				))
			)}
		</>
	)
}

export default KeyboardShorcut
