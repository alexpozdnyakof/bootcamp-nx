import styles from './password-field.module.less'

/* eslint-disable-next-line */
export interface PasswordFieldProps {}

export function PasswordField(props: PasswordFieldProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to PasswordField!</h1>
		</div>
	)
}

export default PasswordField
