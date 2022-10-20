import styles from './keyboard-shorcut.module.less'

/* eslint-disable-next-line */
export interface KeyboardShorcutProps {}

export function KeyboardShorcut(props: KeyboardShorcutProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to KeyboardShorcut!</h1>
		</div>
	)
}

export default KeyboardShorcut
