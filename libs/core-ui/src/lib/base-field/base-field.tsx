import styles from './base-field.module.less'

/* eslint-disable-next-line */
export interface BaseFieldProps {}

export function BaseField(props: BaseFieldProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to BaseField!</h1>
		</div>
	)
}

export default BaseField
