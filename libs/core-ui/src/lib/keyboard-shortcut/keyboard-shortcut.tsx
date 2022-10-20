import styles from './keyboard-shortcut.module.less'

/* eslint-disable-next-line */
type KeyboardShorcutProps = {
	children: string | Array<string>
}

export function KeyboardShorcut({ children }: KeyboardShorcutProps) {
	const shortcuts = typeof children == 'string' ? [children] : children

	return (
		<>
			{shortcuts.map(shortcut =>
				shortcut
					.split(/\s*\+\s*/)
					.map(sym => <kbd className={styles['shortcut']}>{sym}</kbd>)
			)}
		</>
	)
}

export default KeyboardShorcut
