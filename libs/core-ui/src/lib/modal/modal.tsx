/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react'
import { Box } from '../box'
import { Portal } from '../portal'
import styles from './modal.module.less'

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
						<Box className={styles['dialog-content']}>
							<Center>
								<h1>モーダルウィンドウ!</h1>
							</Center>
						</Box>
					</Box>
				</Center>
			</Backdrop>
		</Portal>
	)
}

export default Modal
