import styles from './userpic.module.less'

/* eslint-disable-next-line */
export interface UserpicProps {}

export function Userpic(props: UserpicProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to Userpic!</h1>
		</div>
	)
}

export default Userpic
