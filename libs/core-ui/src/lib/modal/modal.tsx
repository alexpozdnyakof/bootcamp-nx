import styles from './modal.module.less'

type ModalProps = {
	isOpen: boolean
} & JSX.IntrinsicElements['div']

export function Modal({ isOpen, ...props }: ModalProps) {
	if (!isOpen) return null
	return (
		<div className={styles['container']} {...props}>
			<h1>Welcome to Modal!</h1>
		</div>
	)
}

export default Modal
