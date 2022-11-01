import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Box } from '../box'
import styles from './modal.module.less'

function Portal({ children }: { children: ReactNode }) {
	return createPortal(children, document.body)
}

const Backdrop = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['backdrop']}>{children}</Box>
}

const Center = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['center']}>{children}</Box>
}

type ModalProps = {
	isOpen: boolean
} & JSX.IntrinsicElements['div']

export function Modal({ isOpen, ...props }: ModalProps) {
	if (!isOpen) return null
	return (
		<Portal>
			<Backdrop>
				<Center>
					<Box className={styles['dialog']} {...props}>
						<Box className={styles['dialog-content']} {...props}>
							<Box className={styles['center']}>
								<h1>Welcome to Modal!</h1>
							</Box>
						</Box>
					</Box>
				</Center>
			</Backdrop>
		</Portal>
	)
}

export default Modal
