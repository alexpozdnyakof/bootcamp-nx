import { ReactNode } from 'react'
import { Box } from '../box'
import { Button } from '../button'
import FocusLock from 'react-focus-lock'
import { Portal } from '../portal'
import { PortalProps, registerPortalRoot } from '../portal/portal'
import styles from './modal.module.less'
import { KeyCapturer } from '../key-capturer'
import { BoxMaxMinWidth } from '../box/box'

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

/**
 * TODO: add height expanded or fit-content
 * TODO: make stacking modals
 * TODO: add scrolling with stickye header and footer
 */
type ModalProps = {
	isOpen?: boolean
	children: ReactNode
	width?: BoxMaxMinWidth
	onClose?: () => void
} & JSX.IntrinsicElements['div'] &
	Pick<PortalProps, 'containerName'>

export function Modal({
	isOpen,
	containerName,
	children,
	onClose,
	width = 'medium',
	...props
}: ModalProps) {
	if (!isOpen) return null

	checkCustomContainer(containerName)

	return (
		<Portal containerName={containerName}>
			<FocusLock>
				<Box className={styles['dialog-container']}>
					<KeyCapturer onEscape={onClose}>
						<Box
							className={styles['dialog']}
							{...props}
							width={width}
							role='dialog'
						>
							<Box className={styles['dialog-guts']}>
								<Box className={styles['dialog-header']}>
									<Button
										onClick={onClose}
										variant='tertiary'
									>
										閉じる
									</Button>
								</Box>
								<Box className={styles['dialog-content']}>
									<Center>{children}</Center>
								</Box>
							</Box>
						</Box>
					</KeyCapturer>
				</Box>
			</FocusLock>
			<Box className={styles['backdrop']} onClick={onClose} />
		</Portal>
	)
}

export default Modal
