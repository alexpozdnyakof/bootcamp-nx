import styles from './textarea.module.less'

/* eslint-disable-next-line */
export interface TextareaProps {}

export function Textarea(props: TextareaProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to Textarea!</h1>
		</div>
	)
}

export default Textarea
