import { ReactNode } from 'react'
import { Box } from '../box'
import { Button } from '../button'
import FocusLock from 'react-focus-lock'
import { Portal } from '../portal'
import { PortalProps, registerPortalRoot } from '../portal/portal'
import styles from './modal.module.less'

const Backdrop = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['backdrop']}>{children}</Box>
}

const Center = ({ children }: { children: ReactNode }) => {
	return <Box className={styles['center']}>{children}</Box>
}

function checkCustomContainer(containerName: string | undefined) {
	if (!containerName) return
	const customRoot = document.querySelector(`#`.concat(containerName))
	if (customRoot) {
		registerPortalRoot(customRoot, containerName)
	}
}

type ModalProps = {
	isOpen: boolean
	children: ReactNode
	onClose?: () => void
} & JSX.IntrinsicElements['div'] &
	Pick<PortalProps, 'containerName'>

export function Modal({
	isOpen,
	containerName,
	children,
	onClose,
	...props
}: ModalProps) {
	if (!isOpen) return null

	checkCustomContainer(containerName)

	return (
		<Portal containerName={containerName}>
			<Backdrop>
				<Center>
					<FocusLock>
						<Box className={styles['dialog']} {...props}>
							<Box className={styles['dialog-header']}>
								<Button onClick={() => onClose?.()}>
									閉じる
								</Button>
							</Box>
							<Box className={styles['dialog-content']}>
								<Center>{children}</Center>
							</Box>
						</Box>
					</FocusLock>
				</Center>
			</Backdrop>
		</Portal>
	)
}

export default Modal
