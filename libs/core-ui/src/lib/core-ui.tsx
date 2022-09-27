import styles from './core-ui.module.less'

/* eslint-disable-next-line */
export interface CoreUiProps {}

export function CoreUi(props: CoreUiProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to CoreUi!</h1>
		</div>
	)
}

export default CoreUi
