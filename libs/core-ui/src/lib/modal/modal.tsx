import { ReactNode } from 'react'
import FocusLock from 'react-focus-lock'
import { Box } from '../box'
import { BoxMaxMinWidth } from '../box/box'
import { Button } from '../button'
import { Heading } from '../heading'
import { Icon } from '../icon'
import { Inline } from '../inline'
import { KeyCapturer } from '../key-capturer'
import { Portal } from '../portal'
import { PortalProps, registerPortalRoot } from '../portal/portal'
import { Toolbar } from '../toolbar'
import styles from './modal.module.less'

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
										<Heading level={1}>{title}</Heading>
									)}
									{onClose && (
										<Box
											marginRight='-xlarge'
											marginTop='-xlarge'
										>
											<Button
												onClick={onClose}
												variant='quaternary'
												size='small'
												aria-label={`Close ${
													title ?? ''
												} modal window`}
											>
												<Icon size='medium'>close</Icon>
											</Button>
										</Box>
									)}
								</Box>
								<Box className={styles['dialog-content']}>
									{children}
								</Box>
								<Box className={styles['dialog-footer']}>
									{buttons && (
										<Toolbar>
											<Inline space='small'>
												{buttons}
											</Inline>
										</Toolbar>
									)}
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
