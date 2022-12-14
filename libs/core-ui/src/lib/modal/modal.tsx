import { ReactElement, ReactNode } from 'react'
import { Box } from '../box'
import { Button } from '../button'
import FocusLock from 'react-focus-lock'
import { Portal } from '../portal'
import { PortalProps, registerPortalRoot } from '../portal/portal'
import styles from './modal.module.less'
import { KeyCapturer } from '../key-capturer'
import { BoxMaxMinWidth } from '../box/box'
import { Inline } from '../inline'
import { totalmem } from 'os'
import { Heading } from '../heading'

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
	children: ReactNode
	width?: BoxMaxMinWidth
	onClose?: () => void
	buttons?: ReactNode
	title?: string
} & JSX.IntrinsicElements['div'] &
	Pick<PortalProps, 'containerName'>

export function Modal({
	containerName,
	children,
	onClose,
	width = 'medium',
	buttons,
	title,
	...props
}: ModalProps) {
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
									{title && (
										<Heading level={1} size='larger'>
											{title}
										</Heading>
									)}
									<Button
										onClick={onClose}
										variant='tertiary'
									>
										閉じる
									</Button>
								</Box>
								<Box className={styles['dialog-content']}>
									{children}
								</Box>
								<Box className={styles['dialog-footer']}>
									<Inline space='small'>{buttons}</Inline>
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
