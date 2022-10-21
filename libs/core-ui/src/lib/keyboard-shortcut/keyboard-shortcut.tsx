import { Fragment } from 'react'
import { Box } from '../box'
import styles from './keyboard-shortcut.module.less'

type KeyboardShorcutProps = {
	children: string | Array<string>
	isMac?: boolean
}

function parseToKeys(aString: string, isMac: boolean) {
	const _withModifier = /\b(mod|cmd|ctrl|control|alt|shift)\b/i.test(aString)
	const translate = isMac ? keyToMac : (k: string) => k

	return aString
		.split(/\s*\+\s*/)
		.map(singleKey => formatSingleKey(singleKey))

	function formatSingleKey(aString: string) {
		const capitalize = (aString: string) =>
			aString.charAt(0).toUpperCase() + aString.slice(1).toLowerCase()

		const isSpecial = (aString: string) =>
			/^(mod|cmd|ctrl|control|alt|shift|space)$/i.test(aString)

		if (isSpecial(aString)) return capitalize(translate(aString))

		if (_withModifier && aString.length === 1) return aString.toUpperCase()

		return aString
	}

	function keyToMac(aString: string) {
		const key = aString.toLowerCase() as keyof typeof keyMap

		const keyMap = {
			mod: '⌘',
			cmd: '⌘',
			control: '⌃',
			ctrl: '⌃',
			alt: '⌥',
			shift: '⇧',
			space: '␣',
		}

		return keyMap[key] ?? key
	}
}

export function KeyboardShortcut({
	children,
	isMac = navigator.platform?.toUpperCase().includes('MAC') ?? false,
}: KeyboardShorcutProps) {
	const shortcuts = typeof children == 'string' ? [children] : children

	return (
		<Box as='span' className={styles['shortcuts']}>
			{shortcuts.map((shortcut, i) => (
				<Fragment key={`shortcut_${i}`}>
					{i === 0 ? null : ', '}
					<kbd>
						{parseToKeys(shortcut, isMac).map((sym, i) => (
							<kbd
								className={styles['shortcut']}
								key={`${sym}-${i}`}
							>
								{sym}
							</kbd>
						))}
					</kbd>
				</Fragment>
			))}
		</Box>
	)
}

export default KeyboardShortcut
